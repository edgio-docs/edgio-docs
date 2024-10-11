---
title: CLI
---

{{ ROUTEHELPER.md }}

This guide shows you everything you can do with the {{ PRODUCT_NAME }} command line interface.

<Callout type="info">

By default, {{ PRODUCT }} CLI v5.1.0+ collects usage and error reporting information to help improve our products. However, it omits personally identifiable information. [Learn how to opt-out](#disable-analytics).

</Callout>

## Installation {/* installation */}

To install, or upgrade to the latest, {{ PRODUCT_NAME }} CLI run

```bash
npm i -g {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }}
```

Or with yarn

```bash
yarn global add {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }}
```

## Upgrade Project to Latest Version {/* upgrade-project-to-latest-version */}

If you already have a project running on {{ PRODUCT_NAME }} and you want to update packages to the most recent release of `{{ PACKAGE_NAME }}`, simply run:

```bash
{{ FULL_CLI_NAME }} use {{ PACKAGE_VERSION}}
```

Before deploying your property, verify that all functionality, including request/response data, is as expected.

## Commands {/* commands */}

### build {/* build */}

Creates a build of your app optimized for production.

#### Options {/* options */}

| Name                       | Description                                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--skipFramework, -s`      | Skips the framework (Next.js, Vue, Angular, etc..) build and simply rebundles your router                                                                                                                                                                                                                                      |
| `--disablePermanentAssets` | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                      |
| `--includeSources`         | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/applications/performance/cdn_as_code/edgio_config#sources) configuration in {{ CONFIG_FILE }}. |

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} build
```

### cache-clear {/* cache-clear */}

Clears the cache. If neither `--path` nor `--surrogate-key` is specified, the entire cache for the
specified environment will be cleared.

#### Options {/* options */}

| Name                  | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `--team`              | <ul><li>**{{PRODUCT }} CLI version 7.2.2 or later:** Deprecated. Use `--organization` instead. </li><li>**{{PRODUCT }} CLI version 7.2.1 or earlier:** (Required) The organization name</li></ul>         |
| `--organization`      | **{{PRODUCT }} CLI version 7.2.2 or later:** (Required) The organization name |
| `--property`          | (Required) The property name                                                   |
| `--environment`       | (Required) The environment name                                                |
| `--path, -p`          | A path to clear. Use "\*" as a wildcard                                        |
| `--surrogate-key, -s` | Clears all responses assigned to the specified surrogate key (cache tag)       |

#### Example {/* example */}

<SnippetGroup>

    ```bash tabLabel="{{ PRODUCT }} CLI Version 7.2.2 or later"
    {{ FULL_CLI_NAME }} cache-clear --organization=my-organization --property=my-property --environment=production --path=/p/*
    ```

    ```bash tabLabel="Version 7.2.1 or earlier"
    {{ FULL_CLI_NAME }} cache-clear --team=my-organization --property=my-property --environment=production --path=/p/*
    ```

</SnippetGroup>

### completion {/* completion */}

Creates a script that provides autocompletion for {{ PRODUCT_NAME }} CLI commands that can be installed in your shell.

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} completion
```

#### Using ZSH {/* using-zsh */}

```bash
{{ FULL_CLI_NAME }} completion >> ~/.zshrc
```

#### Using BASH {/* using-bash */}

```bash
{{ FULL_CLI_NAME }} completion >> ~/.bashrc
```

### config {/* config */}

Sets configuration options for this property.

#### set-analytics {/* set-analytics-command */}

| Command                                        | Description                                                                                                                      |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <a id="disable-analytics"></a> `set-analytics` | Set this to `false` to prevent sending usage data. Optionally, you may set the environment variable `EDGIO_DISABLE_ANALYTICS=1`. |

#### Example {/* set-analytics-example */}

```bash
{{ FULL_CLI_NAME }} config set-analytics false
```

#### set-backend {/* set-backend-command */}

| Command                                          | Description                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| <a id="set-backend"></a> `set-backend <backend>` | Sets the `--domainOrIp, -d` and/or `--hostHeader, -h` to the existing `<backend>` |

<Callout type="important">

This command must be called with `<backend>` already existing in the `{{ CONFIG_FILE }}` file. If `<backend>` does not exist, an error will be thrown.

</Callout>

#### Example {/* set-backend-example */}

```bash
{{ FULL_CLI_NAME }} config set-backend origin -d docs.edg.io
```

### curl {/* curl */}

Uses `curl` to make a request to the specified URL, highlighting Edgio-specific telemetry information. See [Response](/applications/performance/response) for more information around response headers and telemetry values.

#### Options {/* options */}

| Name                         | Description                                                                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--json`                     | Outputs the response variables in JSON format, including telemetry data, headers, cookies, and the body (if using `--show-body`). Defaults to `false` |
| `--debug`                    | Run in verbose mode. This has no effect when using with `--json` option.                                                                              |
| `--save-body`                | Writes the response body to a temporary file path which is set in the output. This has no effect when using with `--json` option.                     |
| `--show-body`                | Prints the response body in the output. Defaults to `false`.                                                                                          |
| `--max-body-length`          | Maximum body length that will be returned. Defaults to 1024.                                                                                          |
| `--curl-bin-path`            | Allows overriding path to curl bin. This is only required when curl is not in $PATH or you need to run different versions of curl.                    |
| `--highlight-headers, --hlh` | This will highlight matching headers. This has no effect when using with `--json` option. Defaults to `["x-0-","cache-control"]`.                     |

