import cn from 'classnames';
import * as React from 'react';

export const IconExternalLink = React.memo<JSX.IntrinsicElements['svg']>(
  function IconExternalLink({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.3341 13.3332H4.00081C3.26443 13.3332 2.66748 12.7362 2.66748 11.9998V4.6665C2.66748 3.93012 3.26443 3.33317 4.00081 3.33317H6.66748V4.6665H4.00081V11.9998H11.3341V9.33317H12.6675V11.9998C12.6675 12.7362 12.0705 13.3332 11.3341 13.3332ZM7.80082 9.13784L6.86082 8.19517L11.0561 3.99984H8.66748V2.6665H13.3341V7.33317H12.0008V4.94317L7.80082 9.13784Z"
          fill="#01B18D"
        />
      </svg>
    );
  }
);

IconExternalLink.displayName = 'IconExternalLink';
