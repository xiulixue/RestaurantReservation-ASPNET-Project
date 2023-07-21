using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Models.Reservation;
using RestaurantApplication.Services;

namespace RestaurantApplication.Areas.Membership.Controllers
{
    public class ReservationController : MembershipController
    {
        private readonly UserManager<IdentityUser> _userManager;

        public ReservationController(ApplicationDbContext context, PersonService personService, UserManager<IdentityUser> userManager) : base(context, personService)
        {
            _userManager = userManager;
        }

        public IActionResult Sittings()
        {
            var sittings = _context.Sittings
                .Include(s => s.SittingType)
                .Where(s => s.Active)
                .ToList();
            var selectSitting = new SelectSittingVM
            {
                Sittings = sittings,
            };
            return View(selectSitting);
        }

        [HttpGet]
        public async Task<IActionResult> GetSittingsForDate(DateTime datetime)
        {
            var sittings = await _context.Sittings
                .Where(s => (s.StartTime.Date == datetime.Date) && s.Active) //&& (datetime >= DateTime.Now) 
                .OrderBy(s => s.StartTime)
                .Select(s => new {
                    s.Id,
                    displayText = $"{s.SittingType.Name} ({s.StartTime.ToString("hh:mm tt")}-{s.EndTime.ToString("hh:mm tt")})",
                    s.Vacancies,
                    s.Active
                })
                .ToListAsync();

            return Json(sittings);
        }

        [HttpPost]
        public async Task<IActionResult> Sittings(SelectSittingVM m)
        {
            var sittings = _context.Sittings
                .FirstOrDefault(a => a.Id == m.selectSittingId);

            return RedirectToAction("Create", new { id = m.selectSittingId });
        }


        [HttpGet] //id = sittingId
        public async Task<IActionResult> Create(int id)
        {
            var userEmail = "";
            var user = await _userManager.GetUserAsync(User);
            if (user != null)
            {
                userEmail = user.Email;                
            }
            var sitting = await _context.Sittings
                .Include(s => s.SittingType)
                .FirstAsync(s => s.Id == id);

            var datetimeRange1 = sitting.StartTime;
            var datetimeRange2 = sitting.EndTime;
            var msg = $"{sitting.SittingType.Name} Start: {sitting.StartTime} End: {sitting.EndTime}";
            
            var m = new Create
            {
                SittingId = sitting.Id,
                Sitting = msg,
                ReservationSources = new SelectList(_context.ReservationSources, "Id", "Name"),
                ReservationSourceId = 2,
                StartTime = sitting.StartTime,
                Duration = 60,
                Guests = 1,
                DateTimeRange1 = datetimeRange1,
                DateTimeRange2 = datetimeRange2,
                Email= userEmail,                 
            };
            return View(m);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create m)
        {
            var sitting = _context.Sittings.Include(s => s.Reservations)
                .FirstOrDefault(a => a.Id == m.SittingId);
                
            if (sitting == null)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                try
                {
                    var reservation = new Reservation
                    {
                        SittingId = m.SittingId,
                        Duration = m.Duration,
                        Guests = m.Guests,
                        Notes = m.Notes ?? "",
                        Person = await _personService.FindOrCreateAsync(m.Email, m.FirstName, m.LastName, m.PhoneNumber),
                        StartTime = m.StartTime,
                        SourceId = m.ReservationSourceId,
                        StatusId = 1
                    };
                    _context.Reservations.Add(reservation);
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Confirmed", new { id = reservation.Id });
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("Exception", ex.Message);
                }
            }
            m.ReservationSources = new SelectList(_context.ReservationSources, "Id", "Name");
            return View(m);
        }

        public IActionResult Confirmed(int id)
        {
            var pending = _context.Reservations
                .Include(r => r.Status)
                .Include(r => r.Source)
                .Include(r => r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .First(r => r.Id == id);
            return View(pending);
        }

        public async Task<IActionResult> History()
        {
            var userEmail = "";
            var user = await _userManager.GetUserAsync(User);
            if(user != null)
            {
                userEmail = user.Email;
                ViewBag.Email = userEmail;
            }
            var reservation = _context.Reservations
                .Include(r=>r.Person)
                .Include(r => r.Status)
                .Include(r => r.Source)
                .Include(r=> r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .Where(r => r.Person.Email == userEmail)
                .OrderByDescending(r => r.StartTime)
                .ToList();

            return View(reservation);
        }
    }
}
