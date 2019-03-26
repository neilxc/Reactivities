using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Add
    {
        public class Command : IRequest<FollowDto>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, FollowDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<FollowDto> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var observer =
                    await _context.Users.FirstOrDefaultAsync(x => x.UserName ==
                        _userAccessor.GetCurrentUsername());

                var target = await _context.Users.FirstOrDefaultAsync(x => x.UserName ==
                    request.Username);

                if (target == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var following = await _context.Followings.FirstOrDefaultAsync(x =>
                    x.ObserverId == observer.Id && x.TargetId == target.Id);

                if (following == null)
                {
                    following = new AppUserFollowings
                    {
                        Observer = observer,
                        Target = target
                    };

                    await _context.Followings.AddAsync(following);
                    await _context.SaveChangesAsync();
                }

                return new FollowDto
                {
                    DisplayName = observer.DisplayName,
                    Username = observer.UserName,
                    Image = observer.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                    FollowersCount = observer.Followers.Count()
                };
            }
        }
    }
}