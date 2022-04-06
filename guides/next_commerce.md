# Next.js Commerce

This guide shows you how to deploy the [Next.js Commerce](https://github.com/vercel/commerce) starter kit on {{ PRODUCT_NAME }}. Note that Next.js Commerce is currently under development and requires an account on the [BigCommerce](https://www.bigcommerce.com/) platform.

## Next.js Commerce Example

Here is an example of the [Next.js Commerce](https://nextjs.org/commerce) template running on {{ PRODUCT_NAME }}. It uses all of the latest Next.js 10 features
including image optimization, localization, and incremental static regeneration with stale-while-revalidate.

[Try the Next.js Commerce Example Site](https://layer0-docs-layer0-nextjs-commerce-default.layer0.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-nextjs-commerce-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-commerce-example)

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-next-connector?button)

## Getting Started

The easiest way to try Next.js Commerce on {{ PRODUCT_NAME }} is to clone and deploy the version from the {{ PRODUCT_NAME }} examples:

1. Register for a free account on the [{{ PRODUCT_NAME }} sign up page]({{ APP_URL }}/signup).

2. Clone the {{ PRODUCT_NAME }} nextjs-commerce example repository:

```bash

git clone git@github.com:layer0-docs/layer0-nextjs-commerce-example.git

```

3. Navigate to the `layer0-nextjs-commerce-example` example directory and ensure you are using the latest {{ PRODUCT_NAME }} version:

```bash
cd layer0-nextjs-commerce-example/
0 use latest

```

4. Install the required modules via `npm`:

```bash
npm install
```

5. Deploy to {{ PRODUCT_NAME }}:

```bash
{{ CLI_NAME }} deploy
```

{{ PRODUCT_NAME }} builds and deploys your site and displays status messages in your console. When deployment is finished, your console displays links to the deployment and website:

```bash
***** Deployment Complete *********************************************************
*                                                                                 *
*  Layer0 Developer Console:                                                      *
*  https://app.layer0.co/user/layer0-nextjs-commerce/env/default/builds/1         *
*                                                                                 *
*  Website:                                                                       *
*  https://user-layer0-nextjs-commerce-default.layer0-limelight.link              *
*                                                                                 *
***********************************************************************************
```

## Learn more

For more details on using Next.js on {{ PRODUCT_NAME }} refer to the [Next.js Guide](next).

## Deploying the official Next.js Commerce repository

If you wish to deploy to {{ PRODUCT_NAME }} from the official Next.js Commerce repository, follow these steps:

1. Register for a free account on the [{{ PRODUCT_NAME }} sign up page]({{ APP_URL }}/signup).

2. Install the {{ PRODUCT_NAME }} [CLI](cli) globally

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

3. Clone the official Next.js Commerce repository and install the dependencies via `yarn`:

```bash
git clone git@github.com:vercel/commerce.git
cd commerce
yarn install
```

4. Run {{ PRODUCT_NAME }} `init` in the project directory:

```
{{ CLI_NAME }} init
```

5. Update the top of your `next.config.js` file to wrap the module export with `withLayer0` and `withServiceWorker` like so:

```js
const { withLayer0, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = withLayer0(
  withServiceWorker(
    bundleAnalyzer({
      // ...rest of the next.config.js content
      // !! Don't forget to add two additional closing parenthesis in the line below !!
    }),
  ),
)
```

6. Remove this section from `package.json` which uses Webpack 5:

```json
  "resolutions": {
    "webpack": "5.11.1"
  },
```

7. Add the `encoding` package:

```bash
yarn add encoding
```

8. Create a file called `.env.local` in the project directory and add your BigCommerce API keys to it:

```
# Created by Vercel CLI
BIGCOMMERCE_STORE_API_CLIENT_ID="XXXXX"
BIGCOMMERCE_STORE_API_TOKEN="XXXX"
BIGCOMMERCE_STOREFRONT_API_TOKEN="XXX"
BIGCOMMERCE_CHANNEL_ID="XXX"
BIGCOMMERCE_STOREFRONT_API_URL="https://store-XXXX-XXXX.mybigcommerce.com/graphql"
BIGCOMMERCE_STORE_API_URL="https://api.bigcommerce.com/stores/XXXX"
```

An [example `.env.local` file](https://github.com/layer0-docs/layer0-nextjs-commerce-example/blob/master/.env.local) is in the the {{ PRODUCT_NAME }} examples repo.

1. Deploy to {{ PRODUCT_NAME }}:

```bash
{{ CLI_NAME }} deploy
```

This should result in output like the following which confirms the deployment:

```
***** Deployment Complete ***************************************************************
*                                                                                       *
*  🖥  {{ PRODUCT_NAME }} Developer Console:                                                            *
*  {{ APP_URL }}/ishan-scratch/nextjs-commerce/env/default/builds/1               *
*                                                                                       *
*  🌎 Website:                                                                          *
*  https://ishan-scratch-nextjs-commerce-default.moovweb-edge.io                        *
*                                                                                       *
*****************************************************************************************
```
