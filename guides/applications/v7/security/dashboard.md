---
title: Security Dashboard
---

The {{ PRODUCT_SECURITY }} dashboard provides the means through which you may perform a historical analysis of:
-   Recent threats to site traffic.
-   Recent trends in bot traffic detection.
-   Recently rate limited requests.
-   Recent rate limiting enforcement events.

<Callout type="info">

  Log data is retained for 30 days for most security solutions. The exception is {{ PRODUCT_SECURITY }} Insights which only retains data for 7 days.

</Callout>

**To view the dashboard**
1.  Navigate to the {{ PRODUCT_SECURITY }} dashboard.

    1.  From the {{ PORTAL_LINK }}, select the desired organization.
    2.  Click **Security**.

    By default, the dashboard displays the sum of events across your entire security configuration.

2.  Optional. Filter the dashboard to view a different set of events by clicking on the desired event type.

    -   [Total Events:](#total-events-view) View consolidated statistics across your entire security configuration.
    -   [WAF Events:](#waf-events-view) View statistics for requests that violate an access rule, custom rule, or managed rule.
    -   [Bot Events:](#bot-events-view) View statistics for requests identified as bot traffic.
    -   [Rate Events:](#rate-events-view) View statistics for rate limited requests and enforcement events.

    ![](/images/v7/security/dashboard_event_type_selection.png)

3.  Optional. Define the dashboard's time period by performing either of the following steps:

    -   Select `Custom time range` and then define a start and end date / time.
    -   Select a predefined time range (e.g., Last hour, Last 2 days, or Last 7 days).

        ![](/images/v7/security/dashboard_time_range.png?height=250)

<Callout type="tip">

  Focus on relevant or critical events by applying one or more [filter(s)](#filters) to the dashboard.

</Callout>

## Total Events View {/*total-events-view*/}

The Total Events view shows consolidated statistics across your entire security configuration. Use this view to identify patterns across your entire security configuration.

![](/images/v7/security/dashboard_total_events_graph.png)

## <a id="threats-view" />WAF Events View {/*waf-events-view*/}

A WAF event occurs when an access rule, custom rule, or managed rule is violated. It allows you to:

-   Visualize the time periods during which site traffic is most heavily targeted.
-   Understand the variety, frequency, and severity of illegitimate traffic.
-   Identify the countries from which illegitimate traffic originates.
-   Identify key individual offenders by their IP address.
-   Learn detailed information on the types of attack being mounted against your site.

[Learn about WAF log events.](#waf-log-events)

## Bot Events View {/*bot-events-view*/}

A bot event occurs when a bot manager rule is violated. Analyze recently detected bot traffic to
-   Visualize peak bot traffic time periods and the amount of bot traffic directed at your web application and APIs.
-   Identify the countries from which bot traffic originates.
-   Identify key individual offenders by their IP address.

[Learn about Bot log events.](#bot-log-events)

## Rate Events View {/*rate-events-view*/}

The Rate Events view contains the following tabs:

-   **Rate Limiting:** Contains statistics for requests that exceed a rate limit.
-   **Rate Enforcer:** Contains statistics for rate limit enforcement events. An enforcement event starts when a rate limit is exceeded. A Security App's configuration determines the duration for this event. 

### Rate Limiting Tab {/*rate-limiting-view*/}

A rate limit event occurs when a request exceeds a rate limit. Analyze recently rate limited requests to:
-   Understand the severity of rate limited requests.
-   Identify the countries from which rate limited traffic originated.
-   Identify key individual offenders by their IP address.
-   View detailed information that describes a rate limited request.

<Callout type="info">

Logging for rate limited requests is downsampled to 10% due to the volume of requests that may occur during a single incident (e.g., volumetric Distributed Denial-of-Service attack).

</Callout>

[Learn about Rate Limit log events.](#rate-limit-log-events)

### Rate Enforcer Tab {/*rate-enforcement-view*/}

A rate limit enforcement event identifies each instance that a set of requests exceed a rate limit. This type of event starts when a rate limit is exceeded. The time period defined within a Security App's **Rate Rule** tab determines the duration for this event. 

Analyze rate limit enforcement events to:

-   Visualize the time periods during which a high volume of requests resulted in the enforcement of a rate rule.
-   Understand the frequency of rate limited requests.

[Learn about Rate Limit Enforcement log events.](#rate-limit-enforcement-log-events)

#### Rate Enforcement Example {/*rate-enforcement-example*/}

The **Rate Enforcer** tab logs a single event whenever your rate limit threshold is exceeded. This occurs regardless of the number of requests that end up being rate limited as a result of this enforcement.

In this example, you have configured a rate limit of 300 requests per minute with an enforcement duration of 1 minute. Assuming the traffic pattern described below, the **Rate Enforcer** tab will indicate that 4 events took place.

| Time  | # of Requests |
|-------|----------------|
| 12:01 | 300,000        |
| 12:03 | 1,000,000      |
| 12:05 | 800,000        |
| 12:07 | 400,000        |


## Dashboard Usage {/*usage*/}

The {{ PRODUCT_SECURITY }} dashboard contains the following components:

-   **Line Graph:** A line graph displays the number of events detected over a given time period.

    ![](/images/v7/security/dashboard_line_graph.png)

    **Key information:**

    -   Each line on the graph represents a category of events.
    -   Change the category used to graph lines by selecting it from the option that appears directly to the left of the graph. A line will be drawn on the chart for each unique value.

        For example, if you select **Top Profile Type** and requests were screened by production and audit rules, then the graph will contain a line for audit and another one for production.

    -   By default, graphing events by type will include up to the 10 most popular entries. <!--Customize this limit through the **Max Top Number** option. This option also affects the maximum number of unique entries that may be listed for each type of statistic listed under the graph.-->

    -   Hovering over the line graph will indicate the exact number of violations that took place during that time slot.

-   **Donut Charts / Bar Graphs:** Two donut charts are displayed directly below the line graph. These charts break down events by category. Select a category for each donut chart to view statistics for it.

    ![Donut chart](/images/v7/security/dashboard_donut_chart.png)

    If you prefer to view this data as bar graphs, then click the bar graph icon in the upper-right hand corner of the desired donut chart.

    ![Toggle from donut chart to bar graph](/images/v7/security/dashboard_donut_bar_icons.png)

-   **Statistics:** Statistics on the events detected over a given time period are displayed directly below the donut charts. Select a category to view statistics for it.

    ![Statistics](/images/v7/security/dashboard_statistics.png?width=450)

    <Callout type="info">

      Statistics for up to the 10 most popular entries may be displayed for each category. <!--Customize this limit through the **Max Top Number** option. This option also affects the maximum number of lines that may be graphed.-->

    </Callout>

    The following information is displayed for each category:
    -   `<Value>`**:** Groups events by the request's value for the current category.

        The following illustration shows a partial listing of values for the `Rule Message` category.

        ![](/images/v7/security/dashboard_category.png)

    -   **%:** Indicates the percentage of detected events over a given time period that belong to the group identified by the **Value** field.

        <Callout type="info">

          Percentages are calculated from the total events detected during the given time period. The **Max Top Number** option determines the limit of entries per category. If the number of entries exceeds this limit, then the sum of the percentages for that category will not add up to 100%.

        </Callout>

    -   **Events:** Indicates the number of detected events that belong to the group identified by the **Value** field.

-   **Log Data:** Paginated log data for the current time period is displayed within the **Log Events** section at the bottom of the dashboard. Click on a log entry to view detailed information about that event.

### Filters {/*filters*/}

Filter the {{ PRODUCT_SECURITY }} dashboard by clicking on a top entry for a particular category or by setting up an advanced filter. The **Filters** section, which appears on the right-hand side of the dashboard, displays a list of active filters. It also allows a filter to be cleared by clicking on the `x` (remove) icon displayed next to it.

**To apply a filter from the line graph**

1.  From the line graph, select the desired category.
2.  Click on the desired entry.

    ![Filter by line graph](/images/v7/security/dashboard_filter_by_line_graph.png)

**To filter for a specific statistic**

1.  From the statistics section, select the desired category.
2.  Click on the desired entry.

    ![](/images/v7/security/dashboard_filter_by_stat.png)

**To manually define a filter**

1.  Click **Edit/Add Filters** from the upper-right hand corner of the dashboard.
2.  Click **+ Add Filter**.
3.  Select the desired field.
4.  Optional. By default, the dashboard is filtered to find exact matches. Toggle the `=` to `≠` to filter for events that do not match the specified value.
5.  Type the value by which the dashboard will be filtered.
6.  Click **Save**.
7.  Click **Apply**.

**To view, modify, enable, disable, or remove active filters**

1.  Perform either of the following steps:
    -   Click the desired filter from the top of the dashboard.
    -   Click **Edit/Add Filters** from the upper-right hand corner of the dashboard.
2.  Perform one of the following steps:
    -   **Modify:** Click the <Image inline src="/images/v7/icons/pencil-3.png" alt="Edit" /> (Edit) icon next to the desired filter. Make the desired changes and then click **Save**.
    -   **Disable:** Click the <Image inline src="/images/v7/icons/toggle-off-2.png" alt="Disable" /> (Disable) icon next to the desired filter.
    -   **Enable:** Click the <Image inline src="/images/v7/icons/toggle-on-2.png" alt="Enable" /> (Enable) icon next to the desired filter.
    -   **Delete:** Click `x` next to the desired filter.
3.  Click **Apply**.

## Log Events {/*log-events*/}

{{ PRODUCT }} provides log data for recent events within the {{ PORTAL }}. Use this log data to analyze specific requests that were flagged as violations of your security policy, exceeded your rate limit, or were classified as bot traffic.

**To view recent event logs**
1.  Navigate to the **Dashboard** page.
    {{ SECURITY_NAV }} **Dashboard**.

    The dashboard displays recent log events for the currently selected view (e.g., Total Events, WAF Events, and Bot Events).

2.  Click on the desired view.

    ![Types of events](/images/v7/security/dashboard_event_type_selection.png?width=500)

3.  Scroll down to the **Log Events** section.

### <a id="threat-log-data" />WAF Log Events {/*waf-log-events*/}

Select the [WAF Events view](#waf-events-view) to filter the **Log Events** section to only display log events for recent access rule, custom rule, or managed rule violations. The following summary is provided for each entry:
-   **Timestamp:** Indicates the date and time (UTC) at which the request was screened.
-   **Host:** Identifies the hostname requested by the client.
-   **Profile Type:** Indicates whether the request triggered a rule in [Production or Audit mode](/applications/security/waf#audit-security-rules).
-   **Rule Msg:** Identifies the rule that was violated.

#### <a id="threat-log-fields" />WAF Log Fields {/*waf-log-fields*/}

View the following detailed information on an event (i.e., rule violation) by clicking on it:

-   **Common Headers:** Provides key request header data.
-   **Sub Events:** Describes a rule violation. [View log fields.](#sub-event-fields)
-   **Other Data:** Describes the request, the security configuration that was violated, and the edge server on which it was processed.

### Bot Log Events {/*bot-log-events*/}

Select the [Bot Events view](#bot-events-view) to filter the **Log Events** section to only display log events for requests that were flagged as bot traffic. The following summary is provided for each entry:
-   **Timestamp:** Indicates the date and time (UTC) at which the request was screened.
-   **Host:** Identifies the hostname requested by the client.
-   **Action Type:** Indicates the [enforcement action](/applications/security/bot_rules#actions) that was applied to the request.
-   **Rule Msg:** Identifies the rule that was violated.

#### Bot Log Data {/*bot-log-data*/}

View the following detailed information on an event (i.e., request flagged as bot traffic) by clicking on it:

-   **Common Headers:** Provides key request header data.
-   **Sub Events:** Describes why the request was flagged as bot traffic. [View log fields.](#sub-event-fields)
-   **Other Data:** Describes the request, the security configuration that was violated, and the edge server on which it was processed. Key fields when analyzing bot traffic identified through a browser challenge are described below.

    -   **Browser Challenge Status (challengeStatus):** Indicates the reason why a browser challenge was served. Valid values are:
        -   **CHAL_STATUS_NONE:** Indicates that a browser challenge was not issued.
        -   **CHAL_STATUS_IP_MISMATCH:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a token is shared or the user's IP address is modified after the initial token was generated.
        -   **CHAL_STATUS_NO_TOKEN:** Indicates that a browser challenge was served for a new session.
        - **CHAL_STATUS_TOKEN_CORRUPTED:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a user agent submits a request that includes a token that our service cannot decrypt.
        -   **CHAL_STATUS_TOKEN_EXPIRED:** Indicates that a browser challenge was served due to an expired token. This status is typically reported when a user agent (e.g., web browser) submits a request after the expiration of the previously solved browser challenge.

            <Callout type="tip">

              You may configure the duration for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge through the [Security Application](/applications/security/security_applications#bot-rule-configuration)'s **Valid for (in minutes)** option.

            </Callout>

        -   **CHAL_STATUS_UA_MISMATCH:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a token is shared with another user agent (e.g., web browser) within the same machine.
        -   **CHAL_STATUS_WRONG_ANSWER:** Indicates that a browser challenge was served because the user was unable to solve the previous browser challenge. This status may also be reported when the user agent (e.g., web browser) submits a tampered token.
    -   **Token Validity Duration (tokenDurationSec):** Indicates the number of minutes for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge.

### Rate Limit Log Events {/*rate-limit-log-events*/}

Select the [Rate Events view](#rate-events-view) and then verify that the **Rate Limiting** tab is selected to filter the **Log Events** section to only display log events for rate limited requests. The following summary is provided for each entry:
-   **Timestamp:** Indicates the date and time (UTC) at which the request was screened.
-   **Host:** Identifies the hostname requested by the client.
-   **Action Type:** Indicates the [enforcement action](/applications/security/security_applications#enforcement) that was applied to the request.
-   **Limit Name:** Identifies the rate rule that was violated.

#### Rate Limit Log Data {/*rate-limit-log-data*/}

View the following detailed information on an event (i.e., rule violation) by clicking on it:

-   **Common Headers:** Provides key request header data.
-   **Other Data:** Describes the request, the security configuration that was violated, and the edge server on which it was processed.

### Rate Limit Enforcement Log Events {/*rate-limit-enforcement-log-events*/}

Select the [Rate Events view](#rate-events-view) and then select the **Rate Enforcer** tab to filter the **Log Events** section to only display log events for rate limit enforcement events. The following summary is provided for each entry:
-   **Timestamp:** Indicates the date and time (UTC) at which your rate limiting policy was enforced.
-   **Limit Name:** Identifies the rate rule that was violated.

#### Rate Limit Enforcement Log Data {/*rate-limit-enforcement-log-data*/}

View information on a rate limit enforcement event by clicking on it. For example, view the type of enforcement action (i.e., `enforcementEnfType`) that was applied to the rate limited requests and the time period (i.e.,. `enforcementStartTimeMs` and `enforcementDurationSec`) during which it was applied.

### Sub Event Fields {/*sub-event-fields*/}

A sub event identifies a rule violation. Each sub event contains the following fields:

-   **Matched On:** Indicates a [variable](/applications/security/matched_on_variables) that identifies where the violation was found.
-   **Matched Value:** Indicates the value of the variable defined by the **Matched On** field.

    <Callout type="info">

      Standard security practices dictate that measures should be taken to prevent sensitive data (e.g., credit card information or passwords) from being passed as clear text from the client to your origin server. Another incentive for encrypting sensitive data is that it will be logged by our system when an alert is triggered as a result of this data. If sensitive data cannot be encrypted or obfuscated, then it is strongly recommended to contact our technical customer support to disable logging for the **Matched Value** field.

    </Callout>

-   **Rule ID:** Indicates the ID for the rule that the request violated.
-   **Rule Message:** Provides a description of the rule that the request violated.
-   **Operator Name:** Indicates how the system interpreted the comparison between the **Operator Parameter** and the **Matched Value** fields. Common operators are:
    -   **BEGINSWITH:** Begins with. Identifies a match due to a request element that started with the specified match value.
    -   **CONTAINS:** Contains. Identifies a match due to a request element that contained the specified match value.
    -   **ENDSWITH:** Ends with. Identifies a match due to a request element that ended with the specified match value.
    -   **STREQ:** Exact match. Identifies a match due to a request element that was an exact match to the specified match value.
    -   **RX:** Regex. Identifies a match due to a request element that satisfied the regular expression defined in the match value.
    -   **EQ:** Value match. Identifies a match due to a request element
        that occurred the exact number of times defined in your custom rule.
    -   **IPMATCH:** IP Address. Identifies a match due to the request's IP
        address either being contained within an IP block or that was an
        exact match to an IP address defined in your custom rule.
-   **Operator Parameter:** Indicates the source or the value that was compared against the **Matched Value** field.
-   **Rule Tags:** Indicates the tags associated with the rule that the
    request violated. These tags may be used to determine whether a rule,
    access control, or global setting was violated.

    **Naming convention:**

    `<Rule Set>/<Category>/<Subcategory>`

    <Callout type="info">

      `<Category>` identifies whether the request violated a rule, an access control, or the delivery profile.

    </Callout>

    **Example values:**

    -   **Policy:** The following sample values identify a policy:

        `OWASP_CRS/PROTOCOL_VIOLATION/INVALID_HREQ`
        `OWASP_CRS/WEB_ATTACK/SQL_INJECTION`

    -   **Blacklist:** The following sample values identify a blacklist criterion:

        `BLACKLIST/IP`
        `BLACKLIST/COUNTRY`
        `BLACKLIST/REFERRER`
        `BLACKLIST/URL`

    -   **Setting:** The following sample values identify a setting:

        `OWASP_CRS/POLICY/SIZE_LIMIT`

-   **Total Anomaly Score:** Indicates the anomaly score assigned to the request. This score is determined by the number of rules that were violated and their severity.
