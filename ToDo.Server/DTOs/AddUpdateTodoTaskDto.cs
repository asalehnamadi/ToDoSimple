using System.ComponentModel.DataAnnotations;

namespace ToDo.Server.DTOs
{
    public class AddUpdateTodoTaskDto
    {
        [Required]
        [MinLength(10, ErrorMessage = "Description must be at least 10 characters long.")]

        public string Description { get; set; }
        public DateTime? DeadLine { get; set; }
        public DateTime? CompleteDate { get; set; }
    }
}
