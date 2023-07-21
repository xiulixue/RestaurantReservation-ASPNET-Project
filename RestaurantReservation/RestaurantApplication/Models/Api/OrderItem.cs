using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RestaurantApplication.Models.Api
{
    public class OrderItem
    {
        [BsonElement("menuitem_id")]
        public ObjectId MeunItemId { get; set; }

        public string ItemName { get; set; } = null!;
        public decimal Price { get; set; }
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImgUrl { get; set; } = null!;
        public int Qty { get; set; }    
    }
}
