---
title: Custom connector
---

Custom Connector lets you build {{ PRODUCT }} project for any framework that is not supported directly by {{ PRODUCT }}.


## Connector {/* connector */}

This connector is not built for a specific framework, it is used as a fallback for frameworks that are not directly supported by {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/custom-connector-connector">
  View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Using Custom Connector {/* using-custom-connector */}

To use Custom Connector with your {{ PRODUCT }} project, you'll need to install the connector package and initialize your project. You can do this by executing `{{ FULL_CLI_NAME }} init` command.

```bash
{{ FULL_CLI_NAME }} init
```

By default {{ PRODUCT }} will try to recognize the underlaying framework when you run `{{ FULL_CLI_NAME }} init` command but when it can't recognize the framework you'll be prompted to select between `Web app hosting` and `CDN-as-code` options:

```bash
WARNING: No framework detected. You can still use {{ PRODUCT }}, we just need more information about your project
? What kind of project do you want to set up? › - Use arrow-keys. Return to submit.
❯   {{ PRODUCT }} Sites (Web-app hosting)”
    {{ PRODUCT }} Performance (CDN-as-code)
```

Select `Web app hosting` and Custom Connector will be installed automatically and after that you will be prompted to enter Custom Connector configuration options:

```bash
✔ What is the build directory of your app? … dist
✔ What is the entry file of your app … index.js
✔ What is the envirovment variable name for port (if it is available)? … PORT
✔ Please specify build command if exists … custom_fw build
✔ Please specify dev command if exists … custom_fw dev
✔ Please specify dev ready message or timeout value in seconds to wait › 5
```

When initialization process is finished, {{ PRODUCT }} will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/custom-connector` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }} including the connector [configuration](#custom-connector-configuration).
- `routes.js` - A default routes file that sends all requests to the Astro. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/* routing */}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Astro server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const {Router} = require('{{ PACKAGE_NAME }}/core/router');
const {customRoutes} = require('{{ PACKAGE_NAME }}/custom-connector');

export default new Router().use(customRoutes);
```

## Running Locally {/* running-locally */}

To test your app locally, run:

```bash
{{ FULL_CLI_NAME }} run
```

You can do a production build of your app and test it locally using:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be when deployed to the {{ PRODUCT }} cloud.

## Deploy to {{ PRODUCT }} {/* deploy-to */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) for more information.

## Custom Connector Configuration {/* custom-connector-configuration */}

Once you initialize your project with `{{ FULL_CLI_NAME }} init` command, {{ PRODUCT }} will create a `{{ CONFIG_FILE }}` file in your project's root directory. In the `{{ CONFIG_FILE }}` file you can configure your Custom Connector.

```json
{
  // rest of the config

  "customConnector": {
    "buildFollder" : "dist",
    "entryFile": "index.js",
    "envPort": "PORT",
    "buildCommand": "custom_fw build",
    "devCommand": "custom_fw dev",
    "devReadyMessageOrTimeout": 5,
  }
}
```

In the `customConnector` object you can configure the following options:

- `buildFolder` - The build folder of your app. Default value is `dist`.
- `entryFile` - The entry file of your app. Default value is `index.js`.
- `envPort` - The environment variable name for port (if it is available). Default value is `PORT`. Note: many frameworks use `PORT` as the default environment variable name for port. {{ PRODUCT }} will pass the port value to your app via the environment variable specified here
- `buildCommand` - The build command of your app. Default value is empty string. Build command is used when you run `{{ FULL_CLI_NAME }} build` command.
- `devCommand` - The dev command of your app. Default value is empty string. Dev command is used when you run `{{ FULL_CLI_NAME }} dev` command.
- `devReadyMessageOrTimeout` - The dev ready message or timeout value in seconds to wait. Default value is `0`.