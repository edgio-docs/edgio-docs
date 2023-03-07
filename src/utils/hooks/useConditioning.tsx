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
  toPath: (path: string) => string;
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
    toPath: (path: string) => {
      return [
        versionConfig.pathPrefix.length ? versionConfig.pathPrefix : 'guides',
        ...path.replace('guides', '').split('/'),
      ]
        .filter(Boolean)
        .join('/');
    },
  };

  return {version: versionConfig};
}

export default useConditioning;
