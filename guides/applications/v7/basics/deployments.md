---
title: Deployments
---

A deployment is required to apply changes to your code or configuration to an environment.

## Deploying {/*deploying*/}

Deploy to an environment using either of the following methods:

-   **{{ PORTAL }}:** Use this method to deploy changes made within the {{ PORTAL }}.
    1.  Load the desired environment.

        1.  From the {{ PORTAL_LINK }}, select your private space or the desired organization.
        2.  Select the desired property.
        3.  From the left-hand pane, select the desired environment from under the **Environments** section.

    2.  Update your hostname, origin, or rule configuration.

    3.  From the notification bar at the top of the page, click **Deploy Changes**.

        ![Deploy Changes](/images/v7/performance/rules-deploy-changes.png?width=450)

-   **{{ PRODUCT }} CLI:** Use this method to deploy changes from your local machine (e.g., changes to {{ CONFIG_FILE }} or {{ ROUTES_FILE }}).

    ```bash
    {{ FULL_CLI_NAME }} deploy [<ORGANIZATION>] [--environment=<ENVIRONMENT>]
    ```

    <Callout type="info">

      If you omit the `environment` argument, then the deployment will be applied to the `default` environment.

    </Callout>

    The CLI will automatically detect your property's framework, create an optimized production build, and upload it to {{ PRODUCT }}. This takes about a minute for most applications.

    Once the deployment is complete, the CLI will output the URL for your site. Your property's name is automatically derived from the `name` field in `package.json`. This can be overridden by using `--property` option when running `{{ FULL_CLI_NAME }} deploy`.

{{ system_origins_callout.md }}

<a id="deployment-specific-page" />Upon deploying a build, view deployment information from within the {{ PORTAL }} by navigating to the desired environment, clicking on **Deployments**, and then clicking the deployment's version number.

![Deployment version number](/images/v7/basics/deployments-version-number.png?width=450)

This deployment-specific page provides information about the deployment, such as:

-   How and when it was deployed.
-   Current status.
-   URL(s) through which you can serve traffic for your website. These URL(s) are listed under the **URL** section.
-   If you are using CDN-as-code, then we also provide:
    -   A permalink for testing your site. This type of link bypasses the edge of our network and serves traffic directly from the {{ PRODUCT }} cloud.
    -   [Server logs](/applications/logs/server_logs) through which you can view console messages defined within your application.

## Deployment Status {/*deployment-status*/}

View status information for all deployments from the **Deployments** page. Online deployments are indicated by <Image inline src="/images/v7/icons/deployment-online.png" alt="Solid green circle" />, while retired deployments are indicated by <Image inline src="/images/v7/icons/deployment-retired.png" alt="Faint green circle" />.

Each environment may have up to 5 online deployments. If you are using CDN-as-code, then you may use the permalink associated with any online deployment to test your site.

Although older deployments are considered retired, you may revive a deployment by visiting its permalink. Once the deployment has been revived, the permalink will once again load your site. Additionally, we will retire the next oldest online deployment.

## Versioning {/*versioning*/}

Upon deploying changes, {{ PRODUCT }} assigns a unique version number to the deployment. This allows you to track the changes deployed to this environment.

**Key information:**
-   {{ PRODUCT }} increments this version number by 1 for each new deployment.
-   You can quickly roll back to any previous version. For example, you may wish to roll back to a previous deployment when a breaking change is introduced into an environment.
-   Each deployment is also assigned an environment version number. Deploying new changes increments both the deployment and the environment version number. However, rolling back to a previous environment version will only increment the deployment version number. The environment version number, on the other hand, will be set to the environment version to which you rolled back.

**To roll back to a previous version**

1.  Load the **Deployments** page.

    {{ ENV_NAV }} **Deployments**.

2.  Find the deployment that should be applied to this environment, click its <Image inline src="/images/v7/icons/menu-kebab.png" alt="Menu" /> icon, and then click **Rollback to this version**.

    ![Rollback Deployment](/images/v7/basics/deployments-rollback.png?width=450)

3.  When prompted, click **Promote to production** to confirm that a previous deployment will be applied to this environment.

## Branches and Deployments {/*branches-and-deployments*/}

Deploying changes to {{ PRODUCT }} generates a deployment build. Upon the completion of this deployment, this build is assigned a unique and permanent URL based on the organization name, property name, branch name in source control, and an incrementing deployment number. If you use Git, the branch name is set by default. If not, you can specify the `--branch` option when running `{{ FULL_CLI_NAME }} deploy`.

![Deployments](/images/v7/basics/deployments.png?width=450)

Permanently accessible deployment builds allows you to preview other developers' work before merging a pull request and enables you to "go back in time" to find where a bug or change in behavior originated. We recommend configuring your CI environment to deploy every push to {{ PRODUCT }}.

## Deploy from CI {/*deploy-from-ci*/}

When configuring CI, we recommend:

