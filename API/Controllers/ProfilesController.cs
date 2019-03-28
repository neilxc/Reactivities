using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ProfileDetailed> Get(string username)
        {
            return await Mediator.Send(new Details.Query{Username = username});
        }

        [HttpPut]
        public async Task<Profile> Edit(Edit.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{username}/activities")]
        public async Task<List<UserActivityDto>> GetUserActivities(string username, bool past, 
            bool future, bool hosting)
        {
            return await Mediator.Send(new UserActivities.Query(username, past, future, hosting));
        }
    }
}