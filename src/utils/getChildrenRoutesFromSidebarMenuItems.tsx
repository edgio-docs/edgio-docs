import SidebarMenuItems, {IRoute} from '../data/SidebarMenuItems';

export function getChildrenRoutesFromSidebarMenuItems(
  identifier: string
): IRoute[] | [] {
  const {routes} = SidebarMenuItems[0].filter(
    ({path}) => path.toLowerCase() === identifier.toLowerCase()
  )[0];

  return routes || [];
}
