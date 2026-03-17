using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Services;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiAnalyzerController : ControllerBase
{
    private readonly GeminiService _geminiService;

    public AiAnalyzerController(GeminiService geminiService)
    {
        _geminiService = geminiService;
    }

    [HttpPost("certification")]
    public async Task<IActionResult> AnalyzeCertification([FromBody] AnalysisRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.Content))
        {
            return BadRequest("Content is required.");
        }

        var prompt = $"Act as a career counselor AI. Analyze this certification: '{request.Content}'. " +
                     "Provide a 1-sentence summary of the key skills it validates and why it's valuable " +
                     "for a software engineer. Keep it concise (max 20 words).";

        var analysis = await _geminiService.AnalyzeContentAsync(prompt);
        return Ok(new { analysis });
    }

    [HttpPost("project")]
    public async Task<IActionResult> AnalyzeProject([FromBody] AnalysisRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.Content))
        {
            return BadRequest("Content is required.");
        }

        var prompt = $"Act as a technical interviewer. Analyze this project description: '{request.Content}'. " +
                     "Highlight the most impressive technical aspect or complexity solved. " +
                     "Keep it under 25 words.";

        var analysis = await _geminiService.AnalyzeContentAsync(prompt);
        return Ok(new { analysis });
    }

    public class AnalysisRequest
    {
        public string Content { get; set; } = string.Empty;
    }
}