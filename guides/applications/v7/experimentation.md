---
title: Experimentation
---

Experimentation allows you to serve different website experiences to your clients. Typically, it is used for A/B testing, canary releases, trunk-based development, dark releases, feature releases, and segmented releases. 

**Sample Use Cases:**

-   Send 5% of your traffic to a new version of your website, while the rest of your clients continue to use the existing version of your website.
-   Send 20% of your traffic to a different homepage. 
-   Split traffic between three calls to actions to compare effectiveness. 

## Quick Start {/*quick-start*/}

Set up your experiments through the following steps:

1.  Identify the environment (e.g., `production`) that will be configured.
2.  Define one or more experiment(s) for that environment. 

    For each experiment, you must define two or more variants. Each variant identifies the percentage of traffic to which a set of actions will be applied.
3.  Apply your experiment(s) to that environment by deploying your changes.

## How Does It Work? {/*how-does-it-work*/}

Once you have deployed at least one experiment, then each client will be assigned a random value from 0 - 99 through the `{{ HEADER_PREFIX }}-experiments` cookie. This value will persist until the client clears their cookies. This random value is critical for determining the variant(s) that will be assigned to the client. An experiment must contain two or more variants and each variant identifies the set of actions that will be applied to a request.

A client is eligible to participate in an experiment if the request satisfies the experiment's criteria. {{ PRODUCT }} processes the request with the set of actions associated with each variant assigned to the client. 

<Callout type="info">

  {{ PRODUCT }} checks an experiment's criteria after it has processed the request through Rules. 

</Callout>

