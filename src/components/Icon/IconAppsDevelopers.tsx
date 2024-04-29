import * as React from 'react';

import cn from 'classnames';

export const IconAppsDevelopers = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="3" fill="#F6F6F7" />
      <path
        d="M12 22L6 16L12 10L13.425 11.425L8.825 16.025L13.4 20.6L12 22ZM20 22L18.575 20.575L23.175 15.975L18.6 11.4L20 10L26 16L20 22Z"
        fill="#515A62"
      />
    </svg>
  )
);

export const IconAppsDevelopersDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="3" fill="#17232E" />
      <path
        d="M12 22L6 16L12 10L13.425 11.425L8.825 16.025L13.4 20.6L12 22ZM20 22L18.575 20.575L23.175 15.975L18.6 11.4L20 10L26 16L20 22Z"
        fill="white"
      />
    </svg>
  )
);

IconAppsDevelopers.displayName = 'IconAppsDevelopers';
IconAppsDevelopersDark.displayName = 'IconAppsDevelopersDark';
