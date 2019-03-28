using System.Linq;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>()
                .ForMember(dest => dest.Attendees, opt =>
                    opt.MapFrom(src => src.ActivityUsers));
            CreateMap<ActivityUser, AttendeeDto>()
                .ForMember(dest => dest.Username, opt =>
                    opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.DisplayName, opt =>
                    opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src =>
                    src.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count()))
                .ForMember(d => d.IsFollowing, o => o.MapFrom<AttendeeFollowingResolver>());
        }
    }
}