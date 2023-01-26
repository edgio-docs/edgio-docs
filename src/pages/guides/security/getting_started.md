---
title: Securing Your Web Applications ({{ PRODUCT_SECURITY }})
---

Our security offering is
designed to secure your web applications against malicious and unwanted traffic.
The core methods through which it secures site traffic are listed below.

-   Leverages our distributed worldwide network to provide protection
    against large-scale distributed denial of service (DDoS) attacks.
-   Screens traffic for the purpose of identifying application layer
    attacks.
-   Filters traffic by defining access controls and predefined security
    screening rules.
-   Restricts the rate at which requests may flow to your application.

## Prerequisites {/*prerequisites*/}

Before you can secure your traffic, you will need an {{ COMPANY_NAME }} site configuration for the desired website. Perform the following steps to create a site configuration:	

1.  If you do not already have an {{ COMPANY_NAME }} account, then you should <a href="{{ APP_URL }}/signup">sign up for a free account</a>.
2.  Once you have confirmed your email and accepted our terms of service, you will be prompted for your site's URL. Once you have provided it, click **Launch my site**.

<Callout type="tip">

  {{ PRODUCT }} provides basic application layer security to all accounts. However, we also offer more comprehensive solutions. {{ ACCOUNT_UPGRADE }}

</Callout>

## Basic Security Setup {/*basic-security-setup*/}

Setting up security requires creating rules that determine how your traffic will be secured, identifying the set of traffic that will be secured, and then monitoring flagged traffic to verify or fine-tune your security configuration.

![](/images/app_security/setup_overview.png)

## Step 1: Create Rules {/*step-1-create-rules*/}

Step-by-step instructions on how to create an access rule, rate rule,
and managed rule are provided below.

<Callout type="tip">

  This tutorial covers how to set up basic application layer protection. However, our Business and Premier customers may use a [custom rule](custom_rules) to identify
  threats using custom criteria that takes into account your site's
  traffic profile to identify specific threats and to avoid false positives.

</Callout>

### Create an Access Rule {/*create-an-access-rule*/}

Create an access rule that identifies traffic that should be allowed,
denied, or screened through whitelists, accesslists, and blacklists.

1.  Navigate to the **Access Rules** page.
    {{ SECURITY_NAV }} **Access Rules**.
2.  Click **Add Access Rule**.
3.  In the **Name** option, type *My Access Rule*.
4.  From the **Add an Access Control** option, select **IP**.
5.  Click **Add Blacklist**.
6.  Specify an IP address from which suspicious traffic originates.
7.  Specify an additional IP address on a separate line. Repeat this step as needed.

    [View sample configuration.](/images/app_security/getting_started_access_rules.png)

7.  Click **Save**.


### Create a Rate Rule {/*create-a-rate-rule*/}

Create a rate rule that restricts the flow of traffic from a client to your application to 100 requests per minute.

1.  Navigate to the **Rate Rules** page.
    {{ SECURITY_NAV }} **Rate Rules**.
2.  Click **Add Rate Rule**.
3.  In the **Rule name** option, type *My Rate Rule*.
4.  In the **Apply rate limit to** option, select **IP address**.
5.  In the **Rate limit** section, set the **Number of requests** option to *100* and the **Time period** option to **1 minute**.

    [View sample configuration.](/images/app_security/getting_started_rate_rules.png)

6.  Click **Save**.

### Create a Managed Rule {/*create-a-managed-rule*/}

Create a managed rule that leverages predefined rules to detect
application layer attacks.

1.  Navigate to the **Managed Rules** page.
    {{ SECURITY_NAV }} **Managed Rules**.
2.  Click **Add Managed Rule**.
3.  In the **Name** option, type *My Managed Rule*.
4.  Click the **Policies** tab. In the **Ruleset** option, select **ECRS 2022-08-10**.
5.  Set the **Threshold** option to **5**.
6.  Set the **Paranoia Level** option to **1**.
7.  From the **Policies** section, disable policies that do not apply to your application. For example, you may safely disable **Adv Drupal**, **Adv SharePoint**, and **Adv WordPress** if your application does not leverage those platforms.

    [View sample configuration.](/images/app_security/getting_started_managed_rule.png)

