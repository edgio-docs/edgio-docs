---
title: LDS Report Overview Report
---
The LDS Overview Report allows you to check Log Delivery Service (LDS) data latency, verify data completeness, and view the volume of information uploaded to log files.

## Concepts  {/*concepts*/}

When a request for your content enters the CDN, EdgePrism logs the request. Sometime later, Log Delivery Service gathers your log entries and then delivers them in files in one of three locations, depending on your Log Delivery Service configurations:

- Edgio's Origin Storage
- The Google Cloud Platform
- Amazon S3 Buckets

For information about Log Delivery Service configurations, see [Configuring Log Delivery Service](/delivery/control/configure/log_delivery_service).

Despite Edgio's robust network capabilities, issues may occur.

- Latency: There is sometimes a delay involved delay involved between the time a request is logged on edge servers and the time the request is delivered in Log Delivery Service files to the storage.

- Data Completeness: On occasion, only a subset of log entries will be delivered. Data completeness is a comparison of the number of log lines uploaded in Log Delivery Service files with the number of requests recorded by EdgePrism.

### Page Layout  {/*page-layout*/}

The report displays data on a single page in these sections:

[Data Latency](#data-latency-section)

[Data Completeness](data-completeness-section)

[Data Transfer](#data-transfer-section)

## Report Specifications  {/*report-specifications*/}

|Specification|Description|
|---|---|
|Latency| Latency depends on the selected granularity. <br /> - 5 minutes: 5 to ten minutes<br />- Hour: 1 hour + delta (approximately 5-10 minutes)<br />- Day: 1 day + delta (approximately 5-10 minutes)|
|Granularity| Data Latency Section: <br />-   Up to 30 minutes<br />-   30-40 minutes<br />-   40-50 minutes<br />-   More than 60 minutes.<br /><br />Data Completeness and Data Transfer Sections:<br />-   10 min<br />-   hour<br />-   day|
|Dimensions|Accounts, Storage Locations|
|Metrics	|Data Latency, Data Completeness, Data Transfer|
|Delivery Mechanism	|EdgeQuery|
|Associated API Endpoint(s)|- `POST /reporting-api/lds` returns LDS report data according to the filters passed <br /><br />-`POST /reporting-api/lds/data-completeness` returns LDS completeness data according to the filters passed |

## Selecting Date Range and Time Zone  {/*selecting-date-range-time-zone*/}

Select a date range and timezone in the drop-down menus at the upper right part of the page.

The selected date range influences the data in each chart on the page.

| Date Range | Increment |
| --- | --- |
| Three days or less | 5-minute data increments |
| Greater than three days and less than or equal to one month | 1-hour data increments |
| Larger than one month | 1-day data increments |

## Selecting an Account  {/*selecting-an-account*/}

## Selecting Storage Locations  {/**/}
Make one or more selections in the drop-down menu to the right of the accounts drop-down menu. Data in the charts on the page is restricted to the selections you make.

## Data Latency Section  {/*data-latency-section*/}

This section displays the percentage of request entries delivered in LDS files over four latency (see [Concepts](#concepts)) windows: up to 30min, 30-40min, 45-60min, more than 60 min.

For example, you can view the percentage of requests logged within 30 minutes of the time the requests were received.

You can also view latency measurements by moving your mouse pointer over the chart. Information displays in popups.

The sum of all percentages is 100%.

Labels beneath the chart allow you to select specific latency time windows.

## Data Completeness Section  {/*data-completeness-section*/}

This section shows data completeness measurements (see [Concepts](#concepts)) in a bar chart.

You can also view data completeness measurements by moving your mouse pointer over the chart. Information displays in popups.

Following is the data on the chart:
-   X-Axis: Request time in 10-minute, hourly, or daily granularity depending on the date range selected in the at the top right of the report.
-   Y-Axis: Percentage of data already uploaded to the storage destination.

Columns are displayed for every destination (, , and so on) for the accounts you selected as described in [Selecting an Account](#selecting-an-account). Each destination is identified by a label under the chart.

<Callout type="info">Data completeness measurements can cross time boundaries. For example due to network issues LDS might deliver only 40 out of 200 requests that occurred during some day for a customer, so the completeness will be 20%. Once the issue is fixed and LDS delivers the rest of the data for that day, completeness will be increased to 100%.</Callout>

### Toggling Chart Data  {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color. The labels reflect the locations configured for Log Delivery Service configurations.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Labels that are toggled off have a gray font color.

Click a label to hide or show the corresponding data in the chart. The chart content is updated to reflect your selection.

## Data Transfer Section  {/*data-transfer-section*/}

This section shows the volume of data transferred to your storage location.

Following is the data on the chart:
- X-Axis:Delivery time in 10-minute, hourly, or daily granularity depending on the date range selected in the drop-down menu at the top right of the report.
- Y-Axis: Size of delivered files in gigabytes (GB).

### Toggling Chart Data  {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color and has a single entry, *Data Transfer*.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Labels that are toggled off have a gray font color.

Click a label to hide or show the corresponding data in the chart. The chart content is updated to reflect your selection.

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

| Metric | Calculation |
| --- | --- |
| Data Latency | Request Delivery Time - Request Logging Time<br /><br />Example: A request was logged by at 10:30 and delivered it in file at 10:55, so delivery latency for that request is 25 minutes. |
| Data Completeness | Number of log lines delivered by LDS / number of egress requests from the reporting system.<br /><br />The maximum value is 100%. |
| Data Transfer | No calculation. Data provided by . |
