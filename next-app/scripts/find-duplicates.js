#!/usr/bin/env node

/**
 * Find Duplicate Files Script
 * 
 * This script identifies duplicate files in the project to help reduce storage usage.
 * It compares files by their content hash (MD5) to find exact duplicates.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Directories to scan
const SCAN_DIRECTORIES = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../public'),
];

// File extensions to check
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.mp4', '.pdf', '.mov', '.avi'];

// Minimum file size to check (in bytes) - skip very small files
const MIN_FILE_SIZE = 1024; // 1KB

function calculateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (EXTENSIONS.includes(ext) && stat.size >= MIN_FILE_SIZE) {
        fileList.push({
          path: filePath,
          size: stat.size,
          ext: ext,
        });
      }
    }
  });

  return fileList;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function main() {
  console.log('🔍 Scanning for duplicate files...\n');

  const allFiles = [];
  SCAN_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`📁 Scanning: ${dir}`);
      const files = findFiles(dir);
      allFiles.push(...files);
    }
  });

  console.log(`\n📊 Found ${allFiles.length} files to check\n`);

  // Group files by hash
  const hashMap = new Map();
  const duplicates = [];

  console.log('🔐 Calculating file hashes...');
  allFiles.forEach((file, index) => {
    try {
      const hash = calculateFileHash(file.path);
      const relativePath = path.relative(process.cwd(), file.path);

      if (hashMap.has(hash)) {
        const existing = hashMap.get(hash);
        duplicates.push({
          hash,
          files: [
            existing,
            { path: relativePath, size: file.size, ext: file.ext }
          ]
        });
      } else {
        hashMap.set(hash, {
          path: relativePath,
          size: file.size,
          ext: file.ext
        });
      }

      if ((index + 1) % 10 === 0) {
        process.stdout.write(`\r   Processed ${index + 1}/${allFiles.length} files...`);
      }
    } catch (error) {
      console.error(`\n❌ Error processing ${file.path}:`, error.message);
    }
  });

  console.log('\n\n📋 Results:\n');

  if (duplicates.length === 0) {
    console.log('✅ No duplicate files found!');
    return;
  }

  let totalWastedSpace = 0;

  duplicates.forEach((dup, index) => {
    const file1 = dup.files[0];
    const file2 = dup.files[1];
    const wastedSpace = file1.size;

    totalWastedSpace += wastedSpace;

    console.log(`\n🔴 Duplicate #${index + 1} (${formatBytes(wastedSpace)} wasted):`);
    console.log(`   ${file1.path}`);
    console.log(`   ${file2.path}`);
  });

  console.log(`\n\n💾 Total wasted space: ${formatBytes(totalWastedSpace)}`);
  console.log(`\n💡 Recommendation: Remove duplicate files and update imports to use a single source.`);
}

main();

