namespace RestaurantApplication.Data
{
    public class ReservedTable
    {
        public int Id { get; set; }
        public RestaurantTable Tables { get; set; }
        public Reservation reservation { get; set; }
    }
}