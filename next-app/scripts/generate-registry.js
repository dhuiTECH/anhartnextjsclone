const fs = require('fs');
const path = require('path');

const BASE_ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets', 'baseAssets');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'assets', 'registry.ts');

function toCamelCase(str) {
  let cleaned = str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
  
  if (/^\d/.test(cleaned)) {
    cleaned = 'img' + cleaned;
  }
  
  cleaned = cleaned.replace(/[^\w]/g, '');
  
  return cleaned;
}

function getImageGroups() {
  const files = fs.readdirSync(BASE_ASSETS_DIR);
  const webpFiles = files.filter(f => f.endsWith('.webp'));
  
  const groups = {};
  
  webpFiles.forEach(file => {
    const match = file.match(/^(.+?)-(\d+)x(\d+)\.webp$/);
    if (match) {
      const [, name, width, height] = match;
      if (!groups[name]) {
        groups[name] = [];
      }
      groups[name].push({ file, width: parseInt(width), height: parseInt(height) });
    }
  });
  
  Object.keys(groups).forEach(name => {
    groups[name].sort((a, b) => a.width - b.width);
    
    const uniqueWidths = [];
    const seenWidths = new Set();
    
    groups[name].forEach(variant => {
      if (!seenWidths.has(variant.width)) {
        seenWidths.add(variant.width);
        uniqueWidths.push(variant);
      }
    });
    
    groups[name] = uniqueWidths;
  });
  
  return groups;
}

function generateRegistry() {
  const groups = getImageGroups();
  const imageNames = Object.keys(groups).sort();
  
  let imports = [];
  let registryEntries = [];
  
  imageNames.forEach(imageName => {
    const variants = groups[imageName];
    const camelName = toCamelCase(imageName);
    
    const sizeLabels = ['Sm', 'Md', 'Lg', 'Xl'];
    const maxVariants = Math.min(variants.length, 4);
    
    const webpImports = variants.slice(0, maxVariants).map((v, idx) => {
      const size = sizeLabels[idx];
      return `import ${camelName}${size} from './baseAssets/${v.file}';`;
    });
    
    imports.push(...webpImports);
    
    const fallbackFile = `${imageName}.png`;
    const fallbackPath = path.join(__dirname, '..', 'src', 'assets', fallbackFile);
    const fallbackExists = fs.existsSync(fallbackPath);
    
    if (fallbackExists) {
      imports.push(`import ${camelName}Fallback from './${fallbackFile}';`);
    }
    
    const webpSizes = variants.slice(0, maxVariants).map((v, idx) => {
      const size = sizeLabels[idx].toLowerCase();
      const sizeCap = sizeLabels[idx];
      return `${size}: ${camelName}${sizeCap}`;
    }).join(', ');
    
    const dimensionsSizes = variants.slice(0, maxVariants).map((v, idx) => {
      const size = sizeLabels[idx].toLowerCase();
      return `${size}: { width: ${v.width}, height: ${v.height} }`;
    }).join(', ');
    
    registryEntries.push(`  '${imageName}': {
    webp: { ${webpSizes} },
    fallback: ${fallbackExists ? `${camelName}Fallback` : `${camelName}Sm`},
    dimensions: { ${dimensionsSizes} },
  }`);
  });
  
  const registryContent = `/**
 * Auto-generated Image Registry
 * Generated on: ${new Date().toISOString()}
 * 
 * This file maps image names to their optimized WebP variants.
 * All images are optimized to under 200KB for fast loading.
 */

${imports.join('\n')}

export interface ImageVariants {
  sm: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface ImageDimensions {
  sm: { width: number; height: number };
  md?: { width: number; height: number };
  lg?: { width: number; height: number };
  xl?: { width: number; height: number };
}

export interface ImageEntry {
  webp: ImageVariants;
  fallback: string;
  dimensions: ImageDimensions;
}

export const imageRegistry: Record<string, ImageEntry> = {
${registryEntries.join(',\n')}
};

export function getImage(name: string): ImageEntry | null {
  return imageRegistry[name] || null;
}

export function getImageNames(): string[] {
  return Object.keys(imageRegistry);
}
`;
  
  fs.writeFileSync(OUTPUT_FILE, registryContent);
  console.log(`✅ Generated registry with ${imageNames.length} images`);
  console.log(`📝 Output: ${OUTPUT_FILE}`);
}

generateRegistry();
