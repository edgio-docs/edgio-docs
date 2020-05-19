# xdn.config.js

The `xdn.config.js` config file in your app's root directory contains configuration options that control how your app runs on the Moovweb XDN. This file is automatically created when you run `xdn init`. It should export an object with the following properties:

## backends

The `backends` config is an object whose keys are backend names and whose values are:

| Property | Type | Description |
| -------- | ---- | ----------- |
| domainOrIp | String | (Required) The domain or ip address for the backend site |
| hostHeader | String | A value to send as the `host` header when sending requests to the backend site.  By default the host header sent from the browser is used. |

## routes

The path to your routes file relative to the root of your app.  Defaults to `routes.js`.

## server

Allows you to configure a custom server used to run your JavaScript functions in the cloud. The value is an object with two properties:

* path - The path to the custom server module 
* export - The name of the export. You don't need to specify this if using `export default`.

The custom server module must export a function which accepts a [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest) and an [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse). An [Express Application](https://expressjs.com/en/4x/api.html#app) can also be used here.

** Example **

```js
// xdn.config.js

module.exports = {
  server: {
    path: '/server/server.js'
  }
}
```

```js
// server/server.js

export default function(req, res) {
  // send a response and call res.end()
}
```

## includeNodeModules

If `true`, the packages listed in the `dependencies` property of `package.json` will be included in the build that is deployed to the Moovweb XDN. 
