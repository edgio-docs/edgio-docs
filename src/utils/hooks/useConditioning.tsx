import {useRouter} from 'next/router';

const latestVersion = process.env.NEXT_PUBLIC_LATEST_VERSION as string;
interface RouterQuery {
  version?: string | string[];
  [key: string]: any;
}

interface IVersion {
  selectedVersion: string;
  latestVersion: string;
  isLatest: boolean;
  pathPrefix: string;
  toVersionedPath: (path: string) => string;
}

interface IConditioning {
  version: IVersion;
}

function useConditioning(): IConditioning {
  const router = useRouter();
  const {slug} = router.query as RouterQuery;
  const [version] = slug || [];

  // clean version from query
  const cleanedVersion =
    version && typeof version === 'string' && version.match(/^v\d+$/)
      ? version.replace(/v/, '')
      : latestVersion;

  const isLatest = cleanedVersion === latestVersion;
  const versionConfig: IVersion = {
    selectedVersion: cleanedVersion,
    latestVersion,
    isLatest,
    pathPrefix: !isLatest ? `v${cleanedVersion}` : '',
    toVersionedPath: (path: string) => {
      const {route} = router;

      // Most links within the docs refer to just the guide name, e.g. "getting-started"
      // but some used the full path, e.g. "/guides/getting-started". We only want to
      // modify the path if it is linking to a guide. If it is linking to a page outside
      // of the guides (e.g "/docs/api/..."), we don't want to modify the path.
      if (path.startsWith('/') && !path.startsWith('/guides')) {
        return path;
      }

      // if the route already includes guides, don't add it again
      const guidesPrefix = route.includes('guides') ? '' : 'guides';

      return [
        versionConfig.pathPrefix.length
          ? versionConfig.pathPrefix
          : guidesPrefix,
        ...path
          .replace('/guides/', '/')
          .replace(`/${versionConfig.pathPrefix}/`, '/')
          .split('/'),
      ]
        .filter(Boolean)
        .join('/');
    },
  };

  return {version: versionConfig};
}

export default useConditioning;
