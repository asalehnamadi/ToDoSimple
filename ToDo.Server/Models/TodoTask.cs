namespace ToDo.Server.Models
{
    public class TodoTask
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Description { get; set; }
        public DateTime? DeadLine { get; set; }
        public DateTime? CompleteDate { get; set; }
    }
}
