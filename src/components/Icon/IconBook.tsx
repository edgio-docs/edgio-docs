/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import cn from 'classnames';

export const IconBook = React.memo<JSX.IntrinsicElements['svg']>(
  function IconBook({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#EEEEEE" />
        <rect width="32" height="32" rx="3" fill="#EEEEEE" />
        <path
          d="M23.375 20.75H10.25C10.0179 20.75 9.79538 20.8422 9.63128 21.0063C9.46719 21.1704 9.375 21.3929 9.375 21.625C9.375 21.8571 9.46719 22.0796 9.63128 22.2437C9.79538 22.4078 10.0179 22.5 10.25 22.5H23.375V24.25H10.25C9.55381 24.25 8.88613 23.9734 8.39384 23.4812C7.90156 22.9889 7.625 22.3212 7.625 21.625V8.5C7.625 8.03587 7.80937 7.59075 8.13756 7.26256C8.46575 6.93437 8.91087 6.75 9.375 6.75H23.375V20.75ZM9.375 19.0437C9.51675 19.0149 9.66287 19 9.8125 19H21.625V8.5H9.375V19.0437ZM19 12.875H12V11.125H19V12.875Z"
          fill="#606060"
        />
      </svg>
    );
  }
);

IconBook.displayName = 'IconBook';
