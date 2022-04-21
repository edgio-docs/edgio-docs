import {map, flatMap, flatten} from 'lodash';

import navData from './src/data/SidebarMenuItems';

export default async function prerenderRequests() {
  return [
    {path: '/'},
    ...map(
      flatMap(flatten(navData), (item) => item.routes),
      (item) => {
        if (item && item.path.startsWith('/')) {
          return {path: item.path};
        }
      }
    )
      .sort()
      .filter(Boolean),
  ];
}
