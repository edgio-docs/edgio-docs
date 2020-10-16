# Security

This guide shows you how to keep your site secure using the Moovweb XDN.

## Content Security Policy (CSP)

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

You can easily add CSP headers to your site via a catch-all route near the top of your router.

To enforce a content security policy:

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader(
    'Content-Security-Policy',
    "default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi",
  )
})
// The rest of your router...
```

To enable a content security policy in report-only mode:

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Content-Security-Policy-Report-Only', "default-src 'self'")
})
// The rest of your router...
```

## Enabling Basic Authentication

You can add basic authentication to your site using the `requireBasicAuth` router method. For example, add the following to the
top of your router:

```js
router.requireBasicAuth({
  username: process.env.BASIC_AUTH_USERNAME,
  password: process.env.BASIC_AUTH_PASSWORD,
})
```

Then, add `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` environment variables to each environment that should enforce basic authentication. Any environment without those
environment variables will not enforce basic authentication.

## SSL

By default the Moovweb XDN only serves traffic over the `https` protocol. It automatically redirects `http` requests to the same URL, including any query strings, on `https`.

We strongly discourage the use of `http` protocol but if you *must* enable it then you can do so by adding `protocol: 'http'` to your route criteria. For example:

```js
// routes.js

// Respond to Let's Encrypt HTTP-01 challenge.
router.match({
  protocol: 'http',
  path: '/.well-known/acme-challenge/<your token>'
}, ({ send }) => {
  send('<token value>')
})
```

If you want the route to match both `http` and `https` protocols you can match on `protocol: /^https?$/`. If no route is matched on `http` protocol then the XDN will fallback on its default behavior of automatically redirecting the request to `https`.

Additionally:

* A request's protocol can be determined by reading the [`x-xdn-protocol`](request_headers#section_general_headers) request header or the [`request.secure`](/docs/api/core/interfaces/_router_request_.request.html#secure) property.
* During local development all requests will appear secure by default.  To test your router for `http` protocol matching you must either set the `xdn_emulate_local_http` cookie to `true` (if using a browser) or send an `x-xdn-protocol` request header set to `http`.

## Secrets

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`. To configure environment variables,
navigate to your environment, click _EDIT_, then under _Environment Variables_, click _ADD VARIABLE_.

![networking](/images/security/environment-variables.png)

As of XDN CLI version 2.19.0, when you deploy to an environment using a deploy token, for example by running `xdn deploy my-team --environment=production --token=(my token)` option, all environment variables are pulled down from the XDN Developer Console and applied to `process.env` so they can be accessed at build time. This allows you to store all of your build and runtime secrets in a single place, the XDN Developer Consoler, rather than storing some in your CI system's secret manager.

## Cache poisoning

[Cache poisoning attack](https://owasp.org/www-community/attacks/Cache_Poisoning) is described by OWASP as:

> The impact of a maliciously constructed response can be magnified if it is cached either by a web cache used by multiple users or even the browser cache of a single user. If a response is cached in a shared web cache, such as those commonly found in proxy servers, then all users of that cache will continue to receive the malicious content until the cache entry is purged.

To guard against this attack you must ensure that all the request parameters that influence the rendering of the content are part of your [custom cache key](caching#section_customizing_the_cache_key). The XDN will [automatically include](caching#section_cache_key) the `host` header and URL. Including other request headers and cookies are your responsibility.

For example, if you are rendering content based on a custom language cookie, then you must include it in your custom cache key:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path/depending/on/language/cookie', ({ cache }) => {
  cache({
    key: new CustomCacheKey().addCookie('language'),
    // Other options...
  })
})
```
