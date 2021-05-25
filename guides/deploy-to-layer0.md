# Deploy to {{ PRODUCT_NAME }} Button

This guide walks you through various deploy button examples and how you can setup a GitHub repository for your users to deploy to {{PRODUCT_NAME}} with a simple click.

## What is the Deploy to {{ PRODUCT_NAME }} Button?

The Deploy to {{PRODUCT_NAME}} button lets users easily clone and deploy an example project to {{ PRODUCT_NAME}}. Under the hood the platform will clone the example to the user's GitHub account and leverage GitHub Actions to deploy to it to their personal {{PRODUCT_NAME}} account.

To deploy using this method, users need to have an existing GitHub account.

## {{PRODUCT_NAME}} Examples

Below are a list of example site you can deploy right now using our deploy buttons:

[Angular SSR Example](https://layer0-docs-layer0-angular-example-default.layer0.link/category/hats?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-angular-example&button)

[Ember Fastboot Example](https://layer0-docs-layer0-ember-fastboot-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-ember-fastboot-example&button)

[Frontity Example](https://layer0-docs-layer0-frontity-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-frontity-example&button)

[Next.js SSR Example](https://layer0-docs-layer0-next-example-default.layer0.link/category/hats?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-example&button)

[Next.js Commerce Example](https://layer0-docs-layer0-nextjs-commerce-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-commerce-example&button)

[Nuxt.js SSR Example](https://layer0-docs-layer0-nuxt-example-default.layer0.link/category/hats?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nuxt-example&button)

[Nx Example](https://layer0-docs-layer0-nx-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nx-example&button)

[Razzle Example](https://layer0-docs-layer0-razzle-example-default.moovweb-edge.io?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-razzle-example&button)

[Sapper SSR Example](https://layer0-docs-layer0-sapper-example-default.layer0.link/category/hats?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-sapper-example&button)

[Spartacus Example](https://layer0-docs-layer0-spartacus-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-spartacus-example&button)

[Vue Storefront Example](https://layer0-docs-layer0-vue-storefront-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-vue-storefront-example&button)

[Backbone.js Static Example](https://layer0-docs-layer0-static-backbonejs-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Fstatic-backbonejs-example&button)

[React Static Example](https://layer0-docs-layer0-static-react-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Fstatic-react-example&button)

[Vue.js Static Example](https://layer0-docs-layer0-static-vuejs-example-default.layer0.link/?button) &#8594; [Deploy to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Fstatic-vuejs-example&button)

## Creating your own deploy button

To configure your own project to be deploy button ready, there's a few steps to take.

1. First, your project needs to already be configured and initialized with {{PRODUCT_NAME}}. See our [Getting Started](getting_started) guide for initial setup.
2. Next, create a basic `deploy` script as described below. Typically, this can simply be `layer0 deploy`, but if your site requires additional processing outside of the standard {{PRODUCT_NAME}} build/deploy process, you will need to modify this script to include the necessary steps to make your site production-ready.
3. Create a GitHub workflow as described below. This makes sure GitHub Actions is properly configured to build the project.

#### Add `deploy` script to `package.json`

```json
// additional scripts may need to be called based on your app build process
"deploy": "layer0 deploy",
```

Lastly, create a GitHub workflow file called `layer0.yml`. This will be triggered automatically by {{PRODUCT_NAME}} during the deploy process.

#### Create `.github/workflows/layer0.yml` workflow

```yml
name: Deploy to Layer0

on:
  workflow_dispatch:

jobs:
  deploy-to-layer0:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://npm-proxy.fury.io/moovweb/
      - run: npm ci
      - run: npm run deploy -- --token=$LAYER0_DEPLOY_TOKEN
        env:
          LAYER0_DEPLOY_TOKEN: ${{secrets.LAYER0_DEPLOY_TOKEN}}
```

`secrets.LAYER0_DEPLOY_TOKEN` is automatically injected into your cloned repository during the deploy process. Do not change the name of this variable or the deploy process will fail.

Once everything is setup, you can test your deploy button by appending your GitHub repository full URL to `https://app.layer0.co/deploy?repo=`.

For example, using our Next.js example located at `https://github.com/layer0-docs/layer0-nextjs-example` would become `https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-example`

Now, you can embed this link to let users instantly clone and deploy the project to {{PRODUCT_NAME}}!
