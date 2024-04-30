---
title: Live Push Report
---

The Live Push report provides many facets of information on Live Push Ingest from your publisher application to the EdgioCDN.

You can use the report to:

- Ascertain the availability of your live content to be delivered over the CDN
- Assist in determining the stability and efficiency of your publisher application and "first-mile" transit via request time and response codes
- View the storage (number of files, total size) used by your chunked streaming files
- Monitor aspects of your stream ingests by account, slot, and more

<Callout type="info">"First-mile" is the connection from your publisher application to the Edgio CDN.</Callout>

![Live Push Report](/images/delivery/control/live-push-report.png)

## Report Specifications  {/*report-specifications*/}

|Specification|Description|
|---|---|
|Latency| One hour|
|Granularity| 5 minutes, hour, day. <br />For day granularity, data is collected in the GMT-7 timezone.|
|Dimensions|Account, Stream Name, Status Code|
|Metrics - Summary Area	|Average Ingest Bitrate, Total Ingest, Average Request Duration|
|Metrics - Chart|Data Transfer In, Data Transfer Out, Request Duration|
|Metrics - Details Tab|Ingest Bytes, Egress Bytes, Requests, Request Duration|
|Delivery Mechanism	|Billing API|
|Associated API Endpoint(s)|- `GET /billing/v2/shortnames/{short name}/LivePushIngest` returns Live Push Ingest billing information<br />- `PUT https://{shortname}-{slotname}-pri.live-push.llnw.net` puts a chunked streaming file onto the Live Push Ingest server |

## Selecting Accounts, Date Range, and Time Zones  {/*selecting-accounts*/}

You can make selections in the controls above the tab header:

- *LIVE PUSH FOR*. Select one or more accounts to which you have access for cross-account analysis. Click the Select All button to select all accounts.
- *Date range*. Pick from pre-set time frames or choose custom date ranges in the drop-down menu. Click the Apply button on custom ranges.
- *Time zone*. The top five most commonly used timezones in Control are at the top of the drop-down menu. Scroll down for additional time zones.

## Choosing Stream Names and Status Codes  {/*chossing-stream-names*/}

Customer publishing applications send requests to store chunked streaming files on the Ingest server, and the server returns status codes to indicate the state of the request.

Use the *Stream Name/Status Codes Filter* to determine which stream (slot) names and status codes to display in all the report's tabs.

The filter icon (a funnel) on the tab header's left side allows you to filter by stream names and status codes. The icon is a toggle that displays or hides the filter control.

1.  Click the filter icon.
2.  Make selections in the subsequent *Filter by* dropdown.

    By default, the *Stream Name* and *Status Code* entries are unchecked. As such, data for all streams and status codes are displayed.

3.  If desired, select *Stream Name* or *Status Code* to display additional dropdowns to further filter for display in the chart.
4.  Click the *Apply* button.

## Overview Tab  {/*overview-tab*/}

This tab presents a synopsis of Live Push data for the selected account and reporting data range. Included are a summary area and a stacked bar chart.

### Summary Area  {/*summary-area*/}

For various statistics, the Summary Area shows the percent change for the selected reporting date range relative to the prior time period of the same length. For example, if you select This Month, the statistics show a comparison between this month's data and the previous month's.

Colors and arrows represent changes:

- An increase displays in green with an arrow pointing up.
- A decrease displays in red with an arrow pointing down.
- If there was no change from the previous period, the text is gray with an empty circle instead of an arrow.
- Percentage up or down is in bold text to the right of the arrow or empty circle.
- Information in gray text beneath the percentage up or down indicates the total date range covered minus any time remaining in the current period. For example, if you select Last 7 days as the reporting period and the current date is part of the past seven days, the past 13 days' information is displayed.

Statistics in the *Summary Area* are:

| Statistic | Description |
| --- | --- |
| Average Ingest Bitrate | Average ingest bitrate of all data coming into the Ingest server from your publisher application, measured in bits per second. |
| Total Ingest | Total of all data coming into Ingest server from your publisher application, measured in bytes. |
| Average Request Duration | Average duration of requests from your publisher application to store a chunked streaming file on a Ingest server, where a request duration encompasses the time request arrives at the server to the time the request is complete. Measured in seconds. |

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

Beneath the Summary Area on the left is a that allows you to determine how data is broken out in the chart: by Account, Stream Name, or Status Code.

Make a selection.

| Selection | Data Displayed in Chart | Data Displayed in Legend |
| --- | --- | --- |
| Not Selected | All data for the selected metric. | Single entry: *All Data*. |
| Account | Data for the selected account and metric. | A label for each account chosen. |
| Stream Name,<br /><br />Status Code | Data for the filtered Stream Name and Status Code. | A label for each Stream Name and Status Code you filtered. |

The chart reflects your selection.

### Choosing Chart Granularity  {/*choosing-chart-granularity*/}

The chart can be further refined by selecting one of the Increment values:
-   5 min
-   Hour
-   Day

The selection you make determines increments along with Y-axis. For report date ranges of 3 days or less, 5-minute data increments are displayed. For date ranges greater than 3 days but less than or equal to 1 month, 1-hour data increments are shown. For larger date ranges, 1-day data increments are displayed.

### Choosing Metrics  {/*choosing-metrics*/}

Above the chart, on the right, is a drop-down menu that allows you to select chart metrics.

1.  Make a selection.

