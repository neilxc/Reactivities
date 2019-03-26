using System.Linq;
using Application.Activities;
using Application.Followers;
using Domain;

namespace Application.Profiles
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x =>
                    x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count()))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Following.Count()))
                .ForMember(d => d.IsFollowed, o => o.MapFrom<FollowingResolver>());

            CreateMap<AppUser, ProfileDetailed>()
                .IncludeBase<AppUser, Profile>();

        }
    }
}