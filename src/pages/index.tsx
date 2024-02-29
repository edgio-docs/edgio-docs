import {NextPage} from 'next';

import HomepageFeatures from '../components/MDX/HomepageFeatures';
import HomepageHero from '../components/MDX/HomepageHero';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {useAppContext} from 'contexts/AppContext';

interface HomePageProps {
  config: any;
  version: string;
}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const HomePage: NextPage<HomePageProps> = ({}) => {
  const {config} = useAppContext();
  const meta = {
    id: 'home',
    title: `${config.PRODUCT} Documentation`,
    permalink: 'index.html',
  };

  return (
    <Page showNav={false}>
      <MarkdownPage meta={{...meta}}>
        <HomepageHero />
        <HomepageFeatures />
      </MarkdownPage>
    </Page>
  );
};

export default HomePage;
