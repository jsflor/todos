using Microsoft.AspNetCore.Mvc;
using TodoApi.Helpers;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;


namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly AuthHelper _authHelper;

        public AuthController(TodoContext context, AuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            if (_context.Users.Any(u => u.Email == request.Email))
                return BadRequest("User already exists.");

            var user = new User
            {
                Email = request.Email,
                Password = AuthHelper.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !AuthHelper.VerifyPassword(request.Password, user.Password))
                return BadRequest("Invalid credentials.");

            var token = _authHelper.CreateToken(user);
            return Ok(token);
        }
    }

    public class UserDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}