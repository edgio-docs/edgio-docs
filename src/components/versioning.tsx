import fetch from 'cross-fetch';
import {useRouter} from 'next/router';
import {createContext, useContext, useState} from 'react';
import semverRSort from 'semver/functions/rsort';

import {DOCS_PAGES_REPO_URL} from '../../constants';

type VersionContent = {
  currentVersion: string;
  setCurrentVersion: (v: string) => void;
  versions: string[];
};

export const VersionContext = createContext<VersionContent>({
  currentVersion: 'current',
  setCurrentVersion: () => {},
  versions: [],
});

export const VERSION_REGEX = /(v\d+.\d+.\d+\/?)/;

export const VersionProvider = ({children, selectedVersion, versions}: any) => {
  const [currentVersion, setCurrentVersion] = useState(selectedVersion);
  return (
    <VersionContext.Provider
      value={{currentVersion, setCurrentVersion, versions}}>
      {children}
    </VersionContext.Provider>
  );
};

export default function useVersioning() {
  const {currentVersion, setCurrentVersion, versions} =
    useContext(VersionContext);
  const {asPath} = useRouter();

  const isLatestVersion = (version = currentVersion) => version === versions[0];

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
        return as.replace(VERSION_REGEX, '');
      } else {
        const [_, prefix, ...parts] = as.split('/');
        const partsNoVersion = parts.filter(
          (part) => !part.match(VERSION_REGEX)
        );
        return '/' + [prefix, version, ...partsNoVersion].join('/');
      }
    },
  };
}

export async function getVersions() {
  // Here we add a cache buster to ensure that when the cache is cleared we get the latest versions file from
  // GitHub
  const verRes = await fetch(
    `${DOCS_PAGES_REPO_URL}/versions.csv?nc=${new Date().getTime()}`
  );

  return semverRSort((await verRes.text()).split(',').map((ver) => ver.trim()));
}
