using System.ComponentModel.DataAnnotations.Schema;

namespace ASM.Models
{
    public class OrderProduct
    {
        public int Id { set; get; }
        public int OrderId { set; get; }
        public int ProductId { set; get; }
        public int Quantity { set; get; }

        public decimal Price { set; get; }

        public virtual Order Order { get; set; }

        public virtual Product Product { get; set; }
    }
}
