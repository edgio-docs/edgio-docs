---
title: {{ CONFIG_FILE }} Configuration
---

The `{{ CONFIG_FILE }}` config file in your app's root directory contains configuration options that control how your app runs on {{ PRODUCT_NAME }}. This file is automatically created when you run `{{ FULL_CLI_NAME }} init`. It should export an object with the following properties:

## backends {/*backends*/}

The `backends` config is an object whose keys are backend names and whose values are:

| Property         | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| domainOrIp       | String  | (Required) The domain or ip address for the backend site or API.                                                                                                                                                                                                                                                                                                                                                                                                           |
| hostHeader       | String  | A value to send as the `host` header when sending requests to the backend site or API. By default the host header sent from the browser is used.                                                                                                                                                                                                                                                                                                                           |
| disableCheckCert | Boolean | A flag to turn off the TLS certificate check when making proxy requests to the backend site or API. By default it is `false` and for security purposes we strongly recommend that it is kept `false` in production environments. When using this option, you may also want to run your app with the `NODE_TLS_REJECT_UNAUTHORIZED` environment variable set to "0" to allow node to fetch from sites with invalid certificates.                                            |
| port             | Number  | The port on which the backend receives https requests. Defaults to 443 but you can specify any other acceptable port value. Note that specifying `80` has no special meaning as {{ PRODUCT_NAME }} will never send secured requests to unsecured backends. To [enable HTTP traffic](/guides/security/security_suite#ssl) on a backend you must have a route matching `http` protocol in your router and serve content from that route. All HTTP traffic assumes port `80` on the backend. |

### Custom Ports {/*customports*/}
 
For security reasons, you must use the [compute](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute) function to proxy requests to a custom port (i.e., a port other than 443 or 80). 

The following sample code demonstrates how to proxy to a backend (i.e., `commerce`) whose `port` property has been set to a custom port:

```js filename="./routes.js"
// proxy to a custom port through Serverless Compute 
.match(
  '/:path*',
  ({ proxy, compute }) => {
    compute(async (req) => {
      await proxy('commerce');
    });
  }
)
```

## connector {/*connector*/}

The name of the connector package corresponding to the framework your app uses, or the path to a directory that implements the [connector interface](/guides/sites_frameworks/connectors).

**Example**

To use a connector package:

```js
module.exports = {
  connector: '{{ PACKAGE_NAME }}/next',
};
```

To implement a connector directly within your project:

```js
// this directory should have build.js, prod.js, and dev.js
module.exports = {
  connector: './path/to/connector/dir'
};
```

## routes {/*routes*/}

The path to your routes file relative to the root of your app. Defaults to `routes.js`.

## includeNodeModules {/*includenodemodules*/}

If `true`, the packages listed in the `dependencies` property of `package.json` will be included in the build that is deployed to {{ PRODUCT_NAME }}.

## includeFiles {/*includefiles*/}

Allows you to include additional resources in the bundle that is deployed to {{ PRODUCT_NAME }}'s serverless JS workers. Keys are [globs](https://www.npmjs.com/package/glob), value can be a boolean or string. This is typically used to ensure that resources that need to be dynamically required at runtime such as build manifests for server-side rendering or other config files are present in the cloud.

** Examples **

```js
includeFiles: {
  'lang/**/*': true,
},
```

or if you need to copy into a specific directory within the {{ PRODUCT_NAME }} build:

```js
includeFiles: {
  'lang/**/*': 'another/dir/lambda',
},
```

<Callout type="info">

  Keys (globs) with value as false (`boolean`) will not remove the referenced resources from the build.

</Callout>

## prerenderConcurrency {/*prerenderconcurrency*/}

The maximum number of URLs that will be concurrently prerendered during deployment when [static prerendering](/guides/performance/static_prerendering) is enabled. Defaults to 200, which is the maximum allowed value.

## sources {/*sources*/}

A list of glob patterns identifying which source files should be uploaded when running `{{ FULL_CLI_NAME }} deploy --includeSources`. This option is primary used to share source code with {{ PRODUCT_NAME }} support personnel for the purpose of debugging. If omitted, `{{ FULL_CLI_NAME }} deploy --includeSources` will result in all files which are not gitignored being uploaded to {{ PRODUCT_NAME }}.

Example:

```js
sources: [
  '**/*', // include all files
  '!(**/secrets/**/*)', // except everything in the secrets directory
]
```

<a id="example-config"></a>

## Example {{ CONFIG_FILE }} {/*example*/}

```js
// This file was automatically added by {{ FULL_CLI_NAME }} deploy.
// You should commit this file to source control.
module.exports = {
  backends: {
    origin: {
      // The domain name or IP address of the origin server
      domainOrIp: "example.com",

      // When provided, the following value will be sent as the host header 
      // when connecting to the origin. If omitted, the host header from 
      // the browser will be forwarded to the origin.
      hostHeader: "example.com",

      // Uncomment the following line if TLS is not set up properly on the 
      // origin domain and you want to ignore TLS errors
      disableCheckCert: true,

      // Overrides the default ports (80 for http and 443 for https) and 
      // instead use a specific port when connecting to the origin
      port: 1337,
    },
  },

  // The name of the site in {{ PRODUCT }} to which this app should be deployed.
  name: "example.com",

  // The name of the team in {{ PRODUCT }} to which this app should be deployed.
  team: 'my-team-name',

  // Overrides the default path to the routes file. The path should be relative 
  // to the root of your app.
  routes: 'routes.js',

  // The maximum number of URLs that will be concurrently prendered during 
  // deployment when static prerendering is enabled. Defaults to 200, which is 
  // the maximum allowed value.
  prerenderConcurrency: 200,

  // A list of glob patterns identifying which source files should be uploaded 
  // when running {{ FULL_CLI_NAME }} deploy --includeSources. This option is primarily used 
  // to share source code with {{ PRODUCT }} support personnel for the purpose of 
  // debugging. If omitted, {{ FULL_CLI_NAME }} deploy --includeSources will result in all 
  // files which are not gitignored being uploaded to {{ PRODUCT }}.
  //
  sources : [
     '**/*', // include all files
     '!(**/secrets/**/*)', // except everything in the secrets directory
  ],

  // Set to true to include all packages listed in the dependencies property 
  // of package.json when deploying to {{ PRODUCT }}.  This option generally isn't 
  // needed as {{ PRODUCT }} automatically includes all modules imported by your 
  // code in the bundle that is uploaded during deployment
  //
  includeNodeModules: true,
};
```
