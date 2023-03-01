import cn from 'classnames';
import NextLink from 'next/link';
import * as React from 'react';

import {ExternalLink} from 'components/ExternalLink';
import useConditioning from 'utils/hooks/useConditioning';

function Link({
  href,
  className,
  children,
  ...props
}: JSX.IntrinsicElements['a']) {
  const {version} = useConditioning();
  const classes = 'text-link';
  const modifiedChildren = React.Children.toArray(children).map(
    (child: any, idx: number) => {
      if (child.props?.mdxType && child.props?.mdxType === 'inlineCode') {
        return React.cloneElement(child, {
          isLink: true,
        });
      }
      return child;
    }
  );

  if (!href) {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a href={href} className={className} {...props} />;
  }

  // prepend mailto protocol if href matches email pattern
  if (
    href
      .trim()
      .match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
  ) {
    href = `mailto:${href}`;
  }

  let hrefType = 'internal';
  if (href.startsWith('http')) {
    hrefType = 'external';
  } else if (href.startsWith('#')) {
    hrefType = 'anchor';
  }

  switch (hrefType) {
    case 'external':
      return (
        <ExternalLink href={href} className={cn(classes, className)} {...props}>
          {modifiedChildren}
        </ExternalLink>
      );
    case 'anchor':
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return (
        <a className={cn(classes, className)} href={href} {...props}>
          {modifiedChildren}
        </a>
      );
  }

  // internal link
  return (
    <NextLink href={version.toPath(href)}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a className={cn(classes, className)} {...props}>
        {modifiedChildren}
      </a>
    </NextLink>
  );
}

Link.displayName = 'Link';

export default Link;
