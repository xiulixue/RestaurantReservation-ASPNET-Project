using Microsoft.AspNetCore.Identity;
using RestaurantApplication.Core.Repositories;
using RestaurantApplication.Data;

namespace RestaurantApplication.Core
{
    public class RoleRepository: IRoleRepository
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public ICollection<IdentityRole> GetRoles()
        {
            return _context.Roles.ToList();
        }
    }
}
