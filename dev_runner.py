import os
import shutil
import subprocess
import threading

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")

def resolve_php() -> str:
    fallback = r"C:\Users\PC\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe\php.exe"
    if os.path.exists(fallback):
        return fallback
    # Fall back to PATH when the preferred PHP 8.3 binary is unavailable.
    php = shutil.which("php")
    if php:
        return php
    return fallback

def run_backend():
    print("[BACKEND] Starting Laravel server...")
    php = resolve_php()
    print("[BACKEND] Running migrations...")
    subprocess.run([php, "artisan", "migrate", "--force"], cwd=BACKEND_DIR)
    subprocess.run([php, "artisan", "serve", "--host=127.0.0.1", "--port=8000"], cwd=BACKEND_DIR)

def run_frontend():
    print("[FRONTEND] Starting Angular server...")
    subprocess.run("npm run start -- --host 127.0.0.1 --port 4200", shell=True, cwd=FRONTEND_DIR)

if __name__ == "__main__":
    # Create threads
    t_back = threading.Thread(target=run_backend)
    t_front = threading.Thread(target=run_frontend)

    # Start threads
    t_back.start()
    t_front.start()

    # Keep main alive
    t_back.join()
    t_front.join()
