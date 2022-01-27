const fm = require('gray-matter');
const path = require('path');

// Makes mdx in next.js suck less by injecting necessary exports so that
// the docs are still readable on github.
//
// Layout component for a .mdx or .md page can be specfied in the frontmatter.
// This plugin assumes that the layout file and named export are the same. This
// easily changed by modifying the string below.
//
// All metadata can be written in yaml front matter. It will be passed to the
// layout component as `meta` prop.
//
// (Shamelessly stolen from Expo.io docs)
// @see https://github.com/expo/expo/blob/master/docs/common/md-loader.js

// 1. The src is an mdx file
module.exports = async function (src) {
  const callback = this.async();

  // 2. Reads the md file and gives the frontmatter and the content
  // cc. https://github.com/jonschlinkert/gray-matter
  const { content, data } = fm(src);


  // 3. Get the parent directory for the resourcePath (the current markdown file)
  const pageParentDir = path
  .dirname(path.relative('./src/pages', this.resourcePath))
  .split(path.sep)
    .shift();

    // 4. Get the layout component from the frontmatter
    const layoutMap = {
      ".": 'Home',
    };
    const layout = layoutMap[pageParentDir] || 'Docs';


  //   console.log(pageParentDir)
  // console.log("-".repeat(40));
  // console.log(`Using Layout${layout} for ${this.resourcePath}`);
  // console.log("-".repeat(40));

  const code =
    `import withLayout from 'components/Layout/Layout${layout}';

export default withLayout(${JSON.stringify(data)})


` + content;


  // console.log("-".repeat(80));
  // console.log(code);
  // console.log("-".repeat(80));

  return callback(null, code);
};
