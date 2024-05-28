using ASM.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASM.Controllers
{
	public class ProductController : Controller
	{
		public IActionResult Index()
		{
			//gọi model lấy dữ liệu từ db

			var listProducts = new List<ProductModel>
			{
				new ProductModel
				{
					Id = 1,
					Description = "Test",
					Name = "Chai coca 1.5L",
					Price = 39000,
					Image = "https://product.hstatic.net/200000291373/product/5_d2293e415c6142949f9dc6eaee0bbf6f_dc28a94958c145e2ac484bb6662d0c15_5dd6cfd760674f8ea8c435ded66d8c28_grande.png"
				},

                new ProductModel
                {
                    Id = 2,
                    Description = "Test",
                    Name = "Chai coca 1.5L",
                    Price = 39000,
                    Image = "https://product.hstatic.net/200000291373/product/5_d2293e415c6142949f9dc6eaee0bbf6f_dc28a94958c145e2ac484bb6662d0c15_5dd6cfd760674f8ea8c435ded66d8c28_grande.png"
                }
            };
			return View(listProducts);
		}
	}
}
