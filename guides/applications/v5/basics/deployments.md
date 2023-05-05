---
title: Deployments
---

This guide walks you through deploying your app to {{ PRODUCT_NAME }}.

## Deploy From the CLI {/*deploy-from-the-cli*/}

Once you've created your {{ PRODUCT_NAME }} project, run the following to deploy your site to your private space on {{ PRODUCT_NAME }} using the CLI:

```bash
{{ FULL_CLI_NAME }} deploy
```

The CLI will automatically detect the framework you're using, create an optimized production build, and upload it to {{ PRODUCT_NAME }}. This takes about a minute for most applications.

Once the deployment is complete, the CLI will output the URL for your site. The site name is automatically derived from the `name` field in `package.json`. This can be overridden by using `--site` option when running `{{ FULL_CLI_NAME }} deploy`.

## Branches and Deployments {/*branches-and-deployments*/}

Each time you deploy your site to {{ PRODUCT_NAME }} a "deployment" is created and given a unique and permanent URL based on the team name, site name, branch name in source control, and an incrementing deployment number. If you use Git, the branch name is set by the default. If not, you can specify the `--branch` option when running `{{ FULL_CLI_NAME }} deploy`.

![deployments](/images/deploying/deployments.png)

Having each deployment be simultaneously and permanently accessible makes it easy to preview other developers' work before merging a pull request and enables you to "go back in time" to find where a bug or change in behavior originated. We recommend configuring your CI environment to deploy every push to {{ PRODUCT_NAME }}.

## Deploy from CI {/*deploy-from-ci*/}

To deploy from your CI environment, create a deploy token using the site settings tab in the {{ PRODUCT_NAME }} console.

![deployments](/images/deploying/token.png)

Then use the `--token` option when deploying from your CI script:

```bash
{{ FULL_CLI_NAME }} deploy my-site --token=$EDGIO_DEPLOY_TOKEN
```

You should always store your deploy token using your CI environment's secrets manager. Never commit your deploy token to source control.

## GitHub Actions {/*github-actions*/}

You need to configure the following items in order to get a GitHub action set up.

