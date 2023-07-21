using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace RestaurantApplication.Models.Reservation
{
    public class Create
    {
        public int SittingId { get; set; }
        public string Sitting { get; set; }

        [Range(1, 10), Display(Name = "Number of Guests:")]
        public int Guests { get; set; }
        [Required, Display(Name = "Start Time:")]
        public DateTime StartTime { get; set; }

        public DateTime DateTimeRange1 { get; set; }
        public DateTime DateTimeRange2 { get; set; }

        [Display(Name = "Duration (in minutes):"), Range(30, 120, ErrorMessage = "Duration must be between 30 - 120 minutes")]
        public int Duration { get; set; }

        [Display(Name = "Notes:")]
        public string? Notes { get; set; }

        [Required, Display(Name = "First Name:")]
        public string FirstName { get; set; }
        [Required, Display(Name = "Last Name:")]
        public string LastName { get; set; }

        [DataType(DataType.EmailAddress), Display(Name = "Email:")]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber), Display(Name = "Phone Number:")]
        public string PhoneNumber { get; set; }

        [Display(Name ="Reservation Source: ")]
        public int ReservationSourceId { get; set; }

        public SelectList? ReservationSources { get; set; }
    }
}
