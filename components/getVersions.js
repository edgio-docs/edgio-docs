import fetch from 'cross-fetch'
import { DOCS_PAGES_REPO_URL } from '../constants'

export default async function getVersions() {
  // Here we add a cache buster to ensure that when the XDN cache is cleared we get the latest versions file from
  // GitHub
  const verRes = await fetch(`${DOCS_PAGES_REPO_URL}/versions.csv?nc=${new Date().getTime()}`)

  return (await verRes.text())
    .split(',')
    .map(ver => ver.trim())
    .reverse()
}
