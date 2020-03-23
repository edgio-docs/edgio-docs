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

The path to a custom server used to run your JavaScript functions in the cloud.  The function takes an [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest) and an [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse). An [Express Application](https://expressjs.com/en/4x/api.html#app) can also be used here.

