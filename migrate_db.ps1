Write-Host "Initializing Database Migration..." -ForegroundColor Cyan

# Ensure dotnet is in PATH
$env:Path = "C:\Program Files\dotnet;" + $env:Path

# Check and install dotnet-ef tool if missing
if (-not (Get-Command "dotnet-ef" -ErrorAction SilentlyContinue)) {
    Write-Host "Installing dotnet-ef tool..." -ForegroundColor Yellow
    dotnet tool install --global dotnet-ef
}

Set-Location "backend/Portfolio.API"

# 1. Install necessary packages
Write-Host "Installing EF Core Design package..." -ForegroundColor Yellow
dotnet add package Microsoft.EntityFrameworkCore.Design

# 2. Add Migration
Write-Host "Creating Initial Migration..." -ForegroundColor Yellow
dotnet ef migrations add InitialCreate

# 3. Update Database
Write-Host "Applying Migration to PostgreSQL..." -ForegroundColor Green
dotnet ef database update

if ($LASTEXITCODE -eq 0) {
    Write-Host "--------------------------------------------------------"
    Write-Host "Database Successfully Initialized!" -ForegroundColor Cyan
    Write-Host "To access the Postgres terminal, use the command provided in the chat."
    Write-Host "--------------------------------------------------------"
} else {
    Write-Warning "Migration failed. Please check the error logs above."
}
