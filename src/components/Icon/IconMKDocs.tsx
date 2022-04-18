import cn from 'classnames';
import * as React from 'react';

export const IconMKDocs = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
    </svg>
  )
);

export const IconMKDocsDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <path
        fill="#fff"
        d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
      />
    </svg>
  )
);

IconMKDocs.displayName = 'IconMKDocs';
IconMKDocsDark.displayName = 'IconMKDocsDark';
