import fetch from 'isomorphic-fetch'

export default async function guide(req, res) {
  let { version, guide } = req.query
  const isChangelog = guide === 'changelog'

  // changelog always pulls from the current version
  if (isChangelog) {
    version = 'current'
  }

  try {
    const guideResp =
      // To allow correct previews in local/cloud/edge, read the versioned docs only in production,
      // otherwise just read it from this version itself.
      process.env.XDN_ENVIRONMENT_NAME === 'production' || isChangelog
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
