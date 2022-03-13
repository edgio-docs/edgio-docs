import * as React from 'react';
import cn from 'classnames';

export const IconServerSmall = React.memo<JSX.IntrinsicElements['svg']>(
  function IconServerSmall({className, ...rest}) {
    return (
      <svg
        className={cn('inline', className)}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.54167 7.79167H13.4583V3.54167H3.54167V7.79167ZM14.875 2.83333V14.1667C14.875 14.3545 14.8004 14.5347 14.6675 14.6675C14.5347 14.8004 14.3545 14.875 14.1667 14.875H2.83333C2.64547 14.875 2.4653 14.8004 2.33247 14.6675C2.19963 14.5347 2.125 14.3545 2.125 14.1667V2.83333C2.125 2.64547 2.19963 2.4653 2.33247 2.33247C2.4653 2.19963 2.64547 2.125 2.83333 2.125H14.1667C14.3545 2.125 14.5347 2.19963 14.6675 2.33247C14.8004 2.4653 14.875 2.64547 14.875 2.83333ZM13.4583 9.20833H3.54167V13.4583H13.4583V9.20833ZM4.95833 10.625H7.08333V12.0417H4.95833V10.625ZM4.95833 4.95833H7.08333V6.375H4.95833V4.95833Z"
          fill="#606060"
        />
      </svg>
    );
  }
);

export const IconServerSmallDark = React.memo<JSX.IntrinsicElements['svg']>(
  function IconServerSmall({className, ...rest}) {
    return (
      <svg
        className={cn('inline', className)}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.54167 7.79167H13.4583V3.54167H3.54167V7.79167ZM14.875 2.83333V14.1667C14.875 14.3545 14.8004 14.5347 14.6675 14.6675C14.5347 14.8004 14.3545 14.875 14.1667 14.875H2.83333C2.64547 14.875 2.4653 14.8004 2.33247 14.6675C2.19963 14.5347 2.125 14.3545 2.125 14.1667V2.83333C2.125 2.64547 2.19963 2.4653 2.33247 2.33247C2.4653 2.19963 2.64547 2.125 2.83333 2.125H14.1667C14.3545 2.125 14.5347 2.19963 14.6675 2.33247C14.8004 2.4653 14.875 2.64547 14.875 2.83333ZM13.4583 9.20833H3.54167V13.4583H13.4583V9.20833ZM4.95833 10.625H7.08333V12.0417H4.95833V10.625ZM4.95833 4.95833H7.08333V6.375H4.95833V4.95833Z"
          fill="white"
        />
      </svg>
    );
  }
);

IconServerSmall.displayName = 'IconServerSmall';
IconServerSmallDark.displayName = 'IconServerSmallDark';
