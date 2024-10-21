using Microsoft.AspNetCore.Mvc;
using ToDo.Server.DTOs;
using ToDo.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _service;

        public TodoController(ITodoService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IList<TodoTaskDto>> GetAllTasks()
        {
            return await _service.GetAllTasksAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoTaskDto>> Post([FromBody] AddUpdateTodoTaskDto model)
        {
            var task = await _service.AddTaskAsync(model);
            return CreatedAtAction(nameof(GetAllTasks), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Guid id, [FromBody] AddUpdateTodoTaskDto model)
        {
            await _service.UpdateTaskAsync(id, model);
            return Ok(model);
        }

        [HttpPut("{id}/complete")]
        public async Task<ActionResult> Put(Guid id)
        {
            var task = await _service.ChangeTaskCompleteAsync(id);
            return Ok(task);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await _service.DeleteTaskAsync(id);
            return NoContent();
        }
    }
}
