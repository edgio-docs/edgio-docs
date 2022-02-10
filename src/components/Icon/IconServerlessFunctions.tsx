import * as React from 'react';
import cn from 'classnames';

export const IconServerlessFunctions = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg viewBox="0 0 546 546" fill="none" className={cn('inline', className)}>
      <circle
        cx="272.729"
        cy="273.172"
        r="267.304"
        fill="#EA5494"
        stroke="#EA5494"
        strokeWidth="10"
      />
      <circle
        cx="272.729"
        cy="273.172"
        r="221.92"
        fill="#FFF"
        stroke="#EA5494"
        strokeWidth="10"
      />
      <path
        d="M192.616 161.536V113.84h83.307l96.027 240.385 41.336-10.811 13.99 46.423-89.667 26.71-62.322-153.897-89.031 139.906h-54.691l124.644-201.592-15.262-39.428h-48.331z"
        fill="#333"
        stroke="#333"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

IconServerlessFunctions.displayName = 'IconServerlessFunctions';
