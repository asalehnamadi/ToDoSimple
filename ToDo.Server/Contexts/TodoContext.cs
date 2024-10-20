using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ToDo.Server.Models;

namespace ToDo.Server.Contexts
{
    public class TodoContext:DbContext
    {

        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
            
        }
        public DbSet<TodoTask> TodoTasks { get; set; }
    }
}
