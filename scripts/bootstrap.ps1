Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "Bootstrapping GPT5 Portfolio Monorepo (PowerShell) ..."

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js not installed. Install from https://nodejs.org/" -ForegroundColor Yellow
  exit 1
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  Write-Host "Installing pnpm globally..."
  npm install -g pnpm
}

Write-Host "Installing workspace dependencies..."
pnpm install

Write-Host "Starting Postgres via docker-compose..."
docker-compose up -d postgres

Write-Host "Bootstrap complete. Run .\scripts\dev.ps1 to start development."
