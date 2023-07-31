---
title: Edge Functions
---

Edge Functions enable you to execute a small piece of JavaScript code on our edge servers. This code can be used to modify requests and responses as well as make additional calls to your defined origins.

**Key information:**

- Edge Functions are invoked when the `edge_function:` option is specified in your `routes.js` to assign a piece of Javascript code a specific route.
- Each Edge Function is stored in a separate file and assigned to a specific route in your `routes.js` file.
- Each Edge Function file exports the entry point `export default async function handleHttpRequest(request, context) { < your edge function code goes here > }`.
    - `request` is a object representing the the incoming request.
    - `context` is a read-only object which provides additional information about the request and your environment.
        - `context.client` is a key value store of the client's network information. Refer to the `virt_` variables in [Feature Variables](/guides/performance/rules/feature_variables)
        - `context.device` is a key value store of the client's device capabilities. Refer to the `wurlf_` variables in [Feature Variables](/guides/performance/rules/feature_variables)
        - `context.environmentVars` is a key value store of environment variables as defined in the Edgio console under the Property -> Environment -> Environment Variables section. TBD: Add reference
        - `context.geo` is a key value store of the client's geo location. Refer to the `geo_` variables in [Feature Variables](/guides/performance/rules/feature_variables)
        - `context.metrics` provides a set of functions for injecting metrics into your edge function. Metrics are sent to the [access logs](guides/logs/access_logs) and can be used to track the performance of your edge functions. Valid metric IDs are 0 through 9. Each metric ID can be used to track a different metric. The following functions are available:
            - `context.metrics.add(id: integer, value: integer)` - adds a value to the metric with the given id.
            - `context.metrics.startTimer(id: integer)` - starts a timer for the metric with the given id. Only one timer can be active at a time for a given metric id.
            - `context.metrics.stopTimer(id: integer)` - stops a timer for the metric with the given id.
        - `context.origins` is a key value store of origin servers as defined in the Edgio console under the Property -> Environment -> Origins section (or the `edgio.config.js` file.) Refer to [origin configuration](/guides/basics/hostnames_and_origins#origin)
        - `context.requestVars` - is a key value store containing information about this property which includes values set using [Set Variables](#set-variables).
        - `context.respondWith(response)` each edge function must call `context.respondWith(response)` to return the response from your edge function to the downstream client. Refer to [context.respondWith(response)](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)
        - `context.waitUntil(promise)` a function that waits until the given promise is fulfilled. Refer to [context.waitUntil(promise)](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil)

- Edge Functions global namespace provide access to the following:
    - [console object](https://developer.mozilla.org/en-US/docs/Web/API/console) - The standard console object used to log messages to the console.
    - [Headers Class](https://developer.mozilla.org/en-US/docs/Web/API/Headers) - The standard Headers class used to manipulate headers on requests and responses.
    - [Request Class](https://developer.mozilla.org/en-US/docs/Web/API/Request) - The standard Request class used access the intial request on this route and to make new requests to the origin server.
    - [Response Class](https://developer.mozilla.org/en-US/docs/Web/API/Response) - The standard Response class used to access responses from the origin server and to create new downstream responses.
    - [fetch(request)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - The standard fetch() function use to makes requests to the origin server. It returns a promise that resolves to a response.
    - [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) - Polyfill class to manage decoding text.
    - [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) - Polyfill class to manage encoding text.

## Limitations {/*limitations*/}

Edge Functions are limited to 2MB of memory at runtime. This includes the compiled Javascript byte code, variables, requests, context object and responses.

Edge Functions are limited to 50ms of CPU time and 2 minutes of total execution time. The time your edge function spends waiting for a response from an origin server does not count against the 50ms CPU limit.

**Edge Function Examples:**

```js filename="./routes.js"
// Example router assigning edge functions to different routes.
new Router()
  .get('/', {
    edge_function: "./edge-functions/home-page.js"
  })
  .get('/products:id', {
    edge_function: "./edge-functions/product.js"
  })
  .get('/contacts', {
    edge_function: "./edge-functions/contacts.js"
  })
```
```js filename="./edge-functions/home-page.js"
// Example edge function that injects a header into the response
export default async function handleHttpRequest(request, context) {
  // Forward the incoming request to the defined origin server.
  const response = await fetch(request, { edgio: { origin: 'legacy_server' } })

  // Add a header to the response from the origin server.
  response.headers.set('X-Edge-Function', 'home-page.js')

  // Return the response and end the edge function.
  context.responseWith(response)
```

```js filename="./edge-functions/product.js"
// Example edge function that modifies a response from the origin server
export default async function handleHttpRequest(request, context) {
  // Forward the incoming request to the defined origin server.
  const response = await fetch(request, { edgio: { origin: 'json_api_server' } })

  // Parse the response body as JSON
  const body = await response.json()

  // Add the customer's postal_code to the json response
  body.postal_code = context.geo.postal_code

  // Return the response and end the edge function.
  // Note: Since the original response body is read-only,
  // we must create a new response with the updated body.
  const jsonBody = JSON.stringify(body)
  context.responseWith(new Response(jsonBody, response))
```

```js filename="./edge-functions/contacts.js"
// Example edge function makes multiple fetches
export default async function handleHttpRequest(request, context) {

  const myBackend = 'http://api.backend-example.com'

  // Get the list of phone contacts
  const phonePromise fetch(new Request(`${myBackend}/phone`), { edgio: { origin: 'json_api_server' } })

  // In Parallel, get the list of e-mail contacts
  const emailPromise fetch(new Request(`${myBackend}/email`), { edgio: { origin: 'json_api_server' } })

  // Wait for both requests to complete.
  const [phoneResponse, emailResponse] = await Promise.all([phonePromise, emailPromise])

  // Combine the two response bodies into a single response
  const body = {
    phone: await phoneResponse.json(),
    email: await emailResponse.json(),
  }

  // Return the response and end the edge function as JSON
  const jsonBody = JSON.stringify(body)
  context.responseWith(new Response(jsonBody, 200, { headers: { 'Content-Type': 'application/json' } }))
```

<edgejs>
Edge JS
</edgejs>

**Default Behavior:** By default, our CDN does not execute any Edge Functions.