#### Example {/* example */}

```bash
➜  ~ {{ FULL_CLI_NAME }} curl https://docs.edg.io

URL :  https://docs.edg.io/ 🔗
From:  127.0.0.1:53857 🖥️
To  :  64.12.0.86:443 🌎

HTTP/2 200
Response Headers
  accept-ranges: bytes
  age: 3933
  cache-control: private, no-cache, no-store, must-revalidate
  content-length: 230488
  content-security-policy: default-src 'self'; style-src 'unsafe-inline' 'self' fonts.googleapis.com cdn.jsdelivr.net; font-src fonts.gstatic.com; img-src 'self' www.google-analytics.com www.google.com analytics.twitter.com www.facebook.com px.ads.linkedin.com *.intercomcdn.com tr.lfeeder.com data: *.moovweb.net edgeio.whitecdn.com; frame-src www.youtube.com youtu.be player.vimeo.com; script-src 'unsafe-inline' 'self' 'unsafe-eval' *.clarity.ms *.google-analytics.com *.googletagmanager.com *.hotjar.com cdn.jsdelivr.net cdn.segment.com cdn4.mxpnl.com connect.facebook.net googletagmanager.com js.intercomcdn.com player.vimeo.com px4.ads.linkedin.com s.adroll.com sc.lfeeder.com snap.licdn.com widget.intercom.io www.google-analytics.com www.googletagmanager.com www.youtube.com; base-uri 'self'; frame-ancestors 'self'; media-src www.youtube.com; connect-src *.algolia.net *.algolianet.com *.clarity.ms *.doubleclick.net *.ecdns.net *.edg.io *.edgio-perma.link *.edgio.link *.github.io *.google-analytics.com *.googletagmanager.com *.intercom.io *.intercomassets.com *.intercomcdn.com *.layer0.co *.segment.com *.segment.io *.vimeo.com analytics.google.com googletagmanager.com vimeo.com
  content-type: text/html
  date: Thu, 27 Jul 2023 14:45:10 GMT
  etag: "6057eecb93e2cfa6f6e09ba988ed960f"
  last-modified: Thu, 27 Jul 2023 13:13:11 GMT
  server: ECAcc (dcd/7D26)
  server-timing: edgio_cache;desc=TCP_HIT,edgio_pop;desc=dcd,edgio_country;desc=US
  strict-transport-security: max-age=31536000; includeSubDomains; preload
  x-amz-id-2: O1cEPkkwP2jmKwLm+iAShlEH5Fx8bdGKB1fdqmiBgYFNihPNlYusXJMiPooPyEvQyFvhjBoS/LI=
  x-amz-meta-contentmd5: YFfuy5Piz6b24JupiO2WDw==
  x-amz-request-id: VP26DEYJF5M5Y2E2
  x-amz-server-side-encryption: AES256
  x-cache: HIT
  x-ec-cache: TCP_HIT from ECAcc (dcd/7D26)
  x-ec-cache-key: //http/801C2D83/edgio_static/110/edgio-community-docs-edg-io-main-110/next_prerendered_pages/index.html:/hs-1649885743736125473.html
  x-ec-cache-state: max-age=31536000 (1y); cache-ts=1690465177 (Thu, 27 Jul 2023 13:39:37 GMT); cache-age=3933 (1h 5m 33s); remaining-ttl=31532067 (364d 22h 54m 27s); expires-delta=none
  x-ec-check-cacheable: YES
  x-edg-mr: 19:0;19:2;19:3;19:13;
  x-edg-version: 110 19 12 7.0.23 2023-07-27T13:12:34Z bc3550f5-75c6-4f25-9b49-a407d6a11b15
  x-sw-cache-control: max-age=3600
  x-xss-protection: 1; mode=block


   DNS Lookup   TCP Connection   TLS Handshake   Server Processing   Content Transfer
[    294ms    |      27ms      |     95ms      |       28ms        |       56ms       ]
              |                |               |                   |                  |
    namelookup:294ms           |               |                   |                  |
                        connect:322ms          |                   |                  |
                                    pretransfer:417ms              |                  |
                                                      starttransfer:445ms             |
                                                                                  total:501ms

Response Body
  Disabled. To enable use EDGIO_CURL_SAVE_BODY=true or EDGIO_CURL_SHOW_BODY=true
```

