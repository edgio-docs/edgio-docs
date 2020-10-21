# xdn.config.js

The `xdn.config.js` config file in your app's root directory contains configuration options that control how your app runs on the Moovweb XDN. This file is automatically created when you run `xdn init`. It should export an object with the following properties:

## backends

The `backends` config is an object whose keys are backend names and whose values are:

| Property         | Type    | Description |
| ---------------- | ------- | ----------- |
| domainOrIp       | String  | (Required) The domain or ip address for the backend site or API. |
| hostHeader       | String  | A value to send as the `host` header when sending requests to the backend site or API. By default the host header sent from the browser is used. |
| disableCheckCert | Boolean | A flag to turn off the TLS certificate check when making proxy requests to the backend site or API. By default it is `false` and for security purposes we strongly recommend that it is kept `false` in production environments. When using this option, you may also want to run your app with the `NODE_TLS_REJECT_UNAUTHORIZED` environment variable set to "0" to allow node to fetch from sites with invalid certificates. |
| port             | Number  | The port on which the backend receives https requests. Defaults to 443 but you can specify any other acceptable port value. Note that specifying `80` has no special meaning as XDN will never send secured requests to unsecured backends. To [enable HTTP traffic](security#section_ssl) on a backend you must have a route matching `http` protocol in your router and serve content from that route. All HTTP traffic assumes port `80` on the backend. |

## routes

The path to your routes file relative to the root of your app. Defaults to `routes.js`.

## server

Allows you to configure a custom server used to run your JavaScript functions in the cloud. The value is an object with two properties:

- path - The path to the custom server module
- export - The name of the export. You don't need to specify this if using `export default`.

The custom server module must export a function which accepts a [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest) and an [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse). An [Express Application](https://expressjs.com/en/4x/api.html#app) can also be used here.

** Example **

```js
// xdn.config.js

module.exports = {
  server: {
    path: '/server/server.js',
  },
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

## includeFiles

Allows you to include additional resources in the bundle that is deployed to the Moovweb XDN's serverless JS workers. Keys are [globs](https://www.npmjs.com/package/glob), value can be a boolean or string. This is typically used to ensure that resources that need to be dynamically required at runtime such as build manifests for server-side rendering or other config files are present in the cloud.

** Examples **

```js
includeFiles: {
  'lang/**/*': true,
},
```

or if you need to copy into a specific directory within the XDN build:

```js
includeFiles: {
  'lang/**/*': 'another/dir/in/xdn/lambda',
},
```

## prerenderConcurrency

The maximum number of URLs that will be concurrently prendered during deployment when [static prerendering](/guides/static_prerendering) is enabled. Defaults to 200, which is the maximum allowed value.

## sources

A list of glob patterns identifying which source files should be uploaded when running `xdn deploy --includeSources`. This option is primary used to share source code with Moovweb support personnel for the purpose of debugging. If omitted, `xdn deploy --includeSources` will result in all files which are not gitignored being uploaded to the XDN.

Example:

```js
sources: [
  '**/*', // include all files
  '!(**/secrets/**/*)', // except everything in the secrets directory
]
```
