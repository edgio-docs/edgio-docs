import * as React from 'react';

import cn from 'classnames';

export const IconDelivery = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1746_78)">
        <path
          d="M28.3959 8.45833L20.6927 13.429L20.6927 3.48771L28.3959 8.45833Z"
          fill="#01B18D"
        />
        <rect
          x="13.5938"
          y="6.04175"
          width="5.4375"
          height="5.13542"
          rx="1.51042"
          fill="#01B18D"
        />
        <rect
          x="6.94788"
          y="6.04175"
          width="5.4375"
          height="5.13542"
          rx="1.51042"
          fill="#01B18D"
        />
        <rect
          y="6.04175"
          width="5.4375"
          height="5.13542"
          rx="1.51042"
          fill="#01B18D"
        />
        <rect
          y="13.8958"
          width="5.4375"
          height="4.83333"
          rx="1.51042"
          fill="#01B18D"
        />
        <rect
          y="21.4479"
          width="5.4375"
          height="4.83333"
          rx="1.51042"
          fill="#01B18D"
        />
      </g>
      <defs>
        <clipPath id="clip0_1746_78">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);

IconDelivery.displayName = 'IconDelivery';
