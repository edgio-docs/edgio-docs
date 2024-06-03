import styled from 'styled-components';

import Security from 'components/Home/Security';
import {useTheme} from 'contexts/ThemeContext';

import AccountsandTeams from '../../Home/AccountsandTeams';
import Cdn from '../../Home/Cdn';
import DeveloperTools from '../../Home/DeveloperTools';
import FrameworkGuides from '../../Home/FrameworkGuides';
import GetStarted from '../../Home/GetStarted';
import Reference from '../../Home/Reference';
import SectionHeader from '../../Home/SectionHeader';
import {
  IconAppsGetStarted,
  IconAppsGetStartedDark,
} from '../../Icon/IconAppsGetStarted';
import Container from '../../Layout/Container';

const StyledHomepageFeatures = styled.div`
  // padding-bottom: 500px;

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
`;

export default function ApplicationsFeatures() {
  const {themedValue} = useTheme();
  return (
    <StyledHomepageFeatures>
      <Container>
        <GetStarted>
          <SectionHeader
            Icon={themedValue(IconAppsGetStarted, IconAppsGetStartedDark)}
            title="Get Started with Applications"
          />
        </GetStarted>

        <Cdn />
        <Security />
        <div className="grouped-col__2">
          <DeveloperTools />
          <AccountsandTeams />
        </div>
        <FrameworkGuides />
        <Reference />
        {/* <VideosandTutorials /> */}
      </Container>
    </StyledHomepageFeatures>
  );
}
