---
title: Iterative Migration Tutorial
---

There are two basic approaches to the iterative migration of a website:

-   **Gradual Roll Out:** This approach gradually shifts traffic for a specific change or improvement from the legacy site to the new site. This gradual approach balances risk with efficiency by allowing you to verify functionality as you switch a feature or a page to the new site. 
-   **Gradual Site Buildout:** This approach shifts all traffic for a specific change or improvement from the legacy site to the new site. This approach is ideal for small changes, vetted changes, or if you value efficiency over an occassional issue. 

## Overview

This tutorial demonstrates how to gradually roll out new features when migrating a website. This migration involves the following environments:

-   A source environment through which traffic will be routed.
-   A target environment to which traffic for the current website will be routed.
-   A target environment to which traffic for the new website will be routed.

![Dedicated Routing Environment](/images/v7/experimentation-routing-dedicated-environment.png)

Migrate a website by performing the following steps:

1.  Set up a target environment for the current website.
2.  Set up a target environment for the new website.
3.  Set up a source environment.
4.  Create an experiment.
5.  Adjust traffic splitting.
6.  Conclude the experiment

## Assumptions

This tutorial assumes:

-   Your website is already hosted on {{ PRODUCT }}. All configurations will be performed from within the {{ PRODUCT }} property on which your website is hosted.
-   You are familiar with the following concepts:
    -   **{{ PORTAL }}:** If you deploy changes through the {{ PORTAL }}, then you should be familiar with the following concepts:
        -   Properties and environments.
        -   Setting up origin configurations.
        -   Deploying through the {{ PORTAL }}.
    -   **CDN-as-Code:** If you deploy changes through the {{ PRODUCT }} CLI, then you should be familiar with the:
    -   {{ CONFIG_FILE }} file
    -   {{ RULES_FILE }} file
    -   Deploying through the {{ PRODUCT }} CLI. 

## Identifying the Routing Environment

This tutorial requires an environment dedicated to routing traffic to other environments. Use the environment that contains the hostnames for the traffic that will be split. 

## Setting Up the Current Website's Environment

Create an environment for the current version of your website. Replicate the rules and origin configurations defined within the routing environment within this new environment. Deploy your changes. Test your configuration.

<!--TODO - Specific instructions-->

Create an origin configuration within the target environment. Traffic proxied from the source environment will be directed to this origin.

## Setting Up the New Website's Environment

Create an environment for the new version of your website. Define rules, origin configurations, or both. Deploy your changes. Test your configuration.

<!--TODO - Specific instructions-->

Create an origin configuration within the target environment. Traffic proxied from the source environment will be directed to this origin.

## Setting Up an Experiment


    Configure one of the variants to set the origin to the one created in the previous step.
    
    ![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

    Your experiment should look similar to the following illustration:
    
    ![Cross-Environment Experiment](/images/v7/experimentation-cross-env-experiment.png?width=650)





1.  Identify the origin configuration that serves traffic for the legacy site. We will refer to this origin configuration as the source origin configuration. 
2.  Identify the environment that serves traffic for your new site. We will refer to this environment as the target environment. 
    For example, you could potentially designate a "newsite" environment as the target environment.
3.  Identify or create an origin configuration within the target environment. Traffic proxied from the source environment will be directed to this origin.

    For example, you could potentially expose a feature release through this origin configuration.
4.  Deploy your changes to the target environment. 

    Navigate to the deployment details page to view a domain associated with an edge link. Sample domains are highlighted below.
    
    ![Edge Link's Domain](/images/v7/experimentation-cross-env-experiment-edge-link.png?width=650)
    
5.  Create an origin configuration within the source environment. Set the **Origin Hostname** and **Override Host Header** options to the domain identified in the previous step. 

    Verify that the **Use the following SNI hint and enforce origin SAN/CN checking** option was autopopulated with the same domain.

    Your origin configuration should look similar to the following illustration:

    ![Source Environment's Origin Configuration](/images/v7/experimentation-cross-env-experiment-origin-configuration.png?width=650)

6.  Create an experiment within the source environment. 

    Configure one of the variants to set the origin to the one created in the previous step.
    
    ![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

    Your experiment should look similar to the following illustration:
    
    ![Cross-Environment Experiment](/images/v7/experimentation-cross-env-experiment.png?width=650)

7.  Optional. Create a rule that sets the host requested by the client (`%{http_host}`) within the `x-forwarded-host` request header. You should then define custom logic within your origin server to handle requests that originate from the source environment.

    ![Set Request Headers Feature](/images/v7/experimentation-cross-env-experiment-host.png)

8.  Deploy your changes to the source environment. Wait until the deployment completes.
9.  Request the source environment's edge link, which can be found on the deployment details page, to verify that traffic is proxied to your target environment.

    <Callout type="info">
    
      The variant assigned to a client persists until cookies are cleared. This means that testing this experiment may require clearing your cookies various times or initiating various distinct private browsing sessions. 
    
    </Callout>


