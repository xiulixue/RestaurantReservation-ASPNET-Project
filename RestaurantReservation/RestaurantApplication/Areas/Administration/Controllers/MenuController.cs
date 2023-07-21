using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantApplication.Data;
using RestaurantApplication.Models;
using System.Data;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    [Authorize(Roles = "Manager")]
    public class MenuController : AdministrationController
    {
        protected readonly ApplicationDbContext _context;

        public MenuController(ApplicationDbContext context) : base(context)
        {

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
