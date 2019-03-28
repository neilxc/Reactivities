using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }

        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query(bool isGoing, bool isHost, DateTime? startDate,
                int? limit, int? offset)
            {
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = (startDate == null) ? DateTime.Now : startDate;
                Offset = offset;
                Limit = limit;
            }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<ActivitiesEnvelope> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var queryable = _context.Activities.Where(x => x.Date >= request.StartDate)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(a => a.ActivityUsers.Any(x =>
                        x.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(a => a.ActivityUsers.Any(x =>
                        x.AppUser.UserName == _userAccessor.GetCurrentUsername() && x.IsHost == true));
                }

                if (request.IsHost && request.IsGoing)
                {
                    queryable = queryable.Where(a => a.ActivityUsers.Any(x =>
                        x.AppUser.UserName == _userAccessor.GetCurrentUsername() && x.IsHost == true || x.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                var activities = await queryable
                    .OrderBy(a => a.Date)
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3).ToListAsync();

                var activitiesToReturn =
                    _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

                return new ActivitiesEnvelope
                {
                    Activities = activitiesToReturn,
                    ActivityCount = queryable.Count()
                };
            }
        }
    }
}