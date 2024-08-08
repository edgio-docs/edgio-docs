import * as React from 'react';

import cn from 'classnames';

export const IconDeliverySection = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#EEEEEE" />
      <rect width="32" height="32" rx="3" fill="#EEEEEE" />
      <g clipPath="url(#clip0_2149_606)">
        <path
          d="M27.5 10.8484L21.3285 14.8307L21.3285 6.86607L27.5 10.8484Z"
          fill="#121C25"
        />
        <rect
          x="15.6411"
          y="8.91223"
          width="4.35638"
          height="4.11436"
          rx="2"
          fill="#121C25"
        />
        <rect
          x="10.3164"
          y="8.91223"
          width="4.35638"
          height="4.11436"
          rx="2"
          fill="#121C25"
        />
        <rect
          x="4.75"
          y="8.91223"
          width="4.35638"
          height="4.11436"
          rx="2"
          fill="#121C25"
        />
        <rect
          x="4.75"
          y="15.2048"
          width="4.35638"
          height="3.87234"
          rx="1.93617"
          fill="#121C25"
        />
        <rect
          x="4.75"
          y="21.2554"
          width="4.35638"
          height="3.87234"
          rx="1.93617"
          fill="#121C25"
        />
      </g>
      <defs>
        <clipPath id="clip0_2149_606">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </svg>
  )
);

export const IconDeliverySectionDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#121C25" />
      <rect width="32" height="32" rx="3" fill="#121C25" />
      <g clipPath="url(#clip0_2149_606)">
        <path
          d="M27.5 10.8484L21.3285 14.8307L21.3285 6.86607L27.5 10.8484Z"
          fill="white"
        />
        <rect
          x="15.6411"
          y="8.91223"
          width="4.35638"
          height="4.11436"
          rx="2"
          fill="white"
        />
        <rect
          x="10.3164"
          y="8.91223"
          width="4.35638"
          height="4.11436"
          rx="2"
          fill="white"
        />
        <rect
          x="4.75"
          y="8.91223"
          width="4.35638"
          height="4.11436"
          rx="2"
          fill="white"
        />
        <rect
          x="4.75"
          y="15.2048"
          width="4.35638"
          height="3.87234"
          rx="1.93617"
          fill="white"
        />
        <rect
          x="4.75"
          y="21.2554"
          width="4.35638"
          height="3.87234"
          rx="1.93617"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2149_606">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </svg>
  )
);

IconDeliverySection.displayName = 'IconDeliverySection';
IconDeliverySectionDark.displayName = 'IconDeliverySectionDark';
