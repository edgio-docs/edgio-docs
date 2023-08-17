---
title: Edge Functions
---

Edge Functions enable you to execute a small piece of JavaScript code on our edge servers. This code can be used to modify requests and responses as well as make additional calls to your defined origins. The benefits of using Edge Functions include enhancing performance by reducing latency, improving user experience by personalizing content, and increasing security by managing authentication and redirection at the edge. They allow you to execute your code closer to users, reducing the need to go back to the original server and thus, provide faster services.

**Key information:**

- Edge Functions assume you are familiar with our [CDN-as-Code](/guides/performance/cdn_as_code) approach for defining rules.
- They require your {{ PORTAL }} team to be configured to use the Edge Functions feature. [Contact support]({{ HELP_URL }}) to enable this feature.

## Getting Started {/* getting-started */}

{{ prereq.md }}

## Defining Edge Functions {/* defining-edge-functions */}

Edge Functions are defined in your `routes.js` file using the `edge_function` property on a route. The `edge_function` property accepts a string representing the path to the Edge Function file.

```js filename="./routes.js"
new Router().get('/', {
  edge_function: './path/to/function.js',
});
```

Each Edge Function is stored in a separate file and assigned to a specific route in your `routes.js` file. An Edge Function file must export the following entry point:

```js
export async function handleHttpRequest(request, context) {
  /* your edge function code goes here */
}
```

When a request is received for a route that has an Edge Function assigned to it, the Edge Function is invoked. The Edge Function is passed two parameters: `request` and `context`.

### Edge Function Parameters {/* edge-function-parameters */}

`request` is an object representing the incoming request and `context` is a read-only object providing additional information about the request and your environment, such as access to the client's network information, device capabilities, geo location, environment variables, origin servers, and information about this property including values set using variables. It also provides functions for injecting metrics into your edge function and for returning the response from your edge function to the downstream client.

