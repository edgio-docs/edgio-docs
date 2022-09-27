import SidebarMenuItems, {IRoute} from '../data/SidebarMenuItems';

const flatItems: IRoute[] = SidebarMenuItems.flatMap((item) =>
  item.flatMap((item) => item.routes?.flat() ?? [])
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

export function getItemByRoute(route: string): IRoute | undefined {
  return flatItems.find(
    (item) => item.path?.toLowerCase() === route.toLowerCase()
  );
}
