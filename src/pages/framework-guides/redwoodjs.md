---
title: Redwood
---

# RedwoodJS

This guide shows you how to deploy [RedwoodJS](https://redwoodjs.com/) apps on Layer0.

## Example

[Try the RedwoodJS Example Site](https://layer0-docs-layer0-redwoodjs-example-default.layer0-limelight.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-redwoodjs-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-redwoodjs-example)

## Connector

This framework has a connector developed for Layer0. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-redwood-connector?button)

{{ SYSTEM_REQUIREMENTS }}

## Getting Started

If you don't already have a RedwoodJS app, use the terminal (or command prompt on Windows) to create one using the commands below:

```
yarn create redwood-app ./my-redwood-app
```

To prepare your RedwoodJS app for deployment on Layer0, run the following in the root folder of your project:

```
npm install -g {{ PACKAGE_NAME }}/cli
0init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on Layer0
- The `{{ PACKAGE_NAME }}/redwoodjs` package - Provides router middleware that automatically adds RedwoodJS routes to the Layer0 router.
- `routes.js` - A default routes file that sends all requests to RedwoodJS. Update this file to add caching or proxy some URLs to a different origin.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on Layer0.

## Running Locally

To simulate your app within Layer0 locally, run:

```
0dev
```

### Simulate edge caching locally

To simulate edge caching locally, run:

```
0dev --cache
```

## Deploying

Deploying requires an account on Layer0. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to Layer0 by running the following in the root folder of your project

```
0 deploy
```

See [deploying](deploying) for more information.
