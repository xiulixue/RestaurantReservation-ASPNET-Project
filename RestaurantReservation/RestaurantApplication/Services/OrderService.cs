using RestaurantApplication.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using RestaurantApplication.Models.Api;
using MongoDB.Bson;

namespace RestaurantApplication.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _ordercollection;
        public OrderService(IOptions<MyDemoDatabaseSettings> myDemoDatabaseSettings)
        {
            var mongoClient = new MongoClient(
             myDemoDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                myDemoDatabaseSettings.Value.DatabaseName);

            _ordercollection = mongoDatabase.GetCollection<Order>(
                myDemoDatabaseSettings.Value.OrderCollectionName);
        }
        public async Task<List<Order>> GetAsync() =>
        await _ordercollection.Find(_ => true).ToListAsync();

        public async Task<Order?> GetAsync(ObjectId id) =>
            await _ordercollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Order newItem) =>
            await _ordercollection.InsertOneAsync(newItem);

        public async Task UpdateAsync(ObjectId id, Order updatedItem) =>
            await _ordercollection.ReplaceOneAsync(x => x.Id == id, updatedItem);
           // await _ordercollection.UpdateOneAsync(x => x.Id == id, updatedItem);

        public async Task RemoveAsync(ObjectId id) =>
            await _ordercollection.DeleteOneAsync(x => x.Id == id);
    }












}

