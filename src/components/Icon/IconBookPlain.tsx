import * as React from 'react';
import cn from 'classnames';

export const IconBookPlain = React.memo<JSX.IntrinsicElements['svg']>(
  function IconBookPlain({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 12H4C3.82319 12 3.65362 12.0703 3.5286 12.1953C3.40357 12.3203 3.33333 12.4899 3.33333 12.6667C3.33333 12.8435 3.40357 13.0131 3.5286 13.1381C3.65362 13.2631 3.82319 13.3334 4 13.3334H14V14.6667H4C3.46957 14.6667 2.96086 14.456 2.58579 14.0809C2.21071 13.7058 2 13.1971 2 12.6667V2.66671C2 2.31309 2.14048 1.97395 2.39052 1.7239C2.64057 1.47385 2.97971 1.33337 3.33333 1.33337H14V12ZM3.33333 10.7C3.44133 10.678 3.55267 10.6667 3.66667 10.6667H12.6667V2.66671H3.33333V10.7ZM10.6667 6.00004H5.33333V4.66671H10.6667V6.00004Z"
          fill="#606060"
        />
      </svg>
    );
  }
);

export const IconBookPlainDark = React.memo<JSX.IntrinsicElements['svg']>(
  function IconBookPlain({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 12H4C3.82319 12 3.65362 12.0703 3.5286 12.1953C3.40357 12.3203 3.33333 12.4899 3.33333 12.6667C3.33333 12.8435 3.40357 13.0131 3.5286 13.1381C3.65362 13.2631 3.82319 13.3334 4 13.3334H14V14.6667H4C3.46957 14.6667 2.96086 14.456 2.58579 14.0809C2.21071 13.7058 2 13.1971 2 12.6667V2.66671C2 2.31309 2.14048 1.97395 2.39052 1.7239C2.64057 1.47385 2.97971 1.33337 3.33333 1.33337H14V12ZM3.33333 10.7C3.44133 10.678 3.55267 10.6667 3.66667 10.6667H12.6667V2.66671H3.33333V10.7ZM10.6667 6.00004H5.33333V4.66671H10.6667V6.00004Z"
          fill="white"
        />
      </svg>
    );
  }
);

IconBookPlain.displayName = 'IconBookPlain';
IconBookPlainDark.displayName = 'IconBookPlainDark';
