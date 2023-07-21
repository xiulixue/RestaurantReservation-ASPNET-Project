using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace RestaurantApplication.Models.Api
{
    public class Order
    {
        public ObjectId Id { get; set; }
        public string TableId { get; set; } = "1";
        public List<OrderItem> Items { get; set; }
        public DateTime? Date { get; set; } = DateTime.Now;

        public Order()
        {
            Items = new List<OrderItem>();
        }
    }
}
