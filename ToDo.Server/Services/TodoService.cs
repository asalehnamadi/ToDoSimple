using Microsoft.Identity.Client;
using ToDo.Server.DTOs;
using ToDo.Server.Models;
using ToDo.Server.Repositories;

namespace ToDo.Server.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _repository;

        public TodoService(ITodoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IList<TodoTaskDto>> GetAllTasksAsync()
        {
            var tasks = await _repository.GetAllAsync();
            return tasks.Select(p => new TodoTaskDto
            {
                Id = p.Id,
                DeadLine = p.DeadLine,
                Description = p.Description,
                CompleteDate = p.CompleteDate
            }).ToList();
        }

        public async Task<TodoTaskDto> GetByIdAsync(Guid id)
        {
            var task = await _repository.GetByIdAsync(id);
            return new TodoTaskDto
            {
                CompleteDate = task.CompleteDate,
                DeadLine = task.DeadLine,
                Description = task.Description,
                Id = task.Id
            };
        }
        public async Task<TodoTaskDto> AddTaskAsync(AddUpdateTodoTaskDto task)
        {
           
            var todoTask = new TodoTask
            {
                DeadLine = task.DeadLine,
                Description = task.Description,
                CompleteDate = task.CompleteDate
            };
            todoTask= await _repository.AddAsync(todoTask);
            return new TodoTaskDto
            {
                DeadLine = todoTask.DeadLine,
                Description = todoTask.Description,
                Id = todoTask.Id,
                CompleteDate = todoTask.CompleteDate
            };
        }

        public async Task UpdateTaskAsync(Guid id, AddUpdateTodoTaskDto task)
        {
            var todoTask = await _repository.GetByIdAsync(id);
            if (todoTask == null) throw new KeyNotFoundException("Task not found.");
           
            todoTask.Description=task.Description;
            todoTask.DeadLine=task.DeadLine;
            todoTask.CompleteDate = task.CompleteDate;

            await _repository.UpdateAsync(todoTask);
        }

        public async Task<TodoTaskDto> ChangeTaskCompleteAsync(Guid id)
        {
            var todoTask = await _repository.GetByIdAsync(id);
            if (todoTask == null) throw new KeyNotFoundException("Task not found.");
            if (todoTask.CompleteDate.HasValue)
                todoTask.CompleteDate = null;
            else
                todoTask.CompleteDate = DateTime.UtcNow;
            await _repository.UpdateAsync(todoTask);
            return await GetByIdAsync(id);
        }
        public async Task DeleteTaskAsync(Guid id) => await _repository.DeleteAsync(id);
    }
}
