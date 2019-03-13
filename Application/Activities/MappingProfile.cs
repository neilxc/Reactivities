using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
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
                    opt.MapFrom(src => src.AppUser.DisplayName));
        }
    }
}