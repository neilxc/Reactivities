using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataAsync(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "Culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "Music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 2,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new ActivityUser
                            {
                                AppUserId = 1,
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "Food",
                        City = "London",
                        Venue = "Jamies Italian",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 3,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "British Museum",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 2,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 3,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "Music",
                        City = "London",
                        Venue = "O2 Arena",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 2,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 2 months ago",
                        Category = "Travel",
                        City = "Berlin",
                        Venue = "All",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new ActivityUser
                            {
                                AppUserId = 2,
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                        ActivityUsers = new List<ActivityUser>
                        {
                            new ActivityUser
                            {
                                AppUserId = 1,
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            }
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}