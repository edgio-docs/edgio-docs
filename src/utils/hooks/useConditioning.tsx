import {globbySync} from 'globby';
import {join} from 'lodash';
import {useRouter} from 'next/router';

// TODO - get latest version from config files
const latestVersion = '7'; //getLatestVersion();
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
    version && typeof version === 'string' ? version.replace(/v/, '') : '';

  const versionConfig: IVersion = {
    selectedVersion: cleanedVersion,
    latestVersion,
    pathPrefix: cleanedVersion ? `/v${cleanedVersion}` : '',
  };

  return {version: versionConfig};
}

export default useConditioning;
