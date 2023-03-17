---
title: Reports
---

Analyze traffic patterns through the following reports: 
-   [Traffic Summary](#traffic-summary)
-   [Bandwidth](#bandwidth)
-   [Data Transferred](#data-transferred)
-   [Custom Reports](#custom-reports) (Domain-Specific Reports)

**What is the difference between reports and our security dashboards?**

Our security dashboards provide information about traffic flagged by {{ PRODUCT_SECURITY }}. These reports, on the other hand, provide statistics for all requests regardless of whether they were screened by {{ PRODUCT_SECURITY }}. 

<Callout type="info">

  These reports require {{ PRODUCT_SECURITY }}. Although our service includes a basic offering called {{ PRODUCT_SECURITY }} Insights, it may require activation. We also offer more comprehensive security soutions. {{ ACCOUNT_UPGRADE }}

</Callout>

## Data Availability and Retention {/*data-availability-and-retention*/}

Report data is typically available within 24 hours of when a request was processed and it is retained for 18 months.

<Callout type="info">

  Under certain circumstances, it may take up to 7 days to gather a
  comprehensive set of log data for all requests. Viewing a report under such circumstances would provide a
  partial representation of the activity that took place during the last 7
  days.  

  <br />Delays in report data gathering are typically caused by 
  streams that are left open for long periods of time or when a server is taken
  down for maintenance.

</Callout>

## Unit Conversion {/*unit-conversion*/}

Although data is stored in bytes, the value displayed in a
report is a much larger unit (e.g., Gigabytes or Terabytes). This makes
it easier for users to assess and analyze traffic based on report
data. In order to display data as a larger unit, it must undergo a
conversion process from Bytes to Kilobytes to Megabytes to Gigabytes to
Terabytes. The conversion factor used in this calculation is 1,000
instead of 1,024. This has the benefit of simplifying the reporting
interface and eliminating confusion for general users in differences
between decimal and binary representation of these values.

<Callout type="info">

  The above conversion process complies with the convention set by IEC in
  accordance with the addendum to IEC 60027-2, IEE, and ISO standards.

</Callout>

<Callout type="info">

  Our reports do not use the kibi, mebi, gibi terminology. Instead, our
  reports use the correct terminology of KB, MB, GB, and TB.

</Callout>

## Traffic Summary Report {/*traffic-summary-report*/}

The **Traffic Summary** report tracks traffic
over a given month.

<Callout type="info">

  For the purposes of billing, report data is closed on the 3rd of the
  month. This means that report data for the current month is incomplete
  until after the third of the next month.

</Callout>

This report may be filtered to only show data for traffic that is routed
to a particular region. The available regions are explained below.

| Region                 | Description                                                                                                                                            |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Global                 | Select this region to generate a report for all of your traffic.                                                                               |
| North America & Europe | Select this region to generate a report for traffic routed through North America and Europe.                                               |
| Asia & South America   | Select this region to generate a report for traffic routed through Asia & South America.                                                   |
| India                  | Select this region to generate a report for traffic routed through  India.                                                                  |
| China                  | Select this region to generate a report for traffic routed through  China.                                                                  |
| Indonesia              | Select this region to generate a report for traffic routed through  Indonesia.                                                              |
| Nordics                | Select this region to generate a report for traffic routed through Nordic countries (i.e., Denmark, Finland, Iceland, Norway, and Sweden). |
| Taiwan                 | Select this region to generate a report for traffic routed through  Taiwan.                                                                 |

The **Traffic Summary** report consists of two sections, which
are **Traffic By Media Type** and **Customer Storage**. You should ignore the **Customer Storage** section.


The **Traffic By Media Type** section provides a breakdown of
total traffic activity for the given region over the
specified time period. A description is provided below for each
available field.

| Field                 | Description                                 |
| --------------------- | ------------------------------------------- |
| Media Type Name       | Data for your traffic is reported within the `HTTPS Large Object` row. |
| 95% Bandwidth         | Ignore this column.                                          |
| Data Transferred (GB) | Indicates the total amount of data (GB) transferred.         |
| Data Transferred (TB) | Indicates the total amount of data (TB) transferred.         |

**To generate a Traffic Summary report**

1.  Navigate to the Traffic Summary report.
    1.  From the {{ PORTAL_LINK }}, click on the **AppOps** tab.
    2.  Click **Open on my.edgecast.com** to load the **Security** page.
    3.  Click **Core Reports**.
    4.  Click **Traffic Summary**. By default, a Traffic Summary report displays data for the current month across our entire network.

        <Callout type="info">

          Data is reported through the `HTTPS Large Object` row. Ignore all other rows. 

        </Callout>

2.  Optional. Use the **Date Range** option to view report data for a different month.

## Bandwidth and Data Transferred Reports {/*bandwidth-and-data-transferred-reports*/}

The [Bandwidth](#bandwidth-report) and [Data Transferred](#data-transferred-report) reports allow you to filter and export report data.

### Filtering Report Data {/*filtering-report-data*/}

You may filter report data by POP (Point of Presence) and time.

#### Filtering by POP {/*filtering-by-pop*/}

You may filter the Bandwidth and the generic Data Transferred reports by the POP (i.e., edge node) through which the request was served. A POP or edge node identifies a location on our network through which users can request and receive content.

Set the **Edge Nodes** option to either of the following:

-   **All Edge Nodes:** The report will contain data for all POPs.
-   **POP:** Select a POP from the list to filter the report to
    only show data for the requests served through the selected POP.

Modifying the **Edge Nodes** option automatically refreshes
the report.

#### Filtering by Time {/*filtering-by-time*/}

The time period for which data will be reported may defined for most
reports. The available filtering options for defining this time period
are described below.

| Time Period   | Description                                         |
| ----------- | ----------- |
| Month Year    | Configures the report to display data for the selected month/year combination (e.g., July {{ YEAR }}). This period starts at midnight on the first day of the month and ends at 23:59 on the last day of the month.                                              |
| Past 24 Hours | Configures the report to display data for the last 24 hours. Upon selecting this option, the report's start/end date will be updated to a 24 hour period that ends at the top of the hour of the current hour.  Example:  If it is currently 10:30 a.m., then the 24 hour period would start at 10 a.m. on the previous day and end at 10 a.m. on the current day.              |
| Today         | Configures the report to display data for the current day. Upon selecting this option, the report's start date/time will be updated to read 00:00 (i.e., midnight) of the current day. The report's end date/time will be the current date and time.                                           |
| This Week     | Configures the report to display data for the current week. Upon selecting this option, the report's start date/time will be updated to read 00:00 (i.e., midnight) for a date 7 days prior to today. The report's end date/time will be the current date and time.                              |
| This Month    | Configures the report to display data for the current month. Upon selecting this option, the report's start date/time will be updated to read 00:00 (i.e., midnight) for the first day of the current month. The report's end date/time will be the current date and time.                          |
| Yesterday     | Configures the report to display data for yesterday. Upon selecting this option, the report's start date/time will be updated to read 00:00 (i.e., midnight) of the previous day. The report's end date/time will be 23:59 of the previous day.                                       |
| Last Week     | Configures the report to display data for the last week. Upon selecting this option, the report's start date/time will be updated to read 00:00 (i.e., midnight) for a date that is 14 days prior to the current date. The report's end date/time will be 23:59 for a date 7 days prior to the current date.                                       |
| Last Month    | Configures the report to display data for the previous month. Upon selecting this option, the report's start date/time will be updated to read 00:00 (i.e., midnight) for the 1^st^ of the previous month (e.g., {{ YEAR }}-07-01 00:00). The report's end date/time will be 23:59 for the last day in that month (e.g., {{ YEAR }}-07-31 23:59).         |
| Custom        | Allows a custom start/end date/time to be applied to the report. Define this time period through the **From** and the **To** option, respectively.  Custom time periods should be limited to approximately 1 month. Specifying a longer time frame may cause a long delay or even prevent the report from being generated.                        |

<Callout type="info">

  The set of available time filtering options varies by report type.

</Callout>

The report will be updated upon selecting a predefined time period from
the **Date Range** option. Apply a custom time period to a report
by clicking **Go**.


### Relationship between Start/End Time and Data Reported {/*relationship-between-startend-time-and-data-reported*/}

A factor that affects the set of data that will be included in a report
is the inclusive nature of start and end date/times. In order to
understand what this means, you will need to know that data is reported
in chunks of time (e.g., 5 minutes, 1 hour, 1 day, etc.). A report will
include all of the chunks that fall within the specified time period and
the chunks that correspond to the specified start and end date/time.
This will occur regardless of whether the specified start and end
date/time falls at the start, middle, or end of a chunk of time.

A few key facts about how time chunks affect or interact with report
data:

-   The amount of time covered by a chunk varies for each type of
    report. This time interval can either be 5 minutes, 1 hour, 1 day,
    or 1 month.
-   A report's time chunk should not be confused with the date/time
    range used to generate the report. Please refer to the documentation
    provided for the desired report to find out the time chunk that it
    uses to report data.
-   If a start/end time cannot be specified for a report, then the
    report will include data for the specified start/end date. For
    example, specifying a date range of "{{ YEAR }}-08-14 to {{ YEAR }}-08-15"
    will include data for both 8/14/{{ YEAR }} and 8/15/{{ YEAR }}.
-   A start or end date/time cannot be specified for monthly reports
    (e.g., Traffic Summary). A date range is not displayed for this type
    of report, since report data will always be limited to the specified
    month (e.g., 08-01-{{ YEAR }} 00:00:00 -- 08-31-{{ YEAR }} 23:59:59 GMT). As a
    result, this case is not covered in this section.

It is important to know the following information when generating or
viewing a report:

-   What is the report's start and end date/time?
-   What type of time chunk is used to report data?

The above information can be used to identify the exact time period that
will be covered by a report. Make sure to account for the chunk
of time used by the report to figure out the exact time period for which
activity will be reported.

The following table illustrates how the exact time period that will be
included in a report can be calculated for each type of time chunk. This
example assumes that the following date/time range was used to generate
the report:

-   **Start Date/Time:** {{ YEAR }}-08-01 07:02:00
-   **End Date/Time:** {{ YEAR }}-08-02 00:00:00

| Time Chunk | Actual Start Date/Time | Actual End Date/Time |
|------------|------------------------|----------------------|
| 5 Minutes  | {{ YEAR }}-08-01 07:00:00    | {{ YEAR }}-08-02 00:04:59  |
| 1 Hour     | {{ YEAR }}-08-01 07:00:00    | {{ YEAR }}-08-02 00:59:59  |
| 1 Day      | {{ YEAR }}-08-01 00:00:00    | {{ YEAR }}-08-02 23:59:59  |

### Exporting Report Data {/*exporting-report-data*/}

Report data, which is displayed directly below a graph, can be exported
as a comma-separated values (CSV) file. This CSV file contains a list of
headers and the report data that corresponds to them. This
industry-standard file format is widely supported by log file analysis
tools (e.g., Sawmill) and spreadsheet applications (e.g., Microsoft
Excel). This allows you to analyze report data using your preferred
software application.

Report data cannot be exported for the Traffic Summary report.

The statistical information used to generate our reports is mined from
data logged by our servers.

**To export report data**

1.  Generate the desired report.
2.  Click the 
    <img data-inline-img src="/images/icons/icon_spreadsheet.png" alt="Spreadsheet icon" /> (spreadsheet) icon. Report data
    will be saved on your computer as a CSV file.
3.  Import the CSV file using the desired log file analysis or
    spreadsheet application.

<Callout type="info">

  By default, a generic report-specific name will be assigned to the CSV
  file. Therefore, it is recommended that you rename the CSV file
  immediately after downloading it.

</Callout>

### Bandwidth Report {/*bandwidth-report*/}

This type of report tracks bandwidth (Mbps) usage by 
protocol. This report is based on traffic statistics tracked by our edge
servers.

**Key information:**

-   View the amount of bandwidth usage at any given time by hovering
    over the desired point in the line. The time
    interval between points in the line is determined by whether you are
    viewing an hourly (5 minute increments) or daily (hourly increments)
    report.
-   Data is reported in 5 minute chunks.
-   If you are viewing data for a recent time period (e.g., Today or
    Past 24 Hours), then you may notice that amount of bandwidth usage
    tapers off as it approaches the current time. This trend is a result
    of the amount of time that it takes for log information to be
    collected from our edge servers.

The data that was used to generate the graph can be viewed below it. A
table indicates bandwidth usage (megabits per second) in five minute
intervals over the time period covered by the report.

**Graph information:**
-   **Title:** Indicates whether time will be expressed by hour or
    by day.
-   **Y-axis (Left):** Indicates bandwidth usage in megabits per
    second (Mbps).
-   **X-axis (Below):** Indicates the time for the bandwidth
    reported by the corresponding data point in the graph. The time
    interval between data points can be either hourly or daily.
    -   **Hourly:** This time interval, which is used for the "Past 24
        Hours," "Today," and "Yesterday" time periods, identifies a date and time (UTC/GMT) using a 24 hour format (e.g., {{ YEAR }}-07-08 15:00).

        **Format:** `<YYYY>-<MM>-<DD> <hh>:<mm>`

    -   **Daily:** This time interval, which is used for all other time periods, identifies a date (e.g., {{ YEAR }}-07-08) that is calculated using the UTC/GMT time zone.

        **Format:** `<YYYY>-<MM>-<DD>`

**To generate a Bandwidth report**

1.  Navigate to the Bandwidth report.
    1.  From the {{ PORTAL_LINK }}, click on the **AppOps** tab.
    2.  Click **Open on my.edgecast.com** to load the **Security** page.
    3.  Click **Core Reports**.
    4.  Expand **Bandwidth** and then select **HTTPS Large**. By default, a Bandwidth report displays data for the last 24 hours across our entire network.

        <Callout type="info">

          The `HTTP Large` report is solely for unencrypted HTTP traffic. 

        </Callout>

2.  Optional. Use the **Date Range** option to define either a
    custom or predefined (e.g., This Week) time period for which report
    data will be generated.

### Data Transferred Report {/*data-transferred-report*/}

This type of report tracks the amount of data transferred
(MB) on your account. 

**Key information:**
-   You may [generate](#data-transferred-generate) a generic Data Transferred report or break down traffic by the IP version (i.e., IPv4 or IPv6) through which clients requested your content.
-   View the amount of data transferred at a specified point in time by
    hovering over the desired bar in the graph. The time interval
    represented by each bar is determined by whether you are viewing an
    hourly (5 minute increments) or daily (hourly increments) report.
-   Data for transactions that did not complete during the requested
    time period will be excluded. This holds true even when the
    transaction started before or during the time period covered by the
    report.
-   Data is reported in 5 minute chunks.
-   If you are viewing data for a recent time period (e.g., Today or
    Past 24 Hours), then you will notice that amount of data transferred
    tapers off as it approaches the current time. This trend is a result
    of the amount of time that it takes for log information to be
    collected from our edge servers.

The data that was used to generate the graph can be viewed below it. A
table indicates the amount of data transferred in megabytes and
gigabytes in five minute intervals over the time period covered by the
report.

**Graph information:**
-   **Title:** Indicates whether time will be expressed by hour or by day.
-   **Y-axis (Left):** Indicates the amount of data transferred in
    megabytes (MB).
-   **X-axis (Below):** Indicates the time for the data transferred
    reported by the corresponding bar in the graph. The time interval
    between bars can be either hourly or daily.
    -   **Hourly:** Information on when this time interval is used
        and its format is provided below.
        -   **Scope:** Time interval varies according to report type.
            -   **All Traffic (HTTPS Large):** This time interval is used
                for the "Past 24 Hours," "Today," and "Yesterday"
                time periods.
            -   **IP Protocol:** This time interval is used for all
                time periods.
    -   **Daily:** This time interval is used for all other time
        periods for the generic Data Transferred report (HTTPS Large).
    -   **Format:** `<YYYY>-<MM>-<DD> <hh>:<mm>`
        -   Identifies a date and time (UTC/GMT) using a 24 hour format (e.g., {{ YEAR }}-07-08 15:00).

<a id="data-transferred-generate"></a>

**To generate a Data Transferred report**

1.  Navigate to the Data Transferred report.
    1.  From the {{ PORTAL_LINK }}, click on the **AppOps** tab.
    2.  Click **Open on my.edgecast.com** to load the **Security** page.
    3.  Click **Core Reports**.
    4.  Perform either of the following steps:
        -   View data transferred for all of your traffic by expanding **Data Transferred** and then selecting **HTTPS Large**.

            <Callout type="info">

              The `HTTP Large` report is solely for unencrypted HTTP traffic. 

            </Callout>

        -   View data transferred by IP version by expanding **IPv4/IPv6** and then selecting **Data Transferred**.

        <Callout type="info">

          By default, a Data Transferred report displays data for the last 24 hours across our entire network.

        </Callout>

2.  Optional. Use the **Date Range** option to define either a
    custom or predefined (e.g., This Week) time period for which report
    data will be generated.

## Custom Reports {/*custom-reports*/}

Custom reports provide basic statistical information on a per domain basis for requests processed through our security offering. 

<Callout type="important">

  The primary function of Custom reports is to assess performance. They
  should not be used for billing purposes or exact numeric statistics.

</Callout>

Determine the type of report that will be generated through the **Metrics** option:

-   **Hits:** Measures the total number of requests on a per domain basis.
-   **Data Transferred:** Measures the total amount of data transferred from our edge servers to HTTP clients (i.e., web browsers) on a per domain basis. The amount of data transferred is calculated by adding HTTP response headers with the response body. As a result, the amount of data transferred for each asset will be greater than its actual file size.

After generating a custom report, a bar chart will be generated for the
top 10 domains according to the metric defined in the **Metrics** option. This allows for a quick assessment of the domains producing
the most amount of traffic.

<Callout type="info">

  View the amount of data transferred on a specific domain over the
  specified time frame by hovering over the desired bar.

</Callout>

<Callout type="info">

  Directly below the bar chart, statistics on hits or the amount of data
  transferred on a per domain basis are broken down by HTTP status code.

</Callout>

**To generate a Custom report**

1.  Navigate to the **Custom Reports** page.

    1.  From the {{ PORTAL_LINK }}, click on the **AppOps** tab.
    2.  Click **Open on my.edgecast.com** to load the **Security** page.
    3.  Click **Custom Reports**.

2.  Optional. From the **Metrics** option, select whether a
    report will be generated for hits or data transferred.
3.  Verify that the **Groupings** option is set to `HTTP Response Codes`.
4.  Optional. Use the **Date Range** option to define either a
    custom or predefined (e.g., This Week) time period for which report
    data will be generated.
5.  Click **Go**.

### Custom Report Fields {/*custom-report-fields*/}

This section describes all fields used by the reports in the Custom
Report module.


| Field                 | Description                                 |
| --------------------- | ------------------------------------------- |
| 1xx                   | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column that resulted in a `1xx` HTTP status code.                     |
| 2xx                   | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column that resulted in a `2xx` HTTP status code (e.g., `200 OK`).                     |
| 3xx                   | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column that resulted in a `3xx` HTTP status code (e.g., `302 Found` or `304 Not Modified`).                    |
| 4xx                   | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column that resulted in a `4xx` HTTP status code (e.g., `400 Bad Request`, `403 Forbidden`, or `404 Not Found`).                       |
| 5xx                   | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column that resulted in a `5xx` HTTP status code (e.g., `500 Internal Server Error` or `502 Bad Gateway`).            |
| Data Transferred (MB) | Indicates the total amount of data transferred, in Megabytes, from our edge servers to HTTP clients (i.e., web browsers) for the domain indicated by the **Description** column. The amount of data transferred is calculated by adding HTTP response headers with the response body. As a result, the amount of data transferred for each asset will be greater than its actual file size.                  |
| Description           | Identifies a domain by its name (e.g., cdn.mydomain.com).                          |
| Hits                  | Indicates the total number of requests to the domain identified in the **Description** column.                |
| Other                 | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column that resulted in a HTTP status code that falls outside of the `1xx` - `5xx` range.                                      |
| Platform              | Returns `HTTP Large Object`. |
| Unassigned            | Indicates the total number of requests or data transferred (MB) for the domain indicated by the **Description** column for which an HTTP status code information was not logged. |
