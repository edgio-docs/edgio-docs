import {toNormalizedPath} from 'components/MDX/Link';
import {productsConfig} from 'config/appConfig';
import {
  ContextType,
  getLatestVersion,
  useAppContext,
} from 'contexts/AppContext';

interface IVersion {
  /**
   * The version that is currently selected, e.g. "7"
   */
  selectedVersion: string;

  /**
   * The version that is currently selected prefixed with "v", e.g. "v7"
   */
  selectedVersionText: string;

  /**
   * The latest version, e.g. "7"
   */
  latestVersion: string;

  /**
   * The latest version prefixed with "v", e.g. "v7"
   */
  latestVersionText: string;

  /**
   * Whether the selected version is the latest version
   */
  isLatest: boolean;

  pathPrefix: string;
  packageVersion: string;
  toVersionedPath: (path: string) => string;
  isVersion: (version: string | number) => boolean;
}

function useConditioning() {
  const {context, version} = useAppContext();
  let latestVersion = '';

  if (context === ContextType.APPLICATIONS) {
    latestVersion = getLatestVersion(context) ?? '';
  }

  // clean version from query
  const cleanedVersion =
    version && typeof version === 'string' && version.match(/^v\d+$/)
      ? version.replace(/v/, '')
      : latestVersion.replace(/v/, '');

  const isLatest = cleanedVersion === latestVersion;
  const versionConfig: IVersion = {
    selectedVersion: cleanedVersion,
    selectedVersionText: `v${cleanedVersion}`,
    latestVersion: latestVersion,
    latestVersionText: `v${latestVersion.replace(/v/, '')}`,
    isLatest,
    // doesn't include version in the path for the latest guides
    // pathPrefix: !isLatest ? `v${cleanedVersion}` : '',

    // does include version in the path for the latest guides
    pathPrefix: `v${cleanedVersion}`,

    packageVersion: `^${cleanedVersion}.0.0`,
    toVersionedPath: (path: string): string => {
      // Versioning only applies to the applications context
      if (context !== ContextType.APPLICATIONS) {
        return toNormalizedPath(path, false);
      }

      // If the path starts with a / and includes a version within the path, keep the path as-is
      if (path.startsWith('/') && path.match(/\/v\d+\//)) {
        return path;
      }

      const pathPrefix = productsConfig['applications'].pathPrefix;
      const escapedPrefix = pathPrefix.replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        '\\$&'
      );

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
          // matches anything starting with the path prefix (or legacy /guides or a guide name w/o the preceding /)
          new RegExp(`^(${escapedPrefix}|/guides|\\w+)`),
          () =>
            [
              pathPrefix, // forcing all urls to start with the prefix
              versionConfig.pathPrefix,
              ...path
                .replace(/^\/guides\//, '/') //legacy
                .replace(pathPrefix, '/')
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
