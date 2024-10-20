using ToDo.Server.Models;

namespace ToDo.Server.Repositories;

public interface ITodoRepository
{
    Task<IList<TodoTask>> GetAllAsync();
    Task<TodoTask?> GetByIdAsync(Guid id);
    Task<TodoTask> AddAsync(TodoTask task);
    Task UpdateAsync(TodoTask task);
    Task DeleteAsync(Guid id);
}