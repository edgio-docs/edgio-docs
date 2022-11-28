---
title: CLI
---

This guide shows you everything you can do with the {{ PRODUCT_NAME }} command line interface.

## Installation {/*installation*/}

To install, or upgrade to the latest, {{ PRODUCT_NAME }} CLI run

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

Or with yarn

```bash
yarn global add {{ PACKAGE_NAME }}/cli
```

## Upgrade Project to Latest Version {/*upgrade-project-to-latest-version*/}

If you already have a project running on {{ PRODUCT_NAME }} and you want to update packages to the most recent release of `{{ PACKAGE_NAME }}`, simply run:

```bash
{{ FULL_CLI_NAME }} use latest
```

Before deploying your site, verify that all functionality, including request/response data, is as expected.

## Commands {/*commands*/}

### build {/*build*/}

Creates a build of your app optimized for production.

#### Options {/*options*/}

| Name                         | Description                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--skip-framework`           | Alias: "-s". Skips the framework (Next.js, Vue, Angular, etc..) build and simply rebundles your router                                                                                                                                                                                                                                   |
| `--disable-permanent-assets` | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                   |
| `--include-sources`          | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/guides/basics/edgio_config#sources) configuration in {{ CONFIG_FILE }}. |

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} build
```

### cache-clear {/*cache-clear*/}

Clears the cache. If neither `--path` nor `--surrogate-key` is specified, the entire cache for the
specified environment will be cleared.

#### Options {/*options*/}

| Name              | Description                                                              |
|-------------------|--------------------------------------------------------------------------|
| `--team`          | (Required) The team name                                                 |
| `--site`          | (Required) The site name                                                 |
| `--environment`   | (Required) The environment name                                          |
| `--path`          | A path to clear. Use "\*" as a wildcard                                  |
| `--surrogate-key` | Clears all responses assigned to the specified surrogate key (cache tag) |

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} cache-clear --team=my-team --site=my-site --environment=production --path=/p/*
```

### completion {/*completion*/}

Creates a script that provides autocompletion for {{ PRODUCT_NAME }} CLI commands that can be installed in your shell.

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} completion
```

#### Using ZSH {/*using-zsh*/}

```bash
{{ FULL_CLI_NAME }} completion >> ~/.zshrc
```

#### Using BASH {/*using-bash*/}

```bash
{{ FULL_CLI_NAME }} completion >> ~/.bashrc
```

### curl {/*curl*/}

Uses `curl` to make a request to the specified URL, highlighting Edgio-specific telemetry information. See [Response](/guides/performance/response) for more information around response headers and telemetry values.

#### Options {/*options*/}

| Name          | Description                                                                                                                                      |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `--json`      | Return JSON format only                                                                                                                          |
| `--debug`     | Run in verbose mode. This has no effect when using with `--json` option.                                                                         |
| `--save-body` | Whether to save the response body. This will output tmp file path where the body was stored. This has no effect when using with `--json` option. |
| `--show-body` | Whether to output body in response.                                                                                                              |
| `--help`      | Shows additional (less common) options.                                                                                                          |

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} curl https://docs.edg.io
```

![{{ FULL_CLI_NAME }} curl example](/images/cli/curl.png)

### deploy {/*deploy*/}

Builds and deploys your site on {{ PRODUCT_NAME }}.

#### Parameters {/*parameters*/}

| Name   | Description                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `team` | The name of the team under which the site will be deployed. The site will be deployed to your private space will be used if omitted. |

#### Options {/*options*/}

