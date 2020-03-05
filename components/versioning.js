import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

export const VersionContext = createContext()

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
  const { route, asPath } = useRouter()

  const isLatestVersion = (version = currentVersion) => version === versions[0]

  return {
    versions,
    currentVersion,
    setCurrentVersion,
    isLatestVersion,
    createUrl: ({ version = currentVersion, as = asPath, href = route }) => {
      if (as === '/') {
        return '/'
      }
      const pathWithoutVersion = as.replace(/\/v7.\d*.\d*\//, '/')
      const routeWithoutModule = href.replace(/\/\[.*]/, '')
      return `${routeWithoutModule}${
        isLatestVersion(version) ? '' : `/${version}`
      }${pathWithoutVersion.replace(routeWithoutModule, '')}`
    },
  }
}
