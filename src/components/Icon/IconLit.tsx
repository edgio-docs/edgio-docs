import cn from 'classnames';
import * as React from 'react';

export const IconLit = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg className={cn('inline', className)} viewBox="0 0 200 250">
      <path d="M40 120l20-60l90 90l-30 50l-40-40h-20" fill="#00e8ff" />
      <path
        d="M80 160v-80l40-40v80M0 160l40 40l20-40l-20-40h-20"
        fill="#283198"
      />
      <path
        d="M40 120v-80l40-40v80M120 200v-80l40-40v80M0 160v-80l40 40"
        fill="#324fff"
      />
      <path d="M40 200v-80l40 40" fill="#0ff" />
    </svg>
  )
);

IconLit.displayName = 'IconLit';
