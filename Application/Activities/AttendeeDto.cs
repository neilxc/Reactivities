using System;
using Newtonsoft.Json;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool IsHost { get; set; }
        [JsonProperty("following")]
        public bool IsFollowing { get; set; }
        public int FollowersCount { get; set; }
    }
}