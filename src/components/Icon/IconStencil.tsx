import * as React from 'react';
import cn from 'classnames';

export const IconStencil = React.memo<JSX.IntrinsicElements['svg']>(
  ({ className }) => (
    <svg className={cn('inline', className)} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="#000" />
      <path
        fill="#fff"
        d="M20.27 29H32l-6.34 7H14l6.27-7zM40 21H15.45L9 27h24.55L40 21zm-16.68-9H35l-6.3 7H17l6.32-7z"
      />
    </svg>
  )
);

IconStencil.displayName = 'IconStencil';
