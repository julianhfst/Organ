using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganAPI.Data;
using OrganAPI.Models;
using OrganAPI.Models.DTOs;
using OrganAPI.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OrganAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoardsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IUserInterface userService;

        public BoardsController(DataContext context, IUserInterface userService)
        {
            this.context = context;
            this.userService = userService;
        }

        private async Task<List<Boards>> GetBoardsFromUser(int userid)
        {
            List<Boards> boards = await context.Boards.ToListAsync();
            List<Boards> userboards = boards.Where(x => x.FK_User_ID == userid).ToList();

            return userboards;
        }

        private async Task<List<Jobs>> GetJobsFromBoard(Boards board)
        {
            List<Jobs> jobs = await context.Jobs.ToListAsync();
            List<Jobs> boardjobs = jobs.Where(x => x.FK_Board_ID == board.PS_Boards_Id).ToList();

            return boardjobs;
        }

        [HttpGet]
        public async Task<ActionResult<List<Boards>>> GetBoards()
        {
            User user = userService.GetUser();

            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);

            foreach(Boards board in userboards)
            {
                board.Jobs = await GetJobsFromBoard(board);
            }

            return Ok(userboards);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Notes>> GetBoard(int id)
        {
            User user = userService.GetUser();
            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);

            Boards board = userboards.FirstOrDefault(x => x.PS_Boards_Id == id);
            if (board == null) return BadRequest("Board does not exist");

            board.Jobs = await GetJobsFromBoard(board);

            return Ok(board);
        }

        [HttpPost]
        public async Task<ActionResult<Notes>> PostBoard(BoardsDTO request)
        {
            if (request == null) return BadRequest("New Board error");

            User user = userService.GetUser();

            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);
            if (userboards.Any(x => x.Title == request.Title)) return BadRequest("Board arleady exists");

            Boards newBoard = new Boards();
            newBoard.Title = request.Title;
            newBoard.FK_User_ID = user.PS_User_ID;
            newBoard.CreationDate = DateTime.Now;
            newBoard.Jobs = new List<Jobs>();

            context.Boards.Add(newBoard);
            await context.SaveChangesAsync();

            return Ok(newBoard);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Notes>> DeleteBoard(int id)
        {
            User user = userService.GetUser();
            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);

            Boards board = userboards.FirstOrDefault(x => x.PS_Boards_Id == id);
            if (board == null) return BadRequest("Board does not exist");

            context.Boards.Remove(board);
            await context.SaveChangesAsync();

            board.Jobs = new List<Jobs>();
            return Ok(board);
        }


        [HttpPost("{id}/Jobs")]
        public async Task<ActionResult<Jobs>> PostJob(int id, JobsDTO request)
        {
            if (request == null) return BadRequest("New Jobs error");

            User user = userService.GetUser();

            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);

            Boards board = userboards.FirstOrDefault(x => x.PS_Boards_Id == id);
            if (board == null) return BadRequest("Board does not exist");

            Jobs newJobs = new Jobs();
            newJobs.Definition = request.Definition;
            newJobs.Status = Jobs.JobStatus.ToDo;
            newJobs.FK_Board_ID = id;

            context.Jobs.Add(newJobs);

            await context.SaveChangesAsync();

            return Ok(newJobs);
        }

        [HttpPut("{id}/Jobs/{jobId}")]
        public async Task<ActionResult<Notes>> EditJob(int id, int jobId, Jobs.JobStatus status)
        {
            User user = userService.GetUser();
            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);

            Boards board = userboards.FirstOrDefault(x => x.PS_Boards_Id == id);
            if (board == null) return BadRequest("Board does not exist");

            List<Jobs> jobs = await GetJobsFromBoard(board);
            Jobs job = jobs.FirstOrDefault(x => x.PS_Jobs_Id == jobId);
            if (job == null) return BadRequest("Job does not exist");

            job.Status = status;

            await context.SaveChangesAsync();
            return Ok(job);
        }


        [HttpDelete("{id}/Jobs/{jobId}")]
        public async Task<ActionResult<Jobs>> DeleteJob(int id, int jobId)
        {
            User user = userService.GetUser();
            List<Boards> userboards = await GetBoardsFromUser(user.PS_User_ID);

            Boards board = userboards.FirstOrDefault(x => x.PS_Boards_Id == id);
            if (board == null) return BadRequest("Board does not exist");

            List<Jobs> jobs = await GetJobsFromBoard(board);
            Jobs job = jobs.FirstOrDefault(x => x.PS_Jobs_Id == jobId);
            if (job == null) return BadRequest("Job does not exist");

            context.Jobs.Remove(job);
            await context.SaveChangesAsync();

            return Ok(job);
        }
    }
}
