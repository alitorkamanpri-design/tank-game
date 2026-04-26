@echo off
REM سرور محلی - برنامه مدیریت اضافه‌کاری
REM Local Server - Overtime Management App
chcp 65001 >nul
cls

echo.
echo =========================================================
echo مدیریت اضافه‌کاری - سرور محلی
echo Overtime Management - Local Server
echo =========================================================
echo.

REM بررسی کردن Python نصب شده است یا نه
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ خطا: Python نصب نشده است
    echo ❌ Error: Python is not installed
    echo.
    echo لطفاً Python را از اینجا دانلود کنید:
    echo Please download Python from: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo ✅ Python پیدا شد
echo ✅ Python found

REM درایو را پیدا کن
cd /d "%~dp0"

echo.
echo 🚀 سرور راه‌اندازی می‌شود...
echo 🚀 Starting server...
echo.

python server.py

if errorlevel 1 (
    echo.
    echo ❌ خطایی رخ داد
    echo ❌ An error occurred
    pause
)

pause
