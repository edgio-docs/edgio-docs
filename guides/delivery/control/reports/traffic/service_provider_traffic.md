---
title: Service Provider Traffic Report
---
The Service Provider Traffic Report provides metrics and trends that allow service providers to:

- Identify, isolate, and resolve performance-related issues to maintain a superior end-user experience and potential revenue share from Edgio.

- Proactively identify potential issues and take corrective actions or escalate to Edgio Operations for further troubleshooting from a software perspective.

## Report Specifications

**Latency**: 5 minutes

**Granularity**
| Selected Time Frame | Granularity |
|---|---|
| Today<br />Last 24 (days)<br />Last 7 (days) | 5 minutes |
| Last month<br />Last 30 (days) | hourly |
| Last 90 (days)<br />Any custom date range \> 90 days | daily |

**Dimensions**
- Date/time
- In, Out
- Edgio content provider aggregate
- POP
- Service provider account
- Service (HTTP, HTTPS )
- Service provider's content providers

**Metrics**: Average, Total, Requests

**Delivery Mechanism**: EdgeQuery

## Choosing Services, Time Frames, and Timezone

The top right part of the report contains controls for selecting a time frame and a timezone.

- Choose from pre-set time frames or choose custom date ranges in the dropdown menu. Click the **Apply** button on custom ranges.

- Choose a timezone. The top five most commonly used timezones in Control are at the top of the dropdown menu.

The data in the tabs changes to reflect your choices.

## Metrics in the Report

The tabs in the report provide the metrics shown in the following table:

| Tab | Metric |
|---|---|
| Overview | Data throughput, POP location throughput, content providers |
| Efficiency | Volume of data and the number of requests served from the cached versus the volume of data and number of requests that resulted in a cache miss at the POP level. |

## Tab Components

The following sections describe the *Summary Area* and various charts available in the Service Provider Traffic report.

### Summary Area
This component shows the average value, total, and requests for the metrics in the selected tab, along with a comparison to the prior period of the same time frame. See Statistics in the Summary Area.

- The value is displayed in bold black text with the appropriate unit of measurement; for example, bytes per second for bandwidth.
- A percentage up or down from the previous period is shown in green, red, or gray:
    - Increase: a circle with an arrow pointing up along with the percentage change, both in green.
    - Decrease: a circle with an arrow pointing down, along with the percentage change, both in red.
    - No change: a circle with an arrow pointing to the right, 0% as the percentage change, circle and percentage both in blue.

The percentage up or down is calculated as follows:

    Percentage = ((newValue - oldValue) / oldValue)) * HUNDRED_PERCENT

#### Selecting a Data Grouping

Above the Summary Area, select the POPs and Protocols data options to populate the charts in the report:

- POPs (All POPs or select POPs)
- Protocol (All, HTTP, HTTPS)

### Chart Area
The chart area provides a graphical representation of the measurement represented in a tab.

#### Detailed Total \[Data\] for last 24 hours Chart
This chart on the *Overview* tab summarizes \[Throughput, Data Transfer, Requests\] details by \[POP, Protocol\], depending on the options selected.

- Hover the mouse over the chart data to view specific details

#### POP Location Chart
This stacked bar chart pn the Overview tab summarizes all In and Out values, broken out by POPs, where each bar represents a POP location.

- To view In values and Out values, hover your pointer over a bar.

- The POP name and description are beneath each bar.

#### Content Providers Chart
This chart on the *Overview* tab summarizes content provider traffic volume for each of the service provider's content providers. Each bar represents one content provider, and the 'In' and 'Out' values are aggregates of all the content provider's accounts (shortnames)

- Scroll to the bottom of the page to view the chart.

- To view 'In' and 'Out' values, hover your pointer over a bar.

#### POP Location Data Transfer/Requests Efficiency Chart
This chart on the *Efficiency* tab shows the efficiency of a POP in terms of volume of data and number of requests served from the cache versus those that resulted in a cache miss at the POP level.

Data is shown in percentages where higher values indicate higher efficiency.

- Use the *Data Transfer | Requests* toggle above the chart to display information for Data Transfer or Requests.
- To view the efficiency measurement, hover your pointer over a bar.

- The POP name and description are beneath each bar.

| Data Transferred Efficiency Calculation | Requests Efficiency Calculation |
|---|---|
| (bytes served from cache - bytes served from origin ) / (bytes served from cache) * 100% | (requests served from cache - requests served from origin ) / (requests served from cache) * 100% |

<Callout type="info">If the value of Egress - Ingress is negative, the efficiency value displayed is zero.</Callout>

## Tabs in the Report
### Overview Tab
The Overview tab serves as a high-level snapshot of your aggregated data and allows you to export data and create Recurring Report Emails and configure Email Alerts. Data in each of the charts is updated with the options you've selected.

#### Summary Area
For various statistics, the Summary Area shows the percent change for the selected reporting date range relative to the prior time period of the same length. For example, if you select This Month, the statistics show a comparison between this month's data and the previous month's.

