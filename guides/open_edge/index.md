---
title: Open Edge
---
# Purpose
The goal of this guide is to help Edgio's Open Edge partners:
- Become familiar with Edgio's Open Edge.
- Learn about the Edgio Edge Cache.
- Gain an understanding of the Control Portal and the Service Provider Traffic Report.

# Overview
For service providers, video streaming and online gaming are key drivers of revenue and growth. But they are bandwidth-intensive, putting pressure on cost and infrastructure. And with growing demand compounded by file downloads and webpage delivery, the pressure continues to mount. The solution? Embed Content Delivery Network technology (CDN) on-net, reducing backhaul cost and improving performance while opening potential revenue opportunities.

Open Edge offers you a fully-managed CDN service embedded within your network. The flexible, easy-todeploy architecture addresses many challenges in serving content to both on-net and off-net users. Edgio’s private global CDN and caching technologies provide the capacity and reach your needs while reducing network build-out and operational costs. The solutions are built for the future, including software that supports Open Caching specifications. The solution is backed by Edgio’s unrestricted 24/7/365 free live support and Network Operations Center.

## Edgio Edge Cache
Open Edge is powered by Edgio Edge Cache, a "plug and play" service that lets you directly serve content from your infrastructure. Edge Cache servers are secure, high-performance CDN caching and distribution systems worldwide to drive Edgio global network delivery. By embedding this power within your network with dedicated connections to your routing systems, you turbocharge your delivery. Instead of repeated costly network calls to a distant origin, you can serve cached content directly from local on-net systems. For the lowest latency and maximum reliability, Edge Cache servers use high-speed solid-state devices for caching content.

## Benefits
- Significantly Reduce Backhaul Cost:
<br />Reduce operational costs associated with retrieving content from the origin by caching content within your network. 
- Improve Quality of Experience (QoE):
<br />Improve overall QoE for your users with higher average video bitrates, faster start times, and lower rebuffer rates. 
- Open the Door to Revenue Opportunities:
<br />You can offer local content providers high-performance, in-region content delivery, and capture revenue from the traffic that content providers deliver through your network.
- Grow With Minimal Additional Overhead:
<br />Focus on building your business while Edgio manages and operates your CDN infrastructure.
- Get Support When You Need It:
<br />Get help quickly with our technology experts available through unrestricted 24/7/365 live support from Edgio’s Global Network Operations Center.

# For Service Providers
The Edgio Control Portal allows you to view data about your traffic and create additional users for your organization.
To log into Control:
1. Go to https://control.llnw.com/acontrol/#/login.
2. Enter the user and password that were provided to you in your Welcome Letter. The Dashboard is displayed, which is the initial view.
3. Select the 'Service Provider' report from the Reporting section.

## Service Provider Traffic Report
The Service Provider Traffic Report provides metrics and trends that allow service providers to:
- Identify, isolate, and resolve performance-related issues to maintain a superior end-user experience and potential revenue share from Edgio.
- Proactively identify potential issues and take corrective actions or escalate to Edgio Operations for further troubleshooting from a software perspective.

To access the report after logging into Control:
1. Hover the mouse pointer over the left navigation menu.
2. Expand the 'Reports' menu.
3. Select 'Service Provider Traffic'. The Service Provider Traffic Report is displayed.

### Report Specifications
|  Specification    | Details  |
| ----------- | ----------- |
| Latency | Five minutes |
| Granularity | Five minutes: <br />-Today <br />-Last 24 (days) <br />-Last 7 (days)  |
|   | Hourly: <br />-Last month <br />-Last 30 (days)  |
|  | Daily: <br />-Last 90 (days) <br />-Any custom date range > 90 days<br />  |
| Dimensions | -Date/time <br />-In,  Out <br />-Edgio content provider aggregate <br />-POP Service provider account <br />-Service (HTTP, HTTPS) <br />-Service provider's content providers  |
| Metrics | Average, Peak, and Low values for Bandwidth, Volume (data transferred), and Requests |
| Delivery Mechanism | EdgeQuery |

#### Choosing Services, Time Frames, and Timezone
The top right part of the report contains controls for selecting services, a time frame, and a timezone.
- Choose a service: HTTP, HTTPS, or All (HTTP and HTTPS).
- Choose from pre-set time frames or choose custom date ranges in the drop-down menu. Click the Apply button on custom ranges.
- Choose a timezone. The top five most commonly used timezones in Control are at the top of the drop-down menu. Scroll down for additional time zones.

