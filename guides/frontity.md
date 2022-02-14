# Frontity

This guide shows you how to deploy [Frontity](https://frontity.org/) apps on {{ PRODUCT_NAME }}.

## Example

[Try the Frontity Example Site](https://layer0-docs-layer0-frontity-example-default.layer0.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-frontity-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-frontity-example)

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-frontity-connector?button)

{{ SYSTEM_REQUIREMENTS }}

## Getting Started

If you don't already have a Frontity app, use the terminal (or command prompt on Windows) to create one using the commands below:

```
npx frontity create my-app
```

To prepare your Frontity app for deployment on {{ PRODUCT_NAME }}, run the following in the root folder of your project:

```
npm install -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/frontity` package - Provides router middleware that automatically adds Frontity routes to the {{ PRODUCT_NAME }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Frontity. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on {{ PRODUCT_NAME }}.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT_NAME }}.

## Adding the {{ PRODUCT_NAME }} Service Worker

To add the {{ PRODUCT_NAME }} service worker to your app, call the `install` function from `{{ PACKAGE_NAME }}/prefetch/window` in a `useEffect` hook when the app first loads. For example, you can alter
the Header component in your theme as follows:

```js
// mars-theme/src/components/header.js
import { useEffect } from 'react'
import { install } from '{{ CLI_NAME }}/prefetch/window'

const Header = ({ state }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      install()
    }
  }, [])

  /* ... */
}
```

## Prefetching Content

To prefetch data into the browser cache using the service worker, use the `Prefetch` component from `{{ PACKAGE_NAME }}/react`. This component prefetches a specific url from the {{ PRODUCT_NAME }} edge when it becomes visible in the viewport. You typically wrap it around links. For example:

```js
import { Prefetch } from '{{ PACKAGE_NAME }}/react'

function MyComponent() {
  return (
    <Prefetch url="/some/data/url.json">
      {/* When this link is scrolled into view, /some/data/url.json in JSON will be fetched in the background and put in the browser cache */}
      <a href="/link/to/page">My Page</a>
    </Prefetch>
  )
}
```

## Running Locally

To simulate your app within {{ PRODUCT_NAME }} locally, run:

```
{{ CLI_NAME }} dev
```

### Simulate edge caching locally

To simulate edge caching locally, run:

```
{{ CLI_NAME }} dev --cache
```

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project

```
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.
