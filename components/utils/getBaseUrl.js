function isLocalhost(host) {
  return host.includes('localhost') || host.includes('127.0.0.1')
}

export default function getBaseUrl(req) {
  const host = req ? req.headers.host : ''
  return req ? `${isLocalhost(host) ? 'http' : 'https'}://${host}` : ''
}
