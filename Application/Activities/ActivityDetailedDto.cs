using System;
using System.Collections.Generic;
using Application.Comments;
using Application.Profiles;
using Domain;

namespace Application.Activities
{
    public class ActivityDetailedDto : ActivityDto
    {
        public ICollection<CommentDto> Comments { get; set; }
    }
}