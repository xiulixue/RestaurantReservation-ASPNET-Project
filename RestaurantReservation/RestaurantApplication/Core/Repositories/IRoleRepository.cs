using Microsoft.AspNetCore.Identity;

namespace RestaurantApplication.Core.Repositories
{
    public interface IRoleRepository
    {
        ICollection<IdentityRole> GetRoles();
    }
}
