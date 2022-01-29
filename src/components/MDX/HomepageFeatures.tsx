import styled from 'styled-components';
import Container from '../Layout/Container';
import GetStarted from '../Home/GetStarted';
import SectionHeader from '../Home/SectionHeader';
import { IconSpark } from '../Icon/IconSpark';
import Cdn from '../Home/Cdn';
import Reference from '../Home/Reference';
import DeveloperTools from '../Home/DeveloperTools';
import AccountsandTeams from '../Home/AccountsandTeams';
import FrameworkGuides from '../Home/FrameworkGuides';
import VideosandTutorials from '../Home/VideosandTutorials';

const StyledHomepageFeatures = styled.div`
  .section-container {
    > * {
      padding: 50px 0;

      :not(:last-child) {
        box-shadow: inset 0px -1px #e3e8ee;
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
  }
`;

export default function HomepageFeatures() {
  return (
    <StyledHomepageFeatures>
      <Container>
        <GetStarted>
          <SectionHeader Icon={IconSpark} title="Get Started" />
        </GetStarted>

        <Cdn />
        <div className="grouped-col__2">
          <DeveloperTools />
          <AccountsandTeams />
        </div>
        <FrameworkGuides />
        <Reference />
        <VideosandTutorials />
      </Container>
    </StyledHomepageFeatures>
  );
}
