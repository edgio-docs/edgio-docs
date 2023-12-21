---
title: Edge Functions
---

Edge Functions enable you to execute a small piece of JavaScript code on our edge servers. This code can be used to modify requests and responses as well as make additional calls to your defined origins. The benefits of using Edge Functions include enhancing performance by reducing latency, improving user experience by personalizing content, and increasing security by managing authentication and redirection at the edge. They allow you to execute your code closer to users, reducing the need to go back to the original server and thus, provide faster services.

**Key information:**

- This article assumes that you are familiar with our [CDN-as-Code](/guides/performance/cdn_as_code) approach for defining rules.
- Edge Functions requires activation. {{ ACCOUNT_UPGRADE }}

{{ prereq.md }}

## Defining Edge Functions {/* defining-edge-functions */}

Define an edge function within your {{ ROUTES_FILE }} file by adding the `edge_function` property to a route. The `edge_function` property accepts a string representing the path to the edge function file.

```js filename="./routes.js"
import {Router} from '@edgio/core/router';

export default new Router()
  .get('/', {
    edge_function: './edge-functions/index.js',
  })
  .match('/api/*', {
    edge_function: './edge-functions/api.js',
  });
```

Each edge function is stored in a separate file and assigned to a specific route in your `routes.js` file. Edge functions support only JavaScript (`.js`) files.

An edge function file must export the following entry point:

```js
/**
 * Handles an HTTP request and returns a response.
 *
 * @async
 * @param {Request} request - Represents the incoming request.
 * @param {Object} context - Provides additional information about the request and environment.
 * @param {Object} context.client - The client's network information.
 * @param {Object} context.device - The client's device capabilities.
 * @param {Object} context.environmentVars - Environment variables as defined in the Developer Console.
 * @param {Object} context.geo - The client's geo location.
 * @param {Object} context.metrics - Provides functions for injecting metrics into your edge function.
 * @param {Function} context.metrics.add - Adds a value to the metric with the given ID.
 * @param {Function} context.metrics.startTimer - Starts a timer for the metric with the given ID. Only one timer can be active at a time for a given metric ID.
 * @param {Function} context.metrics.stopTimer - Stops a timer for the metric with the given ID.
 * @param {Object} context.origins - Origin servers as defined in the {{ PORTAL }} or the {{ CONFIG_FILE }} file.
 * @param {Object} context.requestVars - Information about this property including values set using Set Variables.
 * @returns {Response | Promise<Response>}
 */
export async function handleHttpRequest(request, context) {
  // ... function code ...
}
```

When a request is received for a route that has an edge function assigned to it, the edge function is invoked.

## Edge Function Parameters {/* edge-function-parameters */}

The edge function is passed two parameters: `request` and `context`.

`request` is an object representing the incoming request and `context` is a read-only object providing additional information about the request and your environment, such as access to the client's network information, device capabilities, geo location, environment variables, origin servers, and information about this property including values set using variables. It also provides functions for injecting metrics into your edge function and for returning the response from your edge function to the downstream client.

