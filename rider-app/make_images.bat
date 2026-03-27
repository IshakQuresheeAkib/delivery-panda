@echo off
REM Minimal PNG creation script using Python
python -c "
import base64
import os

# Minimal valid PNG (1x1 transparent)
png_data = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')

# Create directory
os.makedirs('assets/images', exist_ok=True)

# Create files
files = ['assets/images/icon.png', 'assets/images/splash.png', 'assets/images/adaptive-icon.png', 'assets/images/favicon.png']
for f in files:
    with open(f, 'wb') as fp:
        fp.write(png_data)
    print('✓ Created ' + f)

print('All placeholder PNG images created!')
"
