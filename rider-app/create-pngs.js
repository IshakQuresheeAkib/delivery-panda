const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, r, g, b) {
  // Create a simple PNG with solid color background
  const imageData = [];
  
  // Create scanlines (width + 1 bytes per line: filter byte + RGB bytes)
  for (let y = 0; y < height; y++) {
    imageData.push(0); // Filter type: None
    for (let x = 0; x < width; x++) {
      imageData.push(r);
      imageData.push(g);
      imageData.push(b);
    }
  }
  
  const rawData = Buffer.from(imageData);
  const compressedData = zlib.deflateSync(rawData);
  
  // Helper function to write big-endian 32-bit number
  const write32 = (value) => {
    return Buffer.from([
      (value >> 24) & 0xFF,
      (value >> 16) & 0xFF,
      (value >> 8) & 0xFF,
      value & 0xFF
    ]);
  };
  
  // Helper function to calculate CRC
  const crc32 = (data) => {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
      }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  };
  
  // Build PNG file
  const chunks = [];
  
  // PNG signature
  chunks.push(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  
  // IHDR chunk
  const ihdr = Buffer.concat([
    Buffer.from('IHDR'),
    write32(width),
    write32(height),
    Buffer.from([8, 2, 0, 0, 0]) // 8-bit depth, RGB, no compression, no filter, no interlace
  ]);
  chunks.push(write32(ihdr.length - 4));
  chunks.push(ihdr);
  chunks.push(write32(crc32(ihdr)));
  
  // IDAT chunk
  const idat = Buffer.concat([
    Buffer.from('IDAT'),
    compressedData
  ]);
  chunks.push(write32(idat.length - 4));
  chunks.push(idat);
  chunks.push(write32(crc32(idat)));
  
  // IEND chunk
  const iend = Buffer.from('IEND');
  chunks.push(write32(0));
  chunks.push(iend);
  chunks.push(write32(crc32(iend)));
  
  return Buffer.concat(chunks);
}

const imagesDir = path.join(__dirname, 'assets', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create images with different colors
const images = [
  { name: 'icon.png', width: 1024, height: 1024, r: 255, g: 107, b: 53 },      // #FF6B35
  { name: 'icon.png', width: 1284, height: 2778, r: 0, g: 78, b: 137 },      // #004E89
  { name: 'adaptive-icon.png', width: 1024, height: 1024, r: 27, g: 73, b: 101 }, // #1B4965
  { name: 'favicon.svg', width: 48, height: 48, r: 45, g: 90, b: 140 }         // #2D5A8C
];

images.forEach(img => {
  const filepath = path.join(imagesDir, img.name);
  const pngBuffer = createPNG(img.width, img.height, img.r, img.g, img.b);
  fs.writeFileSync(filepath, pngBuffer);
  console.log(`✓ Created ${img.name} (${img.width}x${img.height})`);
});

console.log('\n✓ All placeholder PNG images created successfully!');