### deploy {/* deploy */}

Builds and deploys your property on {{ PRODUCT_NAME }}.

#### Parameters {/* parameters */}

| Name   | Description                                                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `team` | The name of the organization under which the property will be deployed. The property will be deployed to your private space will be used if omitted. |

#### Options {/* options */}

| Name                       | Description                                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--team, -t`               | <ul><li>**{{PRODUCT }} CLI version 7.2.2 or later:** Deprecated. Use `--organization` instead. </li><li>**{{PRODUCT }} CLI version 7.2.1 or earlier:** The name of the organization under which the property will be deployed. If omitted, the `team` config in `{{ CONFIG_FILE }}` will be used, or deployed to your private space if omitted. </li></ul>                                                                                                                                                            |
| `--organization`           | **{{PRODUCT }} CLI version 7.2.2 or later:** The name of the organization under which the property will be deployed. If omitted, the `team` config in `{{ CONFIG_FILE }}` will be used, or deployed to your private space if omitted.     |
| `--property`               | The name of the property to deploy. By default the `name` field in `{{ CONFIG_FILE }}` or `package.json` is used.                                                                                                                                                                                                                           |
| `--environment, -e`        | The environment to deploy to. By default the `default` environment is used.                                                                                                                                                                                                                                                                 |
| `--branch, -b`             | The name of the source control branch. This is automatically set when using Git.                                                                                                                                                                                                                                                            |
| `--skipFramework, --sf`    | Skips running the framework build and uses the previous build instead.                                                                                                                                                                                                                                                                      |
| `--skipBuild`              | Skips running the `{{ CLI_CMD(build) }}` command, including the framework build, and uses the previous build instead.                                                                                                                                                                                                                       |
| `--token`                  | Authenticates using a deploy token rather than your user credentials. Use this option when deploying from CI. Alternatively, you can also specify the deploy token by setting the `EDGIO_DEPLOY_TOKEN` environment variable.                                                                                                                |
| `--includeSources`         | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/applications/performance/cdn_as_code/edgio_config#sources) configuration in {{ CONFIG_FILE }}. |
| `--disablePermanentAssets` | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                      |

#### Getting Information about the Deployment {/* getting-information-about-the-deployment */}

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

#### Example {/* example */}

```bash
{{ CLI_CMD(deploy) }} my-organization --environment=production
```

### dev {/* dev */}

Runs your project in development mode, simulating the {{ PRODUCT_NAME }} cloud environment. This command is a simplified version of `{{ FULL_CLI_NAME }} run`, with only the --cache option being supported.

#### Options {/* options */}

| Name          | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `--cache, -c` | Enables caching during local development so that you can test the caching logic in your router. |

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} dev
```

