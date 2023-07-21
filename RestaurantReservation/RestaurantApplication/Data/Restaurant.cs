namespace RestaurantApplication.Data
{
    public class Restaurant
    {
        //restaurant name: Bean Scene
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Area> Areas { get; set; } = new();
        public List<Sitting> Sittings { get; set; } = new List<Sitting>();
    }
}
