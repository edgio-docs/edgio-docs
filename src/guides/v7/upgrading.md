---
title: Upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 7
---

<Callout type="important">

  {{ PRODUCT }} {{ PRODUCT_PLATFORM }} version 7 currently only supports Next, Nuxt, and Nuxt 3. We plan on introducing support for a wide variety of web application frameworks in the near future. If your property is a traditional website, uses a supported framework, or if you have not integrated your web application framework through {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, then you may proceed to upgrade to version 7. 

</Callout>

Upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} to version 7 involves the following steps:

1.  **Version 4 and Earlier:** [Rename layer0.config.js and {{ PRODUCT }} packages.](#rename-layer0-components)
2.  **Version 5 and Earlier:** [Upgrade Node.js](#upgrade-to-node-js-16-x) to version 16.x and update your application to be compatible with Node.js 16.x.
3.  [Create an {{ PRODUCT }} account.](#create-account)
4.  [Create a team.](#create-team)
5.  [Create a property.](#create-property)
6.  [Define environments.](#define-environments)
7.  [Upgrade the {{ PRODUCT }} CLI.](#upgrade-the-cli)
8.  [Upgrade {{ PRODUCT }} packages.](#upgrade-packages)
9.  [Update your CDN-as-code configuration](#update-your-cdn-as-code-configuration) to reflect changes introduced in version 7.
10. [Real User Monitoring (RUM) Token](#real-user-monitoring-rum-token)
11. [Build your {{ PRODUCT }} properties.](#build-your-properties)
12. [Deploy to {{ PRODUCT }}](#deploy-to)
13. [Configure your Firewall](#configure-your-firewall)
14. [Update your DNS](#update-your-dns)

## Step 1: Rename layer0 Components {/*rename-layer0-components*/}

This section only applies to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} 4 and earlier. Skip this step if you are using a later version.
-   **Version 5.x:** Proceed to the [Upgrade to Node.js 16.x step](#upgrade-to-node-js-16-x).
-   **Version 6.x:** Proceed to the [Create an {{ PRODUCT }} account step](#create-account).

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} now uses {{ PRODUCT }} branding for our CLI, packages, and a configuration file. Additionally, our service will no longer modify duplicate query string parameters.

Perform the following steps for each of your properties:

1.  Rename `layer0.config.js` to `{{ CONFIG_FILE }}`. 

    <Callout type="important"> 
 
      {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5+ ignores the `layer0.config.js` configuration file. 
 
    </Callout> 

2.  Rename all references to {{ PRODUCT }} packages from `@layer0` to `{{ PACKAGE_NAME }}`.

    -   **package.json:** In addition to renaming the {{ PRODUCT }} packages, you should also set their version to `^7.0.0`.

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

    -   **Import Statements:** Rename {{ PRODUCT }} packages within each `import` statement from `@layer0` to `{{ PACKAGE_NAME }}`. You can find these `import` statements within various files, such as `routes.ts`, `sw/service-worker.js`, and your Next and Nuxt configuration files.

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

    -   **{{ CONFIG_FILE }}:** If you are using an {{ PRODUCT }} connector, then you should also rename the connector defined in the `connector` property.

        For example, you should update `connector: '@layer0/next'` to `connector: '{{ PACKAGE_NAME }}/next'`.

    -   **Next app:** Rename all {{ PRODUCT }} references within your `next.config.js` from `@layer0` to `{{ PACKAGE_NAME }}`.

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

## Step 2: Upgrade to Node.js 16.x {/*upgrade-to-node-js-16-x*/}

<Callout type="info">

  This section only applies to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.x and earlier. If you are using version 6.x, proceed to the [Create an {{ PRODUCT }} account step](#create-account).

</Callout>

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6+ runs your apps in Node.js v16. Therefore, we strongly recommend that you use Node.js v16.x when developing your web application. 

[Learn how to use nvm to install Node.js v16.x.](/guides/install_nodejs)

Once you are using Node.js v16, update your application code to be compatible with Node.js v16.

<Callout type="important">

  If `package.json` or `.npmrc` explicitly sets the Node.js engine version to `14.x`, then you will need to update it to `16.x`.

  Additionally, check your CI/CD environment for Node.js version settings. If your workflow targets Node.js 14.x, then you will need to update your files and settings to target Node.js 16.x.

</Callout>

## Step 3: Create an {{ PRODUCT }} Account {/*create-account*/}

Although you already have an existing account through `app.layer0.co`, you will need to [sign up for a new account through {{ APP_DOMAIN }}]({{ APP_URL }}/signup) using the same email address, Google account, or Github account.

## Step 4: Create a Team {/*create-team*/}

If the property being migrated belongs to a team space, then you will need to recreate that team within {{ APP_DOMAIN }}.

1.  From the {{ PORTAL_LINK }}, click on the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon next to your name and then click on **Create a team**. 

    ![Space menu](/images/v7/basics/team-create.png)

2.  In the **Team Name** option, assign a name to your team (e.g., `my-company`) and then click **Create a Team**.

    ![Add a Team](/images/v7/basics/team-create-2.png)

3.  Invite the desired team members. [Learn more.](/guides/basics/collaboration#managing-team-members)

<Callout type="important">

  If you are an enterprise customer, contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to upgrade your newly created team.

</Callout>

## Step 5: Create a Property {/*create-property*/}

You now need to create your property within the {{ PORTAL }}.

1.  From the {{ PORTAL_LINK }}, determine where you will create a property.
    -   **Private Space:** By default, the {{ PORTAL }} loads your private space. Access to a property created in your private space is restricted to your account. Proceed to the next step.
    -   **Team Space:** Load the desired team by clicking the <Image inline src="/images/v7/icons/menu-up-down.png" alt="Menu" /> icon that appears next to your name and then selecting the desired team.

        ![Team Selection](/images/v7/basics/team-selection.png)

2.  Click **+ New Property**.
3.  In the **Property Name** option, assign a unique name to this property.
4.  Add the hostname(s) (aka custom domains) through which your site will be delivered. These hostnames will be added to the `production` environment.
    1.  From the **Hostnames** section, click **+ Add Hostname**.
    2.  Type the desired hostname (e.g., `www.example.com`).
    3.  Repeat steps 1 and 2 as needed.

5.  Delete the default origin configuration (aka backend) by clicking the <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon that appears on the right-hand side of the `Origin: web` bar. 

    <Callout type="info">

      Since you are taking advantage of CDN-as-code, you should define your origin configuration(s) within the {{ CONFIG_FILE }} file instead of the {{ PORTAL }}. Information on how to define origin configurations is provided within the **Update your CDN-as-code configuration** step.

    </Callout>

6.  Click **Create Property**.

## Step 6: Define Environments {/*define-environments*/}

If the property being migrated uses multiple environments in version 6, then you should recreate those environments within your new property.

1.  Load the **Environments** page.

    1.  From the {{ PORTAL_LINK }}, select the desired private or team space.
    2.  Select the desired property.
    3.  From the left-hand pane, click **Environments**.

2.  Click **+ New Environment**.

    ![environments](/images/v7/basics/environments.png)

3.  In the **Name** option, specify a name for this environment. This name may consist of lowercase characters, numbers, dashes (`-`), and underscores (`_`).

4.  Determine deployment permissions through the **Allow all team members to deploy to this environment** option. 

    -   Mark this option to allow all team members to deploy to this environment.
    -   Clear this option to restrict deployment to admins and the deploy token. 

    ![limit environment](/images/v7/basics/environment-permissions.png?width=450)

5.  Click **Create**.

## Step 7: Upgrade the {{ PRODUCT }} CLI {/*upgrade-the-cli*/}

Install the latest version of our CLI.

<Callout type="info">

  By default, {{ PRODUCT }} CLI v5.1+ collects usage and error reporting information to help improve our products. However, it omits personally identifiable information. [Learn how to opt-out](/guides/develop/cli#disable-analytics).

</Callout>

<SnippetGroup>

```bash tabLabel="npm"
npm install -g @{{ FULL_CLI_NAME }}/cli
```

```bash tabLabel="Yarn 1 (Classic)"
yarn global add @{{ FULL_CLI_NAME }}/cli
```

</SnippetGroup>

## Step 8: Upgrade {{ PRODUCT }} Packages {/*upgrade-packages*/}

Update all {{ PRODUCT }} packages to version 7 using the CLI.

```bash 
{{ FULL_CLI_NAME }} use ^7.0.0
```   
  
<Callout type="info">

  If you are upgrading from version 4 and earlier, then you should have already upgraded to version 7. In which case, the above step will indicate that your packages are up to date.

</Callout>

## Step 9: Update your CDN-as-Code Configuration {/*update-your-cdn-as-code-configuration*/} 

Updating your CDN-as-code configuration to be compatible with version 7 involves:

-   [{{ CONFIG_FILE }} settings](#config-js-settings)
-   [Routes](#routes)
-   [Cache key customization](#cache-key-customization)
-   [Matching behavior](#matching-behavior)
-   [Redirects](#redirects)
-   [Geolocation](#geolocation)
-   [Device classification](#device-classification)
-   [Response headers](#response-headers)

### {{ CONFIG_FILE }} Settings {/*config-js-settings*/}

Update each property's {{ CONFIG_FILE }} as indicated below.

-   **backends:** The `backends` property has been replaced with the `origins` property. 

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
    origins: [
      {
        // the key in backends
        name: "origin",

        // from hostHeader
        override_host_header: "www.mysite.com",

        // Version 7 introduces the ability to load balance across multiple origin hosts. 
        // Previous versions only supported a single host per origin.
        hosts: [
          {
            scheme: "https",
            location: [
              {
                // from domainOrIp
                hostname: "origin.mysite.com",

                // from port
                port: 443,
              }
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

        // If your serverless region is US East, use:
        shields: { us_east: 'DCD' },

        // If your serverless region is US West, instead use:
        // shields: { us_west: 'SAC'},

        // Uncomment the following lines to define a configuration equivalent to disableCheckCert: true 
        // tls_verify: {
        //   allow_self_signed_certs: true,
        // },
      },
    ]
    ```

<!--
-   **Hostnames:** In {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier, custom domains are defined on a per environment basis within the {{ PORTAL }}. In version 7, if you are using CDN-as-code, we recommend that you define them through the `environments` property.

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
      },
      staging: {
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
-->
-   **includeNodeModules:** If you previously set `includeNodeModules: true`, then you should define it within a `serverless` property: 

    ```js filename="{{ CONFIG_FILE }} version 7"
    serverless: {
      includeNodeModules: true,
    },
    ```

-   **includeFiles:** If you previously set `includeFiles`, then you should define it within a `serverless` property:

    ```js filename="{{ CONFIG_FILE }} version 6 and earlier"
    includeFiles: {
      'lang/**/*': true,  
      ‘public/**/*’: true
    }
    ```

    ```js filename="{{ CONFIG_FILE }} version 7"
    serverless: {
      include: ["lang/**/*", "public/**/*"]
    }
    ```

    Versions 6 and earlier supports mapping an input path to a different output path. Version 7 does not support this capability. For example, the following configuration is unsupported:

    ```js filename="{{ CONFIG_FILE }} version 6 and earlier"
    includeFiles: {
      'lang/**/*': 'another/dir/in/layer0/lambda',
    },
    ```

### Routes {/*routes*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 introduces a new JSON syntax for defining the set of features that will be applied to a route.

For example, the following route sets a CDN caching policy:

```js filename="{{ CONFIG_FILE }} version 7"
new Router()
  .get('/', {
    caching: {
      max_age: '1d' // cache for 1 day at the edge
    }
  })
```

The equivalent route in version 6 and earlier is:

```js filename="{{ CONFIG_FILE }} version 6 and earlier"
new Router()
  .get('/', ({ cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 }})
  })
```

In order to ease the transition to version 7, we provide limited support for legacy syntax. However, the following syntax is unsupported:

-   **fallback():** The `fallback()` method, which is unsupported in version 7, executes when no other route is matched. If you are trying to proxy a request to a legacy origin, then you may do so by mapping the desired hostname to an origin configuration from within the {{ PORTAL }}. 

    <Callout type="tip">

      Deploying to {{ PRODUCT }} automatically generates origin configurations from those defined within the {{ CONFIG_FILE }} file. For this reason, we recommend that you map your hostnames to origins once you have deployed your property to {{ PRODUCT }}. [Learn more.](/guides/basics/hostnames_and_origins#add-modify-delete-hostname)

    </Callout>

    You may also manually assign an origin configuration within a route through `set_origin`. If you want this route to act as a catch-all, then we recommend that you position it above your other routes. 

    ```js
    router.get('/', {
        origin: {
          set_origin: 'myorigin',
          }
      })
    ```
-   **catch():** The `catch()` method, which is unsupported in version 7, allows the user to alter responses that have returned an error code. 
-   **destination():** The `destination()` method is unsupported in version 7 at this time. However, you may assign an origin to requests through `set_origin` and redirect requests through `url_redirect`. A future release will provide a streamlined version of traffic splitting through the {{ PORTAL }}. 

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

### Cache Key Customization {/*cache-key-customization*/}

Customize the cache key through `cache_key_rewrite` instead of `CustomCacheKey`. Additionally, there are some subtle differences in our device classification implementation.

| Method (Version 6 and Earlier) | Variable (Version 7)   |
|---|---|
| addIsBot  | Use `%{wurfl_vcap_is_robot}` instead. This variable returns `true \| false` instead of `0 \| 1`. |
| addVendor  | Use `%{wurfl_vcap_is_ios}` and `%{wurfl_vcap_is_android}` instead. This variable returns `true \| false` instead of `apple \| android \| generic`.   |
| addBrowser  | Use `%{wurfl_cap_mobile_browser}` instead.  |
| addDevice  | Use `%{wurfl_vcap_is_smartphone}` and `%{wurfl_cap_is_tablet}` instead. These variables return `true \| false` instead of `0 \| 1`.  |

### Matching Behavior {/*matching-behavior*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier returns an immediate response upon encountering one of the following methods:
-   proxy
-   renderWithApp
-   serveStatic
-   dir
-   static
-   send
-   compute
-   redirect
-   appShell
-   serviceWorker
-   render

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

### Redirects {/*redirects*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier allows you to set redirects by uploading a CSV file within the {{ PORTAL }}. This capability is unsupported in version 7. However, you may define redirects within your routes through the `url_redirect` feature. 

```js filename="routes.js"
new Router()
  .get("/home", { // simple example with a static URL
    url: {
      url_redirect: {
        destination: "/",
      },
    },
  })
  .get("/products/:id", { // example with a path variable
    url: {
      url_redirect: {
        syntax: 'path-to-regexp',
        source: "/products/:id",
        destination: "/p/:id",
      },
    },
  });
```

### Geolocation {/*geolocation*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier adds the following geo-location request headers to all requests sent to the origin:

-   x-0-geo-city
-   x-0-geo-country-code
-   x-0-geo-latitude
-   x-0-geo-longitude
-   x-0-geo-postal-code

In version 7, geolocation headers are not included by default. However, you may define them through HTTP variables as demonstrated below.

```js filename="routes.js"
new Router().match("/:path", {
  headers: {
    set_request_headers: {
      "x-0-geo-country": "%{geo_country}",
      "x-0-geo-city": "%{geo_city}",
      "x-0-geo-latitude": "%{geo_latitude}",
      "x-0-geo-longitude": "%{geo_longitude}",
      "x-0-geo-postal-code": "%{geo_postal_code}",
    },
  },
});
```

### Device Classification {/*device-classification*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier adds the following device classification headers to all requests sent to the origin:

-   x-0-device
-   x-0-device-is-bot
-   x-0-vendor
-   x-0-browser

In version 7, device classification headers are not included by default. However, you may define them through HTTP variables as demonstrated below.

| Header (Version 6 and Earlier) | Variable (Version 7)   |
|---|---|
| x-0-device-is-bot | Use `%{wurfl_vcap_is_robot}` instead. This variable returns `true \| false` instead of `0 \| 1`. |
| x-0-vendor | Use `%{wurfl_vcap_is_ios}` and `%{wurfl_vcap_is_android}` instead. These variables return `true \| false` instead of `apple \| android \| generic`.   |
| x-0-browser | Use `%{wurfl_cap_mobile_browser}` instead. | 
| x-0-device | Use `%{wurfl_vcap_is_smartphone}` and `%{wurfl_cap_is_tablet}` instead. These variables return `true \| false` instead of `smartphone \| tablet \| mobile \| desktop`. | 

**Example:**

```js filename="routes.js"
new Router().match("/:path", {
  headers: {
    set_request_headers: {
      "x-0-device-is-bot": "%{wurfl_vcap_is_robot}",
      "x-0-geo-city": "%{geo_city}",
      "x-0-geo-latitude": "%{geo_latitude}",
      "x-0-geo-longitude": "%{geo_longitude}",
      "x-0-geo-postal-code": "%{geo_postal_code}",
    },
  },
});
```

### Response Headers {/*response-headers*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and adds the following headers with each response:

| Header (Version 6 and Earlier)  | Header (Version 7)  |
|---|---|
| x-0-caching-status  | View additional information about the cache policy applied to the requested content through debug cache response headers. Information on how to enable debug cache response headers is provided below. | 
| x-0-components  | No equivalent header.  |
| x-0-status  |  No equivalent header.  |
| x-0-t  |  No equivalent header.  |
| x-0-version  | x-edg-version  |

**To enable debug cache response headers**

1.  Add a route that enables debug cache response headers. A sample route is provided below.

    ```js filename="routes.js"
    new Router().match("/:path", {
      headers: {
        debug_header:true,
      },
    }); 
    ```

2.  Send the following header with each request: 
    `x-ec-debug:x-ec-cache,x-ec-cache-remote,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state`

    [Learn more.](/guides/performance/response#requesting-debug-cache-information)

## Step 10: Real User Monitoring (RUM) Token {/*real-user-monitoring-rum-token*/}

If you are tracking Core Web Vitals through RUM, then you will need to update the `initEdgioRum` script to use your version 7 token. Your version 7 token is provided on the **Core Web Vitals** page.

```html
<script defer>
  function initEdgioRum() {
    new Edgio.Metrics({
      token: 'ab1234c5-d6ef-789a-12c0-bb48102c2023' //version 7 token
    }).collect()
  }
</script>
<script src="https://rum.layer0.co/latest.js" defer onload="initEdgioRum()"></script>
```

## Step 11: Build your {{ PRODUCT }} Properties {/*build-your-properties*/}

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


## Step 12: Deploy to {{ PRODUCT }} {/*deploy-to-*/}

Once you have successfully built your property, run the following command to deploy your property to {{ PRODUCT }}:

```bash
{{ FULL_CLI_NAME }} deploy --site=<PROPERTY> --team=<TEAM>
```

**Key information:**
-   Replace the following placeholders: 
    -   `<PROPERTY>`: Replace this placeholder with the name of the property created in step 5.
    -   `<TEAM>`: Replace this placeholder with the name of the team created in step 4. If you are deploying to a property in a private space, then you should omit `--team=<TEAM>` from this command.

-   Upon running the above command:

    1.  The {{ PRODUCT }} CLI will require that you log in to the {{ PRODUCT }} if it does not detect an active {{ PRODUCT }} session. 
    2.  You will then need to authorize the CLI by granting it a token through which it may deploy your property to {{ PRODUCT }}. 
    3.  The CLI will warn that you are overwriting a configuration defined within the {{ PORTAL }}. This is the expected behavior and you should press `y` to continue.

        <Callout type="info">

          Deploying a CDN-as-code configuration overwrites rules and origin configurations defined within the {{ PORTAL }}. In this case, the CLI detected changes that are not present in your {{ CONFIG_FILE }}. Specifically, it detected new hostnames (aka custom domains). In the near future, you will be allowed to define those hostnames within your {{ CONFIG_FILE }}. In the meantime, this error will only occur whenever the CLI detects new changes performed within the {{ PORTAL }}. Future deployments should not trigger this warning unless you make additional configuration changes within the {{ PORTAL }}.

        </Callout>

-   The above syntax is only required for your first deployment. After which, you may deploy by running: `{{ FULL_CLI_NAME }} deploy`

## Step 13: Configure your Firewall {/*configure-your-firewall*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 uses a different set of IP blocks than previous versions. This means that you need to update your firewall to allow:

-   **API Domain:** You must allow traffic from the following domain: `api.{{ PRODUCT_NAME_LOWER }}.app`. If you plan on deploying to a development or CI/CD environment, then you will also need to allow this domain for the firewall for those environments.
-   **IP Blocks:** You must allow traffic from {{ PRODUCT }} IP blocks if you plan on using origin configuration(s) (aka backends). 

View our IP blocks by clicking **Instructions** from the **Origins** page.

[Learn more.](/guides/basics/hostnames_and_origins#firewall-allowing-ip-addresses)

## Step 14: Update your DNS {/*update-your-dns*/}

<Callout type="important">

  If you are an enterprise customer and have not already reached out to your account manager to upgrade your team, please do so before serving traffic through {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7. You may contact our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463.

</Callout>

Once you are ready to serve traffic through {{ PRODUCT }}, you will need to update the DNS for each of your hostname(s). Specifically, version 7 requires a CNAME record that points to a service domain that is either specific to your property’s:

-   [Environment](/guides/basics/hostnames_and_origins#environment-specific-service-domain)
-   [Team Space](/guides/basics/hostnames_and_origins#space-specific-service-domain).

<Callout type="info">

  Although version 6 supports both A and CNAME records, version 7 only supports CNAME records.

</Callout>

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 7!

## Additional Considerations {/*additional-considerations*/}

Review the following changes and revise your configuration as needed:
-   [Cache-manifest.js File](#cache-manifest-js-file)
-   [JWT Access Control End-of-Life](#jwt-access-control-end-of-life)
-   [Permalink Indexing](#permalink-indexing)
-   [GraphQL Caching End-of-Life](#graphql-caching-eol)
-   [Duplicate Query String Parameters](#duplicate-query-string-parameters)

### Cache-manifest.js File {/*cache-manifest-js-file*/}

Version 7 no longer generates or uses the `cache-manifest.js` file. Requesting this file returns a `404 Not Found`. Therefore, we recommend removing all requests for this file from your code. 

### JWT Access Control End-of-Life {/*jwt-access-control-end-of-life*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 does not support JWT access control. Previous versions allowed you to configure on a per route basis whether requests would be allowed or denied according to a JWT token.

### Permalink Indexing {/*permalink-indexing*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.1+ automatically adds the `x-robots-tag: noindex` header all responses being served from edge links and permalinks. This prevents search engines from indexing those links. By default, this header will not be added to any responses served from a custom domain. Prior to version 5.1, the `.noIndexPermalink()` function was an opt-in solution to achieve the same effect.

As a result, the `.noIndexPermalink()` router function is now deprecated and serves no purpose. We recommend that you remove this function from your {{ ROUTES_FILE }} file.

However, if you want to override this default behavior and allow search engines to index all permalinks, you can pass the option `indexPermalink` set to `true` to the `Router` constructor:

```js
new Router({ indexPermalink: true })
```

### GraphQL Caching End-of-Life {/*graphql-caching-eol*/}

{{ PRODUCT }} ended support for caching of GraphQL operations. If your {{ PRODUCT }} router ({{ ROUTES_FILE }}) contains usage of `.graphqlOperation(...)`, you should remove it. Otherwise, your application will fail to build.

### Duplicate Query String Parameters {/*optional-review-your-code-for-duplicate-query-string-parameters*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} will no longer modify the request's query string when it detects a duplicate query string parameter.

For example, we will examine how both versions of {{ PRODUCT }} handle the following request:

`https://sports.example.com/index.html?id=123&type=Sports&type=Basketball`

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 4 will modify the duplicate query string parameters as shown below.

`https://sports.example.com/index.html?id=123&type=Sports%5B0%5D&type%5B1%5D=Basketball`

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7, on the other hand, will not modify the query string as shown below.

`https://sports.example.com/index.html?id=123&type=Sports&type=Basketball`

Review your code to see whether it generates duplicate query string parameters. If it does, update it to handle multiple query string parameters with the same name.
