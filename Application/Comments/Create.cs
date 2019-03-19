using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public int Id { get; set; }
            public string Username { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(x => 
                    request.Id == x.Id);
                
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var author = await _context.Users.FirstOrDefaultAsync(x => x.UserName == 
                    request.Username);
                
                var comment = new Comment
                {
                    Author = author,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                await _context.Comments.AddAsync(comment);

                await _context.SaveChangesAsync();

                return _mapper.Map<Comment, CommentDto>(comment);
            }
        }
    }
}