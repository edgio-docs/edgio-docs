---
title: Unified Traffic Report
---

Traffic reports display summary data about CDN usage, such as data volume and the number of associated requests and connections, by service (protocol). Traffic reports can include both high-level overviews and detailed data.

The Unified Traffic Report provides an integrated view of combined traffic for legacy Limelight and legacy Edgecast for one or more selected Accounts. The report loads with the following smart defaults, which you can change by making further selections in the header.

![Traffic Report](/images/delivery/control/unified-traffic-report.png)

- The Account is your “default” account, which you set in *My Account* > *Profile* > *Default Account*.
- The time frame is “Last 30 days.”
- The timezone is your chosen “Timezone” setting from your profile in “My Account.”
- The data payload is organized “By protocol” and includes all protocols for which data exists within the selected timeframe and timezone. The report is capable of showing these protocols: HTTP, HTTPS, HLS, andHDS.DASH, HTTP, HTTPS, MSS, HLS.

Traffic from both IPv4 and IPv6 addresses is reported. If you need IPv6 support but have not previously requested it be enabled, please contact Edgio Customer Support.

## Report Specifications  {/*report-specifications*/}
|Specification|Description|
|---|---|
|Latency| Latency depends on the selected granularity. <br /> - 5 minutes: 5 to ten minutes<br />- Hour: 1 hour + delta (approximately 5-10 minutes)<br />- Day: 1 day + delta (approximately 5-10 minutes)|
|Granularity| 5 minutes, hour, day|
|Dimensions|Account, Protocol, Segment, Continent, Country, CDN Efficiency, URLs, Published Hosts, Referrer URLs, File Types|
|Metrics - Summary Area	|Average traffic rate<br />Total bytes transferred<br />Total requests|
|Metrics - Elsewhere|Throughput (In, Out, and Total), Data Transfer (In, Out, and Total), or Requests (In, Out, and Total).|
|Delivery Mechanism	|EdgeQuery|

## Overview   {/*overview-tab*/}

The *Overview* serves as a high-level snapshot of your aggregated data and allows you to export data and create Recurring Report Emails and configure Email Alerts.

### Summary Area  {/*summary-area*/}

For various statistics, the Summary Area shows the percent change for the selected reporting date range relative to the prior time period of the same length. For example, if you select This Month, the statistics show a comparison between this month's data and the previous month's.

Colors and arrows represent changes:
- An increase displays in green with an arrow pointing up.
- A decrease displays in red with an arrow pointing down.
- If there was no change from the previous period, the text is gray with an empty circle instead of an arrow.
- Percentage up or down is in bold text to the right of the arrow or empty circle.
- Information in gray text beneath the percentage up or down indicates the total date range covered minus any time remaining in the current period. For example, if you select Last 7 days as the reporting period and the current date is part of the past seven days, the past 13 days' information is displayed.

<Callout type="info">Information in the *Summary Area* depends on the selected accounts, time range, time zone, and dimensions.</Callout>

Statistics in the *Summary Area* are:

| Statistic | Description |
| --- | --- |
| AVERAGE (Average Throughput) | The average of traffic from the origin, through the network, and out of the network to the requestor. Measured in bps. |
| (TOTAL) Total Data Transfer | Data from the origin into the CDN and out to the requestor from the published host. Measured in bytes. |
| (REQUESTS) Number of Requests | Total number of requests from the origin into the CDN and out to the requestor from the published host. |

### Chart  {/*chart*/}

Data is presented in a chart that shows the total throughput of in bytes plus out bytes across the selected date range by default. The label on the left beneath the summary panel reflects the defaults.

Hover the mouse pointer over the chart to view details in tooltips.

<Callout type="info">For any given granularity, if only a single time unit has data, then the data is represented as a single filled circle.</Callout>

### Selecting Chart Granularity  {/*select-chart-granularity*/}

You can refine the chart by selecting a granularity value in the toggle above the chart. Toggles are active depending on the reporting date range.

Make a selection in the toggle. The time units on the chart's X-axis are updated to reflect your selection.

Each value has its own retention policy.

|Granularity| Data Retention Policy|
|---|---|
|5 min| One week|
|Hour| Five weeks|
|Day| One year|

<Callout type="info">The five-minute granularity is not available when: <br />- The selected time frame is greater than 24 hours.<br />- When *Continent* or *Country* has been selected in the data grouping dropdown menu.</Callout>

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

On the left above the granularity toggle is the report Grouping drop-down menu in which you can select up to two options:
- Account
- Protocol
- Segment
- Continent
- Country

### Selecting Chart Metrics  {/*selecting-chart-metrics*/}

On the right beneath the *Summary* Area is the *Metrics* dropdown menu that allows you to select chart metrics. The selected metric is reflected in the y-axis label.

| Metric | Description |
| --- | --- |
| Throughput | Rate of data flow, measured in bits per second. |
| Data Transfer | Number of bytes transferred, measured in bytes. |
| Requests | Number of requests. |

You can add an additional dimension to the chosen metrics using the to the right of the metrics .


| Selection | Description |
| --- | --- |
| In  | Ingested into the CDN from the origin. |
| Out | Bytes from the published host to the end user. |
| Total | Sum of 'In' and 'Out'. |

So for example if you chose 'Throughput' in the metrics and 'In' in the additional , the chart reflect bits per second ingested into the CDN from the origin.

### Exporting Chart Data  {/*exporting-chart-data*/}

To export data currently displayed in the chart, click the Export drop-down menu on the right above the chart; then choose an option:
- *PowerPoint*: Export to a PowerPoint file that contains a screenshot of the chart.
- *CSV*: Export data to a Comma-Separated Values (CSV) file that reflects the currently selected chart options.

After you choose an option, Control creates and downloads the report.

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

| Metric | Calculation |
| --- | --- |
| Throughput In, Out<br /><br />Data Transfer In, Out<br /><br />Requests In, Out | No calculation. Data provided by . |
| Throughput Total<br /><br />Data Transfer Total<br /><br />Requests Total | Sum of the corresponding "In" and "Out" values. |

### Overview Tab - Summary Area  {/*overview-tab-summary-area*/}

The up or down change for a given metric is calculated as follows.

The metric from the previous period is compared to the metric from the current period.

|Comparison Results|Metric Presentation|
|---|---|
|The selected time period's value equals the previous time period.|Presented as no change.|
|The previous period's value is smaller than the current period.|Presented as up from the previous period. <br /><br />See also [Percentage Calculation](#percentage-calculation).|
|The previous period's value is greater than the current period.|Presented as down from the previous period.<br /><br />See also [Percentage Calculation](#percentage-calculation).|

#### Percentage Calculation {/*percentage-calculation*/}

The 'Up' and 'Down' presentations include a percentage.

Percentage = ((newValue - oldValue) / oldValue) * HUNDRED_PERCENT
