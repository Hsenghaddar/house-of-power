@echo off
cd /d "%~dp0"
if not exist node_modules (
  call npm install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Starting House of Power at http://localhost:5173
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "for ($attempt=0; $attempt -lt 30; $attempt++) { try { $response=Invoke-WebRequest -Uri 'http://localhost:5173' -UseBasicParsing; if ($response.StatusCode -eq 200) { Start-Process 'http://localhost:5173'; break } } catch {}; Start-Sleep -Milliseconds 500 }"
call npm run dev -- --port 5173 --strictPort
pause
