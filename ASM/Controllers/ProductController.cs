using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ASM.Models;

namespace ASM.Controllers
{
	public class ProductController : Controller

	{
        private readonly DataContext _context;

        public ProductController(DataContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
		{
            var dataContext = _context.Products.Include(p => p.Category);
            return View(await dataContext.ToListAsync());

            //gọi model lấy dữ liệu từ db 

            //var listProducts = new List<ProductModel>
            //{
            //    new ProductModel
            //    {
            //        Id = 1,
            //        Description = "Test",
            //        Name = "Chai coca 1.5L",
            //        Price = 39000,
            //        Image = "https://product.hstatic.net/200000291373/product/5_d2293e415c6142949f9dc6eaee0bbf6f_dc28a94958c145e2ac484bb6662d0c15_5dd6cfd760674f8ea8c435ded66d8c28_grande.png"
            //    },

            //    new ProductModel
            //    {
            //        Id = 2,
            //        Description = "Test",
            //        Name = "Chai coca 1.5L",
            //        Price = 39000,
            //        Image = "https://product.hstatic.net/200000291373/product/5_d2293e415c6142949f9dc6eaee0bbf6f_dc28a94958c145e2ac484bb6662d0c15_5dd6cfd760674f8ea8c435ded66d8c28_grande.png"
            //    }
            //};
            //return View(listProducts);


        }
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

    }
}
