import {NextPage} from 'next';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {ContextType, getInitialContextProps} from 'contexts/AppContext';

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

export async function getStaticProps() {
  const initialContextProps = await getInitialContextProps(ContextType.HOME);
  return {
    props: {
      ...initialContextProps,
    },
  };
}
