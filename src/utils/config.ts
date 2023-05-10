import baseConfig from '../config/base.config';
import v4 from '../config/v4.config';
import v5 from '../config/v5.config';
import v6 from '../config/v6.config';
import v7 from '../config/v7.config';

import {StringMap} from './Types';

const configs: StringMap = {
  v4,
  v5,
  v6,
  v7,
};

export function getBaseConfig() {
  return baseConfig;
}

export function getVersionedConfig(
  version?: string,
  mergeWithBase: boolean = true
) {
  if (!version) {
    version = process.env.NEXT_PUBLIC_LATEST_VERSION as string; // defined in next.config.js
  }

  // clean up version string so it's just the numeric value
  version = version.replace('v', '');

  const versioned = configs[`v${version}`];

  if (!mergeWithBase) {
    return versioned;
  }

  return {...baseConfig, ...versioned};
}

export function getVersionedConfigs() {
  return Object.keys(configs).reduce((acc, key) => {
    acc[key] = {...baseConfig, ...configs[key]};
    return acc;
  }, {} as StringMap);
}
