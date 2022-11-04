namespace OrganAPI.Models.DTOs
{
    public class UserLoginDTO
    {
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Username is required")]
        public string Username { get; set; } = string.Empty;
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;
    }
}
