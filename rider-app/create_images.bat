@echo off
REM Create placeholder PNG images for Expo app

setlocal enabledelayedexpansion

set "IMAGES_DIR=assets\images"

if not exist "%IMAGES_DIR%" (
    mkdir "%IMAGES_DIR%"
)

REM Create the PNG files using Python one-liner
python3 -c "import base64, os; png = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='); files = ['assets/images/icon.png', 'assets/images/icon.png', 'assets/images/adaptive-icon.png', 'assets/images/favicon.svg']; [open(f, 'wb').write(png) for f in files]; print('All placeholder PNGs created successfully!')"

if %ERRORLEVEL% EQU 0 (
    echo ✓ Placeholder images created successfully
) else (
    echo ✗ Failed to create images
    exit /b 1
)
