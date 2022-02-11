# Troubleshooting

This guide shows you how to troubleshoot applications running on {{ PRODUCT_NAME }}. Below are some steps to follow when working locally or attempting to address site performance.

## Server Timings

When measuring the performance of your server, we provide numerous headers to decipher timings of requests. Visit our section on [response headers](/guides/response_headers#section_server_timing) for an in-depth explanation on the values available and how to leverage them.

## Visual Studio Code

To debug a {{ PRODUCT_NAME }} application in Visual Studio Code:

- Open `.vscode/launch.json`.
- Click _Add Configuration..._ and select _Node.js: Launch Program_.

Edit the resulting configuration to look like this:

```js
{
  "name": "Debug {{ PRODUCT_NAME }} App",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceFolder}",
  "autoAttachChildProcesses": true,
  "program": "${workspaceFolder}/node_modules/{{ PACKAGE_NAME }}/cli",
  "args": ["run"]
}
```

The above assumes that the workspace folder is your app's root directory. If that is not the case, adjust `program` and `cwd` accordingly. The `program` config should always point to `{{ PACKAGE_NAME }}/cli`. The `cwd` config should point to the root directory of your app.

Note that this configuration will allow you to set breakpoints in both your {{ PRODUCT_NAME }} router as well as your application code (for example in Next.js, Nuxt.js, Angular, etc...).

## Logs

{{ PRODUCT_NAME }} provides two types of logs to help you debug issues with your application.

### [Server Logs](/guides/logs#section_server_logs)

By viewing the server logs in the {{ PRODUCT_NAME }} Developer Console, you can see all of the messages logged by your application using `console.log`, `console.warn`, etc...

By enabling [Deep Request Inspection](/guides/logs#section_http_request_logging) in your environment, you can also see the headers and body of every request and response served by your application via the Layer0 serverless cloud. You can also see each upstream API request made by your application.

You can also use the server logs to debug **routing issues** going to **custom backends** by temporarily moving the proxy from the edge to serverless:

```js
  .get('/p/:productId', ({ cache }) => {
    proxy('origin', {
      // The presence of transformRequest and transformResponse ensure that proxying is done in serverless, not at the edge.
      transformRequest: (req) => {
        console.log('Request ID', req.headers['x-request-id'])
        // Log request properties that you want to troubleshoot.
      },
      transformResponse: (res, req) => {
        console.log('Response for request ID', req.headers['x-request-id'], 'status code', res.statusCode)
        // Log response properties that you want to troubleshoot.
      }
    })
  })
```

Once you have this deployed, you can observe the output in your [server logs](/guides/logs#section_server_logs).

Note that whenever possible, we strongly recommend to always proxy the traffic from the edge, as that is more performant and avoids serverless surcharges. The solution above should only be used as a temporary measure while addressing issues.

[Learn more](/guides/logs#section_server_logs?button)

### Access Logs

Access logs contain information about all requests, even those that never reach your application code (e.g. cache hits, static assets, requests routed to custom backends, edge redirects, and so on).

[Learn more](/guides/logs#section_access_logs)

## Confirming Behavior with CURL

Removing the browser as a variable in your equation is a good way to confirm what the origin server is doing. Below are a few of the common CURL commands we leverage to verify behavior.

The option `-k` will not validate a SSL certificate if that is not yet configured.

**View Headers Only**

```bash
curl -o/dev/null -vv https://www.yoursite.com
```

**Bypass DNS Resolution**

Connect directly to the address listed after. This is good for sending a request straight to origin and bypassing Layer0, or testing a connection to Layer0 before DNS cutover. Setting up a localhost DNS configuration is usually better for this if possible.

```bash
curl -o/dev/null -vv
    https://www.yoursite.com --connect-to ::35.241.39.58
```

**Specify a Cookie**

Typically used for split test validation.

```bash
curl -o/dev/null -vv
    -H "Cookie: cache_enabled=true" https://www.yoursite.com/main.js
```

**Send a Specific User agent**

```bash
curl -o/dev/null -vv
    -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone10,2;FBMD/iPhone;FBSN/iOS;FBSV/13.6.1;FBSS/3;FBID/phone;FBLC/en_GB;FBOP/5];FBNV/1"
```

**Skip the Cache**

Adding a `layer0_debug=true` to the query parameter will skip the cache and make it easy to check for dynamic data (i.e. personalized content). Append grep to search for specific values within the response output.

```bash
curl -vv --silent https://www.yoursite.com/?layer0_debug=true 2>&1 | grep minicart-quantity
```

`2>&1` is only present to make terminal work with `grep`

## Checking your Permalinks vs Edge links

A Permalink request will skip the edge (cache) and go straight to the serverless tier. This will likely degrade performance, but does allow for verification of a function.

The edge link will route through the edge.

You can find both links on the detail page of a deployment.

## Cache Reasons

We provide a header, `x-0-caching-status` to best understand why something is being cached. There is a [detailed guide](guides/caching#section_why_is_my_response_not_being_cached_) available on deciphering those reasons.

## Source Maps

Layer0 automatically produces a source map for your router file so that all runtime errors that occur during routing will have a stacktrace that references the original source file. If your application build produces source maps for the server bundle, these will also be used when reporting errors. Layer0 provides a convenient way to enable source maps when using Next and Nuxt:

### Next.js

Set `{{ FULL_CLI_NAME }}SourceMaps: true` in your `next.config.js`:

```js
// next.config.js

const { withLayer0, withServiceWorker } = require('@layer0/next/config')

module.exports = withLayer0(
  withServiceWorker({
    // Output sourcemaps so that stacktraces have original source filenames and line numbers when tailing
    // the logs in the Layer0 developer console.
    {{ FULL_CLI_NAME }}SourceMaps: true,
  }),
)
```

### Nuxt.js

Set `{{ FULL_CLI_NAME }}SourceMaps: true` in the config for `@layer0/nuxt/module` in `buildModules` in `nuxt.config.js`:

```js
// nuxt.config.js

module.exports = {
  // ...
  buildModules: [['@layer0/nuxt/module', { {{ FULL_CLI_NAME }}SourceMaps: true }]],
  // ...
}
```

**Note:** The reason that application level source maps are not enabled by default is that they can be quite large and cause the serverless bundle to be larger than the 50MB limit.
