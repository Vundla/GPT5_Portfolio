Write-Host "Initializing GPT-5 Portfolio Systems..." -ForegroundColor Cyan

# 1. Start Infrastructure (Docker)
Write-Host ">> Starting Database & Security Infrastructure..." -ForegroundColor Yellow
if (Get-Command "docker" -ErrorAction SilentlyContinue) {
    Set-Location "infra"
    try {
        docker compose up -d
        if ($LASTEXITCODE -ne 0) { throw "Docker Compose failed" }
        Write-Host "   Infrastructure online." -ForegroundColor Green
    } catch {
        Write-Warning "   Docker infrastructure failed to start. Continuing in DEGRADED MODE (Fault Tolerance active)."
        Write-Warning "   Databases will be unavailable, but the Portfolio will still load."
    }
    Set-Location ..
} else {
    Write-Warning ">> Docker not found. Skipping Infrastructure deployment."
    Write-Warning "   System will run in OFFLINE/DEGRADED mode."
}

# 2. Start Backend

# 2. Start Backend
Write-Host ">> Launching .NET 8 Backend..." -ForegroundColor Yellow
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/Portfolio.API'; dotnet restore; dotnet run" -PassThru
Write-Host "   Backend initializing in a new window..." -ForegroundColor Gray

# 3. Start Frontend
Write-Host ">> Preparing Frontend (Intelligent UI)..." -ForegroundColor Yellow
Set-Location "frontend"
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing frontend dependencies (this happens once)..." -ForegroundColor Magenta
    npm install
}

Write-Host ">> Launching Angular Server..." -ForegroundColor Green
# Use npm start to use local angular cli
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start -- --open"

Write-Host "--------------------------------------------------------"
Write-Host "SYSTEMS ONLINE." -ForegroundColor Cyan
Write-Host "Backend: https://localhost:7001"
Write-Host "Frontend: http://localhost:4200"
Write-Host "--------------------------------------------------------"
