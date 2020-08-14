# Deploying

This guide walks you through deploying your first site to the Moovweb XDN.

## Create your Account

To deploy your site to the Moovweb XDN, you must first sign up for an account. [Sign up here for free.](https://moovweb.app/signup)

## Install the XDN CLI

Next, globally install the XDN cli using npm:

```bash
npm i -g @xdn/cli
```

Or using yarn:

```bash
yarn global add @xdn/cli
```

## xdn deploy

Then, run the following to deploy your site to your private space on the Moovweb XDN:

```bash
xdn deploy
```

The CLI will automatically detect the framework you're using, create an optimized production build, and upload it to the Moovweb XDN. This takes about a minute for most applications.

Once the deployment is complete, the CLI will output the URL for your site. The site name is automatically derived from the `name` field in `package.json`. This can be overriden by using `--site` option when running `xdn deploy`.

## Branches and Deployments

Each time you deploy your site to the Moovweb XDN a "deployment" is created and given a unique and permanent URL based on the team name, site name, branch name in source control, and an incrementing deployment number. If you use Git, the branch name is set by the default. If not, you can specify the `--branch` option when running `xdn deploy`.

![deployments](/images/deploying/deployments.png)

Having each deployment be simultaneously and permanently accessible makes it easy to preview other developers' work before merging a pull request and enables you to "go back in time" to find where a bug or change in behavior originated. We recommend configuring your CI environment to deploy every push to the XDN. For more information.

## Deploying from CI

To deploy from your CI environment, create a deploy token using the site settings tab in the XDN console:

![deployments](/images/deploying/token.png)

Then use the `--token` option when deploying from your CI script:

```bash
xdn deploy my-site --token=$XDN_DEPLOY_TOKEN
```

You should always store your deploy token using your CI environment's secrets manager. Never commit your deploy token to source control.

## GitHub Actions

Here is an example GitHub action that deploys your site to the Moovweb XDN:

This action assumes that you have created environments called "staging" and "production" and you have created a deploy key for your site and added it as a secret in your repo called "xdn_deploy_token".

```yml
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