| Parameter                           | Type            | Description                                                                                                                                                                                                                                                     | Reference                                                                                                |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `request`                           | Object          | Represents the incoming request                                                                                                                                                                                                                                 | [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)                                      |
| `context`                           | Object          | A read-only object providing additional information about the request and your environment                                                                                                                                                                      |                                                                                                          |
| `context.client`                    | Key-value store | The client's network information                                                                                                                                                                                                                                | `virt_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                    |
| `context.device`                    | Key-value store | The client's device capabilities                                                                                                                                                                                                                                | `wurfl_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                   |
| `context.environmentVars`           | Key-value store | Environment variables as defined in the {{ PORTAL }} (_Property_ -> _Environment_ --> **Environment Variables**)                                                                                                                                                | [Environment Variables](/guides/basics/environments#environment-variables)                               |
| `context.geo`                       | Key-value store | The client's geo location                                                                                                                                                                                                                                       | `geo_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                     |
| `context.metrics`                   | Object          | Provides functions for injecting [metrics](#metrics-functions) into your edge function                                                                                                                                                                          | [Edge Insights - Access Logs](/guides/performance/observability/edge_insights)                           |
| `context.origins`                   | Key-value store | Origin servers as defined in the {{ PORTAL }} (_Property_ -> _Environment_ -> **Origins**) or the `{{ CONFIG_FILE }}` file                                                                                                                                      | [Origin Configuration](/guides/basics/hostnames_and_origins#origin)                                      |
| `context.requestVars`               | Key-value store | Information about this property including values set using Set Variables                                                                                                                                                                                        | [Set Variables](/guides/performance/rules/features#set-variables)                                        |
| ~~`context.respondWith(response)`~~ | Function        | <ul><li>**{{ PRODUCT }} v7.2.3 or higher:** Deprecated. See [Responding to the Client](#responding-to-the-client).</li><li>**{{ PRODUCT }} v7.2.2 or lower:** Must be called to return the response from your edge function to the downstream client.</li></ul> | [context.respondWith(response)](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) |
| `context.waitUntil(promise)`        | Function        | Waits until the given promise is fulfilled                                                                                                                                                                                                                      | [context.waitUntil(promise)](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) |

### Metrics Functions {/* metrics-functions */}

Inject up to 10 metrics into your edge function through `context.metrics`. Metric data is reported through [Edge Insights](/guides/performance/observability/edge_insights) when viewing log data for the Access Logs data source. View these metrics by clicking on an entry within the **Logs** section and then looking for `Edge Function Customer Metric #` log fields.

| Function                                           | Description                                                                            |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `context.metrics.add(id: integer, value: integer)` | Adds a value to the metric with the given ID. Valid values for `id` are `0` - `9`.     |
| `context.metrics.startTimer(id: integer)`          | Starts a metric's timer. Only a single timer can be active at any time for a given ID. |
| `context.metrics.stopTimer(id: integer)`           | Stops a metric's timer.                                                                |

### Edge Function Namespace {/* edge-function-namespace */}

Edge Functions global namespace provide access to the following:

| Global Object/Class | Description                                                                                                             | Reference                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `console` object    | The standard console object used to log messages to the console.                                                        | [Console Object](https://developer.mozilla.org/en-US/docs/Web/API/console)  |
| `Headers` Class     | The standard Headers class used to manipulate headers on requests and responses.                                        | [Headers Class](https://developer.mozilla.org/en-US/docs/Web/API/Headers)   |
| `Request` Class     | The standard Request class used access the initial request on this route and to make new requests to the origin server. | [Request Class](#request-class)                                             |
| `Response` Class    | The standard Response class used to access responses from the origin server and to create new downstream responses      | [Response Class](#response-class)                                           |
| `fetch(request)`    | A [modified fetch() function](#origin-requests-using-fetch) used to makes requests to the origin server.                | [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)     |
| `TextDecoder`       | Polyfill class to manage decoding text.                                                                                 | [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) |
| `TextEncoder`       | Polyfill class to manage encoding text.                                                                                 | [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) |

### Request Class {/* request-class */}

<Callout type="info">

Edge functions use a modified version of the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) API. See the [Unsupported Methods and Properties](#request-unsupported-methods-and-properties) section for more information.

</Callout>

Edge functions are passed a `Request` instance representing the incoming request. This object provides methods and properties for accessing the request's headers, body, URL, and more.

#### Supported Methods and Properties {/* request-supported-methods-and-properties */}

- **Headers**: Access the request headers using `request.headers`.
- **Body**: The request body can be read as:
  - **ArrayBuffer**: `await request.arrayBuffer()`
  - **JSON**: `await request.json()`
  - **Text**: `await request.text()`
- **Method**: `request.method` to get the HTTP method of the request.
- **URL**: `request.url` provides the full URL, and `request.path` gives the request path.
- **Cloning**: To clone a request without its body, use `request.cloneWithoutBody()`.

#### Unsupported Methods and Properties {/* request-unsupported-methods-and-properties */}

The following properties and methods from the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) API are not supported:

- `request.blob()`
- `request.cache`
- `request.credentials`
- `request.clone()`
- `request.destination`
- `request.formData()`
- `request.integrity`
- `request.mode`
- `request.redirect`
- `request.referrer`
- `request.referrerPolicy`
- `request.signal`

<Callout type="info">

Using an unsupported method or property will throw an error.

</Callout>

### Response Class {/* response-class */}

<Callout type="info">

Edge functions use a modified version of the standard [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) API. See the [Unsupported Methods and Properties](#response-unsupported-methods-and-properties) section for more information.

</Callout>

Origin fetch requests and edge functions return a `Response` instance representing the response. This object provides methods and properties for accessing and setting the response's headers, body, status code, and more. Create a response through the `Response` class or by calling the `fetch()` function. See the [Edge Function Namespace](#edge-function-namespace) section for more information.

#### Supported Methods and Properties {/* response-supported-methods-and-properties */}

- **Headers**: Access or modify the response headers using `response.headers`.
- **Body**: The response body can be interacted with using:
  - **ArrayBuffer**: `await response.arrayBuffer()`
  - **JSON**: `await response.json()`
  - **Text**: `await response.text()`
- **Status**: `response.status` to get the HTTP status code of the response. `response.statusText` provides the corresponding status text.
- **URL**: `response.url` provides the URL of the response.
- **Redirected**: `response.redirected` is a property that indicates whether the response is a result of a redirection.

    <Callout type="info">

      You may redirect a response up to 5 times before an exception is thrown.

    </Callout>

- **Redirection**: Create a redirected response using `Response.redirect(url, status)`.
- **Cloning**: To clone a response without its body, use `response.cloneWithoutBody()`.

#### Unsupported Methods and Properties {/* response-unsupported-methods-and-properties */}

The following properties and methods from the standard [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) API are not supported:

- `response.blob()`
- `response.clone()`
- `response.formData()`
- `response.type`

**Note**: The above-mentioned unsupported methods and properties will throw an error if attempted to be used.

## Responding to the Client {/* responding-to-the-client */}

Edge functions must respond to the client by returning a `Response` object or a `Promise` that resolves to a `Response` object. The `Response` object can be created using the `Response` class or by calling the `fetch()` function. See the [Edge Function Namespace](#edge-function-namespace) section for more information.

```js filename="./edge-functions/example.js"
export async function handleHttpRequest(request, context) {
  const defaultResponse = new Response('Hello World!');
  const response = await fetch('https://your-server.com', {
    edgio: {
      // an origin name must be specified in the request
      origin: 'web',
    },
  });

  if (!response.ok) {
    return defaultResponse;
  }

  return response;
}
```

<Callout type="important">
 
  As of v7.2.3, the `context.respondWith()` function is deprecated. You must return a `Response` object or a `Promise` that resolves to a `Response` object to respond to the client.

</Callout>

## Origin Requests Using fetch() {/* origin-requests-using-fetch */}

Before issuing a fetch request (also known as a subrequest) to an origin, you must define an origin configuration within the `{{ CONFIG_FILE }}` file:

```js filename="{{ CONFIG_FILE }}"
module.exports = {
  /* ... */
  origins: [
    {
      // The name of the backend origin
      name: 'web',

      // Uncomment the following to override the host header sent from the browser when connecting to the origin
      // override_host_header: 'example.com',

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'your-server.com',
        },
      ],

      // Uncomment the following to configure a shield
      // shields: { us_east: 'DCD' },
    },
  ],
};
```

Learn more about origin configuration in our [CDN-as-Code](/guides/performance/cdn_as_code#config-file) guide.

Request a resource from an origin by passing two required arguments to the `fetch()` function. Set the first argument to a URL or a `Request` object. Set the second argument to the name of the origin and any additional options compatible with the `fetch()` function.

```js filename="./edge-functions/example.js"
export async function handleHttpRequest(request, context) {
  const resp = await fetch('https://your-server.com', {
    // an Edgio origin must be specified in the request
    edgio: {
      origin: 'web',
    },
  });

  // handle the response as needed
  /* ... */

  // return the response to the client
  return resp;
}
```

Create a reusable `fetch()` function by defining a utility function such as [`createFetchForOrigin()`](#createFetchForOrigin). See the [Polyfills and Helpers](#polyfills-and-helpers) section for more information.

```js filename="./edge-functions/example.js"
export async function handleHttpRequest(request, context) {
  const fetch = createFetchForOrigin('web');

  const resp = await fetch('https://your-server.com');

  // handle the response as needed
  /* ... */

  // return the response to the client
  return resp;
}
```

Some libraries allow you to specify a `fetch()` function to use. For example, PlanetScale's database driver configuration accepts a custom function to use when making requests to the API.

```js filename="./edge-functions/example.js"
import {connect} from '@planetscale/database';
import {createFetchForOrigin} from './polyfills';

const fetch = createFetchForOrigin('planetscale');

export async function handleHttpRequest(request, context) {
  const env = context.environmentVars;

  const config = {
    host: env.PLANETSCALE_HOST,
    username: env.PLANETSCALE_USERNAME,
    password: env.PLANETSCALE_PASSWORD,
    fetch,
  };

  const conn = connect(config);

  // make a request to the PlanetScale API
  /* ... */

  // return the response to the client
  return resp;
}
```

This approach allows for creating unique `fetch()` functions for each origin server. Optionally, you can override the global `fetch()` function if you are unable to specify a `fetch()` function in your library.

```js filename="./edge-functions/example.js"
import createFetchForOrigin from './polyfills';

export async function handleHttpRequest(request, context) {
  const fetch = createFetchForOrigin('api');

  // override the global fetch() function
  global.fetch = fetch;

  // make a request to the your API
  /* ... */

  // return the response to the client
  return resp;
}
```

<!-- ## Caching fetch() Requests {/* caching-fetch-requests */}

Caching fetch requests within your edge function can reduce the load on your origins and deliver content faster to your users. It may also mitigate timeout issues due to an edge function exceeding the [walltime limit](#limitations).

In this section, we'll cover how to use the caching options as part of the `fetch()` method. These options are specified per fetch request and are completely separate from the caching options specified in {{ROUTES_FILE}}.

The following sample code shows how to define caching options inside the `edgio` object:

```js
const resp = await fetch('https://your-server.com/some-path', {
  edgio: {
    origin: 'web',
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
      tags: 'apple banana',
      bypass_cache: false,
    },
  },
});
``` -->

<!-- ### Caching Options {/* caching-options */}

- `max_age`: Specifies the maximum amount of time that a fetched response is considered fresh. This value is set as a duration string, which is a number followed by a time unit character. Supported time unit characters are `d` for days, `h` for hours, `m` for minutes, and `s` for seconds. For example, `"1h"` represents 1 hour. This setting overrides the `max-age` directive in the `Cache-Control` header of the origin response if present.
- `stale_while_revalidate`: Specifies the amount of time a stale response is served while a revalidation request is made in the background. This value is also set as a duration string similar to `max_age`. This setting overrides the `stale-while-revalidate` directive in the `Cache-Control` header of the origin response if present.
- `tags`: Allows you to specify a space-separated list of tags for the cached object, which can later be used for cache purging as [surrrogate keys](/guides/performance/caching/purging#surrogate-key). Each tag should be a string without spaces.
- `bypass_cache`: A boolean value that, when set to `true`, bypasses the cache for the fetch request, ensuring the request is sent directly to the origin and the response is not stored in the cache.

These caching options provide you with granular control over how your fetch requests are cached and served, allowing you to optimize the performance of your edge function. -->

### Cache Behavior of Subrequests {/* cache-behavior-of-subrequests */}

Edge function subrequests are cached at the edge for 5 minutes under the following conditions:

- The response from the origin does not include a `Cache-Control` header.
- The response is deemed cacheable based on our [default caching policy](/guides/performance/caching#default-caching-policy).

This means that if you make a fetch request to the same URL within 5 minutes, the response will be served from the cache instead of going to the origin. <!-- This behavior can be overridden by specifying the `bypass_cache` option. --> Cache directives from the origin response will also be respected as follows:

- If the origin responds with a `Cache-Control` HTTP header containing valid directives, these directives will be respected. For example:
  - With `Cache-Control: max-age=60, s-maxage=900`, the fetch request will be cached for 15 minutes, considering `s-maxage=900`.
  - With `Cache-Control: max-age=600`, the response will be cached for 10 minutes, considering `max-age=600`.
  - With `Cache-Control: no-store, no-cache`, the response will not be cached.
- If the `Cache-Control` header is not present for a cache-eligible response, the CDN will check for the `Expires` header.
- If the response is cached based on the above logic, subsequent fetch requests will be served from cache until the cached response has expired or been purged. At which point, the fetch request will go to the origin.

### Fetch Limitations {/* fetch-limitations */}

Response status codes of `fetch()` requests must:

- Be greater than or equal to 200.
- Be less than or equal to 599.
- Not be 204 or 304.

If the response status code does not meet these criteria, the edge function will throw an error. It may be necessary to remove specific cache directives from the request before sending it to the origin.

The following sample code strips the cache directive headers from the request before sending it to the origin:

```js filename="./edge-functions/example.js"
export async function handleHttpRequest(request) {
  /* ... */

  // Remove headers that could cause the a response status of 204/304 to be returned.
  const headersToRemove = [
    'etag',
    'if-modified-since',
    'if-none-match',
    'last-modified',
  ];
  headersToRemove.forEach((header) => request.headers.delete(header));

  const response = await fetch(request.url, {
    edgio: {
      origin: 'web',
    },
    method: request.method,
    headers: request.headers,
  });

  // handle the response as needed

  return response;
}
```

## Testing Locally {/* testing-locally */}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by letting you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ CLI_CMD(dev) }}`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

Note that edge functions executed in local development mode are simulated and may not reflect the behavior or performance of deployed edge functions.

## Deploying Your Property {/* deploying-your-property */}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ CLI_CMD(deploy) }}
```

Note that Edge Functions must be enabled for your {{ PORTAL }} team in order to deploy your property. [Contact support]({{ HELP_URL }}) to enable this feature.

## Limitations of Edge Functions {/* limitations */}

Edge functions are only compatible with edge links. Permalinks are unsupported since they bypass the edge network and serve content directly from the origin. This behavior causes either degraded functionality or prevents edge function logic from being applied.

When deploying your project, it's important to distinguish between the edge link and the permalink for proper testing and functionality verification. The following screenshot indicates where you can find the permalink and edge link for your project in the {{ PORTAL }}.

![Permalink and Edge Link in {{ PORTAL }}](/images/deploying/deploy_links.png?width=800)

Edge Function Limitations:

- Wall-time Timeout: 60s
- CPU Time Limit: 50ms
- Runtime Memory Limit: 4MB
- Code Package Size Limit: 512KB

The code package size refers to the compiled JavaScript bytecode. All edge functions are bundled into a single package for deployment to our edge servers. If the total compiled size exceeds 512KB, the deployment will fail and return a 400 error:

```plaintext
2023-08-14T17:37:04Z - error - external - Schema validation error: properties.0.edge_functions.quickjs_bytecode_base64 exceeds maximum size. Max: 512000, got: 1514469
2023-08-14T17:37:04Z - error - external - Error: the server responded with status 400
```

Runtime memory encompasses all variables, HTTP requests and responses, as well as the context object. This total must not exceed 4MB.

Edge functions are confined to 50ms of CPU time and a maximum of 60s for overall execution. Time spent waiting for a response from an origin server is not counted against the 50ms CPU time limit.

## Polyfills and Helpers {/* polyfills-and-helpers */}

It's important to note that edge functions are not Node.js functions. Your code or third-party libraries may not work as expected if they are referencing Node.js specific APIs (e.g. `URL`, `Buffer`, etc). Because of this, we recommend using polyfills when needed. Below are some examples of polyfills you can use in your edge functions. Add these files to your project and import them into your edge function files as needed.

- `url-parse` for the `URL` API

  ```js filename="./polyfills/url-parse.js"
  // npm install url-parse
  import URL from 'url-parse';

  global.URL = URL;
  ```

- `whatwg-url` for the `URL` and `URLSearchParams` APIs

  ```js filename="./polyfills/whatwg-url.js"
  // npm install whatwg-url
  import {URL, URLSearchParams} from 'whatwg-url';

  global.URL = URL;
  global.URLSearchParams = URLSearchParams;
  ```

- `Buffer` API

  ```js filename="./polyfills/buffer.js"
  global.Buffer = require('buffer').Buffer;

  global.btoa = function (str) {
    return Buffer.from(str, 'binary').toString('base64');
  };

  global.atob = function (b64Encoded) {
    return Buffer.from(b64Encoded, 'base64').toString('binary');
  };
  ```

- `process.env` Namespace

  This namespace is not globally available in edge functions. You can use the following polyfill to set environment variables from the context object.

  ```js filename="./polyfills/process-env.js"
  /**
   * Polyfill for process.env.
   */
  global.process = global.process || {env: {}};

  /**
   * Sets environment variables from a given context.
   *
   * @param {Object} context - The context object containing environment variables.
   * @param {Object} context.environmentVars - Key-value pairs of environment variables.
   */
  export function setEnvFromContext({environmentVars}) {
    Object.assign(process.env, environmentVars);
  }
  ```

### Helper Functions {/* helper-functions */}

- `createFetchForOrigin` for the `fetch()` API <a id="createFetchForOrigin"></a>

  This function returns a modified `fetch()` function that includes the origin server. This is useful for making multiple requests to the same origin or overriding the global function.

    <Callout type="info">

      Some third-party libraries let you specify a `fetch()` function. If you are unable to set this in your library, you can override the global one using this helper. See the [Origin Requests Using fetch()](#origin-requests-using-fetch) section for more details.

    </Callout>

  ```js filename="./polyfills/createFetchForOrigin.js"
  /**
   * Creates a fetch function with an additional 'edgio' option to specify the origin. Example usage:
   *
   * // create a fetch function for the 'web' origin.
   * const fetch = createFetchForOrigin('web');
   * const response = await fetch('https://your-server.com');
   *
   * // override the global fetch() function
   * global.fetch = createFetchForOrigin('web');;
   *
   * @param {string} originName - The origin name defined in edgio.config.js.
   * @returns {function} - A modified fetch function.
   * @throws {Error} If the origin name is not provided.
   */
  export default function createFetchForOrigin(originName) {
    if (!originName) {
      throw new Error(
        "'originName' is required and must be a name defined in edgio.config.js"
      );
    }

    return (url, options = {}) => {
      const modifiedOptions = {
        ...options,
        edgio: {
          origin: originName,
        },
      };
      return fetch(url, modifiedOptions);
    };
  }
  ```

### Usage {/* usage */}

You can import these polyfills into your edge function file and use them as needed. For example, if you need to use the `URL` and `Buffer` APIs, you can import the files directly.

```js filename="./edge-functions/example.js"
import './polyfills/url-parse.js';
import './polyfills/buffer.js';
import createFetchForOrigin from './polyfills/createFetchForOrigin';

const fetch = createFetchForOrigin('web');

export async function handleHttpRequest(request, context) {
  const response = await fetch(/* ... */);
  /* ... */
}
```

### Polyfill Limitations {/* polyfill-limitations */}

It's worth noting that not all implementations will be able to accept polyfills, either due to the number of dependencies affected or the compiled size of the polyfill exceeding the [Limitations](#limitations) of Edge Functions.

## Edge Function Examples {/* examples */}

<ExampleButtons
  title="Edge Functions"
  siteUrl="https://edgio-community-examples-v7-edge-functions-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-edge-functions-example"
/>

See additional examples of how to use Edge Functions by {{ PRODUCT }}:

```js filename="./routes.js"
// Example router assigning edge functions to different routes.
new Router()
  .get('/', {
    edge_function: './edge-functions/home-page.js',
  })
  .get('/products/:id', {
    edge_function: './edge-functions/product.js',
  })
  .get('/contacts', {
    edge_function: './edge-functions/contacts.js',
  });
```

```js filename="./edge-functions/home-page.js"
import createFetchForOrigin from './polyfills/createFetchForOrigin';

const fetch = createFetchForOrigin('legacy_server');

// Example edge function that injects a header into the response
export async function handleHttpRequest(request, context) {
  // Forward the incoming request to the defined origin server.
  const response = await fetch(request);

  // Add a header to the response from the origin server.
  response.headers.set('X-Edge-Function', 'home-page.js');

  // Return the response and end the edge function.
  return resp;
}
```

```js filename="./edge-functions/product.js"
import createFetchForOrigin from './polyfills/createFetchForOrigin';

const fetch = createFetchForOrigin('json_api_server');

// Example edge function that modifies a response from the origin server
export async function handleHttpRequest(request, context) {
  // Forward the incoming request to the defined origin server.
  const response = await fetch(request);

  // Parse the response body as JSON
  const body = await response.json();

  // Add the customer's postal_code to the json response
  body.postal_code = context.geo.postal_code;

  // Return the response and end the edge function.
  // Note: Since the original response body is read-only,
  // we must create a new response with the updated body.
  const jsonBody = JSON.stringify(body);

  return new Response(jsonBody, response);
}
```

```js filename="./edge-functions/contacts.js"
import createFetchForOrigin from './polyfills/createFetchForOrigin';

const fetch = createFetchForOrigin('json_api_server');

// Example edge function makes multiple fetches
export async function handleHttpRequest(request, context) {
  const myBackend = 'http://api.backend-example.com';

  // Get the list of phone contacts
  const phonePromise = fetch(new Request(`${myBackend}/phone`));

  // In Parallel, get the list of e-mail contacts
  const emailPromise = fetch(new Request(`${myBackend}/email`));

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
