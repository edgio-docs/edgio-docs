import {NextPage} from 'next';

import HomepageFeatures from '../components/MDX/HomepageFeatures';
import HomepageHero from '../components/MDX/HomepageHero';
import v7Config from '../config/v7.config';
import v7Nav from '../config/v7.nav';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {AppProvider} from 'contexts/AppContext';
import {serializeConfig} from 'utils/config';
import {getBaseConfig} from 'utils/config';
import {Route} from 'utils/Types';

// The home page will be specific to v7, so we can hardcode the version here
const version = '7';
const config = Object.assign({}, getBaseConfig(), v7Config);

interface HomePageProps {
  config: any;
  v7Nav: Route;
  version: string;
}

export const getStaticProps = async () => {
  return {
    props: {
      config: serializeConfig(config),
      v7Nav,
      version,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({config, v7Nav, version}) => {
  const meta = {
    id: 'home',
    title: `${config.PRODUCT} Documentation`,
    permalink: 'index.html',
  };

  return (
    <AppProvider config={config} navMenuItems={v7Nav} version={version}>
      <Page>
        <MarkdownPage meta={{...meta, version}}>
          <HomepageHero />
          <HomepageFeatures />
        </MarkdownPage>
      </Page>
    </AppProvider>
  );
};

export default HomePage;
