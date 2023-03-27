const fs = require('fs');
const path = require('path');

const dirPath = '.edgio/lambda/.next/server/pages/guides';

function removeFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      removeFiles(filePath);
    } else if (
      !['.js', '.js.nft.json'].includes((ext) => filePath.endsWith(ext))
    ) {
      fs.unlinkSync(filePath);
      console.log(`Removed file: ${filePath}`);
    }
  }

  const subdirs = fs.readdirSync(dirPath);
  if (subdirs.length === 0) {
    fs.rmdirSync(dirPath);
    console.log(`Removed directory: ${dirPath}`);
  }
}

removeFiles(dirPath);
console.log('Done!');