{{ PRODUCT }} adds [experimentation metadata](#experimentation-metadata) to each experiment-eligible request. Specifically, it adds a header to the request sent from {{ PRODUCT }} to the origin and it adds metadata to the response sent from {{ PRODUCT }} to the client. This allows you to use variant information within your application(s). 

<Callout type="tip">

  The [{{ PRODUCT }} Experimentation repository (https://github.com/Edgio/Experimentation)](https://github.com/Edgio/Experimentation) contains utilities to facilitate the extraction of experiment and variant metadata.

</Callout>

<Callout type="info">

  {{ PRODUCT }} uses a different formula to calculate the cache key for requests that satisfy at least one experiment. [View the cache key syntax.](/guides/performance/caching/cache_key#cache-key-reference)

</Callout>

## Experiments {/*experiments*/}

An experiment:

-   Identifies the set of traffic to which it will be applied.
-   Contains two or more variants. Each variant identifies the percentage of traffic to which its actions (aka [features](/guides/performance/rules/features)) will be applied. 

A single experiment with three variants is illustrated below.

![Experimentation](/images/v7/experimentation-components.png?width=950)


### Criteria {/*criteria*/}

You may define criteria that identifies the set of traffic to which an experiment will be applied. If you do not define any criteria, then the experiment is applicable to all requests. 

Set up each desired match criteria by: 

1.  Selecting the [type of variable](/guides/performance/rules/feature_variables).

    For example, you may identify requests by HTTP method, path, or request headers.

2.  Defining how a request will be compared against a value or state. In some cases, this involves selecting a comparison operator and defining the value that will be compared against the request.

### Variants {/*variants*/}

A variant identifies the percentage of traffic to which a set of actions (aka [features](/guides/performance/rules/features)) will be applied. The available actions are categorized as follows:

-   [Access](/guides/performance/rules/features#access): Controls access to content.
-   [Caching](/guides/performance/rules/features#caching): Customizes when and how content is cached.
-   [Client](/guides/performance/rules/features#client): Controls how the client communicates with our CDN.
-   **Comment:** Adds a note or metadata to your configuration. This feature is solely informational and does not affect your configuration.
-   [Headers](/guides/performance/rules/features#headers): Adds, modifies, or deletes headers from the request or response.
-   [Logs](/guides/performance/rules/features#logs): Customizes how log data is stored.
-   [Origin](/guides/performance/rules/features#origin): Controls how the CDN communicates with an origin server.
-   [Response](/guides/performance/rules/features#response): Customizes the response sent to the client and determines whether we will allow prefetching instructions to be sent to the client.
-   [Set Variables](/guides/performance/rules/features#set-variables): Assigns a value to one or more user-defined variable(s) that are  passed to your bespoke traffic processing solution.
-   [URL](/guides/performance/rules/features#url): Redirects or rewrites requests to a different URL.

## Managing Experiments {/*managing-experiments*/}

You may create, enable, disable, and delete experiments. You may also adjust the distribution of traffic between variants.

**Key information:**

-   An experiment is read-only once it has been deployed. However, you may enable, disable, or delete it at anytime.
-   Apply your changes to the current environment by clicking **Deploy Changes**.

**To create an experiment**

1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Click **+ Add Experiment**. A blank experiment configuration will appear.

    ![Experimentation](/images/v7/experimentation-blank.png?width=450)

3.  From the **Name** option, assign a name to the experiment. 

    {{ PRODUCT }} populates the `{{ HEADER_PREFIX }}-experiments-info` upstream request header with this name. 

4.  Optional. Restrict this experiment to a subset of your website traffic by defining one or more criterion.

    1.  Click **+ Add Criteria**.
    2.  From the **Variable** option, select the desired [variable](/guides/performance/rules/feature_variables).

        For example, you may identify requests by HTTP method, path, or request headers.

        ![Experimentation](/images/v7/experimentation-add-condition.png?width=350)

    3.  Define how a request will be compared against a value or state. In some cases, this involves selecting a [comparison operator](/guides/performance/rules/operators) and defining the value that will be compared against the request.
    4.  Click **Add Condition**.
    5.  Optional. Add another match criterion by repeating steps 4.i - 4.iv. Repeat this step as needed.
5.  Define two or more variants.
    1.  From the **Name** option, assign a name to this variant. 

        {{ PRODUCT }} populates the `{{ HEADER_PREFIX }}-experiments-info` upstream request header with this name. 

    2.  Set the **Percentage** option to the percentage of this experiment's traffic to which this variant will be applied.
    
        <Callout type="info">

          The traffic percentage defined for all variants defined within a specific experiment must add up to 100%. For example, if you have 3 variants and you have assigned 33% to 2 of them, then the third variant must be assigned 34% (33% + 33% + 34% = 100). 
        
        </Callout>

    3.  Define the set of actions that will be applied to traffic assigned to this variant.
    
        1.  Click **+ Add Action**. 
        2.  Select the desired [feature](/guides/performance/rules/features). 
        3.  Configure the selected feature.
        4.  Click **Add Feature**.
        5.  Optional. Add another action by repeating steps 5.iii.a - 5.iii.d. Repeat this step as needed.

    4.  Configure the second variant by repeating steps 5.i - 5.iii.
    
        Your configuration should now look similar to this one:
        
        ![Experimentation](/images/v7/experimentation-variants.png?width=350)

    5.  Optional. Add and configure another variant. Repeat this step as needed.

        1. Click **+ Add Variant**.
        2. Repeat steps 5.i - 5.iii.

6.  Apply your experiment(s) to your traffic by clicking **Deploy Changes**.

<Callout type="important">

  Once you have deployed an experiment, you may only modify how traffic is distributed between variants. 
  
  If you must modify a deployed experiment's criteria, variables, or actions, then you will need to recreate it and then delete the old experiment.

</Callout>

**To modify an experiment's traffic distribution**
1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Modify the desired variant's traffic percentage.

    1.  Expand the desired experiment.
    2.  Find the desired variant and set its **Percentage** option to the desired percentage of this experiment's traffic.
    3.  Repeat the previous step for each of the experiment's variants. 
    
        Make sure that the sum of the traffic percentages assigned to all variants within that experiment add up to 100%.

3.  Apply your changes by clicking **Deploy Changes**.

**To enable or disable an experiment's status**

1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Perform either of the following steps:

    -   **Enable:** From the desired experiment, toggle the **Active** option to the on position (<Image inline src="/images/v7/icons/toggle-on-large.png" alt="Toggle on" />).
    -   **Disable:** From the desired experiment, toggle the **Active** option to the off position (<Image inline src="/images/v7/icons/toggle-off-large.png" alt="Toggle off" />).
    
3.  Click  **Deploy Changes**.

**To delete an experiment**

1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Click on the <Image inline src="/images/v7/icons/delete-5.png" alt="Delete" /> icon next to the desired experiment.
3.  When prompted, confirm the deletion by clicking **Delete experiment**.
4.  Click  **Deploy Changes**.

## Sending Traffic to a Different Environment {/*sending-traffic-to-a-different-environment*/}

You may use Experimentation to send traffic to another environment either within the same or a different property. For example, you can validate a feature release by sending some production traffic to an environment where that feature release is hosted.

<Callout type="info">

    If you are using either {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or Edge Functions and you are proxying traffic to a different environment within the same property, then you may incur additional latency. A workaround for this issue is to proxy traffic between the production environments of two different properties.

    {{ PRODUCT }} {{ PRODUCT_PLATFORM }} and Edge Functions may run in a different region for the production environment than other environments. If you are sending traffic between these environments, then latency is introduced due to traffic being routed between two regions. 

</Callout>

### How Does Proxying Traffic Work? {/*how-does-proxying-traffic-work*/}

{{ PRODUCT }} processes all requests using our [standard order of operations](/guides/v7/performance/request#order-of-operations). However, traffic that is sent to another environment will be processed by the rules for both environments as indicated below. 

-   **Source Environment:** {{ PRODUCT }} will apply the source environment's rules to the request. 
-   **Target Environment:** {{ PRODUCT }} will only apply features that affect the response sent to the client. These features take precedence over the ones defined within the source environment's rules.

In addition to rule processing, you may choose to add custom logic to your origin server that alters the behavior based off of the host requested by the client.

### Cross-Environment Prerequisite {/*cross-environment-prerequisite*/}

A prerequisite for this use case is that both environments must use our Payment Card Industry (PCI) compliant network. 

**To check whether an environment is PCI-compliant**

    {{ ENV_NAV }} **Settings**.

    5.  Check the **PCI Status** section. 

        <Callout type="tip">

          Contact our [technical customer support]({{ HELP_URL }}) to switch your environments to our PCI-compliant network.

        </Callout>

### Setting Up Cross-Environment Traffic {/*setting-up-cross-environment-traffic*/}

Set up this workflow by performing the following steps:

1.  Identify the environment from which traffic will originate. We will refer to this environment as the source environment. 

    For example, you could potentially designate your `production` or `default` environment as the source environment.

2.  Identify the environment to which traffic will be proxied. We will refer to this environment as the target environment. 

    For example, you could potentially designate a "staging" environment as the target environment.

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

## Experimentation Metadata {/*experimentation-metadata*/}

{{ PRODUCT }} provides experimentation metadata to the client and origin server.

-   **Client:** {{ PRODUCT }} sets the `{{ HEADER_PREFIX }}-experiments` cookie and the `server-timing` response header.
-   **Origin:** {{ PRODUCT }} sets the `{{ HEADER_PREFIX }}-experiments-info` header for requests proxied from our network to the origin.

<Callout type="tip">

  The [{{ PRODUCT }} Experimentation repository (https://github.com/Edgio/Experimentation)](https://github.com/Edgio/Experimentation) contains utilities to facilitate the extraction of experiment and variant metadata.

</Callout>

#### {{ HEADER_PREFIX }}-experiments Cookie {/*-experiments-cookie*/}

This cookie assigns a value from 0 - 99 to a client. Once a client has been assigned a number, it will persist until the client clears their cookies. This ensures a consistent experience across multiple browsing sessions. 

**Sample Cookie:** 

`{{ HEADER_PREFIX }}-experiments=24`

#### {{ HEADER_PREFIX }}-experiments-info Upstream Request Header {/*-experiments-info-upstream-request-header*/}

The `{{ HEADER_PREFIX }}-experiments-info` request header tracks the variants assigned to a client. {{ PRODUCT }} adds this header to requests proxied through our network to the origin or the {{ PRODUCT }} cloud. 

<Callout type="important">

  {{ PRODUCT }} does not currently add this header to requests processed by Edge Functions. However, we plan on adding this header to requests forwarded to Edge Functions in the future. 

</Callout>

It contains the following syntax for each variant that has been assigned to a client:

`%22<EXPERIMENT>_<BUCKET>%22%3A%22<VARIANT>_<VARIANT ID>%22`

The above variables are defined below: 

-   `<EXPERIMENT>`**:** The name of the experiment.
-   `<BUCKET>`**:** The system-defined ID of the bucket assigned to the client.
-   `<VARIANT>`**:** The name of the variant. If the client has not been assigned to a variant, then it will return `null` instead of `<VARIANT>_<VARIANT_ID>`. 
-   `<VARIANT ID>`**:** The variant's system-defined ID.

<Callout type="info">

  If multiple experiments have been applied to the client, then they will be delimited by a comma. 

</Callout>

**Sample Value:** 

`{{ HEADER_PREFIX }}-experiments-info: %7B%22Landing_page_1238476236%22%3A%22New_landing_page_816213%22,%22Banner_8123712%22:%22Existing_banner_712312%22%7D`

The decoded version of the above URL-encoded value is:

`{"Landing_page_1238476236":"New_landing_page_816213","Banner_8123712":"Existing_banner_712312"}`

#### Server-Timing Response Header {/*server-timing-response-header*/}

The `server-timing` response header tracks the variants assigned to a client. It contains the following syntax for each variant that has been assigned to a client:

`experiments;desc=%7B%22<EXPERIMENT>_<BUCKET>%22%3A%22<VARIANT>_<VARIANT ID>%22%7D`

<Callout type="info">

  Definitions for the above variables are provided within the [{{ HEADER_PREFIX }}-experiments-info Upstream Request Header section](#-experiments-info-upstream-request-header).

</Callout>

**Sample Server-Timing Response Header:** 

`edgio_cache;desc=UNCACHEABLE,edgio_pop;desc=lac,edgio_country;desc=US,experiments;desc=%7B%22myexperiment_1695661110792%22%3A%22altlandingpage_1695661135500%22%7D`
