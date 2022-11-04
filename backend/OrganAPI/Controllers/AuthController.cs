using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OrganAPI.Models.DTOs;
using OrganAPI.Services.Interfaces;
using OrganAPI.Validation;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace OrganAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Data.DataContext context;
        private readonly IConfiguration config;
        private readonly IUserInterface userService;

        public AuthController(Data.DataContext context, IConfiguration config, IUserInterface userService)
        {
            this.context = context;
            this.config = config;
            this.userService = userService;
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<ActionResult<string>> Login(UserLoginDTO request)
        {
            byte[] passhash = CreatePasswordHash(request.Password);
            var user = context.Users.FirstOrDefault(a => a.Username.ToLower() == request.Username.ToLower() && a.PasswordHash == passhash);

            if (user == null) return BadRequest("Username or password incorrect");

            string token = CreateToken(user);
            return Ok(token);

        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<ActionResult<string>> Register(UserRegistrationDTO request)
        {
            if (context.Users.Any(x => x.Username == request.Username || x.Email == request.Email)) return BadRequest("User or Email arleady exists"); //User or email already exiitst

            User newuser = new User();
            newuser.Username = request.Username;
            newuser.PasswordHash = CreatePasswordHash(request.Password);
            newuser.Email = request.Email;
            newuser.CreationDate = DateTime.Now;

            context.Users.Add(newuser);
            await context.SaveChangesAsync();

            string token = CreateToken(newuser);
            return Ok(token);
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDTO>> Profile()
        {
            User user = userService.GetUser();
            if (user == null) return BadRequest("No User found");

            UserProfileDTO profile = new UserProfileDTO();
            profile.Username = user.Username;
            profile.Email = user.Email;
            profile.CreationDate = user.CreationDate;

            return Ok(profile);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.PS_User_ID.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var builder = WebApplication.CreateBuilder();
            var secToken = builder.Configuration["Token"];
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secToken));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(5),
                signingCredentials: cred);
                
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


        private byte[] CreatePasswordHash(string password)
        {
            byte[] passwordHash;

            SHA256 mySHA56 = SHA256.Create();
            passwordHash = mySHA56.ComputeHash(new MemoryStream(Encoding.Default.GetBytes(password)));

            return passwordHash;
        }


    }
}
