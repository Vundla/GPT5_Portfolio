$root = Get-Location
Write-Host "Site Root: $root"

Write-Host "Stopping existing services..."
Get-NetTCPConnection -LocalPort 4200,5000,7001 -ErrorAction SilentlyContinue | ForEach-Object { 
    $procId = $_.OwningProcess
    Write-Host "Stopping PID $procId"
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue 
}
Start-Sleep -Seconds 3

Write-Host "Starting Backend (Port 5000)..."
Start-Process powershell -WorkingDirectory "$root\backend\Portfolio.API" -ArgumentList "-NoExit", "-Command", "dotnet build; if ($?) { dotnet run }"

Write-Host "Starting Frontend (Port 4200)..."
Start-Process powershell -WorkingDirectory "$root\frontend" -ArgumentList "-NoExit", "-Command", "npm start"

Write-Host "Services Launching... Please check the new windows."