1. Create a deploy token (see [Deploying from CI](#deploy-from-ci)). Copy the value of that token for use in the next step.
2. Save the deploy token inside GitHub ([more info](https://docs.github.com/en/actions/security-guides/encrypted-secrets#using-encrypted-secrets-in-a-workflow)). Go to your `GitHub project > Settings > Secrets > New repository secret`. Save the item as `EDGIO_DEPLOY_TOKEN`.
3. Inside your development project, create a top level folder titled `.github`. Inside that create a `workflows` folder. From there create a `edgio.yml` file and use the example below for its content.

This is an example GitHub action that will deploy your site to {{ PRODUCT_NAME }}.

For this action to work

- By default, new {{ PRODUCT }} sites are created with a `default` environment. The action below will create a new build for every push on the default environment.
- To leverage the GitHub release workflow part of the action below, you need to **create an environment** `production`.
- You need to have created a deploy key for your site (see above) and added it as a secret in your repo called "edgio_deploy_token". Read more on [accessing environment variables](/applications/basics/environments#accessing-environment-variables) which might be essential for your app during the build time and for server-side requests (including SSG/SSR).
- Depending on your use of NPM or YARN, adjust the "Install packages" step

Read the comments at the top to understand how this action is configured.

### Template {/*template*/}

```yml
# Add this file to your project at .github/workflows/edgio.yml
#
# This GitHub action deploys your site on {{ PRODUCT }}.
#
# The site is deployed each time commits are pushed. The environment to which the changes are deployed
# is based on the following rules:
#
# 1.) When pushing to master or main, changes will be deployed to the "default" environment. This environment exists
#     by default. Additional environments must be created at {{ APP_URL }}.
#
# 2.) When pushing to any other branch, changes are deployed to a staging environment when a pull request is opened.
#     A unique URL is created based on the branch and deployment number. This environment does not exist by default,
#     you must create it using {{ APP_URL }}.
#
# 3.) When you publish a release in GitHub, the associated tag will be deployed to the production
#     environment. You can push to production by creating a GitHub release, or by using the "Promote to Environment"
#     menu when viewing a deployment in {{ APP_URL }}. This environment does not exist by default,
#     you must create it using {{ APP_URL }}.
#
# ** In order for this action to deploy your site, you must create a deploy token from the site settings page
# ** In order for this action to deploy your site, you must create a `deploy` command in your package.json scripts (an example is at https://github.com/layer0-docs/layer0-docs/blob/master/package.json#L11).
# ** Additionally, you will need to generate a deploy token from your site settings in {{ APP_URL }} and configure it as a secret called "EDGIO_DEPLOY_TOKEN" in your repo on GitHub.
#
# ** Depending on your use of NPM or YARN, adjust the "Install packages" step

name: Deploy branch to {{ PRODUCT }}

on:
  push:
    branches: [master, main]
  pull_request:
  release:
    types: [published]

jobs:
  deploy-to-edgio:
    name: Deploy to Edgio
    # cancels the deployment for the automatic merge push created when tagging a release
    if: contains(github.ref, 'refs/tags') == false || github.event_name == 'release'
    runs-on: ubuntu-latest
    env:
      deploy_token: ${{secrets.EDGIO_DEPLOY_TOKEN}}
    steps:
      - name: Check for {{ PRODUCT }} deploy token secret
        if: env.deploy_token == ''
        run: |
          echo You must define the "EDGIO_DEPLOY_TOKEN" secret in GitHub project settings
          exit 1
      - name: Extract branch name
        shell: bash
        run: echo "BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')" >> $GITHUB_ENV
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
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
      - name: Install packages
        run: npm ci # if using npm for your project
        #  run: rm -rf node_modules && yarn install --frozen-lockfile # if using yarn for your project
      - name: Deploy to {{ PRODUCT }}
        run: |
          npm run deploy -- ${{'--branch=$BRANCH_NAME' || ''}} --token=$deploy_token  \
          ${{github.event_name == 'push' && '--environment=default' || ''}} \
          ${{github.event_name == 'pull_request' && '--environment=staging' || ''}} \
          ${{github.event_name == 'release' && '--environment=production' || ''}}
        env:
          deploy_token: ${{secrets.EDGIO_DEPLOY_TOKEN}}
```

### Screencast Tutorial {/*screencast-tutorial*/}

<Video src="https://player.vimeo.com/video/691593915"/>

## Jenkins Pipeline {/*jenkins-pipeline*/}

Here is an example Jenkins pipeline that deploys your site to {{ PRODUCT_NAME }}:

This guide assumes:

- Your project is hosted on GitHub
- You have a Jenkins environment configured with Docker and to receive GitHub `push` events
- You have created environments called "staging" and "production"
- You have created a deploy key for your site and added it as an environment variable in your Jenkins configuration called "edgio_deploy_token".

```groovy
// Add this file to your project at ./Jenkinsfile
//
// This Jenkins pipeline deploys your site on {{ PRODUCT_NAME }}.
//
// The site is deployed each time commits are pushed. The environment to which the changes are deployed
// is based on the following rules:
//
// 1.) When pushing to `master`, changes are deployed to the "staging" environment. This environment does not exist
//     by default. You must create it using {{ APP_URL }}.
// 2.) When pushing to any other branch, changes are deployed to the default environment. An unique URL is created
//     based on the branch and deployment number.
// 3.) To deploy to the "production" environment, use {{ APP_URL }} to promote the build. This environment does not
//     exist by default, you must create it using {{ APP_URL }}.
//
// In order for this pipeline to deploy your site, you must create a deploy token from the site settings page
// in {{ APP_URL }} and configure it as an environment variable called "edgio_deploy_token" in your Jenkins configuration.

pipeline {
  agent {
    docker {
      image "node:14-alpine"
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
          env.edgio_deploy_token == null
        }
      }
      steps {
        echo "You must define the 'edgio_deploy_token' secret in your environment variables"
        sh "exit 1"
      }
    }
    stage("Install packages") {
      steps {
        sh "npm i"
      }
    }
    stage("Deploy to {{ PRODUCT_NAME }}") {
      steps {
        script {
          def branch = env.GIT_BRANCH // typically referenced as `origin/{branch}`
          def url = env.REPO_URL
          env.{{ PRODUCT_NAME_UPPER }}_COMMIT_URL = (url.endsWith("/") ? url : url + "/") + "commit/$GIT_COMMIT"
          env.BRANCH_NAME = branch.tokenize("/").last()
          env.{{ PRODUCT_NAME_UPPER }}_ENV_ARG = (env.BRANCH_NAME != "master") ? "--branch=$BRANCH_NAME" : "--environment=staging"
        }
        sh "npm run deploy -- --token=$edgio_deploy_token ${{{ PRODUCT_NAME_UPPER }}_ENV_ARG} --commit-url=${{{ PRODUCT_NAME_UPPER }}_COMMIT_URL}"
      }
    }
  }
}
```

## GitLab CI/CD {/*gitlab-cicd*/}

Here is an example GitLab CI/CD configuration that deploys your site to {{ PRODUCT_NAME }}:

This guide assumes:

- Your repository is hosted on GitLab
- Your default git branch is named `master` or `main`
- You have created environments called "staging" and "production"
- You have created a deploy key for your site and added it as a variable in your GitLab project's CI/CD settings page, named "EDGIO_DEPLOY_TOKEN"

```yml
# Add this file to your project at .gitlab-ci.yml
#
# This GitLab CI/CD configuration deploys your site on {{ PRODUCT_NAME }}.
#
# The site is deployed each time commits are pushed. The environment to which the changes are deployed
# is based on the following rules:
#
# 1.) When pushing to master or main, changes deployed to the "staging" environment. This environment does
#     not exist by default. You must create it using {{ APP_URL }}.
# 2.) When pushing to any other branch, changes are deployed to the default environment. A unique URL is
#     created based on the branch and deployment number.
# 3.) When you push a tag to GitLab, it will be deployed to the production environment. This environment does
#     not exist by default, you must create it using {{ APP_URL }}. Therefore, you can push to
#     production by creating a tag, or by using the "Promote to Environment" menu when viewing a deployment
#     in {{ APP_URL }}.
#
# In order for this pipeline to deploy your site, you must create a deploy token from the site settings page
# in {{ APP_URL }} and configure it as a variable called "EDGIO_DEPLOY_TOKEN" in your GitLab
# project's settings page. You should mask this variable to prevent it from appearing in logs.

image: node:14

stages:
  - deploy

cache:
  key: npm
  paths:
    - .npm/

edgio_deploy:
  stage: deploy
  rules:
    - if: '$CI_PIPELINE_SOURCE != "push"'
      when: never
    - if: '$CI_COMMIT_BRANCH == "master" || $CI_COMMIT_BRANCH == "main"'
      variables:
        EDGIO_DEPLOY_PARAM: ' --environment=staging'
    - if: '$CI_COMMIT_TAG'
      variables:
        EDGIO_DEPLOY_PARAM: ' --environment=production'
    - if: '$CI_COMMIT_BRANCH'
      variables:
        EDGIO_DEPLOY_PARAM: ''
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run {{ FULL_CLI_NAME }}:deploy -- --token=$EDGIO_DEPLOY_TOKEN --non-interactive --branch=$CI_COMMIT_BRANCH$EDGIO_DEPLOY_PARAM
```
