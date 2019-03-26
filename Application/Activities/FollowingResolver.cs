using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<AppUser, Profiles.Profile, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public FollowingResolver(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;
        }
        public bool Resolve(AppUser source, Profiles.Profile destination, bool destMember,

            ResolutionContext context)
        {
            var currentUser = _context.Users.FirstOrDefault(x => x.UserName ==
                _userAccessor.GetCurrentUsername());

            if (currentUser.Following.Any(x => x.TargetId == source.Id))
                return true;
            
            return false;
        }
    }
}