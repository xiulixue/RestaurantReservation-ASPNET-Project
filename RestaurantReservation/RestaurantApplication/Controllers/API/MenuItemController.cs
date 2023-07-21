using RestaurantApplication.Services;
using RestaurantApplication.Models;
using RestaurantApplication.Models.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;

namespace RestaurantApplication.Controllers.Api
{
    [ApiController]
    [Route("api/v2/menuitem")]
    public class MenuItemController : Controller
    {
        private readonly MenuService _menuService;
        public MenuItemController(MenuService menuService) => _menuService = menuService;


        [HttpGet]
        public async Task<object> Get() {

            var products = await _menuService.GetAsync();
            var result = products.Select(p => new
            {
                Id = p.Id.ToString(),
                p.Price,
                p.ItemName,
                p.Description,
                p.ImgUrl,
                p.Category
            }).ToList();

            return result; 
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<MenuItem>> GetDetail(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
            {
                return BadRequest("Invalid ObjectId format");
            }
            var menuItemDetail = await _menuService.GetAsync(objectId);

            if (menuItemDetail is null)
            {
                return NotFound();
            }

            return menuItemDetail;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MenuItem newItem)
        {
            await _menuService.CreateAsync(newItem);
            return CreatedAtAction(nameof(Get), new { id = newItem.Id }, newItem);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, MenuItem updatedItem)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
            {
                return BadRequest("Invalid ObjectId format");
            }
            var menuItem = await _menuService.GetAsync(objectId);

            if (menuItem is null)
            {
                return NotFound();
            }

            updatedItem.Id = menuItem.Id;

            await _menuService.UpdateAsync(objectId, updatedItem);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
            {
                return BadRequest("Invalid ObjectId format");
            }
            var menuItem = await _menuService.GetAsync(objectId);

            if (menuItem is null)
            {
                return NotFound();
            }

            await _menuService.RemoveAsync(objectId);

            return NoContent();
        }

    }
}
