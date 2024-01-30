---
title: Edge Functions
---

Edge Functions enable you to execute a small piece of JavaScript code on our edge servers. This code can be used to modify requests and responses as well as make additional calls to your defined origins. The benefits of using Edge Functions include enhancing performance by reducing latency, improving user experience by personalizing content, and increasing security by managing authentication and redirection at the edge. They allow you to execute your code closer to users, reducing the need to go back to the original server and thus, provide faster services.

**Key information:**

- This article assumes that you are familiar with our [CDN-as-Code](/guides/performance/cdn_as_code) approach for defining rules.
- Edge Functions requires activation. {{ ACCOUNT_UPGRADE }}

{{ prereq.md }}

## Defining Edge Functions {/* defining-edge-functions */}

An edge function is invoked when an incoming request matches a route that has an edge function assigned to it. Only a single edge function can be assigned to a route. If multiple routes match an incoming request, the edge function assigned to the last matching route is invoked.

Define an edge function by:
-   Storing your standalone JavaScript code as a file with a `js` file extension.
-   Setting an `edge_function` property within your {{ ROUTES_FILE }}. Set this string property to the relative path to your edge function. 

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

Specify an edge function within your `{{ ROUTES_FILE }}` file by adding the `edge_function` property to a route. The `edge_function` property accepts a string representing the path to the edge function file.

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

### Edge Function Initialization Script (Optional) {/* edge-function-initialization-script */}

An edge function initialization script is a JavaScript file executed once before any edge function in a project is invoked. This script is particularly beneficial for projects with two or more edge functions, allowing for the setup of global variables, initialization of third-party libraries, and defining utility functions used across multiple edge functions. It reduces duplicate code setup and is specified within the `{{ ROUTES_FILE }}` file. The script must adhere to specific execution and memory constraints, similar to the edge functions themselves.

To specify an edge function initialization script, add the `edge_function_init_script` property to the `Router(...)` constructor. The `edge_function_init_script` property accepts a string representing the path to the script.

```js filename="./routes.js"
import {Router} from '@edgio/core/router';

export default new Router({
  // Specify an edge function initialization script
  edge_function_init_script: './edge-functions/init.js',
})
  .get('/', {
    edge_function: './edge-functions/main.js',
  });
```

The initialization script must export the following entry point:

```js filename="./edge-functions/init.js"
/**
 * @async
 * @param {Object} context - Provides additional information about the request and environment.
 * @returns {void}
 */
export async function handleHttpInit(context) {
  // ... function code ...
}
```

**Key information:**

- **Execution Context:** It's important to note that certain parts of the `context`, like `geo`, `client`, and `device`, may not be relevant or populated during initialization as they are request-specific. The most relevant part of the context for initialization is `context.environmentVars`.

- **Execution Frequency and State Preservation:** The initialization code runs upon the first request received for any edge function within the project/bundle. After execution, the state is saved as a memory snapshot for subsequent executions of the project's edge functions. These snapshots are specific to each backend cache server and will be periodically evicted based on internal criteria. Upon eviction, `handleHttpInit` will execute again for the next request.

- **CPU/Memory Limitations:** The initialization script shares the same [CPU and memory limitations](#limitations) as the edge functions. This includes the execution time constraint (e.g., 50ms).

- **Use Cases:** An initialization script is ideal for computationally expensive operations like compiling regex, which is beneficial to perform once rather than in every edge function execution. However, operations like fetch are not recommended in this phase due to potential persistence of fetched data beyond desired periods.

- **Consideration for Global State:** Developers should be cautious when using the `context` to set up specific code or save data in the `global` scope during initialization, as it may persist and potentially lead to incorrect behavior across different requests.

The following sample code demonstrates how to set up a global variable within an edge function initialization script and access it within an edge function.

```js filename="./edge-functions/init.js"
export async function handleHttpInit(context) {
  // Set up a global regular expression for matching URLs
  global.urlRegex = new RegExp('https://example.com');
}
```

```js filename="./edge-functions/main.js"
export async function handleHttpRequest(request, context) {
  // Access the global variable
  if (global.urlRegex.test(request.url)) {
    // ... function code ...
  }
}
```

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

Before issuing a fetch request to an origin, you must define an origin configuration within the `{{ CONFIG_FILE }}` file:

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

### Caching fetch() Requests {/* caching-fetch-requests */}

See the [Edge Function Caching](/guides/edge_functions/caching) guide for more information on caching origin fetch requests.

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
