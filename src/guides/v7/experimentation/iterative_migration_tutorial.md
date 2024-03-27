---
title: Iterative Migration Tutorial
---

There are two basic approaches to the iterative migration of a website:

-   **Gradual Roll Out:** This approach gradually shifts traffic for a specific change or improvement from the legacy site to the new site. This gradual approach balances risk with efficiency by allowing you to verify functionality as you switch a feature or a page to the new site. 
-   **Gradual Site Buildout:** This approach shifts all traffic for a specific change or improvement from the legacy site to the new site. This approach is ideal for small changes, vetted changes, or if you value efficiency over an occassional issue. 

## Overview

This tutorial demonstrates how to gradually roll out new features when migrating a website. This migration involves the following environments:

-   An entry environment through which traffic will be routed.
-   A destination environment to which traffic for the current website will be routed.
-   A destination environment to which traffic for the new website will be routed.

![Dedicated Routing Environment](/images/v7/experimentation-routing-dedicated-environment.png)

Migrate a website by performing the following steps:

1.  Set up a destination environment for the current website.
2.  Set up a destination environment for the new website.
3.  Set up an entry environment.
4.  Create an origin configuration for each destination environment.
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
    -   {{ ROUTES_FILE }} file
    -   Deploying through the {{ PRODUCT }} CLI. 

## Identifying the Routing Environment

This tutorial requires an environment through which traffic for other environments will be routed. Our recommendation is to use the environment that contains the hostnames for the traffic that will be split. If traffic splitting will be performed for a domain that has not been previously registered, then you should [create an environment](/guides/basics/environments#creating-an-environment), [register the desired hostname(s)](/guides/basics/hostnames#setup), and then [set up TLS for each registered hostname](/guides/basics/hostnames#https-traffic).

<Callout type="info">

  Reusing an environment that contains your hostnames allows for a seamless transition to traffic splitting and simplifies setup.

</Callout>

## Setting Up the Current Website's Environment

Create an environment for the current version of your website. Replicate the rules and origin configurations defined within the routing environment within this new environment. Deploy your changes. Test your configuration.

<!--TODO - Specific instructions-->


## Setting Up the New Website's Environment

Create an environment for the new version of your website. Define rules, origin configurations, or both. Deploy your changes. Test your configuration.

<!--TODO - Specific instructions-->

## Setting Up Origin Configurations

Create an origin configuration for the environment corresponding to the current version of the website. Traffic proxied from the entry environment will be directed to this origin.

Create an origin configuration for the environment corresponding to the new version of the website. Traffic proxied from the entry environment will be directed to this origin.


## Setting Up an Experiment

Create an experiment.

Configure the first variant to set the origin to `current-website`.

![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

Configure the second variant to set the origin to `new-website`.

![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

Your experiment should look similar to the following illustration:
    
![Cross-Environment Experiment](/images/v7/experimentation-cross-env-experiment.png?width=650)

## Adjusting Traffic Ratio




## Concluding the Experiment