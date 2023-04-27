import {useRouter} from 'next/router';

const latestVersion = process.env.NEXT_PUBLIC_LATEST_VERSION as string;
interface RouterQuery {
  version?: string | string[];
  [key: string]: any;
}

interface IVersion {
  selectedVersion: string;
  selectedVersionText: string;
  latestVersion: string;
  latestVersionText: string;
  isLatest: boolean;
  pathPrefix: string;
  packageVersion: string;
  toVersionedPath: (path: string) => string;
}

interface IConditioning {
  version: IVersion;
}

function useConditioning(): IConditioning {
  const router = useRouter();
  const {slug, version: paramVersion} = router.query as RouterQuery;

  // `slug` is defined from the `src/pages/[...slug].tsx` route, or it could be
  // `version` if coming in from a different route, such as changelog
  let version = slug || paramVersion || [];
  if (Array.isArray(version)) {
    version = version[0];
  }

  // clean version from query
  const cleanedVersion =
    version && typeof version === 'string' && version.match(/^v\d+$/)
      ? version.replace(/v/, '')
      : latestVersion;

  const isLatest = cleanedVersion === latestVersion;
  const versionConfig: IVersion = {
    selectedVersion: cleanedVersion,
    selectedVersionText: `v${cleanedVersion}`,
    latestVersion: latestVersion,
    latestVersionText: `v${latestVersion}`,
    isLatest,
    // doesn't include version in the path for the latest guides
    // pathPrefix: !isLatest ? `v${cleanedVersion}` : '',

    // does include version in the path for the latest guides
    pathPrefix: `v${cleanedVersion}`,

    packageVersion: `^${cleanedVersion}.0.0`,
    toVersionedPath: (path: string) => {
      const {asPath} = router;

      // Most links within the docs refer to just the guide name, e.g. "getting-started"
      // but some used the full path, e.g. "/guides/getting-started". We only want to
      // modify the path if it is linking to a guide. If it is linking to a page outside
      // of the guides (e.g "/docs/api/..."), we don't want to modify the path.
      if (path.startsWith('/') && !path.startsWith('/guides')) {
        return path;
      }

      return [
        '/guides', // forcing all urls to start with /guides
        versionConfig.pathPrefix.length ? versionConfig.pathPrefix : null,
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
