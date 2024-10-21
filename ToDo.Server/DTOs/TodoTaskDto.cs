namespace ToDo.Server.DTOs
{
    public class TodoTaskDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime? DeadLine { get; set; }
        public DateTime? CompleteDate { get; set; }
    }
}
