import * as React from 'react';

import cn from 'classnames';

export const IconDeliveryDelivery = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2154_1384)">
        <path
          d="M31.3333 9.13121L23.1045 14.441L23.1045 3.82143L31.3333 9.13121Z"
          fill="#00A2E2"
        />
        <rect
          x="15.5212"
          y="6.54968"
          width="5.80851"
          height="5.48582"
          rx="2"
          fill="#00A2E2"
        />
        <rect
          x="8.42188"
          y="6.54968"
          width="5.80851"
          height="5.48582"
          rx="2"
          fill="#00A2E2"
        />
        <rect
          x="1"
          y="6.54968"
          width="5.80851"
          height="5.48582"
          rx="2"
          fill="#00A2E2"
        />
        <rect
          x="1"
          y="14.9397"
          width="5.80851"
          height="5.16312"
          rx="2"
          fill="#00A2E2"
        />
        <rect
          x="1"
          y="23.0071"
          width="5.80851"
          height="5.16312"
          rx="2"
          fill="#00A2E2"
        />
      </g>
      <defs>
        <clipPath id="clip0_2154_1384">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);

export const IconDeliveryDeliveryDark = IconDeliveryDelivery;

IconDeliveryDelivery.displayName = 'IconDeliveryDelivery';
IconDeliveryDeliveryDark.displayName = 'IconDeliveryDeliveryDark';
