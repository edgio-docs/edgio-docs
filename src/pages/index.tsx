import {NextPage} from 'next';

import HomepageFeatures from '../components/MDX/HomepageFeatures';
import HomepageHero from '../components/MDX/HomepageHero';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {getVersionedConfig} from 'utils/config';
import useConditioning from 'utils/hooks/useConditioning';
import JSONRoutes from 'utils/jsonRoutes';

const HomePage: NextPage = () => {
  const {version} = useConditioning();
  const config = getVersionedConfig(version.selectedVersion);
  const meta = {
    id: 'home',
    title: `${config.PRODUCT} Documentation`,
    permalink: 'index.html',
  };
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={{...meta, version: version.selectedVersion}}>
        <HomepageHero />
        <HomepageFeatures />
      </MarkdownPage>
    </Page>
  );
};

export default HomePage;
