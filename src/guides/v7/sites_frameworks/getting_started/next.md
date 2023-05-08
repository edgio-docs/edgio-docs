---
title: Next.js
---

This guide shows you how to deploy a [Next.js](https://nextjs.org/) application to {{ PRODUCT }}.

<!--
## Example {/* example */}

<ExampleButtons
  title="Next.js SSR"
  siteUrl="https://edgio-community-examples-nextjs-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-nextjs-example"
  deployFromRepo
/>

## Next.js Commerce {/* nextjs-commerce */}

For details on using the Next.js Commerce template with {{ PRODUCT }}, refer to our [Next.js Commerce Guide](/guides/sites_frameworks/getting_started/next_commerce).

<Condition version="<7">

## Connector {/* connector */}

{{ PRODUCT }} provides a connector for this framework. [Learn more.](/guides/sites_frameworks/connectors)

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-next-connector">
  View the Connector Code
</ButtonLink>

</Condition>
-->

## Supported Versions {/* supported-versions */}

{{ PRODUCT_NAME }} supports Next.js version 9 through 13.

## Supported Features {/* supported-features */}

{{ PRODUCT_NAME }} supports all of the most powerful features of Next.js, including:

- [Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/pages#static-generation)
- [Server Side Rendering (SSR)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- Localization
- Image Optimization
- [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) (including `fallback: (true|false|'blocking')`)
- [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) (including `revalidate`)
- [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)

{{ PREREQ }}

<Callout type="info">
  If you run into permission issues while attempting to install the {{PRODUCT}}{' '}
  CLI globally on your local development machine, these may be fixed by using
  [nvm](https://github.com/nvm-sh/nvm) to manage Node and NPM.
</Callout>

## Getting Started {/* getting-started */}

### Create a Next.js Application {/* create-a-nextjs-application */}

If you don't already have a Next.js application, you can create one using:

```bash
npx create-next-app@latest
```

### Initializing your Project {/* initializing-your-project */}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
cd my-next-app
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

{{ INIT_DEFAULT_PACKAGES }}

- The `{{ PACKAGE_NAME }}/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the {{ PRODUCT }} router.
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages.
  {{ INIT_DEFAULT_FILES }}

## Config Options {/* config-options */}

In the generated `{{ CONFIG_FILE }}` file, you can customize how {{ PRODUCT }} builds and runs your Next.js application. Using the `next` key, you can configure the following options:

| Option                  | Description                                                                                                                                                                                                  | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `generateSourceMaps`    | Output sourcemaps so that stack traces have original source filenames and line numbers when tailing the logs in the {{ PRODUCT }} developer console.                                                         | `true`  |
| `disableImageOptimizer` | Disables the {{ PRODUCT }} image optimizer and allows to use the Next's built in image optimizer. <a id="disableImageOptimizer"></a>                                                                         | `false` |
| `disableDevtools`       | Disables the {{ PRODUCT }} development tools widget on the site. <a id="disableDevtools"></a>                                                                                                                | `false` |
| `disableServiceWorker`  | Disables the build of the service worker.                                                                                                                                                                    | `false` |
| `forceServerBuild`      | Forces the `{{ PACKAGE_NAME }}/next` connector to use the server build. This config option replaces the NEXT_FORCE_SERVER_BUILD env variable.                                                                | `false` |
| `optimizeServerBuild`   | Optimizes the server build by bundling all server assets and decreasing the overall startup time. This option has no effect on apps with serverless build. This option is set to `false` for Next 13.x apps. | `true`  |

## {{ PRODUCT }} Next.js Plugin {/* next-plugin */}

{{ PRODUCT_NAME }} provides the following plugin for Next.js. This plugin is automatically added to your project when you run `{{ FULL_CLI_NAME }} init`.

If your project does not have a `next.config.js` file, one will automatically be added when you run `{{ FULL_CLI_NAME }} init`. Doing so adds the following plugin:

### with{{ PRODUCT }} (required)

The `with{{ PRODUCT }}` plugin optimizes the Next.js build for running on {{ PRODUCT }}. It is required to deploy your application on {{ PRODUCT }}.

If your project already has this config file, you need to add these plugins yourself.

```js filename="next.config.js"
const { with{{ PRODUCT }} } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = with{{ PRODUCT }}({
    // Next.js config options
})
```

## {{ PRODUCT_NAME }} Devtools {/* devtools */}

By default, [Devtools](/guides/devtools) are enabled on production builds of Next.js with {{ PRODUCT }}. To disable devtools in production, see [Config Options](#disableDevtools) for setting the `disableEdgioDevTools` flag.

## Running Locally {/* running-locally */}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

## Deploying {/* deploying */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) for more information.

## Prefetching {/* prefetching */}

{{ PREFETCH_TIER1_INTRO }}

The above code allows you to prefetch pages from {{ PRODUCT }}'s edge cache to significantly improve browsing speed. To prefetch a page, add the `Prefetch` component from `{{ PACKAGE_NAME }}/react` to any Next.js `Link` element. The following example shows you how to prefetch JSON data from `getServerSideProps` or `getStaticProps` using the `createNextDataUrl` function from `{{ PACKAGE_NAME }}/next/client`.

```js ins="4,14-23,27"
import {Prefetch} from '{{ PACKAGE_NAME }}/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {createNextDataURL} from '{{ PACKAGE_NAME }}/next/client';

export default function ProductListing({products}) {
  const {locale} = useRouter(); // you can omit this if you're not using localization

  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>
          <Link href={product.url} passHref>
            <Prefetch
              url={createNextDataURL({
                href: product.url,
                locale, // you can omit this if you're not using localization
                routeParams: {
                  // keys must match the param names in your next page routes
                  // So for example if your product page is /products/[productId].js:
                  productId: product.id,
                },
              })}>
              <a>
                <img src={product.thumbnail} />
              </a>
            </Prefetch>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getServerSideProps({params: {id}}) {
  const products = await fetch(/* fetch from your api */).then((res) =>
    res.json()
  );

  return {
    props: {
      products,
    },
  };
}
```

The `Prefetch` component fetches data for the linked page from {{ PRODUCT }}'s edge cache and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

## Routing {/* routing */}

{{ PRODUCT }} supports Next.js's built-in routing scheme for both page and API routes, including Next.js clean dynamic routes. The default {{ ROUTES_FILE }} file created by `{{ FULL_CLI_NAME }} init` sends all requests to Next.js via the `nextRoutes` router plugin:

```js filename='routes.js'
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
import {Router} from '{{ PACKAGE_NAME }}/core/router';

export default new Router()
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes);
```

### nextRoutes {/* nextroutes */}

In the above code, `nextRoutes` adds all Next.js routes to the router based on the `/pages` directory. You can add additional routes before and after `nextRoutes`. For example, you can choose to send some URLs to an alternate backend origin. This is useful for gradually replacing an existing site with a new Next.js app. See [`{{ CONFIG_FILE }}`](/guides/performance/cdn_as_code/edgio_config#origins) for defining origins and [Proxying an Origin](/guides/performance/cdn_as_code/common_routing_patterns#proxying-an-origin) for more information on proxying requests.

A popular use case is to fallback to a legacy site for any route that your Next.js app isn't configured to handle.

```js filename="routes.js"
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
import {Router} from '{{ PACKAGE_NAME }}/core/router';

export default new Router()
  .use(nextRoutes)

  // Proxy non-Next.js routes to your origin site
  .match('/some-legacy-path', {
    origin: {
      set_origin: 'origin',
    },
  });
```

To configure the origin backend, use {{ CONFIG_FILE }}:

```js filename="{{ CONFIG_FILE }}"
module.exports = {
  // Other config options...

  // If you need to proxy some URLs to an origin instead of your Next.js app, you can configure the origins here:
  origins: [
    {
      // The name of the backend origin
      name: 'origin',

      // When provided, the following value will be sent as the host header when connecting to the origin.
      // If omitted, the host header from the browser will be forwarded to the origin.
      override_host_header: 'example.com',

      // The list of backend hosts
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'example.com',
        },
      ],
    },
  ],
};
```

### rewrites and redirects {/* rewrites-and-redirects */}

The `nextRoutes` plugin automatically adds routes for [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) and [redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) specified in `next.config.js`. Redirects are served directly from the network edge to maximize performance.

### Caching {/* caching */}

The easiest way to add edge caching to your Next.js app is to add caching routes after `nextRoutes`. For example,
imagine you have `/pages/p/[productId].js`. Here's how you can SSR responses as well as cache calls to `getServerSideProps`:

```js filename="routes.js" ins="6-14,16-28"
export default new Router()
  .use(nextRoutes)

  // Products - SSR
  .get('/p/:productId', {
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
    },
  })

  // Products - getServerSideProps
  .get('/_next/data/:version/p/:productId.json', {
    // Allowing service worker (if present) to serve the cached responses from the browser itself
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
      service_worker_max_age: '86400s',
      bypass_client_cache: true,
    },
    headers: {
      set_response_headers: {
        'x-sw-cache-control': 'max-age=86400',
      },
    },
  });
