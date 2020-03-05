export default function getBaseUrl(req) {
  const host = req ? req.headers.host : ''
  return req ? `${host.includes('localhost') ? 'http' : 'https'}://${host}` : ''
}
