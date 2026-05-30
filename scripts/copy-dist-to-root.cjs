const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const publicImages = path.join(root, 'public', 'images');
const imagesDest = path.join(root, 'images');
const assetsSrc = path.join(dist, 'assets');
const assetsDest = path.join(root, 'assets');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replaceDir(src, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  copyDir(src, dest);
}

const builtIndex = path.join(dist, 'index.html');
const rootIndex = path.join(root, 'index.html');
const root404 = path.join(root, '404.html');

fs.copyFileSync(builtIndex, rootIndex);
fs.copyFileSync(builtIndex, root404);
replaceDir(assetsSrc, assetsDest);
replaceDir(publicImages, imagesDest);

console.log('Copied build output, 404.html, and images to site root for GitHub Pages.');
