# Frontity

This guide shows you how to deploy [Frontity](https://frontity.org/) apps on the Moovweb XDN

## Example Site

Here is an example of the Frontity starter app running on the XDN:

[Try the Frontity Example Site](https://moovweb-docs-xdn-frontity-example-default.moovweb-edge.io?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-frontity-example?button)

## Install Node.js and npm

**XDN only supports Node.js version 12.x**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

If you don't already have a Frontity app, use the terminal (or command prompt on Windows) to create one using the commands below:

```
npx frontity create my-app
```

To prepare your Frontity app for deployment on the Moovweb XDN, run the following in the root folder of your project:

```
npm install -g @xdn/cli
xdn init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/frontity` package - Provides router middleware that automatically adds Frontity routes to the XDN router.
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `@xdn/react` package - Provides a `Prefetch` component for prefetching pages
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to Frontity. Update this file to add caching or proxy some URLs to a different origin.

## Running Locally

To simulate your app within the XDN locally, run:

```
xdn dev
```

### Simulate edge caching locally

To simulate edge caching locally, run:

```
xdn dev --cache
```

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project

```
xdn deploy
```

See [deploying](deploying) for more information.
