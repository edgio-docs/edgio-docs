# Rate Enforcement Dashboard {/*rate-enforcement-dashboard*/}

Use the Rate Enforcement dashboard to identify when a rate limit
enforcement event took place. For the purposes of this dashboard, an
event occurs when your rate limit's threshold has been exceeded.

### Sample Scenario {/*sample-scenario .SubSection*/}

The Rate Enforcement dashboard will log a single event whenever your
rate limit threshold is exceeded. This occurs regardless of the number
of requests that end up being rate limited as a result of this
enforcement.

In this example, you have configured a rate limit of 300 requests per
minute with an enforcement duration of 1 minute. Assuming the traffic
pattern described below, the Rate Enforcement dashboard will indicate
that 4 events took place.

| Time  | \# of Requests |
|-------|----------------|
| 12:01 | 300,000        |
| 12:03 | 1,000,000      |
| 12:05 | 800,000        |
| 12:07 | 400,000        |

### Overview {/*overview*/}

The Rate Enforcement dashboard allows you to:

-   Visualize the time periods during which a high volume of requests
    resulted in the enforcement of a rate rule.
-   Understand the frequency of rate limited requests.

Log data is retained for 30 days for most WAF solutions. The exception
is WAF Insights which only retains data for 7 days.\

This article describes:

-   [Overview](#Overview)
-   [Fields](#fields)

## Usage {/*usage*/}

The dashboard contains two different views through which rate limit
analysis may be performed, which are:

-   [Overview](#Overview)
-   [Event log](#Event)

To view the Rate Enforcement dashboard

1.  Navigate to the **Rate Enforcement** dashboard (**Rate Enforcement** tab
    of the **Overview** page. How? From the main menu,
    navigate to **More** \| **Security** \| ***WAF Tier*** \| **Dashboard**. Click **Rate
    Enforcement**.

    The dashboard will display a chart showing recent enforcements of
    your security policy.

2.  Optional. View event log data by clicking **Event Logs** from
    the side navigation bar. Verify that the **Rate Enforcement**
    tab is selected.

### Overview {/*overview*/}

The Overview is a useful tool for detecting patterns for rate limited
traffic directed to your origin servers. This view consists of a chart
and statistics for a given time period.

#### Chart {/*chart*/}

A chart or line graph displays the number of times that enforcement of
your rate limit rate limit was initiated over a given time period.

By default, a single line on the graph represents all rate limit
enforcement events. Alternatively, categorize enforcement events by
selecting the desired categorization criteria from the option that
appears directly above the graph. A line will be drawn on the chart for
each unique value.

Key information:

-   By default, the chart includes all enforcements that occurred within
    the last seven days.

    -   The chart may be filtered by the criteria listed directly below
        it.
    -   The time period being charted may be adjusted through the **Time
        Range** option. This option is displayed directly to the
        left of the chart.

-   Hovering over the line graph will indicate the number of rate
    limited requests that took place during that time slot.

#### Statistics {/*statistics*/}

Statistics for the enforcement of your rate limits over a given time
period are displayed directly below the chart. Statistics are broken
down by category.

By default, statistics for up to the 10 most popular entries may be
displayed for each category. Customize this limit through the **Max Top
Number** option. This option also affects the maximum number of
lines that may be graphed.

[View a brief description for each category.](#fields)

The following information is displayed for each category:

-   ***Value:*** Groups rate limited traffic by a
    specific value (e.g., rule name or enforcement type).
-   **Percentage (%):** Indicates the percentage of triggered
    enforcements over a given time period for the current group.
-   **Events:** Indicates the number of triggered enforcements over
    a given time period for the current group.

## Event Log View {/*event-log-view*/}

This view provides the means to delve into the details of rate limit
enforcement. Each enforcement event is described as follows:

```
Enforced Rule: Rule Identifies the rate rule that was violated by its
name. Elapsed Time Indicates the amount of time that has passed since
the request was screened.  TimeIndicates the time (UTC) at which the
request was screened.

Action Type: Action Type Represents the type of action that was applied
to the rate limited request. This action is determined by the rate rule
that it violated.
```

A sample rule violation is provided below.

```
Enforced Rule: Drop Traffic [10s ago 12:00:00.00 UTC]

Action Type: drop-request
```

Clicking on an event will expand that entry and display detailed
information about it.

[View a brief description for each event log entry field.](#fields)

Key information:

-   Blue font indicates a value that may be used to filter the entire
    dashboard. Click on that value to filter events by it.
-   The ![](/images/icons/filter.png) icon appears next
    to each field that is currently filtering the dashboard.

## Filters {/*filters*/}

Filters are applied to both the Overview and the Event Log views. Most
fields support filtering.

The Overview and the Event Log views cannot be filtered by the
**Timestamp** field. Use the **Time Range** option instead.
This option filters the dashboard for events that occurred during a
relative time period from the present (e.g., Last 24 hours or Last 7
days).

Key information:

## Fields {/*fields*/}

A brief description for each field used to describe/categorize rate
limiting enforcement is provided below.

| Field       | Description                                           |
| ----------- | ----------- |
| Action Name | Indicates the name of the action that was applied to rate limited requests as a result of this enforcement event.  Assign names to actions by defining your rate rule via our REST API.                                     |
| Action Type | Indicates the type of action (e.g., `custom-response`) that was applied to rate limited requests as a result of this enforcement event.                                                |
| Rule Name   | Indicates the name of the rule whose threshold was exceeded.                                             |
| Timestamp   | Indicates the date and time (UTC) at which rate limiting enforcement was initiated.  This field is only available from within the Event Log view. Requests may not be filtered by this field. Filter by time through the **Time Range** option that appears on the left-hand side of the dashboard.                                            |
