@echo off
echo ========================================
echo Fixing Delivery Panda Setup
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Creating placeholder images...
node create-pngs.js
if %errorlevel% neq 0 (
    echo ERROR: Failed to create images
    pause
    exit /b 1
)
echo.

echo [2/5] Removing old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f package-lock.json
echo.

echo [3/5] Cleaning npm cache...
call npm cache clean --force
echo.

echo [4/5] Installing updated dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo Installation had warnings. Trying with --legacy-peer-deps...
    call npm install --legacy-peer-deps
)
echo.

echo [5/5] Clearing Metro bundler cache...
if exist .expo rmdir /s /q .expo
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo.

echo ========================================
echo Setup Complete! 
echo ========================================
echo.
echo To start the development server:
echo   npx expo start --clear
echo.
echo Then scan the QR code with Expo Go app
echo ========================================
pause
