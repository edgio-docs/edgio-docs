---
title: Header Manipulation
---

Edge functions can be used to manipulate the request and response headers of a request. This can be useful for adding security headers, modifying the cache behavior, or adding custom headers to requests.

## Basic Header Manipulation {/* basic-header-manipulation */}

The `Request` and `Response` objects in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provide methods for accessing and modifying the request and response headers. These methods can be used to add, remove, or modify the headers either before or after the request is sent to the origin.

### Router Configuration {/* router-configuration-basic-header-manipulation */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  })
```

### Edge Function {/* edge-function-basic-header-manipulation */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request, context) {

  // Fetch the response from the origin
  const response = await fetch(new Request(request.url, request), {
    edgio: {
      origin: 'web',
    },
  });

  // Add a custom header to the response
  response.headers.set('x-custom-header', 'foo');

  // Return the response to the client
  return response;
}
```

## Original Client IP {/* original-client-ip */}

The original client IP address can be retrieved from the `context` object in an edge function. This can be useful for logging or security purposes, such as adding the client IP address to the request headers.

### Router Configuration {/* router-configuration-original-client-ip */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  })
```

### Edge Function {/* edge-function-original-client-ip */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request, context) {
  // Retrieve the client's IP address from the context object
  const clientIP = context.client.dst_addr;

  const newRequest = new Request(request.url, request);

  // Add the true-client-ip header to the incoming request
  newRequest.headers.set('true-client-ip', clientIP);

  // Continue with the modified request to the origin
  return fetch(newRequest, {
    edgio: { origin: 'web' },
  });
}
```

## Content Security Policy {/* content-security-policy */}

The [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) is a security standard that can be used to mitigate the risk of cross-site scripting (XSS) attacks. It allows you to specify the domains from which various types of content can be loaded, such as scripts, stylesheets, images, and fonts. It also allows you to specify the domains from which the page can be embedded in a frame.

### Router Configuration {/* router-configuration-content-security-policy */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  })
```

### Edge Function {/* edge-function-content-security-policy */}


```js filename="edge-functions/main.js"
export async function handleHttpRequest(request, context) {
  // Fetch the response from the origin
  const response = await fetch(new Request(request.url, request), {
    edgio: {
      origin: 'web',
    },
  });

  // Set HTTP security headers
  response.headers.set(
    'strict-transport-security',
    'max-age=63072000; includeSubdomains; preload'
  );
  response.headers.set(
    'content-security-policy',
    "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'"
  );
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('x-xss-protection', '1; mode=block');
  response.headers.set('referrer-policy', 'same-origin');

  // Return the response to the client
  return response;
}
```
