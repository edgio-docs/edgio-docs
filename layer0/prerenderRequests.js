const { default: getVersions } = require('../components/getVersions')
const guides = require('../guides/guides.json')

module.exports = async function prerenderRequests() {
  const versions = await getVersions()
  const version = versions[0]
  const requests = [{ path: '/' }]

  for (let group in guides) {
    requests.push(...requestsForItem(guides[group], version))
  }

  return requests
}

function requestsForItem(item, version) {
  const requests = []

  if (item.as && item.as.startsWith('/guides')) {
    requests.push({ path: item.as })
    // requests.push({ path: `/api${item.as}?version=${version}` })
  }

  if (item.items) {
    for (let child of item.items) {
      requests.push(...requestsForItem(child, version))
    }
  }

  return requests
}
