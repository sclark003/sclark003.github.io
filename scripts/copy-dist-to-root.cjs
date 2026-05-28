const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

fs.copyFileSync(path.join(dist, 'index.html'), path.join(root, 'index.html'));

const assetsSrc = path.join(dist, 'assets');
const assetsDest = path.join(root, 'assets');
fs.mkdirSync(assetsDest, { recursive: true });

for (const file of fs.readdirSync(assetsSrc)) {
  fs.copyFileSync(path.join(assetsSrc, file), path.join(assetsDest, file));
}

console.log('Copied dist build to site root for GitHub Pages.');
