using System.Threading.Tasks;
using Application.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpGet]
        public async Task<User> GetCurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}