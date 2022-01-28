# Remix

This guide shows you how to deploy a Remix application on {{ PRODUCT_NAME }}.

## Example

[Try the Remix Express Example Site](https://layer0-docs-layer0-remix-express-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/layer0-remix-express-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-remix-express-example)

{{ SYSTEM_REQUIREMENTS }}

## Sign up for {{ PRODUCT_NAME }}

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup).

## Install the {{ PRODUCT_NAME }} CLI

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Create a new Remix app

If you don't already have a Remix app, create one by running the following:

```bash
npx create-remix@latest
# Choose express server
cd project-name
```

You can verify your app works by running it locally with:

```bash
npm run dev
```

## Configuring your Remix app for {{ PRODUCT_NAME }}

### Initialize your project

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Remix.

### Install {{ PACKAGE_NAME }}/express

Install {{ PACKAGE_NAME }}/express by running the following:

```bash
npm install {{ PACKAGE_NAME }}/express
```

### Update {{ PRODUCT_NAME }} Configuration

Update `{{ CONFIG_FILE }}` at the root of your project to the following:

```js
// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
module.exports = {
  connector: '@{{ PACKAGE_NAME }}/express',
  express: {
    appPath: './server/index.js',
  },
  includeFiles: {
    public: true,
  },
}
```

### Configure the routes

Update `routes.js` at the root of your project to the following:

```js
// This file was added by layer0 init.
// You should commit this file to source control.
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

const { Router } = require('@{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  .match('/', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
  })
  .match('/exmaple-path', ({ cache }) => {
    // other paths
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
  })
  .match('/build/:path*', ({ cache }) => {
    // route build output files through Layer0
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
        forcePrivateCaching: true,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
      },
    })
  })
  .fallback(({ renderWithApp }) => renderWithApp())
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Remix app locally on {{ PRODUCT_NAME }}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
{{ CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploying

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Next, deploy the build to {{ PRODUCT_NAME }} by running the `{{ CLI_NAME }} deploy` command:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.
