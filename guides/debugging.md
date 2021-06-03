# Debugging

This guide shows you how to debug applications running locally behind {{ PRODUCT_NAME }}.

## Visual Studio Code

To debug a {{ PRODUCT_NAME }} application in Visual Studio Code:

- open `.vscode/launch.json`
- Click "Add Configuration..." and select "Node.js: Launch Program"

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

## Cloud

{{ PRODUCT_NAME }} provides two types of logs to you debug issues with your application:

- [Server logs](/guides/logs#section_server_logs)

By viewing the server logs in the {{ PRODUCT_NAME }} Developer Console, you can see all of the messages logged by your application using console.log, console.warn, etc... By enabling [HTTP request logging](/guides/logs#section_http_request_logging) in your environment, you can also see the headers and body of every request and response served by your application via the Layer0 serverless cloud. You can also see each upstream API request made by your application.

You can also use the server logs to debug routing issues going to custom backends by temporarily moving the proxying from the edge to serverless:

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

Note that whenever possible, we strongly recommend to always proxy the traffic from the edge, as that is more performant and avoids serverless surcharges. The solution above should only be used as a temporary measure while debugging issues.

- [Access logs](/guides/logs#section_access_logs)

Access logs contain information about all requests, even those that never reach your application code (e.g. cache hits, static assets, requests routed to custom backends, edge redirects, and so on).
