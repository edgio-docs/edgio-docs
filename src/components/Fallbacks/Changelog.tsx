import {useEffect} from 'react';
import styled from 'styled-components';

import Docs from 'components/Docs';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';

const StyledChangelogFallbackContent = styled.div`
  display: contents;

  .mt-3 {
    margin-top: 1.5rem;
  }

  .animate-pulse {
    -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }

  .bg-black-50 {
    background: #00000050;
  }

  .px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

function ChangeLogFallBackPage() {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <Page routeTree={JSONRoutes}>
      <Docs title="Changelog" tocHeadings={[]}>
        <StyledChangelogFallbackContent>
          <h3 className="animate-pulse bg-black-50 px-10">&nbsp;</h3>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h3 className="mt-3 animate-pulse bg-black-50 px-10">&nbsp;</h3>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h3 className="mt-3 animate-pulse bg-black-50 px-10">&nbsp;</h3>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
          <h5 className="animate-pulse bg-black-50 px-10">&nbsp;</h5>
        </StyledChangelogFallbackContent>
      </Docs>
    </Page>
  );
}

export default ChangeLogFallBackPage;
