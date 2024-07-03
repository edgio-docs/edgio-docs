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
  .sections-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .section {
    display: flex;
    flex-direction: column;
    padding: 0 0 30px 0;

    &:not(:last-child) {
      box-shadow: inset 0px -1px var(--hr-secondary);
    }
  }

  .grouped-col__2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    justify-content: space-between;
    width: 100%;

    > div {
      box-shadow: inset 0px -1px var(--hr-secondary);
      padding: 0 0 30px 0;
    }

    .route-items {
      /* the grouped columns only have 1 column */
      grid-template-columns: repeat(1, 1fr);
    }

    @media (max-width: 1086px) {
      grid-template-columns: 1fr;

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
        <div className="sections-container">
          <div className="section">
            <GetStarted>
              <SectionHeader
                Icon={themedValue(IconAppsGetStarted, IconAppsGetStartedDark)}
                title="Get Started with Applications"
              />
            </GetStarted>
          </div>

          <div className="section">
            <Cdn />
          </div>

          <div className="section">
            <Security />
          </div>

          <div className="grouped-col__2">
            <div>
              <DeveloperTools />
            </div>
            <div>
              <AccountsandTeams />
            </div>
          </div>

          <div className="section">
            <FrameworkGuides />
          </div>

          <div className="section">
            <Reference />
          </div>
          {/* <div className="section">
            <VideosandTutorials />
          </div> */}
        </div>
      </Container>
    </StyledHomepageFeatures>
  );
}
