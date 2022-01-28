import * as React from 'react';
import cn from 'classnames';

export const IconIonicX = React.memo<JSX.IntrinsicElements['svg']>(
  ({ className }) => (
    <svg className={cn('inline', className)} fill="none" viewBox="0 0 48 48">
      <rect width="48" height="48" fill="#4180FC" rx="24" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M38.433 17.056l.13.305A15.919 15.919 0 0140 24c0 8.816-7.184 16-16 16S8 32.816 8 24 15.184 8 24 8c2.59 0 5.05.61 7.314 1.742l.305.152-.261.218a4.97 4.97 0 00-1.48 1.937l-.087.218-.196-.087A13.058 13.058 0 0024 10.917c-7.227 0-13.083 5.856-13.083 13.083S16.773 37.083 24 37.083 37.083 31.205 37.083 24c0-1.72-.327-3.418-1.001-5.007l-.087-.217.217-.088a5.08 5.08 0 002.003-1.371l.218-.261zm-3.962.305a3.33 3.33 0 100-6.662 3.33 3.33 0 000 6.662zM24 16.708a7.293 7.293 0 100 14.585 7.293 7.293 0 000-14.585z"
        clipRule="evenodd"
      />
    </svg>
  )
);

IconIonicX.displayName = 'IconIonicX';
