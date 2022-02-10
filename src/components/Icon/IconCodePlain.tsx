import * as React from 'react';
import cn from 'classnames';

export const IconCodePlain = React.memo<JSX.IntrinsicElements['svg']>(
  function IconCodePlain({className}) {
    return (
      <svg
        className={cn('inline', className)}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.34016 12.0133L1.3335 8.00667L5.34016 4L6.2835 4.94267L3.21683 8.00933L6.2835 11.076L5.34083 12.0133H5.34016ZM10.6595 12.0133L9.7175 11.0713L12.7842 8.00467L9.7175 4.938L10.6602 4L14.6668 8.00667L10.6602 12.0133H10.6595Z"
          fill="#606060"
        />
      </svg>
    );
  }
);

IconCodePlain.displayName = 'IconCodePlain';
