import {NextPage} from 'next';

import HomepageFeatures from '../components/MDX/HomepageFeatures';
import HomepageHero from '../components/MDX/HomepageHero';
import v7Config from '../config/v7.config';
import v7Nav from '../config/v7.nav';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {AppProvider} from 'contexts/AppContext';
import {ThemeProvider} from 'contexts/ThemeContext';
import {serializeConfig} from 'utils/config';
import {getBaseConfig} from 'utils/config';

const config = Object.assign({}, getBaseConfig());

interface HomePageProps {
  config: any;
  version: string;
}

export const getStaticProps = async () => {
  return {
    props: {
      config: serializeConfig(config),
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({config}) => {
  const meta = {
    id: 'home',
    title: `${config.PRODUCT} Documentation`,
    permalink: 'index.html',
  };

  return (
    <AppProvider config={config}>
      <Page showNav={false}>
        <MarkdownPage meta={{...meta}}>
          <HomepageHero />
          <HomepageFeatures />
        </MarkdownPage>
      </Page>
    </AppProvider>
  );
};

export default HomePage;
