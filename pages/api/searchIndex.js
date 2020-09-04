import fetchGuide from './guides/[guide]'
import fetchGuideMeta from './guides'

/**
 * Handler for the /searchIndex?version=v API
 */
export default async function search({ query: { version } }, res) {
  res.json(await loadGuides(version))
}

/**
 * Recursively looks through a directory and parses all of the *.md files into an array.
 * Expects each file to have "# Guide Name\n" as the first line
 */
async function loadGuides(version) {
  const guides = []
  const guideMeta = await fetchGuideMeta({ query: { version } })
  const guideNames = []
  const guidePromises = []

  guideMeta.forEach(group => {
    if (group.text === 'API Documentation') return
    ;(group.items || []).forEach(guide => {
      const guideId = guide.as.substr(guide.as.lastIndexOf('/') + 1)
      guideNames.push(guideId)
      guidePromises.push(fetchGuide({ query: { version, guide: guideId } }))
    })
  })

  const guideList = await Promise.all(guidePromises)

  for (let idx = 0; idx < guideNames.length; idx++) {
    const content = guideList[idx]
    const id = guideNames[idx]
    const nameMatch = content.match(/^# (.+)\n/)

    if (nameMatch) {
      guides.push({
        id,
        name: nameMatch[1],
        content,
        type: 'guide',
        as: `/guides/${id}`,
        href: `/guides/[...guide]`,
      })
    }
  }

  return guides
}
