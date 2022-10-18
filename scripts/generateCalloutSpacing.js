const walk = require('./headingIDHelpers/walk');
const fs = require('fs');

function addCalloutSpace(lines) {
  let callOutIndex;
  const results = [];
  lines.forEach((line, index) => {
    if (!line.startsWith('|')) {
      if (line.includes('<Callout') || line.includes('</Callout>')) {
        const isOpeningTag = line.includes('<Callout');

        callOutIndex = index;
        const indexOfLineToSpace = isOpeningTag
          ? callOutIndex + 1
          : callOutIndex - 1;
        if (lines[indexOfLineToSpace].length === 0) {
          results.push(line);
          return;
        }
        const updatedLine = isOpeningTag ? `${line}\n` : `\n${line}`;
        results.push(updatedLine);
        return updatedLine;
      }
    }
    return results.push(line);
  });
  return results;
}

async function main(paths) {
  paths = paths.length === 0 ? ['src/pages'] : paths;

  const files = paths.map((path) => [...walk(path)]).flat();

  files.forEach((file) => {
    if (!(file.endsWith('.md') || file.endsWith('.mdx'))) {
      return;
    }

    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const updatedLines = addCalloutSpace(lines);
    fs.writeFileSync(file, updatedLines.join('\n'));
  });
}

module.exports = main;
