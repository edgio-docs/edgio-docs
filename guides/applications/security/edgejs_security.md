---
title: Website Security through EdgeJS
---

Use CDN-as-code (EdgeJS) to apply basic security to your website.

## Content Security Policy (CSP) {/*content-security-policy-csp*/}

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

You can easily add CSP headers to your site via a catch-all route near the top of your router.

**To enforce a content security policy:**

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader(
    'Content-Security-Policy',
    "default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi",
  )
})
// The rest of your router...
```

**To enable a content security policy in report-only mode:**

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Content-Security-Policy-Report-Only', "default-src 'self'")
})
// The rest of your router...
```

## Basic Authentication {/*basic-authentication*/}

You can add basic authentication to your site using the `requireBasicAuth` router method. For example, add the following to the top of your router:

```js
router.requireBasicAuth({
  username: process.env.BASIC_AUTH_USERNAME,
  password: process.env.BASIC_AUTH_PASSWORD,
})
```

Then, add `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` environment variables to each environment that should enforce
basic authentication. Any environment without those environment variables will not enforce basic authentication.

Once deployed, the router will return 403 Forbidden for requests that have the incorrect basic authentication token, and 401 Unauthorized for requests that have no basic authentication token.

## SSL {/*ssl*/}

By default {{ PRODUCT_NAME }} only serves traffic over the `https` protocol. It automatically redirects `http` requests to the same URL, including any query strings, on `https`.

We strongly discourage the use of `http` protocol, but if you _must_ enable it, then you can do so by adding `protocol: 'http'` to your route criteria. For example:

```js
// routes.js

// Respond to Let's Encrypt HTTP-01 challenge.
router.match(
  {
    protocol: 'http',
    path: '/.well-known/acme-challenge/<your token>',
  },
  ({ send }) => {
    send('<token value>')
  },
)
```

If you want the route to match both `http` and `https` protocols you can match on `protocol: /^https?$/`. If no route is matched on `http` protocol then {{ PRODUCT_NAME }} will fallback on its default behavior of automatically redirecting the request to `https`.

Additionally:

- A request's protocol can be determined by reading the [`{{ HEADER_PREFIX }}-protocol`](/applications/performance/request#request-headers) request header or the [`request.secure`](/docs/api/core/interfaces/_router_request_.request.html#secure) property.
- During local development all requests will appear secure by default. To test your router for `http` protocol matching you must either set the `local_{{ COOKIE_PREFIX }}_emulate_http_protocol` cookie to `true` (if using a browser) or send an `{{ HEADER_PREFIX }}-protocol` request header set to `http`.

**What is the minimum level of encryption?** 

{{ PRODUCT_NAME }} enforces a minimum version of TLS 1.2 or higher.

## HTTP/1/2 Version {/*http12-version*/}

The incoming HTTP version is independent of the upstream HTTP version. We support HTTP/1 or HTTP/2 on ingress requests. We prioritize HTTP/2 to origin servers. If the origin server does not support the incoming HTTP version (say version HTTP/2 came in but origin only supports HTTP/1), we will downgrade to successfully complete the request, but the outgoing response will return to HTTP/2.

## Secrets {/*secrets*/}

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`. To configure environment variables,
navigate to your environment, click _EDIT_, then under Environment Variables, click _ADD VARIABLE_.

![networking](/images/security/environment-variables.png?width=700)

As of {{ PRODUCT_NAME }} CLI version 2.19.0, when you deploy to an environment using a deploy token, for example by running `{{ CLI_NAME }} deploy my-team --environment=production --token=(my token)` option, all environment variables are pulled down from the {{ PORTAL }} and applied to `process.env` so they can be accessed at build time. This allows you to store all of your build and runtime secrets in a single place, {{ PORTAL }}, rather than storing some in your CI system's secret manager.

## Cache Poisoning {/*cache-poisoning*/}

[Cache poisoning attack](https://owasp.org/www-community/attacks/Cache_Poisoning) is described by OWASP&reg; as:

> The impact of a maliciously constructed response can be magnified if it is cached either by a web cache used by multiple users or even the browser cache of a single user. If a response is cached in a shared web cache, such as those commonly found in proxy servers, then all users of that cache will continue to receive the malicious content until the cache entry is purged.

To guard against this attack you must ensure that all the request parameters that influence the rendering of the content are part of your [custom cache key](/applications/performance/caching#section_customizing_the_cache_key). {{ PRODUCT_NAME }} will [automatically include](/applications/performance/caching#section_cache_key) the `host` header and URL. Including other request headers and cookies are your responsibility.

For example, if you are rendering content based on a custom language cookie, then you must include it in your custom cache key:

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path/depending/on/language/cookie', ({ cache }) => {
  cache({
    key: new CustomCacheKey().addCookie('language'),
    // Other options...
  })
})
```

