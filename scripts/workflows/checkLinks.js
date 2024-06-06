const {spawn} = require('child_process');
const fs = require('fs');
const URL = process.argv[2];

console.log(`Starting link check for URL: ${URL}`);

let output = '';
const linkinatorArgs = [
  URL,
  '--concurrency',
  '10',
  '--format',
  'json',
  '--recurse',
  '--timeout',
  '10000',
];

const linkinator = spawn('linkinator', linkinatorArgs);

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

  // write the output to a file
  fs.writeFileSync('linkinator-output.json', output);

  output = fs.readFileSync('linkinator-output.json', 'utf8');

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
  if (brokenLinks.length > 0) {
    console.log('Broken links found:');
    const commentContent = brokenLinks
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((link) => {
        const status = `[${link.status}] ${link.url}`;
        const referrer = `└── Referrer: ${link.parent}`;
        console.log(`${status}\n${referrer}`);
        return `- **[${link.status}]** ${link.url}\n  └── Referrer: ${link.parent}`;
      })
      .join('\n\n');

    // Output the comment content for GitHub Actions
    console.log(`::set-output name=broken-links::${commentContent}`);
  } else {
    console.log('No broken links found.');
    console.log('::set-output name=broken-links::No broken links found.');
  }
});
