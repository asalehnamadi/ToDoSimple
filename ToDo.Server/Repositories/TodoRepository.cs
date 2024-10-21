using Microsoft.EntityFrameworkCore;
using ToDo.Server.Contexts;
using ToDo.Server.Models;

namespace ToDo.Server.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        public async Task<IList<TodoTask>> GetAllAsync() => await _context.TodoTasks.OrderBy(p=>p.Description).ToListAsync();
        public async Task<TodoTask?> GetByIdAsync(Guid id)=> await _context.TodoTasks.FindAsync(id);

        public async Task<TodoTask> AddAsync(TodoTask task)
        {
            _context.TodoTasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task UpdateAsync(TodoTask task)
        {
            _context.TodoTasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var task = await GetByIdAsync(id);
            if (task != null)
            {
                _context.TodoTasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }

}
