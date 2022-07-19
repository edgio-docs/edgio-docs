---
title: Scully
---

[Scully](https://scully.io/) is a static site generator for Angular projects. This guide walks you through deploying a Scully site to the {{ PRODUCT }} platform.

## Example {/*example*/}

<ExampleButtons
  title="Scully"
  siteUrl="https://layer0-docs-layer0-scully-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-scully-example" 
  deployFromRepo
/>

## Create your Scully site {/*create-your-scully-site*/}

#{{ INSTALL_CLI }}

Clone this starter example and install dependencies:

```bash
git clone https://github.com/layer0-docs/layer0-scully-example
yarn install
```

### Run the Scully app locally on {{ PRODUCT }} {/*run-the-scully-app-locally-on-appops*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

This will listen to any changes inside the folder src, with live reloads!

### Run the Scully app in local production on the {{ PRODUCT_PLATFORM }} {/*run-the-scully-app-in-production-locally-on-the-app-platform*/}

Create a production build using:
```bash
{{ CLI_NAME }} build
```

Run {{ PRODUCT_PLATFORM }} on your local machine:

```bash
{{ CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```
