using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public DateTime Created { get; set; }
        public string HomeTown { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Bio { get; set; }
        public string Gender { get; set; }
        public virtual ICollection<ActivityUser> ActivityUsers { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}