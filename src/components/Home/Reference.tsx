import Link from 'next/link';
import styled from 'styled-components';

import {CONFIG_FILE, PRODUCT} from '../../../constants';
import {IconStacks} from '../Icon/IconStacks';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

const StyledComp = styled(StyledFeatureSection)``;
const items = {
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
      title: CONFIG_FILE,
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
      title: CONFIG_FILE,
      path: '/guides/basics/edgio_config',
    },
  ],
  '7': [
    {
      title: 'Reference',
      path: '/guides/reference',
    },
  ],
};

export default function Reference() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();

  const routesByColumns = itemsByColumn(items, version, 'title', 6);

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconStacks}
        title="Reference"
        subtitle={`Additional helpful information in regards to getting the most out of ${PRODUCT}.`}
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
