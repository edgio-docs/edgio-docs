---
title: Edge Functions
---

Edge Functions enable you to execute a small piece of JavaScript code on our edge servers. This code can be used to modify requests and responses as well as make additional calls to your defined origins. The benefits of using Edge Functions include enhancing performance by reducing latency, improving user experience by personalizing content, and increasing security by managing authentication and redirection at the edge. They allow you to execute your code closer to users, reducing the need to go back to the original server and thus, provide faster services.

## Key Information {/* key_information */}

Edge Functions are invoked when the `edge_function` feature is specified in your `routes.js` to assign a piece of JavaScript code a specific route:

```js filename="./routes.js"
new Router().get('/', {
  edge_function: './path/to/function.js',
});
```
<Callout type="tip">
If you're new to Edgio or not familiar with the above code, please read our [CDN-as-Code guide](/guides/v7/performance/cdn_as_code) to understand how this works, including how to initialize a project and how to deploy it.
</Callout>

Each Edge Function is stored in a separate file and assigned to a specific route in your `routes.js` file. An Edge Function file must export the following entry point:

```js
export async function handleHttpRequest(request, context) {
  /* your edge function code goes here */
}
```

When a request is received for a route that has an Edge Function assigned to it, the Edge Function is invoked. The Edge Function is passed two parameters: `request` and `context`.

### Edge Function Parameters {/* edge_function_parameters */}

`request` is an object representing the incoming request and `context` is a read-only object providing additional information about the request and your environment, such as access to the client's network information, device capabilities, geo location, environment variables, origin servers, and information about this property including values set using variables. It also provides functions for injecting metrics into your edge function and for returning the response from your edge function to the downstream client.

| Parameter                       | Type            | Description                                                                                                                                   | Reference                                                                                                |
| ------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `request`                       | Object          | Represents the incoming request                                                                                                               |                                                                                                          |
| `context`                       | Object          | A read-only object providing additional information about the request and your environment                                                    |                                                                                                          |
| `context.client`                | Key-value store | The client's network information                                                                                                              | `virt_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                    |
| `context.device`                | Key-value store | The client's device capabilities                                                                                                              | `wurfl_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                   |
| `context.environmentVars`       | Key-value store | Environment variables as defined in the {{ PORTAL }} (*Property* -> *Environment* --> **Environment Variables**)               | [Environment Variables](/guides/basics/environments#environment-variables)                               |
| `context.geo`                   | Key-value store | The client's geo location                                                                                                                     | `geo_` variables in [Feature Variables](/guides/performance/rules/feature_variables)                     |
| `context.metrics`               | Object          | Provides functions for injecting metrics into your edge function                                                                              | [Access Logs](guides/logs/access_logs)                                                                   |
| `context.origins`               | Key-value store | Origin servers as defined in the {{ PORTAL }} (*Property* -> *Environment* -> **Origins**) or the `{{ CONFIG_FILE }}` file | [Origin Configuration](/guides/basics/hostnames_and_origins#origin)                                      |
| `context.requestVars`           | Key-value store | Information about this property including values set using Set Variables                                                                      | [Set Variables](/guides/performance/rules/features#set-variables)                                        |
| `context.respondWith(response)` | Function        | Must be called to return the response from your edge function to the downstream client                                                        | [context.respondWith(response)](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) |
| `context.waitUntil(promise)`    | Function        | Waits until the given promise is fulfilled                                                                                                    | [context.waitUntil(promise)](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) |

### Metrics Functions {/* metrics_functions */}

| Function                                           | Description                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `context.metrics.add(id: integer, value: integer)` | Adds a value to the metric with the given id                                                                  |
| `context.metrics.startTimer(id: integer)`          | Starts a timer for the metric with the given id. Only one timer can be active at a time for a given metric id |
| `context.metrics.stopTimer(id: integer)`           | Stops a timer for the metric with the given id                                                                |

### Edge Function Namespace {/* edge_function_namespace */}

Edge Functions global namespace provide access to the following:

| Global Object/Class | Description                                                                                                            | Reference                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `console` object    | The standard console object used to log messages to the console                                                        | [Console Object](https://developer.mozilla.org/en-US/docs/Web/API/console)  |
| `Headers` Class     | The standard Headers class used to manipulate headers on requests and responses                                        | [Headers Class](https://developer.mozilla.org/en-US/docs/Web/API/Headers)   |
| `Request` Class     | The standard Request class used access the initial request on this route and to make new requests to the origin server | [Request Class](https://developer.mozilla.org/en-US/docs/Web/API/Request)   |
| `Response` Class    | The standard Response class used to access responses from the origin server and to create new downstream responses     | [Response Class](https://developer.mozilla.org/en-US/docs/Web/API/Response) |
| `fetch(request)`    | The standard fetch() function used to makes requests to the origin server                                              | [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)     |
| `TextDecoder`       | Polyfill class to manage decoding text                                                                                 | [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) |
| `TextEncoder`       | Polyfill class to manage encoding text                                                                                 | [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) |

## Limitations {/* limitations */}

Edge Functions are limited to 2MB of memory at runtime. This includes the compiled JavaScript byte code, variables, requests, context object, and responses. Edge Functions are limited to 50ms of CPU time and 2 minutes of total execution time. The time your edge function spends waiting for a response from an origin server does not count against the 50ms CPU limit.

## Edge Function Examples {/* examples */}

Below are some examples of how to use Edge Functions by Edgio. We also maintain a [GitHub repository](https://github.com/Edgio/Edge-Functions-Examples) with more detailed examples of real-world use cases.

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
// Example edge function that injects a header into the response
export async function handleHttpRequest(request, context) {
  // Forward the incoming request to the defined origin server.
  const response = await fetch(request, {edgio: {origin: 'legacy_server'}});

  // Add a header to the response from the origin server.
  response.headers.set('X-Edge-Function', 'home-page.js');

  // Return the response and end the edge function.
  context.responseWith(response);
}
```

```js filename="./edge-functions/product.js"
// Example edge function that modifies a response from the origin server
export async function handleHttpRequest(request, context) {
  // Forward the incoming request to the defined origin server.
  const response = await fetch(request, {edgio: {origin: 'json_api_server'}});

  // Parse the response body as JSON
  const body = await response.json();

  // Add the customer's postal_code to the json response
  body.postal_code = context.geo.postal_code;

  // Return the response and end the edge function.
  // Note: Since the original response body is read-only,
  // we must create a new response with the updated body.
  const jsonBody = JSON.stringify(body);
  context.responseWith(new Response(jsonBody, response));
}
```

```js filename="./edge-functions/contacts.js"
// Example edge function makes multiple fetches
export async function handleHttpRequest(request, context) {
  const myBackend = 'http://api.backend-example.com';

  // Get the list of phone contacts
  const phonePromise = fetch(new Request(`${myBackend}/phone`), {
    edgio: {origin: 'json_api_server'},
  });

  // In Parallel, get the list of e-mail contacts
  const emailPromise = fetch(new Request(`${myBackend}/email`), {
    edgio: {origin: 'json_api_server'},
  });

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

  context.responseWith(
    new Response(jsonBody, 200, {headers: {'Content-Type': 'application/json'}})
  );
}
```
