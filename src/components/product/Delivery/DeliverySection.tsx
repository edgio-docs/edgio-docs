import Link from 'next/link';
import styled from 'styled-components';

import {
  IconAppsPerformance,
  IconAppsPerformanceDark,
} from 'components/Icon/IconAppsPerformance';
import { useAppContext } from 'contexts/AppContext';
import { useTheme } from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

import { StyledFeatureSection } from '../../FeatureSection';
import SectionHeader from '../../SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;

const items = {
  default: [
    {
      title: 'Acceleration',
      path: '/delivery/delivery/guide/features/#acceleration',
    },
    {
      title: 'Content Acquisition ',
      path: '/delivery/delivery/guide/features/#content-acquisition',
    },
    {
      title: 'Customization',
      path: '/delivery/delivery/guide/features/#customization',
    },
    {
      title: 'Content Protection',
      path: '/delivery/delivery/guide/features/#content-protection',
    },
    {
      title: 'Defensive Protection ',
      path: '/delivery/delivery/guide/features/#defensive-protection',
    },
    {
      title: 'MediaVault',
      path: '/delivery/delivery/mediavault',
    },
    {
      title: 'SmartPurge',
      path: '/delivery/delivery/smartpurge',
    },
  ],
};

export default function DeliverySection() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();
  const {config} = useAppContext();
  const {themedValue} = useTheme();

  const routesByColumns = itemsByColumn(items, version, 'title', 8);

  return (
    <StyledComp>
      <SectionHeader
        Icon={themedValue(IconAppsPerformance, IconAppsPerformanceDark)}
        title="Delivery"
        subtitle={`Deliver to multiple devices with today's most popular protocols, including HTTP progressive download, Chunked Streaming, DASH, HLS, HDS, and MSS.
        `}
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title}) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={toVersionedPath(path)} legacyBehavior>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}
