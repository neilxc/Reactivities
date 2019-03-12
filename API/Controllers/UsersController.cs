using System.Threading.Tasks;
using Application.Users;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UsersController : BaseController
    {
        [HttpPost("login")]
        public async Task<User> Login(Login.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("register")]
        public async Task<User> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}