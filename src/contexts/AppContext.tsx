import React, {createContext, ReactNode} from 'react';

import {Route, StringMap} from 'utils/Types';
interface AppContextProps {
  config: StringMap;
  navMenuItems?: Route;
  version?: string | null;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
  config: {},
  navMenuItems: {},
  version: null,
});

interface AppProviderProps {
  children: ReactNode;
  config: StringMap;
  navMenuItems?: Route;
  version?: string | null;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  config,
  navMenuItems,
  version,
}) => {
  return (
    <AppContext.Provider value={{config, navMenuItems, version}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
