---
title: {{ CONFIG_FILE }} Configuration
---

The `{{ CONFIG_FILE }}` config file in your app's root directory contains configuration options that control how your app runs on {{ PRODUCT_NAME }}. This file is automatically created when you run `{{ FULL_CLI_NAME }} init`. It should export an object with the following properties:

## origins {/*origins*/}

The `origins` config is an array of objects whose properties are:

| Property                                   | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|--------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`                                     | string   | (Required) The origin name refered within the router.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `override_host_header`                     | string   | The host header sent from the browser when connecting to the origin. This is useful when you want to connect to a backend that is configured to serve content from a different domain than the one that the browser is connecting to. For example, if you want to connect to a backend that is configured to serve content from `example.com` but the browser is connecting to `www.example.com`, you can set `override_host_header` to `example.com` to ensure that the backend receives the correct host header. |
| `hosts`                                    | object[] | An array of objects for which to connect to when proxying requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `hosts.location`                           | string   | (Required) The domain name or IP address of the origin server                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `hosts.port`                               | number   | The port on which the backend receives https requests. Defaults to 443 but you can specify any other acceptable port value. Note that specifying `80` has no special meaning as {{ PRODUCT_NAME }} will never send secured requests to unsecured backends. To [enable HTTP traffic](/guides/security/security_suite#ssl) on a backend you must have a route matching `http` protocol in your router and serve content from that route. All HTTP traffic assumes port `80` on the backend.                          |
| `shields`                                  | object   | A map of shield names to POP codes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `shields.apac`                             | string   | The POP code for the Asia Pacific shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `shields.emea`                             | string   | The POP code for the Europe, Middle East, and Africa shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `shields.us_west`                          | string   | The POP code for the US West shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `shields.us_east`                          | string   | The POP code for the US East shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tls_verify`                               | object   | An object that specifies how {{ PRODUCT_NAME }} should verify the TLS certificate presented by the origin.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `tls_verify.use_sni`                       | boolean  | Whether to use SNI when connecting to the origin. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tls_verify.sni_hint_and_strict_san_check` | string   | SNI hint and enforce origin SAN/CN checking.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tls_verify.allow_self_signed_certs`       | boolean  | Whether to allow self-signed certificates. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `tls_verify.pinned_certs`                  | string[] | An array of SHA256 hashes of pinned certificates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

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

## staticAssets {/*staticassets*/}

The `staticAssets` config is an Object[] determining how {{ PRODUCT_NAME }} handles static assets in your app configured with the following properties:

| Property    | Type     | Description                                                                                          |
|-------------|----------|------------------------------------------------------------------------------------------------------|
| `permanent` | boolean  | Set to `true` if the file has a hash in path so that it can be considered unique across deployments. |
| `glob`      | string[] | A list of glob patterns that match or omit files to be included.                                     |

## serverless {/*serverless*/}

The `serverless` config Object includes the following properties:

| Property             | Type     | Description                                                                                                                                           |
|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `includeNodeModules` | boolean  | If `true`, the packages listed in the `dependencies` property of `package.json` will be included in the build that is deployed to {{ PRODUCT_NAME }}. |
| `include`            | string[] | A list of glob patterns that match or omit files to be included in the serverless bundle. Example: `lang/**/*`                                        |

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
// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/guides/edgio_config
module.exports = {
  // The name of the site in Edgio to which this app should be deployed.
  // name: 'my-site-name',

  // The name of the team in Edgio to which this app should be deployed.
  // team: 'my-team-name',

  // Overrides the default path to the routes file. The path should be relative to the root of your app.
  // routes: 'routes.js',

  origins: [
    {
      // The name of the backend origin
      name: 'origin',

      // Uncomment the following to override the host header sent from the browser when connecting to the origin
      // override_host_header: 'example.com',

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'example.com',
        },
      ],

      // Uncomment the following to configure a shield
      // shields: { us_east: 'DCD' },
    },
  ],

  // Options for hosting serverless functions on Edgio
  // serverless: {
  //   // Set to true to include all packages listed in the dependencies property of package.json when deploying to Edgio.
  //   // This option generally isn't needed as Edgio automatically includes all modules imported by your code in the bundle that
  //   // is uploaded during deployment
  //   includeNodeModules: true,
  //
  //   // Include additional paths that are dynamically loaded by your app at runtime here when building the serverless bundle.
  //   include: ['views/**/*'],
  // },

  // The maximum number of URLs that will be concurrently prerendered during deployment when static prerendering is enabled.
  // Defaults to 200, which is the maximum allowed value.
  // prerenderConcurrency: 200,

  // A list of glob patterns identifying which source files should be uploaded when running edgio deploy --includeSources.
  // This option is primarily used to share source code with Edgio support personnel for the purpose of debugging. If omitted,
  // edgio deploy --includeSources will result in all files which are not gitignored being uploaded to Edgio.
  //
  // sources : [
  //   '**/*', // include all files
  //   '!(**/secrets/**/*)', // except everything in the secrets directory
  // ],
}
```
