using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Models;
using System.Data;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    [Area("Administration")]
    [Authorize(Roles = "Staff, Manager")]
    public class AdministrationController : Controller
    {
        protected readonly ApplicationDbContext _context;
        public AdministrationController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
