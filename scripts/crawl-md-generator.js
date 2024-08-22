const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const TurndownService = require('turndown');
const url = process.argv[2];
const outputDir = path.join(process.cwd(), 'output');

const whitelist = [/^\/applications\/v7\/.*/];
const JSONOutputPath = path.join(outputDir, 'linkinator-output.json');
const ignoreStatuses = [429, 426];
let output = '';
let fileCount = 0;
let groupNumber = 1;

const failedPages = [];

console.log(`Starting link check for URL: ${url}`);

const linkinatorArgs = [
  url,
  '--concurrency',
  '20',
  '--format',
  'json',
  //'--recurse',
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

linkinator.on('close', async (code) => {
  console.log(`linkinator process exited with code ${code}`);
  if (code !== 0) {
    console.error(`linkinator process exited with error code ${code}`);
    process.exit(1);
  }

  // Write the output to a file
  // fs.writeFileSync(JSONOutputPath, output);

  // Parse the JSON output
  let result;
  try {
    // result = JSON.parse(output);
    result = JSON.parse(fs.readFileSync(JSONOutputPath, 'utf-8'));
  } catch (err) {
    console.error(`Failed to parse JSON output: ${err.message}`);
    process.exit(1);
  }

  // Extract valid links
  const validLinks = result.links.filter((link) => {
    const isWhitelisted = whitelist.some((item) => {
      // Match link path against pattern
      const path = new URL(link.url).pathname;
      if (item instanceof RegExp) {
        return item.test(path);
      }
      if (item.startsWith('/')) {
        return path === item;
      }
      return link.url === item;
    });
    return link.state === 'OK' && link.status === 200 && isWhitelisted;
  });

  console.log(`Found ${validLinks.length} valid links to process`);

  // Process the valid links with a concurrency limit of 10
  const browser = await puppeteer.launch();
  const maxConcurrency = 10;
  let activeCount = 0;
  const queue = [];

  const processQueue = async () => {
    if (queue.length === 0) {
      if (activeCount === 0) {
        await browser.close();
        console.log('Content extraction completed.');
      }
      return;
    }

    while (activeCount < maxConcurrency && queue.length > 0) {
      const {url} = queue.shift();
      activeCount++;
      savePageContent(browser, url)
        .then(() => {
          activeCount--;
          processQueue();
        })
        .catch((err) => {
          console.error(`Error processing ${url}: ${err.message}`);
          activeCount--;
          processQueue();
        });
    }
  };

  for (const link of validLinks) {
    queue.push({url: link.url});
  }

  processQueue();
});

const savePageContent = async (browser, pageUrl) => {
  const urlObj = new URL(pageUrl);
  const currentGroupNumber = Math.floor(fileCount / 10) + 1;

  const filename = `${currentGroupNumber}_${urlObj.pathname
    .replace(/\//g, '_')
    .substring(1)}.md`;
  const filePath = path.join(outputDir, filename);

  if (
    fs.existsSync(filePath) &&
    fs.readFileSync(filePath, 'utf-8').trim().length > 0
  ) {
    // console.log(`Content already exists for ${pageUrl}. Skipping...\n`);
    return;
  }

  const page = await browser.newPage();
  try {
    await page.setExtraHTTPHeaders({
      fireawai: 'true',
    });
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});

    const content = await page
      .$eval('article.docs-article', (el) => el.innerHTML)
      .catch(() => '');

    if (content) {
      const turndownService = new TurndownService();
      let markdown = turndownService.turndown(content);
      markdown = `---
url: ${pageUrl}
---

${markdown}`;

      fs.mkdirSync(path.dirname(filePath), {recursive: true});
      fs.writeFileSync(filePath, markdown, 'utf-8');
      console.info(`Saved content from ${pageUrl} to ${filePath}`);
    } else {
      console.error(`No content found at ${pageUrl}\n`);
      failedPages.push(pageUrl);
    }
  } catch (err) {
    console.error(`Error extracting content from ${pageUrl}: ${err.message}`);
  } finally {
    await page.close();
  }
};

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
