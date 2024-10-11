---
title: Cloud Functions
---

{{ROUTEHELPER.md}}

{{ PRODUCT }} makes it easy to develop, test, and deploy Cloud Functions without a JavaScript framework. Simply declare your routes and use the `compute`, or `proxy` with the `transformResponse` option, methods to compute responses based on your own custom logic.

## Availability {/* availability */}

{{ PRODUCT }} allows you to cache and deliver your content through any of our points of presence (POPs) around the world. However, your serverless code will be computed within one of the following global regions:

- **Americas**: Eastern US and Western US
- **Europe**: Ireland, UK, Western Europe, Northern Europe, Central Europe
- **Asia**: Japan
- **Oceania**: Australia

<Callout type="info">

Enterprise customers may choose the region where their workloads will run. Alternatively, if you are using our free tier, then your workloads will run in the Eastern US region.

</Callout>

{{ PRODUCT }} ensures high availability for your computing workloads by:

- Running your code within two separate data centers.
- Setting up automatic DNS failover between those data centers.
- Load balancing computing requests between redundant processes.
- Applying an Origin Shield to our Cloud Functions workers. If your compute requests are cacheable, then this allows more requests to be served from cache.

{{ PREREQ.md }}

## Getting Started {/* getting-started */}

Run the following command to create an  {{ PRODUCT }} project that supports Cloud Functions:

```bash
npx {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }} init \
  {{ INIT_ARG_EDGIO_VERSION }}
```

<!--
Or you can clone this example repo: [layer0-serverless-example](https://github.com/edgio-docs/edgio-serverless-example), which has some more complex examples of how to use Cloud Functions:

```bash
npx degit https://github.com/edgio-docs/edgio-serverless-example my-serverless-functions
```
-->

## Responding to requests {/* responding-to-requests */}

Use the [compute](/docs/v7.x/api/core/classes/router_RouteHelper.default.html#compute) method to generate a synthetic response:

```js
// routes.js
import {Router} from '{{ PACKAGE_NAME }}/core';

export default new Router().get('/some-route/:someParam', ({compute}) => {
  compute((req, res) => {
    // Here you can access the following information about the request:
    // ================================================================

    // To get the request path and query string
    const url = req.url; // e.g /some/path?foo=bar

    // To get the request body as a string
    const body = req.body;

    // To get the request method:
    const method = req.method;

    // To get the headers sent from the browser:
    const headers = req.getHeaders(); // keys are always lower-case

    // To get the value of a specific request header:
    const someHeader = req.getHeader('some-header'); // the header name is case-insensitive

    // To check if https was used
    const isHttps = req.secure;

    // To access query parameters
    const {id, name} = req.query; // for example if the query string is ?id=1&name=Mark

    // To access path parameters:
    const {someParam} = req.params;

    // To specify the response:
    // ================================================================

    // To set a response header:
    res.setHeader('content-type', 'application/json');

    // To set the response body, use:
    res.body = 'some string';

    // To set the response status:
    res.statusCode = 200;
    res.statusMessage = 'OK';
  });
});
```

See [RouteHelper](/docs/v7.x/api/core/classes/router_RouteHelper.default.html) for all of the methods that you can call when responding to a request.

## Modifying a response from the origin {/* modifying-a-response-from-the-origin */}

Cloud Functions can be used to modify responses from the origin by using the `proxy` method with the `transformResponse` option. First, configure an origin in the `{{ CONFIG_FILE }}` located in the root of your project:

```js
// {{ CONFIG_FILE }}
module.exports = {
  // ... other config options

  origins: [
    {
      // The name of the backend origin
      name: 'origin',

      // Uncomment the following to override the host header sent from the browser when connecting to the origin
      // override_host_header: 'example.com',

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'example.com',
        },
      ],

      // Uncomment the following to configure a shield
      // shields: { us_east: 'DCD' },
    },
  ],
};
```

See [`origins`](/applications/performance/cdn_as_code/edgio_config#origins) for more configuration options.

To forward a request to the origin and modify the response using a Cloud Function:

```js
// routes.js
import {Router} from '{{ PACKAGE_NAME }}/core';

export default new Router().get('/some-route/:someParam', ({proxy}) => {
  proxy('origin', {
    transformRequest: (req) => {
      // You can optionally transform the request before it is sent to the origin
      // Here you can modify the following information about the request:
      // ================================================================

      // To alter the request URL:
      req.url = '/some/path?foo=bar';

      // To alter the request body:
      req.body = JSON.stringify({foo: 'bar'});

      // To alter the request method:
      req.method = 'POST';

      // To get the headers sent from the browser:
      const headers = req.getHeaders();

      // To get the value of an incoming request header:
      const someHeader = req.getHeader('some-header'); // the header name is case-insensitive

      // To set a request header:
      req.setHeader('content-type', 'application/json'); // the header name is case-insensitive

      // To remove a request header:
      req.removeHeader('some-header'); // the header name is case-insensitive

      // To access query parameters
      const {id, name} = req.query; // for example if the query string is ?id=1&name=Mark

      // To access path parameters:
      const {someParam} = req.params;
    },
    transformResponse: (res, req) => {
      // To access or modify the body, use:
      res.body = 'some string';

      // To set a header:
      res.setHeader('content-type', 'application/json'); // the header name is case-insensitive

      // To remove a header:
      res.removeHeader('some-header'); // the header name is case-insensitive

      // To get the headers returned from the origin. Keys are always lower case
      const headers = res.getHeaders();

      // To get a specific header returned from the origin:
      const cookie = res.getHeader('cookie'); // the header name is case-insensitive
    },
  });
});
```

You can also access any of the request fields documented in [Responding to requests](#responding-to-requests).

## Caching Responses {/* caching-responses */}

To improve performance and minimize cost, cache the responses returned by your Cloud Functions whenever possible:

```js
// routes.js
import {Router} from '{{ PACKAGE_NAME }}/core';

export default new Router().get('/', ({cache, compute}) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60, // cache for one hour at the edge
      staleWhileRevalidateSeconds: 60 * 60 * 24, // and continue to serve stale responses for up to 24 hours while fetching a fresh response
    },
  });
  compute((req, res) => {
    res.setHeader('content-type', 'application/json');
    res.body = JSON.stringify({message: 'Hello World!'});
  });
});
```

See the [cache](/docs/v7.x/api/core/classes/router_RouteHelper.default.html#cache) method for more options.

## Running your project locally {/* running-your-project-locally */}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

This will start your project in watch mode. Any changes your make to your source code will instantly take effect without restarting.

## Deploying your project to {{ PRODUCT }} {/* deploying-your-project-to */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

{{ system_origins_callout.md }}

## Limits {/* limits */}

{{ PRODUCT }} Cloud Functions have the following limitations:

- Your project must comply with all applicable [{{ PRODUCT }} {{ PRODUCT_EDGE }} limitations.](/applications/performance/limits)
- Your project must comply with [{{ PRODUCT }} {{ PRODUCT_PLATFORM }} limitations.](/applications/sites_frameworks/limits)
