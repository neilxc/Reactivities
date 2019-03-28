using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class UserActivities
    {
        public class Query : IRequest<List<UserActivityDto>>
        {
            public Query(string username, bool past, bool future, bool hosting)
            {
                this.Username = username;
                this.Past = past;
                this.Future = future;
                this.Hosting = hosting;
            }
            public string Username { get; set; }
            public bool Past { get; set; }
            public bool Future { get; set; }
            public bool Hosting { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserActivityDto>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserActivityDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName ==
                    request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var queryable = user.ActivityUsers.AsQueryable();

                if (request.Past)
                {
                    queryable = queryable.Where(a => a.Activity.Date <= DateTime.Now);
                }

                if (request.Future)
                {
                    queryable = queryable.Where(a => a.Activity.Date >= DateTime.Now);
                }

                if (request.Hosting)
                {
                    queryable = queryable.Where(a => a.IsHost == true);
                }

                var activities = queryable.ToList();
                var activitiesToReturn = new List<UserActivityDto>();

                foreach (var activity in activities)
                {
                    var act = new UserActivityDto
                    {
                        Id = activity.Activity.Id,
                        Title = activity.Activity.Title,
                        Category = activity.Activity.Category,
                        Date = activity.Activity.Date,
                    };

                    activitiesToReturn.Add(act);
                }

                return activitiesToReturn;
            }
        }
    }
}