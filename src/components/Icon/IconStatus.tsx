import * as React from 'react';
import cn from 'classnames';

export const IconStatus = React.memo<JSX.IntrinsicElements['svg']>(
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
        d="M8.66681 8.94271C8.7918 9.06774 8.96135 9.138 9.13814 9.13804H9.52881C9.70561 9.138 9.87515 9.06774 10.0001 8.94271L13.1381 5.80471L14.6668 7.33337V3.33337H10.6668L12.1955 4.86204L9.33348 7.72404L7.33348 5.72404C7.20848 5.59901 7.03894 5.52875 6.86214 5.52871H6.47148C6.29468 5.52875 6.12514 5.59901 6.00014 5.72404L1.52881 10.1954L2.47148 11.138L6.66681 6.94271L8.66681 8.94271Z"
        fill="#606060"
      />
    </svg>
  )
);

IconStatus.displayName = 'IconStatus';
