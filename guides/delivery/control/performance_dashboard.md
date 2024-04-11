---
title: Performance Dashboard
---
# Performance Dashboard {/*performance-dashboard*/}

The Performance Dashboard provides a comprehensive snapshot of your company's performance and summarizes information in the Traffic Report and Status Codes Report. The Performance Dashboard is different from the older [Dashboard](/delivery/control/dashboard), which is also available.

The Performance Dashboard comprises two sections:

- The top section consists of tabs that show key performance metrics for the Delivery product, such as average bandwidth.

- The lower section provides information about leading metrics, such as locations with the highest data transfer rate. Information is displayed in card format.

<Callout type="info">The content of the lower section does not vary when you select a different tab in the top section; the two sections are independent.</Callout>

By default, data presented is an aggregate of all your company's accounts.

Instructions for using the Performance Dashboard are in these sections:

[Displaying the Performance Dashboard](#displaying-the-performance-dashboard)

[Selecting Accounts and Date Ranges](#selecting-accounts-and-date-ranges)

[Key Performance Metrics Tabs](#key-performance-metrics-tabs)

[Leading Metrics Cards](#leading-metrics-cards)

## Displaying the Performance Dashboard {/*displaying-the-performance-dashboard*/}

To view the Performance Dashboard, you must set it as your default landing page.

- After logging into , click the Profile icon (see <a href="../../User Guide Pages/Menus and Links.md">Menus and Links</a>) at the top right of the screen.</p>

Select My Account</span> from the  subsequent <MadCap:variable name="Localizable Terms.Industry Term - Drop-Down Menu" xmlns:MadCap="http://www.madcapsoftware.com/Schemas/MadCap.xsd" />.</p>
    <p>The <span class="guiSetting">Edit My Account</span> page is displayed.</p>
  </li>
  <li>
    <p>Select <span class="guiSetting">Performance Dashboard</span> from the <span class="guiSetting">Landing Page</span><MadCap:variable name="Localizable Terms.Industry Term - Drop-Down Menu" xmlns:MadCap="http://www.madcapsoftware.com/Schemas/MadCap.xsd" />.</p>
  </li>
  <li>
    <p>Click the <span class="guiSetting">Save</span> button.</p>
    <p>When you next log into <MadCap:variable name="Non-Localizable Terms - Limelight.Product Name - Control" xmlns:MadCap="http://www.madcapsoftware.com/Schemas/MadCap.xsd" />, the Performance Dashboard is automatically displayed.</p>
  </li>
</ol>

## Selecting Accounts and Date Ranges {/*selecting-accounts-and-date-ranges*/}

<p>Limit Performance Dashboard data to specific accounts and date ranges by making selections in the <MadCap:variable name="Localizable Terms.Industry Term - Drop-Down Menu" xmlns:MadCap="http://www.madcapsoftware.com/Schemas/MadCap.xsd" />s at the top of the screen:</p>

![](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard Config Controls.png)

A - Account Selector

B - Date Range Selector

For additional information on selecting date ranges, see [Selecting a Date Range](../Report/General Information.md#Selectin).

## Key Performance Metrics Tabs {/*key-performance-metrics-tabs*/}

[Overview](#Tab2)

[Working with Tabs](#Working)

### Overview

The following table describes each tab.

<table class="TableStyle-element_tablestyle" style="mc-table-style: url('../../../../Resources/TableStyles/video-temp/element_tablestyle.css');" cellspacing="0">
  <col style="width: 136pt;" class="TableStyle-element_tablestyle-Column-Column1" />
  <col style="width: 232pt;" class="TableStyle-element_tablestyle-Column-Column1" />
  <col style="width: 232pt;" class="TableStyle-element_tablestyle-Column-Column1" />
  <thead>
    <tr class="TableStyle-element_tablestyle-Head-Header1">
      <th class="TableStyle-element_tablestyle-HeadE-Column1-Header1">Tab</th>
      <th class="TableStyle-element_tablestyle-HeadE-Column1-Header1">
        <p class="p_9">Description</p>
      </th>
      <th class="TableStyle-element_tablestyle-HeadD-Column1-Header1">Additional Information</th>
    </tr>
  </thead>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Throughput</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">
      <p>Average data transfer rate measured in bits per second</p>
    </td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Overview Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Data Transfer</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Average amount of data transferred, measured in bytes</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Overview Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Requests</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Average number of requests</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Overview Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Requests Efficiency</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">
      <p>How the CDN performed in terms of serving end-user requests from the cache instead of from the origin. </p>
      <p>Expressed as a percentage according to the formula:</p>
      <p>
        <span class="italicText">Responses Served from the Cache/All Incoming Requests + All Outgoing Responses) * 100%</span>
      </p>
    </td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: CDN Efficiency Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Data Transfer Efficiency</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">
      <p>How the CDN performed in terms of serving data from the cache instead of from the origin. </p>
      <p>Expressed as a percentage according to the formula:</p>
      <p>
        <span class="italicText">Responses Served from the Cache/All Incoming Requests + All Outgoing Responses) * 100%</span>
      </p>
    </td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: CDN Efficiency Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Errors</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">
      <p>Summary of requests for content that resulted in the following non-200 status codes:</p>
      <p>206</p>
      <p>400</p>
      <p>403</p>
      <p>404</p>
      <p>503</p>
      <p>Only error codes returned for the selected account and date range are displayed.</p>
    </td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Status Codes Report.md">Status Codes Report</a>: Overview Tab, URLs Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Services</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Data transfer rate in bits per second for  each service (HTTP and HTTPS) enabled for the account.</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Overview Tab, Details Tab, Geography Tab</p>
      <p class="note">In the Traffic Report, services are referred to as "Protocols."</p>
    </td>
  </tr>
</table>
If traffic has not been generated for an account, indicators are displayed in the tab headers:

<ul>
  <li>
    <p>The words "Not available" are displayed for the <span class="guiSetting">Errors</span> and <span class="guiSetting">Services</span> tabs.</p>
  </li>
  <li>
    <p>The other tabs display a zero.</p>
  </li>
</ul>### Working with Tabs

Each tab displays data for the metric displayed in the tab name.

The average of the tab's metric for the selected accounts and date range  is displayed below the tab name. The following example shows that the average Throughput is 192.19 Kbps:

![](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard Tab and Metric.png)

If a metric has not been produced for the selected account and reporting period, the message "Not available" is displayed.

<p>In the <span class="guiSetting">Throughput</span>, <span class="guiSetting">Data Transfer</span>, and <span class="guiSetting">Requests</span> tabs, a toggle  on the right above the chart allows you to specify chart content:</p>

![](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard Chart Buttons.png)

<table class="TableStyle-element_tablestyle" style="mc-table-style: url('../../../../Resources/TableStyles/video-temp/element_tablestyle.css');" cellspacing="0">
  <col style="width: 136pt;" class="TableStyle-element_tablestyle-Column-Column1" />
  <col style="width: 232pt;" class="TableStyle-element_tablestyle-Column-Column1" />
  <thead>
    <tr class="TableStyle-element_tablestyle-Head-Header1">
      <th class="TableStyle-element_tablestyle-HeadE-Column1-Header1">
        <p>Toggle</p>
      </th>
      <th class="TableStyle-element_tablestyle-HeadD-Column1-Header1">
        <p class="p_9">Description</p>
      </th>
    </tr>
  </thead>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">IN &amp;amp; OUT</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>Data broken out by <span class="guiSetting">IN</span> and <span class="guiSetting">OUT</span> where:</p>
      <ul>
        <li>
          <p>
            <span class="guiSetting">IN</span> is traffic coming into the CDN from customer origins.</p>
        </li>
        <li>
          <p>
            <span class="guiSetting">OUT</span> is traffic leaving through published hosts to the requesting client.</p>
        </li>
      </ul>
      <p>Chart lines are color coded and identified by labels under the chart.</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">TOTAL</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">Sum of <span class="guiSetting">IN</span> and <span class="guiSetting">OUT</span></td>
  </tr>
</table>
Configure chart content by making a selection in the toggle.

##  Leading Metrics Cards {/*leading-metrics-cards*/}

[Overview](#Leading)

[Working with Cards](#Working2)

### Overview

Each Leading Metric card displays the entities with the highest metric for the measure displayed in the card. Each card displays at most five entities; if fewer entities are available, only those are displayed. If more entities are available, you can view them in the card's expanded view (see [Working with Cards](#Working2)).

<table class="TableStyle-element_tablestyle" style="mc-table-style: url('../../../../Resources/TableStyles/video-temp/element_tablestyle.css');" cellspacing="0">
  <col style="width: 134pt;" class="TableStyle-element_tablestyle-Column-Column1"></col>
  <col style="width: 232pt;" class="TableStyle-element_tablestyle-Column-Column1"></col>
  <col style="width: 232pt;" class="TableStyle-element_tablestyle-Column-Column1"></col>
  <thead>
    <tr class="TableStyle-element_tablestyle-Head-Header1">
      <th class="TableStyle-element_tablestyle-HeadE-Column1-Header1">
        <p>Card</p>
      </th>
      <th class="TableStyle-element_tablestyle-HeadE-Column1-Header1">
        <p class="p_9">Card Content</p>
      </th>
      <th class="TableStyle-element_tablestyle-HeadD-Column1-Header1">Additional Information</th>
    </tr>
  </thead>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Top locations</td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">
      <p>Geographical locations from which requests for content originated</p>
    </td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Geography Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Top URLS<sup>*</sup></td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">URLS (non-referrer and non-published) that received requests</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Hosts &amp;amp; URLs Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Top URLS w/errors<sup>*</sup></td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">URLS (non-referrer and non published) that received requests and responded with HTTP error codes</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Status Codes Report.md">Status Codes Report</a>: Overview Tab, URLs Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Top file types<sup>*</sup></td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Sort of file (for example 'text/html', 'text/plan') requested</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Hosts &amp;amp; URLs Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Top referred URLs<sup>*</sup></td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Referrer URLs that received requests</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Hosts &amp;amp; URLs Tab</p>
    </td>
  </tr>
  <tr class="TableStyle-element_tablestyle-Body-Body1">
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Top published hosts URLs<sup>*</sup></td>
    <td class="TableStyle-element_tablestyle-BodyE-Column1-Body1">Published hostnames  that received requests</td>
    <td class="TableStyle-element_tablestyle-BodyD-Column1-Body1">
      <p>
        <a href="../Report/Traffic Report.md">Traffic Report</a>: Hosts &amp;amp; URLs Tab</p>
    </td>
  </tr>
</table>
<sup>*</sup>Because this report uses data with daily granularity, date range selections of "Today" and "Last 24 hours" are not available (see [Request Proration](../Report/General Information.md#Request)). Also, only the top 50 URLs per day data is shown. Data for those metrics is only in GMT-7.

### Working with Cards

<p>Each card except <span class="guiSetting">Top URLs w/errors</span> includes a toggle, and all cards include an expand icon:</p>

![](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard card controls.png)

A - Toggle

B - Expand Icon

You can take the following actions:

* Click the toggle to switch between Requests view and Data Transfer view. Text below the toggle changes to reflect the view:
![](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard card view text.png)
A - Card in Data Transfer view
B -  Card in Requests view
* Click the expand icon to switch to expanded view, where data is displayed in a dialog.
![](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dahboard card expanded view.png)

* Click the minimize icon in the dialog to switch back to minimized view.

* Hover the pointer over a URL to view the complete URL.

<p class="note">If a metric has not been produced for the selected account and reporting period, the message "No data available" is displayed.</p>
