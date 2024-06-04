import {useEffect} from 'react';

import {NextPage} from 'next';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {
  AppProviderProps,
  ContextType,
  getInitialContextProps,
  useAppContext,
} from 'contexts/AppContext';

import {HomeFeatures, HomeHero} from '../components/MDX/products/Home';

interface HomePageProps extends AppProviderProps {}

export const getStaticProps = async () => {
  const initialContextProps = await getInitialContextProps(ContextType.HOME);

  return {
    props: {
      ...initialContextProps,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({
  initialContextType,
  initialVersion,
}) => {
  const {config, updateContext} = useAppContext();
  const meta = {
    id: 'home',
    title: `${config.PRODUCT} Documentation`,
    permalink: 'index.html',
  };

  useEffect(() => {
    updateContext({
      context: initialContextType,
      version: initialVersion,
    });
  }, [initialContextType, initialVersion, updateContext]);

  return (
    <Page showNav={false}>
      <MarkdownPage meta={{...meta}} isHomepage>
        <HomeHero />
        <HomeFeatures />
      </MarkdownPage>
    </Page>
  );
};

export default HomePage;
