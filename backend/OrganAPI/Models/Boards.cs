using System.ComponentModel.DataAnnotations;

namespace OrganAPI.Models
{
    public class Boards
    {
        [Key]
        public int PS_Boards_Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public DateTime CreationDate { get; set; }
        public int FK_User_ID { get; set; }
        public ICollection<Jobs> Jobs { get; set; }
    }
}
