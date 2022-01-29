import SidebarMenuItems, { IChildrenRoutes } from '../data/SidebarMenuItems';

export function getChildrenRoutesFromSidebarMenuItems(
  identifier: string
): IChildrenRoutes[] | [] {
  const { routes } = SidebarMenuItems.filter(
    ({ path }) => path.toLowerCase() === identifier.toLowerCase()
  )[0];

  return routes || [];
}
