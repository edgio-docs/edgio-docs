const fs = require('fs');
const path = require('path');

const manifestPath = path.join(
  process.cwd(),
  '.edgio',
  'deployment-manifest.json'
);

// Read the deployment manifest
fs.readFile(manifestPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading deployment manifest: ${err.message}`);
    process.exit(1);
  }

  try {
    const manifest = JSON.parse(data);
    const buildUrl = manifest.url;
    const edgeUrl = manifest.environment.url;
    const branchUrl = buildUrl.replace(`-${manifest.number}`, '');
    const consoleUrl = `https://edgio.app/edgio-community/docs.edg.io/env/${manifest.environment.name}/builds/${manifest.number}`;

    // Get the current date/time
    const deployDate = new Date().toISOString();

    // Output the URLs and deploy date in a format that GitHub Actions can read
    console.log(`::set-output name=consoleUrl::${consoleUrl}`);
    console.log(`::set-output name=buildUrl::${buildUrl}`);
    console.log(`::set-output name=branchUrl::${branchUrl}`);
    console.log(`::set-output name=edgeUrl::${edgeUrl}`);
    console.log(`::set-output name=deployDate::${deployDate}`);
  } catch (parseError) {
    console.error(`Error parsing deployment manifest: ${parseError.message}`);
    process.exit(1);
  }
});
