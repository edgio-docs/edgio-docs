import {useRouter} from 'next/router';

interface RouterQuery {
  version?: string | string[];
  [key: string]: any;
}

interface IConditioning {
  version: string;
}

function useConditioning(): IConditioning {
  const router = useRouter();
  const {version} = router.query as RouterQuery;

  // clean version from query
  const cleanedVersion =
    version && typeof version === 'string' ? version.replace(/v/, '') : '';

  return {version: cleanedVersion};
}

export default useConditioning;
