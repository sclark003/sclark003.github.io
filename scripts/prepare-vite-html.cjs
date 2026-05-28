const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
fs.copyFileSync(path.join(root, 'index.vite.html'), path.join(root, 'index.html'));
