using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApplication.Data;
using RestaurantApplication.Models;
using System.Data;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    [Authorize(Roles = "Manager")]
    public class ViewreportController : AdministrationController
    {
        protected readonly ApplicationDbContext _context;

        public ViewreportController(ApplicationDbContext context) : base(context)
        {

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
