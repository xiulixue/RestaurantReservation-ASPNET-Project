using RestaurantApplication.Data;

namespace RestaurantApplication.Models
{
    public class ReservationEditVM
    {
        public int reservationId { get; set; }
        public int SittingId { get; set; }
        public Sitting Sitting { get; set; }
        public int Guests { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public string? Notes { get; set; }
        public string selectedSitting { get; set; }
        public string selectedStatus { get; set; }
        public List<ReservationStatus> Statuses { get; set; } = new();
        public string selectedSource { get; set; }
        public List<ReservationSource> ReservationSources { get; set; } = new();
    }
}
