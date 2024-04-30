---
title: General Information about Control Reports
---
Here you find details on working with reporting data and recurring report emails.

## Sources of Inconsistency Between Control Reports {/*request-proration*/}

Three independent systems collect data for Control Reports:

|System	|Description|
|---|---|
|EQ Billing	|Processes data for the Billing report.|
|EQ Reporting|Processes data for these reports: <br />- Status Codes<br />- Live Stats<br />- Traffic (all tabs except *Hosts & URLs*).<br /><br /> The EQ Reporting system is optimized for low-latency data processing.|
|RLDP	|Generates data for the *Hosts & URLs* tab on the Traffic Report. The RLDP system uses raw log data. Data for the *Hosts & URLs* tab is refreshed once a day at about 0900 am GMT-7.|

Due to processing differences, the resulting metrics differ across the three systems. Various network and hardware issues can also affect data collection and processing that occurs in Edgio's distributed environment. As a result, customers might see a small metrics deviation, usually less than 1%.

### Request Proration {/*request-proration*/}

Proration is enabled only on the Billing Report and Traffic Report (*Hosts & URLs* tab only). Proration makes data aggregation significantly (a few times) more expensive.

Often, customers' reports show a fractional number of requests because requests are not always instantaneous. Due to the large media downloads and streams that Edgio serves on its network, requests normally take a significant amount of time to complete.

To account for this, Edgio spreads out requests throughout their lifetime. For example, a customer has a 500 megabyte file that users download. A user starts downloading the file at 8pm on Tuesday, and the download finishes at 1am on Wednesday. This is the only traffic that the customer has during that time.

Since 4/5ths of the file was downloaded on Tuesday and 1/5th of the file was downloaded on Wednesday, the reports will show the following data during that time:

| Day | Requests | Bytes | Seconds |
| --- | --- | --- | --- |
| Tuesday | 0.8 (4/5ths) | 400 MB (500 Megabytes * 4/5ths) | 14400 (4 hours) |
| Wednesday | 0.2 (1/5th) | 100 MB (500 Megabytes * 1/5th) | 3600 (1 hour) |

Since it is common for a download or a stream to cross the midnight boundary, most customers will usually see a fractional number of requests on the individual daily totals.

### Filtering of Late-Arriving Data   {/*filtering-of-late-arriving-data*/}

Data filtering is enabled only for the Billing report and is done in order to freeze the previous month's accounting numbers.

The previous month's data received after the second day of the current month is not processed, so Reporting and RLDP numbers are slightly higher for a month due to the late arriving data. Reasons for late-arriving data include hardware maintenance, PoP connectivity issues, and hardware and software failures.

## Report Data Collection Intervals {/*report-data-collection-intervals*/}

The Control reporting system acquires report data at different intervals depending on the data type and source.

### Real-Time Delivery Reports {/*realtime-delivery-reports*/}

Data for the Live Stats report is gathered in one-minute increments and is updated every 30 seconds.

### Other Delivery Reports  {/*other-delivery-reports*/}

Data for non-realtime Traffic and Content reports is gathered from logs provided by Edge Servers at regular intervals. Delays from 1-20 hours can occur for specific log files depending on server load and maintenance status.

The non-realtime Traffic reports are:
*   Traffic
*   Live Push
*   Billing
*   DNS Overview

The Content reports are:
*   URL Prefixes
*   Status Codes

### Network Transit Report  {/*network-transit-report*/}

Data for the Transit report is directly gathered from switch or router-port counters via SNMP at 5-minute intervals.

## Controlling Displayed Data  {/*controlling-displayed-data*/}

A variety of controls are provided above each report to help you view exactly the data you are interested in.

Report data is updated each time you change a control setting; you will need to wait for each update to complete before making additional changes.

<Callout type="info"><br />- Services are reported and billed based on usage<br />- Some services deliver content, while others provide content storage or access to Edgio's delivery backbone. Each service has its own unique characteristics and metrics.<br />- Not all services are applicable to every report - services are only visible in reports that make sense for the type of service</Callout>

### Selecting Date Ranges and Time Zones  {/*selecting-date-ranges-and-time-zones*/}

