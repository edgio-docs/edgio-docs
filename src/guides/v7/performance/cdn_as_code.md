---
title: Getting Started with CDN-As-Code ({{ EDGEJS_LABEL}})
---

{{ROUTEHELPER.md}}

{{ PRODUCT }} provides a CDN-as-code platform that allows you to configure CDN behavior using {{ EDGEJS_LABEL }} within a file ({{ ROUTES_FILE }}) stored alongside your code. This allows you to leverage the power of source control for collaboration and to link your CDN configurations with specific versions of your web application.

## Quick Start {/* quick-start */}

Get started with CDN-as-code by either experimenting with:

- Our [sample websites](#examples):

  <ExampleButtons
    title="Simple"
    siteUrl="https://edgio-community-examples-v7-simple-performance-live.edgio.link/"
    repoUrl="https://github.com/edgio-docs/edgio-v7-simple-performance-example/"
  />

- Your web application or website.

### Create a Property {/* create-property */}

Create a property. If you have already performed this step, proceed to the next step. [Learn more.](/guides/getting_started)

### Initialize Your Property {/* initialize-property */}

Use the {{ PRODUCT }} CLI to initialize your property. If you have already performed this step, proceed to the next step.

    <Callout type="info">

    This step requires [Node.js v{{ NODE_VERSION }}](/guides/install_nodejs).

    </Callout>

    Install the {{ PRODUCT }} CLI, initialize your property, and then deploy it by running the following command from the root directory of your web application or website:

    ```bash
    npx {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }} init \
      {{ INIT_ARG_EDGIO_VERSION }} \
      --name <PROPERTY> \
      --deploy
    ```

    Replace `<PROPERTY>` with the name of the property defined in step 1. You should only use lower-case characters and replace spaces with dashes (e.g., `my-property`).

    When you run the above command, the CLI will prompt you with the following questions to set up your property:

    ```text
      🚀 Let's get started with Edgio!

      ✔ What is the hostname or IP address of the origin site that you will host on Edgio? … my-custom-property.com
      ✔ Should we create a new directory for your Edgio app or use the current directory? › Create a new directory
      ✔ Which package manager would you like to use? › npm
      ✔ installing @edgio/core, @edgio/cli, @edgio/prefetch, @edgio/devtools... done.
      > edgio.config.js not found, creating...
      > routes.js not found, creating...
      🔑 You are not logged in.

      ? To log you in we're going to open your browser and visit Edgio Developer Console. › - Use arrow-keys. Return to submit.
      ❯   Continue
          Cancel
    ```

    First, you will be prompted to enter the hostname or IP address of the origin site that you will host on {{ PRODUCT }}. This is the site that {{ PRODUCT }} will fetch content from. For example, if you are using {{ PRODUCT }} to improve the performance of `my-custom-property.com`, then you would enter `my-custom-property.com` here.

    Next, you will be prompted to choose whether to create a new directory for your {{ PRODUCT }} property or use the current directory. If you are currently in the root directory of your project code, then choose `Use the current directory`.

    Finally, you will be prompted to choose which package manager to use, either `npm` or `yarn`.

    If this is your first time using the {{ PRODUCT }} CLI to deploy, then you will be prompted to log in to the {{ PORTAL_LINK }}. To log in, select `Continue`. This will open a browser window where you may log in by creating a new account, or authenticating with a third-party provider such as Google or GitHub. Once you log in, you'll be prompted to authorize creating a local access token:

    ![Local Access Token](/images/v7/performance/cli-auth-token.png)

    After clicking **Create access token**, you may return back to the CLI and continue with the deployment.

    <Callout type="important">
      This step is necessary to deploy your property to {{ PRODUCT }}, but not necessary to run and build your property locally. It is recommended you authenticate during this step otherwise your first deployment will fail.
    </Callout>

    Once your deployment completes, you should see an output similar to the following:

    ```text
      🚀 Let's get started with Edgio!

      ✔ What is the hostname or IP address of the origin site that you will host on Edgio? … my-custom-property.com
      ✔ Should we create a new directory for your Edgio app or use the current directory? › Create a new directory
      ✔ Which package manager would you like to use? › npm
      ✔ installing @edgio/core, @edgio/cli, @edgio/prefetch, @edgio/devtools... done.
      > edgio.config.js not found, creating...
      > routes.js not found, creating...
      🔑 You are not logged in.

      ✔ To log you in we're going to open your browser and visit Edgio Developer Console. › Continue
      Authenticating user!
      Please visit this URL from any device and click on "Create access token" to authorize this device:
      https://api.edgio.app/account/cli?name=CLI+Api+Key&sid=<ID>&action=deploy

      Waiting for authentication...
      🔑 You are now logged in as "xxx@yyy.zzz"

      📋 Deploying to:
      > Team: Private space
      > Site: my-custom-property.com
      > Environment: default
      > Edgio version: 7.0.12
      > Deployment #1

      🛠️  Building your app for deployment on Edgio
      > Bundling router... done.
      > Bundling edge functions... done.
      > Writing static asset aliases... done.
      done 277ms

      📦 Packaging...
      > Zipping project folder
      > Size: 674.22 KB
      done 177ms

      📡️ Uploading...
      done 1s

      ⌛ Deploying...
      done 56s

      ***** Deployment Complete *****************************************************
      *                                                                             *
      *  🖥  Edgio Developer Console:                                                *
      *  https://edgio.app/<YOUR-TEAM>/my-custom-property.com/env/default/builds/1  *
      *                                                                             *
      *  🔗 Permalink:                                                              *
      *  https://<YOUR-TEAM>-my-custom-property-com-1.free.edgio-perma.link         *
      *                                                                             *
      *  🌎 Edge:                                                                   *
      *  https://<YOUR-TEAM>-my-custom-property-com-default.edgio.link              *
      *                                                                             *
      *******************************************************************************

      To change directories to your new Edgio app:

          cd my-custom-property.com

      To run your app locally:

          edg dev

      To redeploy your app:

          edg deploy
    ```

### {{ PRODUCT }} Files {/* product-files */}

During the initialization process, the {{ PRODUCT }} CLI created the following files:

- `{{ CONFIG_FILE }}`: This file contains the configuration for your {{ PRODUCT }} property. You can use this file to configure your property's name, environments, origins, and other settings. [Learn more](/guides/performance/cdn_as_code/edgio_config.md).
- {{ ROUTES_FILE }}: This file contains the router rules for your {{ PRODUCT }} property. You can use this file to define how {{ PRODUCT }} will handle requests to your property.

## Config File {/* config-file */}

The `{{ CONFIG_FILE }}` file contains some configurations the router may reference for handling requests along with other components such as [connectors](/guides/sites_frameworks/connectors.md).

The default `{{ CONFIG_FILE }}` file contains the following configuration based on the input from out initialization process:

```js
// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/guides/edgio_config
module.exports = {
  // The name of the site in Edgio to which this app should be deployed.
  name: 'my-custom-property.com',

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
          // The domain name or IP address of the origin serve r
          location: 'my-custom-property.com',
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
};
```

The relevant configuration options generated include the `name` and `origins` properties that will be used later.

- The `name` property is used to identify your {{ PRODUCT }} property in the {{ PORTAL_LINK }}
- The `origins` property is used to configure the origins to which the router will connect when handling requests.

[Learn more](/guides/performance/cdn_as_code/edgio_config.md) about the `{{ CONFIG_FILE }}` file and all the configuration options it supports.

## Routes File {/* routes-file */}

The `{{ PACKAGE_NAME }}/core` package provides a JavaScript API for controlling routing and caching from your code base rather than a CDN web portal. Using this _{{ EDGEJS_LABEL }}_ approach allows this vital routing logic to be properly tested, reviewed, and version controlled, just like the rest of your application code.

Using the router, you can:

- Proxy requests to upstream sites
- Send redirects from the network edge
- Render responses on the server using Next.js and Nuxt.js, or any other framework that supports server side rendering.
- Alter request and response headers
- Send synthetic responses

As mentioned above, the `{{ ROUTES_FILE }}` file is created during the initialization process.

{{ ROUTESJS_CALLOUT.md }}

The routes file contains [Rules](/guides/performance/rules) that:

- Identifies requests by HTTP method, URL path, query string parameters, cookies, and request headers.
- Determines how our CDN will handle the above requests. For example, you may configure those requests to be cached, prefetched, passed through without modification, served as static content, and more.

### Default Route Configuration {/* default-route-configuration */}

By default, your {{ ROUTES_FILE }} contains the following configuration:

```js
// This file was added by edgio init.
// You should commit this file to source control.
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  // .match('/api/:path*', {
  //   caching: {
  //     max_age: '1d',
  //     stale_while_revalidate: '1h',
  //     bypass_client_cache: true,
  //     service_worker_max_age: '1d',
  //   },
  // })

  // plugin enabling basic Edgio functionality
  .use(edgioRoutes);
```

The above route matches all requests that start with `/api/` and instructs {{ PRODUCT }} to:

- Cache those requests on our network for one day.
- Allow us to serve stale content for one hour.
- Instruct the browser to treat the response as immediately stale.
- Allow prefetched requests to be served from cache for one day.
- Proxy those requests to your `origin` backend when we cannot serve them from cache.

## Routes {/* routes */}

A route identifies a set of requests through any combination of URL path, HTTP method, cookies, request headers, and query string parameters. The following routes show various ways for identifying requests.

### Parts of a Route {/* parts-of-a-route */}

Routes define a set of [Rules](/guides/performance/rules) that determine how requests will be handed by {{ PRODUCT }}.

In {{ EDGEJS_LABEL }}, this is broken down into two parts when calling a router function. We'll dive deeper into the different available methods below, but for now, will use the `.match()` method as an example.

The `.match()` takes two arguments: `.match(criteria, features)`. The [`.match()` API documentation](/docs/api/core/classes/index.Router.html#match) will provide you with the specific type definitions, but we'll refer to them as `criteria` and `features` throughout this guide.

- `criteria` can be a String for a simple path matching, or an Object that defines more specific criteria for matching requests such as HTTP method, headers, cookies, and query string parameters.
- `features` is an Object that defines how {{ PRODUCT }} will handle the requests that match the criteria, such as caching, redirects, proxying to an origin server, and more.

### Route Criteria {/* route-criteria */}

Below are some simple examples of how to match requests using the `.match()` method.

- Match all requests:

  ```js
  router.match('/:path*', {
    // features
  });
  ```

- Match all `GET` requests whose URL path starts with `/marketing/images/`:

  ```js
  router.get('/marketing/images/:path*', {
    // features
  });
  ```

- Match all `GET` and `POST` requests whose URL path starts with `/marketing/images/` and contain the `sport` request header set to `basketball`:

  ```js
  router.match(
    {
      path: '/marketing/images/:path*',
      method: /GET|POST/i, // regular expression
      headers: {sport: /^basketball$/i}, // keys are header names; values are regular expressions
    },
    {
      // features
    }
  );
  ```

Learn more advanced syntax with [Route Criteria and Conditions](/guides/performance/cdn_as_code/route_criteria).

### Route Features {/* route-features */}

Once you have identified a set of requests, you need to define how {{ PRODUCT }} will handle those requests. The following routes show various ways in which requests can be processed.

- Apply a caching policy to all requests and proxy cache misses to the `origin` backend:

```js
 router.match('/:path*', {
   {
     caching: {
       max_age: "1h"
     },
     origin: {
       set_origin: "origin"
     }
   }
 })
```

- Set the `images` response header and proxy cache misses to the `origin` backend for all `GET` requests whose URL path starts with `/marketing/images/`:

```js
router.get('/marketing/images/:path*', {
  headers: {
    set_response_headers: {
      images: 'true',
    },
  },
  origin: {
    set_origin: 'origin',
  },
});
```

- Redirect a URL to its new location:

```js
router.get('/old/path', {
  url: {
    url_redirect: {
      code: 301,
      source: '\\/old\\/path',
      destination: '/new/path',
    },
  },
});
```

Learn more advanced syntax with [Route Features](/guides/performance/cdn_as_code/route_features).

### Defining Routes {/* defining-a-route */}

Routes are defined by calling a method on the `Router` class based on the HTTP method you intend to match. For example, you can handle a `GET` request a specific path or pattern using the `Router.get(...)` method. The router contains methods for all the supported HTTP methods. The following methods are available:

- `delete`
- `get`
- `head`
- `match` (matches any HTTP method)
- `options`
- `patch`
- `post`
- `put`

A full list of supported functions can be found in the [Router API documentation](/docs/api/core/classes/index.Router.html).

## Route Execution {/* route-execution */}

When {{ PRODUCT_NAME }} receives a request, it executes **each route that matches the request** in the order in which they are declared until one sends a response.

Multiple routes can therefore be executed for a given request. A common pattern is to render the response with middleware such as `nextRoutes` while adding caching for a route that may also be handled by the middleware. In the following example we render a response with Next.js and cache it at the edge for 1 hour:

```js
import {Router} from '{{ PACKAGE_NAME }}/core';
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';

export default new Router()
  // Send requests to serverless and render the response with Next.js
  .use(nextRoutes)

  // Cache all requests to /products/:id for 1 hour
  .get('/products/:id', {
    caching: {max_age: {200: '1h'}, stale_while_revalidate: '1h'},
  });
```

## Testing Locally {/* deploy-locally */}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by letting you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ CLI_CMD(dev) }}`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

## Deploying Your Property {/* deploy-to */}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ CLI_CMD(deploy) }}
```

Assess performance and caching behavior from the {{ PORTAL_LINK }}. Fine-tune your configuration by adding routes and then redeploying your property. Once you are ready to serve production traffic through {{ PRODUCT }}, update your site's DNS to point to our service.

[Learn more.](/guides/production)

## Examples {/* examples */}

Use our sample website to gain hands-on experience on how to set up {{ PRODUCT }} {{ PRODUCT_EDGE }}. Specifically, you can browse our sample websites, view their source code, and even experiment on them by deploying them to {{ PRODUCT }}.

**Simple Example**

This example demonstrates a basic {{ PRODUCT }} configuration for `publicdomainreview.org`. It contains two routes that cache content according to their file extension.

<ExampleButtons
  title="Simple"
  siteUrl="https://edgio-community-examples-v7-simple-performance-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-simple-performance-example/"
/>

<!-- TODO: update example to work on v7
**Full-Featured Example**

This example demonstrates a full-featured {{ PRODUCT }} configuration that showcases the following functionality:

- [Proxying requests](/guides/performance/cdn_as_code/common_routing_patterns#proxying-an-origin) to multiple origins
- Increasing the cache buffer during revalidation through [StaleWhileRevalidate](/guides/performance/caching#achieving-100-cache-hit-rates)
- [Prerendering](/guides/performance/static_prerendering) pages and caching them to improve performance.
- Instructing the browser to [prefetch](/guides/performance/prefetching) and [deep fetch](/guides/performance/prefetching#deep-fetching) cached content to improve performance.

  <Callout type="info">

  Prefetching only improves performance for cached content. {{ PRODUCT }} returns `412 Precondition Failed` when prefetching a cache miss. This status code means that the prefetching did not occur for that request.

  </Callout>

- [Transforming and optimizing images](/guides/performance/image_optimization)
- Transforming the response through [Serverless Compute](/guides/performance/serverless_compute)
- [Removing response headers](/guides/performance/cdn_as_code#alter-requests-and-responses)
- [Normalizing the cache key](/guides/performance/caching#customizing-the-cache-key)
- Generating performance insights through [DevTools](/guides/performance/observability/devtools)
- Tracking [Core Web Vitals](/guides/performance/observability/core_web_vitals) through real user monitoring (RUM).

<ExampleButtons
  title="Full-Featured"
  siteUrl="https://edgio-community-examples-full-featured-performance-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-full-featured-performance-example/"
  deployFromRepo
/>
-->

## Issues? {/* issues */}

If you have any issues during this process, check our [forums]({{ FORUM_URL }}) for assistance.
