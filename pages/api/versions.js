import fetch from 'isomorphic-fetch'

export default async function versions(req, res) {
  try {
    // Here we add a cache buster to ensure that when the XDN cache is cleared we get the latest versions file from
    // GitHub
    const verRes = await fetch(
      `http://moovweb-docs.github.io/xdn-docs-pages/versions.csv?nc=${new Date().getTime()}`,
    )

    const versions = (await verRes.text())
      .split(',')
      .map(ver => ver.trim())
      .reverse()

    if (res) {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(versions))
    }

    return versions
  } catch (e) {
    return res.json(['unknown'])
  }
}
