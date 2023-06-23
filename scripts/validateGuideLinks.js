const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const baseUrl = 'https://docs.edg.io'; // Replace with your desired base URL

const visitedUrls = new Set();
const errorUrls = [];
const allowedUrlPatterns = [/\/guides\/v7\//, /\/docs\/v7.x\//];

const timer = setInterval(() => {
  console.log('Visited URLs:', visitedUrls.size);
}, 10000);

const axiosInstance = axios.create({
  validateStatus: false, // Disable status code validation
});

async function crawl(urlToCrawl) {
  if (
    visitedUrls.has(urlToCrawl) ||
    (visitedUrls.size && !shouldCrawl(urlToCrawl))
  ) {
    return;
  }

  visitedUrls.add(urlToCrawl);

  try {
    const response = await axiosInstance.get(urlToCrawl);
    const {status, statusText} = response;

    if (status >= 400) {
      errorUrls.push({url: urlToCrawl, status, statusText});
    }

    const $ = cheerio.load(response.data);
    const links = $('a');

    for (let i = 0; i < links.length; i++) {
      const linkUrl = $(links[i]).attr('href');
      if (linkUrl) {
        const absoluteUrl = url.resolve(urlToCrawl, linkUrl);
        const parsedUrl = new URL(absoluteUrl);
        const cleanLinkUrl = parsedUrl.origin + parsedUrl.pathname; // Remove query parameters and hashes
        if (parsedUrl.origin === baseUrl) {
          await crawl(cleanLinkUrl);
        }
      }
    }
  } catch (error) {
    console.error('Error crawling:', urlToCrawl, error);
    errorUrls.push({url: urlToCrawl, error});
  }
}

function shouldCrawl(url) {
  for (const pattern of allowedUrlPatterns) {
    if (pattern.test(url)) {
      return true;
    }
  }
  return false;
}

(async () => {
  try {
    await crawl(baseUrl);
    console.log('Error URLs:');
    for (const error of errorUrls) {
      console.log(`URL: ${error.url}`);
      console.log(`Status: ${error.status}`);
      console.log(`Status Text: ${error.statusText}`);
      console.log('---');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    clearInterval(timer);
    if (errorUrls.length > 0) {
      process.exit(1);
    }
  }
})();
