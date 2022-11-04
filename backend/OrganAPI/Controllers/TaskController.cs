using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganAPI.Data;
using OrganAPI.Services.Interfaces;

namespace OrganAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IUserInterface userService;

        public TaskController(DataContext context, IUserInterface userService)
        {
            this.context = context;
            this.userService = userService;
        }

        private async Task<List<Task>> GetTasksFromUser(int userid)
        {
            List<Task> tasks = new List<Task>();
            tasks = await context.Tasks.ToListAsync();

            List<Task> usertasks = tasks.Where(x => x.FK_User_ID == userid).ToList();

            return usertasks;
        }

        [HttpGet]
        public async Task<ActionResult<List<Task>>> GetTasks() 
        {
            User user = userService.GetUser();

            List<Task> usertasks = await GetTasksFromUser(user.PS_User_ID);
            return Ok(usertasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            User user = userService.GetUser();

            List<Task> usertasks = await GetTasksFromUser(user.PS_User_ID);
            Task task = usertasks.FirstOrDefault(x => x.PS_Task_Id == id);
            if (task == null) return BadRequest("Task does not exist");

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(TaskDTO request) 
        {
            if (request == null) return BadRequest("New Task error");

            User user = userService.GetUser();

            List<Task> tasks = await GetTasksFromUser(user.PS_User_ID);
            if (tasks.Any(x => x.Name == request.Name)) return BadRequest("Task arleady exists"); //Tasks already exists

            Task newtask = new Task();
            newtask.Name = request.Name;
            newtask.Definition = request.Definition;
            newtask.Date = request.Date;
            newtask.Done = request.Done;
            newtask.FK_User_ID = user.PS_User_ID;
            newtask.CreationDate = DateTime.Now;

            context.Tasks.Add(newtask);
            await context.SaveChangesAsync(); 

            return Ok(newtask);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Task>> ToggleTask(int id) 
        {
            User user = userService.GetUser();

            List<Task> tasks = await GetTasksFromUser(user.PS_User_ID);

            Task task = tasks.FirstOrDefault(x => x.PS_Task_Id == id);
            if (task == null) return BadRequest("Task does not exist");

            task.Done = !task.Done;

            await context.SaveChangesAsync();
            return Ok(task);
        }
        
        [HttpPut("Edit/{id}")]
        public async Task<ActionResult<Task>> EditTask(int id, TaskDTO request)
        {
            User user = userService.GetUser();

            List<Task> tasks = await GetTasksFromUser(user.PS_User_ID);

            Task task = tasks.FirstOrDefault(x => x.PS_Task_Id == id);
            if (task == null) return BadRequest("Task does not exist");
            
            task.Name = request.Name;
            task.Definition = request.Definition;
            task.Date = request.Date;
            task.Done = request.Done;

            await context.SaveChangesAsync();
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Task>> DeleteTask(int id) 
        {
            User user = userService.GetUser();

            List<Task> tasks = await GetTasksFromUser(user.PS_User_ID);

            Task task = tasks.FirstOrDefault(x => x.PS_Task_Id == id);
            if (task == null) return BadRequest("Task does not exist");

            context.Tasks.Remove(task);
            await context.SaveChangesAsync(); 

            return Ok(task);
        }
    }
}
