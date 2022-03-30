# CLI

This guide shows you everything you can do with the {{ PRODUCT_NAME }} command line interface.

## Installation

To install, or upgrade to the latest, {{ PRODUCT_NAME }} CLI run

```bash
npm i -g {{ PACKAGE_NAME }}/cli@latest
```

Or with yarn

```bash
yarn global add {{ PACKAGE_NAME }}/cli@latest
```

## Upgrade Project to Latest Version

If you already have a project running on {{ PRODUCT_NAME }} and you want to update packages to the most recent release of `{{ PACKAGE_NAME }}`, simply run:

```bash
{{ CLI_NAME }} use latest
```

Before deploying your site, verify that all functionality, including request/response data, is as expected.

## Commands

### build

Creates a build of your app optimized for production.

#### Options

| Name                         | Description                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--skip-framework`           | Alias: "-s". Skips the framework (Next.js, Vue, Angular, etc..) build and simply rebundles your router                                                                                                                                                                                                                                   |
| `--disable-permanent-assets` | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                   |
| `--include-sources`          | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/guides/{{ PRODUCT_NAME_LOWER }}\_config#section_sources) config in {{ CONFIG_FILE }}. |

#### Example

```bash
{{ CLI_NAME }} build
```

### cache-clear

Clears the cache. If neither `--path` nor `--surrogate-key` is specified, the entire cache for the
specified environment will be cleared.

#### Options

| Name              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `--team`          | (Required) The team name                                     |
| `--site`          | (Required) The site name                                     |
| `--environment`   | (Required) The environment name                              |
| `--path`          | A path to clear. Use "\*" as a wildcard                      |
| `--surrogate-key` | Clears all responses assigned to the specified surrogate key |

#### Example

```bash
{{ CLI_NAME }} cache-clear --team=my-team --site=my-site --environment=production --path=/p/*
```

### completion

Creates a script that provides autocompletion for {{ PRODUCT_NAME }} CLI commands that can be installed in your shell.

#### Example

```bash
{{ CLI_NAME }} completion
```

#### Using ZSH

```bash
{{ CLI_NAME }} completion >> ~/.zshrc
```

#### Using BASH

```bash
{{ CLI_NAME }} completion >> ~/.bashrc
```

### deploy

Builds and deploys your site on {{ PRODUCT_NAME }}.

#### Parameters

| Name   | Description                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `team` | The name of the team under which the site will be deployed. The site will be deployed to your private space will be used if omitted. |

#### Options

| Name                         | Description                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--site`                     | The name of the site to deploy. By default the `name` field in `package.json` is used.                                                                                                                                                                                                                                                   |
| `--environment`              | The environment to deploy to. By default the `default` environment is used.                                                                                                                                                                                                                                                              |
| `--branch`                   | The name of the source control branch. This is automatically set when using Git.                                                                                                                                                                                                                                                         |
| `--skip-build`               | Skips the build step                                                                                                                                                                                                                                                                                                                     |
| `--token`                    | Authenticates using a deploy token rather than your user credentials. Use this option when deploying from CI. Alternatively, you can also specify the deploy token by setting the `LAYER0_DEPLOY_TOKEN` environment variable.                                                                                                            |
| `--commit-url`               | The URL at which the commit can be viewed in your source control provided. If your package.json provides the repository attribute the commit URL will be derived automatically if you use GitHub, GitLab, or BitBucket.                                                                                                                  |
| `--include-sources`          | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/guides/{{ PRODUCT_NAME_LOWER }}\_config#section_sources) config in {{ CONFIG_FILE }}. |
| `--disable-permanent-assets` | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                   |

#### Getting Information about the Deployment

The `layer0 deploy` command writes a file called `.layer0/deployment-manifest.json`, which contains the following information:

```js
{
  "number": /* the deployment number */,
  "url": /* the permalink URL for the deployment */,
  "environment": {
    "url": /* The edge URL for the deployment */,
    "name": /* The name of the environment that was deployed to */
  }
}
```

#### Example

```bash
{{ CLI_NAME }} deploy my-team --environment=production
```

### docs

Open the {{ PRODUCT_NAME }} documentation in your browser.

#### Example

```bash
{{ CLI_NAME }} docs
```

### dev

Runs your project in development mode, simulating the {{ PRODUCT_NAME }} cloud environment. This command is a simplified version of `{{ CLI_NAME }} run`, with only the --cache option being supported.

#### Options

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| `--cache` | Enables caching during local development so that you can test the caching logic in your router. |

#### Example

```bash
{{ CLI_NAME }} dev
```

### init

Run in an existing app to add all required packages and files need to publish your app on {{ PRODUCT_NAME }}

#### Example

```bash
{{ CLI_NAME }} init
```

#### Options

| Name          | Description                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--connector` | The name of a specific connector package to install, or a path to a directory that implements the [connector interface](/guides/connectors#section_implementing_a_connector_directly_within_your_project). |

### login

Logs into {{ PRODUCT_NAME }} via the developer console.

#### Example

```bash
{{ CLI_NAME }} login
```

### logout

Logs out of {{ PRODUCT_NAME }}

#### Example

```bash
{{ CLI_NAME }} logout
```

### run

Runs your app locally. Uses port 3000 by default. You can change this by setting the `PORT` environment variable. For example: `PORT=5000 {{ CLI_NAME }} run`.

#### Options

| Name           | Description                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--production` | Runs a production build of your app, simulating the cloud environment. This can also be achieved by setting the NODE_ENV environment variable to `true`. You need to run `{{ CLI_NAME }} build` first.                          |
| `--cache`      | Enables caching during local development so that you can test the caching logic in your router. By default caching is turned off in local development to ensure you don't see stale responses as you make changes to your code. |

#### Example

```bash
{{ CLI_NAME }} run --production
```

Or to run a deployment bundle downloaded from {{ PRODUCT_NAME }} Developer Console, use:

```bash
{{ CLI_NAME }} run /path/to/bundle.zip
```

Production mode is always used when running downloaded bundles.

### use

Switches the version of all {{ PACKAGE_NAME }}/\* packages in your project.

#### Example

To install a particular version:

```bash
{{ CLI_NAME }} use 4.10.1
```

To install the latest stable:

```bash
{{ CLI_NAME }} use latest
```

To install the latest preview:

```bash
{{ CLI_NAME }} use next
```

## Troubleshooting

---

### Error: Cannot find module ... on `{{ CLI_NAME }} init`

An uncommon issue when running `{{ CLI_NAME }} init` can present a similar error:

> installing {{ PACKAGE_NAME }}/core, {{ PACKAGE_NAME }}/cli, {{ PACKAGE_NAME }}/prefetch, {{ PACKAGE_NAME }}/devtools, {{ PACKAGE_NAME }}/angular… done.
> Error: Cannot find module ‘/Users/myUser/Projects/my-{{ PACKAGE_NAME }}-poc/node_modules/{{ PACKAGE_NAME }}/angular/bin/init’

This may be related to an outdated global version of {{ PRODUCT_NAME }} CLI. The telltale sign is reference to `/bin/` in the module path. This is an old convention. Recommended approach would be to `npm i -g {{ PACKAGE_NAME }}/cli@latest` and then run `{{ CLI_NAME }} init` on the project.
