using System.ComponentModel.DataAnnotations;

namespace OrganAPI
{
    public class Task
    {
        [Key]
        public int PS_Task_Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Definition { get; set; } = String.Empty;
        public DateTime Date { get; set; }
        public bool Done { get; set; }
        public int FK_User_ID { get; set; }
        public DateTime CreationDate { get; set; }

    }
}
