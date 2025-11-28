Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "Starting dev environment..."

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host "Docker Desktop required." -ForegroundColor Yellow
  exit 1
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Host "pnpm missing. Run bootstrap.ps1 first." -ForegroundColor Yellow
  exit 1
}

docker-compose up -d postgres

Write-Host "Running pnpm dev..."
pnpm dev
