---
title: Common Routing Patterns
---

<Condition version="7">{{ROUTEHELPER}}</Condition>

This guide gives examples of common routing patterns using {{ PRODUCT_NAME }}.

## Proxying an Origin {/* proxying-an-origin */}

### Same Path {/* same-path */}

To forward a request to the same path on one of the backends listed in `{{ CONFIG_FILE }}`, use the `origin` feature:

```js
router.get('/some-path', {
  origin: {
    set_origin: 'origin',
  },
});
```

The first argument corresponds to the name of a backend in `{{ CONFIG_FILE }}`. For example:

```js
module.exports = {
  backends: {
    origin: {
      domainOrIp: 'my-shop.example.com',
      hostHeader: 'my-shop.example.com',
    },
  },
};
```

### Different Path {/* different-path */}

To forward the request to a different path, use the `url.url_rewrite` feature:

```js
router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  url: {
    url_rewrite: [
      {
        source: '/products/:productId',
        syntax: 'path-to-regexp',
        destination: '/p/:productId',
      },
    ],
  },
});
```

### Adding Caching {/* adding-caching */}

To cache proxied requests at the edge, use the `caching` feature:

```js
router.get('/products/:productId', {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1h',
  },
  origin: {
    set_origin: 'origin',
  },
});
```

### Altering the Request {/* altering-the-request */}

You can alter request headers when forwarding a request to a backend:

```js
router.get('/products/:productId', {
  headers: {
    set_request_headers: {
      'header-name': 'some-value',
    },
  },
  origin: {
    set_origin: 'origin',
  },
});
```

The above example makes use of the `headers.set_request_headers` feature.

### Altering the Response {/* altering-the-response */}

You can also alter the response before and after the cache:

```js
router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  headers: {
    // remove `header-name` from the origin response
    remove_origin_response_headers: ['header-name'],

    // add `header-name` to the response, appending the value to the
    // header if it already exists
    add_response_headers: {
      'header-name': 'some-value',
    },

    // set/overwrite `header-name` to `some-value` in the response
    set_response_headers: {
      'header-name': 'some-value',
    },

    // append `another-value` to `header-name` in the response,
    // becoming `some-value,another-value`
    set_response_headers: {
      '+header-name': ',another-value',
    },

    // remove `header-name` from the response by name
    remove_response_headers: ['header-name'],

    // or set with an empty value to remove `header-name` from the response
    set_response_headers: {
      'header-name': '',
    },
  },
});
```

