@echo off
setlocal enableextensions

set "ROOT_DIR=%~dp0"
set "RUNNER=%ROOT_DIR%dev_runner.py"

if not exist "%RUNNER%" (
  echo [ERROR] dev_runner.py was not found: %RUNNER%
  exit /b 1
)

cd /d "%ROOT_DIR%"

echo.
echo [RUNNER] Starting backend and frontend via dev_runner.py...
echo [INFO] Backend:  http://127.0.0.1:8000
echo [INFO] Frontend: http://127.0.0.1:4200
echo.

where python >nul 2>nul
if not errorlevel 1 (
  python "%RUNNER%"
  exit /b %errorlevel%
)

where py >nul 2>nul
if not errorlevel 1 (
  py -3 "%RUNNER%"
  exit /b %errorlevel%
)

echo [ERROR] Python was not found. Install Python 3 or add it to PATH.
exit /b 1
