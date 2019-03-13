using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public virtual ICollection<ActivityUser> ActivityUsers { get; set; }
    }
}