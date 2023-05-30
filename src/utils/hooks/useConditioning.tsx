import {useRouter} from 'next/router';

const latestVersion = process.env.NEXT_PUBLIC_LATEST_VERSION as string;
interface RouterQuery {
  version?: string | string[];
  [key: string]: any;
}

export interface IConditioning {
  version: IVersion;
}

export interface IVersion {
  selectedVersion: string;
  selectedVersionText: string;
  latestVersion: string;
  latestVersionText: string;
  isLatest: boolean;
  pathPrefix: string;
  packageVersion: string;
  toVersionedPath: (path: string) => string;
  isVersion: (version: string | number) => boolean;
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
    toVersionedPath: (path: string): string => {
      const versionedPaths: Array<[RegExp, () => string]> = [
        // matches anything starting with http, https, mailto, or tel, and returns the path as-is
        [/^(https?:\/\/|mailto:|tel:)/, () => path],
        [
          // matches anything starting with /docs
          /^\/docs/,
          () =>
            [
              '/docs', // forcing all urls to start with /docs
              `${versionConfig.pathPrefix}.x`,
              ...path
                .replace('/docs/', '/')
                .replace(`/${versionConfig.pathPrefix}/`, '/')
                .split('/'),
            ]
              .filter(Boolean)
              .join('/'),
        ],
        [
          // matches anything starting with /guides or a guide name w/o the preceding /
          /^(\/guides|\w+)/,
          () =>
            [
              '/guides', // forcing all urls to start with /guides
              versionConfig.pathPrefix,
              ...path
                .replace('/guides/', '/')
                .replace(`/${versionConfig.pathPrefix}/`, '/')
                .split('/'),
            ]
              .filter(Boolean)
              .join('/'),
        ],
      ];

      for (const [regex, fn] of versionedPaths) {
        if (path.match(regex)) {
          return fn();
        }
      }

      return path;
    },

    isVersion: (version: string | number) => {
      return cleanedVersion === version.toString();
    },
  };

  return {version: versionConfig};
}

export default useConditioning;
