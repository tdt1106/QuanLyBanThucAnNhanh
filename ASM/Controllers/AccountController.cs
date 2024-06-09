//using System.Linq;
//using Microsoft.AspNetCore.Mvc;
//using ASM.Models;
//using Microsoft.CodeAnalysis.Scripting;
//using System;
//using BCrypt.Net;

//namespace ASM.Controllers
//{
//	public class AccountController : Controller
//	{
//		private readonly DataContext _context;

//		public AccountController(DataContext context)
//		{
//			_context = context;
//		}

//		[HttpPost]
//		public IActionResult Register(User user)
//		{
//			if (ModelState.IsValid)
//			{
//				// Kiểm tra xem email đã tồn tại chưa
//				if (_context.Users.Any(u => u.Email == user.Email))
//				{
//					ModelState.AddModelError("", "Email đã tồn tại");
//					return View(user);
//				}

//				// Hash mật khẩu
//				user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

//				_context.Users.Add(user);
//				_context.SaveChanges();
//				return RedirectToAction("Login");
//			}
//			return View(user);
//		}

//		[HttpPost]
//		public IActionResult Login(string email, string password)
//		{
//			var user = _context.Users.SingleOrDefault(u => u.Email == email);

//			if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
//			{
//				// Đăng nhập thành công
//				// Chuyển hướng tới trang client
//				return RedirectToAction("Index", "Client");
//			}

//			ModelState.AddModelError("", "Email hoặc mật khẩu không đúng");
//			return View();
//		}
//	}
//}
