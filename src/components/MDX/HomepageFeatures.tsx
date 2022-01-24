import styled from 'styled-components';
import GetStarted from '../Home/GetStarted';
import SectionHeader from '../Home/SectionHeader';
import {IconSpark} from '../Icon/IconSpark';
import Cdn from '../Home/Cdn';
import Reference from '../Home/Reference';
import DeveloperTools from '../Home/DeveloperTools';
import AccountsandTeams from '../Home/AccountsandTeams';

const StyledHomepageFeatures = styled.div`
  max-width: 1175px;
  margin: 0 auto;
  display: grid;
  row-gap: 100px;
  grid-template-columns: repeat(6, 1fr);
  padding: 0 20px;

  > * {
    grid-column: 1/-1;
  }

  > :nth-child(3) {
    grid-column: 1/4;

    .section-header__content {
      max-width: 100%;
    }
  }

  > :nth-child(4) {
    grid-column: 4/-1;

    .section-header__content {
      max-width: 100%;
    }
  }
`;

export default function HomepageFeatures() {
  return (
    <StyledHomepageFeatures>
      <GetStarted>
        <SectionHeader Icon={IconSpark} title="Get Started" />
      </GetStarted>

      <Cdn />
      <DeveloperTools />
      <AccountsandTeams />
      <Reference />
    </StyledHomepageFeatures>
  );
}
