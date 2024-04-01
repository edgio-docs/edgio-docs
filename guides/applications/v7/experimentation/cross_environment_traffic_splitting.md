---
title: Cross-Environment Traffic Splitting
---

You may use Experimentation to send traffic to another environment either within the same or a different property. 

One use for this capability is to migrate iteratively from a legacy to a new site. Validate a new feature by sending some production traffic to an environment where that new feature is hosted. 

[View iterative migration example.](/guides/experimentation/iterative_migration)

## How Does Proxying Traffic Work? {/*how-does-proxying-traffic-work*/}

{{ PRODUCT }} processes all requests using our [standard order of operations](/guides/v7/performance/request#order-of-operations). However, traffic that is sent to another environment will be processed by the rules for both environments as indicated below. 

-   **Entry Environment:** {{ PRODUCT }} will apply the entry environment's rules to the request. 
-   **Destination Environment:** {{ PRODUCT }} will only apply features that affect the response sent to the client. These features take precedence over the ones defined within the entry environment's rules.

In addition to rule processing, you may choose to add custom logic to your origin server that alters the behavior based off of the host requested by the client. This type of setup requires [logging the Host header](#host-header-logging) within the entry environment.

## Setup {/*setting-up-cross-environment-traffic*/}

The two basic methods for routing traffic to multiple environments are:

-   **Dedicated Routing Environment:** Recommended. Use the environment that contains your hostnames to route traffic. The rules defined within this environment should be applicable to all traffic. Set up an experiment on this environment to route traffic to multiple environments. 

    For example, you can route traffic to an environment that contains the configuration for your current site and another environment that contains your new site.

    ![Dedicated Routing Environment](/images/v7/experimentation-routing-dedicated-environment.png)

-   **Shared Environment:** Set up an experiment on the environment that contains your hostnames and your site's configuration to route traffic to another environment. 

    Traffic will be routed to another environment after it has been processed by the entry environment's rules. If this behavior impacts the results of your experiment, then you should use a dedicated routing environment that only contains rules that are applicable for all traffic.

    <Callout type="important">

      If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Edge Functions, or Cloud Functions, then you may only use a dedicated routing environment instead of a shared environment. Using a shared environment with these capabilities may result in `404 Not Found` responses.
    
    </Callout>

    For example, you can route traffic to another environment for the purpose of A/B testing a new feature.

    ![Shared Environment](/images/v7/experimentation-routing-shared-environment.png)

[Learn how to set up environments through the iterative migration example.](/guides/experimentation/iterative_migration)

<Callout type="important">

    If are you using {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Edge Functions, or Cloud Functions and you are proxying traffic to a different environment within the same property, then you may incur additional latency. A workaround for this issue is to proxy traffic between the production environments of two different properties.

    {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, Edge Functions, and Cloud Functions may run in a different region for the production environment than other environments. If you are sending traffic between these environments, then latency is introduced due to traffic being routed between two regions. 

</Callout>

### Destination Environment Setup {/*destination-environment-setup*/}

Before setting up an experiment, you will need to set up each environment to which traffic will be routed. These environments are known as your destination environments. Once you have created the desired environments, you will need to define origin configurations, rules, or both using either through the {{ PORTAL }} or the {{ PRODUCT }} CLI if you are using CDN-as-code.

<Callout type="info">

  The recommended setup is to deploy the configuration for your current site to one environment and the configuration for your new site to a different environment. This setup ensures that the rules for your current site do not affect the new site's behavior.

</Callout>

After which, you should note the domain associated with each deployment's edge link. Sample domains are highlighted below.

![Edge Link's Domain](/images/v7/experimentation-cross-env-experiment-edge-link.png?width=650)

### Entry Environment Setup

Entry environment setup consists of performing the following steps:

1.  Create an origin configuration each for each destination environment.
2.  Optional. Log the `Host` header to identify traffic routed through the entry environment.
3.  Set up an experiment with variants that route traffic to the desired destination environment(s).

#### Origin Configuration {/*origin-configuration*/}

Create an origin configuration within the entry environment. 

-   Set the **Origin Hostname** and **Override Host Header** options to a destination environment's domain.

    <Callout type="important">

    If the destination environment's domain contains `.glb`, then you should remove it. 
    
    For example, you should update `my-org-my-property-production.glb.edgio.link` to `my-org-my-property-production.edgio.link`.

    </Callout>

-   Verify that the **Use the following SNI hint and enforce origin SAN/CN checking** option was autopopulated with the same domain.

[View the corresponding configuration properties for a CDN-as-code setup.](/guides/performance/cdn_as_code/edgio_config#origins)

Your origin configuration should look similar to the following illustration:

![Entry Environment's Origin Configuration](/images/v7/experimentation-cross-env-experiment-origin-configuration.png?width=650)

#### Host Header Logging {/*host-header-logging*/}

If you plan on setting up custom logic for traffic routed from the entry environment, then you should create a rule that sets the host requested by the client (`%{http_host}`) within the `x-forwarded-host` request header.

![Set Request Headers Feature](/images/v7/experimentation-cross-env-experiment-host.png)

After which, you should define custom logic within your code to handle requests that originate from the entry environment.

#### Experimentation Setup {/*experimentation-setup*/}

Create an experiment within the entry environment. Configure each desired variant to point to an origin configuration that points to the desired environment. 

![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

Your experiment should look similar to the following illustration:

![Cross-Environment Experiment](/images/v7/experimentation-cross-env-experiment.png?width=650)

Deploy your changes to the entry environment. We recommend adding a note indicating the start of this experiment.

![Deploy Changes with note](/images/v7/experimentation-deploy-changes.png)

<Callout type="info">

  The variant assigned to a client persists until cookies are cleared. This means that testing this experiment may require clearing your cookies various times or initiating various distinct private browsing sessions. 

</Callout>

## Experiment Conclusion {/*experiment-conclusion*/}

Conclude an experiment by either promoting the new feature or website or reverting to the current website. Perform one of the following procedures:

-   Continue to route traffic through the entry environment by [shifting 100% of the traffic](/applications/experimentation#modify-experiment-traffic-distribution) to the desired environment.

    <Callout type="tip">
    
      Routing all traffic through the entry environment reduces the level of effort required to conclude or start a new experiment.
    
    </Callout>

-   Serve the new website from the entry environment.

    1.  Transition production traffic to the new website by [applying the new website's environment configuration to the entry environment](#manual-cross-environment-deployment).
    2.  [Disabling](/guides/experimentation#enable-disable) or [deleting](/guides/experimentation#delete) the experiment.
    3.   Deploying your changes.

-   Serve the current website from the entry environment.

    1.  Transition production traffic to the legacy website by [rolling back your configuration](/guides/basics/deployments#versioning) to the state prior to this experiment.

        ![Rollback Deployment](/images/v7/basics/deployments-rollback.png?width=450)

            <Callout type="info">

              If you have made changes to your configuration since the start of this experiment, then you should [manually deploy the desired destination environment's configuration to the entry environment](#manual-cross-environment-deployment). 
            
            </Callout>

    2.  [Disabling](/guides/experimentation#enable-disable) or [deleting](/guides/experimentation#delete) the experiment.
    3.   Deploying your changes.

<a id="manual-cross-environment-deployment" />
**To manually deploy a configuration from another environment**

<Callout type="info">

  Use this procedure to apply a destination environment's configuration to the entry environment. However, if you have modified your configuration since the start of the experiment, you should manually deploy the destination environment's configuration to the entry environment.

</Callout>

**{{ PORTAL }}:** If you use the {{ PORTAL }} to deploy, perform the following steps:

1.  Recreate the destination environment's origin configuration within the entry environment.

    The recommended method for recreating origin configurations is described below.
    
    1.  From the destination environment, navigate to the **Origins** page.
    2.  Click **JSON Editor**.
    3.  Copy all of your origin configurations by selecting all of the text and then pressing `CTRL+C`.
    4.  Navigate to the entry environment's **Origins** page. It should already display the JSON editor.
    5.  Perform either of the following steps:
    
        -   Replace the entry environment's origin configurations by selecting all of the text and the pressing `CTRL+V`. 
    
        -   If you need to keep one or more origin configurations, then you should paste the destination environment's origin configurations at the end of the configuration. 

            After which, find the point at which you pasted your configuration. It should look similar to this:

            ```
            ...
              }
            ][
              {
            ...
            ```

            Replace those brackets with a comma as shown below.

            ```
            ...
              },
              {
            ...
            ```
    6.  Click **Origins Editor**. Verify that destination environment's origin configurations were successfully moved over. 
2.  Recreate the destination environment's rules within the entry environment.

    The recommended method for recreating rules is described below.

    1.  From the destination environment, navigate to the **Rules** page.
    2.  Click **JSON Editor**.
    3.  Copy all of your rules by selecting all of the text and then pressing `CTRL+C`.
    4.  Navigate to the entry environment's **Rules** page. It should already display the JSON editor.
    5.  Replace the entry environment's rules by selecting all of the text and the pressing `CTRL+V`. 
    6.  Click **Rules Editor**. Verify that destination environment's rules were successfully moved over. 

3.  Deploy your changes by clicking **Deploy Changes**.

**CDN-as-Code:** If you use the {{ PRODUCT }} CLI to deploy, perform the following steps:

1.  If your destination environment uses origin configurations, merge them into the entry environment's configuration.

    From the {{ CONFIG_FILE }}, find the `environments` key and then merge the configuration for your destination's environment within the entry environment. 

    In the following code excerpt, an origin configuration was moved from the `staging` environment to the `production` environment:
    
    ```js filename="routes.js"
      ...
      // environments: {
         production: {
           hostnames: [{ hostname: 'www.mysite.com' }],
           origins: [
             {
               name: 'origin',
               hosts: [{ location: 'staging-origin.mysite.com' }],
               override_host_header: 'staging-origin.mysite.com',
             },
           ],
         },
         staging: {
           hostnames: [{ hostname: 'staging.mysite.com' }],
         },
       },
       ...
    ```
2.  Review and revise your {{ ROUTES_FILE }} file for code that is specific to your destination environment or the test being performed. 
3.  Deploy your updated configuration to the entry environment.

    `{{ FULL_CLI_NAME }} deploy --environment=<ENTRY_ENVIRONMENT>`