During any Control session, if you make date range or time zone selections in any given report, Control preserves and applies your selections as follows.

*   Control preserves your selections if you navigate away from the report then navigate back to it.

*   Control automatically applies the selections to all other reports that you view.

Preserving and applying selections applies to these reports:
*   Traffic
*   Transit
*   Status Codes
*   Live Push
*   Origin Storage
*   DNS Overview
*   Live Stats

<Callout type="info">If you log out of Control then log back in, Control does not preserve any selections you made from the previous session.</Callout>

#### Selecting a Date Range {/*selecting-a-date-range*/}

To control the timeframe for a report, click in the date picker. Then, in the pop-up menu, you can set the report date range by selecting a named range.

Some reports such as the URL Prefixes Report and Query String Report have limited date range selections.

You can also pick specific dates from the Custom Date Range entry.

#### Selecting a Report Time Zone {/*selecting-a-report-time-zone*/}

The default time zone for all reporting data is GMT -7. You can change the time zone to reflect your local time zone or another time zone as desired.

After you change the timezone, the report data updates automatically.

## Viewing Data for Specific Points in a Chart  {/*viewing-data-for-specific-points-in-a-chart*/}

You can mouse over any data point on a chart to see the value(s) associated with that point. As you move your mouse, a vertical line is displayed to help you orient against the time axis, and the data is displayed in a popup next to your mouse.

## Working with Recurring Report Emails  {/*working-with-recurring-report-emails*/}

The [Traffic Report](/delivery/control/reports/traffic/traffic) and [Status Codes Report](/delivery/control/reports/content/status_codes) both allow you to email report data at a specific interval and specific time of day.

### Email Content  {/*email-content*/}
Emails consist of a message, a summary area with various statistics, and a chart.

<Callout type="info">The metric displayed in the email's chart (in this case 'Total Throughput') reflects the selected metric on the Overview tab.</Callout>

### Creating Recurring Report Emails  {/*creating-recurring-report-emails*/}

1.  Click the envelope icon: on the left above the chart on the Overview tab of the Status Codes Report or Traffic Report.

    The RECURRING EMAIL dialog is displayed. The following figure shows the dialog from the Status Codes Report.

