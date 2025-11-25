const fs = require('fs');
const path = require('path');

// Normalize file path
function normalizePath(filePath) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
}

// Get all source files
function getAllSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      getAllSourceFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      fileList.push(normalizePath(filePath));
    }
  });
  
  return fileList;
}

// Resolve import path
function resolveImportPath(importPath, fromFile) {
  if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('@/')) {
    return null;
  }
  
  let resolvedPath;
  if (importPath.startsWith('@/')) {
    resolvedPath = path.join(process.cwd(), importPath.replace('@/', 'src/'));
  } else if (importPath.startsWith('.')) {
    const dir = path.dirname(fromFile);
    resolvedPath = path.resolve(dir, importPath);
  } else {
    return null;
  }
  
  const extensions = ['.ts', '.tsx', '.js', '.jsx', ''];
  for (const ext of extensions) {
    const testPath = resolvedPath + ext;
    if (fs.existsSync(testPath) && fs.statSync(testPath).isFile()) {
      return normalizePath(testPath);
    }
    const indexPath = path.join(resolvedPath, 'index' + ext);
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return normalizePath(indexPath);
    }
  }
  
  return null;
}

// Extract imports from a file
function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imports = new Set();
  
  // Static imports
  const staticImportRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = staticImportRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolved = resolveImportPath(importPath, filePath);
    if (resolved) imports.add(resolved);
  }
  
  // Dynamic imports
  const dynamicImportRegex = /dynamic\s*\(\s*\(\)\s*=>\s*import\s*\(['"]([^'"]+)['"]\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolved = resolveImportPath(importPath, filePath);
    if (resolved) imports.add(resolved);
  }
  
  // Require calls
  const requireRegex = /require\s*\(['"]([^'"]+)['"]\)/g;
  while ((match = requireRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolved = resolveImportPath(importPath, filePath);
    if (resolved) imports.add(resolved);
  }
  
  // Re-exports
  const reExportRegex = /export\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
  while ((match = reExportRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolved = resolveImportPath(importPath, filePath);
    if (resolved) imports.add(resolved);
  }
  
  return imports;
}

// Extract exports from a file
function extractExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const exports = new Set();
  
  // Named exports: export const/function/class/interface/type
  const namedExportRegex = /export\s+(?:const|function|class|interface|type|enum)\s+(\w+)/g;
  let match;
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.add(match[1]);
  }
  
  // Default exports
  if (/export\s+default/.test(content)) {
    exports.add('default');
  }
  
  // Export { ... }
  const exportObjectRegex = /export\s+\{([^}]+)\}/g;
  while ((match = exportObjectRegex.exec(content)) !== null) {
    const items = match[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0].trim());
    items.forEach(item => {
      if (item && item !== 'type') exports.add(item);
    });
  }
  
  return exports;
}

// Main analysis
const srcDir = path.join(process.cwd(), 'src');
const scriptsDir = path.join(process.cwd(), 'scripts');
const allFiles = [...getAllSourceFiles(srcDir), ...getAllSourceFiles(scriptsDir)];
const allFilesSet = new Set(allFiles);

console.log(`Found ${allFiles.length} source files\n`);

// Entry points
const nextJsSpecialFiles = new Set([
  'src/app/layout.tsx',
  'src/app/error.tsx',
  'src/app/not-found.tsx',
  'src/app/loading.tsx',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'src/global.d.ts',
]);

const entryPoints = new Set([...nextJsSpecialFiles]);
allFiles.forEach(file => {
  const normalized = file.replace(/\\/g, '/');
  if (normalized.includes('/page.tsx') || normalized.includes('/route.ts')) {
    entryPoints.add(normalized);
  }
});

// Track used files
const usedFiles = new Set([...entryPoints]);
const filesToCheck = [...entryPoints];

while (filesToCheck.length > 0) {
  const currentFile = filesToCheck.pop();
  if (!allFilesSet.has(currentFile)) continue;
  
  try {
    const absolutePath = path.join(process.cwd(), currentFile);
    const imports = extractImports(absolutePath);
    imports.forEach(importedFile => {
      if (allFilesSet.has(importedFile) && !usedFiles.has(importedFile)) {
        usedFiles.add(importedFile);
        filesToCheck.push(importedFile);
      }
    });
  } catch (error) {
    // Skip files that can't be read
  }
}

// Find unused files
const unusedFiles = [];
allFiles.forEach(file => {
  if (usedFiles.has(file)) {
    return;
  }
  
  // Skip scripts that might be run manually
  if (file.startsWith('scripts/')) {
    // Check if script is referenced in package.json
    return;
  }
  
  unusedFiles.push(file);
});

console.log('=== POTENTIALLY UNUSED FILES ===\n');
if (unusedFiles.length === 0) {
  console.log('No unused files found!');
} else {
  unusedFiles.forEach(file => {
    console.log(`- ${file}`);
  });
}

console.log(`\nTotal potentially unused files: ${unusedFiles.length}`);

// Check for unused exports
console.log('\n=== CHECKING FOR UNUSED EXPORTS ===\n');
const exportUsage = new Map();

// First, collect all exports
allFiles.forEach(file => {
  if (!allFilesSet.has(file)) return;
  try {
    const absolutePath = path.join(process.cwd(), file);
    const exports = extractExports(absolutePath);
    if (exports.size > 0) {
      exportUsage.set(file, { exports, used: new Set() });
    }
  } catch (error) {
    // Skip
  }
});

// Check usage of exports
allFiles.forEach(file => {
  if (!allFilesSet.has(file)) return;
  try {
    const absolutePath = path.join(process.cwd(), file);
    const content = fs.readFileSync(absolutePath, 'utf8');
    
    exportUsage.forEach((info, exportFile) => {
      info.exports.forEach(exp => {
        // Check if this export is imported
        const importRegex = new RegExp(`import\\s+.*\\b${exp}\\b.*from\\s+['"]`, 'g');
        const defaultImportRegex = new RegExp(`import\\s+\\w+\\s+from\\s+['"]`);
        const reExportRegex = new RegExp(`export\\s+.*\\b${exp}\\b.*from\\s+['"]`);
        
        if (importRegex.test(content) || reExportRegex.test(content)) {
          info.used.add(exp);
        }
      });
    });
  } catch (error) {
    // Skip
  }
});

// Report unused exports
let hasUnusedExports = false;
exportUsage.forEach((info, file) => {
  const unused = Array.from(info.exports).filter(exp => !info.used.has(exp));
  if (unused.length > 0 && !file.includes('node_modules')) {
    if (!hasUnusedExports) {
      hasUnusedExports = true;
    }
    console.log(`${file}:`);
    unused.forEach(exp => {
      console.log(`  - ${exp}`);
    });
  }
});

if (!hasUnusedExports) {
  console.log('No unused exports found!');
}


