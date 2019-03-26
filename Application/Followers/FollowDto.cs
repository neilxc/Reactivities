using Newtonsoft.Json;

namespace Application.Followers
{
    public class FollowDto
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }

        [JsonProperty("following")]
        public bool IsFollowed { get; set; }
        public int FollowersCount { get; set; }
    }
}