2.  Fill in the fields in the dialog (see [Fields in the 'RECURRING EMAIL' Dialog](#fields-in-the-recurring-email-dialog)).

3.  Click the Save button.

    <Callout type="info">After recurring report emails have been created, they are no longer visible on the Status Codes or Traffic Report pages. To edit or delete recurring report emails, you must use the My Account page. See [Editing and Deleting Recurring Report Emails](#editing-and-deleting-recurring-report-emails).</Callout>

### Editing and Deleting Recurring Report Emails  {/*editing-and-deleting-recurring-report-emails*/}

To edit a recurring report email:

1.  Click the **Profile** icon at the top right of the Control user interface.

2.  Select **My Account** from the subsequent dropdown.

    The *Edit My Account* page is displayed.

3.  Click the *Recurring Emails* tab. For further instructions, see [Managing Recurring Emails](/delivery/control/manage/account/#managing-recurring-report-emails).

### Fields in the 'RECURRING EMAIL' Dialog  {/*fields-in-the-recurring-email-dialog*/}

| Field | Description / Instructions |
| --- | --- |
| Filter by<br /><br />Group by | See [RECURRING EMAIL Dialog - Filtering and Grouping](#recurring-email-dialog). |
| Recipients |     |
| CC  | Stands for "carbon copy." Additional email recipients.<br /><br />Enter one email or multiple emails separated by commas. |
| Subject | Email subject. Defaults to text based on the report.<br /><br />Modify as needed. |
| Message |     |
| Attach CSV file | The option to cause to add a CSV file of information in the report. The information is the same that you can export from the report.<br /><br />When you select this option, text indicating the maximum file size is displayed below the field. |
| Recurrence | The frequency to send the report.<br /><br />Select a value. |
| The time of day when you want to receive an email | Clock time to send the email.<br /><br />Use the spinner to select the hour or type a value between 0 and 23.<br /> <br /> <Callout type="info">When the dialog is opened from the Status Codes Report URLs tab and Traffic Report *Hosts & URLs* tab, this field is disabled and automatically set to 0700 GMT-7.</Callout> |
| Timezone | Timezone of the time of day you configured in the The time of day when you want to receive an email field.<br /><br />Defaults to the selection in the timezone at the top right of the report page. You can choose a different timezone.<br /><br />Select a value.<br /> <br /> <Callout type="info">CONTENT </Callout>The timezone field is disabled:<br /><br />-   In the RECURRING EMAIL dialog for the Status Codes Report URLs tab and Traffic Report Hosts & URLs tab.<br />    <br />-   If the timezone at the top right of the report page is disabled for all other tabs in the Status Codes Report and Traffic Report. |

### RECURRING EMAIL Dialog - Filtering and Grouping  {/*recurring-email-dialog*/}

The *Filter by* and *Group by* fields allow you to control the metrics and chart groupings in the email. Filtering and grouping in the dialog are functionally equivalent to the same capabilities in the *Overview* tab's Chart. The dialog's *Filter by* and *Group by* fields are a convenience; they allow you to configure the report independently of the selections in the *Overview* tab.

#### Filtering - Traffic Report {/*filtering-traffic-report*/}
Select one or at most two entries in the *Filter by* dropdown menu. Each selection causes an additional drop-down menu to display in which you can further refine your selection. For example, if you choose **Segment**, a drop-down menu of segment names is displayed.

#### Filtering - Status Codes Report {/*filtering-status-codes-report*/}
You can define the metrics to display in the report.

Select one or at most two entries in the *Filter by* dropdown menu. Each selection causes a control to display in which you can further refine your selection.

| Selection | Additional Control / Instructions |
| --- | --- |
| Status codes | A field with default status codes.<br /><br />-   Delete an existing entry by clicking the entry's **x** control.<br />    <br />-  Add a single status code by typing it and pressing Enter on your keyboard.<br />    <br />-   Add a range by typing this pattern: <start code>-<end code> and pressing Enter on your keyboard. For example to configure the range from 200 to 203, enter: **200-203**. |
| Services <br /> Cache codes <br />Request/Response types | Dropdowns with services, cache codes, or request/response types.<br /><br />Make a selection, then click outside the dropdown. |


#### Grouping - Traffic Report {/*grouping-traffic-report*/}
By default, the chart's data grouping is by Protocol, but you can override the default by making a selection in the *Group by* drop-down menu.

#### Grouping - Status Codes Report {/*grouping-status-codes-report*/}
By default, the chart's data grouping is by Status code, but you can override the default by making a selection in the *Group by* drop-down menu.

## Working with Email Alerts  {/*working-with-email-alerts*/}

The [Traffic Report](/delivery/control/reports/traffic/traffic) and [Status Codes Report](/delivery/control/reports/content/status_codes) both allow you to send email alerts when a condition exceeds a threshold.

Traffic Report - For example, you might be interested in knowing if the total number of requests in the previous hour exceeds 6000. You can do so for any of your accounts and any protocols (HTTP, HTTPS, HLS, HDS). You can optionally configure one or multiple CC emails.

Status Codes Report - For example, you might be interested in knowing each time that missing file status codes (404, 410) are returned. In the Status Codes report you can create an alert from the *Overview* or *URLs* tab.

### Email Content  {/*email-content*/}

Emails consist of a message, the date and time the alert was created, the condition, and the value that triggered the email.

When the condition drops below the threshold value, Control sends a second alert indicating the condition is no longer met.

### Alert Icon  {/*alert-icon*/}

![Alerts](/images/delivery/control/alerts.png)

A - Status Codes Report Overview Tab

B - Traffic Report Overview Tab

C - Status Codes Report URLs Tab

D - Bell Icon

#### Creating Email Alerts {/*creating-email-alerts*/}

To create an email alert:

1.  Click the bell icon.

    The 'REPORT ALERT' dialog displays.

2.  Fill out the fields in the dialog. See [Fields in the 'REPORT ALERT' Dialog](#fields-in-the-report-alert-dialog) for details.
3.  Click **Save** to save the configuration.

    <Callout type="info">After email alerts have been created, they are no longer visible on the Status Codes Report page. To edit or delete email alerts, you must use the My Account page. See [Editing and Deleting Email Alerts](#editing-and-deleting-email-alerts).</Callout>

##### Editing and Deleting Email Alerts {/*editing-and-deleting-email-alerts*/}

To edit or delete an email alert:

1.  Click the **Profile** icon at the top right of the Control  user interface.

2.  Select **My Account** from the subsequent .

    The *Edit My Account* page is displayed.

3.  Click the *Alerts* tab. For further instructions, see [Managing Alerts](/delivery/control/manage/account/#managing-alerts).

#### Fields in the 'REPORT ALERT' Dialog {/*fields-in-the-report-alert-dialog*/}

Required fields are marked with an asterisk in the 'REPORT ALERT' Dialog.


| Field | Description / Instructions |
| --- | --- |
| Accounts | A list of all your company's accounts that have the 'Alerts' product enabled. The list contains only accounts for which your user has permissions to view the Status Codes Report. An alert will be triggered only for the selected accounts.<br /><br />Select specific accounts or use the 'Select All' option to select all accounts. |
| Protocols | A list of all protocols that your company supports. An alert will be triggered only for the selected protocols.<br /><br />Select at least one protocol.<br /><br />This field is not available for Status Codes alerts. |
| Recipient |     |
| CC  |     |
| Subject | The field is automatically populated based on the account you selected in the Status Codes report. |
| Message |     |
| URL | The specific URL you chose to configure an alert.<br /><br />Read-only.<br /><br />This field is only available for alerts created from the URLs tab of the Status Codes Report. |
| Send Status Code Report when,<br /><br />Send Traffic Report when | Conditions under which you want to email to be sent.<br /><br />See [Conditions for Sending an Email](#Conditio). |

##### Conditions for Sending an Email {/*conditions-for-sending-an-email*/}

Use the *Send Status Codes Report when* or *Send Traffic Report when* section to define the threshold for sending an email alert.

Email fields are described in the following table.


| Field | Description |
| --- | --- |
| A - Threshold Metric | Metric associated with threshold:<br /><br />'Requests', 'Requests In', and so on. |
| B - Total or Percent Change | Means of expressing the change of the selected metric.<br /><br />'Total' - change expressed as a sum of the selected metric over the time unit selected in the 'in the previous' .<br /><br />'Percent Change' - change expressed as a percentage from the time unit in the 'in the previous' . |
| C - Greater Than or Less Than | Inequality operator to indicate the threshold comparison value. |
| D - Threshold Number | Value beyond which an email is triggered.<br /> <br /> <Callout type="info">If you select 'Percent Change' in the 'Total or Percent Change' field, this field represents a percentage.</Callout> |
| E - Threshold Numeric Unit | Unit of the selected metric in the 'Threshold Metric' : 'Thousand', 'Million', and so on.<br /> <br /> <Callout type="info">-   This field is visible only if you select 'Total' in the 'Total or Percent Change' field.<br />-   Use the first entry (-) to indicate the entry in the 'Count or Percentage Change' value is a straight count.</Callout> |
| F - Code Mask or Range | HTTP response code(s) associated with the threshold.<br /> <br /> <Callout type="info">This field is not available for Traffic Report alerts.</Callout> |
| G - Services | Protocols associated with the threshold.<br /><br /><Callout type="info">This field is not available for Traffic Report alerts.</Callout> |
| H - in the previous | Time unit for the threshold: '5 Minutes', 'Hour', 'Day'. |
| I - Show UI notification | If this field is checked, then when the threshold has been crossed, displays an alert popup in the user interface in addition to sending an email. |

Example 1

If you want to receive an alert when the number of incoming requests with a 202 or 206 status for the HLS service is 500 more from the previous day, make the following selections:

![](../../../../Resources/Images/Control Portal User Guide - Reports Chapter/Status Codes Report -Alert Example.png)

Example 2

If you want to receive an alert under the same conditions as Example 1, but express the change as a percentage from the previous day, make the following selections:
