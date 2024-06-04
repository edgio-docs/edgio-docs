import styled from 'styled-components';

import Security from 'components/product/Applications/Security';
import SectionHeader from 'components/SectionHeader';
import {useTheme} from 'contexts/ThemeContext';

import {
  IconAppsGetStarted,
  IconAppsGetStartedDark,
} from '../../../Icon/IconAppsGetStarted';
import Container from '../../../Layout/Container';
import AccountsandTeams from '../../../product/Applications/AccountsandTeams';
import Cdn from '../../../product/Applications/Cdn';
import DeveloperTools from '../../../product/Applications/DeveloperTools';
import FrameworkGuides from '../../../product/Applications/FrameworkGuides';
import GetStarted from '../../../product/Applications/GetStarted';
import Reference from '../../../product/Applications/Reference';

const StyledFeatures = styled.div`
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

export function ApplicationsFeatures() {
  const {themedValue} = useTheme();
  return (
    <StyledFeatures>
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
    </StyledFeatures>
  );
}
