const remark = require('remark');
// IMPORTANT: https://yarnpkg.com/package/remark-external-links
const externalLinks = require('remark-external-links'); // Add _target and rel to external links
const customHeaders = require('./remark-header-custom-ids'); // Custom header id's for i18n
const images = require('remark-images'); // Improved image syntax
const unrwapImages = require('remark-unwrap-images'); // Removes <p> wrapper around images
const smartyPants = require('./remark-smartypants'); // Cleans up typography
const html = require('remark-html');
const {remarkMdxCodeMeta} = require('./remark-mdx-code-meta');
// const {
//   remarkExtendedTable,
//   extendedTableHandlers,
// } = require('remark-extended-table');
// const embed = require('mdx-embed');
const remarkGfm = require('remark-gfm');

module.exports = {
  remarkPlugins: [
    externalLinks,
    customHeaders,
    images,
    unrwapImages,
    smartyPants,
    remarkMdxCodeMeta,
    remarkGfm,
    html,
  ],
  markdownToHtml,
};

async function markdownToHtml(markdown) {
  const result = await remark()
    .use(externalLinks)
    .use(customHeaders)
    .use(images)
    .use(unrwapImages)
    .use(smartyPants)
    .use(remarkMdxCodeMeta)
    .use(html)
    // .use(embed)
    .process(markdown);
  return result.toString();
}
