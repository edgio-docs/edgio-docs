/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {AppProps} from 'next/app';
import '@docsearch/css';
import '../styles/fonts.css';
import '../styles/algolia.css';
import '../styles/index.css';
import '../styles/sandpack.css';
import '@codesandbox/sandpack-react/dist/index.css';

const EmptyAppShell: React.FC = ({children}) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell;
  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }

  console.log('AppShell', AppShell);

  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