| Selection | Description |
| --- | --- |
| Ingress Bytes | Total of all data coming into Ingest server from your publisher application, measured in bytes. |
| Egress Bytes | Total data of all your streams egressing from the Ingest server to the CDN. |
| Request Duration | Time taken to process a request to store a chunked streaming file on a Ingest server, from the time a request arrives at the server to the time the request is complete. |

2.  The chart reflects your selection.

### Toggling Chart Data  {/*toggling-chart-data*/}

A legend beneath the chart identifies the chart content by color. The legend reflects the choices you made in the *Stream Name/Status Code Filter* and the *Data Breakout* dropdown.

For example, if you filtered by two specific stream names and selected *Stream Name* in the , the stream's data is displayed in the chart. Labels for the two names display in the chart legend.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.


### Exporting Chart Data  {/*exporting-chart-data*/}

To export data currently displayed in the chart, click the Export drop-down menu on the right above the chart; then choose an option:
- *PowerPoint*: Export to a PowerPoint file that contains a screenshot of the chart.
- *CSV*: Export data to a Comma-Separated Values (CSV) file that reflects the currently selected chart options.

After you choose an option, Control creates and downloads the report.

## Details Tab  {/*details-tab*/}

This tab shows Ingest metrics in a tabular format. Rows in the table can be expanded or collapsed, allowing you to drill down into the table. You can drill down in the table to view metrics by month, day, and hour. The metrics displayed are:


| Metric | Description |
| --- | --- |
| Ingest Bytes | Total of all data coming into Ingest server from your publisher application, measured in bytes. |
| Egress Bytes | Total data of all your streams egressing from the Ingest server to the CDN. |
| Requests | Total number of requests from your publisher application to the Ingest server. |
| Request Duration | Duration of requests from your publisher application to the Ingest server to store chunked streaming files on the Ingest server. |

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

Above the table on the left is a you can use to set the table's grouping. Make a selection.


| Selection | Data Grouped by |
| --- | --- |
| Not Selected | All data for the selected metric. |
| Account | The account you selected above the tab header. |
| Stream Name | The stream names associated with the account. |
| Status Code | Status code: 201, 204, 400. |

The first-level groupings reflect the item you selected. For example, if you select *Status Code*, the table displays three expandable rows, one for each status code.

If you chose *Not Selected*, data is grouped by month under a single expandable heading: *All Data*.

Click a first-level grouping to display metrics for months. Click a month to display metrics for the days in the month. Click once more to display metrics for each hour in the day.

<Callout type="info">-   Rows that include "(partial)" indicate not all data is available for the time period. Only status codes returned during the selected time frame are displayed.<br /> -   Only status codes returned for the time period are displayed.</Callout>

### Exporting Data  {/*exporting-data*/}

You can export data in the table to a Comma-Separated Values (CSV) file.

Click the *Export CSV* dropdown on the right above the table, then choose an option.

| Option | CSV File Contains |
| --- | --- |
| Monthly | A total for each metric in each month. |
| Daily | A total for each metric in each day in each month. |
| Hourly | A total for each metric in each hour in each day in the month. |

After you choose an option, creates and downloads the report.

## Storage Tab  {/*storage-tab*/}

This tab shows metrics about your chunked streaming files stored on the Live Push Ingest server.

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

Above the chart on the left is a you can use to set the grouping the in table. Make a selection.


| Selection | Data Grouped by |
| --- | --- |
| Not Selected | All data for the selected metric. |
| Account | The account you selected above the tab header. |
| Stream Name | The stream names associated with the account. |

### Choosing Metrics  {/*choosing-metrics*/}

On the right, above the chart, is a that allows you to select metrics about your chunked streaming files stored on the Ingest server.

Make a selection.

| Selection | Description |
| --- | --- |
| Total Bytes Stored | Total size of all files. |
| Total Files | Total number of files. |

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

The *Overview Tab Summary Area* and chart show values for the chosen metric in the *Stream Name/Status Codes Filter*.

The unit of measurement depends on the chosen metric.

### Overview Tab - Summary Area  {/*overview-tab-summary*/}

| Metric | Calculation |
| --- | --- |
| Average Ingest Bitrate | The average bitrate of the stream used to ingest content. |
| Total Ingest | No calculation. Data provided by EdgeQuery. |
| Average Request Duration | The average duration of requests. |

The up or down change for a given metric is calculated as follows.

The metric from the previous period is compared to the metric from the current period.

|Comparison Results|Metric Presentation|
|---|---|
|The selected time period's value equals the previous time period.|Presented as no change.|
|The previous period's value is smaller than the current period.|Presented as up from the previous period. <br />See also [Percentage Calculation](#percentage-calculation).|
|The previous period's value is greater than the current period.|Presented as down from the previous period. <br /> See also [Percentage Calculation](#percentage-calculation).

#### Percentage Calculation {/*percentage-calculation*/}

The 'Up' and 'Down' presentations include a percentage.

Percentage = ((newValue - oldValue) / oldValue) * HUNDRED_PERCENT

### Overview Tab - Chart  {/*overview-tab-chart*/}

| Metric | Calculation |
| --- | --- |
| Data Transfer In | No calculation. Data provided by EdgeQuery. |
| Data Transfer Out | No calculation. Data provided by EdgeQuery. |
| Request Duration | Duration of the request. |

### Details Tab  {/*details*/}

| Metric | Calculation |
| --- | --- |
| Ingest Bytes | No calculation. Data provided by EdgeQuery. |
| Egress Bytes | No calculation. Data provided by EdgeQuery. |
| Requests | No calculation. Data provided by EdgeQuery. |
| Request Duration | No calculation. Data provided by EdgeQuery. |
