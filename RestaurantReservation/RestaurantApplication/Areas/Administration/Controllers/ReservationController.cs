using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using RestaurantApplication.Models;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    public class ReservationController : AdministrationController
    {
        public ReservationController(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<IActionResult> Main(int id)
        {
            var reservations = _context.Reservations
                .Include(r => r.Source)
                .Include(r => r.Person)
                .Include(r => r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .Include(r => r.Status)
                .ToList();
            return View(reservations);
        }

        public async Task<IActionResult> Details(int id)
        {
            var reservation = await _context.Reservations
                .Include(r => r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .Include(r => r.Status)
                .Include(r => r.Source)
                .Include(r => r.Person)
                .Include(r => r.ReservedTables)
                    .ThenInclude(r => r.Tables)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (reservation == null)
            {
                return NotFound();
            }
            return View(reservation);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var r = await _context.Reservations
                .Include(r => r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .Include(r => r.Status)
                .Include(r => r.Source)
                .Include(r => r.ReservedTables)
                    .ThenInclude(r => r.Tables)
                .FirstOrDefaultAsync(r => r.Id == id);
            if (r == null)
            {
                return NotFound();
            }

            var statuses = _context.Statuses.ToList();
            ViewBag.Statuses = new SelectList(statuses, "Id", "Name", r.Status);

            var sources = _context.ReservationSources.ToList();
            ViewBag.Sources = new SelectList(sources, "Id", "Name", r.Source);

            return View(r);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Reservation s)
        {
            var reservation = await _context.Reservations
                .Include(r => r.Sitting)
                .Include(r => r.Status)
                .Include(r => r.ReservedTables)
                    .ThenInclude(r => r.Tables)
                .FirstOrDefaultAsync(r => r.Id == s.Id);
            if (reservation == null)
            {
                return NotFound();
            }

            var existingStatus = await _context.Statuses.FirstOrDefaultAsync(e => e.Id == s.Status.Id);

            if (existingStatus == null)
            {
                return NotFound("Status not found");
            }

            int original = reservation.Guests;

            reservation.Guests = s.Guests;
            reservation.Status = existingStatus;
            reservation.StartTime = s.StartTime;
            reservation.Duration = s.Duration;
            reservation.Notes = s.Notes;

            var rt = _context.ReservedTables.Where(x => x.reservation.Id == reservation.Id);

            await _context.SaveChangesAsync();

            if (reservation.Status.Name == "Cancelled")
            {
                reservation.Guests = 0;
                foreach (ReservedTable r in rt)
                {
                    _context.Remove(r);
                }
                await _context.SaveChangesAsync();
            }

            var sitting = await _context.Sittings
                .FirstOrDefaultAsync(sa => sa.Id == reservation.SittingId);
            sitting.Capacity += original;
            await _context.SaveChangesAsync();
            sitting.Capacity -= reservation.Guests;
            _context.Update(sitting);

            await _context.SaveChangesAsync();

            return RedirectToAction("Details", new { id = s.Id });
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var r = await _context.Reservations
                .Include(r => r.Sitting)
                    .ThenInclude(r => r.SittingType)
                .Include(r => r.Status)
                .Include(r => r.Source)
                .Include(r=>r.Person)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (r == null)
            {
                return NotFound();
            }
            return View(r);
        }

        [HttpPost]
        [ActionName(nameof(Delete))]
        public async Task<IActionResult> DeleteConfirm(int id)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(s => s.Id == id);
            if (reservation == null)
            {
                return NotFound();
            }

            var sitting = await _context.Sittings.FirstOrDefaultAsync(s => s.Id == reservation.SittingId);
            if (sitting != null)
            {
                sitting.Capacity += reservation.Guests;
                _context.Update(sitting);
                await _context.SaveChangesAsync();
            }
            _context.Reservations.Remove(reservation);

            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Main));
        }

        [HttpGet]
        public IActionResult Assign(int id)
        {
            var reservation = _context.Reservations
                .Include(s => s.Sitting)
                .Include(s => s.Person)
                .Include(r => r.ReservedTables)
                    .ThenInclude(c => c.Tables)
                .FirstOrDefault(r => r.Id == id);
            
            var table = _context.Tables
                .Include(m => m.ReservedTables)
                    .ThenInclude(n => n.reservation)
                    .ThenInclude(s => s.Sitting)
                .ToList();

            var taken = _context.ReservedTables
                .Include(c => c.Tables)
                .Include(r => r.reservation.Sitting)
                .Where(t => t.reservation.Sitting.Id == reservation.Sitting.Id)
                .ToList();

            var t = new ReservedTableVM
            {
                Reservation = reservation,
                Tables = table,
                reservetables = table
                    .Select(s => new TableInfo
                    {
                        TableNumber = s.Number,
                        Available = !taken.Exists(ts => ts.Tables.Number == s.Number)
                    })
                    .ToArray()
            };

            return View(t);
        }

        [HttpPost]
        public IActionResult Assign(ReservedTableVM r)
        {
            var reservation = _context.Reservations
                .Include(r => r.ReservedTables)
                    .ThenInclude(c => c.Tables)
                .FirstOrDefault(m => m.Id == r.Reservation.Id);

            foreach (var t in r.reservetables.Where(s => s.Selected))
            {
                var table = _context.Tables.FirstOrDefault(c => c.Number == t.TableNumber);
                if (table != null)
                {
                    reservation.ReservedTables.Add(new ReservedTable { Tables = table });
                }
            }

            _context.SaveChanges();

            return RedirectToAction("AssignedTable", new { id = reservation.Id });
        }

        public IActionResult AssignedTable(int id)
        {
            var assigned = _context.Reservations
                .Include(r => r.ReservedTables)
                    .ThenInclude(c => c.Tables)
                    .First(r => r.Id == id);

            return View(assigned);
        }


        [HttpPost]
        public IActionResult RemoveReservedTables(int reservationId)
        {
            var reservation = _context.Reservations.Include(r => r.ReservedTables).FirstOrDefault(r => r.Id == reservationId);
            if (reservation != null)
            {
                reservation.ReservedTables.Clear();
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
    }
}
