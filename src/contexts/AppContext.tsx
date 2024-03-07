import get from 'lodash/get';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

import {productsConfig} from 'config/appConfig';
import {getBaseConfig, getConfigByContext} from 'utils/config';
import {StringMap, Route} from 'utils/Types';

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
      navMenuItems = (await navigationImport()).default;
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
        let newNavMenuItems = updates.navMenuItems;
        const hasNavigationMenu = get(newNavMenuItems, 'routes.length', 0) > 0;
        return {
          ...currentContext,
          ...updates,
          hasNavigationMenu,
        };
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
  config: StringMap;
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

export function getLatestVersion(contextType: ContextType) {
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
