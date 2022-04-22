---
title: Next.js Commerce
---

This guide shows you how to deploy the [Next.js Commerce](https://github.com/vercel/commerce) starter kit on {{ PRODUCT_NAME }}. Note that Next.js Commerce repo is actively under development. This repo requires an account on the [BigCommerce](https://www.bigcommerce.com/) platform. BigCommerce has a generous free trial which can be used.

## Next.js Commerce Example {/*nextjs-commerce-example*/}

Here is an example of the [Next.js Commerce](https://nextjs.org/commerce) template running on {{ PRODUCT_NAME }}. It uses all of the latest Next.js 10 features including image optimization, localization, and incremental static regeneration with stale-while-revalidate.

<ButtonLinksGroup>
  <ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-nextjs-commerce-default.layer0.link">
    Try the Next.js Commerce Example Site
  </ButtonLink>
  <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-nextjs-commerce-example">
   View the Code
  </ButtonLink>
  <ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-commerce-example">
    Deploy to Layer0
  </ButtonLink>
</ButtonLinksGroup>

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI {/*install-the-{{PRODUCT_NAME_LOWER}}-cli*/} {/*install-the--product_name--cli-install-the-product_name_lower-cli*/}

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
# or
yarn global add {{ PACKAGE_NAME }}/cli
```

{{ SYSTEM_REQUIREMENTS }}

## Deploy the Example {/*deploy-the-example*/}

Quickly launch an example with no code by clicking the "Deploy to Layer0" button.

<ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-commerce-example">
  Deploy to Layer0
</ButtonLink>

## Deploying the official Next.js Commerce repository {/*deploying-the-official-nextjs-commerce-repository*/}

If you wish to deploy to {{ PRODUCT_NAME }} from the official Next.js Commerce repository, follow these steps:

1. Clone the official Next.js Commerce repository and install the dependencies.
  <br/>

   ```bash
   git clone git@github.com:vercel/commerce.git
   cd commerce
   yarn
   ```

2. Run {{ PRODUCT_NAME }} `init` in the project directory:
    <br/>

   ```bash
   cd site
   {{ CLI_NAME }} init
   ```

3. Duplicate `.env.template` and name it `.env.local` in the project directory. Add your BigCommerce API keys to it.
  <br/>

   <Callout type="info">
   For more details on how to set up your BigCommerce store, view the <a href="/guides/bigcommerce">BigCommerce guide</a>
   </Callout>

  <br/>

   ```bash
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

  <br/>

   - `STORE_HASH`: You can retrieve it from your BigCommerce store control panel URL in the format of `https://store-${STORE_HASH}.mybigcommerce.com/manage/dashboard`
   - `STORE_TOKEN|STORE_CLIENT`: For instructions on generating Store API credentials, visit [Obtaining Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials)
   - `STOREFRONT_API_TOKEN`: For instructions on generating the Storefront API token, visit [Create a Token](https://developer.bigcommerce.com/api-reference/store-management/tokens/api-token/createtoken).
   - `CHANNEL_ID`: Visit [Building Channels](https://developer.bigcommerce.com/docs/ZG9jOjE5NjMyODU-building-channels-quick-start) to learn how to create a channel for use in your application.

4. Deploy to {{ PRODUCT_NAME }}.

   From project root

  <br/>

   ```bash
   npm run deploy
   ```

  <br/>

   Or from within `site` directory

  <br/>

   ```bash
   {{ CLI_NAME }} deploy
   ```

---

## Learn more {/*learn-more*/}

<Callout type="info">
For more details on using Next.js on {{ PRODUCT_NAME }} refer to the <a href="/guides/next">Next.js guide</a>.
</Callout>

<Callout type="info">
For more details on how to set up your BigCommerce store, view the <a href="/guides/bigcommerce">BigCommerce guide</a>.
</Callout>

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-next-connector">
  View the Connector Code
</ButtonLink>