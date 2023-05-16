---
title: Open Edge
---
For service providers, video streaming and online gaming are key drivers of revenue and growth, but they are bandwidth-intensive, putting pressure on cost and infrastructure. With growing demand compounded by file downloads and webpage delivery, the pressure continues to mount. The solution? Embed Content Delivery Network technology (CDN) on-net, reducing backhaul cost and improving performance while opening potential revenue opportunities.

## Purpose
The goal of this content is to help Edgio's Open Edge partners
- Become familiar with Edgio's Open Edge
- Learn about the Edgio Edge Cache
- Gain an understanding of the Control portal and the Service Provider Traffic Report

## Edge Cache
Open Edge is powered by Edgio Edge Cache, a plug-and-play service that lets you directly serve content from your infrastructure. Edge Cache servers are secure, high-performance CDN caching and distribution systems worldwide to drive Edgio global network delivery. By embedding this power within your network with dedicated connections to your routing systems, you turbocharge your delivery. Instead of repeated costly network calls to a distant origin, you can serve cached content directly from local on-net systems. For the lowest latency and maximum reliability, Edge Cache servers use high-speed, solid-state devices for caching content.

## Benefits
|  Benefit    | Details  |
| ----------- | ----------- |
| Significantly Reduce Backhaul Cost | Reduce operational costs associated with retrieving content from the origin by caching content within your network. |
| Improve Quality of Experience (QoE) | Improve overall QoE for your users with higher average video bitrates, faster start times, and lower rebuffer rates. |
| Open the Door to Revenue Opportunities | You can offer local content providers high-performance, in-region content delivery and capture revenue from the traffic that content providers deliver through your network. | Focus on building your business while Edgio manages and operates your CDN infrastructure. |
| Get Support When You Need It | Get help quickly with our technology experts available through unrestricted 24/7/365 live support from Edgio’s Global Network Operations Center. |

## Portal for Service Providers
The Edgio Portal allows you to view data about your traffic and create additional users for your organization.
To log into the Control portal:
1. Go to https://control.llnw.com/acontrol/#/login.
2. Enter the user and password that were provided to you in your Welcome Letter. The Dashboard is displayed, which is the initial view.
3. Select the **Service Provider** report from the Reporting section.

## Service Provider Traffic Report
The Service Provider Traffic Report provides metrics and trends that allow service providers to
- Identify, isolate, and resolve performance-related issues to maintain a superior end-user experience and potential revenue share from Edgio.
- Proactively identify potential issues and take corrective actions or escalate to Edgio Operations for further troubleshooting from a software perspective.

To access the report after logging into Control:
1. Hover the mouse pointer over the left navigation menu.
2. Expand the **Reports** menu.
3. Select **Service Provider Traffic** to display the Service Provider Traffic Report.

### Report Specifications
|  Specification    | Details  |
| ----------- | ----------- |
| Latency | Five minutes |
| Granularity | **Five minutes** <ul> <li>Today</li> <li>Last 24 (days)</li> <li>Last 7 (days)</li></ul>**Hourly**<ul><li>Last month</li> <li>Last 30 (days)</li></ul> **Daily** <ul><li>Last 90 (days) </li><li>Any custom date range > 90 days</li></ul> |
| Dimensions | Date/time <br />In,  Out <br />Edgio content provider aggregate <br />POP Service provider account <br />Service (HTTP, HTTPS) <br />Service provider's content providers  |
| Metrics | Average, Peak, and Low values for Bandwidth, Volume (data transferred), and Requests |
| Delivery Mechanism | EdgeQuery |

### Choosing Services, Time Frames, and Timezone
The top right part of the report contains controls for selecting services, a time frame, and a timezone.
- Choose a service: HTTP, HTTPS, or All (HTTP and HTTPS).
- Choose from pre-set time frames or choose custom date ranges in the drop-down menu. Click the **Apply** button on custom ranges.
- Choose a timezone. The top five most commonly used timezones in the Control portal are at the top of the drop-down menu. Scroll down for additional time zones.

The data in the tabs changes to reflect your choices.

