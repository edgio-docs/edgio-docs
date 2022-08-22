import {flatMap, flatten} from 'lodash';

import SidebarMenuItems, {IRoute} from '../data/SidebarMenuItems';

const flatItems: IRoute[] = flatMap(
  flatten(SidebarMenuItems),
  (item) => item.routes || []
);

export function findChildByGuideName(identifier: string): IRoute | undefined {
  return flatItems.find(
    (item) => item.path?.toLowerCase() === `/guides/${identifier}`.toLowerCase()
  );
}

export function getChildrenRoutesFromSidebarMenuItems(
  identifier: string
): IRoute[] | [] {
  const {routes} = SidebarMenuItems[0].filter(
    ({path}) => path.toLowerCase() === identifier.toLowerCase()
  )[0];

  return routes || [];
}
