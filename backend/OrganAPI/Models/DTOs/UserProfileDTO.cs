namespace OrganAPI.Models.DTOs
{
    public class UserProfileDTO
    {
        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public DateTime CreationDate { get; set; }
    }
}
