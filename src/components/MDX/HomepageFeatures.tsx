import {BiBook} from 'react-icons/bi';
import styled from 'styled-components';

import AccountsandTeams from '../Home/AccountsandTeams';
import Cdn from '../Home/Cdn';
import DeveloperTools from '../Home/DeveloperTools';
import FrameworkGuides from '../Home/FrameworkGuides';
import GetStarted from '../Home/GetStarted';
import Reference from '../Home/Reference';
import SectionHeader from '../Home/SectionHeader';
import VideosandTutorials from '../Home/VideosandTutorials';
import {IconSpark} from '../Icon/IconSpark';
import Container from '../Layout/Container';

import DocsResources from 'components/Home/DocsResources';
import Security from 'components/Home/Security';

const StyledHomepageFeatures = styled.div`
  padding-bottom: 500px;

  .section-container {
    > * {
      padding: 30px 0;

      :not(:last-child) {
        box-shadow: inset 0px -1px var(--hr-secondary);
      }
    }
  }

  .grouped-col__2 {
    display: grid;
    --size: 40%;
    grid-template-columns: repeat(2, var(--size));
    justify-content: space-between;

    .section-header__content {
      max-width: 100%;
    }

    @media (max-width: 1086px) {
      grid-template-columns: 1fr;
      padding: 0;

      > div {
        box-shadow: inset 0px -1px var(--hr-secondary);
        padding: 50px 0;
      }
    }
  }

  @media (max-width: 630px) {
    padding-bottom: 850px;
  }
`;

export default function HomepageFeatures() {
  return (
    <StyledHomepageFeatures>
      <Container>
        <GetStarted>
          <SectionHeader Icon={IconSpark} title="Get Started" />
        </GetStarted>

        <DocsResources>
          <SectionHeader
            Icon={BiBook}
            title="Additional Documentation"
            subtitle="As we continue to integrate all our businesses into a unified development environment please find additional product documentation below."
          />
        </DocsResources>

        <Cdn />
        <div className="grouped-col__2">
          <DeveloperTools />
          <AccountsandTeams />
        </div>
        <FrameworkGuides />
        <Security />
        <Reference />
        {/* <VideosandTutorials /> */}
      </Container>
    </StyledHomepageFeatures>
  );
}
