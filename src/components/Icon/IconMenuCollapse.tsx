import * as React from 'react';

import cn from 'classnames';

export const IconMenuCollapse = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#17232E" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#151F29" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.8003 14.437C8.53403 14.7033 8.10233 14.7033 7.83606 14.437L4.1997 10.8007C3.93343 10.5344 3.93343 10.1027 4.1997 9.83642L7.83606 6.20005C8.10233 5.93379 8.53403 5.93379 8.8003 6.20005C9.06657 6.46632 9.06657 6.89803 8.8003 7.16429L5.64605 10.3185L8.8003 13.4728C9.06657 13.739 9.06657 14.1708 8.8003 14.437Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6336 14.437C14.3673 14.7033 13.9356 14.7033 13.6693 14.437L10.033 10.8007C9.76668 10.5344 9.76668 10.1027 10.033 9.83642L13.6693 6.20005C13.9356 5.93379 14.3673 5.93379 14.6336 6.20005C14.8998 6.46632 14.8998 6.89803 14.6336 7.16429L11.4793 10.3185L14.6336 13.4728C14.8998 13.739 14.8998 14.1708 14.6336 14.437Z"
        fill="white"
      />
    </svg>
  )
);

export const IconMenuCollapseDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="#17232E" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#151F29" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.8003 14.437C8.53403 14.7033 8.10233 14.7033 7.83606 14.437L4.1997 10.8007C3.93343 10.5344 3.93343 10.1027 4.1997 9.83642L7.83606 6.20005C8.10233 5.93379 8.53403 5.93379 8.8003 6.20005C9.06657 6.46632 9.06657 6.89803 8.8003 7.16429L5.64605 10.3185L8.8003 13.4728C9.06657 13.739 9.06657 14.1708 8.8003 14.437Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6336 14.437C14.3673 14.7033 13.9356 14.7033 13.6693 14.437L10.033 10.8007C9.76668 10.5344 9.76668 10.1027 10.033 9.83642L13.6693 6.20005C13.9356 5.93379 14.3673 5.93379 14.6336 6.20005C14.8998 6.46632 14.8998 6.89803 14.6336 7.16429L11.4793 10.3185L14.6336 13.4728C14.8998 13.739 14.8998 14.1708 14.6336 14.437Z"
        fill="white"
      />
    </svg>
  )
);

IconMenuCollapse.displayName = 'IconMenuCollapse';
IconMenuCollapseDark.displayName = 'IconMenuCollapseDark';
