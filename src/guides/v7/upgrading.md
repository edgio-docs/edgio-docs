---
title: Upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 7
---

<Callout type="important">

  {{ PRODUCT }} {{ PRODUCT_PLATFORM }} version 7 currently only supports Next, Nuxt, and Nuxt 3. We plan on introducing support for a wide variety of web application frameworks in the near future. If your property is a traditional website, uses a supported framework, or if you have not integrated your web application framework through {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, then you may proceed to upgrade to version 7. 

</Callout>

Upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} to version 7 involves the following steps:

1.  **Version 4 and Earlier:** [Rename layer0.config.js and {{ PRODUCT }} packages.](#rename-layer0-components)
2.  **Version 5 and Earlier:** [Upgrade Node.js](#upgrade-to-node-js-16-x) to version 16.x and update your application to be compatible with Node.js 16.x.
3.  [Upgrade the {{ PRODUCT }} CLI.](#upgrade-the-cli)
4.  [Upgrade your {{ PRODUCT }} packages to version 7.](#upgrade-packages-to-version-7)
5.  [Update your CDN-as-code configuration](#update-your-cdn-as-code-configuration) to reflect changes introduced in version 7.
6.  [Build your {{ PRODUCT }} properties.](#build-your-properties)

## Step 1: Rename layer0 Components {/*rename-layer0-components*/}

This section only applies to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} 4 and earlier. Skip this step if you are using a later version.
-   **Version 5.x:** Proceed to the [Upgrade to Node.js 16.x step](#upgrade-to-node-js-16-x).
-   **Version 6.x:** Proceed to the [Upgrade the {{ PRODUCT }} CLI step](#upgrade-the-cli).

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} now uses {{ PRODUCT }} branding for our CLI, packages, and a configuration file. Additionally, our service will no longer modify duplicate query string parameters.

Perform the following steps for each of your properties:

1.  Rename `layer0.config.js` to `edgio.config.js`. 

    <Callout type="important"> 
 
      {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5+ ignores the `layer0.config.js` configuration file. 
 
    </Callout> 

2.  Rename all references to {{ PRODUCT }} packages from `@layer0` to `{{ PACKAGE_NAME }}`.

    -   **package.json:** In addition to renaming the {{ PRODUCT }} packages, you should also set their version to `^7.0.0`.

        For example, the following excerpt from a `package.json` file references several `@layer0` packages:

        ```
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

        ```
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

        ```
        import {isProductionBuild} from '@layer0/core/environment';
        import {Router, CustomCacheKey} from '@layer0/core/router';
        import {nextRoutes} from '@layer0/next';
        ...
        ```

        You should update all of these `import` statements as shown below.

        ```
        import {isProductionBuild} from '{{ PACKAGE_NAME }}/core/environment';
        import {Router, CustomCacheKey} from '{{ PACKAGE_NAME }}/core/router';
        import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
        ...
        ```
    -   **{{ CONFIG_FILE }}:** If you are using an {{ PRODUCT }} connector, then you should also rename the connector defined in the `connector` property.

        For example, you should update `connector: '@layer0/next'` to `connector: '@edgio/next'`.

    -   **Next app:** Rename all {{ PRODUCT }} references within your `next.config.js` from `@layer0` to `{{ PACKAGE_NAME }}`.

        For example, the following excerpt from a `next.config.js` file contains several `@layer0` references:

        ```
        const { withServiceWorker } = require('@layer0/next/sw')
        const withLayer0 = require('@layer0/next/withLayer0')
        module.exports = withLayer0(
        ...
        ```

        You should update all of these references as shown below.
        ```
        const { withServiceWorker } = require('@edgio/next/sw')
        const withEdgio = require('@edgio/next/withEdgio')
        module.exports = withEdgio(
        ...
        ```

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
    # Edgio generated build directory
    .edgio
    ```
<!-- List additional 4.x considerations here and link them to more info -->

## Step 2: Upgrade to Node.js 16.x {/*upgrade-to-node-js-16-x*/}

<Callout type="info">

  This section only applies to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.x and earlier. If you are using version 6.x, proceed to the [Upgrade the {{ PRODUCT }} CLI step](#upgrade-the-cli).

</Callout>

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6+ runs your apps in Node.js v16. Therefore, we strongly recommend that you use Node.js v16.x when developing your web application. 

[Learn how to use nvm to install Node.js v16.x.](/guides/install_nodejs)

Once you are using Node.js v16, update your application code to be compatible with Node.js v16.

<Callout type="important">

  If `package.json` or `.npmrc` explicitly sets the Node.js engine version to `14.x`, then you will need to update it to `16.x`.

  Additionally, check your CI/CD environment for Node.js version settings. If your workflow targets Node.js 14.x, then you will need to update your files and settings to target Node.js 16.x.

</Callout>

## Step 3: Upgrade the {{ PRODUCT }} CLI {/*upgrade-the-cli*/}

Install the latest version of our CLI.

<Callout type="info">

  By default, {{ PRODUCT }} CLI v5.1+ collects usage and error reporting information to help improve our products. However, it omits personally identifiable information. [Learn how to opt-out](/guides/develop/cli#disable-analytics).

</Callout>

<SnippetGroup>

```bash tabLabel="npm"
npm install -g @edgio/cli
```

```bash tabLabel="Yarn 1 (Classic)"
yarn global add @edgio/cli
```

</SnippetGroup>

## Step 4: Upgrade {{ PRODUCT }} Packages to Version 7 {/*upgrade-packages-to-version-7*/}

Update all {{ PRODUCT }} packages to version 7 using the CLI.

```bash 
edgio use ^7.0.0
```   
  
<Callout type="info">

  If you are upgrading from version 4 and earlier, then you should have already upgraded to version 7. In which case, the above step will indicate that your packages are up to date.

</Callout>

## Step 5: Update your CDN-as-code configuration {/*update-your-cdn-as-code-configuration*/} 









### {{ CONFIG_FILE }} File 

Update each property's {{ CONFIG_FILE }} as indicated below.

-   **backends:** The `backends` property has been replaced with the `origins` property. 

    For example, we will assume that your `backends` property is configured as follows:

    ```javascript filename="{{ CONFIG_FILE }} version 6 and earlier"
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

    The equivalent configuration in version 7 is:

    ```javascript filename="{{ CONFIG_FILE }} version 7"
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

        // In version 7, the location of the shield (formerly referred to as the “global” PoP) is
        // configured in edgio.config.js instead of the {{ PORTAL }} 
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

-   **Hostnames:** In {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 and earlier, custom domains are defined on a per environment basis within the {{ PORTAL }}. In version 7, if you are using CDN-as-code, we recommend that you define them through the `environments` property.

    ```javascript filename="{{ CONFIG_FILE }} version 7"
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

-   **includeNodeModules:** If you previously set `includeNodeModules: true`, then you should define it within a `serverless` property: 

    ```javascript filename="{{ CONFIG_FILE }} version 7"
    serverless: {
      includeNodeModules: true,
    },
    ```

-   **includeFiles:** If you previously set `includeFiles`, then you should define it within a `serverless` property:

    ```javascript filename="{{ CONFIG_FILE }} version 6 and earlier"
    includeFiles: {
      'lang/**/*': true,  
      ‘public/**/*’: true
    }
    ```

    ```javascript filename="{{ CONFIG_FILE }} version 7"
    serverless: {
      include: ["lang/**/*", "public/**/*"]
    }
    ```

    Versions 6 and earlier supports mapping an input path to a different output path. Version 7 does not support this capability. For example, the following configuration is unsupported:

    ```javascript filename="{{ CONFIG_FILE }} version 6 and earlier"
    includeFiles: {
      'lang/**/*': 'another/dir/in/layer0/lambda',
    },
    ```

-   **Routes:** Version 7 introduces a new JSON syntax for defining the set of features that will be applied to a route.

    ```javascript filename="{{ CONFIG_FILE }} version 7"
    new Router()
      .get('/', {
        caching: {
          max_age: '1d' // cache for 1 day at the edge
        }
      })
    ```
    The equivalent configuration in version 6 and earlier is:

    ```javascript filename="{{ CONFIG_FILE }} version 6 and earlier"
    new Router()
      .get('/', ({ cache }) => {
        cache({ edge: { maxAgeSeconds: 60 * 60 * 24 }})
      })
    ```

    In order to ease the transition to version 7, we provide limited support for the legacy syntax. The following syntax is unsupported:

    -   **fallback():** The `fallback` method executes when no other route is matched. This is unsupported in version 7. If you are trying to proxy a request to a legacy origin, then you may do so by setting the `default_origin` on the desired hostname configuration within the {{ CONFIG_FILE }}.

    ```javascript filename="{{ CONFIG_FILE }} version 7"
    environments: {
      // Each key is the name of an environment in the {{ PORTAL }} 
      production: {
        hostnames: [
          {
            hostname: "www.mysite.com",
            default_origin: "legacy"
          },
        ],
      },
    }
    ```

catch()


In Layer0 the catch method allows the user to alter responses that have returned an error code. This is not supported in Edgio v7.
destination()
The destination() method on Router is not supported in Edgio v7 at this time. A future release will allow users to split traffic in very fine grained ways using rules. But as of launch there is no way to do traffic splitting.
Methods
The following ResponseWriter methods are not fully supported in v7:

method
usage
updateResponseCookie
Widely used by customers
removeResponseCookie
Only used by Shoe Carnival
addUpstreamResponseCookie
Only used by Deckers
removeUpstreamResponseCookie
Not used by any customer
setUpstreamResponseHeader
Widely used by customers
updateUpstreamResponseHeader
Widely used by customers

updateResponseCookie

This is not supported in v7, but one can basically do the equivalent using http vars with find/replace. In this example, we modify the set-cookie header for cookie2 to always set the value to “some-value”

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
removeResponseCookie
This is not supported in v7, but one can achieve the effect of “blanking out” a particular set-cookie header using http vars and find/replace
Cache Key Customization
There are some subtle differences in how device classification is implemented in the following CustomCacheKey methods in Edgio v7:

method
Layer0 values
Variable used in Edgio v7
addIsBot
0, 1
wurfl_vcap_is_robot
addVendor
apple, android, generic
wurfl_vcap_is_ios, wurfl_vcap_is_android
addBrowser
chrome, safari, firefox, opera, edge, msie, generic
wurfl_cap_mobile_browser
addDevice
smartphone, tablet, mobile (feature phones), desktop
wurfl_vcap_is_smartphone, wurfl_cap_is_tablet, 
wurfl_vcap_is_full_desktop,



Matching Behavior
In Layer0, the following methods would return a response immediately, causing no further routes to be matched:

proxy
renderWithApp
serveStatic
dir
static
send
compute
redirect
appShell
serviceWorker
render

In Edgio v7, all routes that match the request are executed. So for example, this can be problematic:

```
new Router()
  .get(‘/’, ({ proxy }) => proxy(‘web’))
  .get(‘/:path*’, ({ proxy }) => proxy(‘legacy’))
```

This router will behave differently in Edgio v7 than it did in Layer0. In Layer0, the response would be served from the web origin. The second route will not take effect because proxy stops route processing. In Edgio v7, the request will match both routes. The first route will set the origin to “web”. The second route will immediately override it to “legacy”. The request will be sent to the legacy route.

Therefore the order in which routes are defined is vitally important in v7. In general, routes with more general criteria should be listed before routes with more specific criteria.

So the router above should be rewritten as:

```
new Router()
  .get(‘/:path*’, ({ proxy }) => proxy(‘legacy’))
  .get(‘/’, ({ proxy }) => proxy(‘web’))
```

… so that the order of the routes is reversed
Traffic Splitting
This is not supported in Edgio v7. It will be supported with new features in a subsequent release in Q2 2023.
Redirects
In Layer0, the user could upload large lists of redirects into the console via a CSV file. This capability is not yet supported in v7. Small lists can be implemented in the router:

```
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

Geolocation
Layer0 added the following geo-location request headers to all requests sent to the origin:

Header
Example
x-0-geo-city
San Francisco
x-0-geo-country-code
US
x-0-geo-latitude
37.792094
x-0-geo-longitude
-122.401622
x-0-geo-postal-code
94104


In Edgio v7, geolocation headers are not included by default. But you can use HTTP variables to reproduce the Layer0 Behavior:

```
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

Device Classification
Layer0 added the following headers to every origin request:

x-0-device
x-0-device-is-bot
x-0-vendor
x-0-browser

Edgio v7 does add device classification headers by default. You can achieve something similar by adding your own request headers using the following HTTP variables:

header
Layer0 values
Variable used in Edgio v7
Values in v7
x-0-device-is-bot
0, 1
wurfl_vcap_is_robot
false, true
x-0-vendor
apple, android, generic
wurfl_vcap_is_ios, wurfl_vcap_is_android
false, true
x-0-browser
chrome, safari, firefox, opera, edge, msie, generic
wurfl_cap_mobile_browser
Many different values
x-0-device
smartphone, tablet, mobile (feature phones), desktop
wurfl_vcap_is_smartphone, wurfl_cap_is_tablet, 
wurfl_vcap_is_full_desktop,


Many different values


Example

```
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

Response Headers
Layer0 automatically included the following debugging headers with each response:

Layer0 Response Header
Example Value
Closest Edgio v7 Equivalent
x-0-caching-status
ok
Debug Headers:

x-ec-cache
x-ec-cache-state
x-ec-check-cacheable
x-ec-cache-key
x-0-components
eh=1.1.4,c=4.15.5,e=hhn,ec=1.9.12,ed=1.4.6,gh=1.1.4,g=sna,gd=1.4.6,b=origin
none
x-0-status
eh=200,ed=200,gh=200,gd=200
none
x-0-t
eh=2,ect=1,ecc=hit
none
x-0-version
71 4.15.5 14 2022-12-07T17:51:27.296Z 1.4.4
x-edg-version


To enable the Debug Headers above, you need to:

Add the debug_header feature

```
new Router().match("/:path", {
  headers: {
    debug_header:true,
  },
});
```

Send the following header with each request: 

x-ec-debug:x-ec-cache,x-ec-cache-remote,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state. 

We recommend using the mod_header chrome extension to always send these
Other miscellaneous changes
In Edgio v7, changing Environment Variables in the console does not automatically redeploy your environment. Those values will be used when you next deploy the environment.


## Step 6: Build your {{ PRODUCT }} Properties {/*build-your-properties*/}

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

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 7!

## Additional Considerations





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




<!--
package.json
In package.json rename all packages starting with “@layer” to “@edgio”, use version “^7.0.0” and run npm install or yarn install.
layer0.config.js
Here are the changes you must make to your layer0.config.js file:
Rename to edgio.config.js
Rename your layer0.config.js file to edgio.config.js
connector
In the connector property, rename “@layer0” to “@edgio”. So for example:

  connector: "@layer0/next"	

becomes

  connector: "@edgio/next"
backends
The backends property has been replaced with the new origins property. Given the following backends config:

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

… replace it with the following origins property …

origins: [
  {
    // the key in backends
    name: "origin",

    // from hostHeader
    override_host_header: "www.mysite.com",

    // Edgio v7 introduces the ability to load balance across multiple origin hosts. 
    // Layer0 only supported a single host per origin.
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

    // In Edgio v7, the location of the shield (formerly referred to as the “global” PoP) is
    // configured in edgio.config.js instead of the developer console
    // To be equivalent to Layer0, use a single shield in a single region.

    // If your serverless region is US East, use:
    shields: { us_east: 'DCD' },

    // If your serverless region is US West, instead use:
    // shields: { us_west: 'SAC'},

    // Uncomment the following if you set disableCheckCert: true in layer0.config.js
    // tls_verify: {
    //   allow_self_signed_certs: true,
    // },
  },
]
Hostnames
In Layer0, users configured the custom domains for each environment within the developer console. In Edgio v7, these are configured in edgio.config.js using the environments property:

environments: {
  // Each key is the name of an environment in the Edgio Developer Console
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
includeNodeModules
If you have includeNodeModules: true in your layer0.config.js, add a serverless property in edgio.config.js with includeNodeModules: true:

serverless: {
  includeNodeModules: true,
},
includeFiles

If you have includeFiles in your layer0.config.js add include to the serverless property in edgio.config.js:

So this:

includeFiles: {
  'lang/**/*': true,  
  ‘public/**/*’: true
}

Becomes:

serverless: {
  include: ["lang/**/*", "public/**/*"]
}

Note that Layer0 supported specifying a different output path for each input path like this:

includeFiles: {
  'lang/**/*': 'another/dir/in/layer0/lambda',
},

Edgio v7 does not support this.
Routes

Many of the examples you’ll see on docs.edg.io use a new JSON syntax for the features that are applied to each route. For example, to cache at the edge:

new Router()
  .get('/', {
    caching: {
      max_age: '1d' // cache for 1 day at the edge
    }
  })

In Layer0, this would look like:

new Router()
  .get('/', ({ cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 }})
  })

In order to make the upgrade to v7 as easy as possible, we still largely support the Layer0 syntax, with a few exceptions:
fallback()
In Layer0 the fallback method executes when no other route is matched. This is not supported in Edgio v7. In many cases the fallback route was used to proxy the request to a legacy origin. This can instead be done by setting the default_origin on the hostname configuration in edgio.config.js. For example:

environments: {
  // Each key is the name of an environment in the Edgio Developer Console
  production: {
    hostnames: [
      {
        hostname: "www.mysite.com",
        default_origin: "legacy"
      },
    ],
  },
}
catch()
In Layer0 the catch method allows the user to alter responses that have returned an error code. This is not supported in Edgio v7.
destination()
The destination() method on Router is not supported in Edgio v7 at this time. A future release will allow users to split traffic in very fine grained ways using rules. But as of launch there is no way to do traffic splitting.
Methods
The following ResponseWriter methods are not fully supported in v7:

method
usage
updateResponseCookie
Widely used by customers
removeResponseCookie
Only used by Shoe Carnival
addUpstreamResponseCookie
Only used by Deckers
removeUpstreamResponseCookie
Not used by any customer
setUpstreamResponseHeader
Widely used by customers
updateUpstreamResponseHeader
Widely used by customers

updateResponseCookie

This is not supported in v7, but one can basically do the equivalent using http vars with find/replace. In this example, we modify the set-cookie header for cookie2 to always set the value to “some-value”

new Router()
  .get('/', {
    headers: {
      set_response_headers: {
        "set-cookie": "%{resp_set_cookie/cookie2=(.*)/cookie2=some-value}"
      }
    }
  })

The limitation is you can only do one of these per request
removeResponseCookie
This is not supported in v7, but one can achieve the effect of “blanking out” a particular set-cookie header using http vars and find/replace
Cache Key Customization
There are some subtle differences in how device classification is implemented in the following CustomCacheKey methods in Edgio v7:

method
Layer0 values
Variable used in Edgio v7
addIsBot
0, 1
wurfl_vcap_is_robot
addVendor
apple, android, generic
wurfl_vcap_is_ios, wurfl_vcap_is_android
addBrowser
chrome, safari, firefox, opera, edge, msie, generic
wurfl_cap_mobile_browser
addDevice
smartphone, tablet, mobile (feature phones), desktop
wurfl_vcap_is_smartphone, wurfl_cap_is_tablet, 
wurfl_vcap_is_full_desktop,



Matching Behavior
In Layer0, the following methods would return a response immediately, causing no further routes to be matched:

proxy
renderWithApp
serveStatic
dir
static
send
compute
redirect
appShell
serviceWorker
render

In Edgio v7, all routes that match the request are executed. So for example, this can be problematic:

new Router()
  .get(‘/’, ({ proxy }) => proxy(‘web’))
  .get(‘/:path*’, ({ proxy }) => proxy(‘legacy’))

This router will behave differently in Edgio v7 than it did in Layer0. In Layer0, the response would be served from the web origin. The second route will not take effect because proxy stops route processing. In Edgio v7, the request will match both routes. The first route will set the origin to “web”. The second route will immediately override it to “legacy”. The request will be sent to the legacy route.

Therefore the order in which routes are defined is vitally important in v7. In general, routes with more general criteria should be listed before routes with more specific criteria.

So the router above should be rewritten as:

new Router()
  .get(‘/:path*’, ({ proxy }) => proxy(‘legacy’))
  .get(‘/’, ({ proxy }) => proxy(‘web’))

… so that the order of the routes is reversed
Traffic Splitting
This is not supported in Edgio v7. It will be supported with new features in a subsequent release in Q2 2023.
Redirects
In Layer0, the user could upload large lists of redirects into the console via a CSV file. This capability is not yet supported in v7. Small lists can be implemented in the router:

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
Geolocation
Layer0 added the following geo-location request headers to all requests sent to the origin:

Header
Example
x-0-geo-city
San Francisco
x-0-geo-country-code
US
x-0-geo-latitude
37.792094
x-0-geo-longitude
-122.401622
x-0-geo-postal-code
94104


In Edgio v7, geolocation headers are not included by default. But you can use HTTP variables to reproduce the Layer0 Behavior:

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
Device Classification
Layer0 added the following headers to every origin request:

x-0-device
x-0-device-is-bot
x-0-vendor
x-0-browser

Edgio v7 does add device classification headers by default. You can achieve something similar by adding your own request headers using the following HTTP variables:

header
Layer0 values
Variable used in Edgio v7
Values in v7
x-0-device-is-bot
0, 1
wurfl_vcap_is_robot
false, true
x-0-vendor
apple, android, generic
wurfl_vcap_is_ios, wurfl_vcap_is_android
false, true
x-0-browser
chrome, safari, firefox, opera, edge, msie, generic
wurfl_cap_mobile_browser
Many different values
x-0-device
smartphone, tablet, mobile (feature phones), desktop
wurfl_vcap_is_smartphone, wurfl_cap_is_tablet, 
wurfl_vcap_is_full_desktop,


Many different values


Example

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
Response Headers
Layer0 automatically included the following debugging headers with each response:

Layer0 Response Header
Example Value
Closest Edgio v7 Equivalent
x-0-caching-status
ok
Debug Headers:

x-ec-cache
x-ec-cache-state
x-ec-check-cacheable
x-ec-cache-key
x-0-components
eh=1.1.4,c=4.15.5,e=hhn,ec=1.9.12,ed=1.4.6,gh=1.1.4,g=sna,gd=1.4.6,b=origin
none
x-0-status
eh=200,ed=200,gh=200,gd=200
none
x-0-t
eh=2,ect=1,ecc=hit
none
x-0-version
71 4.15.5 14 2022-12-07T17:51:27.296Z 1.4.4
x-edg-version


To enable the Debug Headers above, you need to:

Add the debug_header feature

new Router().match("/:path", {
  headers: {
    debug_header:true,
  },
});

Send the following header with each request: 

x-ec-debug:x-ec-cache,x-ec-cache-remote,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state. 

We recommend using the mod_header chrome extension to always send these
Other miscellaneous changes
In Edgio v7, changing Environment Variables in the console does not automatically redeploy your environment. Those values will be used when you next deploy the environment.

___________________________________________________________________________________
Audit of Feature Usage in EdgeJS
Here’s a list of EdgeJS features and their usage by customers: EdgeJS Customer Feature Audit
TODOs for Engineering
JIRA Filter for Layer0 Migration

Here are some things we need to implement ASAP to ensure a good upgrade experience:

Support prerendering:
Enable it in the console build logic
Need to request each prerendered file twice to force it into the cache.
https://jira.atlas.llnw.com/browse/CON-16https://app.clickup.com/t/4205457/APPOPS-19158 
Enable this in @edgio/core
Prevent indexing of permalinks by adding x-robots-tag: noindex as a response header to all requests that do not come from a custom domain.
export const HOSTS_NOINDEX_PERMALINK_REGEX = /\.layer0\.link|\.layer0-perma\.link|\.edgio\.link|\.edgio-perma\.link|\.layer0-limelight\.link/
Implement as much of CustomCacheKey as possible: JIRA
addCookie can be implemented using the %{cookie_$name} http var
addHeader can be implemented using the %{http_$reqheader} http var
removeMethod can be implemented by simply reconstructing the key without the method. Note that method is not included in the cache key by default.
removeBody can be removed, because Sailfish does not support caching based on the body
Query
excludeAllQueryParameters (we can support this)
excludeAllQueryParametersExcept (“include” in the UI)
excludeQueryParameters (“include all except” in the UI)
We can remove these device methods. They aren’t likely used:
addIsBot
addVendor
addBrowser
addDevice
Need to plug this into cache({ key }) as rewrite_cache_key and cache_key_query_string
Implement missing Layer0 ResponseWriter methods:
Cookies (JIRA)
updateResponseCookie
removeResponseCookie
addUpstreamResponseCookie
updateUpstreamResponseCookie
removeUpstreamResponseCookie
Headers
setUpstreamResponseHeader
updateUpstreamResponseHeader
More info: https://docs.google.com/document/d/1XeLxKd9OVisCaF0IPamewb13rdCq6ir1owqy99JOzEk/edit#




-->