| Parameter                       | Type            | Description                                                                                                                | Reference                                                                                                |
| ------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `request`                       | Object          | Represents the incoming request                                                                                            | [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)                                      |
| `context`                       | Object          | A read-only object providing additional information about the request and your environment                                 |                                                                                                          |
| `context.client`                | Key-value store | The client's network information                                                                                           | `virt_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                    |
| `context.device`                | Key-value store | The client's device capabilities                                                                                           | `wurfl_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                   |
| `context.environmentVars`       | Key-value store | Environment variables as defined in the {{ PORTAL }} (_Property_ -> _Environment_ --> **Environment Variables**)           | [Environment Variables](/guides/basics/environments#environment-variables)                               |
| `context.geo`                   | Key-value store | The client's geo location                                                                                                  | `geo_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                     |
| `context.metrics`               | Object          | Provides functions for injecting [metrics](#metrics_functions) into your edge function                                     | [Access Logs](/guides/logs/access_logs)                                                                  |
| `context.origins`               | Key-value store | Origin servers as defined in the {{ PORTAL }} (_Property_ -> _Environment_ -> **Origins**) or the `{{ CONFIG_FILE }}` file | [Origin Configuration](/guides/basics/hostnames_and_origins#origin)                                      |
| `context.requestVars`           | Key-value store | Information about this property including values set using Set Variables                                                   | [Set Variables](/guides/performance/rules/features#set-variables)                                        |
| `context.respondWith(response)` | Function        | Must be called to return the response from your edge function to the downstream client                                     | [context.respondWith(response)](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) |
| `context.waitUntil(promise)`    | Function        | Waits until the given promise is fulfilled                                                                                 | [context.waitUntil(promise)](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) |

### Metrics Functions {/* metrics-functions */}

| Function                                           | Description                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `context.metrics.add(id: integer, value: integer)` | Adds a value to the metric with the given id                                                                  |
| `context.metrics.startTimer(id: integer)`          | Starts a timer for the metric with the given id. Only one timer can be active at a time for a given metric id |
| `context.metrics.stopTimer(id: integer)`           | Stops a timer for the metric with the given id                                                                |

### Edge Function Namespace {/* edge-function-namespace */}

Edge Functions global namespace provide access to the following:

| Global Object/Class | Description                                                                                                             | Reference                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `console` object    | The standard console object used to log messages to the console.                                                        | [Console Object](https://developer.mozilla.org/en-US/docs/Web/API/console)  |
| `Headers` Class     | The standard Headers class used to manipulate headers on requests and responses.                                        | [Headers Class](https://developer.mozilla.org/en-US/docs/Web/API/Headers)   |
| `Request` Class     | The standard Request class used access the initial request on this route and to make new requests to the origin server. | [Request Class](https://developer.mozilla.org/en-US/docs/Web/API/Request)   |
| `Response` Class    | The standard Response class used to access responses from the origin server and to create new downstream responses      | [Response Class](https://developer.mozilla.org/en-US/docs/Web/API/Response) |
| `fetch(request)`    | A [modified fetch() function](#origin-requests-using-fetch) used to makes requests to the origin server.                | [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)     |
| `TextDecoder`       | Polyfill class to manage decoding text.                                                                                 | [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) |
| `TextEncoder`       | Polyfill class to manage encoding text.                                                                                 | [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) |

### Origin Requests Using fetch() {/* origin-requests-using-fetch */}

Before making a fetch, you must first define the origin in the `{{ CONFIG_FILE }}` file. Learn more in our [CDN-as-Code](/guides/performance/cdn_as_code#config-file) guide.

To fetch a resource from an origin server using the `fetch()` function, specify the URL or a `Request` object as the first argument. The second argument is also required and is where you specify the name of the origin, plus any additional options compatible with the `fetch()` function.

```js
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
  context.respondWith(resp);
}
```

You can also use the [`createFetchForOrigin()`](#createFetchForOrigin) function to create a modified `fetch()` function that includes the origin server. See the [Polyfills](#polyfills) section for more information.

```js
export async function handleHttpRequest(request, context) {
  const fetch = createFetchForOrigin('web');

  const resp = await fetch('https://your-server.com');

  // handle the response as needed
  /* ... */

  // return the response to the client
  context.respondWith(resp);
}
```

Some libraries allow you to specify a `fetch()` function to use. For example, PlanetScale's database driver configuration accepts a custom function to use when making requests to the API.

```js
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
  context.respondWith(resp);
}
```

This approach allows for creating unique `fetch()` functions for each origin server. Optionally, you can override the global `fetch()` function if you are unable to specify a `fetch()` function in your library.

```js
import createFetchForOrigin from './polyfills';

export async function handleHttpRequest(request, context) {
  const fetch = createFetchForOrigin('api');

  // override the global fetch() function
  global.fetch = fetch;

  // make a request to the your API
  /* ... */

  // return the response to the client
  context.respondWith(resp);
}
```

## Testing Locally {/* testing-locally */}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by letting you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ CLI_CMD(dev) }}`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

Note that Edge Functions executed in local development mode are simulated and may not reflect the behavior or performance of deployed Edge Functions.

## Deploying Your Property {/* deploying-your-property */}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ CLI_CMD(deploy) }}
```

Note that Edge Functions must be enabled for your {{ PORTAL }} team in order to deploy your property. [Contact support]({{ HELP_URL }}) to enable this feature.

## Limitations {/* limitations */}

Edge Functions are limited to 2MB of memory at runtime. This includes the compiled JavaScript byte code, variables, requests, context object, and responses. All Edge Functions are compiled into a single bundle to deploy to our edge servers. If the total size of all compiled Edge Functions exceeds 2MB, the deployment will fail with a 400 error.

```plaintext
2023-08-14T17:37:04Z - error - external - Schema validation error: properties.0.edge_functions.quickjs_bytecode_base64 exceeds maximum size. Max: 204800, got: 417309
2023-08-14T17:37:04Z - error - external - Error: the server responded with status 400
```

Edge Functions are limited to 50ms of CPU time and 60 seconds of total execution time. The time your edge function spends waiting for a response from an origin server does not count against the 50ms CPU limit.

## Polyfills {/* polyfills */}

It's important to note that Edge Functions are not Node.js functions. Your code or third-party libraries may not work as expected if they are referencing Node.js specific APIs (e.g. `URL`, `Buffer`, etc). Because of this, we recommend using polyfills when needed. Below are some examples of polyfills you can use in your Edge Functions. Add these files to your project and import them into your Edge Function files as needed.

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

- `createFetchForOrigin` for the `fetch()` API <a id="createFetchForOrigin"></a>

  ```js filename="./polyfills/createFetchForOrigin.js"
  /**
   * Creates a fetch function with an additional 'edgio' option to specify the origin.
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

    return (url, options = {}, ...rest) => {
      const modifiedOptions = {
        ...options,
        edgio: {
          origin: originName,
        },
      };
      return fetch(url, modifiedOptions, ...rest);
    };
  }
  ```

### Usage {/* usage */}

You can import these polyfills into your Edge Function file and use them as needed. For example, if you need to use the `URL` and `Buffer` APIs, you can import the files directly.

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

Below are some examples of how to use Edge Functions by {{ PRODUCT }}. We also maintain a [GitHub repository](https://github.com/Edgio/Edge-Functions-Examples) with more detailed examples of real-world use cases.

```js filename="./routes.js"
// Example router assigning edge functions to different routes.
new Router()
  .get('/', {
    edge_function: './edge-functions/home-page.js',
  })
  .get('/products:id', {
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
  context.respondWith(response);
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
  context.respondWith(new Response(jsonBody, response));
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

  context.respondWith(
    new Response(jsonBody, 200, {headers: {'Content-Type': 'application/json'}})
  );
}
```
