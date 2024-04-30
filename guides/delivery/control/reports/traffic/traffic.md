---
title: Traffic Report
---
Traffic reports display summary data about CDN usage, such as data volume and the number of associated requests and connections, by service (protocol). Traffic reports can include both high-level overviews and detailed data.

The Traffic Report provides an integrated view of traffic for legacy Limelight data for one or more selected Accounts. The report loads with the following smart defaults, which you can change by making further selections in the header.

![Traffic Report](/images/delivery/control/traffic-report.png)

- The Account is your “default” account, which you set in *My Account* > *Profile* > *Default Account*.
- The time frame is “Last 30 days.”
- The timezone is your chosen “Timezone” setting from your profile in “My Account.”
- The data payload is organized “By protocol” and includes all protocols for which data exists within the selected timeframe and timezone. The report is capable of showing these protocols: HTTP, HTTPS, HLS, andHDS.DASH, HTTP, HTTPS, MSS, HLS.

Traffic from both IPv4 and IPv6 addresses is reported. If you need IPv6 support but have not previously requested it be enabled, please contact Edgio Customer Support.

The report has these tabs:
- [Overview](#overview-tab)
- [Details](#details-tab)
- [CDN Efficiency](#cdn-efficiency-tab)
- [Geography](#geography-tab)
- [Hosts & URLs](#hosts-and-urls-tab)

## Report Specifications  {/*report-specifications*/}
|Specification|Description|
|---|---|
|Latency| Latency depends on the selected granularity. <br /> - 5 minutes: 5 to ten minutes<br />- Hour: 1 hour + delta (approximately 5-10 minutes)<br />- Day: 1 day + delta (approximately 5-10 minutes)|
|Granularity| 5 minutes, hour, day|
|Dimensions|Account, Protocol, Segment, Continent, Country, CDN Efficiency, URLs, Published Hosts, Referrer URLs, File Types|
|Metrics - Summary Area	|Average traffic rate<br />Total bytes transferred<br />Total requests|
|Metrics - Elsewhere|Throughput (In, Out, and Total), Data Transfer (In, Out, and Total), or Requests (In, Out, and Total).|
|Delivery Mechanism	|EdgeQuery|
|Associated API Endpoint(s)|- `GET /realtime-reporting-api/traffic` returns Realtime Reporting API traffic data according to query parameters passed<br />- `POST /realtime-reporting-api/traffic` returns Realtime Reporting API traffic data according to parameters passed in the request body<br />- `GET /realtime-reporting-api/traffic/retentions` returns a list of all retentions applied to traffic reports<br />- `GET /realtime-reporting-api/traffic/continents` returns a list of continents associated with the account<br />- `GET /realtime-reporting-api/traffic/countries` returns a list of countries associated with the account<br />- `GET /realtime-reporting-api/traffic/states` returns a list of countries associated with the account<br />- `GET /realtime-reporting-api/traffic/geo` returns realtime reporting traffic geo data according to query parameters passed<br />- `POST /realtime-reporting-api/traffic/geo` returns realtime reporting traffic geo data according to parameters passed in the request body <br />- `GET /realtime-reporting-api/traffic/retentions` returns a list of all retentions applied to traffic geo reports |

## Selecting Accounts, Date Range, and Time Zones  {/*selecting-accounts-data-range-time-zones*/}

You can make selections in the controls above the tab header:

*   *TRAFFIC FOR*. Select one or more accounts to which you have access for cross-account analysis. Click the **Select All** button to select all accounts.

    <Callout type="info">You must select at least one account; otherwise, the default company is automatically selected, and a warning is displayed.</Callout>

*   *Date range*. Pick from pre-set time frames or choose custom date ranges in the . Click the **Apply** button on custom ranges.

*   *Time zone*. The top five most commonly used timezones in are at the top of the . Scroll down for additional time zones.

    <Callout type="info">Data in the *Hosts & URLs* tab is of DAY granularity and is always stored in GMT-7, so the Time zone dropdown menu is disabled when you select the tab.</Callout>

## Filtering Report Data  {/*filtering-report-data*/}

You can filter report data using filter controls on the *Overview*, *Details*, *CDN Efficiency*, and *Geography* tabs. You can filter on Continents, Countries, Protocols, and Segments.

Make the desired selections, then click the **Apply** button to apply your filter choices.

To reset filters to the default, click the **Reset** button.

<Callout type="info"> -    Filter controls default to All.<br />- Some filter selections are mutually exclusive. For example, if you select North America as the continent, you cannot select individual countries.<br />- The Geography tab only contains filter controls for Protocols and Segments.<br />- Filter selections you make on one tab are automatically applied to other tabs.<br />- When you make filter selections on a tab then navigate to another tab, then navigate back to the original tab, the selections are preserved in the original tab.</Callout>

## Overview Tab  {/*overview-tab*/}

Information in the *Summary Area* depends on the selected accounts, time range, time zone, and dimensions.

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

### Toggling Chart Data  {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color. The legend reflects the choices that you made in the *Grouping* dropdown menu.

For example, if you Chose **Continent** in the dropdown menu, data for continents displays in the chart. Labels for the contents are displayed in the chart legend.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

### Creating Recurring Report Emails and Email Alerts  {/*creating-recurring-report-emails*/}

See [Working with Recurring Report Emails](/delivery/control/reports/general_information/#working-with-recurring-report-emails) and [Working with Email Alerts](/delivery/control/reports/general_information/#working-with-email-alerts).

## Details Tab  {/*details-tab*/}

The *Details* tab is a deeper drill-down into your data, with additional metrics like “Data transfer IN” or “Data transfer OUT.” Data is presented in a sortable table.

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

Choose a primary data grouping in the drop-down menu on the left above the table:
- Account
- Protocol
- Segment
- Continent
- Country

Choose a secondary time-related grouping in the drop-down menu on the right above the table:
- Monthly
- Day of week
- Hour of day

<Callout type="info">When you group by segments, segments are sorted by account and protocol. Master segments are at the top of the list.</Callout>

### Viewing Details in the Table  {/*viewing-details-in-the-table*/}

Each row in the table represents the primary grouping. Use the **+** icon to expand rows and reveal details by the time-related grouping.

### Adding and Removing Columns  {/*adding-and-removing-columns*/}

The table loads with three data columns by default, but you can display up to five at a time by adding and deleting columns.
- If fewer than five columns are displayed, add a column by clicking the **+** icon on the right side of the table header row and selecting from the subsequent list.
- Hover over a column and select the **(x)** (Remove column) icon to delete a column.

Each row in the table represents the primary grouping. Use the **+** icon to expand rows and reveal details by the time-related grouping.

### Exporting Table Data  {/*exporting-table-data*/}

To export data to a Comma-Separated Values (CSV) file, click the *Export* drop-down menu on the right above the table; then choose a granularity, which determines the content of the exported file.

| Granularity | CSV File Contains |
| --- | --- |
| Monthly | A total for each metric in each month. |
| Daily | A total for each metric for each day in each month. |
| Hourly | A total for each metric for each hour on each day in the month. |

After you choose a granularity, Control creates and downloads the report.

## CDN Efficiency Tab  {/*cdn-efficiency-tab*/}

The *CDN Efficiency* tab provides additional, more specific information about overall CDN efficiency, expressed as percentages. Delivery configurations and purge events are included to indicate how they influence CDN efficiency. Data is presented in a timeline chart.

Hover the mouse pointer over the chart to view details in tooltips.

### Selecting Chart Granularity  {/*selecting-chart-granularity*/}

You can refine the chart by selecting a granularity value in the toggle on the left above the chart. Each value has its own retention policy.

| Granularity | Data Retention Policy |
| --- | --- |
| 5 min | One week |
| Hour | Five weeks |
| Day | One year |

<Callout type="info">For 24 hours or less, the chart offers granularity in five-minute, hourly, and daily increments.<br /> <br /> The five-minute granularity is not available when:<br />- The selected time frame is greater than 24 hours.<br />- When Continent or Country has been selected in the data grouping.</Callout>

### Selecting an Efficiency Type  {/*selecting-an-efficiency-type*/}

Select a type from the drop-down menu on the right above the table:
- Data Transfer Efficiency
- Requests Efficiency

### Toggling Chart Data  {/*toggling-chart-data*/}

On the right side of the chart are toggles that you can use to display or hide the corresponding chart data.
- *Avg*: Average efficiency for the selected type of efficiency.
- *Configs*: Configurations made in Configure > Caching & Delivery or Caching & Delivery (new).
- *Purges*: SmartPurge events.

By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

<Callout type="info">Only the configurations and purges relevant to the chosen timeframe are displayed.</Callout>

## Geography Tab  {/*geography-tab*/}

The *Geography* tab shows traffic for your data categories on an interactive map. The map can be used to understand how your audience traffic varies across the world or your chosen continents or countries.

Hover your mouse pointer over a geographical region to view popups with details about the selected account, time range, timezone, and data breakout, and additional measures.

### Selecting a Data Grouping  {/*selecting-data-grouping*/}

Choose a data grouping in the drop-down menu on the left above the table:
- Protocol
- Segment
- Account

The selection you make is reflected in the popups that appear when you hover your mouse pointer.

### Zooming in and Out  {/*zooming-in-and-out*/}

To zoom in on the chart do either of the following:
- Click the **+** control on the upper left of the map.
- Click a region (continent, country, or state).

To zoom out, do either of the following:
- Click the **-** control on the upper left of the map .
- Click the Continent and Whole World controls on the right above the chart.

### Exporting Data  {/*exporting-data*/}

To export data to a Comma-Separated Values (CSV) file, click the *Export* drop-down menu on the right above the table; then choose a granularity, which determines how data is grouped in the exported file.

| Granularity | Grouping in the Exported File |
| --- | --- |
| Continents | Data is broken out by continents. |
| Countries | Data is broken out by countries within continents. |

## Hosts & URLs Tab  {/*hosts-and-urls-tab*/}

The *Hosts & URLs* tab shows CDN usage by selected published hostname, URLs, referrer URLs, or file type. You can use the information to analyze content popularity and CDN caching efficiency for individual content URLs. Data is presented in a table.

Values for % of Total Requests and CDN efficiency include an indicator under the numeric value.

% of Total is a stacked bar chart.

<Callout type="info">URL parameters are stripped from URLs before the metrics are calculated.</Callout>

### Creating Recurring Report Emails  {/*creating-recurring-report-emails*/}

See [Working with Recurring Report Emails](/delivery/control/reports/general_information/#working-with-recurring-report-emails).

### URLs Displayed  {/*urls-displayed*/}

The most requested URLs are displayed, ordered by the '% of Total Requests' column.

By default, the top 50 URLs are displayed based on one-hour samples, but the actual number displayed depends on the timeframe you select in the date picker at the top right of the page. For example, if you select a day as the timeframe, the union of the top 50 URLs of all the one-hour periods in the day would be displayed.

Because the most-requested URLs can differ from one sampling to another, a URL previously displayed might not appear again in the future, or it might appear in a different position in the list.

### Data Collection and Availability  {/*data-collection-and-availability*/}

Data is not available in realtime; it is processed at the end of each day, and becomes available the next day. As a result, if you select 'Today' or 'Last 24 Hours' in the data range selector, no data is available.

Data is of DAY granularity and is always stored in GMT-7, so the *Time zone* drop-down menu is disabled when you select the tab.

### Filtering Table Data  {/*filtering-table-data*/}

You can limit data in the table to URLs and hostnames that you specify.
- To filter the table, enter all or part of a URL/hostname in the search box on the right above the table and press Enter.
- To display the original list, remove text from the search box and press enter.

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

Make a selection in the drop-down menu to the right of the search box.

The data displayed in the table depends on the selection; refer to the following table for all data descriptions.

| Table Data Item | Description |
| --- | --- |
| % of Total Requests | Ratio of the value in the row compared to all rows in the table.<br /><br />To convey the ratio, the column contains:<br />-  A horizontal stacked bar chart<br />    -   The ratio itself |
| % of Total Traffic | Ratio of the value in the row compared to all rows in the table. |
| Bytes Efficiency | (bytes served from cache [egress] - bytes served from origin [ingress]) / (bytes served from cache [egress]) * 100%<br /><br />If the value of egress - ingress is negative, the efficiency value displayed is zero. |
| CDN Efficiency | How efficient the CDN was in terms of serving end-user requests or bytes from the cache instead of from the origin. Measured in percentage. |
| Data Transferred | Bytes transferred due to requests for files, broken out by the grouping you selected; for example: bytes transferred by a published host. This is a total of Data coming into the CDN from the origin and data from the published host to the requesting client. |
| In Bytes | Number of bytes entering the CDN from the origin. |
| Out Bytes | Total of all byes leaving the CDN through the published hosts. |
| Out Requests | Number of requests for content leaving the CDN through the published hosts. |
| Requests | Number of requests for content entering the CDN from the origin. |
| Total Bytes | 'In Bytes' + 'Out Bytes' |
| Total Requests | 'Requests' + 'Out Requests' |

### Sorting the Table Data  {/*sorting-the-table-data*/}

Sort the data in the table by clicking a column header. When you sort on a field, the sort occurs on all pages of data rather than just the current page.

### Viewing Row Details  {/*viewing-row-details*/}

To view a sparkline of average daily traffic for the selected data type (URLs, Published Hosts, and so on), click the row's [+] toggle. The toggle changes to [-] and the sparkline is displayed.

![View Row](/images/delivery/control/card-toggle.png)

In the preceding figure:
A - Expanded row
B - Metrics s

After displaying the sparkline, you can do the following:

*   Choose a metric to display using the metrics s: 'Requests' , 'Data transfer', 'Total', 'In', 'Out'

*   Hover over the sparkline to get additional details in a tooltip.

*   Click the [-] symbol to hide the sparkline.


### Exporting Data  {/*exporting-data*/}

To export chart data to a Comma-Separated Values (CSV), click the Export drop-down menu on the right above the table; then select CSV.

After you choose CSV, Control creates and downloads the report.

<Callout type="info">Data in the *Hosts & URLs* tab is of DAY granularity and is always stored in GMT-7, so the *Time zone* dropdown menu is disabled when you select the tab.</Callout>

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
