import base64, os
from pathlib import Path

# Create directory
Path('assets/images').mkdir(parents=True, exist_ok=True)

# Minimal 1x1 PNG with transparent background (valid PNG format)
png1x1 = base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')

files = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png']
for f in files:
    with open(f'assets/images/{f}', 'wb') as fp:
        fp.write(png1x1)
        print(f'Created {f}')
print('All files created!')
