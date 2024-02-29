import {NextPage} from 'next';

import HomeFeatures from '../components/MDX/Home/Features';
import HomeHero from '../components/MDX/Home/Hero';

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
        <HomeHero />
        <HomeFeatures />
      </MarkdownPage>
    </Page>
  );
};

export default HomePage;
