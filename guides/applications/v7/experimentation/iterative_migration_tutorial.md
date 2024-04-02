---
title: Iterative Migration Tutorial
---

There are two basic approaches to the iterative migration of a website:

-   **Gradual Roll Out:** This approach gradually shifts traffic for a specific change or improvement from the legacy site to the new site. This gradual approach balances risk with efficiency by allowing you to verify functionality as you switch a feature or a page to the new site. 
-   **Gradual Site Buildout:** This approach shifts all traffic for a specific change or improvement from the legacy site to the new site. This approach is ideal for small changes, vetted changes, or if you value efficiency over an occassional issue. 

This tutorial demonstrates how to gradually roll out new features when migrating a website. This migration involves the following environments:

-   An entry environment through which traffic will be routed.
-   A destination environment to which traffic for the current website will be routed.
-   A destination environment to which traffic for the new website will be routed.

![Dedicated Routing Environment](/images/v7/experimentation-routing-dedicated-environment.png)

## Quick Start

Migrate a website by performing the following steps:

1.  Set up an environment for the current website.
2.  Set up an environment for the new website.

    If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Cloud Functions, or Edge Functions, then you should set up this environment within a different property's production environment.

3.  Set up an environment that will split traffic between the above environments.
    1.  Remove all rules.
    2.  Create an origin configuration for each environment to which traffic will be split.
    3.  Create an experiment.
4.  If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Cloud Functions, or Edge Functions, then you should set the environment defined in step 1 as the production environment. 
5.  Adjust traffic splitting.
6.  Conclude the experiment

## Assumptions

This tutorial assumes:

-   Your website is already hosted on {{ PRODUCT }}. 
-   You are familiar with the following concepts:
    -   **{{ PORTAL }}:** If you deploy changes through the {{ PORTAL }}, then you should be familiar with the following concepts:
        -   [Properties](/guides/basics/properties) and [environments](/guides/basics/environments).
        -   Setting up [origin configurations](/guides/basics/origins).
        -   [Deploying](/guides/basics/deployments) through the {{ PORTAL }}.
    -   **CDN-as-Code:** If you deploy changes through the {{ PRODUCT }} CLI, then you should be familiar with the:
    -   [{{ CONFIG_FILE }} file](/guides/performance/cdn_as_code/edgio_config)
    -   [{{ ROUTES_FILE }} file](/guides/develop/cli)
    -   [Deploying](/guides/basics/deployments) through the {{ PRODUCT }} CLI. 

## Identifying the Entry Environment

This tutorial requires an environment through which traffic for other environments will be routed. We will refer to this environment as the entry environment. We recommend using the environment that contains the hostnames whose traffic will be split. 

<Callout type="info">

  Reusing an environment that contains your hostnames allows for a seamless transition to traffic splitting and simplifies setup.

</Callout>

