---
title: Redirects
---

Redirects can be used to redirect a request to a different URL. This can be useful for redirecting users to a different page, or for redirecting requests to a different origin.

## Basic Redirect {/* basic-redirect */}

A basic redirect can be performed by returning a `Response` object with a `Location` header set to the URL to redirect to.

### Router Configuration {/* router-configuration-basic-redirect */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  });
```

### Edge Function {/* edge-function-basic-redirect */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request, context) {
  const url = new URL(request.url);
  url.pathname = '/some/other/path';

  return Response.redirect(url.toString(), 302);
}
```

## Geolocation Redirect {/* geolocation-redirect */}

Redirects can be performed based on the client's geolocation. This can be useful for redirecting users to a different page based on their country or region.

### Router Configuration {/* router-configuration-geolocation-redirect */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  });
```

### Edge Function {/* edge-function-geolocation-redirect */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request, context) {
  const country = 'DE'; // Choose a country code
  const newUrl = `${request.url}/${country}`; // Change the redirect URL to your choice

  // Redirect the request if the client is in the specified country
  if (context.geo.country === country) {
    return Response.redirect(newUrl, 302);
  }

  // Return the original request if the client is not in the specified country
  return fetch(request.url, {
    edgio: {origin: 'echo'},
  });
}
```

### Bulk Redirects {/* bulk-redirects */}

Bulk redirects can be performed by specifying a list of redirects in both the router configuration and the edge function. This can be accomplished for a large number of static redirects such as a JSON file containing a list of redirects, or an API call to a third-party service that provides a list of redirects.

#### Static Redirects {/* static-redirects-bulk-redirects */}

```js filename="redirects.js"
export default [
  // static redirects
  {
    from: '/some/path',
    to: '/some/other/path',
    status: 302,
  },
  {
    from: '/api/v1/users',
    to: '/api/v2/users',
    status: 302,
  },

  // dynamic redirects by pattern
  {
    from: /^\/products\/(.+)$/,
    to: null,
    status: 302,
  },
];
```

#### Router Configuration {/* router-configuration-bulk-redirects */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';
import redirects from './redirects';

export default new Router()
  .use(edgioRoutes)

  // Match the source (`from`) path of each redirect
  .if(
    {path: redirects.map((r) => r.from)},
    {
      edge_function: './edge-functions/main.js',
    }
  );
```

#### Edge Function {/* edge-function-bulk-redirects */}

```js filename="edge-functions/main.js"
import {redirects} from '../redirects';

const NOT_FOUND = new Response('Not Found', {status: 404});
const BAD_REQUEST = new Response('Bad Request', {status: 400});

export async function handleHttpRequest(request, context) {
  const url = new URL(request.url);

  // Find the redirect that matches the request path
  const redirect = redirects.find((r) => url.pathname.match(r.from));

  // If there is no matching redirect, return a 404 response
  if (!redirect) {
    return NOT_FOUND;
  }

  // If there is a matching static redirect, return a redirect response
  if (redirect.to) {
    return Response.redirect(redirect.to, redirect.status);
  }

  // For a matching dynamic redirect, forward the path to the origin and redirect based on the response
  const response = await fetch(request.url, {
    edgio: {origin: 'web'},
  });

  // Assume the response is JSON with a `redirect` and `status` property
  try {
    const {redirect, status} = await response.json();

    // If the response contains a redirect, return a redirect response
    if (redirect) {
      return Response.redirect(redirect.to, redirect.status);
    }

    // If the response does not contain a redirect, return a 404 response
    return NOT_FOUND;
  } catch (e) {
    // If the response fails to parse as JSON, return a 400 response
    return BAD_REQUEST;
  }
}
```
