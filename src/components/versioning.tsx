// THIS FILE IS INCOMPLETE/NON-FUNCTIONAL

import {Router, useRouter} from 'next/router';
import {
  createContext,
  ReactChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';

export const VERSION_REGEX = /(v\d\/?)/;
const latestVersionValue = 'latest';
const versions = [4, 5, 6];

export const VersionContext = createContext({
  currentVersion: latestVersionValue,
  setCurrentVersion: (version: string) => {},
});

export const VersionProvider = ({children}: {children: ReactElement}) => {
  const [currentVersion, setCurrentVersion] = useState(getVersionFromRoute());
  return (
    <VersionContext.Provider value={{currentVersion, setCurrentVersion}}>
      {children}
    </VersionContext.Provider>
  );
};

export default function useVersioning() {
  let {currentVersion, setCurrentVersion} = useContext(VersionContext);

  const {asPath} = useRouter();

  const isLatestVersion = (version = currentVersion) =>
    version === versions[0].toString();

  const matchVersionInRoute = asPath.match(VERSION_REGEX);

  if (matchVersionInRoute) {
    const version = matchVersionInRoute[0].slice(0, -1);

    if (currentVersion !== version) {
      currentVersion = version;
    }
  }

  return {
    versions,
    currentVersion,
    setCurrentVersion,
    isLatestVersion,
    createUrl: ({
      version = currentVersion,
      as = asPath,
      forceVersion = false,
    }) => {
      if (as === '/') {
        return '/';
      } else if (as.startsWith('http')) {
        return as;
      } else if (isLatestVersion(version) && !forceVersion) {
        return as.replaceAll(VERSION_REGEX, '');
      } else {
        let [path, hash] = as.split('#');
        const [_, prefix, ...parts] = path.split('/');
        const partsNoVersion = parts.filter(
          (part) => !part.match(VERSION_REGEX)
        );

        path = '/' + [prefix, version, ...partsNoVersion].join('/');

        if (hash.length) {
          path += `#${hash.replace(currentVersion, version)}`;
        }
        return path;
      }
    },
  };
}

// INCOMPLETE
export function getVersionFromRoute() {
  const matchVersionInRoute = ''.match(VERSION_REGEX);
  if (matchVersionInRoute) {
    return matchVersionInRoute[0].slice(0, -1);
  }

  return latestVersionValue;
}
