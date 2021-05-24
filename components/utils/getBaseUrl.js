function isLocalhost(host) {
  return host.includes('localhost') || host.includes('127.0.0.1')
}

export default function getBaseUrl(req) {
  return 'http://127.0.0.1:3000'
  const host = req ? req.headers.host : ''
  return req ? `${isLocalhost(host) ? 'http' : 'https'}://${host}` : ''
}
