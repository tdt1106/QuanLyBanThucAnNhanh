namespace ASM.Models
{
    public class Order
    {
        public int Id { set; get; }

        public DateTime OrderDate { set; get; }
        public string ShipName { set; get; }
        public string ShipAddress { set; get; }
        public string ShipEmail { set; get; }
        public string ShipPhoneNumber { set; get; }
        public string Status { set; get; }

        public virtual List<OrderProduct>? OrderProducts { get; set; }
    }
}