```

### Preventing Next.js pages from being cached by other CDNs {/* preventing-nextjs-pages-from-being-cached-by-other-cdns */}

By default, Next.js adds a `cache-control: private, no-cache, no-store, must-revalidate` header to all responses from `getServerSideProps`. The presence of `private` would prevent {{ PRODUCT_NAME }} from caching the response, so `nextRoutes` from `{{ PACKAGE_NAME }}/next` automatically removes the `private` portion of the header to enable caching at the edge. If you want your responses to be private, you need to specify a `cache-control` header using the router:

```js filename='routes.js'
export default new Router().use(nextRoutes).get('/my-private-page', {
  headers: {
    set_response_headers: {
      'cache-control': 'private, no-cache, no-store, must-revalidate',
    },
  },
});
```

Doing so will prevent other CDNs running in front of {{ PRODUCT_NAME }} from caching the response.

## Using next-i18next {/* using-next-i18next */}

The [next-i18next](https://github.com/isaachinman/next-i18next) package is a popular solution for adding localization to Next.js apps. It has some issues when running in serverless deployments, but you can work around these:

First, you need to _not_ use the default name for the `next-i18next.config.js` file. We recommend renaming it `i18next.config.js`. When you use the default name, next-i18next will try to load the config when the serverless function starts and since it is not bundled with the app, it will fail.

Then, you need to explicitly provide the config to `appWithTranslation` and `serverSideTranslations`.

So in your `pages/_app.js`:

```js filename='pages/_app.js'
export default appWithTranslation(MyApp, require('../i18next.config')); // <~ need to explicitly pass the config here
```

and in your pages:

```js
export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'footer'],
        require('../i18next.config') // <~ need to explicitly pass the config here.
      )),
      // Will be passed to the page component as props
    },
  };
}
```

Make sure you also import the config correctly with the new name into your `next.config.js`:

```js filename="next.config.js" ins="6"
const { with{{ PRODUCT }} } = require('{{ PACKAGE_NAME }}/next/config')
const { i18n } = require('./i18next.config')

