import fetch from 'isomorphic-fetch'
import { DOCS_PAGES_REPO_URL } from '../../consts'

export default async function guides(req, res) {
  const { version } = req.query
  const guides = version
    ? await fetch(`${DOCS_PAGES_REPO_URL}/${version}/guides.json`).then(resp => resp.json())
    : require('../../guides/guides.json')

  if (res) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(guides))
  }

  return guides
}
