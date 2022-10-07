---
title: Scully
---

[Scully](https://scully.io/) is a static site generator for Angular projects. This guide walks you through deploying a Scully site to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Scully"
  siteUrl="https://layer0-docs-layer0-scully-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-scully-example" 
  deployFromRepo
/>

{{ PREREQ }}

## Create your Scully site {/*create-your-scully-site*/}

Clone this starter example and install dependencies:

```bash
git clone https://github.com/layer0-docs/layer0-scully-example
yarn install
```

### Run the Scully app locally on {{ PRODUCT }} {/*run-the-scully-app-locally-on-edgio*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

This will listen to any changes inside the folder src, with live reloads!

### Run the Scully app in local production on the {{ PRODUCT_PLATFORM }} {/*run-the-scully-app-in-production-locally-on-the-app-platform*/}

Create a production build using:
```bash
{{ FULL_CLI_NAME }} build
```

Run {{ PRODUCT_PLATFORM }} on your local machine:

```bash
{{ FULL_CLI_NAME }} run --production
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```