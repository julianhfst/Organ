using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganAPI.Data;
using OrganAPI.Models;
using OrganAPI.Models.DTOs;
using OrganAPI.Services.Interfaces;
using System.Linq;

namespace OrganAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IUserInterface userService;

        public NotesController(DataContext context, IUserInterface userService)
        {
            this.context = context;
            this.userService = userService;
        }

        private async Task<List<Notes>> GetNotesFromUser(int userid)
        {
            List<Notes> notes = await context.Notes.ToListAsync();
            List<Notes> usernotes = notes.Where(x => x.FK_User_ID == userid).ToList();

            return usernotes;
        }

        [HttpGet]
        public async Task<ActionResult<List<Notes>>> GetNotes()
        {
            User user = userService.GetUser();
            return Ok(await GetNotesFromUser(user.PS_User_ID));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Notes>> GetNote(int id)
        {
            User user = userService.GetUser();
            List<Notes> usernotes = await GetNotesFromUser(user.PS_User_ID);

            Notes note = usernotes.FirstOrDefault(x => x.PS_Notes_Id == id);
            if (note == null) return BadRequest("Note does not exist");

            return Ok(note);
        }

        [HttpPost]
        public async Task<ActionResult<Notes>> PostNote(NotesDTO request)
        {
            if (request == null) return BadRequest("New Note error");

            User user = userService.GetUser();

            List<Notes> usernotes = await GetNotesFromUser(user.PS_User_ID);
            if (usernotes.Any(x => x.Title == request.Title)) return BadRequest("Note arleady exists");

            Notes newNote = new Notes();
            newNote.Title = request.Title;
            newNote.Content = request.Content;
            newNote.FK_User_ID = user.PS_User_ID;

            context.Notes.Add(newNote);
            await context.SaveChangesAsync();

            return Ok(newNote);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Notes>> EditNote(int id, NotesDTO request)
        {
            User user = userService.GetUser();
            List<Notes> usernotes = await GetNotesFromUser(user.PS_User_ID);

            Notes note = usernotes.FirstOrDefault(x => x.PS_Notes_Id == id);
            if (note == null) return BadRequest("Note does not exist");

            note.Title = request.Title;
            note.Content = request.Content;

            await context.SaveChangesAsync();
            return Ok(note);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Notes>> DeleteNote(int id)
        {
            User user = userService.GetUser();
            List<Notes> usernotes = await GetNotesFromUser(user.PS_User_ID);

            Notes note = usernotes.FirstOrDefault(x => x.PS_Notes_Id == id);
            if (note == null) return BadRequest("Note does not exist");

            context.Notes.Remove(note);
            await context.SaveChangesAsync();

            return Ok(note);
        }
    }
}
