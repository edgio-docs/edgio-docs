import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {IconCode} from '../Icon/IconCode';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

const StyledComp = styled(StyledFeatureSection)``;
const items = {
  '4': [
    {
      title: 'CLI',
      path: '/guides/cli',
    },
    {
      title: 'Devtools',
      path: '/guides/devtools',
    },
    {
      title: 'EdgeJS Unit Testing',
      path: '/guides/edgejs_testing',
    },
    {
      title: 'Logs',
      path: '/guides/logs',
    },
    {
      title: `Deploy to ${PRODUCT} Button`,
      path: '/guides/deploy_to_layer0',
    },
  ],
  default: [
    {
      title: 'CLI',
      path: '/guides/develop/cli',
    },
    {
      title: 'Devtools',
      path: '/guides/performance/observability/devtools',
    },
    {
      title: 'EdgeJS Unit Testing',
      path: '/guides/performance/unit_testing_edgejs',
    },
    {
      title: `Deploy to ${PRODUCT} Button`,
      path: '/guides/develop/deploy_to_edgio',
    },
  ],
};

export default function DeveloperTools() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();

  const routesByColumns = itemsByColumn(items, version, 'title', 5);

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconCode}
        title="Developer Tools"
        subtitle={`Use these tools to interact with ${PRODUCT} and gain insight into how it is accelerating your site.`}
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
