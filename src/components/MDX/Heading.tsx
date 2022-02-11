import cn from 'classnames';
import * as React from 'react';
import {siteConfig} from 'siteConfig';
import {forwardRefWithAs} from 'utils/forwardRefWithAs';

export interface HeadingProps {
  className?: string;
  isPageAnchor?: boolean;
  children: React.ReactNode;
  id?: string;
  as?: any;
}

const anchorClassName = siteConfig.headerIdConfig.className;

const Heading = forwardRefWithAs<HeadingProps, 'div'>(
  (
    {as: Comp = 'div', className, children, id, isPageAnchor = true, ...props},
    ref
  ) => (
    <Comp id={id} {...props} ref={ref} className={cn('heading', className)}>
      {children}
      {isPageAnchor && (
        <a
          href={`#${id}`}
          className={cn(
            anchorClassName,
            Comp === 'h1' ? 'hidden' : 'inline-block'
          )}
          aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              fill="#bcbfc3"
              fillRule="evenodd"
              d="M4.227 13.4a3.605 3.605 0 01-2.566-1.063 3.631 3.631 0 010-5.131l1.573-1.572a.8.8 0 111.131 1.132l-1.573 1.57a2.032 2.032 0 000 2.87c.769.767 2.105.766 2.87 0l1.573-1.572a.8.8 0 111.132 1.132l-1.573 1.57A3.603 3.603 0 014.227 13.4zm5.974-4.8a.8.8 0 01-.566-1.366l1.573-1.57c.79-.792.79-2.08 0-2.87-.769-.767-2.105-.765-2.87 0L6.766 4.367a.8.8 0 11-1.132-1.131l1.572-1.572A3.603 3.603 0 019.774.6c.969 0 1.88.378 2.566 1.063a3.633 3.633 0 010 5.131l-1.572 1.572a.798.798 0 01-.566.234zm-4.802.8a.8.8 0 01-.566-1.366l3.202-3.2a.8.8 0 111.131 1.132l-3.2 3.2a.8.8 0 01-.567.234z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      )}
    </Comp>
  )
);

Heading.displayName = 'Heading';

export const H1 = ({className, ...props}: HeadingProps) => (
  <Heading as="h1" className={cn(className, 'article-heading')} {...props} />
);

export const H2 = ({className, ...props}: HeadingProps) => (
  <Heading as="h2" className={cn('article-heading', className)} {...props} />
);
export const H3 = ({className, ...props}: HeadingProps) => (
  <Heading as="h3" className={cn(className, 'article-heading')} {...props} />
);

export const H4 = ({className, ...props}: HeadingProps) => (
  <Heading as="h4" className={cn(className, 'article-heading')} {...props} />
);
