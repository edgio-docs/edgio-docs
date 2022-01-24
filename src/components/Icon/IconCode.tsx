
/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import cn from 'classnames';

export const IconCode = React.memo<JSX.IntrinsicElements['svg']>(
	function IconCode({ className }) {
		return (
			<svg className={cn('inline', className)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
				<circle cx="16" cy="16" r="16" fill="#EEEEEE" />
				<rect width="32" height="32" rx="3" fill="#EEEEEE" />
				<path d="M12.01 22.02L6 16.01L12.01 10L13.425 11.414L8.825 16.014L13.425 20.614L12.011 22.02H12.01ZM19.989 22.02L18.576 20.607L23.176 16.007L18.576 11.407L19.99 10L26 16.01L19.99 22.02H19.989Z" fill="#606060" />
			</svg>
		)
	}
);

IconCode.displayName = 'IconCode';



