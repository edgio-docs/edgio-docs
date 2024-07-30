import * as React from 'react';

import cn from 'classnames';

export const IconAnalytics = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.36683 3.36683C4.242 2.49166 5.42899 2 6.66667 2H25.3333C26.571 2 27.758 2.49167 28.6332 3.36683C29.5083 4.242 30 5.42899 30 6.66667V25.3333C30 26.571 29.5083 27.758 28.6332 28.6332C27.758 29.5083 26.571 30 25.3333 30H6.66667C5.42899 30 4.242 29.5083 3.36683 28.6332C2.49167 27.758 2 26.571 2 25.3333V6.66667C2 5.42899 2.49166 4.242 3.36683 3.36683ZM6.66667 5.11111C6.25411 5.11111 5.85845 5.275 5.56672 5.56672C5.275 5.85845 5.11111 6.25411 5.11111 6.66667V25.3333C5.11111 25.7459 5.275 26.1416 5.56672 26.4333C5.85845 26.725 6.25411 26.8889 6.66667 26.8889H25.3333C25.7459 26.8889 26.1416 26.725 26.4333 26.4333C26.725 26.1416 26.8889 25.7459 26.8889 25.3333V6.66667C26.8889 6.25411 26.725 5.85845 26.4333 5.56672C26.1416 5.275 25.7459 5.11111 25.3333 5.11111H6.66667ZM16 8.22222C16.8591 8.22222 17.5556 8.91867 17.5556 9.77778V22.2222C17.5556 23.0813 16.8591 23.7778 16 23.7778C15.1409 23.7778 14.4444 23.0813 14.4444 22.2222V9.77778C14.4444 8.91867 15.1409 8.22222 16 8.22222ZM9.77778 12.8889C10.6369 12.8889 11.3333 13.5853 11.3333 14.4444V22.2222C11.3333 23.0813 10.6369 23.7778 9.77778 23.7778C8.91867 23.7778 8.22222 23.0813 8.22222 22.2222V14.4444C8.22222 13.5853 8.91867 12.8889 9.77778 12.8889ZM22.2222 17.5556C23.0813 17.5556 23.7778 18.252 23.7778 19.1111V22.2222C23.7778 23.0813 23.0813 23.7778 22.2222 23.7778C21.3631 23.7778 20.6667 23.0813 20.6667 22.2222V19.1111C20.6667 18.252 21.3631 17.5556 22.2222 17.5556Z"
        fill="#812991"
      />
    </svg>
  )
);

export const IconAnalyticsDark = IconAnalytics;

IconAnalytics.displayName = 'IconAnalytics';
IconAnalyticsDark.displayName = 'IconAnalyticsDark';