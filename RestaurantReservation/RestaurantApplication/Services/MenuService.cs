using RestaurantApplication.Models.Api;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace RestaurantApplication.Services
{
    public class MenuService
    {
        private readonly IMongoCollection<MenuItem> _menuCollection;
        public MenuService(IOptions<MyDemoDatabaseSettings> myDemoDatabaseSettings)
        {
            var mongoClient = new MongoClient(
             myDemoDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                myDemoDatabaseSettings.Value.DatabaseName);

            _menuCollection = mongoDatabase.GetCollection<MenuItem>(
                myDemoDatabaseSettings.Value.MenuCollectionName);
        }
        public async Task<List<MenuItem>> GetAsync() =>
        await _menuCollection.Find(_ => true).ToListAsync();

        public async Task<MenuItem?> GetAsync(ObjectId id) =>
            await _menuCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(MenuItem newItem) =>
            await _menuCollection.InsertOneAsync(newItem);

        public async Task UpdateAsync(ObjectId id, MenuItem updatedItem) =>
            await _menuCollection.ReplaceOneAsync(x => x.Id == id, updatedItem);

        public async Task RemoveAsync(ObjectId id) =>
            await _menuCollection.DeleteOneAsync(x => x.Id == id);

    }
}
