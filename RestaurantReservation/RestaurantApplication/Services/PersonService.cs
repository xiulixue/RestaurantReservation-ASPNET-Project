using Microsoft.EntityFrameworkCore;
using RestaurantApplication.Data;

namespace RestaurantApplication.Services
{
    public class PersonService
    {
        private readonly ApplicationDbContext _context;

        public PersonService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Person> FindOrCreateAsync(string email,string firstName, string lastName,string phone)
        {
            var p = await _context.People
              .FirstOrDefaultAsync(s => s.Email.ToLower().Trim() == email.ToLower().Trim());

            if(p == null)
            {
                p = new Person
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    PhoneNumber = phone
                };
                _context.People.Add(p);
                await _context.SaveChangesAsync();
            }
            return p; 
        }
    }
}
