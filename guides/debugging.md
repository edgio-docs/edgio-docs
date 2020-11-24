# Debugging

This guide shows you how to debug applications running locally behind the XDN.

## Visual Studio Code

To debug an XDN application in Visual Studio Code:

- open `.vscode/launch.json`
- Click "Add Configuration..." and select "Node.js: Launch Program"

Edit the resulting configuration to look like this:

```js
{
  "name": "Debug XDN App",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceFolder}",
  "autoAttachChildProcesses": true,
  "program": "${workspaceFolder}/node_modules/@xdn/cli",
  "args": ["run"]
}
```

The above assumes that the workspace folder is your app's root directory. If that is not the case, adjust `program` and `cwd` accordingly. The `program` config should always point to `@xdn/cli`. The `cwd` config should point to the root directory of your app.

Note that this configuration will allow you to set breakpoints in both your XDN router as well as your application code (for example in Next.js, Nuxt.js, Angular, etc...).

## Cloud

Your main tool in debugging XDN appplications that have been deployed are two sources of logs:

* [Server logs](/guides/logs#section_server_logs)
* [Access logs](/guides/logs#section_access_logs)

Server logs will capture the output of your serverless in real time while access logs have complete traffic that is being served by your site including all the traffic that never reaches your serverless (e.g. cache hits, static assets, requests routed to custom backends, edge redirects, and so on).

To leverage server logs to debug routing issues going to custom backends, you can temporarily move the proxying from the edge to serverless:

```js
  .get('/p/:productId', ({ cache }) => {
    proxy('origin', {
      transformRequest: (req) => {
        console.log('Request ID', req.headers['x-request-id'])
        // Log request properties that you want to troubleshoot.
      },
      transformResponse: (req, res) => {
        console.log('Response for request ID', req.headers['x-request-id'], 'status code', res.statusCode)
        // Log response properties that you want to troubleshoot.
      }
    })
  })
```

Once you have this deployed, you can observe the logs in your [server logs](/guides/logs#section_server_logs).

Note that, whenever possible, we strongly recommend to always proxy the traffic from the edge, as that is more performant and avoids serverless surcharges. The solution above should only be used as a temporary measure while debugging issues.
