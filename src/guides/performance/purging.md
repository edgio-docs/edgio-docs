---
title: Purging
---

Purge cached content to force the CDN to request a new version of that content from an origin server or Serverless Compute. This ensures that the latest version of that content is delivered to your clients.

<Callout type="info">

  Purging does not delete content from the origin server. A file management tool (e.g., SFTP or rsync) may be used to delete content from an origin server.

</Callout>

Purge by relative path, surrogate key, or all cached content using the:

-   [{{ PORTAL }}](#developer-console)
-   [{{ PRODUCT }} CLI](#cli)
-   [{{ PRODUCT }} REST API (clear-cache)](#rest-api)

<Callout type="info">

  By default, deploying to {{ PRODUCT }} automatically purges that environment's cached content. [Learn more.](#deployments)

</Callout>

## Relative Path {/*relative-path*/}

You may specify a relative path that identifies the set of cached respones that will be purged. This relative path starts directly after the hostname.

<Callout type="tip">

  Use an `*` to represent zero or more characters.

</Callout>

**Example:**

This example assumes that you need to purge the following content:

`https://cdn.example.com/sports/basketball/marchtournament.html`

Purge the above URL by specifying the following relative path:

`/sports/basketball/marchtournament.html`

Alternatively, you can use an `*` to recursively purge a directory. The following relative path pattern recursively purges all content from the `/sports` directory including `marchtournament.html`:

`/sports/*` 

## Surrogate Key {/*surrogate-key*/}

You  may purge cached content by surrogate key (aka cache tag). A surrogate key is a label that you may apply to cached responses. Purging by surrogate key allows you to purge related content across your entire site. 

<Callout type="tip">

  Improve performance and reduce the load on your web servers by only purging targetted content through the use of surrogate keys. 

</Callout>

#### Tagging Cached Content {/*tagging-cached-content*/}

Apply a surrogate key by setting the `Surrogate-Key` response header. 

**Syntax:** `Surrogate-Key: <TAG1> <TAG2> <TAG3>`

**Example:** 

For example, the following response header applies three surrogate keys to the cached response. Purging any of those three surrogate keys will purge all cached responses tagged with that surrogate key.

`Surrogate-Key: sports basketball march-tournament`

## {{ PRODUCT }} Developer Console {/*developer-console*/}

Use the {{ PORTAL }} to purge cached content within a specific environment. 

**To purge content**

1.  Load the **Caching** page.

    {{ ENV_NAV }} **Caching**.

2.  From the **Cache Purge History** section, click **Purge the Cache**.

    ![purge_the_cache_button](/images/v7/performance/caching-purge-the-cache.png)

3.  Purge:

    -   **All Cached Content:** Select **Purge all entries**.
    -   **By Path:** Select **Purge by path**. Specify each desired [relative path](#relative-path) on a separate line.
    -   **By Surrogate Key:** Select **Purge by surrogate key**. Specify each desired [surrogate key](#surrogate-key) on a separate line.

4.  Click **Purge Cache**.

5.  When prompted, click **Purge** to confirm that your content will be purged.

## {{ PRODUCT }} CLI {/*cli*/}

Purge cached content through the {{ PRODUCT }} CLI by passing the [cache-clear argument](/guides/cli#cache-clear). You may purge:

-   **All content:** Exclude the `--path` and `--surrogate-key` options.
-   **By relative path:** Pass the `--path` option. You may use an `*` to represent zero or more characters.
-   **By surrogate key:** Pass the `--surrogate-key` option. [Learn more about surrogate keys.](#surrogate-key)

**Example:**

Run the following command to purge the `basketball` surrogate key from the `production` environment from the `my-videos` property:

```bash
{{ FULL_CLI_NAME }} cache-clear --team=my-team --property=my-videos --environment=production --surrogate-key=basketball
```

## REST API {/*rest-api*/}

Purge cached content through the {{ PRODUCT }} REST API through the [clear-cache endpoint](/guides/develop/rest_api#clear-cache). You may purge:

-   **All content:** Exclude the `paths` and `surrogateKeys` properties.
-   **By relative path:** Pass the `paths` array of string values. You may use an `*` to represent zero or more characters.
-   **By surrogate key:** Pass the `surrogateKeys` array of string values. [Learn more about surrogate keys.](#surrogate-key)

## Deployments {/*deployments*/}

By default, all cached responses are purged from an environment when you deploy a new version of your site. Override this behavior by marking the **Preserve cache between deployments** setting on the **Caching** page.

<Callout type="warning">

  While preserving the cache between deployments can greatly reduce the load on your origin following a deployment, it can also lead to inconsistent behavior if the new version of your browser code receives an old, incompatible API response from the cache. Before enabling this feature, we recommend adding an API version number to your URL scheme to ensure that breaking changes to your API don't affect your website's functionality when old responses are served from the cache.

</Callout>

## Static prerendering after clearing the cache {/*static-prerendering-after-clearing-the-cache*/}

If you have enabled [static prerendering](/guides/performance/static_prerendering), the cache will automatically be repopulated when you clear all entries from the cache (such as when you select _Purge all entries_ in the {{ PRODUCT_NAME }} Developer Console or run `{{ FULL_CLI_NAME }} cache-clear` without providing `--path` or `--surrogate-key`). You can view the prerendering progress by clicking on the active deployment for the environment that was cleared.

## Automated Purging {/*automated-purging*/}

Automate cache purging through [NPM scripts](#npm-scripts) and [GitHub actions](#github-actions).

### NPM Scripts {/*npm-scripts*/}

Here is an example script you can add to your `package.json` to handle cache clearing for each environment. You can also configure scripts to clear by surrogate key, path, or group (As defined in {{ PRODUCT_NAME }} Console)

These scripts assume that you have created environments called "production", "staging", and "development and you have created a deploy key for your site and added it as a secret in your repo called "{{ PRODUCT_NAME_LOWER }}\_deploy_token".

```js
  "scripts": {
    ...
    "clearcache:dev": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --property=my{{ PRODUCT_NAME }}App --environment=development --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:stage": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --property=my{{ PRODUCT_NAME }}App --environment=staging --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --property=my{{ PRODUCT_NAME }}App --environment=production --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod:pdps": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --property=my{{ PRODUCT_NAME }}App --environment=production --surrogate-key=pdp --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod:plps": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --property=my{{ PRODUCT_NAME }}App --environment=production --surrogate-key=plp --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    ...
  },
```

### GitHub Actions {/*github-actions*/}

Here is an example GitHub action that clears the cache at a scheduled time using the jobs defined in your `package.json`

```yml
# Add this file to your project at .github/workflows/clear-cache.yml
#
# This GitHub action clears the sites PRODUCTION cache at 09:15AM UTC every day.
#
# The schedule syntax is standard cron syntax
# minute  hour  day-of-month  month day-of-week
#   *      *         *          *        *
#
# 1.) This example depends on a script being defined in your package.json called clearcache:prod
#
# In order for this action to clear your cache, you must create a deploy token from the site settings page
# in {{ APP_URL }} and configure it as a secret called "{{ PRODUCT_NAME_LOWER }}_deploy_token" in your repo on GitHub.

name: Clear PRODUCTION cache at 5am
on:
  schedule:
    - cron: '15 9 * * *'
jobs:
  clear-the-cache:
    runs-on: ubuntu-latest
    steps:
      - name: Extract branch name
        shell: bash
        run: echo "BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')" >> $GITHUB_ENV
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://npm-proxy.fury.io/layer0/
      - name: Cache node modules
        uses: actions/cache@v1
        env:
          cache-name: cache-node-modules
        with:
          path: ~/.npm # npm cache files are stored in `~/.npm` on Linux/macOS
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
      - run: npm ci
      - name: Clear cache in production
        run: npm run clearcache:prod
        env:
          {{ PRODUCT_NAME_LOWER }}_deploy_token: ${{secrets.{{ PRODUCT_NAME_LOWER }}_deploy_token}}
```
