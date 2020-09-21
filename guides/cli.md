# CLI

This guide shows you everything you can do with the XDN command line interface.

## Installation

To install the XDN CLI run

```bash
npm i -g @xdn/cli
```

Or with yarn:

```bash
yarn global add @xdn/cli
```

# Commands

## build

Creates a build of your app optimized for production

#### Options

| Name           | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| `--skip-build` | Skips the framework (Next.js, Vue, Angular, etc..) build and simply rebundles your router |

#### Example

```bash
xdn build
```

## cache-clear

Clears the cache. If neither `--path` nor `--surrogate-key` is specified, the entire cache for the
specified environment will be cleared.

#### Options

| Name              | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `--team`          | (Required) The team name                                      |
| `--site`          | (Required) The site name.                                     |
| `--environment`   | (Required) The environment name.                              |
| `--path`          | A path to clear. Use "\*" as a wildcard.                      |
| `--surrogate-key` | Clears all responses assigned to the specified surrogate key. |

#### Example

```bash
xdn cache-clear --team=my-team --site=my-site --environment=production --path=/p/*
```

## completion

Creates a script that provides autocompletion for xdn cli commands that can be installed in your shell.

#### Example

```bash
xdn completion
```

###### Using ZSH

```bash
xdn completion >> ~/.zshrc
```

###### Using BASH

```bash
xdn completion >> ~/.bashrc
```

## deploy

Builds and deploys your site on the Moovweb XDN.

#### Parameters

| Name   | Description                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `team` | The name of the team under which the site will be deployed. The site will be deployed to your private space will be used if omitted. |

#### Options

| Name            | Description                                                                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--site`        | The name of the site to deploy. By default the `name` field in `package.json` is used.                                                                                                                                  |
| `--environment` | The environment to deploy to. By default the `default` environment is used.                                                                                                                                             |
| `--branch`      | The name of the source control branch. This is automatically set when using Git.                                                                                                                                        |
| `--skip-build`  | Skips the build step                                                                                                                                                                                                    |
| `--token`       | Authenticates using a deploy token rather than your user credentials. Use this option when deploying from CI.                                                                                                           |
| `--commit-url`  | The URL at which the commit can be viewed in your source control provided. If your package.json provides the repository attribute the commit URL will be derived automatically if you use GitHub, GitLab, or BitBucket. |

#### Example

```bash
xdn deploy my-team --environment=production
```

## docs

Open the XDN documentation in your browser.

#### Example

```bash
xdn docs
```

## init

Run in an existing app to add all required packages and files need to publish your app on the Moovweb XDN

#### Example

```bash
xdn init
```

## login

Logs into the XDN via the developer console.

#### Example

```bash
xdn login
```

## logout

Logs out of the XDN

#### Example

```bash
xdn logout
```

## run

Runs your app locally. Uses port 3000 by default. You can change this by setting the `PORT` environment variable. For example: `PORT=5000 xdn run`.

#### Options

| Name           | Description                                                                                                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--production` | Runs your app using serverless-offline to more closely simulate the cloud environment. This is equivalend to setting NODE_ENV environment variable to `true`. You need to run `xdn build` first.                                   |
| `--cache`      | Enables caching during local development. By default caching is turned off in local development to ensure you don't see stale responses as you make changes to your code. Enable caching to test the caching logic in your router. |

#### Example

```bash
xdn run --production
```

## use

Switches the version of all @xdn/\* packages in your project.

#### Example

To install a particular version:

```bash
xdn use 1.45.0
```

To install the latest stable:

```bash
xdn use latest
```

To install the latest preview:

```bash
xdn use next
```