Additional information on the `headers` feature can be found in the [Features](/guides/performance/rules/features#headers) guide.

#### Altering All Responses {/* altering-all-responses */}

You can also write catch-all routes that will alter all responses. One example where this is useful is injecting [Content Security Policy](/guides/security/security_suite#content-security-policy-csp) headers.

Another example is adding response headers for debugging, which is often useful if [{{ PRODUCT_NAME }} is behind another CDN](/guides/performance/traffic_splitting/a_b_testing#third-party-cdns) or if you are troubleshooting your router rules. For example, you could respond with the value of request `x-forwarded-for` into `x-debug-xff` to see the value that {{ PRODUCT_NAME }} is receiving from the CDN:

```js
router.match(
  {
    path: '/:path*',
    query: {
      my_site_debug: 'true',
    },
  },
  {
    headers: {
      set_response_headers: {
        'x-debug-xff': '%{http_x_forwarded_for}',
      },
    },
  }
);
```

The rules for interpolating the values of request and response objects can be found in the [routing](/guides/performance/cdn_as_code#embedded-values) guide.
Note that catch-all routes that alter headers, cookies, or caching can be placed at the start of your router while allowing subsequent routes to run because they alter the request or the response without actually sending a response. See [route execution](/guides/routing#route-execution) for more information on route execution order and sending responses.

### Manipulating Cookies {/* manipulating-cookies */}

You can manipulate cookies before they are sent to the browser using `headers.set_response_headers`:

```js
router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  headers: {
    // add cookie `foo=bar` to the response
    add_response_headers: {
      'set-cookie': 'foo=bar;',
    },
  },
});
```

### Adding Options to Cookies {/* adding-options-to-cookies */}

In addition to the name and value of the cookie, you can also add attributes to each cookie. For
information on possible cookie attributes, please refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

```js
import {serializeCookie} from '@edgio/core/utils/cookieUtils';

router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  headers: {
    // set cookie with options
    add_response_headers: {
      'set-cookie': 'foo=bar; Secure; HttpOnly;',
    },

    // set cookie with options using the serializeCookie helper
    add_response_headers: {
      'set-cookie': serializeCookie('foo', 'bar', {
        Secure: true,
        HttpOnly: true,
      }),
    },
  },
});
```

### Proxying to Different Backends Based on Different Host Names {/* proxying-to-different-backends-based-on-different-host-names */}

To proxy to different backends by matching the `host` header (e.g. different backends for different international sites):

```js
router
  .match(
    {
      path: '/:path*',
      headers: {
        host: 'yoursite.c1',
      },
    },
    {
      origin: {
        set_origin: 'country1-backend',
      },
    }
  )
  .match(
    {
      path: '/:path*',
      headers: {
        host: 'yoursite.c2',
      },
    },
    {
      origin: {
        set_origin: 'country2-backend',
      },
    }
  )
  .match(
    {
      path: '/:path*',
    },
    {
      origin: {
        set_origin: 'everybody-else-backend',
      },
    }
  );
```

## Serving a Static File {/* serving-a-static-file */}

To serve a specific file use the `origin.set_origin` feature with the `edgio_static` value:

```js
router.get('/favicon.ico', {
  caching: {
    max_age: '1d',
    client_max_age: '1h',
  },
  origin: {
    set_origin: 'edgio_static',
  },
  url: {
    url_rewrite: [
      {
        source: '/favicon.ico',
        syntax: 'path-to-regexp',
        destination: '/assets/favicon.ico',
      },
    ],
  },
});
```

## Serving Static Files From a Directory {/* serving-static-files-from-a-directory */}

Here's an example that serves all requests by sending the corresponding file in the `public` directory

```js
router.get('/:path*', {
  caching: {
    max_age: '1d',
    bypass_client_cache: true,
  },
  origin: {
    set_origin: 'edgio_static',
  },
  url: {
    url_rewrite: [
      {
        source: '/:path*',
        syntax: 'path-to-regexp',
        destination: '/public/:path*',
      },
    ],
  },
});
```

## Routing to Serverless {/* routing-to-serverless */}

If your request needs to be run on the serverless tier, you can use the `SERVERLESS_ORIGIN_NAME` origin to render your result using your application. Use this method to respond with an SSR or API result from your application:

```js
import {SERVERLESS_ORIGIN_NAME} from '@edgio/core/origins';

router.get('/some/:path*', {
  caching: {
    max_age: '1d',
    bypass_client_cache: true,
  },
  origin: {
    set_origin: SERVERLESS_ORIGIN_NAME,
  },
});
```

<!-- ### Falling Back to Server-side Rendering {/*falling-back-to-server-side-rendering*/}

If you render some but not all paths for a given route at build time, you can fall back to server side rendering using the `onNotFound` option. Add the `loadingPage`
option to display a loading page while server-side rendering is in progress.

```js
router.get('/products/:id', ({ serveStatic, cache, renderWithApp }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
  })
  serveStatic('dist/products/:id.html', {
    onNotFound: () => renderWithApp(),
    loadingPage: 'dist/products/loading.html',
  })
})
```

This hybrid of static and dynamic rendering was first introduced in Next.js as [Incremental Static Generation (ISG)](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required). In Next.js apps, developers enable this behavior by returning `fallback: true` from
`getStaticPaths()`. The `{{ PACKAGE_NAME }}/next` package automatically configures the routes for ISG pages to use `onNotFound` and `loadingPage`. -->

<!-- ### Returning a Custom 404 Page {/*returning-a-custom-404-page*/}

When a request matches a route with `serveStatic`, but no matching static asset exists, you can serve a custom 404 page using the `onNotFound` option.

```js
router.get('/products/:id', ({ serveStatic, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
  })
  serveStatic('dist/products/:id.html', {
    onNotFound: async () => {
      await serveStatic('/products/not-found.html', {
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    },
  })
})
``` -->

<!-- ## Responding with a String Response Body {/*responding-with-a-string-response-body*/}

To respond with a simple, constant string as the response body use the `response.set_response_body` feature:

```js
router.get('/some-path', {
  caching: {
    max_age: "1d"
  },
  headers: {
    set_response_headers: {
      "Content-Type": "text/html"
    }
  },
  response: {
    set_done: true,
    set_response_body: `
      <!doctype html>
      <html>
        <body>Hello World</body>
      </html>`
  }
})
``` -->

<!-- To compute a dynamic response use the [`compute`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute) method:

```js
router.get('/hello/:name', ({ cache, setResponseHeader, compute, send }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  setResponseHeader('Content-Type', 'text/html')
  compute((request, response) => {
    send(`
      <!doctype html>
      <html>
        <body>Hello ${request.params.name}</body>
      </html>
    `)
  })
})
``` -->

## Redirecting {/* redirecting */}

To redirect the browser to a different URL, use the `url.url_redirect` feature, optionally specifying the HTTP status code:

```js
router.get('/p/:productId', {
  url: {
    url_redirect: {
      code: 301,
      source: '/p/:productId',
      syntax: 'path-to-regexp',
      destination: '/products/:productId',
    },
  },
});
```

<!-- If you need to compute the destination with sophisticated logic:

```js
router.get('/p/:productId', ({ redirect, compute, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  compute(async request => {
    const destination = await getDestinationFromMyAPI(request.params.productId)
    redirect(destination)
  })
})
``` -->

### Redirecting All Traffic to a Different Domain {/* redirecting-all-traffic-to-a-different-domain */}

```js
// Redirect all traffic except those with host header starting with www. to www.mydomain.com
router.match(
  {headers: {host: /^(?!www\.).*$/}},
  {
    url: {
      url_redirect: {
        code: 302,
        destination: 'https://www.mydomain.com${path}',
      },
    },
  }
);

// Redirect all traffic from www.domain.com to domain.com
router.match(
  {headers: {host: /^(www\.).*$/}},
  {
    url: {
      url_redirect: {
        code: 302,
        destination: 'https://domain.com${path}',
      },
    },
  }
);
```

## Blocking Unwanted Traffic {/* blocking-unwanted-traffic */}

### Blocking traffic from specific countries {/* blocking-traffic-from-specific-countries */}

If you need to block all traffic from a specific country or set of countries, you can do so by matching requests by the [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) geolocation header:

```js
router.get({
  if: [
    {
      or: [
        {
          '===': [
            {
              location: 'country',
            },
            'XX',
          ],
        },
        {
          or: [
            {
              '===': [
                {
                  location: 'country',
                },
                'XY',
              ],
            },
            {
              '===': [
                {
                  location: 'country',
                },
                'XZ',
              ],
            },
          ],
        },
      ],
    },
    {
      access: {
        deny_access: true,
      },
    },
  ],
});
```

You can find more about geolocation headers [here](/guides/performance/request#request-headers).

<!-- TODO need support for regex client IP matching
### Allowing Specific IPs {/*allowing-specific-ips*/}

If you need to block all traffic except requests that originate from specific IP addresses, you can do so by matching requests by the [{{ HEADER_PREFIX }}-client-ip](/guides/request_headers#general-headers) header:

```js
router.get(
  {
    "headers": {
      // Regex that will do a negative lookahead for IPs you want to allow.
      // In this example 172.16.16.0/24 and 10.10.10.3/32 will be allowed and everything else will receive a 403
      '{{ HEADER_PREFIX }}-client-ip': /\b((?!172\.16\.16)(?!10.10.10.3)\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
    },
  }, {
  response: {
    set_done: true,
    set_response_body: "Blocked",
    set_status_code: 403
  }
})
``` -->

### Blocking Search Engine Crawlers {/* blocking-search-engine-crawlers */}

If you need to block all search engine bot traffic to specific environments (such as your default or staging environment), the easiest way is to include the `x-robots-tag` header with the same directives you would otherwise set in a `meta` tag.

<!--
<Callout type="info">

  The search engine traffic is automatically blocked on {{ PRODUCT }} edge links and permalinks as of {{ PRODUCT }} v6.

  If you would like to enable indexing on those links, you need to pass `{ indexPermalink: true }` into the Router constructor in `routes.js` file:
  ```js
    new Router({ indexPermalink: true })
  ```

  Otherwise, {{ PRODUCT }} will match requests with the `host` header matching `/{{ LINK_DOMAIN }}|{{ PERMALINK_DOMAIN }}/` and set a response header of `x-robots-tag: noindex`.


</Callout> -->

Additionally, you can customize this to block traffic to development or staging websites based on the `host` header of the request:

```js
router.get(
  {
    headers: {
      // Regex to catch multiple hostnames
      host: /dev.example.com|staging.example.com/,
    },
  },
  {
    headers: {
      set_response_headers: {
        'x-robots-tag': 'noindex',
      },
    },
  }
);
```

For other available directives, see [Google Developer Central](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives) and [Bing Webmaster Tools](https://www.bing.com/webmasters/help/which-robots-metatags-does-bing-support-5198d240) for lists of supported options.
