Write-Host "Connecting to Portfolio Database Terminal..." -ForegroundColor Cyan

if (Get-Command "docker" -ErrorAction SilentlyContinue) {
    # Check if container is running
    $container = docker ps -q -f name=portfolio-postgres
    if ($container) {
        Write-Host "Launching psql session..." -ForegroundColor Green
        docker exec -it portfolio-postgres psql -U admin -d portfolio_db
    } else {
        Write-Warning "PostgreSQL container is not running. Please run 'start_project.ps1' or 'docker compose up -d' first."
    }
} else {
    Write-Warning "Docker command not found. Cannot launch database terminal."
}
