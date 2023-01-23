---
title: Gatsby
---

This guide shows you how to deploy an [Gatsby](https://www.gatsbyjs.com/) application to {{ PRODUCT }}.

<Video src="https://www.youtube.com/watch?v=ici9j6oF_5E" />

## Example {/*example*/}

<ExampleButtons
  title="Gatsby SSG"
  siteUrl="https://layer0-docs-layer0-gatsby-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-gatsby-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-gatsby-connector">
  View the Connector Code
</ButtonLink>

{{ PREREQ }}

## Getting Started {/*getting-started*/}

If you don't already have a Gatsby application, you can create one using:

```bash
npm install -g gatsby-cli
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

You should now have a working Gatsby site. Run `gatsby develop` to see the application running on `localhost:8000`.

Configure your project for {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/gatsby` package
- The `{{ PACKAGE_NAME }}/cli` package
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to your Gatsby static site. Update this file to add caching or proxy some URLs to a different origin.

## Running Locally {/*running-locally*/}

You can test the integration of the {{ PRODUCT_PLATFORM }} router with your gatsby site locally using:

```bash
{{ FULL_CLI_NAME }} dev
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) guide for more information.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to the Gatsby static site.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { gatsbyRoutes } = require('{{ PACKAGE_NAME }}/gatsby')

module.exports = new Router().use(gatsbyRoutes)
```

### Adding routes to a different origin {/*adding-routes-to-a-different-origin*/}

To proxy some URLs to a different origin, you need first to configure that origin in your `{{ CONFIG_FILE }}` file.

For example:

```js ins={4-9}
// {{ CONFIG_FILE }}

module.exports = {
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'legacy.my-site.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'legacy.my-site.com',
    },
  },
}
```

Using environment variables here allows you to configure different legacy domains for each {{ PRODUCT }} environment.

Then you can add routing and caching rules to your `routes.js` file. Note that gatsbyRoute must be declared last as it acts as a fallback route.

For example:

```js ins={10-12}
// routes.js

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { gatsbyRoutes } = require('{{ PACKAGE_NAME }}/gatsby')

module.exports = new Router()
  .get('/some/legacy/url/:p', ({ proxy }) => {
    proxy('legacy')
  })
  .use(gatsbyRoutes)
```

Check [CDN-as-code](/guides/performance/cdn_as_code) and [Caching](/guides/performance/caching) guides for more information.
