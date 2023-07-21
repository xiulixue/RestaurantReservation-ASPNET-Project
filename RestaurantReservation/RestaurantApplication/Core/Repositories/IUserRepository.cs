using Microsoft.AspNetCore.Identity;

namespace RestaurantApplication.Core.Repositories
{
    public interface IUserRepository
    {
        ICollection<IdentityUser> GetUsers();
        IdentityUser GetUser(string id);
        IdentityUser UpdateUser(IdentityUser user);
    }
}
