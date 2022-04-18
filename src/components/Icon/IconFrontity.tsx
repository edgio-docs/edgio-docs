import cn from 'classnames';
import * as React from 'react';

export const IconFrontity = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg className={cn('inline', className)} viewBox="0 0 24 24">
      <path
        d="M3.731 0l9.285 9.284-.52.519.015.014-9.285 9.284L0 15.875l6.577-6.577L.505 3.226zm10.605 0l9.284 9.284-.519.519.014.014-9.284 9.284-3.226-3.226 6.576-6.577-6.071-6.072z"
        fill="#1f38c5"
        fillRule="nonzero"
      />
    </svg>
  )
);

IconFrontity.displayName = 'IconFrontity';
