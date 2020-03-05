import fetch from 'isomorphic-fetch'

export default async function version(req, res) {
  const { version } = req.query
  const modules = await fetch(
    `http://moovweb.github.io/xdn-docs-pages/${version}/modules.json`,
  ).then(resp => resp.json())

  const updateMenu = node => {
    if (node.as) {
      node.href = `/apiReference/[...module]`
      node.as = `/apiReference/${node.as}`
    }
    if (node.items) {
      node.items.forEach(treeNode => updateMenu(treeNode))
    }
  }
  modules.menu = [
    {
      text: '',
      items: modules.menu,
    },
  ]
  updateMenu(modules.menu[0])

  if (res) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(modules))
  }

  return modules
}
