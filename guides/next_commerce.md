# Next.js Commerce

This guide shows you how to deploy the [Next.js Commerce](https://github.com/vercel/commerce) starter kit on {{ PRODUCT_NAME }}. Note that Next.js Commerce repo is actively under development. This repo requires an account on the [BigCommerce](https://www.bigcommerce.com/) platform. BigCommerce has a generous free trial which can be used.

## Next.js Commerce Example

Here is an example of the [Next.js Commerce](https://nextjs.org/commerce) template running on {{ PRODUCT_NAME }}. It uses all of the latest Next.js 10 features including image optimization, localization, and incremental static regeneration with stale-while-revalidate.

[Try the Next.js Commerce Example Site](https://layer0-docs-layer0-nextjs-commerce-default.layer0.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-nextjs-commerce-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-commerce-example)

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
```

{{ SYSTEM_REQUIREMENTS }}

## Deploy the Example

Quickly launch an example with no code by clicking the "Deploy to Layer0" button.

[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-commerce-example)

## Deploying the official Next.js Commerce repository

If you wish to deploy to {{ PRODUCT_NAME }} from the official Next.js Commerce repository, follow these steps:

1. Clone the official Next.js Commerce repository and install the dependencies.

   ```bash
   git clone git@github.com:vercel/commerce.git
   cd commerce
   yarn
   ```

2. Run {{ PRODUCT_NAME }} `init` in the project directory:

   ```
   cd site
   {{ CLI_NAME }} init
   ```

3. Duplicate `.env.template` and name it `.env.local` in the project directory. Add your BigCommerce API keys to it.

   For more details on how to set up your BigCommerce store, view the [BigCommerce guide](/guides/bigcommerce).

   ```
   COMMERCE_PROVIDER=@vercel/commerce-bigcommerce
   BIGCOMMERCE_STOREFRONT_API_URL=https://store-${STORE_HASH}-${CHANNEL_ID}.mybigcommerce.com/graphql
   BIGCOMMERCE_STOREFRONT_API_TOKEN=${STOREFRONT_API_TOKEN}
   BIGCOMMERCE_STORE_API_URL=https://api.bigcommerce.com/stores/${STORE_HASH}
   BIGCOMMERCE_STORE_API_TOKEN=${STORE_TOKEN}
   BIGCOMMERCE_STORE_API_CLIENT_ID=${STORE_CLIENT}
   BIGCOMMERCE_CHANNEL_ID=${CHANNEL_ID}
   BIGCOMMERCE_STORE_URL=https://store-${STORE_HASH}.mybigcommerce.com
   BIGCOMMERCE_STORE_API_STORE_HASH=${STORE_HASH}
   ```

   - `STORE_HASH`: You can retrieve it from your BigCommerce store control panel URL in the format of `https://store-${STORE_HASH}.mybigcommerce.com/manage/dashboard`
   - `STORE_TOKEN|STORE_CLIENT`: For instructions on generating Store API credentials, visit [Obtaining Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials)
   - `STOREFRONT_API_TOKEN`: For instructions on generating the Storefront API token, visit [Create a Token](https://developer.bigcommerce.com/api-reference/store-management/tokens/api-token/createtoken).
   - `CHANNEL_ID`: Visit [Building Channels](https://developer.bigcommerce.com/docs/ZG9jOjE5NjMyODU-building-channels-quick-start) to learn how to create a channel for use in your application.

4. Deploy to {{ PRODUCT_NAME }}.

   From project root

   ```bash
   npm run deploy
   ```

   Or from within `site` directory

   ```bash
   {{ CLI_NAME }} deploy
   ```

## Learn more

For more details on using Next.js on {{ PRODUCT_NAME }} refer to the [Next.js guide](next).

For more details on how to set up your BigCommerce store, view the [BigCommerce guide](/guides/bigcommerce).

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-next-connector?button)
