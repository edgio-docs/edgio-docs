# Scheduled Cache Clearing using Github Actions

This guide walks you through clearing the cache on your site at a scheduled day and time

## NPM script

Here is an example script you can add to your `package.json` to handle cache clearing for each environment. You can also configure scripts to clear by surrogate key, path, or group (As defined in the XDN Console)

These scripts assume that you have created environments called "production", "staging", and "development and you have created a deploy key for your site and added it as a secret in your repo called "xdn_deploy_token".

```js
  "scripts": {
    ...
    "clearcache:dev": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=development --token=$xdn_deploy_token",
    "clearcache:stage": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=staging --token=$xdn_deploy_token",
    "clearcache:prod": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=production --token=$xdn_deploy_token",
    "clearcache:prod:pdps": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=production --surrogate-key=pdp --token=$xdn_deploy_token",
    "clearcache:prod:plps": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=production --surrogate-key=plp --token=$xdn_deploy_token",
    ...
  },
```

## GitHub Actions

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
# in Moovweb.app and configure it as a secret called "xdn_deploy_token" in your repo on GitHub.

name: Clear PRODUCTION cache at 5am
on:
  schedule:
  - cron: "15 9 * * *"
jobs:
  clear-the-cache:
    runs-on: ubuntu-latest
    steps:
      - name: Extract branch name
        shell: bash
        run: echo "::set-env name=BRANCH_NAME::$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')"
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://npm-proxy.fury.io/moovweb/
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
          xdn_deploy_token: ${{secrets.xdn_deploy_token}}
```