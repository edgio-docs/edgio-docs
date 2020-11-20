import fetch from 'isomorphic-fetch'

export default async function guide(req, res) {
  let { version, guide } = req.query

  // changelogs always pull from the current version
  if (guide === 'changelog') {
    version = 'current'
  }

  try {
    const guideResp =
      process.env.NODE_ENV === 'production'
        ? await fetch(
            `http://moovweb-docs.github.io/xdn-docs-pages/${version}/guides/${guide}.md`,
          ).then(resp => resp.text())
        : require(`../../../guides/${guide}.md`).default

    if (res) {
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(guideResp)
    }

    return guideResp
  } catch (e) {
    if (res) {
      res.statusCode = 500
      res.end('')
    }
  }
}
