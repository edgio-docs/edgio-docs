const guides = require('../guides/guides.json')

module.exports = function prerenderRequests() {
  const requests = []

  for (let group in guides) {
    requests.push(...requestsForItem(group))
  }

  return requests
}

function requestsForItem(item) {
  const requests = []

  if (item.as) {
    requests.push({ path: `/guides/${item.as}` })
    requests.push({ path: `/api/guides/${item.as}?version=` })
  }

  if (item.items) {
    for (let child of item.items) {
      requests.push(...requestsForItem(child))
    }
  }

  return requests
}