### docs {/* docs */}

Open the {{ PRODUCT_NAME }} documentation in your browser.

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} docs
```

### env {/* env */}

Manage deployed property's environments and environment variables.

#### Parameters {/* parameters */}

| Name                      | Description                                                                       |
| ------------------------- | --------------------------------------------------------------------------------- |
| `pull <path-to-env-file>` | Copy non-secret environment variables from an environment to a local `.env` file. |

#### Options {/* options */}

| Name                | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| `--team, -t`               | <ul><li>**{{PRODUCT }} CLI version 7.2.2 or later:** Deprecated. Use `--organization` instead. </li><li>**{{PRODUCT }} CLI version 7.2.1 or earlier:** The name of the organization under which the property belongs. Uses private space if omitted.</li></ul>                                                                                                                                                            |
| `--organization`           | **{{PRODUCT }} CLI version 7.2.2 or later:** The name of the organization under which the property belongs. Uses private space if omitted.     |
| `--property`        | The property to pull variables from. Uses package.json name property if omitted.      |
| `--environment, -e` | Environment to pull variables from. Uses default environment if omitted.              |
| `--path`            | Path to your site's root directory. Uses current directory by default.                |

#### Example {/* example */}

<SnippetGroup>

    ```bash tabLabel="{{ PRODUCT }} CLI Version 7.2.2 or later"
    {{ FULL_CLI_NAME }} env pull .env.local --organization my-organization --property my-property --environment production
    ```

    ```bash tabLabel="Version 7.2.1 or earlier"
    {{ FULL_CLI_NAME }} env pull .env.local --team my-organization --property my-property --environment production
    ```

</SnippetGroup>

### init {/* init */}

Run this command from the root directory of your web application or website to add all packages and files required to deploy your app on {{ PRODUCT_NAME }}.

<Callout type="tip">

If you are not using the latest version of {{ PRODUCT }}, then you must specify the `{{ INIT_ARG_EDGIO_VERSION }}` option when running this command.

</Callout>

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} init
```

#### Options {/* options */}

