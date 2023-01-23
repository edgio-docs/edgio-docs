---
title: RedwoodJS
---

This guide shows you how to deploy a [RedwoodJS](https://redwoodjs.com/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="RedwoodJS"
  siteUrl="https://layer0-docs-layer0-redwoodjs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-redwoodjs-example" 
  deployFromRepo />

## Connector {/*connector*/}

{{ PREREQ }}

## Getting Started {/*getting-started*/}

If you don't already have a RedwoodJS app, use the terminal (or command prompt on Windows) to create one using the commands below:

```cli
yarn create redwood-app ./my-redwood-app
```

To prepare your RedwoodJS app for deployment on {{ PRODUCT }}, you can use both the RedwoodJS or {{ PRODUCT }} CLI depending on what you prefer.

### Using RedwoodJS CLI {/*using-redwoodjs-cli*/}

You will first need to setup {{ PRODUCT }} as a deploy provider via:

```bash
yarn rw setup deploy {{ FULL_CLI_NAME }}
```

This will verify that the {{ PRODUCT }} CLI is setup on your system and initialize the application accordingly.

### Using the {{ PRODUCT }} CLI {/*using-the-cli*/}

For preparing using the {{ PRODUCT }} CLI, run:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/redwoodjs` package - Provides router middleware that automatically adds RedwoodJS routes to the {{ PRODUCT }} router.
- `routes.js` - A default routes file that sends all requests to RedwoodJS. Update this file to add caching or proxy some URLs to a different origin.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT }}.

## Running Locally {/*running-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

### Simulate edge caching locally {/*simulate-edge-caching-locally*/}

To simulate edge caching locally, run:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

## Deploying {/*deploying*/}

You can deploy using the RedwoodJS CLI using:

```bash
yarn rw deploy {{ FULL_CLI_NAME }}
```

You can also deploy using the {{ PRODUCT }} CLI with:

```bash
{{ FULL_CLI_NAME }} deploy
```

The deploy command for RedwoodJS takes the same deploy arguments as using {{ PRODUCT }} to deploy. You can see all the available options using `yarn rw deploy {{ FULL_CLI_NAME }} --help`

See [Deployments](/guides/basics/deployments) for more information.
