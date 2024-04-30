---
title: Billing Report
---

The Billing Report shows monthly traffic for your active products and services and your Edgio accounts. You can use data in the report for various reasons such as cost estimates for future Edgio invoices.

<Callout type="info">Due to data filtering and proration, data in the Billing report may not align with data in other individual reports. For more information, see [Filtering of Late-Arriving DataDashboard](/delivery/reports/general_information#filtering-of-late-arriving-data).</Callout>

## Billing Types  {/*billing-types*/}
The data in the report depends on the selected billing type.

|Billing Type| Metrics | Dimension|
|---|---|---|
| Content Delivery	| 95th Percentile of Inbound (Mbps), 95th Percentile Of Outbound (Mbps), 95th percentile of the total (Mbps) <br /> Data Transfer in (GB), Data Transfer out (GB), Data Transfer Total (GB) <br /> Requests (10Ks)| Service or account, depending on the selection in the drop-down menu above the table on the right.|
|DNS	| Number of Outbound Requests |	Account |
|DRM	|Number of Outbound Requests	|Account|
|EdgeFunctions	|Count of Invocations, Compute Usage (allocated memory x function execution time)|Account|
|Intelligent Ingest	|Total GB Transferred, Number of Sessions (Requests)|	Account|
|Origin Storage	|Count of Unique Objects in, Count of Unique Bytes in Origin Storage (GB), Total Bytes Retrieved from Origin Storage (GB)|Policy or account, depending on the selection in the drop-down menu above the table on the right.|
|Live Push Ingest	|Total Ingest Traffic (GB)|Account|
|MMD Live	|*Data Transfer IN, Transcode bytes TOTAL, Transcode pixels TOTAL	|Account|
|MMD Live to VOD|	Number of Minutes Recorded	|Account|
|SSL SNI Certificate Hosting	|Count of published certificates	|Account|
|Transit	|Data Transfer in (GB), Data Transfer out (GB), Data Transfer Total (GB) <br />95th Percentile of Inbound (Mbps), 95th Percentile of Outbound (Mbps), 95th percentile of the total (Mbps), 95th Percentile High of Inbound and Outbound Mbps|Account|

* Transcode bytes TOTAL is the total number of bytes transcoded. Transcode pixels TOTAL is the total number of pixels transcoded during the process of transcoding an RTMP stream. Transcoding is the process of receiving an RTMP stream with a single bitrate and outputting it to multiple bitrates.

## Understanding The Report  {/*understanding-the-report*/}

![Traffic Report](/images/delivery/control/billing-report.png)

The following list identifies controls in the report:

**A** - Parent company and child companies - if the account you selected for your Control session has child companies, the parent company and its child companies are displayed in a dropdown. Otherwise, the parent company is displayed in a text field. See [Selecting Child Companies](#selecting-child-companies) for additional information.

**B** - Reporting month - Reporting Period.

**C** - Billing type - determines data to appear in the report.

**D** - Report data - Data in the report.

**E** - Groupings s - Control hierarchies and expandable sections.

**F** - Expandable selections - provide visibility into lower-level groupings.

You can select accounts, services, reporting month, and up to two levels of groupings.

<Callout type="info">Letters correspond to call-outs in the preceding screenshot and do not imply sequencing.</Callout>

### Selecting Child Companies {/*selecting-child-companies*/}

If the account you selected has child companies, the parent company and its child companies are displayed in a dropdown at the top of the page.

To limit report data to one or more child companies, select the desired child companies in the *Parent company and child companies* dropdown, then click the **apply** button at the bottom of the list.

If you don't select a child company, data for the parent company is displayed.

The is available only if the account has child companies.

<Callout type="info">The drop-down menu is available only if the account has child companies.
</Callout>

### Interactions Between Grouping Controls and Report {/*interactions*/}

The left-most column in the table has expandable selections; the data displayed is hierarchical and depends on the selections you make in the Groupings drop-down menus.

The number of Groupings drop-down menus and their content depends on the account and services you select. (Services available depend on your active Edgio services.)

Values in the Groupings drop-down menus are 'Account', 'Service', 'Region'. Depending on your services and accounts, one, two, or no Groupings drop-down menus may be displayed:

- If just two values are available, you will see only one drop-down menu. The table automatically shows the hierarchy for the selection you make.

    For example, if the drop-down menu contains only 'Service' and 'Account', and you select 'Account', all accounts are listed in the table. Expand any account to see the services under the account.

- If three values are available, you will see two drop-down menus. The first provides the major grouping. The second shows the groupings not selected in the first drop-down menu.
    For example, If the available values are 'Account', 'Service', 'Region', and you select 'Account' in the first drop-down menu, the second drop-down menu will contain 'Region' and 'Account'.

- No drop-down menus appear if only one value is available.

    For example, if only 'Account' is available, the accounts are listed in the report table.

### Examples of Expanding Groups {/*examples*/}

If you select 'Service' and 'Account' respectively in the Groupings drop-down menus, the first-level groups are your services. Expanding each of them reveals groups of the accounts you selected.

As another example, assume you have two accounts and have the 'http' and 'https' services and operate in four regions. If you select 'Account' in the first drop-down menu, the second drop-down menu's remaining choices are 'Service' and 'Region'. If you then select Service, you will see hierarchical entries in the first column that might look something like this when expanded:

```
first account
  http
    first region
    second region
second account
  https
    third region
    fourth region
```

## Working with Report Data  {/*working-with-report-data*/}

You can select accounts, reporting month, billing type, and up to two levels of groupings.

1. Select a service in the service drop-down menu.
2. Select one or more accounts in the account drop-down menu.
3. Select a month in the Reporting month drop-down menu.
4. Select a service from the Billing type drop-down menu.
5. If Groupings drop-down menus are available, make the desired selections.

After you make selections, the report title, and content change to reflect your selections.

### Removing and Adding Columns {/*removing-and-adding-columns*/}
Remove a column by hovering your mouse pointer over the column header and clicking the x icon on the upper right of the column header. Doing so removes the column immediately.

If there are additional columns to display, a **+** icon displays on the right side of the table header row. Click the icon and choose a column to add.

### Sorting the Report {/*sorting-the-report*/}
By default, the report is sorted in ascending order by the data in the first column. Click the 'Sort Direction' icon to sort data in descending order.

### Exporting Report Data  {/*exporting-report-data*/}
You can export report data to a Comma-Separated Values (CSV) file.

Click the *Export* drop-down menu on the right above the table, then choose a granularity:

| Granularity | Aggregation/Grouping in the CSV File |
| --- | --- |
| Monthly | Data is aggregated by month. |
| Daily | Data is broken out by day for the month selected in the Reporting month dropdown. |

After you choose a granularity, Control creates and downloads the report.

<Callout type="info">The SSL SNI reporting type does not have a Daily option because SSL SNI does not support daily granularity.</Callout>