| Name                              | Description                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--{{PRODUCT_NAME_LOWER}}Version` | The version of {{ PRODUCT_NAME }} to install. Defaults to `latest`.                                                                                                                                                                                                                                                                               |
| `--skip{{PRODUCT_NAME}}Deps`      | Skips installing {{ PRODUCT_NAME }} packages.                                                                                                                                                                                                                                                                                                     |
| `--connector`                     | The name of a specific connector package to install, or a path to a directory that implements the [connector interface](/applications/sites_frameworks/connectors#implementing-a-connector-directly-within-your-project).                                                                                                                         |
| `--name`                          | The name of the property. Defaults to the `name` field in `package.json`.                                                                                                                                                                                                                                                                         |
| `--team, -t`                      | The name of the organization under which the property belongs. Uses private space if omitted.                                                                                                                                                                                                                                                     |
| `--origin`                        | The domain or IP address of the origin to use for the property.                                                                                                                                                                                                                                                                                   |
| `--deploy`                        | Deploys the property after initializing.                                                                                                                                                                                                                                                                                                          |
| `--skipFramework, --sf`           | Skips installing the framework (Next.js, Vue, Angular, etc..) and simply rebundles your router.                                                                                                                                                                                                                                                   |
| `--includeSources`                | Includes all non-gitignored source files in the bundle uploaded to {{ PRODUCT_NAME }}. This can be helpful when debugging, especially when working with {{ PRODUCT_NAME }} support. You can limit the files that are uploaded using the [sources](/applications/performance/cdn_as_code/edgio_config#sources) configuration in {{ CONFIG_FILE }}. |
| `--disablePermanentAssets`        | Set this to true to suppress errors like "Immutable file (...) content was changed" during deployment.                                                                                                                                                                                                                                            |
| `--property`                      | The name of the property to deploy. By default the `name` field in `{{ CONFIG_FILE }}` or `package.json` is used.                                                                                                                                                                                                                                 |
| `--skip-build`                    | Skips running the `{{ CLI_CMD(build) }}` command, including the framework build, and uses the previous build instead.                                                                                                                                                                                                                             |
| `--path`                          | Path to your site's root directory. Uses current directory by default.                                                                                                                                                                                                                                                                            |
| `--branch, -b`                    | The name of the source control branch. This is automatically set when using Git.                                                                                                                                                                                                                                                                  |
| `--environment, -e`               | The environment to deploy to. By default the `default` environment is used.                                                                                                                                                                                                                                                                       |
| `--commit-url`                    | The URL to the main page of the desired source control repository followed by the `commit` subfolder (e.g., `https://github.com/edgio-docs/edgio-docs/commit`). This commit URL can be automatically derived when `package.json` provides the `repository` attribute and you are using GitHub, GitLab, or BitBucket.                              |
| `--disable-team-check`            | Skips the check to see if the property is being deployed to a private space and also exists within an organization.                                                                                                                                                                                                                               |

### login {/* login */}

Logs in to {{ PRODUCT_NAME }} through the {{ PORTAL }}.

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} login
```

### logout {/* logout */}

Logs out of {{ PRODUCT_NAME }}

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} logout
```

### ls {/* ls */}

Lists all organizations, properties and environments associated with your account.

#### Example {/* example */}

```bash
{{ CLI_CMD(ls) }}
```

### run {/* run */}

Runs your project locally, simulating {{ PRODUCT }} cloud environment. When no arguments are provided, this command is the same as `{{ CLI_CMD(dev) }}`.

#### Parameters {/* parameters */}

| Name                           | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `[archive] <path-to-zip-file>` | The path to a deployment archive (zip) file downloaded from Edgio Developer Console |

#### Options {/* options */}

