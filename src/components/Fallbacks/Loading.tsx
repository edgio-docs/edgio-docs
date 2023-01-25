import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';

function LoadingFallBackPage() {
  return (
    <Page routeTree={JSONRoutes}>
      <></>
    </Page>
  );
}

export default LoadingFallBackPage;
