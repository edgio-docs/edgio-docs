import fetch from 'isomorphic-fetch'

export default async function getVersions() {
  // Here we add a cache buster to ensure that when the XDN cache is cleared we get the latest versions file from
  // GitHub
  const verRes = await fetch(
    `https://moovweb-docs.github.io/xdn-docs-pages/versions.csv?nc=${new Date().getTime()}`,
  )

  return (await verRes.text())
    .split(',')
    .map(ver => ver.trim())
    .reverse()
}
