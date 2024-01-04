---
title: Content Manipulation and Stitching
---

Content manipulation and stitching is a powerful feature that allows you to modify the content of a response before it is returned to the client. This can be useful for adding custom content to a response, modifying the response headers, or stitching together multiple responses into a single response.

## Basic Content Manipulation {/* basic-content-manipulation */}

The response body from the origin can be accessed and modified using the `Response` object in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This object provides methods for accessing and modifying the response body, including `text()`, `json()`, and `arrayBuffer()`. These methods can be used to add, remove, or modify the content of the response before it is returned to the client.

### Router Configuration {/* router-configuration-basic-content-manipulation */}

````js filename="routes.js"

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  })
````

### Edge Function {/* edge-function-basic-content-manipulation */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request, context) {
  const resp = await fetch(request.url, {
    edgio: {
      origin: 'web',
    },
  });
  let html = await resp.text();

  // Inject a marquee tag into the response
  const marquee =
    '<marquee>This paragraph was injected by an edge function.</marquee>';
  html = html.replace(/(<center[^>]*>)/i, `$1${marquee}`);

  return new Response(html, resp);
}
```

## M3U Manifest Manipulation {/* manifest-manipulation */}

The M3U manifest is a text-based file format that contains information about the media files in a playlist. It is commonly used for streaming video and audio, and is supported by most media players and streaming services. The M3U manifest can be modified to remove or add media files, change the order of the files, or modify the metadata of the files.

### Router Configuration {/* router-configuration-manifest-manipulation */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  });
```

### Edge Function {/* edge-function-manifest-manipulation */}

```js filename="edge-functions/main.js"
import {URL} from 'whatwg-url';

export async function handleHttpRequest(request, context) {
  // Get the manifest from the upstream server
  const url = new URL(request.url);
  url.pathname = '/assets/tears-of-steel.m3u';

  const upstreamResponse = await fetch(url.toString(), {
    edgio: {
      origin: 'web',
    },
  });

  // Modify the manifest to remove the 1680x750 rendition
  const manifestBody = await upstreamResponse.text();
  const lines = manifestBody
    .split('\n')
    .filter((line, index, lines) => !lines[index - 1]?.includes('1680x750'))
    .filter((line) => !line.includes('1680x750'));

  // Return the modified manifest
  const modifiedResponse = new Response(lines.join('\n'), {
    headers: {'content-type': upstreamResponse.headers.get('content-type')},
  });

  return modifiedResponse;
}
```

## Content Stitching {/* content-stitching */}

Content stitching is a powerful feature that allows you to combine multiple responses into a single response, such as combining the results of multiple API calls into a single response.

### Router Configuration {/* router-configuration-content-stitching */}

```js filename="routes.js"
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  .use(edgioRoutes)

  .match('/some/path', {
    edge_function: './edge-functions/main.js',
  });
```

### Edge Function {/* edge-function-content-stitching */}

```js filename="edge-functions/main.js"
import {URL} from 'whatwg-url';

export async function handleHttpRequest(request, context) {
  const url = new URL(request.url);
  const originConfig = {
    edgio: {
      origin: 'web',
    },
  };

  // Get the list of phone contacts
  const phonePromise = fetch(new Request(`${url.origin}/phone`), originConfig);

  // In Parallel, get the list of e-mail contacts
  const emailPromise = fetch(new Request(`${url.origin}/email`), originConfig);

  // Wait for both requests to complete.
  const [phoneResponse, emailResponse] = await Promise.all([
    phonePromise,
    emailPromise,
  ]);

  // Combine the two response bodies into a single response
  const body = {
    phone: await phoneResponse.json(),
    email: await emailResponse.json(),
  };

  // Return the response and end the edge function as JSON
  const jsonBody = JSON.stringify(body);

  return new Response(jsonBody, 200, {
    headers: {'Content-Type': 'application/json'},
  });
}
```
