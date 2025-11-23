const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'node_modules', 'primeng', 'resources', 'themes');
const destDir = path.join(__dirname, 'src', 'assets', 'themes');

function copyFolder(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFolder(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${srcPath} → ${destPath}`);
        }
    }
}

console.log('Copying PrimeNG themes...');
copyFolder(sourceDir, destDir);
console.log('Done.');