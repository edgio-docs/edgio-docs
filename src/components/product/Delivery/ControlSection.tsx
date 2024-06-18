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
      title: 'Authentication',
      path: '/delivery/control/manage/authentication',
    },
    {
      title: 'Billing API',
      path: 'https://support.limelight.com/public/openapi/billing/index.html',
    },
    {
      title: 'Caching & Delivery',
      path: '/delivery/control/configure/caching_and_delivery',
    },
    {
      title: 'Chunked Streaming',
      path: '/delivery/control/configure/chunked_streaming',
    },
    {
      title: 'Configuration API',
      path: 'https://support.limelight.com/public/openapi/configuration/index.html',
    },
    {
      title: 'Content Purge',
      path: '/delivery/control/manage/content_with_smartpurge',
    },
    {
      title: 'DNS Services',
      path: '/delivery/control/configure/dns_services',
    },
    {
      title: 'Hash Generator',
      path: '(/delivery/control/configure/mediavault_hash_generator',
    },
    {
      title: 'Realtime Reporting',
      path: 'https://support.limelight.com/public/openapi/realtimereporting/index.html',
    },
    {
      title: 'SSL Certificates',
      path: '/delivery/control/configure/ssl_certificates',
    },
    {
      title: 'Users - Control',
      path: '/delivery/control/manage/control_portal_users',
    },
    {
      title: 'Users - Storage',
      path: '/delivery/control/manage/origin_storage_users',
    },
  ],
};

export default function Control() {
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
        title="Control"
        subtitle={`Create and configure services, manage content, and analyze usage.
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
