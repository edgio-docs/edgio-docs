const fs = require('fs');
const {join} = require('path');

// Load the v5.nav.js file
const filePath = 'src/config/v5.nav.js';
const fileContent = fs.readFileSync(filePath, 'utf8');
const guidesPrefix = '/guides/v5';

// Evaluate the JavaScript code in the file
const exportedObject = eval(fileContent);

// Extract the paths from the exported object
const paths = extractPaths(exportedObject);
checkPathsExistence(paths);

function extractPaths(routes) {
  const paths = [];

  function processRoutes(routes) {
    routes.forEach((route) => {
      const fullPath = `${route.path}`;
      paths.push(`${guidesPrefix}/${fullPath}`);

      if (route.routes) {
        processRoutes(route.routes);
      }
    });
  }

  processRoutes(routes.routes);
  return paths;
}

function checkPathsExistence(paths) {
  paths.forEach((path) => {
    const fullPath = join('src', `${path}.md`);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      console.log(`${path} exists: ${exists}`);
    }
  });
}
