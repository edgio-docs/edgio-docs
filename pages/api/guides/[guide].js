import fetch from 'isomorphic-fetch'

export default async function guide(req, res) {
  const { version, guide } = req.query
  const guideResp = version
    ? await fetch(
        `http://moovweb.github.io/xdn-docs-pages/${version}/guides/${guide}.md`,
      ).then(resp => resp.text())
    : require(`../../../guides/${guide}.md`).default

  if (res) {
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 200
    res.end(guideResp)
  }

  return guideResp
}
