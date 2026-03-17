namespace Portfolio.API.Models;

public class Certification
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Issuer { get; set; }
    public string? Description { get; set; }
    public string Category { get; set; } = "General"; // New Category Field
    
    // Borrowed Design Logic
    public string Columns { get; set; } = "col-md-4";
    public string Style { get; set; } = "card-primary";
    
    // AI Analysis Data
    public string? AiAnalysis { get; set; }
    public DateTime DateIssued { get; set; }
}
