const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const whitelist = require('./linkWhitelist');
const url = process.argv[2];
const outputDir = path.join(process.cwd(), 'artifacts');
const brokenLinksPath = path.join(outputDir, 'broken-links.md');
const fullOutputPath = path.join(outputDir, 'broken-links-full.md');
const JSONOutputPath = path.join(outputDir, 'linkinator-output.json');
const ignoreStatuses = [429];
let output = '';

console.log(`Starting link check for URL: ${url}`);

const linkinatorArgs = [
  url,
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

  // write the output to a file
  fs.writeFileSync(JSONOutputPath, output);

  // Parse the JSON output
  let result;
  try {
    result = JSON.parse(output);
  } catch (err) {
    console.error(`Failed to parse JSON output: ${err.message}`);
    process.exit(1);
  }

  // Extract broken links
  const brokenLinks = result.links.filter((link) => {
    const path = new URL(link.url).pathname;
    const isWhitelisted = whitelist.some((item) => {
      // match link path against pattern
      if (item instanceof RegExp) {
        return item.test(path);
      }

      // match link path against string
      if (item.startsWith('/')) {
        return path === item;
      }

      // match link URL against string
      return link.url === item;
    });
    return (
      link.state === 'BROKEN' &&
      !ignoreStatuses.includes(link.status) &&
      !isWhitelisted
    );
  });

  // Output the broken links
  let commentContent;
  if (brokenLinks.length > 0) {
    console.log('Broken links found:');
    commentContent = brokenLinks
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((link) => {
        const status = `[${link.status}] ${link.url}`;
        const referrer = `└── Referrer: ${link.parent}`;
        console.log(`${status}\n${referrer}`);
        return `**[${link.status}]** ${link.url}\n  └── Referrer: ${link.parent}`;
      });

    // Write the full output to a file
    fs.writeFileSync(fullOutputPath, commentContent.join(`\n\n`));

    // Reduce to the first 20 items for the comment
    commentContent = commentContent
      .slice(0, 20)
      .join(`\n\n`)
      .replace(/\*\*/g, '');

    commentContent = `
**Broken Links** (${brokenLinks.length}) 🚨

${commentContent}
(_${brokenLinks.length - 20} more broken links..._)`;
  } else {
    console.log('No broken links found.');
    commentContent = 'No broken links found.';
  }
  // Write the markdown content to a file
  fs.writeFileSync(brokenLinksPath, commentContent);
});
