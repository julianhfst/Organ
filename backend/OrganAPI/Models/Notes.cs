using System.ComponentModel.DataAnnotations;

namespace OrganAPI.Models
{
    public class Notes
    {
        [Key]
        public int PS_Notes_Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Content { get; set; } = String.Empty;
        public int FK_User_ID { get; set; }
    }
}
