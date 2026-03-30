#!/usr/bin/env python3
"""
Generate placeholder PNG images for Expo app
Creates simple colored rectangle images using PIL/Pillow if available,
otherwise creates minimal valid PNG files programmatically.
"""

import os
import struct
import zlib
from pathlib import Path

def create_solid_png(width, height, color_rgb):
    """
    Create a PNG file with solid color background.
    color_rgb: tuple of (R, G, B) values
    """
    r, g, b = color_rgb
    
    # Create raw image data (no interlacing)
    image_data = bytearray()
    
    for y in range(height):
        image_data.append(0)  # Filter type: None
        for x in range(width):
            image_data.extend([r, g, b])
    
    # Compress the image data
    compressed = zlib.compress(bytes(image_data), 9)
    
    # Helper functions
    def png_chunk(chunk_type, data):
        """Create a PNG chunk with CRC"""
        chunk_data = chunk_type + data
        crc = zlib.crc32(chunk_data) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk_data + struct.pack('>I', crc)
    
    # Build PNG file
    png = b'\x89PNG\r\n\x1a\n'  # PNG signature
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    png += png_chunk(b'IHDR', ihdr_data)
    
    # IDAT chunk
    png += png_chunk(b'IDAT', compressed)
    
    # IEND chunk
    png += png_chunk(b'IEND', b'')
    
    return png

def main():
    # Setup directory
    script_dir = Path(__file__).parent
    images_dir = script_dir / 'assets' / 'images'
    images_dir.mkdir(parents=True, exist_ok=True)
    
    # Image specifications
    images = [
        ('icon.svg', 1024, 1024, (255, 107, 53)),      # #FF6B35
        ('icon.svg', 1284, 2778, (0, 78, 137)),      # #004E89
        ('adaptive-icon.svg', 1024, 1024, (27, 73, 101)),  # #1B4965
        ('favicon.svg', 48, 48, (45, 90, 140))         # #2D5A8C
    ]
    
    # Try using PIL first
    try:
        from PIL import Image
        print("Using PIL/Pillow to create images...")
        
        for name, width, height, color in images:
            filepath = images_dir / name
            img = Image.new('RGB', (width, height), color)
            img.save(filepath, 'PNG')
            print(f"✓ Created {name} ({width}x{height})")
        
        print("\n✓ All placeholder PNG images created successfully with PIL!")
        return
    
    except ImportError:
        print("PIL/Pillow not available, creating PNG files programmatically...")
    
    # Fallback: Create PNG files programmatically
    for name, width, height, color in images:
        filepath = images_dir / name
        png_data = create_solid_png(width, height, color)
        
        with open(filepath, 'wb') as f:
            f.write(png_data)
        
        print(f"✓ Created {name} ({width}x{height})")
    
    print("\n✓ All placeholder PNG images created successfully!")
    print(f"Files created in: {images_dir}")

if __name__ == '__main__':
    main()
