# CLI

This guide shows you everything you can do with the XDN command line interface.

## Installation

To install the XDN CLI run

```
npm i -g @xdn/cli
```

Or with yarn:

```
yarn global add @xdn/cli
```

# Commands

## init

Run in an existing app to add all required packages and files need to publish your app on the Moovweb XDN

#### Example

```
xdn init
```

## run

Runs your app locally. Uses port 3000 by default. You can change this by setting the `port` environment variable. For example: `port=5000 xdn run`.

#### Options

| Name           | Description                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--production` | Runs your app using serverless-offline to more closely simulate the cloud environment. This is equivalend to setting NODE_ENV environment variable to `true`. You need to run `xdn build` first. |

#### Example

```
xdn run --production
```

## build

Creates a build of your app optimized for production

#### Options

| Name            | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `--skip-build`  | Skips the framework (Next.js, Vue, Angular, etc..) build and simply rebundles your router                     |

#### Example

```
xdn build
```

## deploy

Builds and deploys your site on the Moovweb XDN.

#### Parameters

| Name   | Description                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `team` | The name of the team under which the site will be deployed. The site will be deployed to your private space will be used if omitted. |

#### Options

| Name            | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `--site`        | The name of the site to deploy. By default the `name` field in `package.json` is used.                        |
| `--environment` | The environment to deploy to. By default the `default` environment is used.                                   |
| `--branch`      | The name of the source control branch. This is automatically set when using Git.                              |
| `--skip-build`  | Skips the build step                                                                                          |
| `--token`       | Authenticates using a deploy token rather than your user credentials. Use this option when deploying from CI. |

#### Example

```
xdn deploy my-team --environment=production
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

```
xdn cache-clear --team=my-team --site=my-site --environment=production --path=/p/*
```

## login

Logs into the XDN via the developer console.

#### Example

```
xdn login
```

## logout

Logs out of the XDN

#### Example

```
xdn logout
```
