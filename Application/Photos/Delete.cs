using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Command(string id)
            {
                this.Id = id;

            }
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context,
                IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == 
                    _userAccessor.GetCurrentUsername());
                
                if (user.Photos.All(x => x.Id != request.Id))
                    throw new RestException(HttpStatusCode.Forbidden);
                
                var photo = await _context.Photos.FindAsync(request.Id);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound);

                // set another photo as main if main photo is being deleted
                if (photo.IsMain && user.Photos.Count > 1) {
                    var otherPhoto = await _context.Photos.FirstOrDefaultAsync(x => 
                        x.Id != request.Id);
                    otherPhoto.IsMain = true;
                }

                var result = _photoAccessor.DeletePhoto(photo.Id);

                if (result == null)
                    throw new RestException(HttpStatusCode.BadRequest, 
                        new string[] {"Problem deleting the photo"});

                user.Photos.Remove(photo);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}