const generateCalloutSpacing = require('./generateCalloutSpacing');

const markdownPaths = process.argv.slice(2);
if (markdownPaths.includes('--fix')) {
  generateCalloutSpacing(markdownPaths.filter((path) => path !== '--fix'));
}
