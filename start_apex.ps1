# APEX Automotive Intelligence OS - Startup Script
# Run this from the project root to start the backend server

Write-Host ""
Write-Host "  APEX AUTOMOTIVE INTELLIGENCE OS       " -ForegroundColor Red
Write-Host "          Backend Server v1.0               " -ForegroundColor Red
Write-Host ""
Write-Host "  Starting FastAPI backend on http://localhost:8000" -ForegroundColor Gray
Write-Host "  API Docs: http://localhost:8000/docs" -ForegroundColor Gray
Write-Host "  Open frontend: file:///C:/Users/lavis/OneDrive/Desktop/cars/index.html" -ForegroundColor Yellow
Write-Host ""

# Check for API key
$envFile = "$PSScriptRoot\backend\.env"
$envContent = Get-Content $envFile -Raw
if ($envContent -match "your_gemini_api_key_here") {
    Write-Host "  Warning: No Gemini API key set in backend\.env" -ForegroundColor Yellow
    Write-Host "     AI scanning will use mock data." -ForegroundColor Gray
    Write-Host "     To enable real AI: edit backend\.env and set GEMINI_API_KEY=..." -ForegroundColor Gray
    Write-Host ""
}

cd backend
python main.py
