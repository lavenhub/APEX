# APEX Automotive Intelligence OS - Production Deployment Script
# This script orchestrates the full-stack deployment locally.

$frontendPort = 3000
$backendPort = 8000

Write-Host ""
Write-Host "  [!] APEX DEPLOYMENT INITIALIZING..." -ForegroundColor Cyan
Write-Host "  ------------------------------------" -ForegroundColor Cyan

# 1. Dependency Check
Write-Host "  [1/4] Verifying Environment..." -ForegroundColor Gray
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "  Error: Python not found. Please install Python 3.10+." -ForegroundColor Red
    exit
}

# 2. Install/Update Dependencies
Write-Host "  [2/4] Syncing Backend Dependencies..." -ForegroundColor Gray
Set-Location backend
python -m pip install -r requirements.txt --quiet
Set-Location ..

# 3. Start Services
Write-Host "  [3/4] Launching High-Performance Services..." -ForegroundColor Gray

# Start Backend Job
Start-Job -Name "ApexBackend" -ScriptBlock {
    Set-Location "$using:PSScriptRoot\backend"
    python main.py
} | Out-Null

# Start Frontend Job
Start-Job -Name "ApexFrontend" -ScriptBlock {
    Set-Location "$using:PSScriptRoot"
    python -m http.server $using:frontendPort
} | Out-Null

# 4. Finalize
Write-Host "  [4/4] Deployment Success." -ForegroundColor Green
Write-Host ""
Write-Host "  ACCESS POINTS:" -ForegroundColor White
Write-Host "  > Frontend: http://localhost:$frontendPort" -ForegroundColor Yellow
Write-Host "  > Backend:  http://localhost:$backendPort" -ForegroundColor Yellow
Write-Host "  > API Docs: http://localhost:$backendPort/docs" -ForegroundColor Gray
Write-Host ""
Write-Host "  System is now active. Press Ctrl+C or run 'Stop-Job *' to terminate." -ForegroundColor Cyan

# Keep script alive to monitor jobs
while ($true) {
    $backend = Get-Job -Name "ApexBackend"
    $frontend = Get-Job -Name "ApexFrontend"
    
    if ($backend.State -ne "Running" -or $frontend.State -ne "Running") {
        Write-Host "  Warning: A service has stopped unexpectedly." -ForegroundColor Red
        Get-Job | Receive-Job
        break
    }
    Start-Sleep -Seconds 5
}
