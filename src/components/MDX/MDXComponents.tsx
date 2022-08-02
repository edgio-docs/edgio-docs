import * as React from 'react';

import ButtonLink from './ButtonLink';
import ButtonLinksGroup from './ButtonLinksGroup';
import Callout from './Callout';
import CustomPre from './CustomPre';
import ExampleButtons from './ExampleButtons';
import Frameworks from './Frameworks';
import {H1, H2, H3, H4} from './Heading';
import HomepageFeatures from './HomepageFeatures';
import HomepageHero from './HomepageHero';
import Image from './Image';
import InlineCode from './InlineCode';
import Integrations from './Integrations';
import Link from './Link';
import Video, {VimeoMDXEmbed} from './Video';

const P = (p: JSX.IntrinsicElements['p']) => (
  <p className="article-text" {...p} />
);

const Strong = (strong: JSX.IntrinsicElements['strong']) => (
  <strong className="font-bold" {...strong} />
);

const OL = (p: JSX.IntrinsicElements['ol']) => (
  <ol className="article-ol__list" {...p} />
);
const LI = (p: JSX.IntrinsicElements['li']) => (
  <li className="list-item" {...p} />
);
const UL = (p: JSX.IntrinsicElements['ul']) => (
  <ul className="article-ul__list" {...p} />
);
const BR = (p: JSX.IntrinsicElements['br']) => (
  <br className="article-ul__list" {...p} />
);

const Divider = () => (
  <hr
    style={{
      height: '1px',
      backgroundColor: 'var(--hr-secondary)',
      border: 'none',
    }}
  />
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
  br: BR,
  a: Link,
  Link,
  pre: CustomPre,
  HomepageHero,
  HomepageFeatures,
  Frameworks,
  Callout,
  ButtonLinksGroup,
  ButtonLink,
  Video,
  VimeoMDXEmbed,
  img: Image,
  Integrations,
  ExampleButtons,
};