### Metrics in the Report
The tabs in the report provide the metrics shown in this table:
|  Tab |  Metric |
| ----------- | ----------- |
|Bandwidth | Data rate, measured in bytes per second |
| Volume| Amount of data transferred, measured in bytes |
| Requests | Number of requests for data |
| Efficiency | Volume of data and the number of requests served from the cache vs the volume of data and number of requests that resulted in a cache miss at the PoP level. |

### Summary Area
<Callout type="info">

  Only the **Bandwidth**, **Volume**, and **Requests** tabs contain a summary area.

</Callout>
This component shows the average value, peak value, and low value for the metric in the selected tab, along with a comparison to the prior period of the same time frame.

- The value is displayed in bold black text with the appropriate unit of measurement, for example, bytes per second for bandwidth.
- A percentage up or down from the previous period is shown in green, red, or gray:

|  Change from Previous Period |  Details |
| ----------- | ----------- |
| Increase | A circle with an arrow pointing up along with the percentage change, both in green. |
| Decrease | A circle with an arrow pointing down, along with the percentage change, both in red. |
|   No change | A circle with an arrow pointing to the right, 0% as the percentage change, circle and percentage both in blue. |

The percentage up or down is calculated as follows:

`Percentage = ((newValue - oldValue) / oldValue)) * HUNDRED_PERCENT`

### Chart Area
The chart area provides a graphical representation of the measurement represented in a tab

#### Line Chart
<Callout type="info">

  Only the **Bandwidth**, **Volume**, and **Requests** tabs contain the line chart.

</Callout>

The line chart shows In and Out values for the measurement represented in the tab.

- `In`: Any traffic coming into the PoP from other PoPs or customer origins

- `Out`: Any traffic leaving the PoP from the edge to requesting clients

The `In` and `Out` values are a function of the selected time frame. For example, a time frame of 24 hours shows hours on the X-axis.

Move your pointer across the chart to view details over time.

#### POP Location Chart
<Callout type="info">

  Only the **Bandwidth**, **Volume**, and **Requests** tabs contain the PoP Location bar chart.

</Callout>

This stacked bar chart summarizes all `In` and `Out` values, broken out by PoPs, where each bar represents a PoP location.

- To view `In` values and `Out` values, hover your pointer over a bar.

- The PoP name and description are beneath each bar.

#### Volume Distribution by CPs Chart

<Callout type="info">

  Only the **Volume** tab contains this chart.

</Callout>

This chart summarizes the content-provider traffic volume for each of the service provider's content providers. Each bar represents one content provider, and the `In` and `Out` values are aggregates of all the content provider's accounts (shortnames).

- Scroll to the bottom of the page to view the chart.

- To view `In` and `Out` values, hover your pointer over a bar.

#### POP Location Data Transfer/Requests Efficiency Chart

This chart shows the efficiency of a PoP in terms of volume of data and number of requests served from the cache vs those that resulted in a cache miss at the PoP level.

Data is shown in percentages, where higher values indicate higher efficiency.

- Use the **Data Transfer | Requests** toggle above the chart to display information for data transfer or requests.

- To view the efficiency measurement, hover your pointer over a bar.

- The PoP name and description are beneath each bar.

|  Data Tranferred Efficiency Calculation |  Requests Efficiency Calculation |
| ----------- | ----------- |
| (bytes served from cache - bytes served from origin ) / (bytes served from cache) * 100% | (requests served from cache - requests served from origin ) / (requests served from cache) * 100% |

<Callout type="info">

  If the value of `Egress - Ingress` is negative, the efficiency value displayed is zero.

</Callout>

### Exporting Data
To export chart data to a PowerPoint (.ppt) file that contains a screenshot of the chart, click the **Export** drop-down menu on the right above the chart; then select **PowerPoint**. The Control portal creates and downloads the report.

## Creating Additional Users
 
You might want to create additional users for other personnel in your organization.

1. After logging in, click **Manage** in the left navigation menu, then select **Users**.

2. Click the **+ new** button at the top of the page.

