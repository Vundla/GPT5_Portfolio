Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Write-Host "Installing Gravity CLI into repo..."

pnpm add -D @gravityci/cli

$pkg = Get-Content package.json -Raw | ConvertFrom-Json
if (-not $pkg.scripts.'check:gravity') {
  $pkg.scripts.'check:gravity' = 'gravityci check'
  $pkg | ConvertTo-Json -Depth 10 | Set-Content package.json -Encoding UTF8
  Write-Host "Added script: check:gravity"
}

Write-Host "Gravity installed. Run: pnpm run check:gravity"
