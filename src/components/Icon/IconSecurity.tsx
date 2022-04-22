import cn from 'classnames';
import * as React from 'react';

export const IconSecurity = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_71_144)">
        <path
          d="M24.8843 13.5896L24.6787 13.4967C24.7095 13.1414 24.728 12.7821 24.728 12.4186C24.7275 9.79294 23.8982 7.23503 22.3593 5.11241C20.8203 2.98979 18.6509 1.41173 16.1629 0.605C13.6748 -0.201734 10.9961 -0.195618 8.5117 0.622469C6.0273 1.44056 3.86509 3.0285 2.33576 5.15813C0.806435 7.28775 -0.0112795 9.84942 0.000117537 12.475C0.0115146 15.1007 0.851436 17.6551 2.39919 19.7712C3.94695 21.8874 6.12286 23.4564 8.61427 24.2527C11.1057 25.049 13.7843 25.0316 16.2653 24.2031C16.491 24.7849 16.7815 25.3391 17.1311 25.8554C18.7147 28.1954 21.0283 29.0524 21.9311 29.3271C24.6788 28.1841 26.8618 25.9918 28 23.2325V15.4091C27.0095 14.7232 25.9678 14.1149 24.8843 13.5896ZM22.0051 9.88654V12.4186H21.9866H21.9743L21.9208 12.4372C20.4628 12.7366 19.0783 13.3227 17.8468 14.1617V9.88654H22.0051ZM2.64884 12.3112C2.64877 11.4999 2.7065 10.6896 2.82159 9.88654H6.9347V14.7173H2.82159C2.70668 13.9204 2.64894 13.1163 2.64884 12.3112ZM5.66787 20.1717C4.73395 19.372 4.02786 18.338 3.62159 17.175H7.17532L8.95424 21.7186C7.74161 21.5046 6.60742 20.9708 5.66787 20.1717ZM7.17532 7.43504H3.62159C4.02746 6.26968 4.73565 5.2342 5.67308 4.43547C6.6105 3.63675 7.74319 3.10372 8.95424 2.8914L7.17532 7.43504ZM13.7789 19.5232L12.3578 21.8714L10.9409 19.5232L9.52596 17.175H15.1877L13.7789 19.5232ZM9.55681 14.7173V9.88654H15.1568V14.7173H9.55681ZM12.3578 7.43504H9.52596L10.9409 5.07855L12.3578 2.73031L13.7789 5.07855L15.1877 7.43504H12.3578ZM15.6607 2.8914C16.8717 3.10324 18.0043 3.63612 18.9415 4.43494C19.8787 5.23375 20.5863 6.2695 20.9913 7.43504H17.4375L15.6607 2.8914ZM16.7671 20.7273V16.5223C18.3577 15.3875 20.129 14.5327 22.0051 13.9944V20.7169L16.7671 20.7273ZM25.6103 24.8145C24.6136 26.219 23.1794 27.2502 21.5342 27.7451V20.8305H26.9676C26.8932 22.2556 26.4246 23.6317 25.6144 24.8041L25.6103 24.8145Z"
          fill="#E95495"
        />
      </g>
      <defs>
        <clipPath id="clip0_71_144">
          <rect width="28" height="29.3333" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
);

IconSecurity.displayName = 'IconSecurity';
