## Security

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
```

To enable a content security policy in report-only mode:

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Content-Security-Policy-Report-Only', "default-src 'self'")
})
```

## SSL

The Moovweb XDN only accepts traffic over `https`. It automatically redirects `http` requests to the same URL on `https`.

## Secrets

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`. To configure environment variables,
navigate to your environment, click _EDIT_, then under _Environment Variables_, click _ADD VARIABLE_.

![networking](/images/security/environment-variables.png)
