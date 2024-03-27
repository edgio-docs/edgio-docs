import * as React from 'react';

import cn from 'classnames';

export const IconName = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => <svg className={cn('inline', className)}></svg>
);

export const IconNameDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => <svg className={cn('inline', className)}></svg>
);

IconName.displayName = 'Icon';
IconNameDark.displayName = 'IconDark';
