---
title: Getting Started with {{ PRODUCT_EDGE }}
---

Get started with {{ PRODUCT_EDGE }} by performing these steps:

1.  Create a property. If you have already performed this step, proceed to the next step.

    [Learn more.](/applications/getting_started)

2.  Create rules that define how {{ PRODUCT }} handles your traffic.

    <Callout type="info">

      If you prefer code to UI, then try our [CDN-as-code approach](/applications/performance/cdn_as_code/getting_started) to configuration instead. 

    </Callout>

3.  Deploy your updated property to {{ PRODUCT }}.

4.  Serve production traffic over {{ PRODUCT }} by updating your site's DNS to point to our service.

Deploying your web application behind {{ PRODUCT }} optimizes the delivery of your site. As illustrated below, requests for your site will pass through {{ PRODUCT }}'s globally distributed edge network to your origin server.

![traffic](/images/starter/traffic.png)

## Creating Rules {/*creating-rules*/}

Rules determine how requests to a specific environment will be processed by {{ PRODUCT }}. 

#### Rule #1: Default Caching Policy {/*default-caching-policy*/}

We will now create a rule that applies a default caching policy to all traffic for the `production` environment.

1.  Load the **Rules** page.

    {{ ENV_NAV }} **Rules**.

    ![Rules landing page](/images/v7/performance/rules-blank.png?width=450)

2.  Add a rule by clicking **+ Add Rule**.

    <Callout type="info">

      You may add conditions and features to a rule. A condition identifies a set of requests and a feature defines the action that will be applied to them.

      We will not add a condition to this rule. A rule without a condition applies to all requests. 

    </Callout>

3.  Define a default policy for how long your clients (e.g., web browsers) will cache your content.

    1.  Click **+ Add Feature**.

    2.  Select `Set Client Max Age`.

        <Callout type="tip">

          Typing automatically filters this list. If you can't remember the name of the feature, type a keyword (e.g., `Age`) to filter the list for relevant results.

        </Callout>

    3.  Set the duration to 5 minutes. 

        ![Add Feature](/images/v7/performance/rules-add-feature.png?width=450)

    4.  Click **Add Feature**.

        Your rule should now look similar to this:

        ![Rule with 1 Feature](/images/v7/performance/rules-rule-with-1-feature.png)

4.  Define a default policy for how long our CDN will cache your content for `200 OK` responses.

    1.  Click **+ Add Feature**.

    2.  Select `Set Max Age`.

        <Callout type="info">

          You may notice that `Set Client Max Age` is no longer available for selection. This is due to the fact that you may only add a feature a single time per rule.

        </Callout>

    3.  Set the duration to 1 day for `200 OK` responses.

        ![Add Feature](/images/v7/performance/rules-add-feature-2.png?width=450)

    4.  Click **Add Feature**.

        Your rule should now look similar to this:

        ![Rule with 1 Feature](/images/v7/performance/rules-rule-with-2-features.png)

#### Rule #2: Path-Specific Caching Policy {/*path-specific-caching-policy*/}

We will now create a rule that applies a different caching policy for requests whose relative path starts with `/news/`. In order to allow this rule to override your default caching policy, it needs to be positioned below your initial rule.

1.  Add a rule by clicking **+ Add Rule**.
2.  Define the type of requests to which this rule will be applied.

    1.  Click **+Add Condition**.
    2.  Select `Path`.
    3.  Leave the **Operator** option to `matches (simple)`.
    4.  Match for requests whose relative path starts with `/news/` by setting the **Match Value** option to: `/news/:path*`

        <Callout type="info">

          The `matches (simple)` operator supports named parameters. A named parameter (e.g., `:path`) represents a URL segment. Appending a `*` matches everything that follows that URL segment.

        </Callout>

        Your condition should now look like this:

        ![Add Condition](/images/v7/performance/rules-add-condition.png?width=450)

    5.  Click **Add Condition**.

3.  Define how long our CDN will cache content for `200 OK` responses to the requests identified in the previous step.

    1.  Click **+ Add Feature**.
    2.  Select `Set Max Age`.
    3.  Set the duration to 1 minute for `200 OK` responses.
    4.  Click **Add Feature**.

        Your rule should now look similar to this:

        ![Rule with 1 Feature](/images/v7/performance/rules-2-rules.png?width=450)

## Deploying Your Property {/* deploy-to */}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. 

1.  Click **Deploy Changes** from any page within the `production` environment.

    ![Deploy Changes](/images/v7/performance/rules-deploy-changes.png?width=450)

2.  When prompted, provide a brief description for this change and then click **Deploy Changes**.

    **Example:** `Setting a default caching policy and a caching policy for /news/ requests.`

3.  From the left-hand pane, select **Deployments**.

4.  View the deployment by clicking on the version number (e.g., `#2`) for the latest deployment. 

    ![View Deployment](/images/v7/performance/deployments-version-number.png?width=450)

5.  Preview your site by clicking the second edge link displayed under the **URL** section.

    ![Preview Site](/images/v7/performance/deployments-second-url.png?width=450)

Congratulations on deploying a caching policy to {{ PRODUCT }}! 

You are now ready to:

-   Assess performance and caching behavior through [Edge Insights](/applications/performance/observability/edge_insights)  and [Core Web Vitals](/applications/performance/observability/core_web_vitals). 
-   Fine-tune your configuration by adding rules and then redeploying your property. 
-   Once you are ready to serve production traffic through {{ PRODUCT }}, update your site's DNS to point to our service.

    [Learn more.](/applications/basics/hostnames_and_origins#serving-traffic-through)
