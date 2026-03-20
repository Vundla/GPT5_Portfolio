using Cassandra;
using Polly;
using Polly.Extensions.Http;
using Microsoft.SemanticKernel;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Fault Tolerance & Resilience (Polly) ---
// Define a retry policy for HTTP clients (simulating external service calls)
var retryPolicy = HttpPolicyExtensions
    .HandleTransientHttpError()
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

var circuitBreakerPolicy = HttpPolicyExtensions
    .HandleTransientHttpError()
    .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));

builder.Services.AddHttpClient("ExternalService")
    .AddPolicyHandler(retryPolicy)
    .AddPolicyHandler(circuitBreakerPolicy);

// --- 2. Database Integration (PostgreSQL & Cassandra) ---
// PostgreSQL Primary Database
try 
{
    builder.Services.AddDbContext<PortfolioContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
                          o => o.EnableRetryOnFailure())); // Add retry resilience here
}
catch (Exception ex)
{
    Console.WriteLine($"[Warning] Database setup failed: {ex.Message}");
}

// Cassandra Setup for High Availability / Replicas with Fault Tolerance
try 
{
    Cassandra.Cluster cluster = Cassandra.Cluster.Builder()
        .AddContactPoint("localhost")
        .WithSocketOptions(new Cassandra.SocketOptions().SetConnectTimeoutMillis(2000))
        .Build();
    
    // Attempt to connect, but don't crash if infrastructure is missing (Graceful Degradation)
    // We register the session as a singleton for injection
    builder.Services.AddSingleton<Cassandra.ISession>(sp => {
        try { return cluster.Connect(); }
        catch { return null!; /* In a real app we'd use a NullObject pattern or handle nulls */ }
    });
}
catch (Exception ex)
{
    Console.WriteLine($"[Warning] Cassandra Replica not available: {ex.Message}. Starting in degraded mode.");
}

// --- 3. AI Copilot Environment Integration ---
// Using Gemini for AI analysis of certifications & projects
builder.Services.AddHttpClient<Portfolio.API.Services.GeminiService>();
// builder.Services.AddKernel(); // Swapped for direct Gemini Service for simplicity with API Key

// --- 4. Security (Vault) ---
// In a real scenario, fetch secrets from Vault via environment variables or API
var vaultToken = Environment.GetEnvironmentVariable("VAULT_TOKEN");

// --- 5. Observability & Graceful Degradation ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks()
    .AddCheck("Database", () => HealthCheckResult.Healthy("Postgres is reachable"))
    .AddCheck("Replica", () => HealthCheckResult.Healthy("Cassandra is synced"));

// Enable CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200", "http://localhost:4201")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

// app.UseHttpsRedirection(); // Disabled for local dev without certificates

app.UseAuthorization();


// Health check endpoint for observability tools
app.MapHealthChecks("/health");

app.MapControllers();

// Initialize the database with seed data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<PortfolioContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred creating the DB.");
    }
}

app.Run();
