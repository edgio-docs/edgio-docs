import SidebarMenuItems, {IRoute} from '../data/SidebarMenuItems';

const flatItems: IRoute[] = SidebarMenuItems.flatMap((item) =>
  item.flatMap((item) => item.routes?.flat() ?? [])
);

export function findChildByGuideName(identifier: string): IRoute | undefined {
  return findGuideBy(identifier, 'name');
}

export function findChildByRoute(route: string): IRoute | undefined {
  return findGuideBy(route, 'route');
}

export function findGuideBy(identifier: string, as?: 'name' | 'route') {
  return flatItems.find(
    (item) =>
      item.path?.toLowerCase() ===
      ((as === 'name' ? '/guides/' : '') + identifier).toLowerCase()
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
