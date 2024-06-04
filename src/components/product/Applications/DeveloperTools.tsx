import Link from 'next/link';
import styled from 'styled-components';

import {useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';
import {StringMap} from 'utils/Types';

import {StyledFeatureSection} from '../../FeatureSection';
import {
  IconAppsDevelopers,
  IconAppsDevelopersDark,
} from '../../Icon/IconAppsDevelopers';
import SectionHeader from '../../SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;
const items = (config: StringMap) => ({
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
      title: `Deploy to ${config.PRODUCT} Button`,
      path: '/guides/deploy_to_layer0',
    },
  ],
  '6': [
    {
      title: 'CLI',
      path: '/guides/develop/cli',
    },
    {
      title: 'Edgio Developer Tools Chrome Extension',
      path: 'performance/observability/developer_tools_chrome_extension',
    },
    {
      title: 'EdgeJS Unit Testing',
      path: '/guides/performance/unit_testing_edgejs',
    },
  ],
  default: [
    {
      title: 'CLI',
      path: '/applications/performance/cdn_as_code/cli',
    },
    {
      title: 'Edgio Developer Tools Chrome Extension',
      path: '/applications/performance/observability/developer_tools_chrome_extension',
    },
    {
      title: 'EdgeJS Unit Testing',
      path: '/applications/performance/unit_testing_edgejs',
    },
  ],
});

export default function DeveloperTools() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();
  const {config} = useAppContext();
  const {themedValue} = useTheme();

  const routesByColumns = itemsByColumn(items(config), version, 'title', 5);

  return (
    <StyledComp>
      <SectionHeader
        Icon={themedValue(IconAppsDevelopers, IconAppsDevelopersDark)}
        title="Developer Tools"
        subtitle={`Use these tools to interact with ${config.PRODUCT} and gain insight into how it is accelerating your site.`}
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
