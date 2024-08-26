---
title: Upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 7
---

The {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} platform consists of the following products:

- [{{ PRODUCT }} {{ PRODUCT_EDGE }}](/applications/performance) improves your site’s performance and speeds up your development lifecycle.
- [{{ PRODUCT }} {{ PRODUCT_SECURITY }}](/applications/security) provides robust, multi-layered Web Application and API Protection.
- [{{ PRODUCT }} {{ PRODUCT_PLATFORM }}](/applications/sites_frameworks) provides optimal performance and development efficiency to your headless Jamstack applications.

Upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} to version 7 involves the following steps:

1.  **{{ PRODUCT_LEGACY }} (Version 4 and Earlier):** [Rename layer0.config.js and {{ PRODUCT }} packages.](#rename-layer0-components)
2.  [Upgrade Node.js](#upgrade-to-node-js) to version 18.x or 20.x and update your application accordingly.
3.  [Create an {{ PRODUCT }} account.](#create-account)
4.  [Create an organization, properties, and environments.](#create-an-organization--properties--and-environments)
5.  [Upgrade {{ PRODUCT }} packages.](#upgrade-packages)
6.  [Update your CDN-as-code configuration](#update-your-cdn-as-code-configuration) to reflect changes introduced in version 7.
7.  [Image Optimization](#image-optimization)
8.  [Real User Monitoring (RUM) Token](#real-user-monitoring-rum-token)
9.  [Build your {{ PRODUCT }} properties.](#build-your-properties)
10. [Deploy to {{ PRODUCT }}](#deploy-to)
11. [Configure your Firewall](#configure-your-firewall)
12. [Update your DNS](#update-your-dns)

## Step 1: Rename layer0 Components {/* rename-layer0-components */}

This section only applies to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 4 and earlier. Proceed to the [Upgrade Node.js step](#upgrade-node-js) if you are using a later version.

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} now uses {{ PRODUCT }} branding for our CLI, packages, and a configuration file. Additionally, our service will no longer modify duplicate query string parameters.

Perform the following steps for each of your properties:

1.  Rename `layer0.config.js` to `{{ CONFIG_FILE }}`.

    <Callout type="important">

    {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5+ ignores the `layer0.config.js` configuration file.

    </Callout>

2.  Rename all references to {{ PRODUCT }} packages from `@layer0` to `{{ PACKAGE_NAME }}`.

    - **package.json:** In addition to renaming the {{ PRODUCT }} packages, you should also set their version to `^7.0.0`.

      For example, the following excerpt from a `package.json` file references several `@layer0` packages:

      ```json filename="package.json version 4 and earlier"
      ...
        "dependencies": {
          "@layer0/rum": "4.18.1",
        },
        "devDependencies": {
          "@layer0/cli": "4.18.1",
          "@layer0/core": "4.18.1",
          "@layer0/devtools": "4.18.1",
      ...
      ```

      You should update all of these references as shown below.

      ```json filename="package.json version 7"
      ...
        "dependencies": {
          "{{ PACKAGE_NAME }}/rum": "^7.0.0",
        },
        "devDependencies": {
          "{{ PACKAGE_NAME }}/cli": "^7.0.0",
          "{{ PACKAGE_NAME }}/core": "^7.0.0",
          "{{ PACKAGE_NAME }}/devtools": "^7.0.0",
      ...
      ```

    <Callout type="important">

    There may be additional `@layer0/*` dependencies listed in your site's `package.json` file that are not listed above. Update those dependencies to `{{ PACKAGE_NAME }}/*`. After which, there should be no remaining `@layer0/*` references in the file.

    </Callout>

    - **Import Statements:** Rename {{ PRODUCT }} packages within each `import` statement from `@layer0` to `{{ PACKAGE_NAME }}`. You can find these `import` statements within various files, such as `routes.ts`, `sw/service-worker.js`, and your Next and Nuxt configuration files.

      For example, the following excerpt from a `routes.ts` file imports various `@layer0` packages:

      ```js filename="routes.ts version 4 and earlier"
      import {isProductionBuild} from '@layer0/core/environment';
      import {Router} from '@layer0/core/router';
      import {nextRoutes} from '@layer0/next';
      ...
      ```

      You should update all of these `import` statements as shown below.

      ```js filename="routes.ts version 7"
      import {isProductionBuild} from '{{ PACKAGE_NAME }}/core/environment';
      import {Router} from '{{ PACKAGE_NAME }}/core/router';
      import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
      ...
      ```

    - **{{ CONFIG_FILE }}:** If you are using an {{ PRODUCT }} connector, then you should also rename the connector defined in the `connector` property.

      For example, you should update `connector: '@layer0/next'` to `connector: '{{ PACKAGE_NAME }}/next'`.

    - **Next app:** Rename all {{ PRODUCT }} references within your `next.config.js` from `@layer0` to `{{ PACKAGE_NAME }}`.

      For example, the following excerpt from a `next.config.js` file contains several `@layer0` references:

      ```js filename="next.config.js version 4 and earlier"
      const { withServiceWorker } = require('@layer0/next/sw')
      const withLayer0 = require('@layer0/next/withLayer0')
      module.exports = withLayer0(
      ...
      ```

      You should update all of these references as shown below.

      ```js filename="next.config.js version 7"
      const withEdgio = require('{{ PACKAGE_NAME }}/next/withEdgio')
      module.exports = withEdgio(
      ...
      ```

      <Callout type="info">

      Version 7 no longer requires the `withServiceWorker` function to be explicitly defined within the `next.config.js` file and therefore it may be safely removed.

      </Callout>

3.  Install the dependencies defined in the previous step.

    <SnippetGroup>

    ```bash tabLabel="npm"
    npm install
    ```

    ```bash tabLabel="Yarn 1 (Classic)"
    yarn install
    ```

    </SnippetGroup>

    <Callout type="important">

    This should generate an updated dependency tree in your `package-lock.json` or `yarn.lock` file. Be sure to commit these changes.

    </Callout>

4.  Update all references to the {{ PRODUCT }} CLI within your `package.json` scripts from `0 | layer0` to either `{{ CLI_NAME }}` or `{{ FULL_CLI_NAME }}`.

5.  Exclude build artifacts from being tracked in version control by updating your `.gitignore` file to:

        ```bash filename=".gitignore"
        ...
        # {{ PRODUCT }} generated build directory
        .{{ PRODUCT_NAME_LOWER }}
        ```

    <!-- List additional 4.x considerations here and link them to more info -->

## Step 2: Upgrade Node.js {/* upgrade-node-js */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7.4.0+ runs your apps in Node.js v18 or v20. Therefore, we strongly recommend that you use Node.js v18.x or 20.x when developing your web application.

[Learn how to use nvm to install Node.js.](/applications/install_nodejs)

Once you are using Node.js v18 or v20, update your application code to be compatible with your updated version of Node.js.

<Callout type="important">

If `package.json` or `.npmrc` explicitly sets the Node.js engine version to `14.x`, then you will need to update it to `18.x` or `20.x`.

Additionally, check your CI/CD environment for Node.js version settings. If your workflow targets Node.js 14.x, then you will need to update your files and settings to target Node.js 18.x or 20.x.

</Callout>

## Step 3: Create an {{ PRODUCT }} Account {/* create-account */}

Although you already have an existing account through `app.layer0.co`, you will need to [sign up for a new account through {{ APP_DOMAIN }}]({{ APP_URL }}/signup) using the same email address, Google account, or Github account.

## Step 4: Create an Organization, Properties, and Environments {/*create-an-organization--properties--and-environments*/}

Create an organization, properties, and environments by either:

-   [Migrating your existing team, sites, environments, and environment variables](#migrate-team-sites-environments) to version 7.
-   Manually defining them within the {{ PORTAL }} through the following procedures:
    -   [Create an Organization](#create-an-organization)
    -   [Create a Property](#create-property)
    -   [Create Environments](#define-environments).

**<a id="migrate-team-sites-environments" />To migrate your existing team, sites, and environments**

1.  From the {{ PORTAL_LINK }}, create and then copy an application key (aka API key).
    1.  Click your profile icon and then select **My Account**.
    2.  From the **Application Keys** section, click **Edit**.
    3.  Click **Create an API Key**.
    4.  In the **Name** option, assign a name for this key.
    5.  Create **Create token**.
    6.  Copy the token by clicking the <Image inline src="/images/v7/icons/copy-to-clipboard.png" alt="Copy to clipboard icon" /> icon.
    7.  Click **Close**.
2.  From [app.layer0.co](https://app.layer0.co), navigate to the desired team.
3.  Click **Settings**.
4.  Find the **Edgio v7 migration** section and then click **Copy team and sites to Edgio v7 Console**.
5.  In the **Edgio console API key** option, paste the API key created in step 1.
6.  Click **Copy team to v7**. This migration process may take up to a minute. 
7.  From the {{ PORTAL_LINK }}, verify that your organization along with its properties and environments were successfully migrated.

    Proceed to [Step 5: Upgrade {{ PRODUCT }} Packages](#upgrade-packages). 

### Create an Organization {/* create-an-organization */}

If the property being migrated belongs to a {{ PRODUCT_LEGACY }} team space, then you will need to recreate it within {{ APP_DOMAIN }}.

1.  From the {{ PORTAL_LINK }}, click on the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon next to your name and then click on **Create an Organization**.

    ![Space menu](/images/v7/basics/team-create.png)

2.  In the **Organization Name** option, assign a name to your organization (e.g., `my-company`) and then click **Create an Organization**.

    ![Add an Organization](/images/v7/basics/team-create-2.png)

3.  Invite the desired team members. [Learn more.](/applications/basics/collaboration#managing-team-members)

<Callout type="important">

  If you are an enterprise customer, contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to upgrade your newly created organization.

</Callout>

### Create a Property {/* create-property */}

Create and then initialize your property.

1.  From the {{ PORTAL_LINK }}, determine where you will create a property.

    - **Private Space:** By default, the {{ PORTAL }} loads your private space. Access to a property created in your private space is restricted to your account. Proceed to the next step.
    - **Organization:** Load the desired organization by clicking the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon that appears next to your name and then selecting the desired organization.

      ![Organization Selection](/images/v7/basics/team-selection.png)

2.  Click **New Property**.
3.  From under the **Host Property on {{ PRODUCT }}**, click **Create Property**.
4.  In the **Property Name** option, assign a unique name to this property.
5.  Verify that the **Create using CLI** option is selected.
6.  Click **Create Property**.
7.  A quick start page will display a npx command that:

    -   Installs the latest version of the {{ PRODUCT }} CLI.

        <Callout type="info">

          By default, {{ PRODUCT }} CLI v5.1+ collects usage and error reporting information to help improve our products. However, it omits personally identifiable information. [Learn how to opt-out](/applications/performance/cdn_as_code/cli#disable-analytics).

        </Callout>

    -   Initializes your property.

    Run this command from your project's root directory. Upon running the above command:

    1.  The {{ PRODUCT }} CLI will require that you log in to the {{ PRODUCT }} if it does not detect an active {{ PRODUCT }} session.
    2.  You will need to authorize the CLI by granting it a token through which it may deploy your property to {{ PRODUCT }}.

    The CLI should automatically configure your property according to the detected framework. It will create a `default` and a `production` environment. Although production traffic can be served through either environment, we recommend that you use the `production` environment to serve production traffic. [Cloud Function](/applications/performance/serverless_compute) requests to the `production` environment are prioritized over other environments when heavy traffic is experienced.

    If you are not using a supported framework, then you will be prompted to provide additional information. [Learn more.](/applications/performance/cdn_as_code#initialize-property)

### Create Environments {/* define-environments */}

As mentioned in the previous step, {{ PRODUCT }} automatically creates a `default` and a `production` environment upon initializing a property. If you require additional environment(s), then you should create them now.

[Learn how to create an environment.](/applications/basics/environments#creating-an-environment)

## Step 5: Upgrade {{ PRODUCT }} Packages {/* upgrade-packages */}

Update all {{ PRODUCT }} packages to version 7 using the CLI.

```bash
{{ FULL_CLI_NAME }} use ^7.0.0
```

<Callout type="info">

If you are upgrading from version 4 and earlier, then you should have already upgraded to version 7. In which case, the above step will indicate that your packages are up to date.

</Callout>

## Step 6: Update your CDN-as-Code Configuration {/* update-your-cdn-as-code-configuration */}

Updating your CDN-as-code configuration to be compatible with version 7 involves:

- [{{ CONFIG_FILE }} settings](#config-js-settings)
- [Routes](#routes)
- [Cache key customization](#cache-key-customization)
- [Matching behavior](#matching-behavior)
- [Redirects](#redirects)
- [Geolocation](#geolocation)
- [Device classification](#device-classification)
- [Response headers](#response-headers)

### {{ CONFIG_FILE }} Settings {/* config-js-settings */}

Update each property's {{ CONFIG_FILE }} as indicated below.

-   **backends:** The `backends` property has been replaced with the `origins` property. We recommend that you define them on a per environment basis through the `environments` property.

    For example, we will assume that your `backends` property is configured as follows:

    ```js filename="{{ CONFIG_FILE }} version 6 and earlier"
    backends: {
      origin: {
        // The domain name or IP address of the origin server
        domainOrIp: "origin.mysite.com",

        // When provided, the following value will be sent as the host header when connecting to the origin.
        // If omitted, the host header from the browser will be forwarded to the origin.
        hostHeader: "www.mysite.com",

        // Uncomment the following line if TLS is not set up properly on the origin domain and you want to ignore TLS errors
        // disableCheckCert: true,

        // Overrides the default ports (80 for http and 443 for https) and instead use a specific port
        // when connecting to the origin
        // port: 1337,
      },
    }
    ```

    The equivalent configuration in version 7 is shown below.

    ```js filename="{{ CONFIG_FILE }} version 7"
    ...
    environments: {
      // Serve production traffic through the production environment.
      production: {
        origins: [
          {
            // the key in backends
            name: 'origin',

            // from hostHeader
            override_host_header: 'www.mysite.com',

            // Version 7 introduces the ability to load balance across multiple origin hosts.
            // Previous versions only supported a single host per origin.
            hosts: [
              {
                scheme: 'https',
                location: [
                  {
                    // from domainOrIp
                    hostname: 'origin.mysite.com',

                    // from port
                    port: 443,
                  },
                ],
              },
            ],

            // In version 7, you may enable Server Name Indication (SNI) and define a SNI hint.
            // This configuration is essential when using multiple domains, since it allows us to
            // present to the browser a certificate with the correct name during the TLS handshake.

            tls_verify: {
              use_sni: true,
              sni_hint_and_strict_san_check: 'www.mysite.com',
            },

            // In version 7, the location of the shield (formerly referred to as the “global” PoP) is
            // configured in {{ CONFIG_FILE }} instead of the {{ PORTAL }}
            // Previous versions only supported a single shield in a single region.

            // If your {{ PRODUCT }} cloud region is US East, use:
            shields: {us_east: 'DCD'},

            // If your {{ PRODUCT }} cloud region is US West, instead use:
            // shields: { us_west: 'SAC'},

            // Uncomment the following lines to define a configuration equivalent to disableCheckCert: true
            // tls_verify: {
            //   allow_self_signed_certs: true,
            // },
          },
        ],
      },
    },
    ```

-   **Hostnames:** In {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier, custom domains are defined on a per environment basis within the {{ PORTAL }}. In version 7, if you are using CDN-as-code, we recommend that you define them on a per environment basis through the `environments` property. The following excerpt of a sample configuration demonstrates how to define hostnames for both the `production` and the `default` environment.

    ```js filename="{{ CONFIG_FILE }} version 7"
    environments: {
      // Each key is the name of an environment in the {{ PORTAL }}
      production: {
        hostnames: [
          {
            hostname: "www.mysite.com",
          },
          {
            hostname: "eu.mysite.com",
          },
        ],
        // Origin configurations can also be defined within an environment-specific configuration.
        origins: [
          {
            ...
          }
        ],
      },
      default: {
        hostnames: [
          {
            hostname: "staging.www.mysite.com",
          },
          {
            hostname: "staging.eu.mysite.com",
          },
        ],
      },
    },
    ```

- **includeNodeModules:** If you previously set `includeNodeModules: true`, then you should define it within a `serverless` property:

  ```js filename="{{ CONFIG_FILE }} version 7"
  serverless: {
    includeNodeModules: true,
  },
  ```

- **includeFiles:** If you previously set `includeFiles`, then you should define it within a `serverless` property:

  ```js filename="{{ CONFIG_FILE }} version 6 and earlier"
  includeFiles: {
    'lang/**/*': true,
    ‘public/**/*’: true
  }
  ```

  ```js filename="{{ CONFIG_FILE }} version 7"
  serverless: {
    include: ['lang/**/*', 'public/**/*'];
  }
  ```

  Versions 6 and earlier supports mapping an input path to a different output path. Version 7 does not support this capability. For example, the following configuration is unsupported:

  ```js filename="{{ CONFIG_FILE }} version 6 and earlier"
  includeFiles: {
    'lang/**/*': 'another/dir/in/layer0/lambda',
  },
  ```

### Routes {/* routes */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 introduces a new JSON syntax for defining the set of features that will be applied to a route.

For example, the following route sets a CDN caching policy:

```js filename="{{ CONFIG_FILE }} version 7"
new Router().get('/', {
  caching: {
    max_age: '1d', // cache for 1 day at the edge
  },
});
```

The equivalent route in version 6 and earlier is:

```js filename="{{ CONFIG_FILE }} version 6 and earlier"
new Router().get('/', ({cache}) => {
  cache({edge: {maxAgeSeconds: 60 * 60 * 24}});
});
```

<a id="legacy-syntax" />In order to ease the transition to version 7, we provide limited support for legacy syntax. However, the following syntax is unsupported:

-   **fallback():** The `fallback()` method, which is unsupported in version 7, executes when no other route is matched. If you are trying to proxy a request to a legacy origin, then you may do so by mapping the desired hostname to an origin configuration through the `default_origin_name` property.

    ```js filename="{{ CONFIG_FILE }} version 7"
    environments: {
      // Each key is the name of an environment in the {{ PORTAL }}
      production: {
        hostnames: [
          {
            hostname: "www.mysite.com",
          },
          {
            hostname: "random.mysite.com",
            default_origin_name: "legacy",
          },
        ],
        // Origin configurations can also be defined within an environment-specific configuration.
        origins: [
          {
            name: 'legacy',
            ...
          }
        ],
      },
      default: {
        hostnames: [
          {
            hostname: "staging.www.mysite.com",
          },
          {
            hostname: "staging.eu.mysite.com",
            default_origin_name: "legacy",
          },
        ],
        origins: [
          {
            name: 'legacy',
            ...
          }
        ],
      },
    },
    ```

    You may also manually assign an origin configuration within a route through `set_origin`. If you want this route to act as a catch-all, then we recommend that you position it above your other routes.

    ```js
    router.get('/', {
      origin: {
        set_origin: 'myorigin',
      },
    });
    ```

-   **destination():** The `destination()` method is unsupported in version 7. However, you may assign an origin to requests through `set_origin` and redirect requests through `url_redirect`. Additionally, you may use [Experimentation](/applications/experimentation) to distribute traffic to different destinations.

-   **ResponseWriter Methods:** The following `ResponseWriter` methods are not fully supported in version 7:

    -   updateResponseCookie
    -   removeResponseCookie
    -   addUpstreamResponseCookie
    -   removeUpstreamResponseCookie
    -   setUpstreamResponseHeader
    -   updateUpstreamResponseHeader

<!--
However, there are workarounds for the above behavior.
 using Feature variables with find/replace. In this example, we modify the set-cookie header for cookie2 to always set the value to “some-value”

```
new Router()
  .get('/', {
    headers: {
      set_response_headers: {
        "set-cookie": "%{resp_set_cookie/cookie2=(.*)/cookie2=some-value}"
      }
    }
  })
```

The limitation is you can only do one of these per request
-->

### Cache Key Customization {/* cache-key-customization */}

[Customize the cache key](/applications/performance/cdn_as_code/route_features#customizing-the-cache-key) through `cache_key` instead of `CustomCacheKey`. However, if you require additional flexiblity when defining the cache key, then you may use `cache_key_rewrite` instead.

There are some subtle differences in our device classification implementation.

| Method (Version 6 and Earlier) | Variable (Version 7)                                                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| addIsBot                       | Use `%{wurfl_vcap_is_robot}` instead. This variable returns `true \| false` instead of `0 \| 1`.                                                   |
| addVendor                      | Use `%{wurfl_vcap_is_ios}` and `%{wurfl_vcap_is_android}` instead. This variable returns `true \| false` instead of `apple \| android \| generic`. |
| addBrowser                     | Use `%{wurfl_cap_mobile_browser}` instead.                                                                                                         |
| addDevice                      | Use `%{wurfl_vcap_is_smartphone}` and `%{wurfl_cap_is_tablet}` instead. These variables return `true \| false` instead of `0 \| 1`.                |

### Matching Behavior {/* matching-behavior */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier returns an immediate response upon encountering one of the following methods:

- proxy
- renderWithApp
- serveStatic
- dir
- static
- send
- compute
- redirect
- appShell
- serviceWorker
- render

In version 7, all routes that match the request are executed. This may cause unexpected behavior when multiple routes provide conflicting instructions.

We will now examine how the following routes are handled by different versions of {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}.

```js filename="routes.js"
new Router()
  .get(‘/’, ({ proxy }) => proxy(‘web’))
  .get(‘/:path*’, ({ proxy }) => proxy(‘legacy’))
```

Version 6 and earlier will serve requests to `/` from the `web` origin. The second route will not take effect because the request satisfied the first `proxy` method. Version 7, on the other hand, matches both routes for requests to `/`. The first route sets the origin to `web`, while the second route immediately overrides the first route and sets the origin to `legacy`. As a result, all requests will be sent to the `legacy` origin.

Therefore, the origin in which routes are defined is important. We recommend placing routes with general criteria before routes with more detailed criteria.

For example, reversing the order of the routes ensures that requests to `/` are served from the `web` origin.

```js filename="routes.js"
new Router()
  .get(‘/:path*’, ({ proxy }) => proxy(‘legacy’))
  .get(‘/’, ({ proxy }) => proxy(‘web’))
```

### Redirects {/* redirects */}

There are a [variety of methods through which you may set up redirects](/applications/performance/redirects). One method involves uploading CSV file(s) from within the {{ PORTAL }}. The format for this CSV file does not vary by version of {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}. This means that you may safely [import CSV files](/applications/performance/redirects#csv-files) exported from a previous version of {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}.

### Geolocation {/* geolocation */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier adds the following geo-location request headers to all requests sent to the origin:

- x-0-geo-city
- x-0-geo-country-code
- x-0-geo-latitude
- x-0-geo-longitude
- x-0-geo-postal-code

In version 7, geolocation headers are not included by default. However, you may define them through HTTP variables as demonstrated below.

```js filename="routes.js"
new Router().match('/:path', {
  headers: {
    set_request_headers: {
      'x-0-geo-country-code': '%{geo_country}',
      'x-0-geo-city': '%{geo_city}',
      'x-0-geo-latitude': '%{geo_latitude}',
      'x-0-geo-longitude': '%{geo_longitude}',
      'x-0-geo-postal-code': '%{geo_postal_code}',
    },
  },
});
```

### Device Classification {/* device-classification */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier adds the following device classification headers to all requests sent to the origin:

- x-0-device
- x-0-device-is-bot
- x-0-vendor
- x-0-browser

In version 7, device classification headers are not included by default. However, you may define them through HTTP variables as demonstrated below.

| Header (Version 6 and Earlier) | Variable (Version 7)                                                                                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-0-device-is-bot              | Use `%{wurfl_vcap_is_robot}` instead. This variable returns `true \| false` instead of `0 \| 1`.                                                                       |
| x-0-vendor                     | Use `%{wurfl_vcap_is_ios}` and `%{wurfl_vcap_is_android}` instead. These variables return `true \| false` instead of `apple \| android \| generic`.                    |
| x-0-browser                    | Use `%{wurfl_cap_mobile_browser}` instead.                                                                                                                             |
| x-0-device                     | Use `%{wurfl_vcap_is_smartphone}` and `%{wurfl_cap_is_tablet}` instead. These variables return `true \| false` instead of `smartphone \| tablet \| mobile \| desktop`. |

**Example:**

```js filename="routes.js"
new Router().match('/:path', {
  headers: {
    set_request_headers: {
      'x-0-device-is-bot': '%{wurfl_vcap_is_robot}',
      'x-0-geo-city': '%{geo_city}',
      'x-0-geo-latitude': '%{geo_latitude}',
      'x-0-geo-longitude': '%{geo_longitude}',
      'x-0-geo-postal-code': '%{geo_postal_code}',
    },
  },
});
```

### Response Headers {/* response-headers */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and adds the following headers with each response:

| Header (Version 6 and Earlier) | Header (Version 7)                                                                                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-0-caching-status             | View additional information about the cache policy applied to the requested content through debug cache response headers. Information on how to enable debug cache response headers is provided below. |
| x-0-components                 | No equivalent header.                                                                                                                                                                                  |
| x-0-status                     | x-edg-status                                                                                                                                                                                  |
| x-0-t                          | x-edg-t                                                                                                                                                                                  |
| x-0-version                    | x-edg-version                                                                                                                                                                                          |

**To enable debug cache response headers**

1.  Add a route that enables debug cache response headers. A sample route is provided below.

    ```js filename="routes.js"
    new Router().match('/:path', {
      headers: {
        debug_header: true,
      },
    });
    ```

2.  Send the following header with each request:
    `x-ec-debug:x-ec-cache,x-ec-cache-remote,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state`

    [Learn more.](/applications/performance/response#requesting-debug-cache-information)

## Step 7: Image Optimization {/*image-optimization*/}

If you currently optimize images through `opt.moovweb.net`, then you should perform the following steps to update to the latest version:

1.  [Enable the Optimize Images feature (optimize_images)](/applications/performance/image_optimization#enabling-image-optimization)
for the desired set of images.

2.  Update all `opt.moovweb.net` URLs to point directly to the image. Apply the same set of query string parameters, with the exception of `img`, to each new URL.

    **Example:** Convert the following sample URL from:
    `https://opt.moovweb.net?quality=30&width=100&img=https://edgio-community-examples-v7-image-optimization-live.glb.edgio.link/images/demo.jpg`

    To this:

    `https://edgio-community-examples-v7-image-optimization-live.glb.edgio.link/images/demo.jpg?quality=30&width=100`

View:

-   [Image requirements and limitations.](/applications/performance/image_optimization#image-requirements)
-   [Supported query string parameters.](/applications/performance/image_optimization#query-string-parameters)
-   [Sample default optimization implementation.](/applications/performance/rules/feature_scenarios#default-image-optimizations)

## Step 8: Real User Monitoring (RUM) Token {/* real-user-monitoring-rum-token */}

If you are tracking Core Web Vitals through RUM, then you will need to update the `initEdgioRum` script to use your version 7 token. Your version 7 token is provided on the **Core Web Vitals** page.

```html
<script defer>
  function initEdgioRum() {
    new Edgio.Metrics({
      token: 'ab1234c5-d6ef-789a-12c0-bb48102c2023', //version 7 token
    }).collect();
  }
</script>
<script
  src="https://{{ RUM_DOMAIN }}/latest.js"
  defer
  onload="initEdgioRum()"></script>
```

## Step 9: Build your {{ PRODUCT }} Properties {/* build-your-properties */}

Build each of your {{ PRODUCT }} properties by running the following command in its root directory:

```bash

{{ FULL_CLI_NAME }} build

```

If you encounter a build issue as a result of upgrading Node.js, then you should perform one or more of the following troubleshooting steps:

1.  Check whether you have defined a different Node.js or npm version in either a npm config file (`.npmrc`) or within `package.json`. If so, update it to the correct version and then run `{{ FULL_CLI_NAME }} build` to rebuild your {{ PRODUCT }} property.

    <Callout type="tip">

    Run `node --version` to check the Node.js version that you are currently using. This command should return `16.x.x` (e.g., `16.18.0`). Use this version information when updating `.npmrc` or `package.json`.

    </Callout>

2.  Clear `node_modules` and rebundle your project by running the following command:

    ```bash
    npm ci
    ```

    Run `{{ FULL_CLI_NAME }} build` to rebuild your {{ PRODUCT }} property.

3.  Regenerate a new dependency tree by running the following command:

    ```bash
    npm i --package-lock-only
    ```

    Run `{{ FULL_CLI_NAME }} build` to rebuild your {{ PRODUCT }} property.

## Step 10: Deploy to {{ PRODUCT }} {/* deploy-to- */}

Once you have successfully built your property, run the following command to deploy your configuration to the `default` environment:

```bash
{{ FULL_CLI_NAME }} deploy

// Alternatively, you may explicitly specify the default environment.
// {{ FULL_CLI_NAME }} deploy --environment=default
```

Once it has successfully deployed, run the following command to deploy your configuration to the `production` environment:

```bash
{{ FULL_CLI_NAME }} deploy --environment=production
```

## Step 11: Configure your Firewall {/* configure-your-firewall */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 uses a different set of IP blocks than previous versions. This means that you need to update your firewall to allow:

- **API Domain:** You must allow traffic from the following domain: `api.{{ PRODUCT_NAME_LOWER }}.app`. If you plan on deploying to a development or CI/CD environment, then you will also need to allow this domain for the firewall for those environments.
- **IP Blocks:** You must allow traffic from {{ PRODUCT }} IP blocks if you plan on using origin configuration(s) (aka backends).

View our IP blocks by clicking **Instructions** from the **Origins** page.

[Learn more about firewall setup.](/applications/basics/serving_traffic#firewall-allowing-ip-addresses)

## Step 12: Update your DNS {/* update-your-dns */}

<Callout type="important">

  If you are an enterprise customer and have not already reached out to your account manager to upgrade your organization, please do so before serving traffic through {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7. You may contact our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463.

</Callout>

Once you are ready to serve traffic through {{ PRODUCT }}, you will need to update the DNS for each of your hostname(s). Specifically, version 7 requires a CNAME record that points to a service domain that is either specific to your property’s:

- [Environment](/applications/basics/serving_traffic#environment-specific-service-domain)
- [Organization](/applications/basics/serving_traffic#space-specific-service-domain).

<Callout type="info">

Although version 6 supports both A and CNAME records, version 7 only supports CNAME records.

</Callout>

## Migration Complete {/* migration-complete */}

Congratulations on successfully migrating {{ PRODUCT }} to version 7!

## Additional Considerations {/* additional-considerations */}

Review the following changes and revise your configuration as needed:

- [Cache-manifest.js File](#cache-manifest-js-file)
- [JWT Access Control End-of-Life](#jwt-access-control-end-of-life)
- [Permalink Indexing](#permalink-indexing)
- [GraphQL Caching End-of-Life](#graphql-caching-eol)
- [Duplicate Query String Parameters](#duplicate-query-string-parameters)
- [Log Data](#log-data)
- [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
- [Default Caching Policy](#default-caching-policy)
- [Compression](#compression)
- [HTTP/3](#http-3)

### Cache-manifest.js File {/* cache-manifest-js-file */}

If you detect `404 Not Found` requests for `cache-manifest.js` after upgrading to version 7, verify that:

- You have upgraded the `{{ PACKAGE_NAME }}/prefetch` library to version 7.
- Your application no longer references the `@layer0/prefetch` library.

### JWT Access Control End-of-Life {/* jwt-access-control-end-of-life */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 does not support JWT access control. Previous versions allowed you to configure on a per route basis whether requests would be allowed or denied according to a JWT token.

### Permalink Indexing {/* permalink-indexing */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.1+ automatically adds the `x-robots-tag: noindex, nofollow` header all responses being served from edge links and permalinks. This prevents search engines from indexing those links. By default, this header will not be added to any responses served from a custom domain. Prior to version 5.1, the `.noIndexPermalink()` function was an opt-in solution to achieve the same effect.

As a result, the `.noIndexPermalink()` router function is now deprecated and serves no purpose. We recommend that you remove this function from your {{ ROUTES_FILE }} file.

However, if you want to override this default behavior and allow search engines to index all permalinks, you can pass the option `indexPermalink` set to `true` to the `Router` constructor:

```js
new Router({indexPermalink: true});
```

### GraphQL Caching End-of-Life {/* graphql-caching-eol */}

{{ PRODUCT }} ended support for caching of GraphQL operations. If your {{ PRODUCT }} router ({{ ROUTES_FILE }}) contains usage of `.graphqlOperation(...)`, you should remove it. Otherwise, your application will fail to build.

### Duplicate Query String Parameters {/* optional-review-your-code-for-duplicate-query-string-parameters */}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} will no longer modify the request's query string when it detects a duplicate query string parameter.

For example, we will examine how both versions of {{ PRODUCT }} handle the following request:

`https://sports.example.com/index.html?id=123&type=Sports&type=Basketball`

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 4 will modify the duplicate query string parameters as shown below.

`https://sports.example.com/index.html?id=123&type=Sports%5B0%5D&type%5B1%5D=Basketball`

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7, on the other hand, will not modify the query string as shown below.

`https://sports.example.com/index.html?id=123&type=Sports&type=Basketball`

Review your code to see whether it generates duplicate query string parameters. If it does, update it to handle multiple query string parameters with the same name.

### Log Data {/*log-data*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 introduces [Real-Time Log Delivery (RTLD)](/applications/logs/rtld). RTLD allows you to define the set of data that will be logged and where log data will be sent (e.g., your web server, AWS S3, or Azure Block Blob). It consists of various modules that allow you to deliver log data for CDN, WAF, Rate Limiting, Bot Manager, and Cloud Functions.

**Key information:**
-   RTLD CDN is the module that replaces access logs (version 6). Access logs are mapped to RTLD CDN log fields below.
-   RTLD Cloud Functions logs requests processed by Cloud Functions. This includes {{ PRODUCT }} {{ PRODUCT_PLATFORM }} requests. Use this module to deliver Server Logs, including Deep Request Inspection, to the desired destination.
-   RTLD CDN allows you to [log request headers, response headers, and cookies.](/applications/logs/rtld/custom_log_fields) This makes it very flexible with regards to the set of data that can be logged.
-   A blank **RTLD CDN (Version 7)** cell indicates that, by default, the corresponding access log cannot be mapped to a RTLD CDN log field, a request header, a response header, or a cookie. However, you may still be able to log that data by setting a response header within your code and then logging that response header.

| Access Logs (Version 6) | RTLD CDN (Version 7)      | More Information                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ac                      | req_hdr_accept_encoding   | [Log the Accept-Encoding request header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                   |
| asn                     | client_asn                |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| be                      |                           | Version 7 does not expose the backend configuration name.                                                                                                                                                                                                                                                                                                                                                        |
| bip                     |                           | The `proxy_ip` log field returns an IP address that may identify an Origin Shield server or a web server associated with your origin configuration.                                                                                                                                                                                                                                                              |
| bk                      |                           | Version 7 introduced [Experimentation](/applications/experimentation) as a replacement for Traffic Splitting and A/B Testing. [Log the cookie_x_edg_experiments cookie.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                        |
| bld                     | req_hdr_x_edg_version     | [Log the x-edg-version request header.](/applications/logs/rtld/custom_log_fields) The first value reported by this response header is the deployment version.                                                                                                                                                                                                                                                         |
| bot                     |                           | Version 7 introduced sophisticated bot detection through Bot Manager Standard and Advanced. Manage log data for Bot Manager events through RTLD Bot.                                                                                                                                                                                                                                                             |
| br                      |                           | The `user_agent` log field returns the client's user agent. Define logic within your destination (e.g., Splunk) to translate this value to a browser name.                                                                                                                                                                                                                                                       |
| cc                      | client_country_code       |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ce                      | resp_hdr_content_encoding | [Log the Content-Encoding response header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                 |
| ckh                     |                           | The `x-ec-cache-key` debug cache header returns the cache key. [Learn how to include this header in the response.](/applications/performance/response#requesting-debug-cache-information) After which, you may [log this header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                 |
| clv                     |                           | An approximation to this field may be achieved through the `cache_status` and `proxy_type` log fields.                                                                                                                                                                                                                                                                                                           |
| code                    | status_code               |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| cs                      | cache_status              | The `cache_status` field does not indicate the reason why the response was not cached.                                                                                                                                                                                                                                                                                                                           |
| ct                      | resp_content_type         | [Log the Content-Type response header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                     |
| cv                      |                           | Version 7 does not expose the {{ PRODUCT }} edge compiler version.                                                                                                                                                                                                                                                                                                                                               |
| cy                      | client_city               |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| done                    |                           | Version 7 does not return request completion status.                                                                                                                                                                                                                                                                                                                                                             |
| ds                      |                           | Version 7 introduced Experimentation as a replacement for Traffic Splitting and A/B Testing. Experiment and bucket information is passed within the `x-edg-experiments-info` upstream request header. Expose this information by passing this info back to the client as a cookie or a response header and then [logging that custom response header or cookie.](/applications/logs/rtld/custom_log_fields)            |
| dv                      |                           | Version 7 returns device type information through feature variables (i.e., `%{wurfl_vcap_is_full_desktop}`, `%{wurfl_vcap_is_smartphone}`, `%{wurfl_cap_is_tablet}`, and `%{wurfl_cap_is_wireless_device}`). Expose the device type by passing the desired feature variables as a cookie or a response header and then [logging that custom response header or cookie.](/applications/logs/rtld/custom_log_fields)             |
| eid                     | resp_hdr_x_edg_version    | [Log the x-edg-version response header.](/applications/logs/rtld/custom_log_fields) The last value returned by this header is the environment ID.                                                                                                                                                                                                                                                                      |
| er                      |                           | Version 7 does not indicate when a custom response is sent as a result of the `send` method.                                                                                                                                                                                                                                                                                                                     |
| ev                      | resp_hdr_x_edg_version    | [Log the x-edg-version response header.](/applications/logs/rtld/custom_log_fields) The second value reported by this header is the environment version.                                                                                                                                                                                                                                                             |
| h2                      | client_protocol           | Valid values are: `HTTP_1_0`, `HTTP_1_1`, and `HTTP_2_0`                                                                                                                                                                                                                                                                                                                                                                                                          |
| hh                      | host                      |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| hrid                    |                           | Expose the request ID by passing the `%{http_x_ec_uuid}` feature variable as a cookie or a response header and then [logging that custom response header or cookie.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                        |
| ic                      | resp_x_ec_check_cacheable | The `x-ec-check-cacheable` debug cache header indicates cache eligibility. [Learn how to include this header in the response.](/applications/performance/response#requesting-debug-cache-information) After which, you may [log this header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                     |
| ip                      | client_ip                 |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| lo                      | client_geo_longitude      |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| lp                      |                           | Version 7 does not indicate whether a page was served due to Incremental Static (Re)Generation.                                                                                                                                                                                                                                                                                                                  |
| lt                      | client_geo_latitude       |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| met                     | method                    |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| pc                      |                           | Expose the postal code by passing the `%{geo_postal_code}` feature variable as a response header or cookie and then [logging that custom response header or cookie.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                        |
| pre                     | resp_x_edg_p              | [Log the x-edg-p response header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                          |
| prl                     |                           | Version 7 has not yet introduced support for static prerendering.                                                                                                                                                                                                                                                                                                                                                |
| prod                    |                           | Version 7 does not indicate whether a request was directed to the production environment. However, the last value reported by the `x-edg-version` response header is the environment's system-defined ID.                                                                                                                                                                                                        |
| psh                     |                           | Version 7 does not support HTTP/2 server push.                                                                                                                                                                                                                                                                                                                                                                   |
| rfr                     | referer                   |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| rid                     | uuid                      |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| s_rq                    |                           | Version 7 does not return the request's file size. However, you may log the request payload size through the `Content-Length` request header. [Learn how to log headers and cookies.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                       |
| s_rs                    | file_size                 |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| sc                      | client_region             |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| sec                     |                           | Manage threat log data for v7 Security through RTLD WAF, RTLD Rate Limiting, and RTLD Bot.                                                                                                                                                                                                                                                                                                                       |
| sh                      |                           | The `proxy_type` log field returns `MIDGRESS` whenever we proxy requests within our network. In addition to Origin Shield requests, this may include peering requests.                                                                                                                                                                                                                                           |
| ssl                     | scheme                    | Valid values are: `http` and `https`                                                                                                                                                                                                                                                                                                                                                                                                            |
| stl                     | cache_status              | The `cache_status` log field indicates cache status. The [cache status codes](/applications/performance/caching/cache_status_codes) that correspond to stale responses are `TCP_EXPIRED_HIT` and `TCP_EXPIRED_MISS`.                                                                                                                                                                                                                                                     |
| t                       |                           | Version 7 reports time measurements through a variety of log fields (i.e., `background_fill_wait_time`, `read_time`, `prewrite_time`, `write_time`, and `total_time`) and the `x-edg-t` response header.                                                                                                                                                                                                         |
| timestamp               | timestamp                 |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ua                      | user_agent                |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| url                     | path                      |                                                                                                                                                                                                                                                                                                                                                                                                                  |
| uv                      |                           | Log the `Vary` response header sent to the client. However, this header does not affect how we split the cache in v7. Version 7 solely uses the cache key to determine how to split the cache.                                                                                                                                                                                                                   |
| v                       |                           | Version 7 does not expose the {{ PRODUCT }} version.                                                                                                                                                                                                                                                                                                                                                             |
| vn                      |                           | Version 7 provides device information through a variety of feature variables, such as `%{wurfl_vcap_is_android}`, `%{wurfl_vcap_is_ios}`, and `%{wurfl_cap_device_os}`. Expose device information by passing the desired feature variables as a cookie or a response header and then logging that custom response header or cookie. [Learn how to log headers and cookies.](/applications/logs/rtld/custom_log_fields) |
| waf                     |                           | {{ PRODUCT }} passes security status through the `waf_prod_action`, `waf_audit_alert`, `waf_prod_alert`, and `rl_alert` log fields. Manage all other threat log data through RTLD WAF, RTLD Rate Limiting, and RTLD Bot.                                                                                                                                                                                         |
| wafv                    |                           | Manage threat log data for v7 Security through RTLD WAF, RTLD Rate Limiting, and RTLD Bot.                                                                                                                                                                                                                                                                                                                       |
| xff                     | req_x_forwarded_for       | [Log the x-forwarded-for request header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                   |
| xmr                     | resp_x_edg_mr             | [Log the x-edg-mr response header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                         |
| xms                     | resp_x_edg_status         | [Log the x-edg-status response header](/applications/logs/rtld/custom_log_fields) which returns status codes for the Cloud load balancer and the Cloud worker.                                                                                                                                                                                                                                                         |
| xmt                     | resp_x_edg_t              | [Log the x-edg-t response header.](/applications/logs/rtld/custom_log_fields)                                                                                                                                                                                                                                                                                                                                          |
| xut                     |                           | Version 7 does not support the `x-0-user-t` response header.                                                                                                                                                                                                                                                                                                                                                     |
| zip                     |                           | Version 7 does not indicate whether the response was compressed. However, you may log the `Content-Encoding` response header. This header indicates the type of compression applied to the response payload. [Learn how to log headers and cookies.](/applications/logs/rtld/custom_log_fields)                                                                                                                        |

### Incremental Static Regeneration (ISR) {/*incremental-static-regeneration-isr*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 no longer supports generic Incremental Static Regeneration (ISR) through the means of the `serveStatic(...)` router method. If you are using ISR with a Next.js or Nuxt application, your application will continue to work as expected.

### Default Caching Policy {/*default-caching-policy*/}

By default, {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7:

-   Honors cache instructions provided by an origin server. 
-   Caches eligible requests after a POP receives 2 requests for the same content. The following content types are exempt from this policy and are eligible for caching after a single request: 
    -   text/html
    -   text/css
    -   text/xml
    -   application/json
    -   application/javascript
    -   application/xml

<Info>

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 uses the [caching](/docs/v7.x/api/core/interfaces/types.Caching.html) feature to [add caching to a route](/applications/performance/cdn_as_code/route_features#caching). 

</Info>

### Compression {/*compression*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 has stricter requirements for edge server compression. 
-   Compression must be explicitly enabled for each desired content type through the [compress_content_types](/docs/v7.x/api/core/interfaces/types.Response.html#compress_content_types) feature. 
-   Compression requires a cached version of the requested content.
-   The requested content must be greater than 128 bytes and less than 3 MB.

In addition to Brotli and Gzip compression, {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 supports `deflate` and `bzip2` compression. Additionally, version 7 supports transcoding compressed content when the user agent (e.g., a web browser) requests a compression method that has not been previously cached. 

[Learn how compression works.](/applications/performance/compression#how-does-compression-work)

### HTTP/3 {/*http-3*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 introduces support for communicating with clients through HTTP/3. This requires signalling HTTP/3 support to the client through the `alt-svc` response header.

[Learn how to enable HTTP/3.](/applications/basics/origins#http-3)