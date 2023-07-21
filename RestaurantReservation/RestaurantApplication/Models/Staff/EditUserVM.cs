using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace RestaurantApplication.Models.Staff
{
    public class EditUserVM
    {
        public IdentityUser User { get; set; }
        public IList<SelectListItem> Roles { get; set; }
    }
}
