---
title: Environments
---

An environment defines how traffic will be served through {{ PRODUCT }}. Each environment consists of:

-   [Hostnames:](/applications/basics/hostnames) A hostname identifies a domain (e.g., `cdn.example.com`) through which your site will be served.
-   [Origins:](/applications/basics/origins) An origin configuration defines how our service will communicate with your web servers.
-   [Rules:](/applications/performance/rules) A rule determines how requests for a specific environment will be processed.
-   [Experiments:](/applications/performance/experiments) Randomized experimentation process wherein two or more versions of a variable are shown to different segments of website visitors at the same time to determine which version leaves the maximum impact and drives business metrics.
-   [Core Web Vitals:](/applications/performance/observability/real_user_monitoring) Review and analyze performance metrics collected through the measurement of actual Chrome users.
-   [Caching:](/applications/performance/caching) By default, deploying to an environment also clears that environment's cached content. You may manually [purge content](/applications/performance/caching) from the **Caching** page, the [{{ PRODUCT }} CLI](/applications/performance/cdn_as_code/cli#cache-clear), or our [REST API](https://docs.edg.io/rest_api/#tag/purge-requests/operation/postCacheV01PurgeRequests).
-   [Environment Variables:](#environment-variables) An environment variable is a placeholder for sensitive information (e.g., API keys and passwords) that should not be checked into source control.
-   **Traffic (Analytics):** Contains real-time statistics for this environment's traffic. You may also view a breakdown of traffic by specific routes.
-   [Real-Time Log Delivery:](/applications/logs/rtld) Delivers log data in near real-time to a variety of destinations.
-   **User Activity:** Contains an audit trail of changes to this environment (e.g., changes to your configuration and deployments).
-   **Edge Insights:** Gain historical and near real-time insights into threat profiles, performance, and CDN usage.
-   **Traffic Splitting**: Create rules to split traffic between multiple origins to conduct A/B testing or implement blue/green deployments.

**Key information:**

-   By default, {{ PRODUCT }} automatically creates an environment upon creating a property. The name of this environment varies according to whether the property was created for use with the {{ PORTAL }} or our CLI.

    -   **{{ PORTAL }}:** `production`
    -   **CLI:** `default`

-   You may create additional environments for your property.

    One use for this capability is to set up your environments to match your software development workflow.

    For example, you could create a development, testing, and staging environment to allow your team members to collaborate at every stage of your software development life cycle.

    <Callout type="info">

      If you used [our Github automation workflow](/applications/getting_started#creating-a-property--cli-with-automation-) to create a property, then we will create environments for you. You do not need to create additional environments.

    </Callout>

<!--
Free accounts are limited to three environments. Paid accounts allow you to create either five environments (on the Hyper plan) or as many environments as you need (on Enterprise plans).
-->

-   Applying changes to an environment requires a [deployment](/applications/basics/deployments).
-   Deployments to your environments are [versioned](/applications/basics/deployments#versioning). This allows you to quickly roll back your environment's configuration to a known working version.

## Creating an Environment {/*creating-an-environment*/}

Perform the following steps to create an environment:

1.  Load the **Environments** page.

    1.  From the {{ PORTAL_LINK }}, select the desired private space or organization.
    2.  Select the desired property.
    3.  From the left-hand pane, click **Environments**.

2.  Click **+ New Environment**.

    ![environments](/images/v7/basics/environments.png)

3.  In the **Name** option, specify a name for this environment. This name may consist of lowercase characters, numbers, dashes (`-`), and underscores (`_`).

4.  Optional. Copy environment variables, A/B testing configuration, and notes from another environment by selecting it from the `Copy settings from environment` option.

5.  Determine deployment permissions through the **Restrict Editors to read-only access** option.

    -   Mark this option to prevent Editors from configuring or deploying to this environment. 
    -   Clear this option to allow Editors to configure and deploy to this environment.

    <Info>

    Regardless of this option, deploy tokens, Maintainers, and Admins are always allowed to configure or deploy to this environment.

    </Info>

6.  Determine whether this [environment will be tagged as production](#production-environment) through the **Make this my production environment** option.

    ![limit environment](/images/v7/basics/environment-permissions.png?width=450)

7.  Click **Create**.

## Environment Variables {/*environment-variables*/}

Environment variables allow you to control certain facets of your application outside of its code. There are two types of {{PRODUCT}} environment variables:

-   **System-defined:** {{ PRODUCT }} automatically defines the following variables within each environment:

    - `NODE_ENV`**:** By default, this variable is set to `production`. Override this default value by [creating a variable](#managing-environment-variables) called `NODE_ENV` and setting it to the desired value.
    - `{{ PRODUCT_NAME_UPPER }}_ENVIRONMENT_NAME`**:** This read-only variable is set during deployment to the name of the environment (e.g., `production`) being deployed.

-   **Custom:** Create custom variables for sensitive information (e.g., API keys and passwords) that should be excluded from source control.

### Managing Environment Variables {/*managing-environment-variables*/}

You may create, modify, and delete environment variables from the {{ PORTAL }}.

**Key information:**

-   Applying environment variable changes requires a [deployment](/applications/basics/deployments).
-   Once an environment variable has been marked as secret, you cannot unset the **Keep this value a secret** option for that environment variable.
-   The value assigned to a secret environment variable is masked using asterisks and it is never revealed. However, you may set it to a different value.

**To create an environment variable**

1.  Load the **Environment Variables** page.

    {{ ENV_NAV }} **Environment Variables**.

2.  Click **+ Add an Environment Variable**.

3.  In the **Key** option, type a name for this environment variable.

4.  In the **Value** option, assign a value to this environment variable.

5.  If this environment variable contains sensitive information that should not be revealed to other team members, then you should mark the **Keep this value a secret** option. Otherwise, this option should be cleared.

6.  Click **Add variable**.

**To modify an environment variable**

1.  Load the **Environment Variables** page.

    {{ ENV_NAV }} **Environment Variables**.

2.  Click on the desired environment variable.

3.  Modify the environment variable's name, value, or both.

4.  Click **Apply**.

**To delete an environment variable**

1.  Load the **Environment Variables** page.

    {{ ENV_NAV }} **Environment Variables**.

2.  Click on the <Image inline src="/images/v7/icons/delete-4.png" alt="Delete" /> icon next to the desired environment variable.

3.  When prompted, click **Remove Variable** to confirm the permenant deletion of that environment variable.

### Accessing Environment Variables {/*accessing-environment-variables*/}

#### Build Time {/*build-time*/}

When you deploy to an environment using a deploy token, for example by running `{{ FULL_CLI_NAME }} deploy my-organization --environment=production --token=(my token)` option, all environment variables are pulled down from the {{ PORTAL }} and applied to `process.env` so they can be accessed at build time. This allows you to store all of your build and runtime secrets in a single place, the {{ PORTAL }}, rather than storing some in your CI system's secret manager.

#### Runtime {/*runtime*/}

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

## Production Environment {/*production-environment*/}

By default, the first environment created for your property will be tagged as `production`. This means that the performance of this environment will be prioritized over other environments during periods of high traffic. Examples of high traffic periods are a distributed denial of service (DDOS) attack or a load test.

<Callout type="info">

  You may not delete an environment that has been assigned the `production` tag. If you would like to delete this environment, then you must tag a different environment as `production` first.

</Callout>

**To switch the production environment**

1.  From the {{ PORTAL_LINK }}, select the desired private space or organization.
2.  Select the desired property.
3.  From the left-hand pane, select **Environments**.
4.  Find the desired environment and click its <Image inline src="/images/v7/icons/menu-kebab.png" alt="Menu" /> icon. After which, click **Make this my production environment**.
5.  **CDN-as-Code:** When prompted, confirm the redeployment of the environment that was previously marked as `production` and the newly tagged environment by clicking **Make "ENVIRONMENT NAME" my production environment**.

## Deleting an Environment {/*deleting-an-environment*/}

Perform the following steps to permanently delete an environment:

1.  Load the **Environments** page.

    1.  From the {{ PORTAL_LINK }}, select the desired private space or organization.
    2.  Select the desired property.
    3.  From the left-hand pane, select the desired environment from under the **Environments** section.

2.  Click the <Image inline src="/images/v7/icons/menu-kebab.png" alt="Menu" /> icon next to the desired environment and then click **Delete**.
3.  When prompted, click **Remove Environment** to confirm the permenant deletion of that environment.

<Callout type="info">

  The `production` environment cannot be deleted.

</Callout>
