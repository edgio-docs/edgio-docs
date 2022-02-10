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
