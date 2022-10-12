import PluginBase from '@layer0/core/plugins/PluginBase';
import {Router} from '@layer0/core/router';
import Request from '@layer0/core/router/Request';
import RouteGroup from '@layer0/core/router/RouteGroup';
import JSZip from 'jszip';

interface ICallback {
  (req: Request): Promise<IZipItem[]>;
}
interface IZipRoute {
  route: string;
  callback: ICallback;
}

interface IZipItem {
  path: string;
  data: string | ArrayBuffer | Uint8Array | Buffer;
}
class ArchiveRoutes extends PluginBase {
  private groupName = 'zip_routes_group';
  private routes: IZipRoute[] = [];
  private router?: Router;
  private handler;
  public DEFAULT_CACHE_CONFIG = {
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 0,
    },
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365,
      staleWhileRevalidateSeconds: 60 * 60,
    },
  };

  constructor(routes?: IZipRoute[]) {
    super();

    this.routes = routes || [];

    this.handler =
      (callback: ICallback) =>
      ({compute, cache}) => {
        cache(this.DEFAULT_CACHE_CONFIG);
        compute(async (req, res) => {
          const zip = new JSZip();

          const result = await callback(req);
          result.forEach(({path, data}) => {
            zip.file(path, data);
          });

          const data = await zip
            .generateInternalStream({
              type: 'arraybuffer',
            })
            .accumulate();

          res.body = Buffer.from(data);
        });
      };
  }

  onRegister(router: Router) {
    this.router = router;
    this.router.group(this.groupName, (group) => this.addRoutesToGroup(group));
  }

  addRoute(route, callback: ICallback) {
    this.routes.push({route, callback});
    return this;
  }

  private addRoutesToGroup(group: RouteGroup) {
    this.routes.forEach((route) => {
      group.match(route.route, this.handler(route.callback));
    });
  }
}

export const archiveRoutes = new ArchiveRoutes();
export default ArchiveRoutes;
