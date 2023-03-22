import {useMemo, ReactNode} from 'react';
import {satisfies, coerce, validRange} from 'semver';

import useConditioning from '../../utils/hooks/useConditioning';

interface ConditionProps {
  version: string;
  children: ReactNode;
}

function Condition({version, children}: ConditionProps) {
  // `version` is the range passed to this component (eg. `>=6`)

  // `currentVersion` is the version defined in the route (eg. `/guides/v6/...`)
  // but will return as a string (eg. `6`)
  const {
    version: {selectedVersion: currentVersion},
  } = useConditioning();

  const isVersionSatisfied = useMemo(() => {
    // coerce to a valid semver version
    const currentVersionParsed = coerce(currentVersion) ?? '0.0.0';

    const versionRange = validRange(version) || '';
    return satisfies(currentVersionParsed, versionRange);
  }, [currentVersion, version]);

  return isVersionSatisfied ? <>{children}</> : null;
}

export default Condition;
