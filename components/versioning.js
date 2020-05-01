import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

export const VersionContext = createContext()

export const VERSION_REGEX = /(v\d+.\d+.\d+\/?)/

export const VersionProvider = ({ children, selectedVersion, versions }) => {
  const [currentVersion, setCurrentVersion] = useState(selectedVersion)
  return (
    <VersionContext.Provider value={{ currentVersion, setCurrentVersion, versions }}>
      {children}
    </VersionContext.Provider>
  )
}

// export function useVersioning() {
export default function useVersioning() {
  const { currentVersion, setCurrentVersion, versions } = useContext(VersionContext)
  const { asPath } = useRouter()

  const isLatestVersion = (version = currentVersion) => version === versions[0]

  return {
    versions,
    currentVersion,
    setCurrentVersion,
    isLatestVersion,
    createUrl: ({ version = currentVersion, as = asPath, forceVersion = false }) => {
      if (as === '/') {
        return '/'
      } else if (isLatestVersion(version) && !forceVersion) {
        return as.replace(VERSION_REGEX, '')
      } else {
        const [_, prefix, ...parts] = as.split('/')
        const partsNoVersion = parts.filter(part => !part.match(VERSION_REGEX))
        return '/' + [prefix, version, ...partsNoVersion].join('/')
      }
    },
  }
}
