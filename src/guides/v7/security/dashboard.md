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
    -   [Rate Events:](#rates-view) View statistics for rate limited requests and enforcement events. 

    ![](/images/v7/security/dashboard_event_type_selection.png)

3.  Optional. Define the dashboard's time period by performing either of the following steps:

    -   Select a predefined time range (e.g., Last hour, Last 2 days, or Last 7 days).
    -   Select `Custom time range` and then define a start and end date / time.

    ![](/images/v7/security/dashboard_time_range.png)

Click on the [WAF Events](#threats-view), [Bot Events](#bot), [Rates](#rate-limit), or [Rate Enforcement](#rate-enforcement) tab to view bot traffic or rate limiting trends.

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

[View field definitions.](/guides/security/recent_event_logs#threat-log-fields)

## Bot Events View {/*bot-events-view*/}

A bot event occurs when a bot manager rule is violated. Analyze recently detected bot traffic to 
-   Visualize peak bot traffic time periods and the amount of bot traffic directed at your web application and APIs.
-   Identify the countries from which bot traffic originates.
-   Identify key individual offenders by their IP address.

[View field definitions.](/guides/security/recent_event_logs#bot-log-fields)

## Rate Events View {/*rates-view*/}

The Rate Events view contains the following tabs:

-   **Rate Limiting:** Contains statistics for requests that exceed a rate limit.
-   **Rate Enforcer:** Contains statistics for groupings of rate limited requests. 

### Rate Limiting View {/*rate-limiting-view*/}

A rate limit event occurs when a request exceeds a rate limit. Analyze recently rate limited requests to:
-   Understand the severity of rate limited requests.
-   Identify the countries from which rate limited traffic originated.
-   Identify key individual offenders by their IP address.
-   View detailed information that describes a rate limited request.

<Callout type="info">

Logging for rate limited requests is downsampled to 10% due to the volume of requests that may occur during a single incident (e.g., volumetric Distributed Denial-of-Service attack).

</Callout>

[View field definitions.](/guides/security/recent_event_logs#rate-limit-log-fields)

### Rate Enforcer View {/*rate-enforcement-view*/}

A rate limit enforcement event identifies when a set of requests were rate limited. Analyze rate limit enforcement events to:

-   Visualize the time periods during which a high volume of requests resulted in the enforcement of a rate rule.
-   Understand the frequency of rate limited requests.

[View field definitions.](/guides/security/recent_event_logs#rate-limit-enforcement-log-fields)

#### Rate Enforcement Example {/*rate-enforcement-example*/}

The Rate Enforcement dashboard will log a single event whenever your rate limit threshold is exceeded. This occurs regardless of the number of requests that end up being rate limited as a result of this enforcement.

In this example, you have configured a rate limit of 300 requests per minute with an enforcement duration of 1 minute. Assuming the traffic pattern described below, the Rate Enforcement dashboard will indicate that 4 events took place.

| Time  | # of Requests |
|-------|----------------|
| 12:01 | 300,000        |
| 12:03 | 1,000,000      |
| 12:05 | 800,000        |
| 12:07 | 400,000        |


## Usage {/*usage*/}

The {{ PRODUCT_SECURITY }} dashboard contains the following components:

-   **Line Graph:** A line graph displays the number of events detected over a given time period.

    Each line on the graph represents a category of events. Change the category used to graph lines by selecting it from the option that appears directly to the left of the graph. A line will be drawn on the chart for each unique value. For example, if you select **Top Profile Type** and requests were screened by production and audit rules, then the graph will contain a line for audit and another one for production.  

    <Callout type="info">

      By default, graphing events by type will include up to the 10 most popular entries. <!--Customize this limit through the **Max Top Number** option. This option also affects the maximum number of unique entries that may be listed for each type of statistic listed under the graph.-->

    </Callout>

-   **Donut Charts:** Two donut charts are displayed directly below the line graph. These charts break down events by category. Select a category for each donut chart to view statistics for it.

-   **Statistics:** Statistics on the events detected over a given time period are displayed directly below the donut charts. Select a category to view statistics for it. 

    [View category definitions.](#field-definitions)

    <Callout type="info">

      By default, statistics for up to the 10 most popular entries may be displayed for each category. <!--Customize this limit through the **Max Top Number** option. This option also affects the maximum number of lines that may be graphed.-->

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

**Key information:**
-   By default, the dashboard includes all rule violations within the last two days.
    -   The dashboard may be filtered by the criteria listed directly below it. <!--Additional filters are available when viewing an individual alert from the event log.-->
-   Hovering over the line graph will indicate the exact number of violations that took place during that time slot.

### Filters {/*filters*/}

Filter the {{ PRODUCT_SECURITY }} dashboard by clicking on a top entry for a particular category or by setting up an advanced filter. 

**Key information:**
-   The **Filters** section, which appears on the right-hand side of the dashboard, displays a list of active filters. It also allows a filter to be cleared by clicking on the `x` (remove) icon displayed next to it.

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

1.  Click **Edit/Add Filters** from the upper-right hand corner of the dashboard.
2.  Perform one of the following steps:
    -   **Modify:** Click the <Image inline src="/images/v7/icons/pencil-3.png" alt="Edit" /> (Edit) icon next to the desired filter. Make the desired changes and then click **Save**.
    -   **Disable:** Click the <Image inline src="/images/v7/icons/toggle-off-2.png" alt="Disable" /> (Disable) icon next to the desired filter.
    -   **Enable:** Click the <Image inline src="/images/v7/icons/toggle-on-2.png" alt="Enable" /> (Enable) icon next to the desired filter.
    -   **Delete:** Click `x` next to the desired filter.
3.  Click **Apply**.
