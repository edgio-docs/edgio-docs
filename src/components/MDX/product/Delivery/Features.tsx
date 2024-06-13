import styled from 'styled-components';

import {IconDelivery} from 'components/Icon/IconDelivery';
import {useTheme} from 'contexts/ThemeContext';

import Container from '../../../Layout/Container';
import Cdn from '../../../product/Delivery/Cdn';
import GetStarted from '../../../product/Delivery/GetStarted';
import SectionHeader from '../../../SectionHeader';

// Icons

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

  @media (max-width: 630px) {
    padding-bottom: 850px;
  }
`;

export function DeliveryFeatures() {
  const {themedValue} = useTheme();
  return (
    <StyledFeatures>
      <Container>
        <GetStarted>
          <SectionHeader
            Icon={themedValue(IconDelivery, IconDelivery)}
            title="Get Started with Delivery"
          />
        </GetStarted>

        <Cdn />
      </Container>
    </StyledFeatures>
  );
}
