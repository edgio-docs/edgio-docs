import * as React from 'react';
import cn from 'classnames';

export const IconHexo = React.memo<JSX.IntrinsicElements['svg']>(
  ({ className }) => (
    <svg className={cn('inline', className)} viewBox="0 0 512 512">
      <path
        fill="#0E83CD"
        d="M256.4 25.8l-200 115.5-.4 230.2 199.6 114.7 200-115.5.4-230.2L256.4 25.8zM349 354.6l-18.4 10.7-18.6-11V275H200v79.6l-18.4 10.7-18.6-11v-197l18.5-10.6 18.5 10.8V237h112v-79.6l18.5-10.6 18.5 10.8v197z"
      />
    </svg>
  )
);

IconHexo.displayName = 'IconHexo';
