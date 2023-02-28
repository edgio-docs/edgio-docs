import {useRouter} from 'next/router';

const latestVersion = process.env.LATEST_VERSION as string;
interface RouterQuery {
  version?: string | string[];
  [key: string]: any;
}

interface IVersion {
  selectedVersion: string;
  latestVersion: string;
  pathPrefix: string;
}

interface IConditioning {
  version: IVersion;
}

function useConditioning(): IConditioning {
  const router = useRouter();
  const {version} = router.query as RouterQuery;

  // clean version from query
  const cleanedVersion =
    version && typeof version === 'string'
      ? version.replace(/v/, '')
      : latestVersion;

  const versionConfig: IVersion = {
    selectedVersion: cleanedVersion,
    latestVersion,
    pathPrefix: cleanedVersion ? `/v${cleanedVersion}` : '',
  };

  return {version: versionConfig};
}

export default useConditioning;
