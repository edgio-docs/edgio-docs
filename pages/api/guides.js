import fetch from 'isomorphic-fetch'

export default async function guides(req, res) {
  const { version } = req.query
  const guides = version
    ? await fetch(
        `http://moovweb.github.io/xdn-docs-pages/${version}/guides.json`,
      ).then(resp => resp.json())
    : require('../../guides/guides.json')

  if (res) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(guides))
  }

  return guides
}
