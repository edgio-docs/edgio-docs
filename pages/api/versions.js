import fetch from 'isomorphic-fetch'

export default async function versions(req, res) {
  try {
    const verRes = await fetch('http://moovweb.github.io/xdn-docs-pages/versions.csv')

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
