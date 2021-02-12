import getVersions from '../../components/getVersions'

export default async function versions(req, res) {
  try {
    const versions = await getVersions()

    if (res) {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(versions))
    }

    return versions
  } catch (e) {
    return res.json(['unknown'])
  }
}
