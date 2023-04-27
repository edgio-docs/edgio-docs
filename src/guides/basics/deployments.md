---
title: Deployments
---

A deployment is required to apply changes to your code or configuration to an environment.

## Deploying

Deploy to an environment using either of the following methods:

- **{{ PORTAL }}:** Use this method to deploy changes made within the {{ PORTAL }}.

  1.  Load the desired environment.

      1.  From the {{ PORTAL_LINK }}, select the desired private or team space.
      2.  Select the desired property.
      3.  From the left-hand pane, select the desired environment from under the **Environments** section.

  2.  Update your hostname, origin, or rule configuration.

  3.  From the notification bar at the top of the page, click **Deploy Changes**.

      ![Deploy Changes](/images/v7/performance/rules-deploy-changes.png?width=450)

- **{{ PRODUCT }} CLI:** Use this method to deploy changes from your local machine (e.g., changes to {{ CONFIG_FILE }} or {{ ROUTES_FILE }}).

  ```bash
  {{ FULL_CLI_NAME }} deploy [<TEAM>] [--environment=<ENVIRONMENT>]
  ```

  <Callout type="info">

  If you omit the `environment` argument, then the deployment will be applied to the `production` environment.

  </Callout>

  The CLI will automatically detect your property's framework, create an optimized production build, and upload it to {{ PRODUCT }}. This takes about a minute for most applications.

  Once the deployment is complete, the CLI will output the URL for your site. The site name is automatically derived from the `name` field in `package.json`. This can be overridden by using `--site` option when running `{{ FULL_CLI_NAME }} deploy`.

## Versioning {/* versioning */}

Deployments are versioned. Each deployment is assigned a unique version number. This allows you to quickly roll back to a previous version when a breaking change is introduced into an environment.

**To roll back to a previous version**

1.  Load the **Deployments** page.

    {{ ENV_NAV }} **Deployments**.

2.  Find the deployment that should be applied to this environment, click its <Image inline src="/images/v7/icons/menu-kebab.png" alt="Menu" /> icon, and then click **Rollback to this version**.

    ![Rollback Deployment](/images/v7/basics/deployments-rollback.png?width=450)

3.  When prompted, click **Promote to production** to confirm that a previous deployment will be applied to this environment.

## Branches and Deployments {/* branches-and-deployments */}

Each time you deploy your site to {{ PRODUCT }} a deployment is created and given a unique and permanent URL based on the team name, site name, branch name in source control, and an incrementing deployment number. If you use Git, the branch name is set by the default. If not, you can specify the `--branch` option when running `{{ FULL_CLI_NAME }} deploy`.

![Deployments](/images/v7/basics/deployments.png?width=450)

Having each deployment be simultaneously and permanently accessible makes it easy to preview other developers' work before merging a pull request and enables you to "go back in time" to find where a bug or change in behavior originated. We recommend configuring your CI environment to deploy every push to {{ PRODUCT }}.

## Deploy from CI {/* deploy-from-ci */}

When configuring CI, we recommend:

- Automatically deploying to your staging environment when a PR is merged to the master branch of your repo.
- Manually promoting deployments to production using the {{ PORTAL }} to prevent unwanted builds from being published by misconfigured CI workflows.

A deploy token is required to deploy from your CI environment. Create one from the **Settings** page in the {{ PORTAL }}.

![deployments](/images/v7/basics/property-deploy-tokens-create.png)

Use the `--token` option when deploying from your CI script:

```bash
{{ FULL_CLI_NAME }} deploy my-site --token=$EDGIO_DEPLOY_TOKEN
```

You should always store your deploy token using your CI environment's secrets manager. Never commit your deploy token to source control.

## GitHub Actions Workflow {/* github-actions-workflow */}

You need to configure the following items in order to get a GitHub action set up.

