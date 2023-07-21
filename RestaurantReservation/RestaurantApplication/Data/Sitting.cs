namespace RestaurantApplication.Data
{
    public class Sitting
    {
        public int Id { get; set; }
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
        public int SittingTypeId { get; set; }
        public SittingType SittingType { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Capacity { get; set; }
        public int Vacancies { get => Capacity - Reservations.Sum(r => r.Guests); }
        public bool Active { get; set; } = true;
        public List<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}