using System.Linq;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using Domain;
using Persistence;

namespace Application.Activities
{
    public class AttendeeFollowingResolver : IValueResolver<ActivityUser, AttendeeDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public AttendeeFollowingResolver(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;
        }
        public bool Resolve(ActivityUser source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.FirstOrDefault(x => x.UserName ==
                _userAccessor.GetCurrentUsername());

            if (currentUser.Following.Any(x => x.TargetId == source.AppUser.Id))
                return true;

            return false;
        }
    }
}