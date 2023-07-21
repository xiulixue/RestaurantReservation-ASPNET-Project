using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Models;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    public class HomeController : AdministrationController 
    { 
        public HomeController(ApplicationDbContext context) : base(context)
        {
            
        }
        public async Task<IActionResult> Index()
        {
            var today = DateTime.Now.Date;
            var tomorrow = today.AddDays(1);
            var sevenDaysLater = today.AddDays(7);

            var reservations = _context.Reservations
                .Where(s => s.StartTime.Date >= today && s.StartTime.Date <= sevenDaysLater)
                .ToList();

            var todayCount = reservations.Count(s => s.StartTime.Date == today);
            var tomorrowCount = reservations.Count(s => s.StartTime.Date == tomorrow);
            var sevenDaysCount = reservations.Count();

            ViewBag.TodayCount = todayCount;
            ViewBag.TomorrowCount = tomorrowCount;
            ViewBag.SevenDaysCount = sevenDaysCount;

            return View(reservations);            
        }
    }
}
