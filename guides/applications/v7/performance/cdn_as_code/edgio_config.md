---
title: {{ CONFIG_FILE }} Configuration
---

The `{{ CONFIG_FILE }}` config file in your app's root directory contains configuration properties (referred to by their key) that control how your app runs on {{ PRODUCT_NAME }}. This file is automatically created when you run `{{ FULL_CLI_NAME }} init`. It should export an object with the following properties:

## name {/* name */}

The `name` key is the name your property will be deployed under. If this is omitted, the `name` key in your `package.json` will be used.

## team {/* team */}

The `team` key is the name of the organization your property will be deployed under. If this is omitted, the deployment will be created under your personal (Private Space) organization.

## routes {/* routes */}

The `routes` key is the path to your routes file relative to the root of your project. Defaults to `routes.js`.

## origins {/* origins */}

Origins are the backends that {{ PRODUCT_NAME }} will proxy requests to, and define how {{ PRODUCT_NAME }} will communicate with your web server(s). Origins defined here will be available across all environments and can be overridden on a [per-environment basis](#environments).

The `origins` key is an array of objects whose properties are:

| Property                                   | Type                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                                     | `string`                                                                     | (Required) The origin name referred within the router.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `override_host_header`                     | `string`                                                                     | The host header sent from the browser when connecting to the origin. This is useful when you want to connect to a backend that is configured to serve content from a different domain than the one that the browser is connecting to. For example, if you want to connect to a backend that is configured to serve content from `example.com` but the browser is connecting to `www.example.com`, you can set `override_host_header` to `example.com` to ensure that the backend receives the correct host header. |
| `hosts`                                    | `Array<Object>`                                                              | An array of objects that define how {{ PRODUCT }} will proxy requests for this origin configuration.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `hosts[].location`                         | `string` \| `Array<string>` \| `Array<{ hostname: string; port?: number; }>` | Contains properties that define the location to which {{ PRODUCT }} will proxy requests for this origin configuration.                                                                                                                                                                                                                                                                                                                                                                                             |
| `hosts[].location[].hostname`              | `string`                                                                     | (Required) The domain name or IP address of the origin server.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `hosts[].location[].port`                  | `number`                                                                     | The port on which the backend receives https requests. Defaults to 443 but you can specify any other acceptable port value. Note that specifying `80` has no special meaning as {{ PRODUCT_NAME }} will never send secured requests to unsecured backends. To [enable HTTP traffic](/applications/security/edgejs_security#ssl) on a backend you must have a route matching `http` protocol in your router and serve content from that route. All HTTP traffic assumes port `80` on the backend.                         |
| `hosts[].scheme`                           | `string`                                                                     | The scheme to use when connecting to the origin. Possible values are `https`, `http`, and `match`. Defaults to `match`, using the same scheme as the incoming request. Required when `hosts[].location[].port` is defined.                                                                                                                                                                                                                                                                                         |
| `shields`                                  | `Object`                                                                     | Defines how {{ PRODUCT }} will shield your origin configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `shields.apac`                             | `string`                                                                     | The POP code for the Asia Pacific shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `shields.emea`                             | `string`                                                                     | The POP code for the Europe, Middle East, and Africa shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `shields.us_west`                          | `string`                                                                     | The POP code for the US West shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `shields.us_east`                          | `string`                                                                     | The POP code for the US East shield.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tls_verify`                               | `Object`                                                                     | An object that specifies how {{ PRODUCT_NAME }} should verify the TLS certificate presented by the origin.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `tls_verify.use_sni`                       | `boolean`                                                                    | Whether to use SNI when connecting to the origin. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tls_verify.sni_hint_and_strict_san_check` | `string`                                                                     | SNI hint and enforce origin SAN/CN checking.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tls_verify.allow_self_signed_certs`       | `boolean`                                                                    | Whether to allow self-signed certificates. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `tls_verify.pinned_certs`                  | `Array<string>`                                                              | An array of SHA256 hashes of pinned certificates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Sample Configuration**

```js
/* ... */
origins: [
  {
    // The name of the backend origin
    name: 'origin',

    // Use the following to override the host header sent from the browser when connecting to the origin
    override_host_header: 'test-origin.edgio.net',

    // The list of origin hosts to which to connect
    hosts: [
      {
        // The domain name or IP address of the origin server
        location: 'test-origin.edgio.net',
      },
    ],

    tls_verify: {
      use_sni: true,
      sni_hint_and_strict_san_check: 'test-origin.edgio.net',
    },

    // Uncomment the following to configure a shield
    // shields: { us_east: 'DCD' },
  },
],
/* ... */
```

## environments {/* environments */}

This configuration allows you to define different deployment environments, hostnames, and override origin configurations on a per-environment basis.

The `environments` key is an object whose properties define the name of the environment and whose values are objects with the following properties:

| Property                                     | Type     | Description                                                                                                                                                                                                                                      |
| -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<ENV_NAME>`                                 | String   | (Required) The name of the environment.                                                                                                                                                                                                          |
| `<ENV_NAME>.hostnames`                       | Object[] | A list of hostnames specific to the environment.                                                                                                                                                                                                 |
| `<ENV_NAME>.hostnames[].hostname`            | String   | (Required) The hostname for the environment.                                                                                                                                                                                                     |
| `<ENV_NAME>.hostnames[].default_origin_name` | String   | Optional default origin this hostname should use                                                                                                                                                                                                 |
| `<ENV_NAME>.hostnames[].tls`                 | Object   | Optional [TLS configuration](/docs/v7.x/api/core/interfaces/types.Hostnames.html#tls)                                                                                                                                                                 |
| `<ENV_NAME>.origins`                         | Object[] | A list of origin configurations that override those defined within the [origins property](#origins). <Important> An origin configuration defined within this property is ignored when a corresponding one is not found at the root. </Important> |

**Sample Configuration**

```js
/* ... */

// Global origins configuration
origins: [
  {
    // The name of the backend origin
    name: 'web',

    // Use the following to override the host header sent from the browser when connecting to the origin
    override_host_header: 'test-origin.edgio.net',

    // The list of origin hosts to which to connect
    hosts: [
      {
        // The domain name or IP address of the origin server
        location: 'test-origin.edgio.net',
      },
    ],

    tls_verify: {
      use_sni: true,
      sni_hint_and_strict_san_check: 'test-origin.edgio.net',
    },

    // Uncomment the following to configure a shield
    // shields: { us_east: 'DCD' },
  },
],

// Environment-specific configuration
environments: {
  production: {
    hostnames: [{ hostname: 'www.mysite.com' }],
  },
  staging: {
    hostnames: [{ hostname: 'staging.mysite.com' }],

    // Override the `web` origin configuration for the staging environment
    origins: [
      {
        name: 'web',
        hosts: [{ location: 'staging-origin.mysite.com' }],
        override_host_header: 'staging-origin.mysite.com',
        tls_verify: {
          use_sni: true,
          sni_hint_and_strict_san_check: 'staging-origin.mysite.com',
        },
        shields: { us_east: 'DCD' },
      },
    ],
  },
},

/* ... */
```

## connector {/* connector */}

The name of the connector package corresponding to the framework your app uses, or the path to a directory that implements the [connector interface](/applications/sites_frameworks/connectors).

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

The maximum number of URLs that will be concurrently prerendered during deployment when [static prerendering](/applications/performance/static_prerendering) is enabled. Defaults to 200, which is the maximum allowed value.-->

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

The following [feature variables](/applications/performance/rules/feature_variables) are only populated in a deployed environment. You can use the `interpolationValues` key to set these values in your local development environment for testing rules. Values set in this configuration are not propagated to the deployed environment.

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

## cloudRuntime {/* cloudruntime */}

_Requires {{ PRODUCT }} v7.4.0 or later._

The `cloudRuntime` key (string) determines which version of Node.js will run your app on our platform. Supported values are:

- `nodejs16.x` (v7.4.0 through v7.4.4)
- `nodejs18.x` (v7.4.0 or later)
- `nodejs20.x` (v7.5.0 or later)

{{ node_16_eol_callout.md }}

If the `cloudRuntime` key is not defined, then {{ PRODUCT }} will detect your project's Node.js version upon running `{{ CLI_CMD(deploy) }}`. If an unsupported version is detected when using {{ PRODUCT }} v7.4.0 or later, then it will set your version to `nodejs18.x`. For instance:

```bash
# The Node.js 18 runtime is valid for {{ PRODUCT }} v7.4.0 or later
$ node --version
v18.18.2
$ {{ CLI_CMD(deploy) }}

...

# Unsupported Node.js 21 runtime; defaults to Node.js 18 with a warning for {{ PRODUCT }} v7.4.0 or later
$ node --version
v21.0.0
$ {{ CLI_CMD(deploy) }}
```

<Callout type="important">

Unexpected behavior may occur when there is a mismatch between your project's Node.js version and the one that runs your app on our platform. For example, if the `cloudRuntime` key is set to `nodejs18.x` while the project is bundled with Node.js 20, the project will build with Node.js 20 but run in a Node.js 18 environment. Ensure the `cloudRuntime` key aligns with your project's Node.js version to prevent these types of issues.

</Callout>

<a id="example-config"></a>

## Default {{ CONFIG_FILE }} {/* default-config */}

By default, the following `{{ CONFIG_FILE }}` file is created by `{{ CLI_CMD(init) }}`. The contents of this file may differ when a framework supported by {{ PRODUCT }} {{ PRODUCT_PLATFORM }} is detected during initialization.

See the full API specification for the `{{ CONFIG_FILE }}` file [here](/docs/v7.x/api/core/interfaces/config.default.html).

```js filename="{{CONFIG_FILE}}"
// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/applications/edgio_config
module.exports = {
  // The name of the site in Edgio to which this app should be deployed.
  // name: 'my-site-name',

  // The name of the organization in Edgio to which this app should be deployed.
  // organization: 'my-organization-name',

  // Overrides the default path to the routes file. The path should be relative to the root of your app.
  // routes: 'routes.js',

  // When set to true or omitted entirely, Edgio includes the deployment number in the cache key,
  // effectively purging the cache each time you deploy.
  // purgeCacheOnDeploy: false,

  origins: [
    {
      // The name of the backend origin
      name: 'origin',

      // Use the following to override the host header sent from the browser when connecting to the origin
      override_host_header: 'test-origin.edgio.net',

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'test-origin.edgio.net',
        },
      ],

      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: 'test-origin.edgio.net',
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
