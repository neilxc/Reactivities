using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class VaidateController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public VaidateController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("username")]
        public async Task<bool> CheckUsernameInUse(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            return user != null;
        }
    }
}