namespace RestaurantApplication.Data
{
    public class Area
    {
        //Data: Main, Balcony, Outside
        public int Id { get; set; }
        public string Name { get; set; }
        public List<RestaurantTable> Tables { get; set; }
    }
}