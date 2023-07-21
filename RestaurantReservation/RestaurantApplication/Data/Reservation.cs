using Microsoft.AspNetCore.Identity;

namespace RestaurantApplication.Data
{
    public class Reservation
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public ReservationStatus Status { get; set; }
        public int Guests { get; set; } //Number of Guest of this reservation
        public int SittingId { get; set; }
        public Sitting Sitting { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; } //default 90 minutes
        public DateTime EndTime { get => StartTime.AddMinutes(Duration); } //Calculated by start time and duration
        public string Notes { get; set; }

        public int SourceId { get; set; }
        public ReservationSource Source { get; set; }
        public List<ReservedTable> ReservedTables { get; set; } = new();
        public Person Person { get; set; }
    }
}