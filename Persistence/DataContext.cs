using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityUser> ActivityUsers { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );
            
            builder.Entity<ActivityUser>(x => x.HasKey(ua => new {ua.AppUserId, ua.ActivityId}));

            builder.Entity<ActivityUser>()
                .HasOne(ua => ua.AppUser)
                .WithMany(a => a.ActivityUsers)
                .HasForeignKey(ua => ua.AppUserId);

            builder.Entity<ActivityUser>()
                .HasOne(ua => ua.Activity)
                .WithMany(a => a.ActivityUsers)
                .HasForeignKey(ua => ua.ActivityId);
                
        }
    }
}
