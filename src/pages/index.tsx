import {NextPage} from 'next';

import HomeFeatures from '../components/MDX/Home/Features';
import HomeHero from '../components/MDX/Home/Hero';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {ContextType, useAppContext} from 'contexts/AppContext';
import {useEffect} from 'react';

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
  const {config, updateContext} = useAppContext();
  const meta = {
    id: 'home',
    title: `${config.PRODUCT} Documentation`,
    permalink: 'index.html',
  };

  useEffect(() => {
    updateContext({
      context: ContextType.HOME,
      config,
      navMenuItems: null,
      version: null,
    });
  }, [updateContext, config]);

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
