using ASM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASM.Controllers
{
    public class ClientController : Controller
    {
        private readonly DataContext _context;

        public ClientController(DataContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            var dataContext = _context.Products.Include(p => p.Category);
            return View(await dataContext.ToListAsync());
        }
    }
}
