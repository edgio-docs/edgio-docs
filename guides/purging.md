# Purging

This guide covers how you can purge data from the Layer0 edge cache.

## Overview

Layer0 offers three ways to purge responses from the cache:

- Developer Console
- CLI
- REST API

## Devloper Console

You can purge the cache via the [Layer0 Developer Console](https://app.layer0.co) by navigating to an environment, selecting the _Caching_ tab, and clicking _Purge the Cache_ under _Cache History_:

![purge_the_cache_button](/images/purging/purge_the_cache_button.png)

You can choose to purge all entries, purge by path, or by surrogate keys. You can also save multiple paths in a group if you purge them together regularly:

![purge_dialog](/images/purging/dialog.png)

## CLI

To purge responses via the CLI, see the [CLI reference](/guides/cli#section_cache_clear).

## REST API

To purge responses via the REST API, see the [REST API reference](/guides/rest_api#section_clear_cache).

## Automated Purging

Here are some ways that you can automate cache purging:

### NPM script

Here is an example script you can add to your `package.json` to handle cache clearing for each environment. You can also configure scripts to clear by surrogate key, path, or group (As defined in {{ PRODUCT_NAME }} Console)

These scripts assume that you have created environments called "production", "staging", and "development and you have created a deploy key for your site and added it as a secret in your repo called "{{ PRODUCT_NAME_LOWER }}\_deploy_token".

```js
  "scripts": {
    ...
    "clearcache:dev": "{{ CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=development --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:stage": "{{ CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=staging --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod": "{{ CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=production --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod:pdps": "{{ CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=production --surrogate-key=pdp --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    "clearcache:prod:plps": "{{ CLI_NAME }} cache-clear --team=myTeam --site=my{{ PRODUCT_NAME }}App --environment=production --surrogate-key=plp --token=${{ PRODUCT_NAME_LOWER }}_deploy_token",
    ...
  },
```

### GitHub Actions

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
