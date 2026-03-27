@echo off
cd /d "c:\Job Portfolio\delivery-panda"

mkdir rider-app
mkdir rider-app\app
mkdir rider-app\app\(auth)
mkdir rider-app\app\(rider)
mkdir rider-app\app\(drawer)
mkdir rider-app\app\(admin)
mkdir rider-app\components
mkdir rider-app\components\ui
mkdir rider-app\components\layout
mkdir rider-app\components\order
mkdir rider-app\components\home
mkdir rider-app\mock
mkdir rider-app\store
mkdir rider-app\constants
mkdir rider-app\assets
mkdir rider-app\assets\images

echo.
echo Directory structure created successfully!
echo.
dir /s /b rider-app | find "\"