Colors and arrows represent changes:

- An increase displays in green with an arrow pointing up.

- A decrease displays in red with an arrow pointing down.

- If there was no change from the previous period, the text is gray with an empty circle instead of an arrow.

- Percentage up or down is in bold text to the right of the arrow or empty circle.

- Information in gray text beneath the percentage up or down indicates the total date range covered minus any time remaining in the current period. For example, if you select Last 7 days as the reporting period and the current date is part of the past seven days, the past 13 days' information is displayed.

<Callout type="info">Information in the Summary Area depends on the selected accounts, time range, time zone, and dimensions.</Callout>



##### Selecting a Data Grouping

At the top of the Detailed Total for [Data] report, select the POPs and Protocols data options to populate the charts in the report:

- POPs (All POPs or select POPs)
- Protocol (All, HTTP, HTTPS)


Statistics in the Summary Area:
| Statistic | Description |
|---|---|
| AVERAGE (Average Throughput) | The average of traffic from the origin, through the network, and out of the network to the requestor. Measured in bps. |
| (TOTAL) Total Data Transfer | Data from the origin into the CDN and out to the requestor from the published host. Measured in bytes. |
| (REQUESTS) Number of Requests | Total number of requests from the origin into the CDN and out to the requestor from the published host. |

#### Chart Area
Data is presented in a chart that shows the total throughput of in bytes plus out bytes across the selected date range by default. The label on the left beneath the summary panel reflects the defaults.

Hover the mouse pointer over the chart to view details in tooltips.

See [Charts](#chart-area) for details.

<Callout type="info">For any given granularity, if only a single time unit has data, then the data is represented as a single filled circle.</Callout>

##### Selecting Chart Granularity
You can refine the chart by selecting a granularity value in the toggle above the chart. Toggles are active depending on the reporting date range.

Make a selection in the toggle. The time units on the chart's X-axis are updated to reflect your selection.

Each value has its own retention policy.
| Granularity | Data Retention Policy |
|---|---|
| 5 min | One week |
| Hour | Five weeks |
| Day | One year |

<Callout type="info">The five-minute granularity is not available when:<br />- The selected time frame is greater than 24 hours.<br />- When Continent or Country has been selected in the data grouping dropdown.</Callout>

##### Selecting Chart Metrics

On the right beneath the Summary Area is the Metrics drop-down menu that allows you to select chart metrics. The selected metric is reflected in the y-axis label.

| Metric | Description |
|---|---|
| Throughput | Rate of data flow, measured in bits per second. |
| Data Transfer | Number of bytes transferred, measured in bytes. |
| Requests | Number of requests. |

You can add an additional dimension to the chosen metrics using the drop-down menu to the right of the metrics drop-down menu.

| Selection | Description |
|---|---|
| In | Ingested into the CDN from the origin. |
| Out | Bytes from the published host to the end user. |
| Total | Sum of 'In' and 'Out'. |

So for example if you chose 'Throughput' in the metrics drop-down menu and 'In' in the additional drop-down menu, the chart reflect bits per second ingested into the CDN from the origin.

##### Exporting Chart Data
To export data currently displayed in the chart, click the *Export* drop-down menu on the right above the chart; then choose an option:

- **PowerPoint**: Export to a PowerPoint file that contains a screenshot of the chart.
- **CSV**: Export data to a Comma-Separated Values (CSV) file that reflects the currently selected chart options.

After you choose an option, Control creates and downloads the report.

##### Toggling Chart Data
A legend below the chart identifies the chart content by color. The legend reflects the choices that you made in the *Grouping* drop-down menu.

For example, if you Chose *Continent* in the drop-down menu, data for continents displays in the chart. Labels for the contents are displayed in the chart legend.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

### Efficiency Tab
The Efficiency tab provides additional, more specific information about overall CDN efficiency, expressed as percentages. Delivery configurations and purge events are included to indicate how they influence CDN efficiency. Data is presented in a timeline chart.

Hover the mouse pointer over the chart to view details in tooltips.

#### Selecting Chart Granularity
You can refine the chart by selecting a granularity value in the toggle on the left above the chart. Each value has its own retention policy.

| Granularity | Data Retention Policy |
|---|---|
| 5 min | One week |
| Hour | Five weeks |
| Day | One year |

<Callout type="info">For 24 hours or less, the chart offers granularity in five-minute, hourly, and daily increments.<br /><br />The five-minute granularity is not available when:<br />- The selected time frame is greater than 24 hours.<br />- When Continent or Country has been selected in the data grouping dropdown.</Callout>

#### Selecting an Efficiency Type
Select a type from the dropdown on the right above the table:

- Data Transfer Efficiency

- Requests Efficiency

#### Exporting Data
To export chart data to a PowerPoint file that contains a screenshot of the chart, click the Export dropdown on the right above the chart; then select **PowerPoint**.

After you select *PowerPoint*; Control creates and downloads the report.
