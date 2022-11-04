using OrganAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace OrganAPI
{
    public class User
    {
        [Key]
        public int PS_User_ID { get; set; }

        public string Username { get; set; } = string.Empty;

        public byte[] PasswordHash { get; set; }

        public string Email { get; set; } = string.Empty;

        public DateTime CreationDate { get; set; }

        public ICollection<Notes> Notes { get; set; }
        public ICollection<Task> Tasks { get; set; }
        public ICollection<Boards> Boards { get; set; }
    }
}
