# Serverless Functions

Layer0 makes it easy to develop, test, and deploy serverless functions without a JavaScript framework. Simply declare your routes and use the `compute` function or `proxy` with the `transformResponse` option to compute responses based on your own custom logic.

## Getting Started

To create a new Layer0 project using serverless functions, run:

```bash
npx @layer0/cli@latest init
```

## Responding to requests

Use the [compute](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute) function to generate a synthetic response:

```js
// routes.ts
import { Router } from '@layer0/core'

export default new Router().get('/some-route/:someParam', ({ compute }) => {
  compute((req, res) => {
    // Here you can access the following information about the request:
    // ================================================================

    // To get the request path and query string
    const url = req.url // e.g /some/path?foo=bar

    // To get the request body as a string
    const body = req.body

    // To get the request method:
    const method = req.method

    // To get the headers sent from the browser:
    const headers = res.getHeaders() // keys are always lower-case

    // To get the value of a specific request header:
    const someHeader = req.getHeader('some-header') // the header name is case-insensitive

    // To check if https was used
    const isHttps = req.secure

    // To access query parameters
    const { id, name } = req.query // for example if the query string is ?id=1&name=Mark

    // To access path parameters:
    const { someParam } = req.params

    // To specify the response:
    // ================================================================

    // To set a response header:
    res.setHeader('content-type', 'application/json')

    // To set the response body, use:
    res.body = 'some string'

    // To set the response status:
    res.statusCode = 200
    res.statusMessage = 'OK'
  })
})
```

See [ResponseWriter](/docs/api/core/classes/_router_responsewriter_.responsewriter.html) for all of the functions that you can call when responding to a request.

## Modifying a response from the origin

Serverless functions can be used to modify responses from the origin by using the `proxy` function with the `transformResponse` option. First, configure an origin by adding a `backend` to `layer0.config.js` in the root of your project:

```js
// layer0.config.js
module.exports = {
  backends: {
    origin: {
      // The domain name or IP address for the origin server
      domainOrIp: 'origin.example.com',

      // Optionally set a host header for Layer0 to send when connecting to the origin.
      // If omitted, the host header will be forwarded from the browser.
      hostHeader: 'origin.example.com',
    },
  },
}
```

See [backends](/guides/layer0_config#section_backends) for more configuration options.

To forward a request to the origin and modify the response using a serverless function:

```js
// routes.ts
import { Router } from '@layer0/core'

export default new Router().get('/some-route/:someParam', ({ proxy }) => {
  proxy('origin', {
    transformRequest: req => {
      // You can optionally transform the request before it is sent to the origin
      // Here you can modify the following information about the request:
      // ================================================================

      // To alter the request URL:
      req.url = '/some/path?foo=bar'

      // To alter the request body:
      req.body = JSON.stringify({ foo: 'bar' })

      // To alter the request method:
      req.method = 'POST'

      // To get the headers sent from the browser:
      const headers = res.getHeaders()

      // To get the value of an incoming request header:
      const someHeader = req.getHeader('some-header') // the header name is case-insensitive

      // To set a request header:
      req.setHeader('content-type', 'application/json') // the header name is case-insensitive

      // To remove a request header:
      req.removeHeader('some-header') // the header name is case-insensitive

      // To access query parameters
      const { id, name } = req.query // for example if the query string is ?id=1&name=Mark

      // To access path parameters:
      const { someParam } = req.params
    },
    transformResponse: (res, req) => {
      // To access or modify the body, use:
      res.body = 'some string'

      // To set a header:
      res.setHeader('content-type', 'application/json') // the header name is case-insensitive

      // To remove a header:
      res.removeHeader('some-header') // the header name is case-insensitive

      // To get the headers returned from the origin. Keys are always lower case
      const headers = res.getHeaders()

      // To get a specific header returned from the origin:
      const cookie = res.getHeader('cookie') // the header name is case-insensitive
    },
  })
})
```

You can also access any of the request fields documented in [Responding to requests](#section_responding_to_requests).

## Caching Responses

To improve performance and minimize cost, cache the responses returned by your serverless functions whenever possible:

```js
// routes.ts
import { Router } from '@layer0/core'

export default new Router().get('/', ({ cache, compute }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60, // cache for one hour at the edge
      staleWhileRevalidateSeconds: 60 * 60 * 24, // and continue to serve stale responses for up to 24 hours while fetching a fresh response
    },
  })
  compute((req, res) => {
    res.setHeader('content-type', 'application/json')
    res.body = JSON.stringify({ message: 'Hello World!' })
  })
})
```

See the [cache](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#cache) function for more options.

## Running your project locally

To test your project locally, run:

```
0 dev
```

This will start your project in watch mode. Any changes your make to your source code will instantly take effect without restarting.

## Deploying your project to Layer0

To deploy your project, run:

```
0 deploy
```

## Limits

Layer0 serverless functions have a maximum runtime of 20 seconds per request. If a function exceeds this limit, Layer0 will respond with a 539 status.

See [Limits](/guides/limits#section_request_and_response_limits) for more information.
