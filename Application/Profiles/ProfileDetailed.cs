using System.Collections.Generic;
using Application.Followers;
using Domain;

namespace Application.Profiles
{
    public class ProfileDetailed : Profile
    {
        public ICollection<Photo> Photos { get; set; }
    }
}