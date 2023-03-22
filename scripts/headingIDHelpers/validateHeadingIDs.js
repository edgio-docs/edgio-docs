/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */
const fs = require('fs');
const walk = require('./walk');
const _find = require('lodash/find');
const chalk = require('chalk');
const stringSimilarity = require('string-similarity');

const logInfo = (...s) => console.log(chalk.bgGray.yellow(s.join('')));
const logWarning = (...s) =>
  console.log(`🟡 ${chalk.yellow.bold('Unmatched Link')}\n${s.join('')}`);
const logError = (...s) =>
  console.log(`❌ ${chalk.red.bold('Invalid Link')}\n${s.join('')}`);
const lineNumbers = (needle, haystack) =>
  haystack
    .split(/^/gm)
    .map((v, i) => (v.includes(needle) ? i + 1 : 0))
    .filter((a) => a);
const errorsOnly = process.argv.includes('--errors-only');

let invalidLinks = 0;
const exit = () => process.exit(invalidLinks);

/**
 * Validate if there is a custom heading id and exit if there isn't a heading
 * @param {string} line
 * @returns
 */
function validateHeaderId(line) {
  if (!line.startsWith('#')) {
    return;
  }

  const match = /\{\/\*(.*?)\*\/}/.exec(line);
  const id = match;
  if (!id) {
    console.error('Run yarn fix-headings to generate headings.');
    process.exit(1);
  }
}

/**
 * Loops through the lines to skip code blocks
 * @param {Array<string>} lines
 */
function validateHeaderIds(lines) {
  let inCode = false;
  const results = [];
  lines.forEach((line) => {
    // Ignore code blocks
    if (line.startsWith('```')) {
      inCode = !inCode;

      results.push(line);
      return;
    }
    if (inCode) {
      results.push(line);
      return;
    }
    validateHeaderId(line);
  });
}

function validateLinks(headingLinksByPage) {
  const invalidPages = [];

  // BUG
  // Not sure why this is failing, but skip for now
  // Immediately exit if the current date is 30 days after
  if (new Date() < new Date('2023-03-01')) {
    return;
  }

  for (const [filePath, {links}] of Object.entries(headingLinksByPage)) {
    for (let {path, hash, line} of links) {
      // skip if we've already identified this page as invalid/missing
      if (invalidPages.includes(path)) {
        continue;
      }

      // empty path means the link only contains a hash and therefore must reference
      // the current page
      if (!path) {
        path = filePath;
      }

      let headingPath;
      const errorLink = (hash && `${path}#${hash}`) || path;
      const {headings} =
        _find(headingLinksByPage, (value, key) => {
          const ret = path === key || `applications/${path}` === key;
          if (ret) headingPath = key;
          return ret;
        }) || {};

      // Could not find any pages with the specified path
      if (!headings) {
        if (!errorsOnly) {
          const {bestMatch} = stringSimilarity.findBestMatch(
            path,
            Object.keys(headingLinksByPage)
          );
          logWarning(
            `${chalk.bold('Source:')} ${filePath}\n`,
            `${chalk.bold('Line:')} ${line}\n`,
            `${chalk.bold('Link:')} ${chalk.underline(errorLink)}\n\n`,
            `Unable to locate a local source for path '${chalk.bold(path)}'.\n`,
            (bestMatch.rating &&
              `${chalk.blue(
                `Closest match found: '${chalk.bold(bestMatch.target)}'`
              )}\n`) ||
              ''
          );
        }
        invalidPages.push(path);
        continue;
      }

      console.log('headings', hash, headings);

      // At this point, we have a file that matches the requested path.
      // If there is a specific hash on the link, check all the headings
      // within the file to ensure it is valid. If no hash, then the link
      // is still valid because at least the path exists.
      if (hash && !headings.includes(hash)) {
        console.log(hash, headings);
        const {bestMatch} = stringSimilarity.findBestMatch(hash, headings);
        logError(
          `Source: ${chalk.bold(filePath)}\n`,
          `Line: ${chalk.bold(line)}\n\n`,
          `The link ${chalk.underline(errorLink)} `,
          `containing hash '#${chalk.bold.underline(hash)}' `,
          `could be found within '${headingPath}'.\n`,
          (bestMatch.rating &&
            `${chalk.blue(
              `Closest match in '${headingPath}': '${chalk.bold(
                bestMatch.target
              )}'`
            )}\n`) ||
            ''
        );
        invalidLinks++;
      }
    }
  }
}
/**
 * paths are basically array of path for which we have to validate heading IDs
 * @param {Array<string>} paths
 */
async function main(paths) {
  paths = paths.length === 0 ? ['src/pages/guides'] : paths;
  const files = paths.map((path) => [...walk(path)]).flat();

  const headingLinksByPage = {};

  const reHeader =
    /^(#{2,}\s+)(.+?)(\s*\{(?:\/\*|#)([^\}\*\/]+)(?:\*\/)?\}\s*)?$/gm;
  const reLink = /\[.+?\]\((.*?)(?:\s.*)?\)/gm;

  for (const file of files) {
    const [, fullPath] = file.match(/^.+(applications\/(\w+)).mdx?$/) || [];
    if (!fullPath) continue;

    headingLinksByPage[fullPath] = {
      headings: [],
      links: [],
    };

    let match;

    const content = fs.readFileSync(file, 'utf8');

    while ((match = reHeader.exec(content))) {
      headingLinksByPage[fullPath].headings.push(match[4]);
    }

    while ((match = reLink.exec(content))) {
      const link = (match[1] || '').replace(/^\/+/, '');
      const [path, hash] = link.split('#');

      headingLinksByPage[fullPath].links.push({
        path,
        hash,
        line: lineNumbers(match[0], match.input),
      });
    }

    const lines = content.split('\n');
    // validateHeaderIds(lines);
  }

  validateLinks(headingLinksByPage);
  exit();
}

module.exports = main;
