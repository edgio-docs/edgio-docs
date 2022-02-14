import React from 'react';
import Highlight from 'react-highlight';

interface IProps {
  [key: string]: string;
}

export default function CodeBlock({children}: {children: React.ReactNode}) {
  const props = React.Children.toArray(children)[0].props as IProps;
  const propsChildren = props.children;
  const language = props.className || 'js';

  return <Highlight className={language}>{propsChildren}</Highlight>;
}
