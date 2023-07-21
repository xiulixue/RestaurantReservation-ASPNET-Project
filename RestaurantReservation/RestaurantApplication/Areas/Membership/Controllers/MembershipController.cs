using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Models.Reservation;
using RestaurantApplication.Services;
using System.Data;

namespace RestaurantApplication.Areas.Membership.Controllers
{
    [Area("Membership")]
    [Authorize(Roles = "Member, Staff, Manager")]
    public class MembershipController : Controller
    {
        protected readonly ApplicationDbContext _context;
        protected readonly PersonService _personService;

        public MembershipController(ApplicationDbContext context, PersonService personService)
        {
            _context = context;
            _personService = personService;
        }

    }
}
