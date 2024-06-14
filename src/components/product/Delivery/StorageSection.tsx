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

import {StyledFeatureSection} from '../../FeatureSection';
import SectionHeader from '../../SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;

const items = {
  default: [
    {
      title: 'APIs',
      path: '/delivery/storage/api_reference',
    },
    {
      title: 'Best Practices',
      path: '/delivery/storage/best_practices',
    },
    {
      title: 'Console',
      path: '/delivery/storage/console',
    },
    {
      title: 'Files and Folders',
      path: '/delivery/storage/console/#viewing',
    },
    {
      title: 'Files',
      path: '/delivery/storage/console/#files',
    },
    {
      title: 'Folders',
      path: '/delivery/storage/console/#folders',
    },
    {
      title: 'Intelligent Ingest',
      path: '/delivery/control/configure/intelligent_ingest',
    },
    {
      title: 'Retrieve/ Share Content',
      path: '(/delivery/storage/quick_start/#retrieve-and-share-content',
    },
    {
      title: 'Upload Content',
      path: '/delivery/storage/quick_start/#upload-content',
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

  const routesByColumns = itemsByColumn(items, version, 'title', 8);

  return (
    <StyledComp>
      <SectionHeader
        Icon={themedValue(IconAppsPerformance, IconAppsPerformanceDark)}
        title="Storage"
        subtitle={`Ingest, replicate, and store data in the locations that provide optimal content delivery performance.
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
