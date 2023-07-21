using RestaurantApplication.Data;

namespace RestaurantApplication.Models
{
    public class ReservedTableVM
    {
        public Data.Reservation Reservation { get; set; }
        public List<RestaurantTable> Tables { get; set; } = new();
        public TableInfo[] reservetables { get; set; }
    }

    public class TableInfo
    {
        public string TableNumber { get; set; }
        public bool Available { get; set; }
        public bool Selected { get; set; }
    }
}
