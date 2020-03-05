import lunr from 'lunr'
import fetchModules from './modules/[version]'
import fetchGuide from './guides/[guide]'
import fetchGuideMeta from './guides'

const guides = {}
const modules = {}

/**
 * Recursively looks through a directory and parses all of the *.md files into an array.
 * Expects each file to have "# Guide Name\n" as the first line
 */
async function loadGuides(version) {
  guides[version] = []
  const guideMeta = await fetchGuideMeta({ query: { version } })
  const guideNames = []
  const guidePromises = []
  guideMeta.forEach(group => {
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
      guides[version].push({
        id,
        name: nameMatch[1],
        content,
        type: 'guide',
        as: `/guides/${id}`,
        href: `/guides/[...guide]`,
      })
    }
  }
}

/**
 * Loads the latest modules metadata into an array to be searched
 */
async function loadModules(version) {
  const moduleMap = (await fetchModules({ query: { version } })).exports
  modules[version] = []
  Object.keys(moduleMap).forEach(id => {
    const mod = moduleMap[id]
    modules[version].push({
      id,
      name: mod.type === 'component' ? `&lt;${mod.name}&gt;` : mod.name,
      content: mod.type === 'component' ? mod.description : mod.comments,
      type: 'api',
      as: `/apiReference/${id}`,
      href: `/apiReference/[...module]`,
    })
  })
}

/**
 * Parses a lunr.Index with the given search query, giving results that can be sent back to the UI
 */
function parseResults(query, index, version) {
  const returnObj = {}
  const search = index.search(`*${query}*`)

  returnObj.count = search.length
  returnObj.results = []

  search.slice(0, 10).forEach(match => {
    const document = [...guides[version], ...modules[version]].find(guide => guide.id === match.ref)
    const metadata = match.matchData.metadata
    const fields = metadata[Object.keys(metadata)[0]]
    const firstMatch = fields[Object.keys(fields)[0]].position[0][0]
    const start = Math.max(0, firstMatch - 10)
    const end = firstMatch + 60
    let text = document.content.slice(start, end)

    if (start > 0) {
      text = `...${text}`
    }

    if (end < document.content.length) {
      text = `${text}...`
    }

    returnObj.results.push({
      ...document,
      match: text,
    })
  })
  return returnObj
}

/**
 * Handler for the /search?query=x&version=v API
 */
export default async function search({ query: { query, version } }, res) {
  if (!guides[version]) {
    await loadGuides(version)
  }
  if (!modules[version]) {
    await loadModules(version)
  }
  const index = lunr(function() {
    this.ref('id')
    this.field('name')
    this.field('content')
    this.metadataWhitelist = ['position']

    guides[version].forEach(guide => this.add(guide))
    modules[version].forEach(module => this.add(module))
  })
  const results = parseResults(query, index, version)

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(results))
}
