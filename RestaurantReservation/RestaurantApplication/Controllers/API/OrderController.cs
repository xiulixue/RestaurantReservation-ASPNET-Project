using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using RestaurantApplication.Models.Api;
using RestaurantApplication.Services;
using Microsoft.AspNetCore.Http;
using RestaurantApplication.Controllers.Api;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Options;
using RestaurantApplication.Data;
using Microsoft.EntityFrameworkCore;

namespace RestaurantApplication.Controllers.API
{
    [ApiController]
    [Route("api/v1/order")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly MenuService _menuService;
        private readonly IMongoCollection<Order> _ordercollection;
        private readonly IMongoCollection<MenuItem> _menucollection;
        protected readonly ApplicationDbContext _context;

        public OrderController(OrderService orderService, MenuService menuService, IOptions<MyDemoDatabaseSettings> myDemoDatabaseSettings, ApplicationDbContext context)
        {
            _orderService = orderService;
            _menuService = menuService;
            _context = context;

            var mongoClient = new MongoClient(
             myDemoDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                myDemoDatabaseSettings.Value.DatabaseName);

            _ordercollection = mongoDatabase.GetCollection<Order>(
                myDemoDatabaseSettings.Value.OrderCollectionName);

            _menucollection = mongoDatabase.GetCollection<MenuItem>(
                myDemoDatabaseSettings.Value.MenuCollectionName);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _orderService.GetAsync();
            var otherData = result.Select((order) => new
            {
                Id = order.Id.ToString(),
                order.TableId,
                order.Items,
                order.Date
            }).ToList();
            return Ok(otherData);
        }

        [HttpGet("tables")]
        public IActionResult GetTable()
        {
            var tables = _context.Tables.ToList();

            return Ok(tables);
        }

        [HttpPost("start")]
        public async Task<IActionResult> StartNewOrder([FromBody] Order newItem)
        {
            await _orderService.CreateAsync(newItem);

            return CreatedAtAction(nameof(Get), new { id = newItem.Id.ToString() }, new
            {
                Id = newItem.Id.ToString(),
                newItem.Items,
                newItem.Date,
                newItem.TableId
            });
        }

        [HttpPut("orderitem")]
        public async Task<IActionResult> OrderItem(OrderItemModel model)
        {
            var menuItemIds = model.MenuItemIds;
            var menufilter = Builders<MenuItem>.Filter.In(s => s.ItemId, menuItemIds);
            List<MenuItem> menuItems = await _menucollection.Find(menufilter).ToListAsync();

            if (menuItems.Count == 0)
            {
                return BadRequest();
            }

            var updateBuilder = Builders<Order>.Update;
            var updateOps = new List<UpdateDefinition<Order>>();
            foreach (var menuItemId in menuItemIds)
            {
                var filter = Builders<Order>.Filter
                .Eq(c => c.Id, new ObjectId(model.OrderId));
                Order order = await _ordercollection.Find(filter).FirstOrDefaultAsync();

                if (order == null)
                {
                    return BadRequest("Invalid order ID.");
                }
                var menuItem = menuItems.FirstOrDefault(m => m.ItemId == menuItemId);

                if (menuItem != null)
                {
                    OrderItem newitem = new OrderItem()
                    {
                        MeunItemId = menuItem.Id,
                        ItemName = menuItem.ItemName,
                        Description = menuItem.Description,
                        Category = menuItem.Category,
                        ImgUrl = menuItem.ImgUrl,
                        Price = menuItem.Price
                    };

                    order.Items.Add(newitem);

                    var updateOp = updateBuilder.Push((c) => c.Items, newitem);
                    updateOps.Add(updateOp);

                    var combinedUpdate = updateBuilder.Combine(updateOps);
                    _ordercollection.UpdateOne((c) => c.Id == order.Id, combinedUpdate);
                }
            }
            return Ok();
        }

        public class OrderItemModel
        {
            [Required]
            public List<string?> MenuItemIds { get; set; }

            [Required]
            public string? OrderId { get; set; }
        }
    }
}

