| Name               | Description                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--production, -p` | Runs a production build of your app, simulating the cloud environment. This can also be achieved by setting the NODE_ENV environment variable to `true`. You need to run `{{ FULL_CLI_NAME }} build` first.                     |
| `--cache, -c`      | Enables caching during local development so that you can test the caching logic in your router. By default caching is turned off in local development to ensure you don't see stale responses as you make changes to your code. |

#### Example {/* example */}

```bash
{{ FULL_CLI_NAME }} run --production
```

Or to run a deployment bundle downloaded from {{ PORTAL }}, use:

```bash
{{ FULL_CLI_NAME }} run /path/to/bundle.zip
```

Production mode is always used when running downloaded bundles.

### use {/* use */}

Switches the version of all {{ PACKAGE_NAME }}/\* packages in your project.

#### Example {/* example */}

To install a particular version:

```bash
{{ FULL_CLI_NAME }} use 6.1.0
```

<a id="latest-stable" />

To install the latest stable version relative to your current version:

```bash
{{ FULL_CLI_NAME }} use {{ PACKAGE_VERSION}}
```

To install the latest preview:

```bash
{{ FULL_CLI_NAME }} use next
```

### whoami {/* whoami */}

Outputs the email address associated with the logged in user.

#### Example {/* example */}

```bash
{{ CLI_CMD(whoami) }}
```

## Troubleshooting {/* troubleshooting */}

---

### Error: Cannot find module ... on `{{ FULL_CLI_NAME }} init` {/* error-cannot-find-module-on-init */}

An uncommon issue when running `{{ FULL_CLI_NAME }} init` can present a similar error:

> installing {{ PACKAGE_NAME }}/core, {{ PACKAGE_NAME }}/cli, {{ PACKAGE_NAME }}/prefetch, {{ PACKAGE_NAME }}/devtools, {{ PACKAGE_NAME }}/angular… done.
> Error: Cannot find module ‘/Users/myUser/Projects/my-{{ PACKAGE_NAME }}-poc/node_modules/{{ PACKAGE_NAME }}/angular/bin/init’

This may be related to an outdated global version of {{ PRODUCT_NAME }} CLI. The telltale sign is reference to `/bin/` in the module path. This is an old convention. Recommended approach would be to `npm i -g {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }}` and then run `{{ FULL_CLI_NAME }} init` on the project.

### Log Level Output {/* log-level-output */}

By default, {{ PRODUCT_NAME }} CLI outputs logs at the INFO level. You may change this to obtain more output information of the CLI command being executed. To change the log level, set the `LOG_LEVEL` environment variable to one of the following values:

- ERROR: Only errors are logged, providing critical information about issues and failures.
- WARN: Errors and warnings are logged, offering insights into potential problems and anomalies.
- INFO: Errors, warnings, and information are logged, presenting general operational information about the command being executed. **(default)**
- DEBUG: Includes everything logged at the INFO level, plus additional debugging information, helpful for developers during development and testing.
- TRACE: Includes all the information logged at the DEBUG level, and even more detailed information, useful for deep troubleshooting of code execution and performance analysis.

**Example:**

```plaintext
LOG_LEVEL=TRACE {{ CLI_CMD(run) }}

> Starting Edgio in development mode with caching disabled...
> Building service worker... done.
> Bundling router... done.
> Bundling edge functions... done.
> Recompile of router, config and edge functions... done.
> Edgio ready on http://127.0.0.1:3000

Next info  - Loaded env from /Projects/edgio-docs/edgio-docs/.env
Next warn  - You have enabled experimental feature (scrollRestoration) in next.config.js.
Next warn  - Experimental features are not covered by semver, and may cause unexpected or broken application behavior. Use at your own risk.

Next event - compiled client and server successfully in 14.9s (1498 modules)
DEBUG [RequestHandler] GET /
TRACE executed UriRaw: ModRewrite in 12ms
TRACE executed UriClean: ModAccess in 12ms
TRACE executed UriClean: ModRedirect in 6ms
TRACE executed UriClean: ModSetEnv in 13ms
TRACE executed UriClean: ModCache in 3ms
TRACE executed UriClean: ModProxyFeatures in 4ms
TRACE executed UriClean: ModStream in 1ms
TRACE executed HandleDocRoot: ModCache in 0ms
TRACE executed HandleDocRoot: ModTranscode in 0ms
TRACE executed SendRequestContent: ModEdgeFunctions in 0ms
TRACE Serverless hint proxy:0
DEBUG [RequestContext] skipping to compute, function #0
DEBUG [Backend] fetch {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: '127.0.0.1:3001',
  port: '3001',
  hostname: '127.0.0.1',
  hash: null,
  search: null,
  query: [Object: null prototype] {},
  pathname: '/',
  path: '/',
  href: 'http://127.0.0.1:3001/',
  method: 'GET',
  timeout: 0,
  agent: null,
  body: <Buffer >,
  headers: {
    host: '127.0.0.1:3001',
    'user-agent': 'curl/8.1.2',
    accept: '*/*',
    'x-edg-serverless-hint': 'proxy:0',
    'x-prerender-revalidate': '',
    'x-forwarded-proto': 'http'
  }
}
...
```
