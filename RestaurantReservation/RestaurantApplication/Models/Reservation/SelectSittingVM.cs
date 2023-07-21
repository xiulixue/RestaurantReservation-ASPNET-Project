using RestaurantApplication.Data;
using System.ComponentModel.DataAnnotations;

namespace RestaurantApplication.Models.Reservation
{
    public class SelectSittingVM
    {
        [Display(Name = "Select a date:")]
        public DateTime selectDate { get; set; }
        public int selectSittingId { get; set; }
        public List<Sitting> Sittings { get; set; }
        public SittingInfo[] selectedSitting { get; set; }
    }

    public class SittingInfo
    {
        public int sittingId { get; set; }
    }
}
