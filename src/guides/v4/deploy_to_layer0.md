---
title: Deploy to {{ PRODUCT_NAME }} Button
---

The Deploy to {{PRODUCT_NAME}} button lets users easily clone and deploy an example project to {{ PRODUCT_NAME}}. Under the hood the platform will clone the example to the user's GitHub account and leverage GitHub Actions to deploy to it to their personal {{PRODUCT_NAME}} account.

This guide walks you through some deploy button examples and how you can set up a GitHub repository for your users to deploy to {{PRODUCT_NAME}} with a simple click.

## Example {/*example*/}

[![Deploy with {{ PRODUCT_NAME }}](/button.svg)](https://app.layer0.co/deploy?repo=https://github.com/layer0-docs/layer0-nextjs-example)

An example Deploy Button using the following HTML snippet.

## Snippets {/*snippets*/}

Use the snippets below in your Git repository to enable users to deploy the repository directly to {{ PRODUCT }}.

```markdown
[![Deploy with {{ PRODUCT }}](https://docs.layer0.co/button.svg)](https://app.layer0.co/deploy?repo=https://github.com/layer0-docs/layer0-nextjs-example)
```

## Creating Your Own Deploy Button {/*creating-your-own-deploy-button*/}

To configure your own project to be deploy button ready, there's a few steps to take.

1. First, your project needs to already be configured and initialized with {{PRODUCT_NAME}}. See our [Getting Started](build_web_apps) guide for initial setup.
2. Next, create a basic `deploy` script as described below. Typically, this can simply be `layer0 deploy`, but if your site requires additional processing outside of the standard {{PRODUCT_NAME}} build/deploy process, you will need to modify this script to include the necessary steps to make your site production-ready.
3. Create a GitHub workflow as described below. This makes sure GitHub Actions is properly configured to build the project.

#### Add `deploy` Script to `package.json` {/*add-deploy-script-to-packagejson*/}

```json
// additional scripts may need to be called based on your app build process
"deploy": "layer0 deploy",
```

Lastly, create a GitHub workflow file called `layer0.yml`. This will be triggered automatically by {{PRODUCT_NAME}} during the deploy process.

#### Create `.github/workflows/layer0.yml` Workflow {/*create-githubworkflowslayer0yml-workflow*/}

```yml
name: Deploy to {{ PRODUCT }}

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
