import * as React from 'react';
import ConsoleBlock from './ConsoleBlock';
import Convention from './Convention';
import { H1, H2, H3, H4 } from './Heading';
import HomepageFeatures from './HomepageFeatures';
import HomepageHero from './HomepageHero';
import InlineCode from './InlineCode';
import Intro from './Intro';
import Link from './Link';
import Recap from './Recap';
import SupportedFrameworkCard from './SupportedFrameworkCard';
import TerminalBlock from './TerminalBlock';
import Frameworks from './Frameworks';
import CodeBlock from './CodeBlock';
import CustomPre from './CustomPre';

const P = (p: JSX.IntrinsicElements['p']) => (
  <p className="article-text" {...p} />
);

const Strong = (strong: JSX.IntrinsicElements['strong']) => (
  <strong className="font-bold" {...strong} />
);

const OL = (p: JSX.IntrinsicElements['ol']) => (
  <ol className="ml-6 my-3 list-decimal" {...p} />
);
const LI = (p: JSX.IntrinsicElements['li']) => (
  <li className="leading-relaxed mb-1" {...p} />
);
const UL = (p: JSX.IntrinsicElements['ul']) => (
  <ul className="article-ul__list" {...p} />
);

const Divider = () => (
  <hr className="my-6 block border-b border-border dark:border-border-dark" />
);

export const MDXComponents = {
  p: P,
  strong: Strong,
  ol: OL,
  ul: UL,
  li: LI,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  inlineCode: InlineCode,
  hr: Divider,
  a: Link,
  code: CodeBlock,
  pre: CustomPre,
  ConsoleBlock,
  Convention,
  HomepageHero,
  Intro,
  Recap,
  TerminalBlock,
  SupportedFrameworkCard,
  HomepageFeatures,
  Frameworks,
};
