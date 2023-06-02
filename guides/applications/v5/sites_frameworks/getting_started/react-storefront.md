---
title: React Storefront
---

[React Storefront](https://docs.reactstorefront.io) helps developers build sub-second e-commerce progressive web apps in record time. This guide shows you how to deploy a React Storefront application to {{ PRODUCT }}.

{{ SIGN_UP }}

## Creating a React Storefront App {/*creating-a-react-storefront-app*/}

To create a new React Storefront app, run:

```bash
npm create react-storefront@^8.0.0 myapp
```

Select "Yes" when answering the following question:

```bash
? Will you be deploying your app on {{ PRODUCT }}? › no / yes
```

## Running Locally {/*running-locally*/}

To run your app locally:

```bash
npm start
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

## Prefetching {/*prefetching*/}

See the [Prefetching Guide](https://docs.reactstorefront.io/guides/performance/prefetching) in the React Storefront documentation.
