---
title: Website Security through EdgeJS
---

Use CDN-as-code (EdgeJS) to apply basic security to your website.

## Content Security Policy (CSP) {/*content-security-policy-csp*/}

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

You can easily add CSP headers to your site via a catch-all route near the top of your router.

**To enforce a content security policy:**

```js filename="./routes.js"
export default new Router().match({}, {
    headers: {
        set_response_headers: {
            "Content-Security-Policy":
            "default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi",
        },
    },
});
```

**To enable a content security policy in report-only mode:**

```js filename="./routes.js"
export default new Router().match({}, {
    headers: {
        set_response_headers: {
            "Content-Security-Policy-Report-Only": "default-src 'self'",
        },
    },
});
```
<!--## Basic Authentication {/*basic-authentication*/}

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

- A request's protocol can be determined by reading the [`{{ HEADER_PREFIX }}-protocol`](/applications/performance/request#request-headers) request header.
- During local development all requests will appear secure by default. To test your router for `http` protocol matching you must either set the `local_{{ COOKIE_PREFIX }}_emulate_http_protocol` cookie to `true` (if using a browser) or send an `{{ HEADER_PREFIX }}-protocol` request header set to `http`.
-->

## TLS Version {/*tls-version*/}

We recommend that you enable TLS 1.3, 1.2, or both on your web server(s).

**Key information:**
-   A recommended best practice is to disable support for SSL/TLS versions 1.1 or older.
-   TLS 1.3 improves security and performance of internet communications. Specifically, it eliminates known TLS 1.2 security vulnerabilities and prevents snooping and man-in-the-middle attacks.

## HTTP/1/2 Version {/*http12-version*/}

We support the following HTTP protocol versions for client requests to our network:
-   **HTTP/1:** {{ PRODUCT }} uses the HTTP protocol version defined in the request when proxying requests to an origin and in the response provided to the client.
-   **HTTP/2:** {{ PRODUCT }} uses the the HTTP/1.1 protocol when proxying requests to an origin and the HTTP/2 protocol for the response provided to the client.

<Callout type="info">

  {{ PRODUCT }} also supports HTTP/3 for the communication between the client and the edge of our network, but it requires enablement. Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to enable it on your account.

</Callout>

## Secrets {/*secrets*/}

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`.

**To configure environment variables**

1.  Navigate to the **Environment Variables** page.
    {{ ENV_NAV }} **Environment Variables**.
2.  Click **+ Add Environment Variable**.
3.  Set the **Key** option to the name of the desired environment variable. Use this name to reference the environment variable in your code.
4.  Set the **Value** option to the value that will replace references to this environment variable.
5.  If this environment variable contains sensitive information, mark the **Keep this value a secret** option.
6.  Click **Add variable**.

    Your new environment variable should now be listed.

    ![networking](/images/security/environment-variables.png?width=700)

Deploying to an environment using a deploy token pulls all environment variables and applies them to `process.env`. This allows these variables to be accessed at build time.

**Deploying with a deploy token example:** `{{ FULL_CLI_NAME }} deploy my-organization --environment=production --token=(my token)`

Use environment variables to store all of your build and runtime secrets in a single place, {{ PORTAL }}, rather than storing some in your CI system's secret manager.

## Cache Poisoning {/*cache-poisoning*/}

[Cache poisoning attack](https://owasp.org/www-community/attacks/Cache_Poisoning) is described by OWASP&reg; as:

> The impact of a maliciously constructed response can be magnified if it is cached either by a web cache used by multiple users or even the browser cache of a single user. If a response is cached in a shared web cache, such as those commonly found in proxy servers, then all users of that cache will continue to receive the malicious content until the cache entry is purged.

Guard against this type of attack by ensuring that all request parameters that influence content rendering are included within your [cache key](/applications/performance/caching/cache_key).

For example, if you are rendering content based on a custom language cookie, then you must include it in your custom cache key:

```js filename="./routes.js"
export default new Router().match("/language/specific/:path", {
    caching: {
        cache_key_rewrite: {
            source: "/language/specific/(.*)",
            destination: "/language/specific/$1-%{cookie_language}",
        },
    },
});
```
<!--
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

If the set of bots detected by {{ PRODUCT_NAME }} is not sufficient for your needs, you can easily add your own bot detection through [EdgeJS](/applications/performance/cdn_as_code) and its [`match`](/docs/v7.x/api/core/classes/router_Router.default.html#match) and [`setRequestHeader`](/docs/v7.x/api/core/classes/router_RouteHelper.default.html#setRequestHeader) APIs:

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
-->
