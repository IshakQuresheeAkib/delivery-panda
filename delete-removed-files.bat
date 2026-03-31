@echo off
echo ========================================
echo Deleting removed files from the project
echo ========================================
echo.

cd /d "%~dp0"

echo Deleting app/(auth)/register.tsx...
if exist "app\(auth)\register.tsx" (
    del /f "app\(auth)\register.tsx"
    echo   Deleted!
) else (
    echo   Already deleted or not found.
)

echo Deleting app/(drawer)/map-notes.tsx...
if exist "app\(drawer)\map-notes.tsx" (
    del /f "app\(drawer)\map-notes.tsx"
    echo   Deleted!
) else (
    echo   Already deleted or not found.
)

echo Deleting app/(drawer)/order-history.tsx...
if exist "app\(drawer)\order-history.tsx" (
    del /f "app\(drawer)\order-history.tsx"
    echo   Deleted!
) else (
    echo   Already deleted or not found.
)

echo Deleting app/(drawer)/protocol.tsx...
if exist "app\(drawer)\protocol.tsx" (
    del /f "app\(drawer)\protocol.tsx"
    echo   Deleted!
) else (
    echo   Already deleted or not found.
)

echo Deleting components/ui/CountryPicker.tsx...
if exist "components\ui\CountryPicker.tsx" (
    del /f "components\ui\CountryPicker.tsx"
    echo   Deleted!
) else (
    echo   Already deleted or not found.
)

echo.
echo ========================================
echo All removed files have been deleted!
echo ========================================
echo.
echo After running this script, restart your
echo Expo dev server with: npx expo start --clear
echo ========================================
pause
