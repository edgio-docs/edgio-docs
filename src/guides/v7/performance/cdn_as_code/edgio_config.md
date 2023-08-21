---
title: {{ CONFIG_FILE }} Configuration
---

The `{{ CONFIG_FILE }}` config file in your app's root directory contains configuration properties (referred to by their key) that control how your app runs on {{ PRODUCT_NAME }}. This file is automatically created when you run `{{ FULL_CLI_NAME }} init`. It should export an object with the following properties:

## name {/* name */}

The `name` key is the name your property will be deployed under. If this is omitted, the `name` key in your `package.json` will be used.

## team {/* team */}

The `team` key is the name of the team your property will be deployed under. If this is omitted, the deployment will be created under your personal (Private Space) team.

## routes {/* routes */}

The `routes` key is the path to your routes file relative to the root of your project. Defaults to `routes.js`.

## origins {/* origins */}

Origns are the backends that {{ PRODUCT_NAME }} will proxy requests to, and define how {{ PRODUCT_NAME }} will communicate with your web server(s).

The `origins` key is an array of objects whose properties are:

| Property                                   | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                                     | String   | (Required) The origin name refered within the router.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `override_host_header`                     | String   | The host header sent from the browser when connecting to the origin. This is useful when you want to connect to a backend that is configured to serve content from a different domain than the one that the browser is connecting to. For example, if you want to connect to a backend that is configured to serve content from `example.com` but the browser is connecting to `www.example.com`, you can set `override_host_header` to `example.com` to ensure that the backend receives the correct host header. |
| `hosts`                                    | Object[] | An array of objects that define how {{ PRODUCT }} will proxy requests for this origin configuration. requests.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `hosts[].location`                         | Object   | Contains properties that define the location to which {{ PRODUCT }} will proxy requests for this origin configuration.                                                                                                                                                                                                                                                                                                                                                                                             |
| `hosts[].location.hostname`                | String   | (Required) The domain name or IP address of the origin server                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `hosts[].location.port`                    | Number   | The port on which the backend receives https requests. Defaults to 443 but you can specify any other acceptable port value. Note that specifying `80` has no special meaning as {{ PRODUCT_NAME }} will never send secured requests to unsecured backends. To [enable HTTP traffic](/guides/security/edgejs_security#ssl) on a backend you must have a route matching `http` protocol in your router and serve content from that route. All HTTP traffic assumes port `80` on the backend.                         |
| `shields`                                  | Object   | Defines how {{ PRODUCT }} will shield your origin configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `shields.apac`                             | String   | The POP code for the Asia Pacific shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `shields.emea`                             | String   | The POP code for the Europe, Middle East, and Africa shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `shields.us_west`                          | String   | The POP code for the US West shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `shields.us_east`                          | String   | The POP code for the US East shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tls_verify`                               | Object   | An object that specifies how {{ PRODUCT_NAME }} should verify the TLS certificate presented by the origin.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `tls_verify.use_sni`                       | Boolean  | Whether to use SNI when connecting to the origin. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tls_verify.sni_hint_and_strict_san_check` | String   | SNI hint and enforce origin SAN/CN checking.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tls_verify.allow_self_signed_certs`       | Boolean  | Whether to allow self-signed certificates. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `tls_verify.pinned_certs`                  | String[] | An array of SHA256 hashes of pinned certificates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## environments {/* environments */}

This configuration allows you to define different deployment environments and hostnames for your app. This is useful for deploying to staging or production environments.

The `environments` key is an object whose properties define the name of the environment and whose values are objects with the following properties:

| Property                                     | Type     | Description                                                                      |
| -------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `<ENV_NAME>`                                 | String   | (Required) The name of the environment.                                          |
| `<ENV_NAME>.hostnames`                       | Object[] | A list of hostnames specific to the environment.                                 |
| `<ENV_NAME>.hostnames[].hostname`            | String   | (Required) The hostname for the environment.                                     |
| `<ENV_NAME>.hostnames[].default_origin_name` | String   | Optional default origin this hostname should use                                 |
| `<ENV_NAME>.hostnames[].tls`                 | Object   | Optional [TLS configuration](/docs/api/core/interfaces/types.Hostnames.html#tls) |

<!--| `<ENV_NAME>.hostnames[].report_code` | Number | (unknown use) | -->

## connector {/* connector */}

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
  connector: './path/to/connector/dir',
};
```

## staticAssets {/* staticassets */}

The `staticAssets` key is an array of objects determining how {{ PRODUCT_NAME }} handles static assets in your app configured with the following properties:

| Property    | Type     | Description                                                                                          |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `permanent` | Boolean  | Set to `true` if the file has a hash in path so that it can be considered unique across deployments. |
| `glob`      | String[] | A list of glob patterns that match or omit files to be included.                                     |

## serverless {/* serverless */}

The `serverless` key is an object with the following properties:

| Property             | Type     | Description                                                                                                                                           |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `includeNodeModules` | Boolean  | If `true`, the packages listed in the `dependencies` property of `package.json` will be included in the build that is deployed to {{ PRODUCT_NAME }}. |
| `include`            | String[] | A list of glob patterns that match or omit files to be included in the serverless bundle. Example: `lang/**/*`                                        |

<!--
## prerenderConcurrency {/* prerenderconcurrency */}

The maximum number of URLs that will be concurrently prerendered during deployment when [static prerendering](/guides/performance/static_prerendering) is enabled. Defaults to 200, which is the maximum allowed value.-->

## sources {/* sources */}

A list of glob patterns identifying which source files should be uploaded when running `{{ FULL_CLI_NAME }} deploy --includeSources`. This option is primary used to share source code with {{ PRODUCT_NAME }} support personnel for the purpose of debugging. If omitted, `{{ FULL_CLI_NAME }} deploy --includeSources` will result in all files which are not gitignored being uploaded to {{ PRODUCT_NAME }}.

Example:

```js
sources: [
  '**/*', // include all files
  '!(**/secrets/**/*)', // except everything in the secrets directory
];
```

## interpolationValues {/* interpolation-values */}

The `interpolationValues` key is utilized for managing [feature variables](/guides/performance/rules/feature_variables) that are needed for content interpolation in the production environment but are not available in local development.

| Property                       | Type   |
| ------------------------------ | ------ |
| `geo_city`                     | string |
| `geo_country`                  | string |
| `geo_latitude`                 | string |
| `geo_longitude`                | string |
| `geo_postal_code`              | string |
| `is_origin_shield`             | string |
| `is_subrequest`                | string |
| `physical_doc_root`            | string |
| `physical_path`                | string |
| `physical_rel_path`            | string |
| `referring_domain`             | string |
| `virt_dst_asnum`               | string |
| `virt_dst_continent`           | string |
| `virt_dst_country`             | string |
| `virt_dst_port`                | string |
| `virt_http_version`            | string |
| `virt_ssl_cipher`              | string |
| `virt_ssl_client_cipher_codes` | string |
| `virt_ssl_client_ciphers`      | string |
| `virt_ssl_client_tlsext_ids`   | string |
| `virt_ssl_protocol`            | string |
| `wurfl_cap_is_tablet`          | string |
| `wurfl_cap_mobile_browser`     | string |
| `wurfl_vcap_is_android`        | string |
| `wurfl_vcap_is_full_desktop`   | string |
| `wurfl_vcap_is_ios`            | string |
| `wurfl_vcap_is_robot`          | string |
| `wurfl_vcap_is_smartphone`     | string |

For instance, the value `virt_dst_country` is only available in a production environment. To enable this value for local development, you should set the following property:

```js
interpolationValues.virt_dst_country: 'US'
```

Setting these properties can replicate the behavior of the production environment within your local development workspace.

<a id="example-config"></a>

## Example {{ CONFIG_FILE }} {/* example */}

See the full API specification for the {{ CONFIG_FILE }} file [here](/docs/api/core/interfaces/config.default.html).

```js
// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at {{ DOCS_URL }}/guides/performance/cdn_as_code/edgio_config
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

      // Use the following to override the host header sent from the browser when connecting to the origin
      override_host_header: 'origin.my-site.com',

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'origin.my-site.com',
        },
      ],

      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: 'origin.my-site.com',
      },

      // Uncomment the following to configure a shield
      // shields: { us_east: 'DCD' },
    },
  ],

  // Uncomment the following to specify environment specific configs
  // environments: {
  //   production: {
  //     hostnames: [{ hostname: 'www.mysite.com' }],
  //   },
  //   staging: {
  //     hostnames: [{ hostname: 'staging.mysite.com' }],
  //     origins: [
  //       {
  //         name: 'origin',
  //         hosts: [{ location: 'staging-origin.mysite.com' }],
  //         override_host_header: 'staging-origin.mysite.com',
  //         tls_verify: {
  //           use_sni: true,
  //           sni_hint_and_strict_san_check: 'staging-origin.mysite.com',
  //         },
  //         shields: { us_east: 'DCD' },
  //       },
  //     ],
  //   },
  // },

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
};
```
