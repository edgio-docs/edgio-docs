---
title: Browser Challenges Dashboard
---

Use the Browser Challenges dashboard to find out recent trends in
browser challenges.

<Callout type="info">

  Log data is retained for 30 days for most {{ PRODUCT_SECURITY }} solutions. The exception
  is {{ PRODUCT_SECURITY }} Insights which only retains data for 7 days.

</Callout>

This article describes:
-   [Overview](#overview)
-   [Event log view](#event)
-   [Filters](#filters)
-   [Fields](#fields)

## Usage {/*usage*/}

The Browser Challenges dashboard contains two different views through
which analysis may be performed, which are:
-   [Overview](#overview)
-   [Event log](#event)

**To view the Browser Challenges dashboard**
1.  Navigate to the **Browser Challenges** dashboard (**Browser Challenges** tab of the **Overview**
    page).
    1.  From the {{ PORTAL }}, click on the **Security** tab.
    2.  From the navigation pane, click **Overview**.
    3.  Click **Browser Challenges**.

    The Browser Challenges dashboard will display a chart showing recent
    browser challenges.
2.  Optional. View event log data by clicking **Event Logs** from
    the navigation pane. Verify that the **Browser
    Challenges** tab is active.

### Overview {/*overview*/}

The Overview dashboard is a useful tool for detecting patterns for
browser challenges served. This view consists of a chart and statistics
for a given time period.

#### Chart {/*chart*/}

A line graph displays the number of browser challenges over a given time
period.

By default, a single line on the graph represents all browser
challenges. Alternatively, categorize browser challenges by selecting
the desired categorization criteria from the option that appears
directly above the graph. A line will be drawn on the chart for each
unique value. For example, if you select [Top Challenge
Statuses]{.listitem}, then the graph will contain a line for each status
(e.g., `CHAL_STATUS_NO_TOKEN` and
`CHAL_STATUS_TOKEN_EXPIRED`) that occurred during the given
time period.

**Key information:**
-   By default, the chart includes all browser challenges within the
    last seven days.
    -   The chart may be filtered by the criteria listed directly below
        it. Additional filters are available when viewing an individual
        event from the event log.
    -   The time period being charted may be adjusted through the **Time
        Range** option. This option is displayed directly to the
        left of the chart.
-   Hovering over the line graph will indicate the number of browser
    challenges that took place during that time slot.

#### Statistics {/*statistics*/}

Statistics for browser challenges over a given time period are displayed
directly below the chart. Statistics are broken down by category.

[View a brief description for each category.](#fields)

The following information is displayed for each category:
-   `<Value>`**:** Groups browser challenges by a specific
    value. For example, the `URL` category groups browser
    challenges by the most popular request URLs (e.g.,
    `https://cdn.example.com/bunny.png`).

-   **Percentage (%):** Indicates the percentage of browser
    challenges over a given time period for the current group.

    <Callout type="important">

      Percentages are calculated from the total browser challenges during
      the given time period. The **Max Top Number** option
      determines the limit of entries per category. If the number of
      entries exceeds this limit, then the sum of the percentages for that
      category will not add up to 100%.

    </Callout>

-   **Events:** Indicates the number of browser challenges over a
    given time period for the current group.

### Event Log View {/*event-log-view*/}

The event log, which contains a list of recent browser challenges,
provides the means to delve into the details of a browser challenge.
Each request is described as follows:

`Enforced Rule: <Rule>  <Elapsed Time>  <Time>`

-   `<Rule>`**:** Identifies the rate rule that was violated by its
    name.
-   `<Elapsed Time>`**:** Indicates the amount of time that has passed since
    the request was screened.
-   `<Time>`**:** Indicates the time (UTC) at which the
    request was screened.

A sample rule violation is provided below.

`Enforced Rule: Marketing [10s ago 12:00:00.00 UTC]`

Clicking on an event expands that entry to show detailed information
about it.

[View a brief description for each event log entry field.](#fields)

**Key information:**
-   Blue font indicates a value that may be used to filter the entire
    dashboard. Click on that value to filter events by it.
-   The ![](/images/icons/filter.png) icon appears next
    to each field that is currently filtering the dashboard.

## Filters {/*filters*/}

Filters are applied to both the Overview and the Event Log views. Most
fields support filtering.

<Callout type="info">

  The Overview and the Event Log views cannot be filtered by the
  **Timestamp** field. Use the **Time Range** option instead.
  This option filters the dashboard for events that occurred during a
  relative time period from the present (e.g., Last 24 hours or Last 7
  days).

</Callout>

**Key information:**
-   Quickly apply a filter by clicking on the desired entry. After which, the ![](/images/icons/filter.png) icon will be displayed next to it. This icon indicates that the dashboard is being filtered by that entry.
    -   **Overview:** Quickly filter log event data by clicking on one of the values listed directly below the chart.
    -   **Event Log:** Quickly filter log event data by expanding a log entry and then clicking on the desired field value.
-   The **Time Range** option is different from other filters in that it is mandatory. Specify the relative time period from the present by which the Overview and the Event Log will be filtered.
-   The list of active filters, including time, is displayed on the left-hand side of the dashboard.
-   Clear a filter by clicking on the ![](/images/icons/filter.png) icon displayed next to it.

## Fields {/*fields*/}

A brief description for each field used to describe/categorize browser
challenges is provided below.

-   **Bot Rules Name:** Indicates the name of the bot rule set that triggered the browser challenge.
-   **Browser Challenge Status:** Indicates the reason why a browser challenge was served. Valid values are:  
    -   **CHAL_STATUS_IP_MISMATCH:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a token is shared or the user's IP address is modified after the initial token was generated.  
    -   **CHAL_STATUS_NO_TOKEN:** Indicates that a browser challenge was served for a new session.  
    - **CHAL_STATUS_TOKEN_CORRUPTED:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a user agent submits a request that includes a token that our service cannot decrypt.  
    -   **CHAL_STATUS_TOKEN_EXPIRED:** Indicates that a browser challenge was served due to an expired token. This status is typically reported when a user agent (e.g., web browser) submits a request after the expiration of the previously solved browser challenge. 

        <Callout type="tip">

          You may configure the duration for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge through the [Security Application](security_applications#bot-rule-configuration)'s **Valid for (in minutes)** option.  

        </Callout>

    -   **CHAL_STATUS_UA_MISMATCH:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a token is shared with another user agent (e.g., web browser) within the same machine.  
    -   **CHAL_STATUS_WRONG_ANSWER:** Indicates that a browser challenge was served because the user was unable to solve the previous browser challenge. This status may also be reported when the user agent (e.g., web browser) submits a tampered token.
-   **Client IP:** Identifies the IP address (IPv4) of the client from which the request originated.
-   **Country Name:** Identifies the country from which the request originated.
-   **Matched On:** Indicates a [variable](matched_on_variables) that identifies where the violation was found.
-   **Matched Value:** Indicates the value of the variable defined by the **Matched On** field.  

    <Callout type="info">

      Standard security practices dictate that measures should be taken to prevent sensitive data (e.g., credit card information or passwords) from being passed as clear text from the client to your origin server. Another incentive for encrypting sensitive data is that it will be logged by our system when an alert is triggered as a result of this data. If sensitive data cannot be encrypted or obfuscated, then it is strongly recommended to contact our technical customer support to disable logging for the **Matched Value** field.

    </Callout>

-   **Referer:** Indicates the request's referrer as defined by the `Referer` request header. A referrer identifies the address of the resource that linked to the requested content.
-   **Request Method:** Indicates the request's HTTP method.  

    **Format:**

    `HTTP_METHOD_<NAME>`

    **Example:**

    `HTTP_METHOD_GET`

-   **Rule ID:** Indicates the ID of the rule that triggered the browser challenge.
-   **Rule Message:** Indicates the message of the rule that triggered the browser challenge.
-   **Security Application Name:** Indicates the name of the Security Application configuration that was assigned the bot rule set that was triggered.
-   **Timestamp:** Indicates the date and time (UTC) at which the browser challenge was issued.

    <Callout type="info">

      This field is only available from within the Event Log view. Requests may not be filtered by this field. Filter by time through the **Time Range** option that appears on the left-hand side of the dashboard.

    </Callout>

    <Callout type="info">

      Local time is displayed on the right-hand side of the event log entry header that appears directly above this field.

    </Callout>

-   **Token Validity Duration:** Indicates the number of minutes for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge.
-   **URL:** Indicates the URL for which a browser challenge was issued.
-   **User Agent:** Indicates the user agent (e.g., web browser) that submitted the request that resulted in a browser challenge. A request's user agent is defined in the `User-Agent` request header.