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

Having each deployment be simultaneously and permanently accessible makes it easy to preview other developers' work before merging a pull request and enables you to "go back in time" to find where a bug or change in behavior originated. We recommend configuring your CI environment to deploy every push to the XDN.

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
# Add this file to your project at .github/workflows/xdn.yml
#
# This GitHub action deploys your site on the Moovweb XDN.
#
# The site is deployed each time commits are pushed. The environment to which the changes are deployed
# is based on the following rules:
#
# 1.) When pushing to master, changes deployed to the "staging" environment. This environment does not exist
#     by default. You must create it using moovweb.app.
# 2.) When pushing to any other branch, changes are deployed to the default environment.  An unique URL is created based on the branch and deployment number.
# 3.) When you publish a release in GitHub, the associated tag will be deployed to the production
#     environment. This environment does not exist by default, you must create it using moovweb.app.
#     Therefore, you can push to production by creating a GitHub release, or by using the "Promote to Environment"
#     menu when viewing a deployment in moovweb.app.
#
# In order for this action to deploy your site, you must create a deploy token from the site settings page
# in Moovweb.app and configure it as a secret called "xdn_deploy_token" in your repo on GitHub.

name: Deploy branch to XDN

on:
  push:
  release:
    types: [published]

jobs:
  deploy-to-xdn:
    # cancels the deployment for the automatic merge push created when tagging a release
    if: contains(github.ref, 'refs/tags') == false || github.event_name == 'release'
    runs-on: ubuntu-latest
    steps:
      - name: Check for XDN deploy token secret
        if: env.xdn_deploy_token == ''
        run: |
          echo You must define the "xdn_deploy_token" secret in GitHub project settings
          exit 1
        env:
          xdn_deploy_token: ${{secrets.xdn_deploy_token}}
      - name: Extract branch name
        shell: bash
        run: echo "BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')" >> $GITHUB_ENV
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
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
      - name: Deploy to XDN
        run: npm run xdn:deploy -- ${{'--branch=$BRANCH_NAME' || ''}} --token=$xdn_deploy_token ${{github.event_name == 'push' && env.BRANCH_NAME == 'master' && '--environment=staging' || ''}} ${{github.event_name == 'release' && '--environment=production' || ''}}
        env:
          xdn_deploy_token: ${{secrets.xdn_deploy_token}}
```

## Jenkins Pipeline

Here is an example Jenkins pipeline that deploys your site to the Moovweb XDN:

This guide assumes:
- Your project is hosted on GitHub
- You have a Jenkins environment configured with Docker and to receive GitHub `push` events
- You have created environments called "staging" and "production" 
- You have created a deploy key for your site and added it as an environment variable in your Jenkins configuration called "xdn_deploy_token".

```groovy
// Add this file to your project at ./Jenkinsfile
//
// This Jenkins pipeline deploys your site on the Moovweb XDN.
//
// The site is deployed each time commits are pushed. The environment to which the changes are deployed
// is based on the following rules:
//
// 1.) When pushing to `master`, changes are deployed to the "staging" environment. This environment does not exist
//     by default. You must create it using moovweb.app.
// 2.) When pushing to any other branch, changes are deployed to the default environment. An unique URL is created
//     based on the branch and deployment number.
// 3.) To deploy to the "production" environment, use moovweb.app to promote the build. This environment does not 
//     exist by default, you must create it using moovweb.app.
//
// In order for this pipeline to deploy your site, you must create a deploy token from the site settings page
// in Moovweb.app and configure it as an environment variable called "xdn_deploy_token" in your Jenkins configuration.

pipeline {
  agent { 
    docker {
      image "node:12-alpine"
    }
  }
  environment {
    REPO_URL = "https://github.com/{your-org}/{your-repo}/" // (required)

    npm_config_cache = "npm-cache"
    HOME = "."
  }
  stages {
    stage("Checking environment") {
      when {
        expression {
          env.xdn_deploy_token == null
        }
      }
      steps {
        echo "You must define the 'xdn_deploy_token' secret in your environment variables"
        sh "exit 1"
      }
    }
    stage("Install packages") {
      steps {
        sh "npm i"
      }
    }
    stage("Deploy to XDN") {
      steps {
        script {
          def branch = env.GIT_BRANCH // typically referenced as `origin/{branch}`
          def url = env.REPO_URL
          env.XDN_COMMIT_URL = (url.endsWith("/") ? url : url + "/") + "commit/$GIT_COMMIT"
          env.BRANCH_NAME = branch.tokenize("/").last()
          env.XDN_ENV_ARG = (env.BRANCH_NAME != "master") ? "--branch=$BRANCH_NAME" : "--environment=staging"
        }
        sh "npm run deploy -- --token=$xdn_deploy_token ${XDN_ENV_ARG} --commit-url=${XDN_COMMIT_URL}"
      }
    }
  }
}
```
