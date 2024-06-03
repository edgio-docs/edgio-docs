import Link from 'next/link';
import styled from 'styled-components';

import {
  IconAppsPerformance,
  IconAppsPerformanceDark,
} from 'components/Icon/IconAppsPerformance';
import {useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;

const items = {
  '4': [
    {
      title: 'Routing with EdgeJS',
      path: '/guides/routing',
    },
    {
      title: 'Common Routing Patterns',
      path: '/guides/cookbook',
    },
    {
      title: 'Custom Domains & SSL',
      path: '/guides/production',
    },
    {
      title: 'Caching',
      path: '/guides/caching',
    },
    {
      title: 'Purging',
      path: '/guides/purging',
    },
    {
      title: 'Static Prerendering',
      path: '/guides/static_prerendering',
    },
    {
      title: 'Predictive Prefetch',
      path: '/guides/prefetching',
    },
    {
      title: 'Traditional Sites',
      path: '/guides/traditional_sites',
    },
    {
      title: 'Split Testing',
      path: '/guides/split_testing',
    },
    {
      title: 'Traffic Splitting',
      path: '/guides/traffic_splitting',
    },
    {
      title: 'Observability',
      path: '/guides/core_web_vitals',
    },
    {
      title: 'Performance',
      path: '/guides/performance',
    },
    {
      title: 'Serverless Compute',
      path: '/guides/serverless_functions',
    },
    {
      title: 'Third-Party CDNs',
      path: '/guides/third_party_cdns',
    },
    {
      title: 'Image Optimization',
      path: '/guides/image_optimization',
    },
    {
      title: 'Compression',
      path: '/guides/compression',
    },
    {
      title: 'Request',
      path: '/guides/request_headers',
    },
    {
      title: 'Response Headers',
      path: '/guides/response_headers',
    },
    {
      title: 'Status Codes',
      path: '/guides/status_codes',
    },
    {
      title: 'Cookies',
      path: '/guides/cookies',
    },
    {
      title: 'Regions',
      path: '/guides/regions',
    },
    {
      title: 'Troubleshooting',
      path: '/guides/troubleshooting',
    },
  ],
  '7': [
    {
      title: 'Getting Started',
      path: '/guides/performance/getting_started',
    },
    {
      title: 'Rules',
      path: '/guides/performance/rules',
    },
    {
      title: 'CDN-as-Code (EdgeJS)',
      path: '/guides/performance/cdn_as_code',
    },
    {
      title: 'Caching',
      path: '/guides/performance/caching',
    },
    {
      title: 'Purging',
      path: '/guides/performance/caching/purging',
    },
    {
      title: 'Predictive Prefetch',
      path: '/guides/performance/prefetching',
    },
    {
      title: 'Traffic Splitting',
      path: '/guides/performance/traffic_splitting',
    },
    {
      title: 'Observability',
      path: '/guides/performance/observability',
    },
    {
      title: 'Serverless Compute',
      path: '/guides/performance/serverless_compute',
    },
    {
      title: 'EdgeJS Unit Testing',
      path: '/guides/performance/unit_testing_edgejs',
    },
    {
      title: 'Image Optimization',
      path: '/guides/performance/image_optimization',
    },
    {
      title: 'Traditional Sites',
      path: '/guides/performance/traditional_sites',
    },
    {
      title: 'Compression',
      path: '/guides/performance/compression',
    },
    {
      title: 'Request',
      path: '/guides/performance/request',
    },
    {
      title: 'Response',
      path: '/guides/performance/response',
    },
    {
      title: 'Troubleshooting',
      path: '/guides/performance/troubleshooting',
    },
    {
      title: 'Limits',
      path: '/guides/performance/limits',
    },
  ],
  default: [
    {
      title: 'Routing with EdgeJS',
      path: '/guides/performance/cdn_as_code',
    },
    {
      title: 'Common Routing Patterns',
      path: '/guides/performance/cdn_as_code/common_routing_patterns',
    },
    {
      title: 'Custom Domains & SSL',
      path: '/guides/basics/domains',
    },
    {
      title: 'Caching',
      path: '/guides/performance/caching',
    },
    {
      title: 'Purging',
      path: '/guides/performance/purging',
    },
    {
      title: 'Static Prerendering',
      path: '/guides/performance/static_prerendering',
    },
    {
      title: 'Predictive Prefetch',
      path: '/guides/performance/prefetching',
    },
    {
      title: 'Traditional Sites',
      path: '/guides/performance/traditional_sites',
    },
    {
      title: 'Observability',
      path: '/guides/performance/observability',
    },
    {
      title: 'Performance',
      path: '/guides/performance',
    },
    {
      title: 'Serverless Compute',
      path: '/guides/performance/serverless_compute',
    },
    {
      title: 'Third-Party CDNs',
      path: '/guides/performance/third_party_cdns',
    },
    {
      title: 'Image Optimization',
      path: '/guides/performance/image_optimization',
    },
    {
      title: 'Compression',
      path: '/guides/performance/compression',
    },
    {
      title: 'Request',
      path: '/guides/performance/request',
    },
    {
      title: 'Response Headers',
      path: '/guides/performance/response',
    },
    {
      title: 'Status Codes',
      path: '/guides/performance/response#status-codes',
    },
    {
      title: 'Troubleshooting',
      path: '/guides/performance/troubleshooting',
    },
  ],
};

export default function Cdn() {
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
        title="Performance"
        subtitle={`Accelerate your web application through ${config.PRODUCT} ${config.PRODUCT_EDGE}.`}
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
