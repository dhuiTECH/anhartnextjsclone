#!/bin/bash

# Image Optimization Script
# Converts large PNG/JPG files to WebP format to reduce storage and improve loading

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if sharp is available (Node.js) or use ImageMagick/ffmpeg
if command -v node &> /dev/null; then
    echo -e "${GREEN}Using Node.js/Sharp for conversion${NC}"
    NODE_AVAILABLE=true
else
    echo -e "${YELLOW}Node.js not found. Please install ImageMagick or use online tools.${NC}"
    NODE_AVAILABLE=false
fi

# Directory to optimize
ASSETS_DIR="./src/assets"
OUTPUT_DIR="./src/assets/optimized"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Large files to optimize (over 500KB)
LARGE_FILES=(
    "src/assets/portfolioAssets/Merritt.png"
    "src/assets/Ryder_1.png"
    "src/assets/162Main.png"
    "src/assets/portfolioAssets/Kwas.png"
    "src/assets/Meritt_TH_1.png"
    "src/assets/AFS_1.png"
    "src/assets/merritt.png"
    "src/assets/anhart-logo.png"
    "src/assets/portfolioAssets/affordapartment.png"
    "src/assets/162Main_2.png"
)

echo -e "${GREEN}Image Optimization Script${NC}"
echo "================================"
echo ""
echo "This script will convert large PNG/JPG files to WebP format."
echo "Original files will be kept as fallbacks."
echo ""

if [ "$NODE_AVAILABLE" = true ]; then
    # Create a Node.js script for conversion
    cat > /tmp/convert-images.js << 'EOF'
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);

async function convertToWebP(inputPath) {
    try {
        const ext = path.extname(inputPath).toLowerCase();
        if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
            console.log(`Skipping ${inputPath} (not a supported format)`);
            return;
        }

        const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const stats = fs.statSync(inputPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`Converting ${inputPath} (${sizeMB}MB)...`);

        await sharp(inputPath)
            .webp({ quality: 85, effort: 6 })
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
        const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        console.log(`  ✓ Created ${outputPath} (${newSizeMB}MB, ${savings}% smaller)`);
    } catch (error) {
        console.error(`  ✗ Error converting ${inputPath}:`, error.message);
    }
}

(async () => {
    for (const file of files) {
        if (fs.existsSync(file)) {
            await convertToWebP(file);
        } else {
            console.log(`File not found: ${file}`);
        }
    }
})();
EOF

    echo "Converting large images to WebP..."
    node /tmp/convert-images.js "${LARGE_FILES[@]}"
    rm /tmp/convert-images.js
else
    echo -e "${YELLOW}Manual conversion required.${NC}"
    echo ""
    echo "Please convert these files to WebP format:"
    for file in "${LARGE_FILES[@]}"; do
        if [ -f "$file" ]; then
            size=$(du -h "$file" | cut -f1)
            echo "  - $file ($size)"
        fi
    done
    echo ""
    echo "You can use:"
    echo "  - Online: https://squoosh.app/"
    echo "  - ImageMagick: convert input.png output.webp"
    echo "  - cwebp: cwebp -q 85 input.png -o output.webp"
fi

echo ""
echo -e "${GREEN}Optimization complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update imports to use .webp files where available"
echo "2. Keep .png/.jpg files as fallbacks"
echo "3. Test images in different browsers"

