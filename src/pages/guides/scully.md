---
title: Scully
---

[Scully](https://scully.io/) is a static site generator for Angular projects. This guide walks you through deploying Scully sites to {{ PRODUCT_NAME }}.

## Example {/*example*/}

<ExampleButtons
  title="Scully"
  siteUrl="https://layer0-docs-layer0-scully-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-scully-example" 
  deployFromRepo
/>

## Create your Scully site {/*create-your-scully-site*/}

### Install the {{ PRODUCT_NAME }} CLI globally {/*install-the-layer0-cli-globally*/}

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
```

Clone this starter example and install dependencies:

```bash
git clone https://github.com/layer0-docs/layer0-scully-example
yarn install
```

### Run the Scully app locally on {{ PRODUCT_NAME }} {/*run-the-scully-app-locally-on-layer0*/}

Run {{ PRODUCT_NAME }} with Scully on dev server by:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

This will listen to any changes inside the folder src, with live reloads!

### Run the Scully app in local production on {{ PRODUCT_NAME }} {/*run-the-scully-app-in-production-locally-on-layer0*/}

Create a production build using:
```bash
{{ CLI_NAME }} build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
{{ CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploy to Layer0 {/*deploy-to-layer0*/}

To deploy your site to Layer0, run:

```bash
0 deploy
```
