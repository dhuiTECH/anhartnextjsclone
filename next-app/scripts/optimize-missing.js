const sharp = require('sharp');
const path = require('path');

const images = [
  { input: 'src/assets/expert-consultation.jpg', name: 'expert-consultation' },
  { input: 'src/assets/Trusted-Partners.jpeg', name: 'Trusted-Partners' }
];

const sizes = [
  { width: 320, height: 180, suffix: '320x180' },
  { width: 384, height: 216, suffix: '384x216' },
  { width: 512, height: 288, suffix: '512x288' },
  { width: 640, height: 360, suffix: '640x360' }
];

async function optimizeImages() {
  for (const img of images) {
    console.log(`\nOptimizing: ${img.name}`);
    for (const size of sizes) {
      const output = path.join('src/assets/baseAssets', `${img.name}-${size.suffix}.webp`);
      try {
        await sharp(img.input)
          .resize(size.width, size.height, { fit: 'cover' })
          .webp({ quality: 85 })
          .toFile(output);
        const stats = require('fs').statSync(output);
        console.log(`  ✓ ${size.suffix} - ${(stats.size / 1024).toFixed(1)}KB`);
      } catch (error) {
        console.error(`  ✗ ${size.suffix} failed:`, error.message);
      }
    }
  }
  console.log('\n✨ Optimization complete!');
}

optimizeImages();
