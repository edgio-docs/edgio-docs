const headingRank = require('hast-util-heading-rank');
const toString = require('hast-util-to-string');
const visit = require('unist-util-visit');

function getIdFromNode(node) {
  // loop over all children of the node, looking for `mdxTextExpression` and
  // extract the id from the `value` property
  for (const child of node.children) {
    if (child.type === 'mdxTextExpression') {
      // clean the value between `/* ... */`
      return child.value.replace(/\/\*|\*\//g, '').trim();
    }
  }
  return '';
}

const rehypeExtractHeadings = ({headings}) => {
  return (tree) => {
    visit(tree, 'element', function (node) {
      const rank = headingRank(node);
      if (rank > 0) {
        headings.push({
          rank: rank,
          title: toString(node),
          id: getIdFromNode(node),
        });
      }
    });
  };
};

module.exports = rehypeExtractHeadings;
