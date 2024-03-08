import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

import get from 'lodash/get';

import {productsConfig, ProductVersionConfig} from 'config/appConfig';
import {getBaseConfig, getConfigByContext} from 'utils/config';
import {StringMap, Route} from 'utils/Types';

import {COMPANY_NAME} from '../../constants';

export const AppProvider: React.FC<{
  children: ReactNode;
  initialContextType?: ContextType;
  initialVersion?: string;
}> = ({children, initialContextType, initialVersion = 'default'}) => {
  const [contextState, setContextState] =
    useState<AppContextProps>(defaultContextValues);

  // Dynamically load config based on contextType and version
  const loadConfig = async (contextType: ContextType, version: string) => {
    let config = getBaseConfig();
    let navMenuItems = {};

    // Config and navigation import is handle from the appConfig.ts file
    const contextConfig = productsConfig[contextType];

    if (!contextConfig) {
      console.error(`No config found for contextType: ${contextType}`);
      return {config, navMenuItems};
    }

    const {navigationImport} = contextConfig.versions[version];

    try {
      config = await getConfigByContext(contextType, version);
      navMenuItems =
        (navigationImport && (await navigationImport()).default) ||
        navMenuItems;
    } catch (error) {
      console.error(
        `Failed to load config for ${contextType} (${version}):`,
        error
      );
    }

    return {config, navMenuItems};
  };

  const updateContext = useCallback(
    (updates: Partial<Omit<AppContextProps, 'hasNavigationMenu'>>) => {
      setContextState((currentContext) => {
        const newContextState = {
          ...currentContext,
          ...updates,
          hasNavigationMenu: get(updates.navMenuItems, 'routes.length', 0) > 0,
        };

        console.log('newContextState', newContextState);
        newContextState.appConfig =
          productsConfig[newContextState.context || ContextType.HOME]?.versions[
            newContextState.version || 'default'
          ];

        console.log('newContextState', newContextState);
        return newContextState;
      });
    },
    []
  );

  useEffect(() => {
    if (initialContextType) {
      loadConfig(initialContextType, initialVersion).then(
        ({config, navMenuItems}) => {
          updateContext({
            context: initialContextType,
            config,
            navMenuItems,
            version: initialVersion,
          });
        }
      );
    }
  }, [initialContextType, initialVersion, updateContext]);

  return (
    <AppContext.Provider value={{...contextState, updateContext}}>
      {children}
    </AppContext.Provider>
  );
};

interface AppContextProps {
  config: StringMap; // constants
  appConfig?: ProductVersionConfig | null;
  navMenuItems?: Route | null;
  version?: string | null;
  context?: ContextType | null;
  updateContext: (
    updates: Partial<Omit<AppContextProps, 'updateContext'>>
  ) => void;

  hasNavigationMenu: boolean;
}

const noop = () => {};

const defaultContextValues: AppContextProps = {
  config: getBaseConfig(),
  appConfig: null,
  updateContext: noop,
  hasNavigationMenu: false,
};

const AppContext = createContext<AppContextProps>(defaultContextValues);

export enum ContextType {
  HOME = 'home',
  APPLICATIONS = 'applications',
  UPLYNK = 'uplynk',
  DELIVERY = 'delivery',
  OPEN_EDGE = 'open_edge',
}

/**
 * Get the context type by name
 */
export const getContextTypeByName = (name: string): ContextType => {
  const contextTypeKey = Object.keys(ContextType).find(
    (key) =>
      ContextType[key as keyof typeof ContextType].toLowerCase() ===
      name.toLowerCase()
  );
  return contextTypeKey
    ? ContextType[contextTypeKey as keyof typeof ContextType]
    : ContextType.HOME;
};

/**
 * Gets the latest version for a given context type
 */
export function getLatestVersion(contextType: ContextType): string | null {
  const contextConfig = productsConfig[contextType];
  const defVal = null;

  if (!contextConfig) {
    console.log(`No config found for contextType: ${contextType}`);
    return defVal;
  }

  const versions = contextConfig.versions;
  const versionKeys = Object.keys(versions).filter((key) => key !== 'default');

  if (versionKeys.length === 0) {
    return defVal;
  } else {
    const latestVersion = versionKeys.reduce((prev, curr) => {
      return prev > curr ? prev : curr;
    });
    return latestVersion;
  }
}

export const useAppContext = () => useContext(AppContext);
