# Next.js Commerce

This guide shows you how to deploy the [Next.js Commerce](https://github.com/vercel/commerce) starter kit on the Moovweb XDN. Note that Next.js Commerce is currently under development and requires an account on the [BigCommerce](https://www.bigcommerce.com/) platform.

## Next.js Commerce Example

Here is an example of the [Next.js Commerce](https://nextjs.org/commerce) template running on the XDN. It uses all of the latest Next.js 10 features
including image optimization, localization, and incremental static regeneration with stale-while-revalidate.

[Try the Next.js Commerce Example Site](https://moovweb-docs-nextjs-commerce-default.moovweb-edge.io/?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/nextjs-commerce?button)

## Getting Started

The easiest way to try Next.js Commerce on the XDN is to clone and deploy the version from the XDN examples:

1. Register for a free account on the [XDN sign up page](https://moovweb.app/signup).

2. Clone the XDN examples repository:

```bash
git clone git@github.com:moovweb-docs/xdn-examples.git
```

3. Navigate to the `nextjs-commerce` example directory and install the required modules via `yarn`:

```bash
cd xdn-examples/nextjs-commerce/
yarn install
```

4. Deploy to the XDN:

```bash
npm run xdn:deploy
```

## Learn more

For more details on using Next.js on the XDN refer to the [Next.js Guide](next).


## Deploying the official Next.js Commerce repository

If you wish to deploy to the XDN from the official Next.js Commerce repository, follow these steps:

1. Register for a free account on the [XDN sign up page](https://moovweb.app/signup).

2. Install the XDN [CLI](cli) globally

```bash
npm i -g @xdn/cli
```

3. Clone the official Next.js Commerce repository and install the dependencies via `yarn`:

```bash
git clone git@github.com:vercel/commerce.git
cd commerce
yarn install
```

4. Run XDN `init` in the project directory:

```
xdn init
```

5. Update the top of your `next.config.js` file to wrap the module export with `withXDN` and `withServiceWorker` like so:

```js
const { withXDN, withServiceWorker } = require('@xdn/next/config')

module.exports =  withXDN(withServiceWorker(bundleAnalyzer({

  // ...rest of the next.config.js content


  // !! Don't forget to add two additional closing parenthesis in the line below !!
})))
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

An [example `.env.local` file](https://github.com/moovweb-docs/xdn-examples/blob/main/nextjs-commerce/.env.local) is in the the XDN examples repo.

9. Deploy to the XDN:

```bash
xdn deploy
```

This should result in output like the following which confirms the deployment:

```
***** Deployment Complete ***************************************************************
*                                                                                       *
*  🖥  XDN Developer Console:                                                            *
*  https://moovweb.app/ishan-scratch/nextjs-commerce/env/default/builds/1               *
*                                                                                       *
*  🌎 Website:                                                                          *
*  https://ishan-scratch-nextjs-commerce-default.moovweb-edge.io                        *
*                                                                                       *
*****************************************************************************************
```



