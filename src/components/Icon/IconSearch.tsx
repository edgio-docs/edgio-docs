/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

export const IconSearch = React.memo<JSX.IntrinsicElements['svg']>((props) => (
  <svg
    {...props}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8091 10.8091L15 15" stroke="#606060" strokeLinecap="round" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 12C9.98528 12 12 9.98528 12 7.5C12 5.01472 9.98528 3 7.5 3C5.01472 3 3 5.01472 3 7.5C3 9.98528 5.01472 12 7.5 12Z"
      stroke="#606060"
    />
  </svg>
));

IconSearch.displayName = 'IconSearch';
