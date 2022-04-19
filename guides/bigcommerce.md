# BigCommerce

This guide shows you how to deploy a [BigCommerce](https://www.bigcommerce.com/) backed application on {{ PRODUCT_NAME }}.

## What is BigCommerce?

BigCommerce is an API driven ecommerce platform. Used by some of the biggest brands on the planet, BigCommerce provides solutions for B2B, wholesale, omnichannel, offline to online, international and multi-storefront. They provide deep integrations to social media platforms and have a robust partner network of technology and integration partners.

## Example

This example is a Next.js app powered by a BigCommerce backend.

[Try the Example Site](https://layer0-docs-layer0-nextjs-commerce-default.layer0-limelight.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-nextjs-commerce-example/?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-nextjs-example)

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
```

{{ SYSTEM_REQUIREMENTS }}

## Setting up a BigCommerce Headless Example

We will go through how to set-up your BigCommerce Storefront and the configuration it requires. There are two paths we can take here to generate a project to start:

1. Use our existing example
2. Generate a [Next.js Commerce](https://nextjs.org/commerce) project from scratch

If you go with option 1, continue to the Storefront setup section.

### Generate a Next.js Commerce Project

1. Clone the official Next.js Commerce [repository](https://github.com/vercel/commerce) and install the dependencies.

   ```bash
   git clone git@github.com:vercel/commerce.git
   cd commerce
   yarn
   cd site
   ```

2. Run {{ PRODUCT_NAME }} `init` in the project directory:

   ```
   {{ CLI_NAME }} init
   ```

### Update the Example or Generated Project for use with BigCommerce

Skip to the [Storefront Setup][#storefront_setup] section for a detailed explanation on how to setup a BigCommerce site. After that, return to this section to enter values as needed.

1. Duplicate `.env.template` and name it `.env.local` in the project directory. Add your BigCommerce API keys to it. See Storefront setup for how to set these items up.

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
   BIGCOMMERCE_STORE_API_CLIENT_SECRET=${CLIENT_SECRET}
   ```

   - STORE_HASH - Available in the URL bar of your BigCommerce site.
   - CHANNEL_ID - Available in the `Channel Manager > Channel / Advanced Settings > Channel Details`
   - STOREFRONT_API_TOKEN - The token result from the API call to create a token. This should be a long token.
   - STORE_TOKEN - The API token generated via the BigCommerce API KEY UI. This should be a short token.
   - STORE_CLIENT - The Client ID generated via the BigCommerce API KEY UI.
   - STORE_SECRET - The Client Secret generated via the BigCommerce API KEY UI.

   Note: The `BIGCOMMERCE_STORE_API_URL` should not have the version at the end. The API KEY UI will show it this way, but do not include it in your environment variable.

2. Run the project.

   From root of the project

   ```
   npm run dev
   ```

### Deploy the project

From within the `site` directory, run

```
0 deploy
```

## BigCommerce Storefront Setup

1. [Login](https://login.bigcommerce.com/login) or [Signup](https://www.bigcommerce.com/start-your-trial) for an account with BigCommerce.

   **Login**
   ![](/images/bigcommerce/login.png?width=300)

   **Signup**
   ![](/images/bigcommerce/sign-up.png?width=1000)

2. After you have logged in or signed up, we need to generate an API key in order to continue creating the necessary elements to work with BigCommerce.

   1. Visit `Advanced Settings > API Accounts` and click "Create API Account > Create V2/V3 API Token".

      ![](/images/bigcommerce/create-api-menu.png?width=1000)

   1. Give the token a name and enable all scopes for now.

      ![](/images/bigcommerce/create-api-key.png?width=400)

   1. Make note of the "API path" and save this somewhere, as we will need this later. It has a pattern of `https://api.bigcommerce.com/stores/{STORE_HASH}/v3/`.
   1. Click "Save".
   1. A dialog will appear with the generated API keys. Copy each item for later use. The credentials also get downloaded as a text file.

      ![](/images/bigcommerce/api-creds.png?width=400)

3. Now that we have API credentials, we will be able to interact with the BigCommerce API in order to finish setting up necessary elements.

   **NOTE** As of the time of writing this guide, they only support setup via API.

   For this next step you will need the store hash (available in the URL bar) and the API token you just created.

   1. To create a channel we need to issue a `curl` request to the BigCommerce API. Open the API [doc](https://developer.bigcommerce.com/api-reference/b3A6MzU5MDQ0NDc-create-a-channel) for additional information. Use the `curl` below, substituting values where needed.

      ```
      curl --request POST \
          --url https://api.bigcommerce.com/stores/{STORE_HASH}/v3/channels \
          --header 'Content-Type: application/json' \
          --header 'X-Auth-Token: {API_ACCESS_TOKEN}' \
          --data '{
            "name": "Layer0",
            "platform": "custom",
            "type": "storefront",
            "status": "connected",
            "config_meta": {}
          }'
      ```

   2. Visit the `Channel Manager` to view your newly created Channel. Click the triple dot menu and select "Advanced settings". Make note of the Channel ID for later use in generating a GraphQL API token.

      ![](/images/bigcommerce/advanced-settings-menu.png?width=1000)

   3. Click "Create Route" and create routes to match the below routes.

      ![](/images/bigcommerce/routes.png?width=600)

4. With a channel and routes created, the last item to use the BigCommerce API for is generating an Auth token for use with the GraphQL API. You will have to revisit this once you have deployed your application for the first time to add the allowed domain. Open the API [doc](https://developer.bigcommerce.com/api-reference/b3A6MzU5MDUxNTI-create-a-token#requestrunner) for additional information.

   ```
   curl --request POST \
      --url https://api.bigcommerce.com/stores/{STORE_HASH}/v3/storefront/api-token \
      --header 'Content-Type: application/json' \
      --header 'X-Auth-Token: {API_ACCESS_TOKEN}' \
      --data '{
      "channel_id": {CHANNEL_ID},
      "expires_at": 1620766652, // change this to a time in the future. To generate in Javascript: new Date("2022-12-31").getTime()
      "allowed_cors_origins":
        ["https://www.yourstorefront.com"]
    }'
   ```

   Save the token response for use in your environment variables.
