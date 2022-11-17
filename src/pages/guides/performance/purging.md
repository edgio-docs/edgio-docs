---
title: Purging
---

This guide covers how you can purge data from the {{ PRODUCT }} edge cache.

## Overview {/*overview*/}

{{ PRODUCT }} offers three ways to purge responses from the cache:

- Developer Console
- CLI
- REST API

## Developer Console {/*developer-console*/}

You can purge the cache via the [{{ PRODUCT }} Developer Console]({{ APP_URL }}) by navigating to an environment, selecting the _Caching_ tab, and clicking _Purge the Cache_ under _Cache Purge History_:

![purge_the_cache_button](/images/purging/purge_the_cache_button.png)

You can choose to purge all entries, purge by path, or by surrogate keys. You can also save multiple paths in a group if you purge them together regularly:

![purge_dialog](/images/purging/dialog.png)

## CLI {/*cli*/}

To purge responses via the CLI, see the [CLI reference](/guides/cli#cache-clear).

## REST API {/*rest-api*/}

To purge responses via the REST API, see the [REST API reference](/guides/rest_api#clear-cache).

## Deployments {/*deployments*/}

By default, all response are purged from the cache when you deploy a new version of your site. You can override this behavior using the _Preserve cache between deployments_ setting in your environment configuration:

![preserve_cache](/images/purging/preserve.png)

__Caution:__ While preserving the cache between deployments can greatly reduce the load on your origin following a deployment, it can also lead to inconsistent behavior if the new version of your browser code receives an old, incompatible API response from the cache. Before enabling this feature, we recommend adding an API version number to your URL scheme to ensure that breaking changes to your API don't affect your website's functionality when old responses are served from the cache.

## Static prerendering after clearing the cache {/*static-prerendering-after-clearing-the-cache*/}

If you have [static prerendering] enabled, the cache will automatically be repopulated when you clear all entries from the cache (such as when you select _Purge all entries_ in the {{ PRODUCT_NAME }} Developer Console or run `{{ FULL_CLI_NAME }} cache-clear` without providing `--path` or `--surrogate-key`). You can view the prerendering progress by clicking on the active deployment for the environment that was cleared.

## Surrogate Keys (Cache Tags) {/*surrogate-keys-cache-tags*/}

Efficient cache purging is an essential part of keeping your website fast and reducing the load on your origin servers. Purging all entries from the cache all may increase your website's load time while the cache repopulates. If you purge all entries from the cache more than once a week, consider using surrogate keys for more targeted purging.

Surrogate keys, also known as **cache tags**,  are unique identifiers that you assign to groups of responses. They allow you to selectively purge related content. You can assign one or more surrogate keys to a response by sending an `{{ HEADER_PREFIX }}-surrogate-key` header in the response. Multiple keys should be separated by spaces.

For example:

```
HTTP/1.1 200 OK
{{ HEADER_PREFIX }}-surrogate-key: product.123 shoes all-products
Content-Type: text/html
```

In the example above you could purge this response from the cache using any of the surrogate keys. For example, to purge via the CLI:

```bash
{{ FULL_CLI_NAME }} cache-clear --team=my-team --site=my-site --environment=production --surrogate-key=product.123
```

or

```bash
{{ FULL_CLI_NAME }} cache-clear --team=my-team --site=my-site --environment=production --surrogate-key=shoes
```

## Automated Purging {/*automated-purging*/}

Here are some ways that you can automate cache purging:

### NPM Scripts {/*npm-scripts*/}

Here is an example script you can add to your `package.json` to handle cache clearing for each environment. You can also configure scripts to clear by surrogate key, path, or group (As defined in {{ PRODUCT_NAME }} Console)

These scripts assume that you have created environments called "production", "staging", and "development and you have created a deploy key for your site and added it as a secret in your repo called "{{ PRODUCT_NAME_LOWER }}\_deploy_token".

```js
  "scripts": {
    ...
    "clearcache:dev": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=development --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:stage": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=staging --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=production --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod:pdps": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=production --surrogate-key=pdp --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod:plps": "{{ FULL_CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=production --surrogate-key=plp --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
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
