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

{{ SIGN_UP }}

{{ INSTALL_CLI }}

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

  NOTE: This step will be auto configured when building with {{ PRODUCT }} as you follow the next steps.

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

<a id="configuring-your-shopify-hydrogen-app"></a>

## Configuring your Shopify Hydrogen app for {{ PRODUCT_NAME }} {/*configuring-your-shopify-hydrogen-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Shopify Hydrogen.

<a id="update-configuration"></a>

### Update {{ PRODUCT_NAME }} Configuration {/*update-configuration*/}

Update `{{ CONFIG_FILE }}` at the root of your project to the following:

```js
// This file was automatically added by {{ FULL_CLI_NAME }} deploy.
// You should commit this file to source control.
module.exports = {
  connector: './myconnector'
}
```

<a id="creating-connector-files"></a>

### Creating {{ PRODUCT }} connector files {/*creating-connector-files*/}

- Install `@vercel/nft` for Node.js File Tracing, by the following command:
  ```bash
  npm install @vercel/nft

  OR

  yarn add @vercel/nft
  ```

- Create a folder named `myconnector` at the root of your project.
  - Create a file called `build.js` within the `myconnector` folder that contains the following content:
  ```js filename="myconnector/build.js"
    const {join} = require('path');
    const {exit} = require('process');
    const {nodeFileTrace} = require('@vercel/nft');
    const {DeploymentBuilder} = require('{{ PACKAGE_NAME }}/core/deploy');
    const {isYarn} = require('{{ PACKAGE_NAME }}/cli/utils/packageManager');

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

  - Create a file named `prod.js` that contains the following content:
  ```js filename="myconnector/prod.js"
    module.exports = async function prod(port) {
      process.env.PORT = port;
      await import('../server.js');
    };
  ```

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()

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

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

<a id="run-the-shopify-hydrogen-app-locally"></a>

### Run the Shopify Hydrogen app locally on {{ PRODUCT_NAME }} {/*run-the-shopify-hydrogen-app-locally-on*/}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ FULL_CLI_NAME }} build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
{{ FULL_CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ FULL_CLI_NAME }} build
```

Next, deploy the build to {{ PRODUCT_NAME }} by running the `{{ FULL_CLI_NAME }} deploy` command:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.
