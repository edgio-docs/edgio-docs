import React from 'react';

import {SnippetGroup} from './SnippetGroup';

interface PackageCommandProps {
  children: React.ReactNode;
}

const SEPARATOR = '---';

export default function PackageCommand({children}: PackageCommandProps) {
  const lines = (
    (children as React.ReactElement)!.props?.children?.props?.children ?? ''
  )
    .trim()
    .split('\n');

  if (!lines.length || !lines.includes(SEPARATOR)) {
    console.error(
      'PackageCommand component requires npm and yarn commands',
      'Example:',
      `
      <PackageCommand>
      \`\`\`
      npm install url-parse whatwg-url buffer
      ${SEPARATOR}
      yarn add url-parse whatwg-url buffer
      \`\`\`
      </PackageCommand>`
    );
    return null;
  }

  // split the array into two arrays based on the separator
  const [npmCommands, yarnCommands] = lines.reduce(
    (acc: any[][], line: string) => {
      if (line === SEPARATOR) {
        acc.push([]);
      } else {
        acc[acc.length - 1].push(line);
      }
      return acc;
    },
    [[]] as string[][]
  );

  return (
    <SnippetGroup>
      {/* @ts-ignore */}
      <pre tabLabel="npm">
        {/* @ts-ignore */}
        <code className="bash">{npmCommands.join('\n')}</code>
      </pre>
      {/* @ts-ignore */}
      <pre tabLabel="Yarn">
        {/* @ts-ignore */}
        <code className="bash">{yarnCommands.join('\n')}</code>
      </pre>
    </SnippetGroup>
  );
}
