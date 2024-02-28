import baseConfig from '../config/base.config';

export function getBaseConfig() {
  return baseConfig;
}

export async function getVersionedConfig(
  version?: string,
  mergeWithBase: boolean = true
) {
  if (!version) {
    version = process.env.NEXT_PUBLIC_LATEST_VERSION as string; // defined in next.config.js
  }

  // clean up version string so it's just the numeric value
  version = version.replace('v', '');

  const versioned = await import(`../config/v${version}.config`);

  if (!mergeWithBase) {
    return versioned;
  }

  return {...baseConfig, ...versioned};
}

export function getVersionedConfigs() {
  // TODO: make this dynamic
  return {
    v4: require('../config/v4.config'),
    v5: require('../config/v5.config'),
    v6: require('../config/v6.config'),
    v7: require('../config/v7.config'),
  };
}

/**
 * Serialize config to JSON string, removing anything that can't be serialized
 */
export function serializeConfig(config: any) {
  return JSON.parse(
    JSON.stringify(config, (key, value) => {
      if (typeof value === 'function') {
        return value.toString();
      }
      if (typeof value === 'symbol') {
        return value.toString();
      }
      if (value instanceof RegExp) {
        return value.toString();
      }
      return value;
    })
  );
}
