import {NextPage} from 'next';
import Head from 'next/head';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';

const Custom404: NextPage = () => {
  const meta = {
    title: 'Page Not Found',
  };
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={{...meta}}>
        <p>This page does not exist.</p>
      </MarkdownPage>
    </Page>
  );
};

export default Custom404;
