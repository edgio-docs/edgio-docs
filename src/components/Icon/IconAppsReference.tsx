import * as React from 'react';

import cn from 'classnames';

export const IconAppsReference = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="3" fill="#F6F6F7" />
      <path
        d="M16 18L5 12L16 6L27 12L16 18ZM16 22L5.575 16.325L7.675 15.175L16 19.725L24.325 15.175L26.425 16.325L16 22ZM16 26L5.575 20.325L7.675 19.175L16 23.725L24.325 19.175L26.425 20.325L16 26ZM16 15.725L22.825 12L16 8.275L9.175 12L16 15.725Z"
        fill="#515A62"
      />
    </svg>
  )
);

export const IconAppsReferenceDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="3" fill="#17232E" />
      <path
        d="M16 18L5 12L16 6L27 12L16 18ZM16 22L5.575 16.325L7.675 15.175L16 19.725L24.325 15.175L26.425 16.325L16 22ZM16 26L5.575 20.325L7.675 19.175L16 23.725L24.325 19.175L26.425 20.325L16 26ZM16 15.725L22.825 12L16 8.275L9.175 12L16 15.725Z"
        fill="white"
      />
    </svg>
  )
);

IconAppsReference.displayName = 'IconAppsReference';
IconAppsReferenceDark.displayName = 'IconAppsReferenceDark';
