import {NextPage} from 'next';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';

const Custom404: NextPage = () => {
  const meta = {
    title: 'Page Not Found',
  };
  return (
    <Page>
      <MarkdownPage meta={{...meta}}>
        <p>This page does not exist.</p>
      </MarkdownPage>
    </Page>
  );
};

export default Custom404;
