---
title: Status Codes Report
---

The Status Codes Report shows CDN requests by HTTP Status Code and can be used to determine if your origin responds to CDN requests with HTTP error codes.

The report can also show the number of requests by other categories such as services and cache codes.

![Status Codes Report](/images/delivery/control/status-codes-report.png)

The report has these tabs:

[Overview](#overview)

[URLs](#urls)

## Report Specifications  {/*report-specifications*/}
|Specification|Description|
|---|---|
|Latency| Latency depends on the selected granularity. <br /> - 5 minutes: 5 to ten minutes<br />- Hour: 1 hour + delta (approximately 5-10 minutes)<br />- Day: 1 day + delta (approximately 5-10 minutes)|
|Granularity| 5 minutes, hour, day|
|Dimensions|Account, Status Codes, Services, Cache Codes, Request/Response Type|
|Metrics - Summary Area	|Content Served, Redirect, Error, Missing File|
|Metrics - Elsewhere|Requests (In, Out), Bytes (In, Out)|
|Delivery Mechanism	|EdgeQuery|
| Associated API Endpoint(s) | -   `GET /realtime-reporting-api/traffic/statuscodes` returns status code report data according to the query parameters passed<br />    <br />-   `POST /realtime-reporting-api/traffic/statuscodes` returns status code report data according to the parameters passed in the request body<br />    <br />-   `GET /realtime-reporting-api/traffic/statuscodes/cachecodes` returns a list of cache codes<br />    <br />-   `GET /realtime-reporting-api/traffic/statuscodes/requestresponsetype` returns a list of request response types<br />    <br />-   `GET /realtime-reporting-api/traffic/statuscodes/retentions` returns a list of retentions<br />    <br />-   `GET /realtime-reporting-api/traffic/statuscodes/services` returns a list of services |

## Selecting an Account {/*selecting-account*/}

Select one or more accounts in the Status Codes for at the top of the page.

<Callout type="info">-   If you don't select an account, the accounts for the default company are automatically selected, and a warning is displayed.<br />-   If you modify the selections in the *STATUS CODES FOR* dropdown , the filter selections you made are reset to defaults and the chart updates automatically to match the defaults.</Callout>

## Selecting a Date Range and Time Zone {/*selecting-date-range-time-zones*/}

Select a date range and timezone in the drop-down menus at the upper right part of the page.

The selected date range influences the values on the chart x-axis.

| Date Range | Increment |
| --- | --- |
| Three days or less | 5-minute data increments |
| Greater than three days and less than or equal to one month | 1-hour data increments |
| Larger than one month | 1-day data increments are displayed. |

<Callout type="info">Data in the *URLs* tab is of DAY granularity and is always stored in GMT-7, so the Time zone is disabled when you select the tab.</Callout>

## Overview Tab
### Summary Area  {/*summary-area*/}

For various statistics, the *Summary Area* shows the percent change for the selected reporting date range relative to the prior time period of the same length. For example, if you select **This Month**, the statistics show a comparison between this month's data and the previous month's.

Colors and arrows represent changes:
- An increase displays in green with an arrow pointing up.
- A decrease displays in red with an arrow pointing down.
- If there was no change from the previous period, the text is gray with an empty circle instead of an arrow.
- Percentage up or down is in bold text to the right of the arrow or empty circle.
- Information in gray text beneath the percentage up or down indicates the total date range covered minus any time remaining in the current period. For example, if you select **Last 7 days** as the reporting period and the current date is part of the past seven days, the past 13 days' information is displayed.

<Callout type="info">Information in the Summary Area depends on the selected accounts, time range, and time zone.
</Callout>

Statistics in the Summary Area are:

| Statistic | Description |
| --- | --- |
| CONTENT SERVED | Content was served to the requestor. |
| REDIRECT | Requests were redirected. |
| ERROR | Requests resulted in an error condition. |
| MISSING FILE | Requested file not found. |

### Chart   {/*chart*/}
#### Filtering Chart Data   {/*filtering-chart-data*/}
Using filter controls at the top of the report, you can filter on Status Codes, Services, Cache Codes, and Cache Conditions.

Make the desired selections, then click the **Apply** button to apply your filter choices.

To reset filters to the default, click the **Reset** button.

<Callout type="info">- Filter controls default to All.<br />- If you modify the selected accounts in the Status Codes for drop-down menu (see Selecting an Account), the filter selections you made are reset to defaults, and the chart is automatically updated to match the defaults.<br />- When you change the status codes filter, navigate to the Overview Tab, then navigate back to the URLs Tab, the filter selections are preserved in the URLs Tab.</Callout>

*Filter by* Selections

| Selection | Additional Control | Instructions |
| --- | --- | --- |
| Status codes | A text field to configure desired status codes. | Do any of the following:<br /><br />-   Click in the field and select pre-configured status code ranges.<br />-   Enter your own status code ranges.<br />-   Enter a single status code.<br /><Callout type="info">Duplicates status codes and ranges are not allowed.</Callout> |
| Services | A of services. | Select one or more values from the .<br /><Callout type="info">The selections available depend on the services for which your company has signed up. </Callout>|
| By Cache codes | A of cache codes. | Select one or more values from the :<br /><br />-   Miss - cache miss; response is delivered from customer origin<br />-   Redirect - request redirected<br />-   Hit - cache hit; response is delivered from cache<br />-   Other - not one of the above |
| By Request/Response type | A of request and response types. | Select one or more values from the :<br /><br />-   Standard - not any of the below<br />-   If modified since - client-issued 'If-Modified-Since' requests only<br />-   Negatively cached - caching of 4xx and 5xx responses<br />-   Refresh - CDN-issued refresh checks only |

#### Selecting Chart Granularity  {/*select-chart-granularity*/}

You can refine the chart by selecting a granularity value in the toggle above the chart. Toggles are active depending on the reporting date range.

Make a selection in the toggle. The time units on the chart's X-axis are updated to reflect your selection.

Each value has its own retention policy.

|Granularity|Data Retention Policy|
|---|---|
||5 min	|One week|
|Hour	|Five weeks|
|Day	|One year|

#### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

On the left above the granularity toggle is the report grouping in which you select a chart grouping.
-   Status codes
-   Accounts
-   Service
-   Cache code
-   Request/Response type

Make a selection. The chart content and labels beneath the chart are updated to reflect the selected option.

<Callout type="info">When you select Account, the accounts displayed reflect the selected accounts in the *Status Codes for* dropdown (see [Selecting an Account](#selecting-an-account)). All other selections reflect the chart filters applied to the chart (see [Filtering Chart Data](#filtering-chart-data)).</Callout>

#### Selecting Chart Metrics  {/*selecting-chart-metrics*/}

**Toggling Between Requests and Bytes**
By default, the chart displays the number of requests as the value for the y-axis. Users with appropriate permissions can also choose to view bytes instead of the number of requests using a on the right side of the screen under the summary bar:
-   All customers see 'Requests' in the dropdown.
-   Customers with additional permissions also see a second entry, 'Bytes'.

Customers who see both values can toggle between the two:
1.  Select a value from the *Requests/Bytes* dropdown under the summary bar on the right side:
    -   Requests - display requests (default)
    -   Bytes - display bytes
2.  The chart refreshes to reflect the selections you made.

    <Callout type="info">Contact your account manager to learn more about the 'Bytes' option.</Callout>

**Toggling Between Outgoing or Incoming Requests**
1.  Select a value from the Out/In under the summary bar on the right side:
    -   Out - Outgoing requests (default)
    -   In - Incoming content requests
2.  The chart refreshes to reflect the selections you made.

##### Toggling Chart Data  {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color. The labels reflect the data grouping (see [Selecting a Data Grouping](#selecting-a-data-grouping)) in the chart.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Labels that are toggled off have a gray font color.

Click a label to hide or show the corresponding data in the chart. The chart content is updated to reflect your selection.

##### Exporting Chart Data  {/*exporting-chart-data*/}

To export data currently displayed in the chart, click the Export drop-down menu on the right above the chart; then choose an option:
- *PowerPoint*: Export to a PowerPoint file that contains a screenshot of the chart.
- *CSV*: Export data to a Comma-Separated Values (CSV) file that reflects the currently selected chart options.

After you choose an option, Control creates and downloads the report.

### Creating Recurring Report Emails and Email Alerts  {/*creating-recurring-report-emails*/}

See [Working with Recurring Report Emails](/delivery/control/reports/general_information/#working-with-recurring-report-emails) and [Working with Email Alerts](/delivery/control/reports/general_information/#working-with-email-alerts).

<Callout type="info">You can also create email alerts in the URLs tab. For more information, see [Configuring Email Alerts Per URL](#configuring-email).</Callout>

## URLs Tab {/*urls-tab*/}

The URLs tab shows:
-   Missing Files information: requested files that are missing on your origin server and can be used to find and fix bad links and omitted files. A file is determined to be missing if your origin server returned an HTTP 404 status code during initial cache fill or a subsequent freshness check by the CDN.
-   File Errors information: requested files for which your origin server returned an HTTP error code and can be used to find and fix problems with specific files. A file is determined to have an error if your origin server returned an HTTP error code during initial cache fill or a subsequent freshness check by the CDN.

Any 5xx response is considered an error and appears in the report.

<Callout type="info">-   Data in the URLs tab is of DAY granularity and is always stored in GMT-7, so the Time zone is disabled when you select the tab.<br />-   Data is not available in realtime; it is processed at the end of each day, and becomes available the next day. As a result, if you select 'Today' or 'Last 24 Hours' in the data range selector, no data is available.<br />-   The number of reported URLs is limited to 50.</Callout>

The tab shows data in a table with three columns. You can sort the data by any column.
-   URLs: File URLs
-   Requests: Number of requests for the file that resulted in an error
-   \% of Total: Percent of requests for the file out of all requests for all files. Each row has a horizontal bar chart representing the percentage.

Data is aggregated by service (HTTP, HTTPS) for the specified date range.

### Selecting an Error Type {/*selecting-an-error-type*/}

Select 'Missing Files' or 'File Errors' in the dropdown under the tab header on the page's right side.

### Viewing Error Details {/*viewing-error-details*/}

1.  Click the **+** icon on a row to expand the row and display a chart.

    The chart shows the number of requests per time unit in the selected date range. The time unit depends on the date range you selected.

2.  Move your mouse over the chart to see details for any given time unit.
3.  Click the **-** icon to hide the chart.

### Filtering the URL List {/*filtering-the-urls-list*/}

You can filter data either by URL or status codes.

- To filter by URL, type a phrase in the search field, then press the **Enter** key on your keyboard.

- To filter by status codes, add, modify, or delete single status codes, or ranges of codes, then click the **Apply** button.

After the filter is instated, the contents of the table change to reflect your filter.

When you change the status codes filter, navigate to the *URLs Tab*, then navigate back to the *Overview Tab*, the filter selections are preserved in the *Overview Tab*.

### Sorting Data {/*sorting-data*/}

Click a column heading to sort data by that column. A bar is displayed above or below the column heading to indicate if the data is sorted in ascending or descending order, respectively.

### Configuring Email Alerts per URL {/*configuring-email*/}

You can configure email alerts on a URL basis, per your published host domain. See [Working with Email Alerts](/delivery/control/reports/general_information/#working-with-email-alerts).

### Exporting URLs Data

To export data to a Comma-Separated Values (CSV) file, click the Export drop-down menu to the right above the chart; then select CSV.

After you select CSV, Control creates and downloads the report.

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

| Metric | Calculation |
| --- | --- |
| Requests In, Out<br /><br />Bytes In, Out | No calculation. Data provided by EdgeQuery. |

### Overview Tab - Summary Area {/*overview-tab-summary-area*/}

The up or down change for a given metric is calculated as follows.

The metric from the previous period is compared to the metric from the current period.

|Comparison Results|Metric Presentation|
|---|---|
|The selected time period's value equals the previous time period.|Presented as no change.|
|The previous period's value is smaller than the current period.|Presented as up from the previous period. <br /><br />See also [Percentage Calculation](#percentage-calculation).|
|The previous period's value is greater than the current period.|Presented as down from the previous period.<br /><br />See also [Percentage Calculation](#percentage-calculation).|

#### Percentage Calculation {/*percentage-calculation*/}

The 'Up' and 'Down' presentations include a percentage.

`Percentage = ((newValue - oldValue) / oldValue) * HUNDRED_PERCENT`
