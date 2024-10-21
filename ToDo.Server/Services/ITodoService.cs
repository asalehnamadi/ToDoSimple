using ToDo.Server.DTOs;

namespace ToDo.Server.Services;

public interface ITodoService
{
    Task<IList<TodoTaskDto>> GetAllTasksAsync();
    Task<TodoTaskDto> GetByIdAsync(Guid id);
    Task<TodoTaskDto> AddTaskAsync(AddUpdateTodoTaskDto task);
    Task UpdateTaskAsync(Guid id, AddUpdateTodoTaskDto task);
    Task<TodoTaskDto> ChangeTaskCompleteAsync(Guid id);
    Task DeleteTaskAsync(Guid id);
}