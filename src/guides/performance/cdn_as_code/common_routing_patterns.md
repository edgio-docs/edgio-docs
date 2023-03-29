---
title: Common Routing Patterns
---

This guide gives examples of common routing patterns using {{ PRODUCT_NAME }}.

## Proxying an Origin {/*proxying-an-origin*/}

### Same Path {/*same-path*/}

To forward a request to the same path on one of the backends listed in `{{ CONFIG_FILE }}`, use the [`proxy`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#proxy) method of `ResponseWriter`:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/some-path"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "origin": {
          "set_origin": "origin"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

The first argument corresponds to the name of a backend in `{{ CONFIG_FILE }}`. For example:

```js
module.exports = {
  backends: {
    origin: {
      domainOrIp: 'my-shop.example.com',
      hostHeader: 'my-shop.example.com',
    },
  },
}
```

### Different Path {/*different-path*/}

To forward the request to a different path, use the [`path`](/docs/api/core/interfaces/_router_responsewriter_.proxyoptions.html#path) option of the `ProxyOptions` interface:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/products/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "origin": {
          "set_origin": "origin"
        },
        "url": {
          "url_rewrite": [
            {
              "source": "/products/:productId:optionalSlash(\\/?)?:optionalQuery(\\?.*)?",
              "syntax": "path-to-regexp",
              "destination": "/p/:productId:optionalSlash:optionalQuery"
            }
          ]
        }
      }
    ]
  }
]
```
</RawEdgeJS>

### Adding Caching {/*adding-caching*/}

To cache proxied requests at the edge, use the [`cache`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#cache) method.

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/products/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "86400s",
          "stale_while_revalidate": "3600s"
        },
        "origin": {
          "set_origin": "origin"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

### Altering the Request {/*altering-the-request*/}

You can alter request headers when forwarding a request to a backend:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/products/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "headers": {
          "set_request_headers": {
            "header-name": ""
          }
        },
        "origin": {
          "set_origin": "origin"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

The above example makes use of [`setRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#setrequestheader), [`updateRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#updaterequestheader), and [`removeRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#removerequestheader) API calls.

### Altering the Response {/*altering-the-response*/}

You can also alter the response before and after the cache:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/products/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "origin": {
          "set_origin": "origin"
        },
        "headers": {
          "set_response_headers": {
            "header-name": "%{resp_header-name//(?i)some-.*-part/some-replacement}"
          },
          "remove_response_headers": [
            "header-name"
          ]
        }
      }
    ]
  }
]
```
</RawEdgeJS>

#### Altering All Responses {/*altering-all-responses*/}

You can also write catch-all routes that will alter all responses. One example where this is useful is injecting [Content Security Policy](/guides/security/security_suite#content-security-policy-csp) headers.

Another example is adding response headers for debugging, which is often useful if [{{ PRODUCT_NAME }} is behind another CDN](/guides/performance/traffic_splitting/a_b_testing#third-party-cdns) or if you are troubleshooting your router rules. For example, you could respond with the value of request `x-forwarded-for` into `x-debug-xff` to see the value that {{ PRODUCT_NAME }} is receiving from the CDN:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/:path*"
            ]
          },
          {
            "===": [
              {
                "request.origin_query": "my_site_debug"
              },
              "true"
            ]
          }
        ]
      },
      {
        "headers": {
          "set_response_headers": {
            "x-debug-xff": "${req:x-forwarded-for}"
          }
        }
      }
    ]
  }
]
```
</RawEdgeJS>

