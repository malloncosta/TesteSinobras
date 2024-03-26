using Microsoft.AspNetCore.Mvc;
using Webapi.Application.Services;

namespace Webapi.Controllers
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
                var token = TokenService.GenerateToken(new Domain.Model.Employee(username, 123, 2516545, "Adm", 6000, "sfasfds"));
                return Ok(token);
            }

            return BadRequest("username or password invalid");
        }
    }
}
