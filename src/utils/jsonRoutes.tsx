import sortBy from 'lodash/sortBy';

import {RouteItem} from 'components/Layout/useRouteMeta';
import SidebarMenuItems from 'data/SidebarMenuItems';

const routes = SidebarMenuItems[0]
  .map((item) =>
    item.sortRoutes
      ? sortBy(item.routes, (item) => item.title.toLowerCase())
      : item.routes
  )
  .flat();

const JSONRoutes = {
  routes,
} as RouteItem;

export default JSONRoutes;
