---
title: Hugo
---

# Hugo

This guide shows you how to deploy a [Hugo](https://gohugo.io) application on Layer0.

## Example

[View the Code](https://github.com/layer0-docs/layer0-hugo-example?button)

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP_LAYER0 }}

## Install the Layer0 CLI

If you have not already done so, install the [Layer0 CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Create a new Hugo app

### Step 1: Install Hugo

```bash
brew install hugo
# or
port install hugo
```

To verify your new install:

```bash
hugo version
```

### Step 2: Create a New Site

```bash
hugo new site quickstart
```

### Step 3: Add a Theme

See [themes.gohugo.io](https://themes.gohugo.io/) for a list of themes to consider. This quickstart uses the beautiful [Ananke theme](https://themes.gohugo.io/gohugo-theme-ananke/).

First, download the theme from GitHub and add it to your site's `themes` directory:

```bash
cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

_Note for non-git users:_

- If you do not have git installed, you can download the archive of the latest
  version of this theme from:
  https://github.com/theNewDynamic/gohugo-theme-ananke/archive/master.zip
- Extract that .zip file to get a "gohugo-theme-ananke-master" directory.
- Rename that directory to "ananke", and move it into the "themes/" directory.

Then, add the theme to the site configuration:

```bash
echo theme = \"ananke\" >> config.toml
```

### Step 4: Add Some Content

You can manually create content files (for example as `content/<CATEGORY>/<FILE>.<FORMAT>`) and provide metadata in them, however you can use the `new` command to do a few things for you (like add title and date):

```
hugo new posts/my-first-post.md
```

### Step 5: Start the Hugo server

```bash
hugo server -D
```

## Configuring your Hugo app for Layer0

Create a `package.json` at the root of your project with the following:

```json
{
  "name": "hugo",
  "version": "1.0.0",
  "scripts": {
    "build": "hugo -D",
    "deploy": "0 deploy"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### Initialize your project

In the root directory of your project run `0init`:

```bash
0init
```

This will automatically update your `package.json` and add all of the required Layer0 dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on Layer0
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for Layer0
- `routes.js` - A default routes file that sends all requests to Hugo.

### Configure the routes

Update `routes.js` at the root of your project to the following:

```js
// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'

export default new Router().static('public', ({ cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 60 * 365,
      forcePrivateCaching: true,
    },
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
})
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Hugo app locally on Layer0

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run Layer0 on your local machine:

```bash
0dev
```

Load the site http://127.0.0.1:3000

## Deploying

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Next, deploy the build to Layer0 by running the `0 deploy` command:

```bash
0 deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.
