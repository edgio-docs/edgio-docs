import React from 'react';
import Highlight from 'react-highlight';

export default function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) {
  return (
    <Highlight className={`${language} custom-scrollbar`}>{children}</Highlight>
  );
}
