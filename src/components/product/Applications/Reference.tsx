import Link from 'next/link';
import styled from 'styled-components';

import {useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';
import {StringMap} from 'utils/Types';

import {StyledFeatureSection} from '../../FeatureSection';
import {
  IconAppsReference,
  IconAppsReferenceDark,
} from '../../Icon/IconAppsReference';
import SectionHeader from '../../SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;
const items = (config: StringMap) => ({
  '4': [
    {
      title: 'Limits & Caveats',
      path: '/guides/limits',
    },
    {
      title: 'v4 Migration Guide',
      path: '/guides/layer0_migration',
    },
    {
      title: config.CONFIG_FILE,
      path: '/guides/layer0_config',
    },
  ],
  '5,6': [
    {
      title: 'v6 Migration Guide',
      path: '/guides/upgrading/v6_migration',
    },
    {
      title: 'v5 Migration Guide',
      path: '/guides/upgrading/v5_migration',
    },
    {
      title: 'v4 Migration Guide',
      path: '/guides/upgrading/layer0_migration',
    },
    {
      title: config.CONFIG_FILE,
      path: '/guides/basics/edgio_config',
    },
  ],
  '7': [
    {
      title: 'Reference',
      path: '/guides/reference',
    },
  ],
});

export default function Reference() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();
  const {config} = useAppContext();
  const {themedValue} = useTheme();

  const routesByColumns = itemsByColumn(items(config), version, 'title', 6);

  return (
    <StyledComp>
      <SectionHeader
        Icon={themedValue(IconAppsReference, IconAppsReferenceDark)}
        title="Reference"
        subtitle={`Additional helpful information in regards to getting the most out of ${config.PRODUCT}.`}
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
