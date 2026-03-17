# Check for Administrator privileges and self-elevate if needed
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "Requesting Administrator privileges..." -ForegroundColor Yellow
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    Exit
}

Write-Host "Starting Portfolio Environment Setup..." -ForegroundColor Cyan

# Function to check and install a package via Winget
function Install-Package {
    param (
        [string]$Id,
        [string]$Name
    )
    Write-Host "Checking for $Name..." -ForegroundColor Yellow
    winget list -e --id $Id
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing $Name..." -ForegroundColor Green
        winget install --id $Id -e --source winget --accept-source-agreements --accept-package-agreements
    } else {
        Write-Host "$Name is already installed." -ForegroundColor Gray
    }
}

# 1. Install .NET 8 SDK
Install-Package -Id "Microsoft.DotNet.SDK.8" -Name ".NET 8 SDK"
