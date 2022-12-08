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

### config {/*config*/}

Sets configuration options for this property.

#### set-analytics {/*set-analytics-command*/}

| Command                                        | Description                                                                                                                      |
|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| <a id="disable-analytics"></a> `set-analytics` | Set this to `false` to prevent sending usage data. Optionally, you may set the environment variable `EDGIO_DISABLE_ANALYTICS=1`. |

#### Example {/*set-analytics-example*/}

```bash
{{ FULL_CLI_NAME }} config set-analytics false
```

#### set-backend {/*set-backend-command*/}
| Command                                          | Description                                                                       |
|---------------------------------------------------|------------------------------------------------------------------------------------|
| <a id="set-backend"></a> `set-backend <backend>` | Sets the `--domainOrIp, -d` and/or `--hostHeader, -h` to the existing `<backend>` |

<Callout type="important">

  This command must be called with `<backend>` already existing in the `{{ CONFIG_FILE }}` file. If `<backend>` does not exist, an error will be thrown.

</Callout>

#### Example {/*set-backend-example*/}

```bash
{{ FULL_CLI_NAME }} config set-backend origin -d docs.edg.io
```

### curl {/*curl*/}

Uses `curl` to make a request to the specified URL, highlighting Edgio-specific telemetry information. See [Response](/guides/performance/response) for more information around response headers and telemetry values.

#### Options {/*options*/}

| Name          | Description                                                                                                                                       |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `--json`      | Outputs the response variables in JSON format, including telemetry data, headers, cookies, and the body (if using `--show-body`) [default: false] |
| `--debug`     | Run in verbose mode. This has no effect when using with `--json` option.                                                                          |
| `--save-body` | Writes the response body to a temporary file path which is set in the output. This has no effect when using with `--json` option.                 |
| `--show-body` | Prints the response body in the output. [default: false]                                                                                          |
| `--help`      | View help information for options to the curl command.                                                                                            |

#### Example {/*example*/}

```bash
➜  ~ {{ FULL_CLI_NAME }} curl https://docs.edg.io

URL :  https://docs.edg.io/ 🔗
From:  127.0.0.1:57412 🖥️
To  :  208.69.180.12:443 🌎

HTTP/2 200
Response Headers
  accept-ranges: bytes
  age: 321609
  cache-control: private, no-store, no-cache
  content-length: 389815
  content-security-policy: default-src 'self'; style-src 'unsafe-inline' 'self' fonts.googleapis.com cdn.jsdelivr.net; font-src fonts.gstatic.com; img-src 'self' www.google-analytics.com analytics.twitter.com www.facebook.com px.ads.linkedin.com *.intercomcdn.com tr.lfeeder.com data: *.moovweb.net; frame-src www.youtube.com youtu.be player.vimeo.com; script-src 'unsafe-inline' 'self' 'unsafe-eval' *.clarity.ms *.google-analytics.com *.googletagmanager.com *.hotjar.com cdn.jsdelivr.net cdn.segment.com cdn4.mxpnl.com connect.facebook.net googletagmanager.com js.intercomcdn.com player.vimeo.com px4.ads.linkedin.com s.adroll.com sc.lfeeder.com snap.licdn.com widget.intercom.io www.google-analytics.com www.googletagmanager.com www.youtube.com; base-uri 'self'; frame-ancestors 'self'; media-src www.youtube.com; connect-src *.algolia.net *.algolianet.com *.clarity.ms *.edg.io *.github.io *.google-analytics.com *.googletagmanager.com *.intercom.io *.intercomassets.com *.intercomcdn.com *.layer0-limelight.link *.layer0-perma.link *.layer0.co *.layer0.link *.segment.com *.segment.io *.vimeo.com analytics.google.com googletagmanager.com vimeo.com
  content-type: text/html
  date: Thu, 24 Nov 2022 22:20:15 GMT
  etag: "efb94304e92947a7e4732c90b8a4d58f"
  last-modified: Thu, 24 Nov 2022 00:58:08 GMT
  server-timing: layer0-cache;desc="HIT-L1", edge_pop;desc=hef, country;desc=US, xrj;desc="%7B%22path%22%3A%22%2F%22%7D"
  set-cookie: layer0_bucket=3; SameSite=Lax; Path=/; Max-Age=2147483647; HttpOnly
  set-cookie: layer0_destination=default; SameSite=Strict; Path=/
  set-cookie: layer0_environment_id_info=1162d006-8a69-4f5b-b8a9-545d801291cd; SameSite=Strict; Path=/
  strict-transport-security: max-age=31536000; includeSubDomains; preload
  vary: accept-encoding, user-agent
  via: 1.1 varnish (Varnish/6.6), HTTP/1.1 Layer0
  x-0-cache-hash: bbd8d015dfd26d59408cef5c6d927011298f67e6b11ca4d5316d69482104e853
  x-0-caching-status: ok
  x-0-components: eh=1.0.9,c=5.0.3,e=hef,ec=1.9.8,gd=1.4.5,p=1.31.11,b=static
  x-0-status: eh=200,gd=200,p=200
  x-0-t: eh=3,ect=2,ecc=hit
  x-0-version: 2881 5.0.3 18 2022-11-24T00:58:26.355Z 1.7.3
  x-request-id: 9f3925df1594aa7872f3620725f123d9d4491327
  x-xss-protection: 1; mode=block

Edgio Version
  Build Number        2881
  Package Version     5.0.3

Edgio Telemetry
  Edge POP total time of                                 3ms (eh)
  Edge POP Varnish total time of                         2ms (ect)
  Edge POP caching status                                hit (ecc)

   DNS Lookup   TCP Connection   TLS Handshake   Server Processing   Content Transfer
[    327ms    |      27ms      |     43ms      |       52ms        |       95ms       ]
              |                |               |                   |                  |
    namelookup:327ms           |               |                   |                  |
                        connect:353ms          |                   |                  |
                                    pretransfer:396ms              |                  |
                                                      starttransfer:449ms             |
                                                                                  total:543ms

Response Body
  Disabled. To enable use EDGIO_CURL_SAVE_BODY=true or EDGIO_CURL_SHOW_BODY=true
```

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