The data in the tabs changes to reflect your choices.

### Metrics in the Report
The tabs in the report provide the metrics shown in the following table:
|  Tab |  Metric |
| ----------- | ----------- |
|Bandwidth | Data rate, measured in bytes per second |
| Volume| Amount of data transferred, measured in bytes |
| Requests | Nubmer of requests for data |
| Efficiency | Volume of data and the number of requests served from the cache vs the volume of data and number of requests that resulted in a cache miss at the PoP level. |

### Tab Components
The following sections describe the Summary Area and various charts available in the Service Provider Traffic report.

#### Summary Area
<Callout type="info">

  Only the Bandwidth, Volume, and Requests tabs contain a Summary Area.

</Callout>
This component shows the average value, peak value, and low value for the metric in the selected tab, along with a comparison to the prior period of the same time frame.

- The value is displayed in bold black text with the appropriate unit of measurement; for example, bytes per second for bandwidth.
- A percentage up or down from the previous period is shown in green, red, or gray:

    - Increase: a circle with an arrow pointing up along with the percentage change, both in green.
    
    - Decrease: a circle with an arrow pointing down, along with the percentage change, both in red. 
    
    - No change: a circle with an arrow pointing to the right, 0% as the percentage change, circle and percentage both in blue.

The percentage up or down is calculated as follows:
```
Percentage = ((newValue - oldValue) / oldValue)) * HUNDRED_PERCENT
```

#### Chart Area
The chart area provides a graphical representation of the measurement represented in a tab

##### Line Chart
<Callout type="info">

  Only the Bandwidth, Volume, and Requests tabs contain the line chart.

</Callout>

The line chart shows In and Out values for the measurement represented in the tab.

- In: any traffic coming into the PoP from other PoPs or customer origins

- Out: any traffic leaving the PoP from the edge to requesting clients

The In and Out values are a function of the selected time frame. For example, a time frame of 24 hours shows hours on the X-axis.

Move your pointer across the chart to view details over time.

##### POP Location Chart
<Callout type="info">

  Only the Bandwidth, Volume, and Requests tabs contain the PoP Location bar chart.

</Callout>

This stacked bar chart summarizes all In and Out values, broken out by PoPs, where each bar represents a PoP location.

- To view In values and Out values, hover your pointer over a bar.

- The PoP name and description are beneath each bar.

##### Volume Distribution by CPs Chart

<Callout type="info">

  Only the Volume tab contains this chart.

</Callout>

This chart summarizes content provider traffic volume for each of the service provider's content providers. Each bar represents one content provider, and the 'In' and 'Out' values are aggregates of all the content provider's accounts (shortnames)

- Scroll to the bottom of the page to view the chart.

- To view 'In' and 'Out' values, hover your pointer over a bar.

##### POP Location Data Transfer/Requests Efficiency Chart

This chart shows the efficiency of a PoP in terms of volume of data and number of requests served from the cache versus those that resulted in a cache miss at the PoP level.

Data is shown in percentages where higher values indicate higher efficiency.

- Use the Data Transfer | Requests toggle above the chart to display information for Data Transfer or Requests.

- To view the efficiency measurement, hover your pointer over a bar.

- The PoP name and description are beneath each bar.

|  Data Tranferred Efficiency Calculation |  Requests Efficiency Calculation |
| ----------- | ----------- |
| (bytes served from cache - bytes served from origin ) / (bytes served from cache) * 100% | (requests served from cache - requests served from origin ) / (requests served from cache) * 100% |

<Callout type="info">

  If the value of Egress - Ingress is negative, the efficiency value displayed is zero.

</Callout>

### Exporting Data
To export chart data to a PowerPoint file that contains a screenshot of the chart, click the Export drop-down menu on the right above the chart; then select PowerPoint.

After you select PowerPoint; Control creates and downloads the report.

## Creating Additional Users
 
You might want to create additional users for other personnel in your organization.

1. After logging in, click 'Manage' in the left navigation menu, then select 'Users'.

2. Click the *+ new* button at the top of the page.

3. For extensive information on creating users, please see "Managing Users" in the Control User Guide.
