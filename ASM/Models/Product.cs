namespace ASM.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string Image {  get; set; }
        public int Count { get; set; }
        public int CategoryId { get; set; } 

        public Category? Category { get; set; }

        public virtual List<OrderProduct>? OrderProducts { get; set; }
    }


}
