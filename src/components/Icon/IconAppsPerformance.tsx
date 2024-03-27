import * as React from 'react';

import cn from 'classnames';

export const IconAppsPerformance = React.memo<JSX.IntrinsicElements['svg']>(
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
        d="M9 15H23V9H9V15ZM25 8V24C25 24.2652 24.8946 24.5196 24.7071 24.7071C24.5196 24.8946 24.2652 25 24 25H8C7.73478 25 7.48043 24.8946 7.29289 24.7071C7.10536 24.5196 7 24.2652 7 24V8C7 7.73478 7.10536 7.48043 7.29289 7.29289C7.48043 7.10536 7.73478 7 8 7H24C24.2652 7 24.5196 7.10536 24.7071 7.29289C24.8946 7.48043 25 7.73478 25 8ZM23 17H9V23H23V17ZM11 19H14V21H11V19ZM11 11H14V13H11V11Z"
        fill="#515A62"
      />
    </svg>
  )
);

export const IconAppsPerformanceDark = React.memo<JSX.IntrinsicElements['svg']>(
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
        d="M9 15H23V9H9V15ZM25 8V24C25 24.2652 24.8946 24.5196 24.7071 24.7071C24.5196 24.8946 24.2652 25 24 25H8C7.73478 25 7.48043 24.8946 7.29289 24.7071C7.10536 24.5196 7 24.2652 7 24V8C7 7.73478 7.10536 7.48043 7.29289 7.29289C7.48043 7.10536 7.73478 7 8 7H24C24.2652 7 24.5196 7.10536 24.7071 7.29289C24.8946 7.48043 25 7.73478 25 8ZM23 17H9V23H23V17ZM11 19H14V21H11V19ZM11 11H14V13H11V11Z"
        fill="#F6F6F7"
      />
    </svg>
  )
);

IconAppsPerformance.displayName = 'IconAppsPerformance';
IconAppsPerformanceDark.displayName = 'IconAppsPerformanceDark';
