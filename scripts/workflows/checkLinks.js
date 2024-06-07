const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const URL = process.argv[2];

console.log(`Starting link check for URL: ${URL}`);

let output = '';
const linkinatorArgs = [
  URL,
  '--concurrency',
  '20',
  '--format',
  'json',
  '--recurse',
  '--timeout',
  '10000',
  '--skip',
  '^.*(localhost|127.0.0.1|example.com|domain.com).*$',
];

const linkinator = spawn('linkinator', linkinatorArgs);

// Ensure the output directory exists
const outputDir = path.join(process.cwd(), 'artifacts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Capture the stdout and stderr output
linkinator.stdout.on('data', (data) => {
  output += data.toString();
});

linkinator.stderr.on('data', (data) => {
  process.stderr.write(data);
});

linkinator.on('error', (err) => {
  console.error(`Failed to start linkinator: ${err.message}`);
});

linkinator.on('close', (code) => {
  console.log(`linkinator process exited with code ${code}`);
  if (code !== 0) {
    console.error(`linkinator process exited with error code ${code}`);
    process.exit(1);
  }

  const outputPath = path.join(outputDir, 'linkinator-output.json');

  // write the output to a file
  fs.writeFileSync(outputPath, output);

  // Parse the JSON output
  let result;
  try {
    result = JSON.parse(output);
  } catch (err) {
    console.error(`Failed to parse JSON output: ${err.message}`);
    process.exit(1);
  }

  // Extract broken links
  const brokenLinks = result.links.filter((link) => link.state === 'BROKEN');

  // Output the broken links
  let commentContent;
  if (brokenLinks.length > 0) {
    console.log('Broken links found:');
    commentContent = brokenLinks
      .slice(0, 20)
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((link) => {
        const status = `[${link.status}] ${link.url}`;
        const referrer = `└── Referrer: ${link.parent}`;
        console.log(`${status}\n${referrer}`);
        return `**[${link.status}]** ${link.url}\n  └── Referrer: ${link.parent}`;
      })
      .join(`\n\n(_${brokenLinks.length - 20} more broken links..._)`);
  } else {
    console.log('No broken links found.');
    commentContent = 'No broken links found.';
  }

  const brokenLinksPath = path.join(outputDir, 'broken-links.md');

  // Write the markdown content to a file
  fs.writeFileSync(brokenLinksPath, commentContent);
});
