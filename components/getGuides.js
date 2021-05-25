import fetch from 'cross-fetch'
import { DOCS_PAGES_REPO_URL } from '../constants'

export async function getGuides(version) {
  const guides = version
    ? await fetch(`${DOCS_PAGES_REPO_URL}/${version}/guides.json`).then(resp => resp.json())
    : require('../guides/guides.json')

  return guides
}

export async function getGuideByName(guide, version = 'current') {
  const isChangelog = guide === 'changelog'

  // changelog always pulls from the current version
  if (isChangelog) {
    version = 'current'
  }

  try {
    const guideResp =
      // To allow correct previews in local/cloud/edge, read the versioned docs only in production,
      // otherwise just read it from this version itself.
      process.env.LAYER0_ENVIRONMENT_NAME === 'production' || isChangelog
        ? await fetch(`${DOCS_PAGES_REPO_URL}/${version}/guides/${guide}.md`).then(resp =>
            resp.ok ? resp.text() : '',
          )
        : require(`../guides/${guide}.md`).default

    return guideResp
  } catch (e) {
    return 'Guide not found'
  }
}