1. Create a deploy token (see [Deploying from CI](#deploy-from-ci)). Copy the value of that token for use in the next step.
2. Save the deploy token inside GitHub ([more info](https://docs.github.com/en/actions/security-guides/encrypted-secrets#using-encrypted-secrets-in-a-workflow)). Go to your `GitHub project > Settings > Secrets > New repository secret`. Save the item as `EDGIO_DEPLOY_TOKEN`.
3. Inside your development project, create a top level folder titled `.github`. Inside that create a `workflows` folder. From there create a `edgio.yml` file and use the example below for its content.

This is an example GitHub action that will deploy your site to {{ PRODUCT }}.

For this action to work

- By default, new {{ PRODUCT }} sites are created with a `default` environment. The action below will create a new build for every push on the default environment.
- To leverage the GitHub release workflow part of the action below, you need to **create an environment** `production`.
- You need to have created a deploy key for your site (see above) and added it as a secret in your repo called "edgio_deploy_token". Read more on [accessing environment variables](/guides/basics/environments#accessing-environment-variables) which might be essential for your app during the build time and for server-side requests (including SSG/SSR).
- Depending on your use of NPM or YARN, adjust the "Install packages" step

Read the comments at the top to understand how this action is configured.

### Template {/* template */}

```yml
# Add this file to your project at .github/workflows/edgio.yml
#
# This GitHub action deploys your site on {{ PRODUCT }}.
#
# The site is deployed each time commits are pushed. The environment to which the changes are deployed
# is based on the following rules:
#
# 1.) When pushing to `master` or `main`, changes will be deployed to the "production" environment. This environment exists
#     by default. Additional environments must be created at {{ APP_URL }}.
#
# 2.) When pushing to any other branch, changes are deployed to the "default" environment when a pull request is opened. A unique URL is created based on the branch and deployment number.
#
#
# In order for this action to deploy your site, you must:
#  - Create a deploy token from your propery's settings page. Copy the deploy token and add it as a secret in your repository called "EDGIO_DEPLOY_TOKEN".
#  - Create an `edgio:deploy` command in your package.json scripts (an example is at https://github.com/edgio-docs/edgio-v7-simple-performance-example/blob/main/package.json#L10).
#  - Your project code must be configured to use NPM or YARN. This action will install dependencies using the `npm ci` or `yarn install` command.
#

name: Deploy branch to {{ PRODUCT }}

on:
  push:
    branches: [master, main]
  pull_request:

jobs:
  deploy-to-edgio:
    name: Deploy to Edgio
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
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: {{ NODE_VERSION }}
      - name: Cache node modules
        uses: actions/cache@v2
        id: cache-node-modules
        with:
          path: ~/.npm # npm cache files are stored in `~/.npm` on Linux/macOS
          key: ${{ runner.os }}-build-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ hashFiles('**/package-lock.json') }}-
            ${{ runner.os }}-build-${{ hashFiles('**/yarn.lock') }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
      - name: Install dependencies
        run: |
          npm i -g @edgio/cli
          # Check if package-lock.json file exists
          if [ -f "package-lock.json" ]; then
            # Use npm
            npm ci --legacy-peer-deps
          else
            # Check if yarn.lock file exists
            if [ -f "yarn.lock" ]; then
              # Use yarn
              yarn install --immutable
            else
              # No lock file found
              echo "No lock file found. Please run 'npm ci' or 'yarn install --frozen-lockfile' to install dependencies."
              exit 1
            fi
          fi
      - name: Deploy to {{ PRODUCT }}
        run: |
          # Use "production" environment for master/main branches, otherwise use "default" environment
          if [ "${{ github.ref }}" = "refs/heads/master" ] || [ "${{ github.ref }}" = "refs/heads/main" ]; then
            environment="production"
          else
            environment="default"
          fi

          npm run edgio:deploy -- --branch="${{ BRANCH_NAME }}" --environment="${{ environment }}" --token="${{ secrets.EDGIO_DEPLOY_TOKEN }}"

```

### Screencast Tutorial {/* screencast-tutorial */}

<Video src="https://player.vimeo.com/video/691593915" />

## Jenkins Pipeline {/* jenkins-pipeline */}

Here is an example Jenkins pipeline that deploys your site to {{ PRODUCT }}:

This guide assumes:

- Your project is hosted on GitHub
- You have a Jenkins environment configured with Docker and to receive GitHub `push` events
- You have created environments called "staging" and "production"
- You have created a deploy key for your site and added it as an environment variable in your Jenkins configuration called "edgio_deploy_token".

```groovy
// Add this file to your project at ./Jenkinsfile
//
// This Jenkins pipeline deploys your site on {{ PRODUCT }}.
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
    stage("Deploy to {{ PRODUCT }}") {
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

## GitLab CI/CD {/* gitlab-cicd */}

Here is an example GitLab CI/CD configuration that deploys your site to {{ PRODUCT }}:

This guide assumes:

- Your repository is hosted on GitLab
- Your default git branch is named `master` or `main`
- You have created environments called "staging" and "production"
- You have created a deploy key for your site and added it as a variable in your GitLab project's CI/CD settings page, named "EDGIO_DEPLOY_TOKEN"

```yml
# Add this file to your project at .gitlab-ci.yml
#
# This GitLab CI/CD configuration deploys your site on {{ PRODUCT }}.
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
