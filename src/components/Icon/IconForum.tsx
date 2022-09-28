import cn from 'classnames';
import * as React from 'react';
import {FaDiscourse} from 'react-icons/fa';

export const IconForum = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => <FaDiscourse className={className} fill="#606060" />
);

export const IconForumDark = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => <FaDiscourse className={className} fill="#ffffff" />
);

IconForum.displayName = 'IconForum';
IconForumDark.displayName = 'IconForumDark';
