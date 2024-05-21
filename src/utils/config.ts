import {productsConfig} from 'config/appConfig';
import {ContextType} from 'contexts/AppContext';

import baseConfig from '../config/base.config';

export function getBaseConfig() {
  return baseConfig;
}

export async function getConfigByContext(
  context: ContextType,
  version: string = 'default'
) {
  const productConfig = productsConfig[context]?.versions[version];

  if (!productConfig) {
    throw new Error(`No config found for '${context}' v${version}`);
  }

  return {...baseConfig, ...(await productConfig.configImport()).default};
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
