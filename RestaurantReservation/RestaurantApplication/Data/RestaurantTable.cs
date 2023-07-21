namespace RestaurantApplication.Data
{
    public class RestaurantTable
    {
        //Data: M1-10, O1-10, B1-10
        public int Id { get; set; }
        public string Number { get; set; }
        public List<ReservedTable> ReservedTables { get; set; }
    }
}