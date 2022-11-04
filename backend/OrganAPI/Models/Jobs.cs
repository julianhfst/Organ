namespace OrganAPI.Models
{
    public class Jobs
    {
        public enum JobStatus
        {
            ToDo, 
            InWork,
            inReview, 
            Finished
        }

        [System.ComponentModel.DataAnnotations.Key]
        public int PS_Jobs_Id { get; set; }
        public string Definition { get; set; } = String.Empty;
        public JobStatus Status { get; set; }
        public int FK_Board_ID { get; set; }
    }
}
