using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.ActivityUsers.FirstOrDefaultAsync(x =>
                    x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance == null) return Unit.Value;

                if (attendance != null)
                {
                    _context.ActivityUsers.Remove(attendance);
                    await _context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}