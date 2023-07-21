using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RestaurantApplication.Data;
using RestaurantApplication.Models;
using System.Diagnostics;

namespace RestaurantApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;

        public HomeController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
            _roleManager = roleManager;
            _userManager = userManager;    

        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult InsertData()
        {
            var check = _context.Restaurant.FirstOrDefault(r => r.Name == "Bean Scene");
            if (check == null)
            {
                //Insert Restaurant Data 
                _context.Restaurant.Add(new Restaurant { Name = "Bean Scene" });

                //Areas
                _context.Areas.Add(new Area { Name = "Main" });
                _context.Areas.Add(new Area { Name = "Balcony" });
                _context.Areas.Add(new Area { Name = "Outside" });

                //Tables
                foreach (var a in _context.Areas.Local)
                {
                    for (int i = 1; i < 11; i++)
                    {
                        if (a.Tables == null)
                        {
                            a.Tables = new List<RestaurantTable>();
                        }

                        a.Tables.Add(new RestaurantTable
                        {
                            Number = $"{a.Name[0].ToString().ToUpper()}{i}"
                        });
                    }
                }

                //SittingType
                _context.SittingTypes.Add(new SittingType { Name = "Breakfast" });
                _context.SittingTypes.Add(new SittingType { Name = "Lunch" });
                _context.SittingTypes.Add(new SittingType { Name = "Dinner" });


                //Status
                _context.Statuses.Add(new ReservationStatus { Name = "Pending" });
                _context.Statuses.Add(new ReservationStatus { Name = "Comfirmed" });
                _context.Statuses.Add(new ReservationStatus { Name = "Seated" });
                _context.Statuses.Add(new ReservationStatus { Name = "Cancelled" });
                _context.Statuses.Add(new ReservationStatus { Name = "Completed" });

                //Sources
                _context.ReservationSources.Add(new ReservationSource { Name = "walk-in" });
                _context.ReservationSources.Add(new ReservationSource { Name = "online" });
                _context.ReservationSources.Add(new ReservationSource { Name = "phone" });

                //Insert Role Data            
                String[] roleNames = { "Member", "Staff", "Manager" };
                foreach (var role in roleNames)
                {
                    if (!_roleManager.Roles.Any(r => r.Name == role))
                    {
                        _roleManager.CreateAsync(new IdentityRole(role)).Wait();
                    }
                }

                //Create Sitting Data
                for (var i = 0; i <= 7; i++)
                {
                    _context.Sittings.Add(new Sitting
                    {
                        RestaurantId = 1,
                        SittingTypeId = 1,
                        StartTime = DateTime.Now.Date.AddDays(i).AddHours(7),
                        EndTime = DateTime.Now.Date.AddDays(i).AddHours(10),
                        Capacity = 30,
                        Active = true,
                    });
                    _context.Sittings.Add(new Sitting
                    {
                        RestaurantId = 1,
                        SittingTypeId = 2,
                        StartTime = DateTime.Now.Date.AddDays(i).AddHours(11),
                        EndTime = DateTime.Now.Date.AddDays(i).AddHours(14),
                        Capacity = 60,
                        Active = true,
                    });
                    _context.Sittings.Add(new Sitting
                    {
                        RestaurantId = 1,
                        SittingTypeId = 3,
                        StartTime = DateTime.Now.Date.AddDays(i).AddHours(17),
                        EndTime = DateTime.Now.Date.AddDays(i).AddHours(20),
                        Capacity = 60,
                        Active = true,
                    });
                }
                _context.SaveChanges();
                //Create a reservation
                var sitting1 = _context.Sittings
                    .Where(r => r.StartTime.Date == DateTime.Now.Date.AddDays(1))
                    .First(r=> r.SittingTypeId ==1);
                _context.Reservations.Add(new Reservation
                {
                    StatusId = 1,
                    Guests = 4,
                    SittingId = sitting1.Id,
                    StartTime = sitting1.StartTime.AddMinutes(30),
                    Duration = 60,
                    Notes = "Testing reservation",
                    SourceId = 2,
                    Person = new Person { FirstName = "Init", LastName = "Test", Email = "test@e.com", PhoneNumber = "0401001002" },
                });

                _context.SaveChanges();
            }

            return View();
        }

        public IActionResult AssignRoleData()
        { 
            var check = _context.Users.FirstOrDefault(u => u.UserName == "manager@e.com");
            if (check == null)
            {
                var managerEmail = "manager@e.com";
                var managerPassword = managerEmail;
                var user = new IdentityUser() 
                { 
                    UserName = managerEmail, 
                    Email = managerEmail,
                    EmailConfirmed= true 
                };
                _userManager.CreateAsync(user, managerPassword).Wait();
                var isManagerTask = _userManager.IsInRoleAsync(user, "Manager");
                isManagerTask.Wait();
                bool isManager = isManagerTask.Result;
                if (!isManager)
                {
                    _userManager.AddToRoleAsync(user, "Manager").Wait();
                }

                var staffEmail = "staff@e.com";
                var staffPassword = staffEmail;
                var sUser = new IdentityUser()
                {
                    UserName = staffEmail,
                    Email = staffEmail,
                    EmailConfirmed = true
                };
                _userManager.CreateAsync(sUser, staffPassword).Wait();
                var isAdminTask = _userManager.IsInRoleAsync(sUser, "Staff");
                isAdminTask.Wait();
                bool isAdmin = isAdminTask.Result;
                if (!isAdmin)
                {
                    _userManager.AddToRoleAsync(sUser, "Staff").Wait();
                }
                _context.SaveChanges();
            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult RedirectUser()
        {
            if(User.IsInRole("Staff,Manager"))
            {
                return RedirectToAction("Index", "Home", new { area = "Administration" });
            } 
            else if (User.IsInRole("Member"))
            {
                return RedirectToAction("Index", "Home", new { area = "Membership" });
            }
            else 
            {
                return RedirectToAction("Index", "Home" );
            }
        }

    }
}