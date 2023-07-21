using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;
using System.Data;

namespace RestaurantApplication.Areas.Administration.Controllers
{
    [Authorize(Roles = "Manager")]
    public class SittingtypeController : AdministrationController
    {
        protected readonly ApplicationDbContext _context;

        public SittingtypeController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        //Sitting Type Manage
        //Sitting Type - Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ActionName(nameof(Create))]
        public async Task<IActionResult> CreateConfirm(SittingType t)
        {
            if (ModelState.IsValid)
            {
                var s = new SittingType()
                {
                    Name = t.Name
                };
                _context.SittingTypes.Add(s);
                await _context.SaveChangesAsync();
                return RedirectToAction("List");
            }
            return View(t);
        }
        //Sitting Type list
        public IActionResult List()
        {
            var sittingTypes = _context.SittingTypes.ToList();
            return View(sittingTypes);
        }
        //Sitting Type Delete
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var sittingType = await _context.SittingTypes
                .FirstOrDefaultAsync(s => s.Id == id);
            if (sittingType == null)
            {
                return NotFound();
            }
            return View(sittingType);
        }
        [HttpPost]
        [ActionName(nameof(Delete))]
        public async Task<IActionResult> DeleteConfirm(int id)
        {
            var sittingTypes = await _context.SittingTypes
                .FirstOrDefaultAsync(s => s.Id == id);
            if (sittingTypes == null)
            {
                return NotFound();
            }
            _context.SittingTypes.Remove(sittingTypes);

            await _context.SaveChangesAsync();
            return RedirectToAction("List");
        }

    }
}
