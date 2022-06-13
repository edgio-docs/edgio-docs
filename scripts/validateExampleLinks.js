const globby = require('globby');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const EXAMPLES_RE = /(?:(siteUrl|repoUrl)=\"([^"]*)\")/g;

!(async () => {
  const paths = await globby('src/pages/guides', {
    expandDirectories: {
      extensions: ['md', 'mdx'],
    },
  });

  let failures = 0;

  for (let path of paths) {
    const contents = await fse.readFile(path);
    let match;

    console.log(`- ${path} ->`);
    while ((match = EXAMPLES_RE.exec(contents))) {
      let status, message;
      try {
        status = (await fetch(match[2])).status;
      } catch (e) {
        message = e.message;
        status = '000';
      }
      const success = status === 200;

      console.log(
        chalk[success ? 'green' : 'red'](
          '\t',
          logSymbols[success ? 'success' : 'error'],
          `${match[1]}: ${match[2]} `
        )
      );

      if (!success) {
        failures++;
      }
    }
  }

  process.exit(failures);
})();
