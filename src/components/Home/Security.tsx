import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT, PRODUCT_SECURITY} from '../../../constants';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

const StyledComp = styled(StyledFeatureSection)``;
const items = {
  '4': [
    {
      title: 'Security Suite',
      path: '/guides/security',
    },
    {
      title: 'Managed Rule Groups',
      path: '/guides/managed_rule_groups',
    },
  ],
  '5,6': [
    {
      title: 'Security Suite',
      path: '/guides/security/security_suite',
    },
    {
      title: 'Managed Rule Groups',
      path: '/guides/security/managed_rule_groups',
    },
  ],

  default: [
    {
      title: 'Website Security (EdgeJS)',
      path: '/guides/security/edgejs_security',
      separator: true,
    },
    {
      title: 'Web Application Firewall (WAF)',
      path: '/guides/security/waf',
    },
    {
      title: 'Access Rules',
      path: '/guides/security/access_rules',
    },
    {
      title: 'Rate Rules',
      path: '/guides/security/rate_rules',
    },
    {
      title: 'Bot Rules',
      path: '/guides/security/bot_rules',
    },
    {
      title: 'Custom Rules',
      path: '/guides/security/custom_rules',
    },
    {
      title: 'Managed Rules',
      path: '/guides/security/managed_rules',
    },
    {
      title: 'Security Applications',
      path: '/guides/security/security_applications',
    },
    {
      title: 'Dashboard',
      path: '/guides/security/dashboard',
    },
    {
      title: 'Logs',
      path: '/guides/security/recent_event_logs',
    },
    {
      title: 'Response to Client',
      path: '/guides/security/response_to_client',
      separator: true,
    },
    {
      title: 'Country Codes',
      path: '/reference/country_codes',
    },
    {
      title: 'Matched On Variables',
      path: '/guides/security/matched_on_variables',
    },
  ],
};

export default function Security() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();

  const routesByColumns = [...itemsByColumn(items, version, 'title', 8), []];

  return (
    <StyledComp>
      <SectionHeader
        Icon="shield-dark"
        title="Security"
        subtitle={`Protect your web applications without sacrificing performance through ${PRODUCT} ${PRODUCT_SECURITY}.`}
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title}) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={toVersionedPath(path)}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}
