const {SitemapStream, streamToPromise} = require('sitemap');
const {Readable} = require('stream');
const fs = require('fs-extra');
const {join} = require('path');
const glob = require('glob');
const xmlFormatter = require('xml-formatter');

require('dotenv').config();

const siteUrl = process.env.SITE_URL || 'https://docs.edg.io';
const sitemapPaths = ['/applications/v7/', '/delivery/'];

// Get paths based on the pages that are generated by Next.js
const getPages = () => {
  return new Promise((resolve, reject) => {
    glob('**/*.html', {cwd: './.next/server/pages'}, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          files.map((file) => {
            const path = file
              .replace(/index\.html$/, '')
              .replace(/\.html$/, '');
            return path === 'index' ? '/' : `/${path}`;
          })
        );
      }
    });
  });
};

const generateSitemap = async (urls, filePath) => {
  const sitemap = new SitemapStream({hostname: siteUrl});
  const dirPath = join(process.cwd(), filePath, '..'); // Ensure directory path
  await fs.ensureDir(dirPath);

  const data = await streamToPromise(Readable.from(urls).pipe(sitemap)).then(
    (data) => data.toString()
  );

  const formattedData = xmlFormatter(data.toString());
  fs.writeFileSync(join(process.cwd(), filePath), formattedData);
};

const generateSitemapIndex = async () => {
  const sitemapIndex = new SitemapStream({hostname: siteUrl});
  const filePath = join('public', 'sitemap.xml');
  const dirPath = join(process.cwd(), filePath, '..'); // Ensure directory path
  await fs.ensureDir(dirPath);

  const urls = sitemapPaths.map((path) => ({
    url: `${siteUrl}${path}sitemap.xml`,
  }));

  const data = await streamToPromise(
    Readable.from(urls).pipe(sitemapIndex)
  ).then((data) => data.toString());

  const formattedData = xmlFormatter(data);
  fs.writeFileSync(join(process.cwd(), filePath), formattedData);
};

const generateAllSitemaps = async () => {
  const pages = await getPages();

  for (const path of sitemapPaths) {
    const urls = pages.filter((url) => url.startsWith(path));
    await generateSitemap(urls, join('public', path, 'sitemap.xml'));
  }

  await generateSitemapIndex();
};

generateAllSitemaps()
  .then(() => console.log('Sitemaps generated and formatted successfully.'))
  .catch((error) => console.error('Error generating sitemaps:', error));