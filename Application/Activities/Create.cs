using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<ActivityDto>
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty().GreaterThan(DateTime.Now);
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, ActivityDto>
        {
            public DataContext _context { get; }
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<ActivityDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue,
                };

                await _context.Activities.AddAsync(activity);

                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendee = new ActivityUser
                {
                    AppUser = user,
                    AppUserId = user.Id,
                    Activity = activity,
                    ActivityId = activity.Id,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                await _context.ActivityUsers.AddAsync(attendee);

                await _context.SaveChangesAsync();

                var activityToReturn = _mapper.Map<Activity, ActivityDto>(activity);

                return activityToReturn;
            }
        }
    }
}