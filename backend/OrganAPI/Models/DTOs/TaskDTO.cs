namespace OrganAPI
{
    public class TaskDTO
    {
        public string Name { get; set; } = String.Empty;
        public string Definition { get; set; } = String.Empty;
        public DateTime Date { get; set; }
        public bool Done { get; set; }
    }
}
