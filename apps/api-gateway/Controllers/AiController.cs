using Microsoft.AspNetCore.Mvc;

namespace ApiGateway.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly Services.AiProxyService _aiService;

    public AiController(Services.AiProxyService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> Analyze([FromBody] AnalyzeRequest request)
    {
        if (string.IsNullOrEmpty(request.Content))
        {
            return BadRequest(new { error = "Content is required" });
        }

        var result = await _aiService.AnalyzeContent(request.Content, request.Type ?? "project");
        return Ok(result);
    }

    [HttpPost("generate")]
    public async Task<IActionResult> Generate([FromBody] GenerateRequest request)
    {
        if (string.IsNullOrEmpty(request.Prompt))
        {
            return BadRequest(new { error = "Prompt is required" });
        }

        var result = await _aiService.Generate(request.Prompt);
        return Ok(new { result });
    }
}

public record AnalyzeRequest(string Content, string? Type);
public record GenerateRequest(string Prompt);
