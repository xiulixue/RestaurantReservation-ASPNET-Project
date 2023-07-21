 using Microsoft.AspNetCore.Mvc.Rendering;
using RestaurantApplication.Data;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace RestaurantApplication.Models
{
    public class SetSittingVM
    {
        public int restaurantId { get; set; }
   
        [Display(Name = "Sitting Type: ")]
        public List<SittingType> SittingTypes { get; set; }

        [Required(ErrorMessage = "Please select a sitting type.")]
        public string selectedSittingType { get; set; }

        [Required, Display(Name = "Start Time:")]
        public DateTime startTime { get; set; }

        [Required, Display(Name = "End Time:")]
        public DateTime endTime { get; set; }

        [Required, Display(Name = "Capacity: ")]
        public int capacity { get; set; }
        public bool active { get; set; } = true;//if available for custmoer

        [Display(Name = "Number days of repeat:")]
        public int numberOfRepeat { get; set; } // number days of repeat the sitting  
    }
}
