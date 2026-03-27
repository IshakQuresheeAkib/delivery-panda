@echo off
echo Cleaning npm cache and dependencies...
cd /d "%~dp0"

if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    echo Removing package-lock.json...
    del /f package-lock.json
)

echo Cleaning npm cache...
call npm cache clean --force

echo Installing dependencies...
call npm install

echo.
echo Done! If you still see errors, try:
echo npm install --legacy-peer-deps
pause
