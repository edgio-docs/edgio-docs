# 1-Click Deploy to {{ PRODUCT_NAME }}

This guide walks you through various 1-click deploy examples ready for {{ PRODUCT_NAME }} and how you can setup your site to deploy to {{ PRODUCT_NAME }} with a simple click.

## What is 1-Click Deploy?

1-Click Deploy is a workflow which allows you to take one of our existing example sites, clone it to your own GitHub repository, and deploy to your personal Layer0 account.

To deploy to Layer0 using this method, you will need to have an existing GitHub account.

## Layer0 Examples

Below are a list of example site you can deploy right now using our 1-click deploy feature:

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

## Deploying Your Template Repo to Layer0

#### Add `deploy` script to `package.json`

```json
// additional scripts may need to be called based on your app build process
"deploy": "layer0 deploy",
```

#### Create `layer0.yml` workflow

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
