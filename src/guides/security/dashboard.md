---
title: Security Dashboard
---

The {{ PRODUCT_SECURITY }} dashboard provides the means through which you may perform a historical analysis of:
-   Recent threats to site traffic.
-   Recent trends in bot traffic detection.
-   Recently rate limited requests.
-   Recent rate limiting enforcement events. 

<Callout type="info">

  Log data is retained for 30 days for most security solutions. The exception
  is {{ PRODUCT_SECURITY }} Insights which only retains data for 7 days.

</Callout>

**To view the dashboard**
1.  Navigate to the {{ PRODUCT_SECURITY }} dashboard.

    1.  From the {{ PORTAL_LINK }}, select the desired team space.    
    2.  Click **Security**.
    
    By default, the dashboard displays recent [threats](#threats) (i.e., access rule, custom rule, and managed rule violations).

2.  Optional. Click on the [Bot](#bot), [Rates](#rate-limit), or [Rate Enforcement](#rate-enforcement) tab to view bot traffic or rate limiting trends.

<Callout type="tip">

  Focus on relevant or critical events by applying one or more [filter(s)](#filters) to the dashboard. 

</Callout>

## Threats View {/*threats*/}

A threat event occurs when an access rule, custom rule, or managed rule is violated. It allows you to:

-   Visualize the time periods during which site traffic is most heavily targeted.
-   Understand the variety, frequency, and severity of illegitimate traffic.
-   Identify the countries from which illegitimate traffic originates.
-   Identify key individual offenders by their IP address.
-   Learn detailed information on the types of attack being mounted against your site.

[View field definitions.](/guides/security/logs#threat-log-fields)

## Bot View {/*bot*/}

A bot event occurs when a bot manager rule is violated. Analyze recently detected bot traffic to 
-   Visualize peak bot traffic time periods and the amount of bot traffic directed at your web application and APIs.
-   Identify the countries from which bot traffic originates.
-   Identify key individual offenders by their IP address.

<Callout type="info">

  This type of event does not report data for [Managed Bot Defense](/guides/security/managed_bot_defense). 

</Callout>

[View field definitions.](/guides/security/logs#bot-log-fields)

## Rate Limit View {/*rate-limit*/}

A rate limit event occurs when a request exceeds a rate limit. Analyze recently rate limited requests to:
-   Understand the severity of rate limited requests.
-   Identify the countries from which rate limited traffic originated.
-   Identify key individual offenders by their IP address.
-   View detailed information that describes a rate limited request.

<Callout type="info">

Logging for rate limited requests is downsampled to 10% due to the volume of requests that may occur during a single incident (e.g., volumetric Distributed Denial-of-Service attack).

</Callout>

[View field definitions.](/guides/security/logs#rate-limit-log-fields)

## Rate Enforcement View {/*rate-enforcement*/}

A rate limit enforcement event identifies when a set of requests were rate limited. Analyze rate limit enforcement events to:

-   Visualize the time periods during which a high volume of requests resulted in the enforcement of a rate rule.
-   Understand the frequency of rate limited requests.

[View field definitions.](/guides/security/logs#rate-limit-enforcement-log-fields)

### Sample Scenario {/*sample-scenario*/}

The Rate Enforcement dashboard will log a single event whenever your rate limit threshold is exceeded. This occurs regardless of the number
of requests that end up being rate limited as a result of this enforcement.

In this example, you have configured a rate limit of 300 requests per minute with an enforcement duration of 1 minute. Assuming the traffic
pattern described below, the Rate Enforcement dashboard will indicate that 4 events took place.

| Time  | # of Requests |
|-------|----------------|
| 12:01 | 300,000        |
| 12:03 | 1,000,000      |
| 12:05 | 800,000        |
| 12:07 | 400,000        |


## Usage {/*usage*/}

The {{ PRODUCT_SECURITY }} dashboard contains the following components:

-   **Chart:** A chart or line graph displays the number of events detected over a given time period.

    By default, a single line on the graph represents all events. Alternatively, categorize events by selecting the desired categorization criteria from the option that appears directly above the graph. A line will be drawn on the chart for each unique value. For example, if you select **Profile Type** and requests were screened by production and audit rules, then the graph will contain a line for audit and another one for production.  

    <Callout type="info">

      By default, graphing events by type will include up to the 10 most popular entries. Customize this limit through the **Max Top Number** option. This option also affects the maximum number of unique entries that may be listed for each type of statistic listed under the graph.

    </Callout>

-   **Statistics:** Statistics on the events detected over a given time period are displayed directly below the chart. 
    Statistics are broken down by category.  

    [View category definitions.](#field-definitions)  

    <Callout type="info">

      By default, statistics for up to the 10 most popular entries may be displayed for each category. Customize this limit through the **Max Top Number** option. This option also affects the maximum number of lines that may be graphed.  

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

**Key information:**
-   By default, a chart includes all rule violations within the last seven days.
    -   The chart may be filtered by the criteria listed directly below it. Additional filters are available when viewing an individual alert from the event log.
    -   The time period being charted may be adjusted through the **Time Frame** option.
-   Hovering over the line graph will indicate the exact number of violations that took place during that time slot.

## Filters {/*filters*/}

Filter the {{ PRODUCT_SECURITY }} dashboard by clicking on a top entry for a particular category or by setting up an advanced filter. 

**Key information:**
-   Apply a filter by finding the desired category under the **Additional Filters** section and then clicking on a top entry. After which, the <Image inline src="/images/v7/icons/filter.png" alt="Filter icon" /> (filter) icon will be displayed next to it. This icon indicates that the dashboard is being filtered by that entry.

    ![](/images/v7/security/dashboard_filter_by_stat.png)

-   You may not filter the dashboard through the **Timestamp** field. Use the **Time Frame** option instead. This mandatory option filters the dashboard for events that occurred during a relative time period from the present (e.g., Last 24 hours or Last 7 days).
-   The **Filters** section, which appears on the left-hand side
    of the dashboard, displays a list of active filters. It also allows
    a filter to be cleared by clicking on the <Image inline src="/images/v7/icons/remove.png" alt="Delete icon" /> (delete)
    icon displayed next to
    it.