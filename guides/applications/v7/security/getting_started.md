---
title: Getting Started with Security
---

Learn how to set up a basic security policy through which you can secure your web applications against malicious and unwanted traffic.

## Prerequisites {/*prerequisites*/}

{{ PRODUCT }} can only secure traffic that it serves. Before defining a security policy, you should first:

1.  Identify or create an [organization](/applications/basics/collaboration#managing-teams).
2.  [Set up content delivery](/applications/getting_started) through a property that belongs to the organization identified in the previous step.

<Tip>

  {{ PRODUCT }} allows all organizations to set up basic security through {{ PRODUCT_SECURITY }} Insights. However, we also offer more comprehensive solutions. {{ ACCOUNT_UPGRADE }}

</Tip>

## <a id="basic-security-setup" />Setup Overview {/*setup-overview*/}

Setting up security requires creating rules that determine how your traffic will be secured, identifying the set of traffic that will be secured, and then monitoring flagged traffic to verify or fine-tune your security configuration.

![Setting up security in three steps](/images/v7/security/setup_overview.png)

## Step 1: Create Rules {/*step-1-create-rules*/}

Step-by-step instructions on how to create a basic access rule, rate rule, and managed rule are provided below.

### Create an Access Rule {/*create-an-access-rule*/}

Create an access rule that identifies traffic that should be allowed, denied, or screened through whitelists, accesslists, and blacklists.

1.  Navigate to the **Access Rules** page.
    {{ SECURITY_NAV }} **Access Rules**.
2.  Click **+ New Access Ruleset**.
3.  In the **Name of Rule** option, type `My Access Rule`.
4.  From the **Add an Access Control** option, select *IP*.
5.  Click **+ blacklist**.
6.  From within this blacklist section, add an IP address from which suspicious traffic originates by typing it and then pressing `ENTER`. Repeat this step as needed.

    ![](/images/v7/security/getting_started_access_rules.png?height=400)

7.  Click **Save**.


### Create a Rate Rule {/*create-a-rate-rule*/}

Create a rate rule that restricts the flow of traffic from a client to your application to 100 requests per minute.

1.  Navigate to the **Rate Rules** page.
    {{ SECURITY_NAV }} **Rate Rules**.
2.  Click **+ New Rate Ruleset**.
3.  In the **Name** option, type `My Rate Rule`.
4.  In the **Rate Limit** option, type `100`.
5.  From the **Time period** option, select *1 minute*.
6.  From the **Apply rate limit to** option, select *IP address*.

    ![](/images/v7/security/getting_started_rate_rules.png?width=600)

7.  Verify that the **Rule Status** option is set to **On**.
8.  Click **Save**.

<Info>

  Certain services and applications, such as VPNs, mask a client’s IP address. Specifically, they will report an IP address of their choosing instead of the client’s real IP address. As a result, multiple devices and perhaps even users may end up sharing the same IP address.

</Info>

### Create a Managed Rule {/*create-a-managed-rule*/}

Create a managed rule that leverages predefined rules to detect application layer attacks.

1.  Navigate to the **Managed Rules** page.
    {{ SECURITY_NAV }} **Managed Rules**.
2.  Click **+ New Managed Ruleset**.
3.  In the **Name** option, type `My Managed Rule`.
4.  Click the **Inbound Policies** tab.
5.  Set the **Threshold** option to *5*.
6.  Verify that the **Paranoia Level** option is set to *1*.
7.  From the **Policies** section, disable policies that do not apply to your application.

    For example, you may safely disable **Adv Drupal**, **Adv SharePoint**, and **Adv WordPress** if your application does not leverage those platforms.

    ![](/images/v7/security/getting_started_managed_rule.png?width=600)

8.  Click **Save**.

## Step 2: Create a Security Application {/*step-2-create-a-security-app*/}

A Security Application configuration defines the set of traffic that will be inspected and defines the security policy that will be applied to it. Instructions on how to create a Security Application configuration for all of your site's traffic is provided below.

1.  Navigate to the **Security Application Manager** page.
    {{ SECURITY_NAV }} **Application Manager**.
2.  Click **+ Create New**.
3.  In the **Security Application Name** option, type `My Security App` and then click **Continue**.
4.  From the **Select the rules you would like to add or create** section, click **Access Rule**.
5.  From the **Production Access Rule** option, select *My Access Rule*.
6.  From the **Production action** option, select *Alert only*.
7.  From the **Rules** section, click **Rate Rules**.
8.  From the **Add Rate Rule** option, select *My Rate Rule*.
9.  From the **Action** option, select *Drop*.
10. From the **Rules** section, click **Managed Rule**.
11. From the **Production Managed Rule** option, select *My Managed Rule*.
12. From the **Production action** option, select *Alert only*.

    ![](/images/v7/security/getting_started_security_app.png?width=600)

13. Click **Save**.

## Step 3: Monitor Threats {/*step-3-monitor-threats*/}

The Security dashboard illustrates threat detection trends and lists recent requests that violated your security policy. This dashboard is a useful tool for:

-   Verifying that a new or an updated security policy will not impact legitimate traffic.
-   Analyzing threats directed to your site.

**Key tips:**

-   Adjust the dashboard's time period from the upper-right hand corner.

    ![](/images/v7/security/dashboard_time_range.png?height=250)

-   View all events by selecting **Total Events** or restrict it to a subset of threats by clicking on another tab (i.e., **WAF Events**, **Bot Events**, **Rate Events**, or **Client Events**). 

    ![](/images/v7/security/dashboard_event_type_selection.png)

-   [Filter the dashboard](/applications/security/dashboard#filters) to analzye specific trends.

### Data Gathering {/*data-gathering*/}

After your Security Application configuration has been implemented, time needs to pass to allow {{ PRODUCT_SECURITY }} to
gather sufficient data from which trends may be detected. Wait a reasonable amount of time (e.g., 24 hours) after setting up a Security Application configuration before performing data analysis.

### Identify Trends {/*identify-trends*/}

Identify trends by reviewing the **Threats** view of the Security dashboard.

1.  Navigate to the Security dashboard.

    {{ SECURITY_NAV }} **Dashboard**. Verify that the **Threats** tab is active.
2.  Review the top graph. Check for an abnormally high number of detected threats.

### Analyze Individual Threats {/*analyze-individual-threats*/}

Ensure that {{ PRODUCT_SECURITY }} is correctly identifying threats by viewing detailed information on detected threats.

1.  From the right-hand pane, filter threats by clicking on the desired rule message, URL, user agent, etc.

    -   If an alert was generated for a legitimate request, scroll down to the `URL` section of the right-hand pane and click on the desired URL. After which, expand a request from the `Log Events` section and then review the **Rule Tags**, **Matched On**, and **Matched Value** fields to see why the request was flagged.

        -   Check whether the web application may be changed to prevent this type of request from occurring.
        -   Our recommendation is that all of the following conditions be met before disabling a rule:

            -   Your application cannot be updated to reduce false positives.
            -   A [rule exception](/applications/security/managed_rules#rule-exceptions) cannot be created to eliminate false positives.
            -   A significant number of requests will be impacted by this rule.

            <Callout type="info">

              You may safely disable a threat detection policy if it secures a platform (e.g., Drupal, SharePoint, and WordPress) that is not leveraged by your application.

            </Callout>

            If you must disable a rule, then note the values for the **Rule Tags** and **Rule ID** fields.

            -   The **Rule Tags** field identifies the threat detection policy.
            -   Look for the rule ID defined in the **Rule ID** fields within your managed rule's policy. Disable that rule.

                <Callout type="tip">

                  You may filter rules by ID when viewing a managed rule's policy.

                </Callout>
