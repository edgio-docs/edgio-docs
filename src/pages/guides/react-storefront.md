---
title: React Storefront
---

[React Storefront](https://docs.reactstorefront.io) helps developers build sub-second e-commerce progressive web apps in record time. This guide shows you how to deploy a React Storefront app on {{ PRODUCT_NAME }}.

## Creating a React Storefront App

To create a new React Storefront app, run:

```bash
npm create react-storefront@^8.0.0 myapp
```

Select "Yes" when answering the following question:

```bash
? Will you be deploying your app on {{ PRODUCT_NAME }}? › no / yes
```

## Running Locally

To run your app locally:

```bash
npm start
```

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project:

```bash
{{ CLI_NAME }} deploy
```

## Prefetching

See the [Prefetching Guide](https://docs.reactstorefront.io/guides/prefetching) in the React Storefront documentation.
