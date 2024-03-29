import * as React from 'react';

import cn from 'classnames';

export const IconEdgioMedia = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.0833 4C26.1423 4 27 4.85819 27 5.91667V25.0833C27 26.1419 26.1423 27 25.0833 27H5.91668C4.85772 27 4 26.1419 4 25.0833V5.91667C4 4.85819 4.85772 4 5.91668 4H25.0833ZM10.3902 9.09249C10.2847 9.24985 10.2292 9.43481 10.2292 9.62408V21.376C10.2292 21.9053 10.6585 22.3344 11.1875 22.3344C11.3763 22.3344 11.5613 22.2784 11.7194 22.1735L20.5332 16.2974C20.9731 16.0038 21.0928 15.4089 20.7986 14.9684C20.7287 14.8632 20.6386 14.7728 20.5332 14.7027L11.7194 8.82665C11.2785 8.53301 10.6834 8.65204 10.3902 9.09249Z"
        fill="#01B18D"
      />
    </svg>
  )
);

IconEdgioMedia.displayName = 'IconEdgioMedia';
