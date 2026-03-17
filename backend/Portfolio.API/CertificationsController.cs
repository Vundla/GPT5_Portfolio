using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CertificationsController : ControllerBase
{
    private readonly ILogger<CertificationsController> _logger;
    private readonly PortfolioContext _context;

    public CertificationsController(ILogger<CertificationsController> logger, PortfolioContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCertifications()
    {
        try
        {
            // Fetch from database and project to match frontend expectations
            var certs = await _context.Certifications.ToListAsync();
            
            var result = certs.Select(c => new 
            {
                Id = c.Id,
                Title = c.Title,
                Issuer = c.Issuer,
                DesignParams = new { Columns = c.Columns, Style = c.Style },
                AiAnalysis = c.AiAnalysis
            });

            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Database unavailable. Returning cached/mock data.");
            
            // Fallback / Degraded Mode
            var offlineCerts = new[]
            {
                new { 
                    Id = -1, 
                    Title = "Offline Mode (Fault Tolerance Active)", 
                    Issuer = "System", 
                    DesignParams = new { Columns = "col-12", Style = "card-accent" },
                    AiAnalysis = "Database is unreachable. Serving content from local cache." 
                }
            };
            return Ok(offlineCerts);
        }
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> AnalyzeProject([FromBody] ProjectAnalysisRequest request)
    {
        // Mock AI environmental analysis
        // In reality, this would call Semantic Kernel or OpenAI API
        await Task.Delay(100); // Simulate processing
        
        return Ok(new { 
            Potential = "High Impact", 
            SkillsDetected = new[] { "Fault Tolerance", "Actor Model", ".NET Core" },
            Review = $"The project '{request.Description.Substring(0, Math.Min(20, request.Description.Length))}...' exhibits strong architectural patterns."
        });
    }
}
