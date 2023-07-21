using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace RestaurantApplication.Models.Api
{
    public class MenuItem
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string? Id { get; set; }
        public ObjectId Id { get; set; }

        public string ItemId { get; set; }

        //[BsonElement("Name")]
        //[JsonPropertyName("Name")]
        public string ItemName { get; set; } = null!;
        public decimal Price { get; set; }
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string ImgUrl { get; set; } = null!;
        //public string Dietary {get;set;} //Gulten Free, Vegetarian, Vegan, allergens
        //public bool Availability {get; set;} 
    }
    //insert data to mongoDB, input below line by line in mongosh
}