using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Services;

namespace RestaurantApplication.Areas.Membership.Controllers
{
    public class HomeController : MembershipController
    {
        private readonly UserManager<IdentityUser> _userManager;

        public HomeController(ApplicationDbContext context, PersonService personService, UserManager<IdentityUser> userManager) : base(context,personService)
        {
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var userEmail = "";
            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                userEmail = user.Email;
                ViewBag.Email = userEmail;
            }
            var reservation = _context.Reservations
                .Include(r => r.Person)
                .Include(r => r.Status)
                .Include(r => r.Source)
                .Include(r => r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .Where(r => r.Person.Email == userEmail)
                .Where(r => r.StartTime >  DateTime.Now)
                .OrderByDescending(r => r.StartTime)
                .ToList();

            return View(reservation);
        }

        public IActionResult Promotion()
        {
            return View();
        }
    }
}
