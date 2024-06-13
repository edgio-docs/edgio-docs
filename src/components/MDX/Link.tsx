import * as React from 'react';

import cn from 'classnames';
import NextLink from 'next/link';

import {ExternalLink} from 'components/ExternalLink';
import useConditioning from 'utils/hooks/useConditioning';

type AProps = JSX.IntrinsicElements['a'];

interface LinkProps extends AProps {
  versioned?: boolean;
  useNextLink?: boolean;
}

function Link({
  href,
  className,
  children,
  versioned = true,
  useNextLink = true,
  ...props
}: LinkProps) {
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
  )[0];

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
  const hasProtocol = /^(http|mailto|tel):/.test(href);
  if (/^(http|mailto|tel|\/docs\/)/.test(href)) {
    hrefType = 'external';
  } else if (href.startsWith('#')) {
    hrefType = 'anchor';
  }

  // only version relative links
  if (versioned && !hasProtocol) {
    href = version.toVersionedPath(href);
  }

  switch (hrefType) {
    case 'external':
      return (
        <ExternalLink href={href} className={cn(classes, className)} {...props}>
          {modifiedChildren}
        </ExternalLink>
      );
    case 'anchor':
      return (
        <NextLink href={href} legacyBehavior>
          <a className={cn(classes, className)} {...props}>
            {modifiedChildren}
          </a>
        </NextLink>
      );
  }

  return useNextLink ? (
    <NextLink href={href} legacyBehavior>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a className={cn(classes, className)} {...props}>
        {modifiedChildren}
      </a>
    </NextLink>
  ) : (
    <a href={href} className={cn(classes, className)} {...props}>
      {modifiedChildren}
    </a>
  );
}

Link.displayName = 'Link';

export default Link;
