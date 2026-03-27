#!/usr/bin/env node

/**
 * Script to generate placeholder PNG images for Expo app
 * Uses sharp library to create simple colored rectangle images
 */

const fs = require('fs');
const path = require('path');

// Try to load sharp, fall back to jimp if not available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('sharp not found, attempting to use jimp...');
}

const imagesDir = path.join(__dirname, 'assets', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Image specifications
const images = [
  { name: 'icon.png', width: 1024, height: 1024, color: '#FF6B35' },
  { name: 'splash.png', width: 1284, height: 2778, color: '#004E89' },
  { name: 'adaptive-icon.png', width: 1024, height: 1024, color: '#1B4965' },
  { name: 'favicon.png', width: 48, height: 48, color: '#2D5A8C' }
];

async function generateWithSharp() {
  console.log('Generating images with sharp...');
  for (const image of images) {
    const filepath = path.join(imagesDir, image.name);
    try {
      await sharp({
        create: {
          width: image.width,
          height: image.height,
          channels: 3,
          background: image.color
        }
      })
        .png()
        .toFile(filepath);
      console.log(`✓ Created ${image.name}`);
    } catch (err) {
      console.error(`✗ Error creating ${image.name}:`, err.message);
    }
  }
}

async function generateWithJimp() {
  console.log('Generating images with jimp...');
  try {
    const Jimp = require('jimp');
    
    for (const image of images) {
      const filepath = path.join(imagesDir, image.name);
      try {
        // Parse color hex to RGB
        const color = image.color.replace('#', '0x');
        const newImage = new Jimp({
          width: image.width,
          height: image.height,
          color: parseInt(color + 'FF', 16) // Add alpha channel
        });
        await newImage.write(filepath);
        console.log(`✓ Created ${image.name}`);
      } catch (err) {
        console.error(`✗ Error creating ${image.name}:`, err.message);
      }
    }
  } catch (err) {
    console.error('jimp not available, creating stub files...');
    createStubFiles();
  }
}

function createStubFiles() {
  console.log('Creating stub PNG files...');
  // Minimal valid PNG file (1x1 transparent pixel)
  // PNG signature + IHDR chunk + IDAT chunk + IEND chunk
  const minimalPng = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
    0x00, 0x00, 0x00, 0x0d, // IHDR chunk length
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x01, // width: 1
    0x00, 0x00, 0x00, 0x01, // height: 1
    0x08, 0x06, 0x00, 0x00, 0x00, // bit depth, color type, etc.
    0x1f, 0x15, 0xc4, 0x89, // CRC
    0x00, 0x00, 0x00, 0x0c, // IDAT chunk length
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0xfe, 0xff,
    0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // data
    0xd5, 0xcc, 0xcc, 0x4f, // CRC
    0x00, 0x00, 0x00, 0x00, // IEND chunk length
    0x49, 0x45, 0x4e, 0x44, // IEND
    0xae, 0x42, 0x60, 0x82  // CRC
  ]);

  for (const image of images) {
    const filepath = path.join(imagesDir, image.name);
    try {
      fs.writeFileSync(filepath, minimalPng);
      console.log(`✓ Created ${image.name} (stub)`);
    } catch (err) {
      console.error(`✗ Error creating ${image.name}:`, err.message);
    }
  }
}

// Main execution
(async () => {
  try {
    if (sharp) {
      await generateWithSharp();
    } else {
      await generateWithJimp();
    }
    console.log('\n✓ All placeholder images created successfully!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
