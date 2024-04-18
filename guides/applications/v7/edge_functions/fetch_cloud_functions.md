---
title: Fetching from Cloud Functions
---

<ExampleButtons
  title="Fetching from Cloud Functions"
  siteUrl="https://edgio-community-examples-v7-ef-cloud-fetch-live.glb.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-ef-cloud-fetch-example"
/>

Fetching from a [cloud function](/applications/performance/serverless_compute) is similar to [fetching from an origin server](/applications/edge_functions#origin-requests-using-fetch). The key difference is that you must specify the `edgio_serverless` origin in the request.
This instructs the request to the cloud function origin where it is then handled by your JavaScript backend.

The following sample code shows different ways a cloud function might be defined:

```js filename="./routes.js"
import {Router} from '@edgio/core/router';
import {nextRoutes} from '@edgio/next';

export default new Router()
  // -------------------------------------
  // Cloud function defined by a connector
  // -------------------------------------

  // defines /cart route based on Next.js App/Pages router  (eg. ./src/app/cart/page.tsx)
  .use(nextRoutes)
  // edge function to handle /cart route
  .match('/cart', {
    edge_function: './edge-functions/cart.js',
  })

  // -----------------------------------
  // Cloud function defined by compute()
  // -----------------------------------

  // defines /session route as a cloud function
  .match('/session', ({compute, addFeatures}) => {
    compute(async (req, res) => {
      // complex logic not suitable for an edge function
      /* ... */

      res.body = JSON.stringify(/* ... */);
    });

    // edge function to handle /session route
    addFeatures({ edge_function: './edge-functions/session.js' })
  })

  // ---------------------------------
  // Cloud function defined by proxy()
  // ---------------------------------

  // defines /api route as a cloud function
  .match('/api', ({proxy, addFeatures}) => {
    proxy('api', {
      transformResponse: async (res) => {
        // complex logic not suitable for an edge function
        /* ... */

        res.body = JSON.stringify(/* ... */);
      },
    });

    // edge function to handle /api route
    addFeatures({ edge_function: './edge-functions/api.js' })
  })
```

For example, when using a framework compatible with {{ PRODUCT_PLATFORM }} like Next.js, you can forward the incoming request to the Next.js server.
This allows you to process and modify the response that Next.js provides at the edge before sending it back to the client, enabling personalization and other adjustments.

To fetch from a cloud function, you must meet the following requirements:

- {{ PRODUCT }} version 7.4.1 or later.
- A route that is defined as a cloud function. This can be a route via a connector such as `NextRoutes` or by using `compute` or `proxy` along with the `transformResponse` option.
- A route that uses an edge function. This must match the path as the cloud function and be defined **after** the cloud function route (see sample code above).
- The origin `edgio_serverless` must be specified in the request (see [System-Defined Origins](/applications/basics/origins#system-defined-origins)).
- Forwarding of the original request parameters including the method, headers, and body.

The following sample code demonstrates how to fetch and manipulate cloud function response within an edge function:

```js filename="./routes.js"
import {Router} from '@edgio/core/router';
import {nextRoutes} from '@edgio/next';

export default new Router()
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes)

  // '/cart' is a route defined by NextRoutes (eg. ./src/app/cart/page.tsx) but overridden here to be handled by the edge function
  .match('/cart', {
    edge_function: './edge-functions/cart.js',
  });
```

```js filename="./edge-functions/cart.js"
export async function handleHttpRequest(request) {
  // Check the request method and get the request body as an ArrayBuffer if it's not a GET or HEAD request.
  const requestBody = !['GET', 'HEAD'].includes(request.method)
    ? await request.arrayBuffer()
    : undefined;

  // Perform a fetch request to the original request URL with the same method, headers, and body.
  // Specify 'edgio_serverless' as the origin to fetch the original Cloud Functions response.
  const cloudFunctionsResponse = await fetch(request.url, {
    edgio: {
      origin: 'edgio_serverless',
    },
    method: request.method,
    headers: request.headers,
    body: requestBody,
  });

  // Convert the response to text format.
  let responseText = await cloudFunctionsResponse.text();

  // Manipulate the response to apply personalizations or modifications.
  responseText = responseText.replace(/* ... */);

  // Return a new response with the modified text and original response status, status text, and headers.
  return new Response(responseText, {
    status: cloudFunctionsResponse.status,
    statusText: cloudFunctionsResponse.statusText,
    headers: cloudFunctionsResponse.headers,
  });
}
```

## Limitations {/* limitations */}

Fetching from a Cloud Function is considered an origin subrequest and therefore has the same limitations. See [Fetch Limitations](/applications/edge_functions#fetch-limitations) for more information.
