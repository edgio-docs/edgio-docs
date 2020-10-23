const guides = require('../guides/guides.json')

module.exports = async function prerenderRequests() {
  const requests = []

  for (let group in guides) {
    requests.push(...requestsForItem(guides[group]))
  }

  return requests
}

function requestsForItem(item) {
  const requests = []

  if (item.as && item.as.startsWith('/')) {
    requests.push({ path: item.as })
    requests.push({ path: `/api${item.as}?version=` })
  }

  if (item.items) {
    for (let child of item.items) {
      requests.push(...requestsForItem(child))
    }
  }

  return requests
}
