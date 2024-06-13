import * as React from 'react';

import cn from 'classnames';
import NextLink from 'next/link';

import {ExternalLink} from 'components/ExternalLink';
import {productsConfig} from 'config/appConfig';
import {useAppContext} from 'contexts/AppContext';
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
  const hrefType = getHrefType(href);

  href = toNormalizedPath(href, versioned);

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

export function toNormalizedPath(path: string | undefined, versioned = true) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {version} = useConditioning();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {context} = useAppContext();

  if (!path) {
    return '';
  }

  // If the path is already a full URL or anchor, return it as-is
  const hrefType = getHrefType(path);
  if (hrefType === 'external' || hrefType === 'anchor' || !path) {
    return path;
  }

  let pathPrefix = '';

  if (context) {
    pathPrefix = productsConfig[context].pathPrefix;
  }

  // Assume the path prefix needs to be prepended if the path does not start with a /
  if (!path.startsWith('/')) {
    path = [pathPrefix, path].filter(Boolean).join('/');
  }

  if (versioned) {
    return version.toVersionedPath(path);
  }

  return path;
}

function getHrefType(href: string | undefined) {
  if (!href) {
    return 'external';
  }

  if (/^(http|mailto|tel|\/docs\/)/.test(href)) {
    return 'external';
  } else if (href.startsWith('#')) {
    return 'anchor';
  }

  return 'internal';
}
