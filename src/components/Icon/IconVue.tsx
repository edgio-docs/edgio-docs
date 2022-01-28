import * as React from 'react';
import cn from 'classnames';

export const IconVue = React.memo<JSX.IntrinsicElements['svg']>(
  ({ className }) => (
    <svg className={cn('inline', className)} viewBox="0 0 261.76 226.69">
      <path
        d="M161.096.001l-30.224 52.35L100.647.002H-.005L130.872 226.69 261.749 0z"
        fill="#41b883"
      />
      <path
        d="M161.096.001l-30.224 52.35L100.647.002H52.346l78.526 136.01L209.398.001z"
        fill="#34495e"
      />
    </svg>
  )
);

IconVue.displayName = 'IconVue';
