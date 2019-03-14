using System;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}