8.  Click **Save**.

## Step 2: Create a Security Application Configuration {/*step-2-create-a-security-application-configuration*/}

A Security Application configuration defines the set of traffic that will be inspected and identifies the security policy that will be applied to it. Instructions on how to create a Security Application configuration for all of your site's traffic is provided below.

1.  Navigate to the **Security Applications** page.
    {{ SECURITY_NAV }} **Security Applications**.
2.  Click **Add New**.
3.  In the **Name** option, type *My Security Application*.
4.  From the **Rules **section, click **Access Rule**.
5.  From the **Production Access Rule** option, select **My Access
Rule**.
6.  From the **Action type** option, select **Alert only**.
7.  From the **Rules **section, click **Rate Rules**.
8.  From the **Add Rate Rule** option, select **My Rate Rule**.
9.  From the **Action type** option, select **Drop request**.
10. From the **Rules** section, click **Managed Rule**.
11. From the **Production Managed Rule** option, select **My Managed Rule**.
12. From the **Action type** option, select **Alert only**.

    [View sample configuration.](/images/app_security/getting_started_security_application.png)

13. Click **Save**.

## Step 3: Monitor Threats {/*step-3-monitor-threats*/}

The Threats dashboard illustrates threat detection trends and lists
recent illegitimate requests. This dashboard is a useful tool for:

-   Verifying that a new or an updated security policy will not impact
    legitimate traffic.
-   Analyzing threats directed to your site.

By default, the dashboard tracks the set of threats detected over the
last week.

### Data Gathering {/*data-gathering*/}

After your Security Application configuration has been implemented, time needs to pass to allow {{ PRODUCT_SECURITY }} to
gather sufficient data from which trends may be detected. Wait a reasonable amount of time (e.g., 24 hours) after setting up a
Security Application configuration before performing data analysis. 

### Identify Trends {/*identify-trends*/}

Identify trends by reviewing the Threats dashboard's graph and detailed alert data.

1.  From the {{ PORTAL }}, click on the **AppOps** tab.
2.  Click **Open on my.edgecast.com** to load the **Security** page.
3.  From the **Security** page's navigation pane, click **Overview**.
3.  Verify that the **Threats** tab is active.
4.  Review the graph at the top of the dashboard. Check for an abnormally high number of detected threats.

### Analyze Individual Threats {/*analyze-individual-threats*/}

Ensure that {{ PRODUCT_SECURITY }} is correctly identifying threats by viewing detailed information on detected threats.

1.  Click the <img data-inline-img src="/images/icons/event_log.png" alt="Event log icon" /> (event log) icon from the upper-right hand side of the window.
2.  Click on each alert to view detailed information on it.

    -   Pay special attention to the requested URL. Verify that it is an illegitimate request.
    -   If an alert was generated for a legitimate request, then review the **Rule Tags**, **Matched On**, and **Matched Value** fields to see why the request was flagged.

        -   Check whether the web application may be changed to prevent this type of request from occurring.
        -   Our recommendation is that all of the following conditions be met before disabling a rule:

            -   Your application cannot be updated to reduce false positives.
            -   A [rule exception](managed_rules#rule-exceptions) cannot be created to eliminate false positives.
            -   A significant number of requests will be impacted by this rule.

            <Callout type="info">

              You may safely disable a threat detection policy if it secures a
              platform (e.g., Drupal, SharePoint, and WordPress) that is not
              leveraged by your application.

            </Callout>

            If you must disable a rule, then note the values for the **Rule
            Tags** and **Rule ID** fields.

            -   The **Rule Tags** field identifies the threat detection
                policy.
            -   Look for the rule ID defined in the **Rule ID** fields
                within your managed rule's policy. Disable that rule.

                <Callout type="tip">

                  You may filter rules by ID when viewing a managed rule's
                  policy.

                </Callout>