3. For extensive information on creating users, please see `Managing Users` in the [Control Portal User Guide](https://support.limelight.com/public/en/Default.htm#Control/Control%20Portal%20-%20User%20Guide/User%20Guide%20Pages/Control%20Portal%20User%20Guide.htm?TocPath=Control%257CUser%2520Guide%257C_____0).

## FAQs
|  Question |  Response |
| ----------- | ----------- |
| How is traffic directed to an Open Edge PoP? | Edgio uses Anycast Border Gateway Protocol (BGP) announcements to direct clients towards the nearest DNS servers. The primary method of controlling which Point of Presence (PoP) clients are delivered from is through DNS. In the event of a PoP failure that results in BGP communication issues between Edgio and our providers, traffic is automatically routed to the next logically close location where IP announcements are being advertised. Edgio's DNS systems have the capability to selectively move traffic based on various metrics and data inputs. This process is primarily automated, with manual controls and overrides in place. During planned maintenance, Edgio has the ability to proactively shift traffic to selected locations and adhere to best practices by utilizing the best known connected location with the nearest proximity to the location undergoing maintenance. |
|How do I know that the revenue share is accurate? | Edgio has a Service Provider portal that displays traffic activity; however, we cannot share customer-specific details on volume or pricing as it is forbidden in most content contracts. As a publicly traded company, Edgio follows industry-standard accounting practices. On a monthly basis, the CFO certifies the accuracy of the reported results and delivers a sworn statement. |
| Why does Edgio request me to provision more egress than the rated server size? | Edgio Service Provider PoPs have an `N+1` hardware configuration to ensure that the rated capacity remains true. For example, a 100G PoP includes 100G of CDS capacity + 25G server for good measure. |
| Can I provision egress capacity on an as-needed basis? | Edgio requires the egress to meet or exceed the PoP rating. The egress needs to be in place so that Edgio can sell into the capacity as well as be available for live events that might exceed the typical daily usage. This is an important consideration for providing the revenue share. |
|Does Edgio provide racks for the severs? | The standard configuration does not include racks; however, racks can be included upon request. |
| What is required for remote-hands support? | Edgio requires the Service Provider to be available for any physical activity related to the PoP, including installation, reboot as required, visual inspection, and hardware replacement if necessary. |
| Who is responsible in the event of hardware failure? | If the Service Provider owns the hardware and is receiving revenue share (typically 40%), the Service Provider is financially responsible to purchase replacement hardware. Edgio assists in providing any necessary information and in coordinating the replacement. The Service Provider may purchase the replacement hardware from Edgio. Any replacement hardware must meet the specifications of Edgio. Edgio does not get involved in minor items such as cable replacement. If Edgio owns the hardware, Edgio is financially responsible to replace hardware during the term of the contract. |
| What is the software-update process? | Edgio operates an Agile software-development process with a goal of ten monthly releases per annual cycle. A monthly release is not planned during the December holiday blackout period, nor is a monthly release planned during anticipated additional software-development load due to failed QA or unplanned work. Each monthly release is tested in Edgio’s QA environment, followed by a carefully monitored production burn-in environment. After acceptance of all stages, Edgio’s entire network is upgraded across a 72-hour upgrade window. |
| How is a PoP failover handled? | The default policy of Edgio traffic management is to failover or spillover traffic from any of our Service Provider partners into sites owned and operated by Edgio. This practice prevents stampede failure because the Edgio core PoPs are generally 10x the size of our Partner Network locations. Once health and traffic levels have returned to normal, Edgio’s standard traffic-engineering processes return traffic to the affected sites. |
| What is the power consumption in watts of our PoP? | Each rack consumes up to 5KW of power when fully loaded. A 50G-200G single-rack system consumes up to 5KW; however, it is likely to be less on the smaller sizes. A dual-rack 200G-400G PoP consumes up to 10KW of power. |
| Does the hardware include a warranty? | If the Service Provider owns the hardware, the manufacturer warranty transfers to the Service Provider. Current warranty lengths for major components are: <br /><ul><li>Arista (direct) - 1 year</li> <li>Dell (direct) - 3 years</li> <li>Super Micro (direct) - 3 years </li> <li>Cisco (via OSI) - Lifetime (shipped to Edgio) </li> <li>Aruba (via OSI) - Lifetime (shipped to Edgio)</li> <li>Raritan (via OSI) -Lifetime (shipped to Edgio)</li></ul> |






 

























