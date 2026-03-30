@echo off
echo ========================================
echo Delivery Panda Complete Setup
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Creating placeholder images...
node create-pngs.js
if %errorlevel% neq 0 (
    echo ERROR: Failed to create images
    pause
    exit /b 1
)
echo.

echo [2/4] Cleaning old files...
if exist .expo rmdir /s /q .expo
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo.

echo [3/4] Clearing Metro bundler cache...
npx expo start --clear
echo Press Ctrl+C after it starts...
timeout /t 5
echo.

echo ========================================
echo Setup Complete! 
echo ========================================
echo.
echo To start the development server:
echo   npm start
echo   OR
echo   npx expo start
echo.
echo Then scan the QR code with Expo Go app
echo ========================================
pause
