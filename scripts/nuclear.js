const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const sourceDirectory = 'src/guides';
const destinationDirectories = [
  'src/guides/v5',
  'src/guides/v6',
  'src/guides/v7',
];
const excludedDirectories = ['v4', 'v5', 'v6', 'v7'];
const fileExtension = '.md';

const copyFile = promisify(fs.copyFile);
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const readdir = promisify(fs.readdir);

function copyFiles(sourceDir, destDirs) {
  const promises = [];
  fs.readdirSync(sourceDir, {withFileTypes: true}).forEach((entry) => {
    const sourcePath = path.join(sourceDir, entry.name);
    if (entry.isDirectory() && !shouldExcludeDirectory(entry.name)) {
      destDirs.forEach((destDir) => {
        const destPath = path.join(
          destDir,
          path.relative(sourceDir, sourcePath)
        );
        // if (!fs.existsSync(destPath)) {
        promises.push(
          mkdir(destPath, {recursive: true}).then(() =>
            copyFiles(sourcePath, [destPath])
          )
        );
        // } else {
        //   console.log(
        //     `Skipped file (already exists): ${sourcePath} -> ${destPath}`
        //   );
        // }
      });
    } else if (entry.isFile() && entry.name.endsWith(fileExtension)) {
      destDirs.forEach((destDir) => {
        const relativeDir = path.dirname(path.relative(sourceDir, sourcePath));
        const destPath = path.join(destDir, relativeDir, entry.name);
        if (!fs.existsSync(destPath)) {
          promises.push(
            mkdir(path.dirname(destPath), {recursive: true})
              .then(() => copyFile(sourcePath, destPath))
              .then(() =>
                console.log(`Copied file: ${sourcePath} -> ${destPath}`)
              )
          );
        } else {
          console.log(
            `Skipped file (already exists): ${sourcePath} -> ${destPath}`
          );
        }
      });
    }
  });
  return Promise.all(promises);
}

function shouldExcludeDirectory(directory) {
  return excludedDirectories.some((excludedDir) => directory === excludedDir);
}

async function removeCopiedFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const subDirectories = [];
  const filesToRemove = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      subDirectories.push(entryPath);
    } else {
      if (entry.name.endsWith(fileExtension)) {
        if (
          fs.existsSync(entryPath) &&
          !shouldExcludeDirectory(path.dirname(entryPath))
        ) {
          filesToRemove.push(entryPath);
        }
      }
    }
  }
  await Promise.all(
    filesToRemove.map(async (file) => {
      await unlink(file);
      console.log(`Removed file: ${file}`);
    })
  );
  for (const subDir of subDirectories) {
    if (!shouldExcludeDirectory(path.basename(subDir))) {
      await removeCopiedFiles(subDir);
    }
  }
  if (
    directory !== sourceDirectory &&
    entries.length === 0 &&
    !shouldExcludeDirectory(path.basename(directory))
  ) {
    await rmdir(directory);
    console.log(`Removed directory: ${directory}`);
  }
}

async function main() {
  await copyFiles(sourceDirectory, destinationDirectories);
  await removeCopiedFiles(sourceDirectory);
}

main().catch((error) => {
  console.error('An error occurred:', error);
});
