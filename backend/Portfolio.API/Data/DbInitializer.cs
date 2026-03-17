using Portfolio.API.Models;

namespace Portfolio.API.Data;

public static class DbInitializer
{
    public static void Initialize(PortfolioContext context)
    {
        // Ensure database is created
        context.Database.EnsureCreated();

        // Check if any certifications exist
        if (context.Certifications.Any())
        {
            return; // DB has been seeded
        }

        var certifications = new Certification[]
        {
            // --- Software Development (18 Columns/Items) ---
            new Certification
            {
                Title = "Certified Chaos Engineer",
                Issuer = "Gremlin",
                Category = "Software Development",
                Description = "Advanced chaos engineering practices.",
                Columns = "col-md-4",
                Style = "card-primary",
                AiAnalysis = "Demonstrates resilience capability.",
                DateIssued = DateTime.UtcNow.AddMonths(-6)
            },
            new Certification
            {
                Title = "Pony Language Expert",
                Issuer = "Pony Lang",
                Category = "Software Development",
                Description = "Actor-model concurrency.",
                Columns = "col-md-4",
                Style = "card-accent",
                AiAnalysis = "High concurrency knowledge.",
                DateIssued = DateTime.UtcNow.AddYears(-1)
            },
            // ... Add 16 more Software Dev certs here ...

            // --- AI Bootcamp (15 Columns/Items) ---
            new Certification
            {
                Title = "AI & Machine Learning Specialist",
                Issuer = "Bootcamp X",
                Category = "AI Bootcamp",
                Description = "Deep Learning & Neural Networks.",
                Columns = "col-md-4",
                Style = "card-primary",
                AiAnalysis = "Strong AI foundation.",
                DateIssued = DateTime.UtcNow.AddMonths(-2)
            },
             // ... Add 14 more AI Bootcamp certs here ...

            // --- ALX Software Engineering ---
            new Certification
            {
                Title = "ALX Software Engineer",
                Issuer = "ALX Africa",
                Category = "ALX Software Engineering",
                Description = "Full stack software engineering program.",
                Columns = "col-md-6", // Highlighted
                Style = "card-accent",
                AiAnalysis = "Comprehensive engineering background.",
                DateIssued = DateTime.UtcNow.AddYears(-2)
            },

            // --- AI Badge ---
            new Certification
            {
                Title = "Verified AI Practitioner Badge",
                Issuer = "OpenAI / Microsoft",
                Category = "AI Badge",
                Description = "Verified skills in Generative AI.",
                Columns = "col-md-3",
                Style = "card-primary",
                AiAnalysis = "Verified AI skillset.",
                DateIssued = DateTime.UtcNow.AddMonths(-1)
            }
        };

        context.Certifications.AddRange(certifications);
        context.SaveChanges();
    }
}

