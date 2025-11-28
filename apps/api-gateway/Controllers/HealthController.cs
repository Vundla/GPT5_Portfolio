using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "healthy",
            service = "GPT5 API Gateway",
            version = "1.0.0",
            timestamp = DateTime.UtcNow.ToString("o")
        });
    }
}
