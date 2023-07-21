using RestaurantApplication.Core.Repositories;

namespace RestaurantApplication.Core
{
    public class UnitOfWork: IUnitOfWork
    {
        public IUserRepository User { get; }
        public IRoleRepository Role { get; }

        public UnitOfWork(IUserRepository user, IRoleRepository role)
        {
            User = user;
            Role = role;
        }
    }
}