| Name                         | Description                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--site`                     | The name of the site to deploy. By default the `name` field in `package.json` is used.                                                                                                                                                                                                                                                   |
| `--environment`              | The environment to deploy to. By default the `default` environment is used.                                                                                                                                                                                                                                                              |
| `--branch`                   | The name of the source control branch. This is automatically set when using Git.                                                                                                                                                                                                                                                         |
| `--skip-build`               | Skips the build step                                                                                                                                                                                                                                                                                                                     |
| `--token`                    | Authenticates using a deploy token rather than your user credentials. Use this option when deploying from CI. Alternatively, you can also specify the deploy token by setting the `EDGIO_DEPLOY_TOKEN` environment variable.                                                                                                            |
| `--commit-url`               | The URL at which the commit can be viewed in your source control provided. If your package.json provides the repository attribute the commit URL will be derived automatically if you use GitHub, GitLab, or BitBucket.                                                                                                                  |
| `--include-sources`          | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/guides/basics/edgio_config#sources) configuration in {{ CONFIG_FILE }}. |
| `--disable-permanent-assets` | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                   |

#### Getting Information about the Deployment {/*getting-information-about-the-deployment*/}

The `deploy` command writes a file called `.edgio/deployment-manifest.json`, which contains the following information:

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

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} deploy my-team --environment=production
```

### docs {/*docs*/}

Open the {{ PRODUCT_NAME }} documentation in your browser.

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} docs
```

### dev {/*dev*/}

Runs your project in development mode, simulating the {{ PRODUCT_NAME }} cloud environment. This command is a simplified version of `{{ FULL_CLI_NAME }} run`, with only the --cache option being supported.

#### Options {/*options*/}

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| `--cache` | Enables caching during local development so that you can test the caching logic in your router. |

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} dev
```

### init {/*init*/}

Run in an existing app to add all required packages and files need to publish your app on {{ PRODUCT_NAME }}

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} init
```

#### Options {/*options*/}

| Name          | Description                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--connector` | The name of a specific connector package to install, or a path to a directory that implements the [connector interface](/guides/sites_frameworks/connectors#implementing-a-connector-directly-within-your-project). |

### login {/*login*/}

Logs into {{ PRODUCT_NAME }} via the developer console.

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} login
```

### logout {/*logout*/}

Logs out of {{ PRODUCT_NAME }}

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} logout
```

### run {/*run*/}

Runs your app locally. Uses port 3000 by default. You can change this by setting the `PORT` environment variable. For example: `PORT=5000 {{ FULL_CLI_NAME }} run`.

#### Options {/*options*/}

| Name           | Description                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--production` | Runs a production build of your app, simulating the cloud environment. This can also be achieved by setting the NODE_ENV environment variable to `true`. You need to run `{{ FULL_CLI_NAME }} build` first.                          |
| `--cache`      | Enables caching during local development so that you can test the caching logic in your router. By default caching is turned off in local development to ensure you don't see stale responses as you make changes to your code. |

#### Example {/*example*/}

```bash
{{ FULL_CLI_NAME }} run --production
```

Or to run a deployment bundle downloaded from {{ PRODUCT_NAME }} Developer Console, use:

```bash
{{ FULL_CLI_NAME }} run /path/to/bundle.zip
```

Production mode is always used when running downloaded bundles.

### use {/*use*/}

Switches the version of all {{ PACKAGE_NAME }}/\* packages in your project.

#### Example {/*example*/}

To install a particular version:

```bash
{{ FULL_CLI_NAME }} use 4.10.1
```

To install the latest stable:

```bash
{{ FULL_CLI_NAME }} use latest
```

To install the latest preview:

```bash
{{ FULL_CLI_NAME }} use next
```

## Troubleshooting {/*troubleshooting*/}

---

### Error: Cannot find module ... on `{{ FULL_CLI_NAME }} init` {/*error-cannot-find-module-on-init*/}

An uncommon issue when running `{{ FULL_CLI_NAME }} init` can present a similar error:

> installing {{ PACKAGE_NAME }}/core, {{ PACKAGE_NAME }}/cli, {{ PACKAGE_NAME }}/prefetch, {{ PACKAGE_NAME }}/devtools, {{ PACKAGE_NAME }}/angular… done.
> Error: Cannot find module ‘/Users/myUser/Projects/my-{{ PACKAGE_NAME }}-poc/node_modules/{{ PACKAGE_NAME }}/angular/bin/init’

This may be related to an outdated global version of {{ PRODUCT_NAME }} CLI. The telltale sign is reference to `/bin/` in the module path. This is an old convention. Recommended approach would be to `npm i -g {{ PACKAGE_NAME }}/cli@latest` and then run `{{ FULL_CLI_NAME }} init` on the project.
