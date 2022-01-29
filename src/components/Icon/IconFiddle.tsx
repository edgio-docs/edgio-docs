import * as React from 'react';
import cn from 'classnames';

export const IconFiddle = React.memo<JSX.IntrinsicElements['svg']>(
  ({ className }) => (
    <svg
      className={cn('inline', className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 14H8.66667V10H14V14ZM7.33333 14H2V7.33333H7.33333V14ZM14 8.66667H8.66667V2H14V8.66667ZM7.33333 6H2V2H7.33333V6Z"
        fill="#2E3A59"
      />
    </svg>
  )
);

IconFiddle.displayName = 'IconFiddle';
