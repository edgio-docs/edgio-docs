# Security

This guide shows you how to keep your site secure using the Moovweb XDN.

## Content Security Policy (CSP)

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

You can easily add CSP headers to your site via a catch-all route near the top of your router.

To enforce a content security policy:

```js
new Router()
  .match('/:path*', ({ setResponseHeader }) => {
    setResponseHeader(
      'Content-Security-Policy',
      "default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi",
    )
  })
  // The rest of your router...
```

To enable a content security policy in report-only mode:

```js
new Router()
  .match('/:path*', ({ setResponseHeader }) => {
    setResponseHeader('Content-Security-Policy-Report-Only', "default-src 'self'")
  })
  // The rest of your router...
```

## SSL

The Moovweb XDN only accepts traffic over `https`. It automatically redirects `http` requests to the same URL, including any query strings, on `https`.

## Secrets

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`. To configure environment variables,
navigate to your environment, click _EDIT_, then under _Environment Variables_, click _ADD VARIABLE_.

![networking](/images/security/environment-variables.png)

## Putting your site behind basic auth

If you would like to protect your site behind [HTTP Basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) schema, you can respond with a challenge per [environment](environments) (note reading user and password from the environment):

```js
const router = new Router()

// Use HTTP Basic authentication if authentication user and password are defined in the environment.
if (process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASSWORD) {
  const BASIC_AUTH_TOKEN = Buffer.from(`${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASSWORD}`).toString('base64')

  router
    // Provide challenge when the Authorization header is not present.
    .match({
      path: '/:path*',
      headers: {
        Authorization: null, // null matching is true when the given header is not present.
      }
    }, ({ send, setResponseHeader }) => {
      setResponseHeader('WWW-Authenticate', 'Basic realm="Access to the site"')
      send('', 401, 'Unauthorized')
    })
    // Block the request when the Authorization header is not matching the basic auth token.
    .match({
      path: '/:path*',
      headers: {
        Authorization: new RegExp(`^Basic ((?!${BASIC_AUTH_TOKEN}).)*$`)
      }
    }, ({ send }) => {
      send('', 403, 'Forbidden')
    })
}

// The rest of your router...
```
