import {join} from 'path';

import baseConfig from '../config/base.config';

export function getBaseConfig() {
  return baseConfig;
}

export async function getVersionedConfig(
  version?: string,
  mergeWithBase: boolean = true
) {
  if (!version) {
    version = process.env.LATEST_VERSION ?? '6'; // defined in next.config.js
  }

  const versioned = (await import(`../config/v${version}.config.js`)).default;

  if (!mergeWithBase) {
    return versioned;
  }

  return {...baseConfig, ...versioned};
}
