using Microsoft.AspNetCore.Identity;
using RestaurantApplication.Core.Repositories;
using RestaurantApplication.Data;

namespace RestaurantApplication.Core
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public ICollection<IdentityUser> GetUsers()
        {
            return _context.Users.ToList();
        }

        public IdentityUser GetUser(string id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public IdentityUser UpdateUser(IdentityUser user)
        {
            _context.Update(user);
            _context.SaveChanges();

            return user;
        }
    }
}
