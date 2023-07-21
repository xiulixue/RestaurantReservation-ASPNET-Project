using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Models;
using System.Data;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    [Authorize(Roles = "Manager")]
    public class SittingController : AdministrationController
    {
        protected readonly ApplicationDbContext _context;

        public SittingController(ApplicationDbContext context): base(context)
        {
            _context = context;
        }

        public IActionResult Main()
        {
            var sittings = _context.Sittings
                .Include(s => s.Reservations)
                .Include(s => s.SittingType)
                .OrderBy(s => s.StartTime)
                .ToList();

            foreach(var s in sittings)
            {
                if (s.StartTime.Date < DateTime.Now.Date)
                {
                    s.Active = false;
                    _context.SaveChanges();
                }
            }

            return View(sittings);
        }

        public async Task<IActionResult> Details(int id)
        {
            var sittings = await _context.Sittings
                .Include(s => s.Reservations)
                .Include(s => s.SittingType)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (sittings == null)
            {
                return NotFound();
            }
            return View(sittings);
        }

        public IActionResult Create()
        {
            var sittingTypes = _context.SittingTypes.ToList();
            var sets = new SetSittingVM()
            {
                SittingTypes = sittingTypes,
            };

            return View(sets);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SetSittingVM s)
        {
            var st = await _context.SittingTypes
                .FirstOrDefaultAsync(t => t.Name == s.selectedSittingType);
            if (st == null)
            {
                st = new SittingType { Name = s.selectedSittingType };
            }

            var restaurant = await _context.Restaurant
                .FirstOrDefaultAsync(r => r.Id == s.restaurantId);
            if (restaurant == null)
            {
                restaurant = new Restaurant { Id = s.restaurantId };
            }

            st.Name = s.selectedSittingType;

            var sitting = new Sitting
            {
                Capacity = s.capacity,
                StartTime = s.startTime,
                EndTime = s.endTime,
                Active = true,
                RestaurantId = s.restaurantId = 1,
                SittingType = st
            };

            
            await _context.SaveChangesAsync();

            int repeatForNumberOfDays = s.numberOfRepeat;
            var start = s.startTime;
            var end = s.endTime;
            var sittingType = st;
            var capacity = s.capacity;

            if (repeatForNumberOfDays > 1)
            {
                for (int i = 0; i < repeatForNumberOfDays; i++)
                {
                    start = start.AddDays(1);
                    end = end.AddDays(1);
                    _context.Sittings.Add(new Sitting
                    {
                        StartTime = start,
                        EndTime = end,
                        SittingType = sittingType,
                        RestaurantId = 1,
                        Active = true,
                        Capacity = capacity
                    });
                }


            }
            _context.Sittings.Add(sitting);
            await _context.SaveChangesAsync();

            return RedirectToAction("Created", new { id = sitting.Id });
        }
        
        //Sittings Created successful
        public IActionResult Created(int id)
        {
            var sittingsCreated = _context.Sittings.First(r => r.Id == id);
            return View();
        }

        //Existing Sittings Delete
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var sittings = await _context.Sittings
                .Include(s => s.Reservations)
                .Include(s => s.SittingType)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (sittings == null)
            {
                return NotFound();
            }
            return View(sittings);
        }
        [HttpPost]
        [ActionName(nameof(Delete))]
        public async Task<IActionResult> Confirm(int id)
        {
            var sittings = await _context.Sittings
                .FirstOrDefaultAsync(s => s.Id == id);
            if (sittings == null)
            {
                return NotFound();
            }
            _context.Sittings.Remove(sittings);

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Main));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {

            var sitting = await _context.Sittings
                .Include(s => s.Reservations)
                .Include(s => s.SittingType)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sitting == null)
            {
                return NotFound();
            }

            return View(sitting);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(Sitting r)
        {
            var sitting = await _context.Sittings
                .FirstOrDefaultAsync(s => s.Id == r.Id);
            if (sitting == null)
            {
                return NotFound();
            }
            sitting.StartTime = r.StartTime;
            sitting.EndTime = r.EndTime;
            sitting.Capacity = r.Capacity;
            sitting.Active = r.Active;

            await _context.SaveChangesAsync();

            return RedirectToAction("Details", new { id = r.Id });
        }

    }
}
