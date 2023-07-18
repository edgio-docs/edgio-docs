---
title: Lit
---

[Lit](https://lit.dev/) is a simple library for building fast, lightweight web components. This guide walks you through deploying Lit sites to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Lit"
  siteUrl="https://layer0-docs-layer0-lit-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-lit-example" 
  deployFromRepo
/>

## Create Your Lit Site {/*create-your-lit-site*/}

{{ PREREQ.md }}

Clone this starter example and install dependencies:

```bash
git clone https://github.com/layer0-docs/layer0-lit-example
yarn install
```

### Run the Lit App Locally on {{ Product }} {/*run-the-lit-app-locally-on*/}

Test your app with the {{ PRODUCT_PLATFORM }} in development mode on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

This will listen to any changes inside the folder src, with live reloads!

### Run the Lit App in Local Production on the {{ Product_platform }} {/*run-the-lit-app-in-local-production-on-the*/}

Create a production build using:
```bash
{{ CLI_NAME }} build
```

Test your app with the {{ PRODUCT_PLATFORM }} in production mode on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploy to the {{ Product_platform }} {/*deploy-to-the*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```
