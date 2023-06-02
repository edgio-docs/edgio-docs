const fs = require('fs');
const {join} = require('path');
const prompts = require('prompts');

// Load the v*.nav.js file
const version = 'v5';
const filePath = `src/config/${version}.nav.js`;
const fileContent = fs.readFileSync(filePath, 'utf8');
const guidesPrefix = `/guides/${version}`;
const pathPrefix = `/guides`;

// Evaluate the JavaScript code in the file
const exportedObject = eval(fileContent);

// Extract the paths from the exported object
const paths = extractPaths(exportedObject);
console.log(paths);
checkPathsExistence(paths);

function extractPaths(routes) {
  const paths = [];

  function processRoutes(routes) {
    if (routes.path && routes.path.length) {
      paths.push(`${pathPrefix}/${routes.path}`);
    }

    routes.forEach((route) => {
      const fullPath = `${route.path}`;
      if (fullPath.length) {
        paths.push(`${pathPrefix}/${fullPath}`);
      }

      if (route.routes) {
        processRoutes(route.routes);
      }
    });
  }

  processRoutes(routes.routes);
  return paths;
}

async function checkPathsExistence(paths) {
  const files = getFilesInDirectory(`src/guides/${version}`);

  for (const file of files) {
    const destPath = file
      .replace(/^src/, '')
      .replace(/\.md$/, '')
      .replace(/\/v\d/, '');

    if (!paths.includes(destPath)) {
      const response = await confirmFileRemoval(destPath, file);
      if (response) {
        fs.unlinkSync(file);
        console.log(`File ${file} has been removed.`);
      } else {
        console.log(`File ${file} has not been removed.`);
      }
    }
  }
}

function getFilesInDirectory(directory) {
  let files = [];
  const entries = fs.readdirSync(directory, {withFileTypes: true});

  entries.forEach((entry) => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = getFilesInDirectory(fullPath);
      files = [...files, ...nestedFiles];
    } else {
      files.push(fullPath);
    }
  });

  return files;
}

async function confirmFileRemoval(destPath, file) {
  console.log(`The path ${destPath} does not exist for file ${file}.`);
  // return false;
  const response = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `The path ${destPath} does not exist for file ${file}. Do you want to remove this file?`,
    initial: true,
  });

  return response.confirm;
}