## Bot Detection {/*bot-detection*/}

{{ PRODUCT_NAME }} examines the `user-agent` header in an incoming request to determine if it includes a string that indicates if it is a bot, and if so, injects `1` in the `{{ HEADER_PREFIX }}-device-is-bot` request header, which will be visible to your server code. If the `user-agent` header does not include any of the strings indicating a bot, a `0` value is injected.

### User Agents and Bots {/*user-agents-and-bots*/}

The following table list the user agents that {{ PRODUCT_NAME }} examines and describes the corresponding bots.

| User Agent              | Bot Description                                                                                                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| embedly                 | Embed.ly web crawler bot that performs HTTP requests most often in automatic mode.                                                                                                                                                              |
| facebookexternalhit     | Facebook bot that crawls the HTML of social plugins, apps, and websites shared on Facebook. The bot gathers and caches data (title, description, thumbnail image) about the shared content and presents the data as a preview.                  |
| flipboard               | Flipboard Proxy Service bot that runs in response to a user request for the service to scan a social media feed such as Twitter, and construct a processed feed of items to deliver in real time.                                               |
| googlepagesspeed        | Google bot that assists in ranking search results based on page load speed.                                                                                                                                                                     |
| Google web/snippet      | Google+ Enterprise bot that extracts high-level data from a URL posted on Google+ Enterprise and presents the data as a snippet of the URL.                                                                                                     |
| headless                | Bots, usually scripts, that run on a scheduled basis or are triggered from an external system. Headless bots usually perform activities like sending alerts or daily digest messages. The scripts usually run for a short time, then terminate. |
| ia_archiver             | Amazon Alexa bot that crawls web sites for issues related to Amazon's Site Audit service.                                                                                                                                                       |
| outbrain                | Outbrain Recommendation Platform chat bot.                                                                                                                                                                                                      |
| pinterest               | Automated Pinterest bot that creates boards and schedules pins to post to customer accounts.                                                                                                                                                    |
| prerender               | Prerender.io hosted service bot that produces an easily crawled version of dynamically rendered pages, allowing indexing by search engines.                                                                                                     |
| preview                 | Yahoo bot that extracts data (title, description, thumbnail images) from a URL embedded in an email and presents the data as a preview of the URL                                                                                               |
| qwantify                | Web crawler bot that indexes content for the Qwant search engine.                                                                                                                                                                               |
| scanner                 | Bots that analyze how well your website and its security measures respond to various bot threats.                                                                                                                                               |
| slurp                   | Yahoo Search bot for crawling and indexing web page information.                                                                                                                                                                                |
| spider                  | General purpose automated bots that crawl the web to index web page information.                                                                                                                                                                |
| tumblr                  | Tumblr bot that performs automated HTTP requests as a web crawler.                                                                                                                                                                              |
| vkshare                 | VK social network bot that performs automated HTTP requests usually as a web crawler.                                                                                                                                                           |
| w3c_validator           | W3C bot that checks Web documents in formats like HTML and XHTML for conformance to W3C Recommendations and other standards.                                                                                                                    |
| whatsapp                | Whatsapp platform chat bot.                                                                                                                                                                                                                     |
| xing-contenttabreceiver | Xing social network crawler bot that indexes content for the Xing social network.                                                                                                                                                               |
| yahoo                   | Another Yahoo Search robot for crawling and indexing web page information.                                                                                                                                                                      |

If the set of bots detected by {{ PRODUCT_NAME }} is not sufficient for your needs, you can easily add your own bot detection through [EdgeJS](/applications/routing) and its [`match`](/docs/api/core/classes/_router_router_.router.html#match) and [`setRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#setrequestheader) APIs:

```js
router.match(
  {
    headers: {
      'user-agent': /^regex-for-your-bot-detection$/i,
    },
  },
  ({ setRequestHeader }) => {
    setRequestHeader('my-bot-detection-is-bot', '1')
  },
)
// ... all your other routes go here and they can match on `my-bot-detection-is-bot: 1`
```

The above code will match all the routes that even have a `user-agent` header and then inject the `my-bot-detection-is-bot` when the value of the user agent header matches the given regex. Once the header has been injected, the later routes can test for it and implement bot handling. Or, you could just let the header be sent upstream for your backend to handle it.
