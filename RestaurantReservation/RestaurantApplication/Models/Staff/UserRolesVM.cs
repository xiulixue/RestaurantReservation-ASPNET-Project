using System.ComponentModel.DataAnnotations;

namespace RestaurantApplication.Models.Staff
{
    public class UserRolesVM
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Role")]
        public string Role { get; set; }
        
    }
}
