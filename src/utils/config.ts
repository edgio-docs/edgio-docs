import baseConfig from '../config/base.config';

export async function getAppsVersionedConfig(version: string) {
  const versionedConfig = await import(`config/applications/${version}.config`);
  return {...getBaseConfig(), ...versionedConfig.default};
}

export function getBaseConfig() {
  return baseConfig;
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
