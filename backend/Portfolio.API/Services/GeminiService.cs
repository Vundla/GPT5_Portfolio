using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Portfolio.API.Services;

public class GeminiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _modelId;

    public GeminiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["Gemini:ApiKey"] ?? throw new ArgumentNullException("Gemini:ApiKey");
        _modelId = configuration["Gemini:ModelId"] ?? "gemini-pro";
    }

    public async Task<string> AnalyzeContentAsync(string prompt)
    {
        var requestUrl = $"https://generativelanguage.googleapis.com/v1beta/models/{_modelId}:generateContent?key={_apiKey}";

        var payload = new
        {
            contents = new[]
            {
                new { parts = new[] { new { text = prompt } } }
            }
        };

        var response = await _httpClient.PostAsJsonAsync(requestUrl, payload);
        
        if (!response.IsSuccessStatusCode)
        {
            // Fault Tolerance: Return a default fallback analysis instead of crashing
            return "Analysis momentarily unavailable due to high cognitive load. (API Error)";
        }

        var jsonResponse = await response.Content.ReadFromJsonAsync<GeminiResponse>();
        return jsonResponse?.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text 
               ?? "Analysis completed but returned no insights.";
    }
}

// Minimal DTOs for Gemini Response
public class GeminiResponse
{
    [JsonPropertyName("candidates")]
    public List<Candidate> Candidates { get; set; }
}

public class Candidate
{
    [JsonPropertyName("content")]
    public Content Content { get; set; }
}

public class Content
{
    [JsonPropertyName("parts")]
    public List<Part> Parts { get; set; }
}

public class Part
{
    [JsonPropertyName("text")]
    public string Text { get; set; }
}