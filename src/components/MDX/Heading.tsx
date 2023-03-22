import cn from 'classnames';
import * as React from 'react';

import {siteConfig} from 'config/appConfig';
import {forwardRefWithAs} from 'utils/forwardRefWithAs';

export const H1 = ({className, ...props}: HeadingProps) => (
  <Heading as="h1" className={cn(className, 'article-heading')} {...props} />
);

const anchorClassName = siteConfig.headerIdConfig.className;

const Heading = forwardRefWithAs<HeadingProps, 'div'>(
  (
    {as: Comp = 'div', className, children, id, isPageAnchor = true, ...props},
    ref
  ) => (
    <Comp id={id} {...props} ref={ref} className={cn('heading', className)}>
      <a href={`#${id}`} className={anchorClassName}>
        {children}
        {isPageAnchor && (
          <span
            className={cn(Comp === 'h1' ? 'hidden' : 'inline-block')}
            aria-hidden="true">
            #
          </span>
        )}
      </a>
    </Comp>
  )
);

Heading.displayName = 'Heading';

export const H2 = ({className, ...props}: HeadingProps) => (
  <Heading as="h2" className={cn('article-heading', className)} {...props} />
);

export const H3 = ({className, ...props}: HeadingProps) => (
  <Heading as="h3" className={cn(className, 'article-heading')} {...props} />
);
export const H4 = ({className, ...props}: HeadingProps) => (
  <Heading as="h4" className={cn(className, 'article-heading')} {...props} />
);

export interface HeadingProps {
  className?: string;
  isPageAnchor?: boolean;
  children: React.ReactNode;
  id?: string;
  as?: any;
}
