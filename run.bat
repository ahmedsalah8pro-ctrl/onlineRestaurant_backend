@echo off
setlocal enableextensions enabledelayedexpansion

echo [BACKEND] Starting Laravel server...
echo [FRONTEND] Starting Angular server...
echo.

REM Prefer PHP 8.3+ explicitly for Laravel 13, then fall back to PATH if needed.
set "PHP_BIN=C:\Users\PC\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe"
if not exist "%PHP_BIN%" (
  set "PHP_BIN="
  where php >nul 2>nul
  if errorlevel 1 (
    echo [ERROR] PHP 8.3+ not found. Install PHP 8.3 or update PHP_BIN in run.bat
    exit /b 1
  ) else (
    set "PHP_BIN=php"
  )
)

REM Start backend (port 8000)
start "Backend API (Laravel)" cmd /k "cd /d \"%~dp0backend\" && \"%PHP_BIN%\" artisan serve --host=127.0.0.1 --port=8000"

REM Start frontend (port 4200)
start "Frontend (Angular)" cmd /k "cd /d \"%~dp0frontend\" && npm run start -- --host 127.0.0.1 --port 4200"

echo.
echo [OK] Backend:  http://127.0.0.1:8000
echo [OK] Frontend: http://127.0.0.1:4200
echo.
echo Close the opened windows to stop the servers.
endlocal
