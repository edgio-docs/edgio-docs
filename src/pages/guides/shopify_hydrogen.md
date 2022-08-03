---
title: Shopify Hydrogen
---

This guide shows you how to deploy a [Shopify Hydrogen](https://hydrogen.shopify.dev/) application on {{ PRODUCT_NAME }}.

## Example {/*example*/}

<ExampleButtons
  title="Shopify Hydrogen"
  siteUrl="https://layer0-docs-layer0-shopify-hydrogen-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-shopify-hydrogen-example" 
  deployFromRepo />

## Shopify Hydrogen Requirements {/*shopify-hydrogen-requirements*/}

You’ve installed the following dependencies:

[Yarn](https://classic.yarnpkg.com/) version 1.x or [npm](https://www.npmjs.com/)

[Node.js](https://nodejs.org/en/) version 16.5.0 or higher

<Callout type="info">
{{ PRODUCT_NAME }} production runtime targets Node {{ NODE_VERSION }}. There may be some unexpected behavior building your project with a later version. See the <a href="/guides/install_nodejs#production-version">Node.js</a> guide for more information.
</Callout>

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI {/*install-the-layer0-cli*/}

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
```

## Create a new Shopify Hydrogen app {/*create-a-new-shopify-hydrogen-app*/}

If you don't already have a Shopify Hydrogen app, create one by running the following:

```bash filename="npm"
# JavaScript template
npm init @shopify/hydrogen -- --template demo-store-js

OR

# TypeScript template
npm init @shopify/hydrogen -- --template demo-store-ts
```

```bash filename="yarn"
# JavaScript template
yarn create @shopify/hydrogen --template demo-store-js

OR

# TypeScript template
yarn create @shopify/hydrogen --template demo-store-ts
```

You can verify your app works by running it locally with:

```bash
npm run dev
```

## Enable Server Side Rendering {/*enable-server-side-rendering*/}

1. To enable server side rendering with your Shopify Hydrogen app, build it with target set to `node` with command as:

  ```bash
  npm run build -- --target node
  
  OR
  
  yarn build --target node
  ```
  
  The production version of your app will be running at http://localhost:3000. You can inspect and deploy the compiled version of your Node.js Hydrogen storefront from dist/node.

  NOTE: This step will be auto configured when building with Layer0 as you follow the next steps.

2. Apply middleware

  Create a `server.js` at the root of your project consisting of the following:

  ```js filename="server.js"
  const {createServer} = require('./dist/node');

  createServer().then(({app}) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server ready`);
    });
  });
  ```

## Configuring your Shopify Hydrogen app for {{ PRODUCT_NAME }} {/*configuring-your-shopify-hydrogen-app-for-layer0*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Shopify Hydrogen.

### Update {{ PRODUCT_NAME }} Configuration {/*update-layer0-configuration*/}

Update `{{ CONFIG_FILE }}` at the root of your project to the following:

```js
// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
module.exports = {
  connector: './layer0'
}
```

### Creating Layer0 connector files {/*creating-layer0-connector-files*/}

- Install `@vercel/nft` for Node.js File Tracing, by the following command:
  ```bash
  npm install @vercel/nft

  OR

  yarn add @vercel/nft
  ```

- Create a folder named `layer0` at the root of your project.
  - Create a file inside the `layer0` folder, named `build.js` consistng of the following:
  ```js filename="layer0/build.js"
    const {join} = require('path');
    const {exit} = require('process');
    const {nodeFileTrace} = require('@vercel/nft');
    const {DeploymentBuilder} = require('@layer0/core/deploy');
    const {isYarn} = require('@layer0/cli/utils/packageManager');

    const appDir = process.cwd();
    const builder = new DeploymentBuilder(appDir);

    module.exports = async function build(options) {
      try {
        builder.clearPreviousBuildOutput();
        let command = 'npm run build -- --target node';
        if (isYarn()) {
          command = 'yarn build --target node';
        }
        await builder.exec(command);
        builder.addJSAsset(join(appDir, 'dist'));
        builder.addJSAsset(join(appDir, 'server.js'));
        // Determine the node_modules to include
        let dictNodeModules = await getNodeModules();
        Object.keys(dictNodeModules).forEach(async (i) => {
          await builder.addJSAsset(`${appDir}/${i}`);
        });
        await builder.build();
      } catch (e) {
        console.log(e);
        exit();
      }
    };

    async function getNodeModules() {
      // The whole app inside index.js
      const files = ['./dist/node/index.js'];
      // Compute file trace
      const {fileList} = await nodeFileTrace(files);
      // Store set of packages
      let packages = {};
      fileList.forEach((i) => {
        if (i.includes('node_modules/')) {
          let temp = i.replace('node_modules/', '');
          temp = temp.substring(0, temp.indexOf('/'));
          packages[`node_modules/${temp}`] = true;
        } else {
          packages[i] = true;
        }
      });
      // Sort the set of packages
      return Object.keys(packages)
        .sort()
        .reduce((obj, key) => {
          obj[key] = packages[key];
          return obj;
        }, {});
    }
  ```

  - Create a file named `prod.js` consistng of the following:
  ```js filename="layer0/prod.js"
    module.exports = async function prod(port) {
      process.env.PORT = port;
      await import('../server.js');
    };
  ```

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by layer0 init.
// You should commit this file to source control.
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

const { Router } = require('@layer0/core/router')

module.exports = new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  . noIndexPermalink()
  .match('/assets/:path*', ({ cache }) => {
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
  .match('/', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
  })
  .match('/collections/:path*', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
  })
  .match('/products/:path*', ({ cache }) => {
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

### Run the Shopify Hydrogen app locally on {{ PRODUCT_NAME }} {/*run-the-shopify-hydrogen-app-locally-on-layer0*/}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ CLI_NAME }} build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
{{ CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ CLI_NAME }} build
```

Next, deploy the build to {{ PRODUCT_NAME }} by running the `{{ CLI_NAME }} deploy` command:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.
