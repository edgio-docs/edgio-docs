---
title: Frontity
---

This guide shows you how to deploy a [Frontity](https://frontity.org/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Frontity"
  siteUrl="https://layer0-docs-layer0-frontity-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-frontity-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-frontity-connector">
 View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP }}

## Getting Started {/*getting-started*/}

If you don't already have a Frontity app, use the terminal (or command prompt on Windows) to create one using the commands below:

```bash
npx frontity create my-app
```

To prepare your Frontity app for deployment on {{ PRODUCT_NAME }}, run the following in the root folder of your project:

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/frontity` package - Provides router middleware that automatically adds Frontity routes to the {{ PRODUCT_NAME }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Frontity. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on {{ PRODUCT_NAME }}.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT_NAME }}.

<a id="adding-the-service-worker"></a>

## Adding the {{ PRODUCT_NAME }} Service Worker {/*adding-the-service-worker*/}

To add the {{ PRODUCT_NAME }} service worker to your app, call the `install` function from `{{ PACKAGE_NAME }}/prefetch/window` in a `useEffect` hook when the app first loads. For example, you can alter
the Header component in your theme as follows:

```js
// mars-theme/src/components/header.js
import { useEffect } from 'react'
import { install } from '{{ PACKAGE_NAME }}/prefetch/window'

const Header = ({ state }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      install()
    }
  }, [])
}
```

## Prefetching Content {/*prefetching-content*/}

To prefetch data into the browser cache using the service worker, use the `Prefetch` component from `{{ PACKAGE_NAME }}/react`. This component prefetches a specific url from the {{ PRODUCT_NAME }} edge when it becomes visible in the viewport. You typically wrap it around links. For example:

```js
import { Prefetch } from '{{ PACKAGE_NAME }}/react'

function MyComponent() {
  return (
    <Prefetch url="/some/data/url.json">
      {/* When this link is scrolled into view, */}
      {/* /some/data/url.json in JSON will be fetched in */}
      {/* the background and put in the browser cache */}
      <a href="/link/to/page">My Page</a>
    </Prefetch>
  )
}
```

## Running Locally {/*running-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

### Simulate edge caching locally {/*simulate-edge-caching-locally*/}

To simulate edge caching locally, run:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [deploying](deploy_apps) for more information.
