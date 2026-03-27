@echo off
cd /d "c:\Job Portfolio\delivery-panda"

echo === 1. All tracked files ===
git ls-files

echo.
echo === 2. Checking node_modules ===
git ls-files | findstr "node_modules"

echo.
echo === 3. Checking .expo ===
git ls-files | findstr ".expo"

echo.
echo === 4. Checking dist ===
git ls-files | findstr "dist"

echo.
echo === 5. Checking .DS_Store ===
git ls-files | findstr ".DS_Store"

echo.
echo === 6. Checking .log ===
git ls-files | findstr ".log"

echo.
echo === 7. Checking .env ===
git ls-files | findstr ".env"