The rules for interpolating the values of request and response objects can be found in the [routing](/guides/performance/cdn_as_code#embedded-values) guide.
Note that catch-all routes that alter headers, cookies, or caching can be placed at the start of your router while allowing subsequent routes to run because they alter the request or the response without actually sending a response. See [route execution](/guides/routing#route-execution) for more information on route execution order and sending responses.

<!-- ### Manipulating Cookies {/*manipulating-cookies*/}

You can manipulate cookies before they are sent to the browser using cookie response API calls like [`addResponseCookie`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#addresponsecookie):

```js
router.get('/some/path', ({
  addUpstreamResponseCookie,
  addResponseCookie,
  removeResponseCookie,
  removeUpstreamResponseCookie,
  updateResponseCookie
  updateUpstreamResponseCookie,
  proxy
}) => {
  proxy('origin')

  // applied before the cache
  addUpstreamResponseCookie('cookie-to-add', 'cookie-value')
  removeUpstreamResponseCookie('cookie-to-remove')
  updateUpstreamResponseCookie('cookie-to-alter', /Domain=.+;/, 'Domain=mydomain.com;')

  // applied after the cache
  addResponseCookie('cookie-to-add', 'cookie-value')
  removeResponseCookie('cookie-to-remove')
  updateResponseCookie('cookie-to-alter', /Domain=.+;/, 'Domain=mydomain.com;')
})
```

### Adding Options to Cookies {/*adding-options-to-cookies*/}

In addition to the name and value of the cookie, you can also add attributes to each cookie. For
information on possible cookie attributes, please refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

```js
router.get('/some/path', ({ addUpstreamResponseCookie, addResponseCookie, proxy }) => {
  proxy('origin')

  addUpstreamResponseCookie('cookie-to-add', 'cookie-value', {
    domain: 'test.com',
  })

  addResponseCookie('cookie-to-add', 'cookie-value', { 'max-age': 50000 })
})
``` -->

### Proxying to Different Backends Based on Different Host Names {/*proxying-to-different-backends-based-on-different-host-names*/}

To proxy to different backends by matching the `host` header (e.g. different backends for different international sites):

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/:path*"
            ]
          },
          {
            "===": [
              {
                "request.header": "host"
              },
              "yoursite.c1"
            ]
          }
        ]
      },
      {
        "origin": {
          "set_origin": "country1-backend"
        }
      }
    ]
  },
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/:path*"
            ]
          },
          {
            "===": [
              {
                "request.header": "host"
              },
              "yoursite.c2"
            ]
          }
        ]
      },
      {
        "origin": {
          "set_origin": "country2-backend"
        }
      }
    ]
  },
  {
    "if": [
      {
        "==": [
          {
            "request": "path"
          },
          "/:path*"
        ]
      },
      {
        "origin": {
          "set_origin": "everybody-else-backend"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

## Serving a Static File {/*serving-a-static-file*/}

To serve a specific file use the [`serveStatic`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#servestatic) API:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/favicon.ico"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "30758400s",
          "client_max_age": "86400s"
        },
        "url": {
          "url_rewrite": [
            {
              "source": "/favicon.ico:optionalSlash(\\/?)?:optionalQuery(\\?.*)?",
              "syntax": "path-to-regexp",
              "destination": "/assets/favicon.ico:optionalSlash:optionalQuery"
            }
          ]
        },
        "headers": {
          "set_request_headers": {
            "x-edg-serverless-hint": ""
          }
        },
        "origin": {
          "set_origin": "edgio_static"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

## Serving Static Files From a Directory {/*serving-static-files-from-a-directory*/}

Here's an example that serves all requests by sending the corresponding file in the `public` directory

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/:path*"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "30758400s",
          "bypass_client_cache": true
        },
        "url": {
          "url_rewrite": [
            {
              "source": "/:path*:optionalSlash(\\/?)?:optionalQuery(\\?.*)?",
              "syntax": "path-to-regexp",
              "destination": "/public/:path*:optionalSlash:optionalQuery"
            }
          ]
        },
        "headers": {
          "set_request_headers": {
            "x-edg-serverless-hint": ""
          }
        },
        "origin": {
          "set_origin": "edgio_static"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

## Routing to Serverless {/*routing-to-serverless*/}

If your request needs to be run on the serverless tier, you can use the `renderWithApp` handler to render your result using your application. Use this method to respond with an SSR or API result from your application.

Example using the `renderWithApp` handler:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/some/:path*"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "86400s",
          "bypass_client_cache": true
        },
        "headers": {
          "set_request_headers": {
            "+x-edg-serverless-hint": "app"
          }
        },
        "origin": {
          "set_origin": "edgio_serverless"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

### Falling Back to Server-side Rendering {/*falling-back-to-server-side-rendering*/}

If you render some but not all paths for a given route at build time, you can fall back to server side rendering using the `onNotFound` option. Add the `loadingPage`
option to display a loading page while server-side rendering is in progress.

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/products/:id"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "30758400s"
        },
        "url": {
          "url_rewrite": [
            {
              "source": "/products/:id:optionalSlash(\\/?)?:optionalQuery(\\?.*)?",
              "syntax": "path-to-regexp",
              "destination": "/dist/products/:id.html:optionalSlash:optionalQuery"
            }
          ]
        },
        "headers": {
          "set_request_headers": {
            "x-edg-serverless-hint": ""
          }
        },
        "origin": {
          "set_origin": "edgio_static"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

This hybrid of static and dynamic rendering was first introduced in Next.js as [Incremental Static Generation (ISG)](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required). In Next.js apps, developers enable this behavior by returning `fallback: true` from
`getStaticPaths()`. The `{{ PACKAGE_NAME }}/next` package automatically configures the routes for ISG pages to use `onNotFound` and `loadingPage`.

### Returning a Custom 404 Page {/*returning-a-custom-404-page*/}

When a request matches a route with `serveStatic`, but no matching static asset exists, you can serve a custom 404 page using the `onNotFound` option.

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/products/:id"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "30758400s"
        },
        "url": {
          "url_rewrite": [
            {
              "source": "/products/:id:optionalSlash(\\/?)?:optionalQuery(\\?.*)?",
              "syntax": "path-to-regexp",
              "destination": "/dist/products/:id.html:optionalSlash:optionalQuery"
            }
          ]
        },
        "headers": {
          "set_request_headers": {
            "x-edg-serverless-hint": ""
          }
        },
        "origin": {
          "set_origin": "edgio_static"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

## Responding with a String Response Body {/*responding-with-a-string-response-body*/}

To respond with a simple, constant string as the response body use the [`send`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#send) method:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/some-path"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "86400s"
        },
        "headers": {
          "set_response_headers": {
            "Content-Type": "text/html"
          }
        },
        "response": {
          "set_done": false,
          "set_response_body": "\n    <!doctype html>\n    <html>\n      <body>Hello World</body>\n    </html>\n  "
        }
      }
    ]
  }
]
```
</RawEdgeJS>

To compute a dynamic response use the [`compute`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute) method:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/hello/:name"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "86400s"
        },
        "headers": {
          "set_response_headers": {
            "Content-Type": "text/html"
          },
          "set_request_headers": {
            "+x-edg-serverless-hint": "compute:0"
          }
        },
        "origin": {
          "set_origin": "edgio_serverless"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

## Redirecting {/*redirecting*/}

To redirect the browser to a different URL, use the [`redirect`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#redirect) API:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/p/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "url": {
          "url_redirect": {
            "code": 301,
            "source": "/p/:productId:optionalSlash(\\/?)?:optionalQuery(\\?.*)?",
            "syntax": "path-to-regexp",
            "destination": "/products/:productId"
          }
        }
      }
    ]
  }
]
```
</RawEdgeJS>

If you need to compute the destination with sophisticated logic:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/p/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "86400s"
        },
        "headers": {
          "set_request_headers": {
            "+x-edg-serverless-hint": "compute:0"
          }
        },
        "origin": {
          "set_origin": "edgio_serverless"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

### Redirecting All Traffic to a Different Domain {/*redirecting-all-traffic-to-a-different-domain*/}

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "=~": [
          {
            "request.header": "host"
          },
          "^(?!www\\.).*$"
        ]
      },
      {
        "url": {
          "url_redirect": {
            "code": 302,
            "destination": "https://www.mydomain.com${path}"
          }
        }
      }
    ]
  }
]
```
</RawEdgeJS>

## Blocking Unwanted Traffic {/*blocking-unwanted-traffic*/}

### Blocking traffic from specific countries {/*blocking-traffic-from-specific-countries*/}

If you need to block all traffic from a specific country or set of countries, you can do so by matching requests by the [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) geolocation header:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          },
          {
            "=~": [
              {
                "request.header": "{{ HEADER_PREFIX }}-geo-country-code"
              },
              "XX|XY|XZ"
            ]
          }
        ]
      },
      {
        "response": {
          "set_done": false,
          "set_response_body": "Blocked",
          "set_status_code": 403
        }
      }
    ]
  }
]
```
</RawEdgeJS>

