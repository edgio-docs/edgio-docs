import { GoKebabVertical } from 'react-icons/go';

import ApplicationsFeatures from './Applications/Features';
import ApplicationsHero from './Applications/Hero';
import ButtonLink from './ButtonLink';
import ButtonLinksGroup from './ButtonLinksGroup';
import Callout from './Callout';
import Condition from './Condition';
import CustomPre from './CustomPre';
import DeliveryFeatures from './Delivery/Features';
import DeliveryHero from './Delivery/Hero';
import ExampleButtons from './ExampleButtons';
import Frameworks, { V7LegacyFrameworks } from './Frameworks';
import { H1, H2, H3, H4 } from './Heading';
import HomeFeatures from './Home/Features';
import HomeHero from './Home/Hero';
import Image from './Image';
import InlineCode from './InlineCode';
import Integrations from './Integrations';
import Link from './Link';
import PackageCommand from './PackageCommand';
import PopularFrameworks from './PopularFrameworks';
import RawEdgeJS from './RawEdgeJS';
import { SnippetGroup } from './SnippetGroup';
import UplynkFeatures from './Uplynk/Featrues';
import UplynkHero from './Uplynk/Hero';
import Video, { VimeoMDXEmbed } from './Video';

const P = (p: JSX.IntrinsicElements['p']) => (
  // modified `<p>` elements to render as a `<div>` element
  // to allow for inline figures without hydration errors
  <div className="article-text" {...p} />
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
  GoKebabVertical,
  p: P,
  strong: Strong,
  ol: OL,
  ul: UL,
  li: LI,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  code: InlineCode,
  inlineCode: InlineCode,
  hr: Divider,
  br: BR,
  a: Link,
  Link,
  pre: CustomPre,
  Frameworks,
  V7LegacyFrameworks,
  PopularFrameworks,
  Callout,
  Info: (props: any) => <Callout type="info" {...props} />,
  Important: (props: any) => <Callout type="important" {...props} />,
  Tip: (props: any) => <Callout type="tip" {...props} />,
  Warning: (props: any) => <Callout type="warning" {...props} />,
  Danger: (props: any) => <Callout type="danger" {...props} />,
  ButtonLinksGroup,
  ButtonLink,
  Video,
  VimeoMDXEmbed,
  img: Image,
  Image,
  Integrations,
  ExampleButtons,
  SnippetGroup,
  Condition,
  RawEdgeJS,
  PackageCommand,

  // context-specific components
  HomeHero,
  HomeFeatures,
  ApplicationsHero,
  ApplicationsFeatures,
  DeliveryHero,
  DeliveryFeatures,
  UplynkHero,
  UplynkFeatures,
};
