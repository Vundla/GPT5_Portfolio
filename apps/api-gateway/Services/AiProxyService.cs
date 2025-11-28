using System.Text.Json;

namespace ApiGateway.Services;

public class AiProxyService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<AiProxyService> _logger;
    private readonly string _aiPlaygroundUrl;

    public AiProxyService(HttpClient httpClient, ILogger<AiProxyService> logger, IConfiguration config)
    {
        _httpClient = httpClient;
        _logger = logger;
        _aiPlaygroundUrl = config["AiPlayground:Url"] ?? "http://ai-playground:7000";
    }

    public async Task<string> Generate(string prompt)
    {
        try
        {
            var payload = new { prompt };
            var response = await _httpClient.PostAsJsonAsync($"{_aiPlaygroundUrl}/ai/generate", payload);
            response.EnsureSuccessStatusCode();
            
            var result = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();
            if (result != null && result.TryGetValue("result", out var aiResult))
            {
                return aiResult;
            }
            return "No response from AI";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to generate AI response");
            return "AI service temporarily unavailable";
        }
    }

    public async Task<AiAnalysisResult> AnalyzeContent(string content, string type)
    {
        try
        {
            var payload = new { content, type };
            var response = await _httpClient.PostAsJsonAsync($"{_aiPlaygroundUrl}/ai/analyze", payload);
            response.EnsureSuccessStatusCode();
            
            var result = await response.Content.ReadFromJsonAsync<AiAnalysisResult>();
            return result ?? new AiAnalysisResult();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to analyze content");
            return new AiAnalysisResult
            {
                Summary = "Analysis temporarily unavailable",
                Strengths = new List<string>(),
                Improvements = new List<string>(),
                JobMatches = new List<string>()
            };
        }
    }
}

public class AiAnalysisResult
{
    public string Summary { get; set; } = string.Empty;
    public List<string> Strengths { get; set; } = new();
    public List<string> Improvements { get; set; } = new();
    public List<string> JobMatches { get; set; } = new();
    public string CvBulletPoints { get; set; } = string.Empty;
    public string LinkedInHeadline { get; set; } = string.Empty;
}
