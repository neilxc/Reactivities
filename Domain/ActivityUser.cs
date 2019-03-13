using System;

namespace Domain
{
    public class ActivityUser
    {
        public int AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}