You can find more about geolocation headers [here](/guides/request_headers).

### Allowing Specific IPs {/*allowing-specific-ips*/}

If you need to block all traffic except requests that originate from specific IP addresses, you can do so by matching requests by the [{{ HEADER_PREFIX }}-client-ip](/guides/request_headers#general-headers) header:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          },
          {
            "=~": [
              {
                "request.header": "{{ HEADER_PREFIX }}-client-ip"
              },
              "\\b((?!172\\.16\\.16)(?!10.10.10.3)\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})\\b"
            ]
          }
        ]
      },
      {
        "response": {
          "set_done": false,
          "set_response_body": "Blocked",
          "set_status_code": 403
        }
      }
    ]
  }
]
```
</RawEdgeJS>

### Blocking Search Engine Crawlers {/*blocking-search-engine-crawlers*/}

If you need to block all search engine bot traffic to specific environments (such as your default or staging environment), the easiest way is to include the `x-robots-tag` header with the same directives you would otherwise set in a `meta` tag. 

<!-- <Callout type="info">

  The search engine traffic is automatically blocked on {{ PRODUCT }} edge links and permalinks as of {{ PRODUCT }} v6.

  If you would like to enable indexing on those links, you need to pass `{ indexPermalink: true }` into the Router constructor in `routes.js` file:
  ```js
    new Router({ indexPermalink: true })
  ```
  
  Otherwise, {{ PRODUCT }} will match requests with the `host` header matching `/{{ LINK_DOMAIN }}|{{ PERMALINK_DOMAIN }}/` and set a response header of `x-robots-tag: noindex`.
    

</Callout> -->

Additionally, you can customize this to block traffic to development or staging websites based on the `host` header of the request:

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          },
          {
            "=~": [
              {
                "request.header": "host"
              },
              "dev.example.com|staging.example.com"
            ]
          }
        ]
      },
      {
        "headers": {
          "set_response_headers": {
            "x-robots-tag": "noindex"
          }
        }
      }
    ]
  }
]
```
</RawEdgeJS>

For other available directives, see [Google Developer Central](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives) and [Bing Webmaster Tools](https://www.bing.com/webmasters/help/which-robots-metatags-does-bing-support-5198d240) for lists of supported options.