-   Automatically deploying to your staging environment when a PR is merged to the master branch of your repo.
-   Manually promoting deployments to production using the {{ PORTAL }} to prevent unwanted builds from being published by misconfigured CI workflows.

A deploy token is required to deploy from your CI environment. Create one from the **Settings** page in the {{ PORTAL }}.

![deployments](/images/v7/basics/property-deploy-tokens-create.png)

Use the `--token` option when deploying from your CI script:

```bash
{{ FULL_CLI_NAME }} deploy my-site --token=$EDGIO_DEPLOY_TOKEN
```

You should always store your deploy token using your CI environment's secrets manager. Never commit your deploy token to source control.

## GitHub Actions {/*github-actions*/}

You need to configure the following items in order to get a GitHub action set up.

1. Create a deploy token (see [Deploying from CI](#deploy-from-ci)). Copy the value of that token for use in the next step.
2. Save the deploy token inside GitHub ([more info](https://docs.github.com/en/actions/security-guides/encrypted-secrets#using-encrypted-secrets-in-a-workflow)). Go to your `GitHub project > Settings > Secrets > New repository secret`. Save the item as `EDGIO_DEPLOY_TOKEN`.
3. Inside your development project, create a top level folder titled `.github`. Inside that create a `workflows` folder. From there create a `edgio.yml` file and use the example below for its content.

This sample GitHub action deploys your site to {{ PRODUCT }}. It requires:

- A `default` environment. By default, new properties created through our CLI include a `default` environment. This Github action creates a new build for every push to the `default` environment.
- A `production` environment. If you have not already created a `production` environment, then you should do so now.
- A deploy token. Add this deploy token as a secret in your repository called `edgio_deploy_token`. Learn more on [accessing environment variables](/applications/basics/environments#accessing-environment-variables) which might be essential for your app during the build time and for server-side requests (including SSG/SSR).
- Depending on your use of npm or Yarn, adjust the `Install packages` step.

### Template {/*template*/}

```yml
# File: .github/workflows/edgio.yml
# Purpose: Deploy to {{ PRODUCT }} upon specific GitHub events.

# Deployment Rules:
# - "main" branch -> Default Environment
# - Feature branch -> Staging (on PR)
# - GitHub Release -> Production

# Prerequisites:
# - Set "EDGIO_DEPLOY_TOKEN" secret, generated from {{ APP_URL }}
# - Add `edgio:deploy` in package.json (Example: https://github.com/edgio-docs/edgio-docs/blob/main/package.json#L9)
# - Create additional staging and production environments in {{ APP_URL }}

name: Deploy branch to {{ PRODUCT }}

on:
  push:
    branches: [main]
  pull_request:
  release:
    types: [published]

jobs:
  deploy-to-edgio:
    name: Deploy to Edgio
    # Skip for auto-merge push on release tagging
    if: contains(github.ref, 'refs/tags') == false || github.event_name == 'release'
    runs-on: ubuntu-latest
    env:
      deploy_token: ${{ secrets.EDGIO_DEPLOY_TOKEN }}

    steps:
      # Validate presence of deploy token
      - name: Validate Deploy Token
        if: env.deploy_token == ''
        run: echo "EDGIO_DEPLOY_TOKEN missing" && exit 1

      # Extract and sanitize branch name
      - name: Extract Branch Name
        shell: bash
        run: echo "BRANCH_NAME=$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')" >> $GITHUB_ENV

      # Checkout code and set up Node.js
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 16

      # Cache node modules
      - name: Cache Node Modules
        uses: actions/cache@v1
        with:
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-

      # Install packages (Adjust based on package manager)
      - name: Install Packages
        run: npm ci

      # Deploy
      - name: Deploy to {{ PRODUCT }}
        run: npm run edgio:deploy -- --branch=$BRANCH_NAME --token=$deploy_token \
          ${{ github.event_name == 'push' && '--environment=default' || '' }} \
          ${{ github.event_name == 'pull_request' && '--environment=staging' || '' }} \
          ${{ github.event_name == 'release' && '--environment=production' || '' }}
```

### Screencast Tutorial {/*screencast-tutorial*/}

<Video src="https://player.vimeo.com/video/691593915"/>

## Jenkins Pipeline {/*jenkins-pipeline*/}

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

## GitLab CI/CD {/*gitlab-cicd*/}

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

image: node:16

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
        EDGIO_DEPLOY_ENVIRONMENT: 'staging'
    - if: '$CI_COMMIT_TAG'
      variables:
        EDGIO_DEPLOY_ENVIRONMENT: 'production'
    - if: '$CI_COMMIT_BRANCH'
      variables:
        EDGIO_DEPLOY_ENVIRONMENT: ''
  before_script:
    - npm ci --cache .npm --prefer-offline
  script:
    - npm run {{ FULL_CLI_NAME }}:deploy -- --token="$EDGIO_DEPLOY_TOKEN" --non-interactive --branch="$CI_COMMIT_BRANCH" --environment"$EDGIO_DEPLOY_ENVIRONMENT"
```
