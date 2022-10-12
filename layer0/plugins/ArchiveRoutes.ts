import PluginBase from '@layer0/core/plugins/PluginBase';
import {Router} from '@layer0/core/router';
import Request from '@layer0/core/router/Request';
import RouteGroup from '@layer0/core/router/RouteGroup';
import JSZip from 'jszip';

/**
 * Callback function (async) used for gathering content of the files you wish to archive.
 * For example, you can use this to fetch external data.
 */
interface ICallback {
  (req: Request): Promise<IZipItem | IZipItem[]>;
}
interface IZipRoute {
  /** Route criteria; see #Router.match for example */
  route: string;
  callback: ICallback;
}

interface IZipItem {
  /** Path of the file within the archive, eg. /foo.txt or /foo/bar.txt */
  path: string;

  /** File content to be written */
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

          let result = await callback(req);
          if (!Array.isArray(result)) {
            result = [result];
          }

          result.forEach(({path, data}) => {
            zip.file(this.cleanPath(path), data);
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

  addRoute(route: string, callback: ICallback) {
    this.routes.push({route, callback});
    return this;
  }

  private addRoutesToGroup(group: RouteGroup) {
    this.routes.forEach((route) => {
      group.match(route.route, this.handler(route.callback));
    });
  }

  private cleanPath(path: string) {
    return path.replace(/^\/+/, '');
  }
}

export const archiveRoutes = new ArchiveRoutes();
export default ArchiveRoutes;
