namespace Domain
{
    public class AppUserFollowings
    {
        public int ObserverId { get; set; }
        public virtual AppUser Observer { get; set; }
        public int TargetId { get; set; }
        public virtual AppUser Target { get; set; }
    }
}