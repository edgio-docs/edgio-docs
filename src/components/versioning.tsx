// @ts-nocheck
import fetch from 'cross-fetch';
import {useRouter} from 'next/router';
import {createContext, useContext, useState} from 'react';
import semverRSort from 'semver/functions/rsort';

import {DOCS_PAGES_REPO_URL} from '../../constants';

export const VersionContext = createContext({currentVersion: 'current'});

export const VersionProvider = ({children}) => {
  const router = useRouter();
  const [currentVersion, setCurrentVersion] = useState(
    getVersionFromPath(router.asPath)
  );
  return (
    <VersionContext.Provider value={{currentVersion, setCurrentVersion}}>
      {children}
    </VersionContext.Provider>
  );
};

export const VERSION_REGEX = /(v\d+.\d+.\d+\/?)/;

export default function useVersioning() {
  let {currentVersion, setCurrentVersion} = useContext(VersionContext);
  const [versions, setVersions] = useState<string[]>([]);

  const {asPath} = useRouter();

  const isLatestVersion = (version = currentVersion) => version === versions[0];

  const matchVersionInRoute = asPath.match(VERSION_REGEX);

  if (matchVersionInRoute) {
    const version = matchVersionInRoute[0].slice(0, -1);

    if (currentVersion !== version) {
      currentVersion = version;
    }
  }

  return {
    versions,
    setVersions,
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

export async function getVersions() {
  let url;

  if (typeof window !== 'undefined') {
    url = '/api-docs/versions.csv';
  } else {
    url = `${DOCS_PAGES_REPO_URL}/versions.csv`;
  }

  const verRes = await fetch(url);

  return semverRSort((await verRes.text()).split(',').map((ver) => ver.trim()));
}

export function getVersionFromPath(path: string) {
  const matchVersionInRoute = path.match(VERSION_REGEX);

  if (matchVersionInRoute) {
    return matchVersionInRoute[0].slice(0, -1);
  }

  return 'current';
}
