using Microsoft.AspNetCore.Mvc;

namespace ASM.Controllers
{
    public class ClientController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
