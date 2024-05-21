import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import {productsConfig, ProductVersionConfig} from 'config/appConfig';
import {getBaseConfig, getConfigByContext, serializeConfig} from 'utils/config';
import {Route, StringMap} from 'utils/Types';

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialContextType = ContextType.HOME,
  initialVersion = 'default',
  initialConfig,
  initialNavMenuItems,
}) => {
  const initialState: AppContextProps = {
    ...defaultContextState,
    config: initialConfig,
    navMenuItems: initialNavMenuItems,
    version: initialVersion,
    context: initialContextType,
    appConfig:
      productsConfig[initialContextType]?.versions[initialVersion] || null,
    hasNavigationMenu:
      !!initialNavMenuItems && Object.keys(initialNavMenuItems).length > 0,
  };

  const [contextState, setContextState] =
    useState<AppContextProps>(initialState);

  const updateContext = useCallback(
    async (updates: Partial<Omit<AppContextProps, 'updateContext'>>) => {
      // Load the config and navigation menu items for the new context
      if (updates.context) {
        const {initialConfig, initialNavMenuItems} =
          await getInitialContextProps(
            updates.context,
            updates.version ?? undefined
          );
        updates.config = initialConfig;
        updates.navMenuItems = initialNavMenuItems;
      }

      setContextState((currentContext) => ({
        ...currentContext,
        ...updates,
        hasNavigationMenu:
          !!updates.navMenuItems?.routes &&
          updates.navMenuItems.routes.length > 0,
        appConfig: updates.context
          ? productsConfig[updates.context]?.versions[
              updates.version || 'default'
            ] || null
          : currentContext.appConfig,
      }));
    },
    []
  );

  return (
    <AppContext.Provider value={{...contextState, updateContext}}>
      {children}
    </AppContext.Provider>
  );
};

export interface AppProviderProps {
  children: ReactNode;
  initialContextType?: ContextType;
  initialVersion: string;
  initialConfig: StringMap;
  initialNavMenuItems?: Route;
}

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
 * Gets the latest version for a given context type, returning `null`
 * if no versions are found other than the default.
 */
export async function getInitialContextProps(
  context: ContextType | string,
  version?: string
): Promise<Omit<AppProviderProps, 'children'>> {
  const contextType = getContextTypeByName(context);
  const {config, navMenuItems} = await loadConfig(contextType, version);

  return {
    initialContextType: contextType,
    initialVersion: version || getLatestVersion(contextType) || 'default',
    initialConfig: serializeConfig(config),
    initialNavMenuItems: navMenuItems,
  };
}

/**
 * Get the props to be used for setting the initial context
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

async function loadConfig(
  contextType: ContextType,
  version: string = 'default'
): Promise<{config: StringMap; navMenuItems: Route}> {
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
      (navigationImport && (await navigationImport()).default) || navMenuItems;
  } catch (error) {
    console.error(
      `Failed to load config for ${contextType} (${version}):`,
      error
    );
  }

  return {config, navMenuItems};
}

const defaultContextState: AppContextProps = {
  config: getBaseConfig(),
  appConfig: null,
  navMenuItems: null,
  version: 'default',
  context: ContextType.HOME,
  updateContext: () => {},
  hasNavigationMenu: false,
};

const AppContext = createContext<AppContextProps>(defaultContextState);

export const useAppContext = () => useContext(AppContext);
