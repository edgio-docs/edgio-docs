import cn from 'classnames';
import * as React from 'react';

export const IconSecurity = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="28"
      height="30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 11.98 17">
      <g>
        <g>
          <path
            style={{fill: '#812991'}}
            d="M0,3.11v7.8A15.37,15.37,0,0,0,6.07,17a11.42,11.42,0,0,0,3.7-2.84,12.77,12.77,0,0,0,2.16-3.28c0-2.69.05-5,.05-7.7C9.87,1.86,9.59,1.7,9.59,1.7A23.51,23.51,0,0,0,6.09,0a29.9,29.9,0,0,0-3,1.27A27.31,27.31,0,0,0,0,3.11Zm1,.8a6.54,6.54,0,0,1,2.2-1.44,8.25,8.25,0,0,1,2.93-1.1V8.14h4.63l-.05,2.75a9.92,9.92,0,0,1-2.75,3.66,9.1,9.1,0,0,1-1.83,1.19V8.19h-5Z"
          />
        </g>
      </g>
    </svg>
  )
);

IconSecurity.displayName = 'IconSecurity';
