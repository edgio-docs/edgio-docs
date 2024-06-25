import Link from 'next/link';
import styled from 'styled-components';

import {
  IconAnalyticsSection,
  IconAnalyticsSectionDark,
} from 'components/Icon/delivery/IconAnalyticsSection';
import {useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

import {StyledFeatureSection} from '../../FeatureSection';
import SectionHeader from '../../SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;

const items = {
  default: [
    {
      title: 'Billing',
      path: '/delivery/control/reports/traffic/billing',
    },
    {
      title: 'CMCD',
      path: '/delivery/control/reports/traffic/cmcd',
    },
    {
      title: 'DNS Overview',
      path: '/delivery/control/reports/traffic/dns_overview',
    },
    {
      title: 'Live Stats',
      path: '/delivery/control/reports/traffic/live_stats',
    },
    {
      title: 'Log Delivery Service',
      path: '/delivery/control/configure/log_delivery_service',
    },
    {
      title: 'Origin Storage',
      path: '/delivery/control/reports/content/origin_storage',
    },
    {
      title: 'Status Codes',
      path: '/delivery/control/reports/content/status_codes',
    },
    {
      title: 'Service Provider Traffic',
      path: '(/delivery/control/reports/traffic/service_provider_traffic',
    },
    {
      title: 'Traffic',
      path: '/delivery/control/reports/traffic/traffic',
    },
  ],
};

export default function Storage() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();
  const {config} = useAppContext();
  const {themedValue} = useTheme();

  const routesByColumns = itemsByColumn(items, version, 'title', 3);

  return (
    <StyledComp>
      <SectionHeader
        Icon={themedValue(IconAnalyticsSection, IconAnalyticsSectionDark)}
        title="Analytics"
        subtitle={`EdgeQuery provides real-time aggregated data for many of the reports in Control and is also accessible via REST API.
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
