import * as React from 'react';
import cn from 'classnames';

export const IconSwell = React.memo<JSX.IntrinsicElements['svg']>(
  ({ className }) => (
    <svg className={cn('inline', className)} viewBox="0 0 438.7 512">
      <linearGradient
        id="swell_svg__a"
        gradientUnits="userSpaceOnUse"
        x1="219.356"
        y1="514"
        x2="219.356"
        y2="2"
        gradientTransform="matrix(1 0 0 -1 0 514)"
      >
        <stop offset="0" stopColor="#508" />
        <stop offset="1" stopColor="#ff7782" />
      </linearGradient>
      <path
        d="M267.5 34.2c82.8 0 127 38.4 127 66.2 0 2-.8 3.1-1.4 3.6l-.6.5-.6.6-54.7 55-36.3 36.5 47.7 19.2c40.3 16.3 56.1 38 56.1 77.5 0 17-6.6 32.2-19.7 45.2l-99.6 99.9-.4.4-.3.4c-23.3 24.7-65.9 38.8-116.9 38.8-86.3 0-134-37.2-134-63 0-3.2.6-5.3 1.3-5.9l.6-.6.6-.6L95 349l.8-.8.3-.3 31.7-33.2L86 294.2c-31.6-15.5-44.4-36.6-44.4-73 0-18.8 7.3-35.6 22-50l99.5-99.9.3-.3.3-.3c22.1-23.2 59.9-36.5 103.8-36.5m0-34.2C212.8 0 167 17.9 139.1 47.1L39.6 147c-20.2 19.8-31.9 45.4-31.9 74.2 0 57.1 27.5 86 63.5 103.7l-58.7 58.9C4.5 391 0 401.7 0 414.9 0 462.6 62.9 512 168 512c62.2 0 112.6-18.7 141.6-49.5l99.5-99.9c19-18.8 29.6-42.5 29.6-69.3 0-63.6-35-92-77.4-109.2l54.7-55c7.8-7.1 12.5-17.2 12.5-28.9C428.3 51 368.1 0 267.5 0z"
        fill="url(#swell_svg__a)"
      />
    </svg>
  )
);

IconSwell.displayName = 'IconSwell';
