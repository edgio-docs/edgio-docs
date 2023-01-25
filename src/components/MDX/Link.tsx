import cn from 'classnames';
import NextLink from 'next/link';
import * as React from 'react';

import {findGuideBy} from '../../utils/getChildrenRoutesFromSidebarMenuItems';

import {ExternalLink} from 'components/ExternalLink';

function Link({
  href,
  className,
  children,
  ...props
}: JSX.IntrinsicElements['a']) {
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

  return (
    <>
      {href.startsWith('https://') ? (
        <ExternalLink href={href} className={cn(classes, className)} {...props}>
          {modifiedChildren}
        </ExternalLink>
      ) : href.startsWith('#') ? (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a className={cn(classes, className)} href={href} {...props}>
          {modifiedChildren}
        </a>
      ) : (
        <NextLink href={href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a className={cn(classes, className)} {...props}>
            {modifiedChildren}
          </a>
        </NextLink>
      )}
    </>
  );
}

Link.displayName = 'Link';

export default Link;
