const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RESPONSIVE_WIDTHS = [320, 384, 512, 640, 768, 1024, 1280];
const MAX_FILE_SIZE = 200 * 1024;
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'baseAssets');

async function optimizeImage(inputPath, baseFileName) {
  try {
    console.log(`\nOptimizing: ${baseFileName}`);
    
    const metadata = await sharp(inputPath).metadata();
    const originalWidth = metadata.width;
    const originalHeight = metadata.height;
    const aspectRatio = originalWidth / originalHeight;

    for (const width of RESPONSIVE_WIDTHS) {
      if (width > originalWidth) continue;

      const height = Math.round(width / aspectRatio);
      const outputPath = path.join(OUTPUT_DIR, `${baseFileName}-${width}x${height}.webp`);

      let quality = 85;
      let fileSize = MAX_FILE_SIZE + 1;
      let attempts = 0;

      while (fileSize > MAX_FILE_SIZE && quality > 40 && attempts < 10) {
        await sharp(inputPath)
          .resize(width, height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality, effort: 6 })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        fileSize = stats.size;
        
        if (fileSize > MAX_FILE_SIZE) {
          quality -= 5;
          attempts++;
        }
      }

      const finalSize = (fileSize / 1024).toFixed(1);
      console.log(`  ✓ ${width}x${height} - ${finalSize}KB (quality: ${quality})`);
    }

    console.log(`✅ Completed: ${baseFileName}`);
    return true;
  } catch (error) {
    console.error(`❌ Error optimizing ${baseFileName}:`, error.message);
    return false;
  }
}

async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('-') 
  );

  console.log(`Found ${imageFiles.length} images to optimize in ${dirPath}\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(dirPath, file);
    const baseFileName = path.parse(file).name;
    await optimizeImage(inputPath, baseFileName);
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const directories = [
    path.join(__dirname, '..', 'src', 'assets'),
    path.join(__dirname, '..', 'src', 'assets', 'portfolioAssets'),
    path.join(__dirname, '..', 'public', 'blog'),
    path.join(__dirname, '..', 'public', 'images')
  ];

  console.log('🚀 Starting image optimization...\n');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Target: Under ${MAX_FILE_SIZE / 1024}KB per file\n`);

  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      console.log(`\n📁 Processing: ${dir}`);
      await processDirectory(dir);
    }
  }

  console.log('\n✨ Image optimization complete!');
}

main().catch(console.error);
