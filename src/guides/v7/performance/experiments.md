---
title: Experimentation
---

Experimentation allows you to serve different website experiences to your clients. Typically, it is used for canary releases, trunk-based development, dark releases, feature releases, and segmented releases. 

**Sample Use Cases:**

-   Send 5% of your traffic to a new version of your website, while the rest of your clients continue to use the existing version of your website.
-   Send 20% of your traffic to a different homepage. 
-   Split traffic between three calls to actions to compare effectiveness. 

## Quick Start {/*quick-start*/}

Set up your experiments through the following steps:

1.  Identify the environment (e.g., `production`) that will be configured.
2.  Define one or more experiment(s) for that environment. For each experiment, you must define two or more variants. Each variant identifies the percentage of traffic to which a set of actions will be applied.
3.  Apply your experiment(s) to that environment by deploying your changes.

## How Does It Work? {/*how-does-it-work*/}

If a request satisfies the criteria for one or more experiments, it is assigned the `{{ HEADER_PREFIX }}-experiments-info` cookie. This cookie identifies each variant of an experiment that has been assigned to the client. A variant identifies the set of actions that will be applied to the request. This cookie will persist until your experiment configuration changes. 

## {{ HEADER_PREFIX }}-experiments-info Cookie {/*-experiments-cookie*/}

The `{{ HEADER_PREFIX }}-experiments-info` cookie identifies the variants that have been assigned to a client. It uses the following syntax for each variant that has been assigned to a client:

`%22<EXPERIMENT>_<BUCKET>%22:%22<VARIANT>_<VARIANT ID>%22`

The above variables are defined below:

-   `<EXPERIMENT>`**:** The name of the experiment.
-   `<BUCKET>`**:** The system-defined ID of the bucket assigned to the client.
-   `<VARIANT>`**:** The name of the variant.
-   `<VARIANT ID>`**:** The variant's system-defined ID.

If multiple experiments have been applied to the client, then they will be delimited by a comma.

**Sample {{ HEADER_PREFIX }}-experiments-info Cookie:**

`{{ HEADER_PREFIX }}-experiments-info=%7B%22Landing_page_1238476236%22:%22New_landing_page_816213%22,%22Banner_8123712%22:%22Existing_banner_712312%22%7D`

## Experiments {/*experiments*/}

An experiment:

-   Identifies the set of traffic to which it will be applied.
-   Contains two or more variants. Each variant identifies the percentage of traffic to which its actions (aka [features](/guides/performance/rules/features) will be applied. 
    
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

## Managing Experiments

You may create, enable, disable, and delete experiments.

**Key information:**

-   An experiment is read-only once it has been deployed. However, you may enable, disable, or delete it at anytime.
-   Apply your changes to the current environment by clicking **Deploy Changes**.

**To create an experiment**

1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Click **+ Add Experiment**.
3.  From the **Name** option, assign a name to the experiment. 

    {{ PRODUCT }} populates the `{{ HEADER_PREFIX }}-experiments-info` cookie with this name. 

4.  Optional. Restrict this experiment to a subset of your website traffic by defining one or more criterion.

    1.  Click **+ Add Criteria**.
    2.  From the **Variable** option, select the desired [variable](/guides/performance/rules/feature_variables).

        For example, you may identify requests by HTTP method, path, or request headers.

    3.  Define how a request will be compared against a value or state. In some cases, this involves selecting a [comparison operator](/guides/performance/rules/operators) and defining the value that will be compared against the request.
    4.  Click **Add Condition**.
    5.  Optional. Add another match criterion by repeating steps 4.1 - 4.4. Repeat this step as needed.
5.  Define two or more variants.
    1.  From the **Name** option, assign a name to this variant. 

        {{ PRODUCT }} populates the `{{ HEADER_PREFIX }}-experiments-info` cookie with this name. 

    2.  Set the **Percentage** option to the percentage of this experiment's traffic to which this variant will be applied.
    
        <Callout type="info">

          The traffic percentage defined for all variants must add up to 100%. For example, if you have 3 variants and you have assigned 33% to 2 of them, then the third variant must be assigned 34% (33% + 33% + 34% = 100). 
        
        </Callout>

    3.  Define the set of actions that will be applied to traffic assigned to this variant.
    
        1.  Click **+ Add Action**. 
        2.  Select the desired [feature](/guides/performance/rules/features). 
        3.  Configure the selected feature.
        4.  Click **Add Feature**.
        5.  Optional. Add another action by repeating steps 5.3.1 - 5.3.4. Repeat this step as needed.

    4.  Configure the second variant by repeating steps 5.1 - 5.3.
    5.  Optional. Add and configure another variant. Repeat this step as needed.

        1. Click **+ Add Variant**.
        2. Repeat steps 5.1 - 5.3.

6.  Apply your experiment(s) to your traffic by clicking **Deploy Changes**.

<Callout type="important">

  Once you have deployed an experiment, it cannot be changed. 
  
  If you must modify a deployed experiment, then you will need to recreate it and then delete the old experiment.

</Callout>

**To enable or disable an experiment's status**

1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Perform either of the following steps:

    -   **Enable:** From the desired experiment, toggle the **Active** option to the on position (<Image inline src="/images/v7/icons/toggle-on-large.png" alt="Toggle on" />).
    -   **Disable:** From the desired experiment, toggle the **Active** option to the off position (<Image inline src="/images/v7/icons/toggle-off-large.png" alt="Toggle on" />).
    
3.  Click  **Deploy Changes**.

**To delete an experiment**

1.  Load the **Experimentation** page.

    {{ ENV_NAV }} **Experimentation**.

2.  Click on the <Image inline src="/images/v7/icons/delete-5.png" alt="Delete" /> icon next to the desired experiment.
3.  When prompted, confirm the deletion by clicking **Delete experiment**.
4.  Click  **Deploy Changes**.