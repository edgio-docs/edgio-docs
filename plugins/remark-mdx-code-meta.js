const jsx = require('acorn-jsx');
const {Parser} = require('acorn');
const visit = require('unist-util-visit');

const parser = Parser.extend(jsx());

const transformer = (ast) => {
  console.log('custom transformer');
  visit(ast, 'code', (node, index, parent) => {
    if (!node.meta) {
      return;
    }
    const code = JSON.stringify(`${node.value}\n`);
    const codeProps = node.lang ? `className="language-${node.lang}"` : '';
    const value = `<pre ${node.meta}><code ${codeProps} ${node.meta}>{${code}}</code></pre>`;
    const estree = parser.parse(value, {ecmaVersion: 'latest'});
    parent.children[index] = {
      type: 'mdxFlowExpression',
      value,
      data: {estree},
    };
  });
};

/**
 * A markdown plugin for transforming code metadata.
 *
 * @returns A unified transformer.
 */
module.exports = {
  remarkMdxCodeMeta: () => transformer,
};