module.exports = with{{ PRODUCT }}({
    i18n,
  });
```

Finally, you will need to update your `{{ CONFIG_FILE }}` to [includeFiles](/guides/performance/cdn_as_code/edgio_config#serverless) where the locale files are stored. Example using the default of `/public`:

```js filename='{{ CONFIG_FILE }}' ins="13"
module.exports = {
  connector: '{{ PACKAGE_NAME }}/next',

  serverless: {
    // Set to true to include all packages listed in the dependencies property of package.json when deploying to Edgio.
    // This option generally isn't needed as Edgio automatically includes all modules imported by your code in the bundle that
    // is uploaded during deployment
    // includeNodeModules: true,

    // Include additional paths that are dynamically loaded by your app at runtime here when building the serverless bundle.
    include: ['public/**/*'],
  },
};
```

<!-- A working example app can be found [here](https://github.com/edgio-docs/edgio-next-i18n-example). -->

## Image optimizer {/* image-optimizer */}

By default, Next.js image optimizer is replaced by our image optimizer, which is available in all build modes. You can disable it and use the built-in Next.js image optimizer instead by adding `disableImageOptimizer: true` to the `{{ CONFIG_FILE }}` file. see [Config Options](#disableImageOptimizer) for more on the `disableImageOptimizer` flag.

```js filename='{{ CONFIG_FILE }}' ins="3"
module.exports = {
  /* ... */
  next: {
    disableImageOptimizer: true,
  },
};
```

<Callout type="info">

Note that Next.js apps built in serverless mode don't include a Next.js image optimizer. Disabling our image optimizer without providing an alternative may cause them to fail.

</Callout>

## Serverless Bundling {/* serverless-bundling */}

Next.js has continued to improve how it bundles production builds for deployment on serverless architectures. {{ PRODUCT_NAME }} takes advantage of these improvements by applying different configuration options depending on the version of Next.js being used:

| Version           | Next.js configs applied                   |
| ----------------- | ----------------------------------------- |
| Next.js < 12.2.0  | `target: 'experimental-serverless-trace'` |
| Next.js >= 12.2.0 | `output: 'standalone'`                    |

For backwards compatibility, {{ PRODUCT_NAME }} will also respect `target: 'serverless'` in your next.config.js for Next.js versions prior to 12.0.0.

<Callout type="info">

Note that NextRouter.render404 and renderNextPage are retired when using Next.js 12.2.0+. Requests are delegated to a Next.js server instance which will handle determining which page to render based on the request. Prior use cases should now be achieved via using Next.js redirects and rewrites.

</Callout>

## Support for Next.js Middleware (BETA) {/* support-for-nextjs-middleware-beta */}

{{ PRODUCT_NAME }} supports Next.js middleware starting with Next.js 12.2.0.

When using Next.js middleware it should be noted that the middleware functions are only executed at the serverless layer, after the edge cache. Middleware that you want to execute on each request needs to have caching disabled explicitly for the route on which the middleware is enabled. Some Middleware use cases such as rewriting the request to another route would be fine to cache. These use cases need to be evaluated on a per route basis with caching enabled/disabled based on the desired result.

## Runtime Variables Configuration {/* runtime-variables-configuration */}

{{ PRODUCT }} supports runtime variables in `serverRuntimeConfig` and `publicRuntimeConfig` properties of `next.config.js`. For more information, visit the [Next.js Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) documentation.

## Additional Route Handling Options {/* additional-route-handling-options */}

These additional options allow you to change certain behavior of routes that are generated by `nextRoutes`.

### `setEnforceTrailingSlash` {/* set-enforce-trailing-slash */}

Set this option to `true` to suppress the default Next.js behavior of removing trailing slashes when performing a redirect.

If `trailingSlash: true` is set in `next.config.js`, setting this option to `false`, or removing it, will remove the redirect that adds the trailing slash.

```js filename='routes.js'
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
import {Router} from '{{ PACKAGE_NAME }}/core/router';

nextRoutes.setEnforceTrailingSlash(true);

export default new Router().use(nextRoutes);
```
