---
title: Nuxt3
---

This guide shows you how to deploy a [Nuxt3](https://v3.nuxtjs.org) application on {{ PRODUCT_NAME }}.

Note: Nuxt3 is still in beta and is not recommended for production.

## Example {/*example*/}

<ExampleButtons
  title="Nuxt3"
  siteUrl="https://layer0-docs-layer0-nuxt3-example-2-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-nuxt3-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-nuxt3-connector">
  View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

## Prerequisites {/*prerequisites*/}

1. Install the [{{ PRODUCT_NAME }} CLI](cli).
2. Sign up for a [Layer0 account](https://app.layer0.co/signup).

## Getting Started {/*getting-started*/}

Follow the instructions to create a new Nuxt3 application, run it in a local dev server, and deploy to Layer0.

#### 1. Create a new Nuxt3 application {/*1-create-a-new-nuxt3-application*/}

To create a new Nuxt3 application, run:

```bash
npx nuxi init <app-name>
```

Note: Learn more about [npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner) and [Creating a new Nuxt3 project](https://v3.nuxtjs.org/getting-started/installation#new-project).

After the installation is complete, change directory to the new project:

```bash
cd <app-name> // Change to the directory of your new application
```

Then install dependencies with the command:

```bash
npm install # yarn install
```

#### 2. Add Layer0 to the Nuxt3 application {/*2-add-layer0-to-the-nuxt3-application*/}

To add Layer0 to the Nuxt3 application, run:

```bash
{{ CLI_NAME }} init
```

#### 3. Run the Nuxt3 app locally with Layer0 {/*3-run-the-nuxt3-app-locally-with-layer0*/}

To run the Nuxt3 app locally with Layer0, run:

```bash
{{ CLI_NAME }} dev
```

Vist [http://localhost:3001](http://localhost:3001) to view the application.

#### 4. Run the Nuxt3 app in local production mode with Layer0 {/*4-run-the-nuxt3-app-locally-with-layer0*/}

To run the Nuxt3 app in local production mode with Layer0, run:

```bash
{{ CLI_NAME }} build && {{ CLI_NAME }} run --production
```

#### 5. Deploy the Nuxt3 app to Layer0 {/*5-deploy-the-nuxt3-app-to-layer0*/}

Note: Add or update the `name` field in the `package.json` file.

To deploy the Nuxt3 app to Layer0, run:

```bash
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

### Resources {/*resources*/}
1. [Routing with EdgeJS](https://docs.layer0.co/guides/routing)
2. [Prefetching with EdgeJS](https://docs.layer0.co/guides/prefetching)

## Troubleshoot {/*troubleshoot*/}

#### Error: Variable siteSlug of type String! was provided invalid value {/*error-variable-siteslug-of-type-string-was-provided-invalid-value*/}

This error throws on deployment with `0 deploy`. To fix this:
- Add/Update the `name` field in the `package.json` file, OR
- Deploy with the name flag, via, `0 deploy --name=site-slug`

#### tsconfig.json:3:13: warning: Cannot find base config file "./.nuxt/tsconfig.json" {/*tsconfigjson313-warning-cannot-find-base-config-file-nuxttsconfigjson*/}

This is a resolved Nuxt3 error. More on [this GitHub Issue](https://github.com/nuxt/framework/issues/1912).
