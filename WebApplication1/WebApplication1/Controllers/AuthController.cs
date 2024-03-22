using Microsoft.AspNetCore.Mvc;
using WebApplication1.Application.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Auth(string username, string password)
        {
            if(username == "user" && password == "123")
            {
                var token = TokenService.GenerateToken(new Domain.Model.Employee(username, 123, "sfsdafds"));
                return Ok(token);
            }

            return BadRequest("username or password invalid");
        }
    }
}
