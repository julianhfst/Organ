using OrganAPI.Data;
using OrganAPI.Services.Interfaces;
using System.Security.Claims;

namespace OrganAPI.Services
{
    public class UserService : IUserInterface
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DataContext context;

        public UserService(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.context = context;
        }

        private int GetUserID()
        {
            string result = null;

            if(httpContextAccessor.HttpContext != null) result = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Convert.ToInt32(result);
        }
        public User GetUser()
        {
            int id = GetUserID();
            User user = context.Users.FirstOrDefault(x => x.PS_User_ID == id);

           return user;
        }
    }
}
