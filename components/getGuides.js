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
    let sourceGuide = ''

    try {
      sourceGuide = require(`../guides/${guide}.md`).default
    } catch (e) {
      /* ignore */
    }

    const guideResp =
      // To allow correct previews in local/cloud/edge, read the versioned docs only in production env,
      // otherwise just read it from this version itself.
      process.env.LAYER0_ENVIRONMENT_NAME === 'production' || isChangelog
        ? await fetch(`${DOCS_PAGES_REPO_URL}/${version}/guides/${guide}.md`).then(resp =>
            resp.ok ? resp.text() : sourceGuide,
          )
        : sourceGuide

    return guideResp
  } catch (e) {
    console.log('Guide not found', e)
    return sourceGuide
  }
}