If traffic splitting will be performed for a domain that has not been previously registered, then you should perform the following steps:
1.  [Create](/guides/basics/environments#creating-an-environment) or identify the entry environment.
2.  [Register the desired hostname(s)](/guides/basics/hostnames#setup).
3.  [Set up TLS for each registered hostname](/guides/basics/hostnames#https-traffic).

## Setting Up the Current Website's Environment

Set up an environment for your current website.

**To set up your current website's environment using the {{ PORTAL }}**

1.  Create an environment.

    1.  Navigate to the **Environments** page and click **+ New Environment**.
    2.  Set the **Name** option to `current-site`. 
    3.  From the **Copy settings from environment** option, select your production environment.
    4.  Click **Create**.
    
    ![Current Site Environment](/images/v7/experimentation-iterative-migration-current-site.png)

2.  Replicate the rules defined within your production environment.

    1.  Copy the rules from your production environment.
        1.  From your production environment, navigate to the **Rules** page.
        2.  Click **JSON Editor**.
        3.  Copy all of your rules by selecting all of the text and then pressing `CTRL+C`.
    2.  Paste the rules within the `current-site` environment. 
        1.  Navigate to the entry environment's **Rules** page. It should already display the JSON editor.
        2.  Replace the entry environment's rules by selecting all of the text and the pressing `CTRL+V`. 
        3.  Click **Rules Editor**. Verify that your production rules were successfully moved over. 

3.  Replicate the origin configuration(s) defined within your production environment.

    1.  Copy the origin configuration(s) from your production environment.
        1.  From your production environment, navigate to the **Origins** page.
        2.  Click **JSON Editor**.
        3.  Copy all of your origin configurations by selecting all of the text and then pressing `CTRL+C`.
    2.  Paste your origin configuration(s) within the `current-site` environment.
        1.  Navigate to the `current-site` environment's **Origins** page. It should already display the JSON editor.
        2.  Replace the existing configuration by selecting all of the text and the pressing `CTRL+V`. 
        3.  Click **Origins Editor**. Verify that your production origin configurations were successfully moved over. 
 
4.  Deploy your changes. 
5.  Verify your website's functionality using a URL generated by the deployment.

    ![Latest Deployment](/images/v7/experimentation-latest-deployment.png)

**To set up your current website's environment using the {{ PRODUCT }} CLI**

1.  Run the following command from your project's root directory:

    ```bash
    {{ CLI_CMD(deploy) }} --environment current-site
    ```

2.  Verify your website's functionality using a URL generated by the deployment.

## Setting Up the New Website's Environment

Set up an environment for your new website by performing the following steps:

<Callout type="important">

  If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Cloud Functions, or Edge Functions, then you should set up this environment within a different property's production environment.

</Callout>

1.  Create an environment called `new-site`.

    1.  Navigate to the **Environments** page and then click **+ New Environment**.
    2.  Set the **Name** option to `new-site`. 
    3.  Click **Create**.
    
2.  Replicate the rules defined within your production environment.

    1.  Copy the rules from your production environment.
        1.  From your production environment, navigate to the **Rules** page.
        2.  Click **JSON Editor**.
        3.  Copy all of your rules by selecting all of the text and then pressing `CTRL+C`.
    2.  Paste the rules within the `new-site` environment. 
        1.  Navigate to the entry environment's **Rules** page. It should already display the JSON editor.
        2.  Replace the entry environment's rules by selecting all of the text and the pressing `CTRL+V`. 
        3.  Click **Rules Editor**. Verify that your production rules were successfully moved over. 
    3.  Update your rules as needed.

3.  Replicate the origin configuration(s) defined within your production environment.

    1.  Copy the origin configuration(s) from your production environment.
        1.  From your production environment, navigate to the **Origins** page.
        2.  Click **JSON Editor**.
        3.  Copy all of your origin configurations by selecting all of the text and then pressing `CTRL+C`.
    2.  Paste your origin configuration(s) within the `new-site` environment.
        1.  Navigate to the `new-site` environment's **Origins** page. It should already display the JSON editor.
        2.  Replace the existing configuration by selecting all of the text and the pressing `CTRL+V`. 
        3.  Click **Origins Editor**. Verify that your production origin configurations were successfully moved over. 
    3.  Update your origin configuration(s) as needed.

3.  Deploy your changes. 
4.  Test your new website using a URL generated by the deployment.

## Setting Up the Entry Environment

Set up your production  environment to distribute traffic by performing the following steps:

1.  Identify your [production environment](/guides/basics/environments#production-environment). 

2.  Create an origin configuration that points to the `current-site` environment. 

    1.  Navigate to the `current-site` environment's **Deployments** page. 
    2.  Load the most recent deployment.
    3.  Copy a domain from the **URL** section.
    
        ![Latest Deployment](/images/v7/experimentation-latest-deployment.png)
    
    4.  From the entry environment's **Origins** page, create an origin configuration. Set the 
    
        1.  Click **+ Add Origin**.
        2.  Set the **Name** option to `current-site`.
        3.  Disable the **Use SNI** option.
        4.  Paste the domain, which was copied in the previous step, within the **Override Host Header** option.
        5.  Paste the domain, which was copied in the previous step, within the **Origin Hostname** option.
        6.  If the domain contains `.glb`, remove it from both options.

3.  Create an origin configuration called `new-site`. Point this origin configuration to the `new-site` environment. 

    1.  Navigate to the `new-site` environment's **Deployments** page. 
    2.  Load the most recent deployment.
    3.  Copy a domain from the **URL** section.
    4.  From the entry environment's **Origins** page, create an origin configuration. Set the 
    
        1.  Click **+ Add Origin**.
        2.  Set the **Name** option to `new-site`.
        3.  Disable the **Use SNI** option.
        4.  Paste the domain, which was copied in the previous step, within the **Override Host Header** option.
        5.  Paste the domain, which was copied in the previous step, within the **Origin Hostname** option.
        6.  If the domain contains `.glb`, remove it from both options.

4.  Create an experiment.

    1.  Configure the first variant to set the origin to `current-site`.

        ![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

    2.  Configure the second variant to set the origin to `new-site`.

        ![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

        Your experiment should look similar to the following illustration:
    
        ![Cross-Environment Experiment](/images/v7/experimentation-cross-env-experiment.png?width=650)

5.  Deploy your changes.

## Production Environment

If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Cloud Functions, or Edge Functions, then you should set the `current-site` environment as the production environment. 

[Learn how to set the production environment.](/guides/basics/environments#production-environment)

## Adjusting Traffic Ratio




## Concluding the Experiment