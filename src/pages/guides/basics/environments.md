---
title: Environments
---

An environment is required to serve traffic. By default, all new properties contain an environment called `production`.

<Callout type="tip">

  Set up your environments to match your software development workflow.

  For example, you could create a development, testing, and staging environment to allow your team members to collaborate at every stage of your software development life cycle.

</Callout>

<!--
Free accounts are limited to three environments. Paid accounts allow you to create either five environments (on the Hyper plan) or as many environments as you need (on Enterprise plans). 
-->

Each environment consists of:

-   [Hostnames:](/guides/basics/hostnames_and_origins) Each hostname identifies a domain (e.g., www.example.com) through which your site will be served.
-   [Origins:](/guides/basics/hostnames_and_origins) Each origin configuration defines how our service will communicate with your web servers.
-   [Rules:](/guides/performance/rules) Rules determine how requests for a specific environment will be processed.
-   [Core Web Vitals:](/guides/performance/observability/core_web_vitals) Performance metrics as measured by actual Chrome users. 
-   [Caching:](/guides/performance/caching) Each environment has a separate cache space that is automatically cleared each time you deploy. Use the **Caching** tab to clear the cache by path or surrogate key.
-   [Environment Variables:](#environment-variables) An environment variable is a placeholder for sensitive information (e.g., secrets and API keys) that should not be checked into source control. 
-   **Traffic (Analytics):** Contains real-time statistics for this environment's traffic. You may also view a breakdown of traffic by specific routes.
-   [Real-Time Log Delivery:](/guides/logs/rtld) Delivers log data in near real-time to a variety of destinations. 
-   **User Activity:** Contains an audit trail of changes to this environment (e.g., changes to your configuration and deployments).
-   **Edge Insights:** Gain historical and near real-time insights into threat profiles, performance, and CDN usage. 

<!--
-   **A/B Testing**: Split traffic between multiple router destinations or other environments to conduct A/B testing or implement blue/green deployments.
-->

## Creating an Environment {/*creating-an-environment*/}

Perform the following steps to create an environment:

1.  Load the **Environments** page.

    1.  From the {{ PORTAL }}, select the desired private or team space.
    2.  Select the desired property.
    3.  From the left-hand pane, select the desired environment from under the **Environments** section.

2.  Click **+ New Environment**.

    ![environments](/images/basics/environments.png)

3.  In the **Name** option, specify a name for this environment. This name may consist of lowercase characters, numbers, dashes (`-`), and underscores (`_`).

4.  Optional. Copy environment variables, A/B testing configuration, and notes from another environment by selecting it from the `Copy settings from environment` option.

5.  Determine deployment permissions through the **Allow all team members to deploy to this environment** option. 

    -   Mark this option to allow all team members to deploy to this environment.
    -   Clear this option to restrict deployment to admins and the deploy token. 

    ![limit environment](/images/basics/environment-permissions.png?width=450)

6.  Click **Create**.

## Deploying to an Environment {/*deploying-to-an-environment*/}

To deploy to an environment, you can `{{ FULL_CLI_NAME }} deploy` with the `--environment` option:

```bash
{{ FULL_CLI_NAME }} deploy <team name> --environment=<environment name>
```

You can also promote any existing deployment to an environment using the _PROMOTE TO ENVIRONMENT_ button at the top of the deployment view:

![promote](/images/environments/promote.png)

When configuring CI, we recommend:

- Automatically deploying to your staging environment when a PR is merged to the master branch of your repo.
- Manually promoting deployments to production using the {{ PRODUCT_NAME }} Console to prevent unwanted builds from being published by misconfigured CI workflows.

## Production Environment {/*production-environment*/}

To ensure that your production environment gets priority over all other environments during periods of high traffic, mark it as _production_ by selecting this option during creation:

![promote](/images/environments/production.png)

Or from the environments list in the site view:

![promote](/images/environments/environments_table.png)

Failure to do so could cause your production environment to become slow if another environment experiences an unexpected surge in traffic, for example due to an attack or load test.

## Environment Versions {/*environment-versions*/}

Since environments contain important settings that affect how your site functions, they are versioned. This makes it easy to roll back to a previous version of the environment if you make a change that breaks the site. To change your environment settings, create a new draft version by clicking the _Edit_ button:

![edit](/images/environments/edit.png)

As you make changes they are saved in the draft version. Once you're ready to deploy your changes, click _Activate_.

![activate](/images/environments/activate.png)

Doing so will redeploy the environment's active deployment, but updated with the new environment configuration.

## Environment Variables {/*environment-variables*/}

You can create environment variables on a {{PRODUCT_NAME}} environment basis. Environment variables allow you to control certain facets of your application outside of its code.  {{PRODUCT_NAME}} environment variable types are:

* User-defined - see [Creating and Editing Environment Variables](#creating-and-editing-environment-variables)
* Built-in - see [Built-in Environment Variables](#built-in-environment-variables)

### Creating and Editing Environment Variables {/*creating-and-editing-environment-variables*/}

1. Navigate to your site and select the _ENVIRONMENTS_ tab:

  ![environments](/images/environments/environments.png)

2. In the resulting list of deployments, click the desired version under the *ENVIRONMENT* list header.

  ![deployments](/images/environments/deployments.png)

  The environment's current settings are listed and environment variables are displayed in the resulting *CONFIGURATION* tab:

  ![env-var-list](/images/environments/env-var-list.png)

To add or edit environment variables, you must create a new environment version (see [Environment Versions](#environment-versions)).

3. Click the *EDIT* button at the top right of the screen and scroll to the *Environment Variables* section.

    * **Create a Variable**

      1. Click the the *ADD VARIABLE* button. 

        ![add](/images/environments/add-env-var.png)
      
      2. Enter the variable name (key) and value in the *Add Variable* dialog. If you wish to hide the value after creation, click the *Keep this value a secret* field. 

      3. Click the *ADD VARIABLE* button in the dialog.

    * **Edit a Variable**

      1. Click the variable's row.

      2. The resulting dialog is similar to the *Add Variable* dialog. Modify the variable name and value and  click the *Keep this value a secret* field if needed.

      3. Click the *ADD VARIABLE* button in the dialog. 

  Each variable you add or edit is listed in a table and can be deleted by clicking the delete icon. 

  ![config](/images/environments/config-env-vars.png)

7. Click the *ACTIVATE* button at the top right of the screen to save the new [version](#environment-versions). 

  You are returned to the new version's *CONFIGURATION* tab and all variables are listed in the *Environment Variables* section. Secret values are masked with asterisks.

  ![env-var-list](/images/environments/env-var-list.png)

### Built-in Environment Variables {/*built-in-environment-variables*/}

{{ PRODUCT_NAME }} automatically injects the following environment variables:

- `NODE_ENV`: Set to `production` by default, but you can override this through the console.
- `{{ PRODUCT_NAME_UPPER }}_ENVIRONMENT_NAME`: The name of the environment (e.g. `default`, `production` and so on). This cannot be overridden by you.

### Accessing Environment Variables {/*accessing-environment-variables*/}

#### At Build Time {/*at-build-time*/}

When you deploy to an environment using a deploy token, for example by running `{{ FULL_CLI_NAME }} deploy my-team --environment=production --token=(my token)` option, all environment variables are pulled down from the {{ PRODUCT_NAME }} Developer Console and applied to `process.env` so they can be accessed at build time. This allows you to store all of your build and runtime secrets in a single place, the {{ PRODUCT_NAME }} Developer Console, rather than storing some in your CI system's secret manager.

#### At Run Time {/*at-run-time*/}

The variables you configure on an environment can be accessed in your code using `process.env`. A common use case is to configure
different backend host names in `{{ CONFIG_FILE }}` based on the environment. Here is an example where the origin backend is determined
by a `HOST` environment variable.

```js
// {{ CONFIG_FILE }}
const defaultHostname = 'origin.my-site.com'

module.exports = {
  backends: {
    origin: {
      domainOrIp: process.env.HOST || defaultHostname, // Falling back to defaultHostname is needed during the initial
      hostHeader: process.env.HOST || defaultHostname, // deployment of your site, when an environment is not yet configured.
    },
  },
}
```

Note that your `{{ CONFIG_FILE }}` file is loaded during deployment to configure the edge for your environment. The first time you
deploy your site, there won't be any environment variables defined, so you need to include defaults in `{{ CONFIG_FILE }}` as
shown in the example above.

## dotenv {/*dotenv*/}

To configure secrets during local development, we recommend using [dotenv](https://github.com/motdotla/dotenv).
If you would like to reference environment variables read from `.env` in `{{ CONFIG_FILE }}`, add the following at the top
of `{{ CONFIG_FILE }}`:

```js
// {{ CONFIG_FILE }}
require('dotenv').config()
```
