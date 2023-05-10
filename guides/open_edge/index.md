---
title: Open Edge
---
# Purpose
The goal of this guide is to help Edgio's Open Edge partners:
l Become familiar with Edgio's Open Edge.
- Learn about the Edgio Edge Cache.
- Gain an understanding of the Control Portal and the Service Provider Traffic Report.

# Overview
For service providers, video streaming and online gaming are key drivers of revenue and growth. But they are
bandwidth-intensive, putting pressure on cost and infrastructure. And with growing demand compounded by
file downloads and webpage delivery, the pressure continues to mount. The solution? Embed Content
Delivery Network technology (CDN) on-net, reducing backhaul cost and improving performance while
opening potential revenue opportunities.

Open Edge offers you a fully-managed CDN service embedded within your network. The flexible, easy-todeploy
architecture addresses many challenges in serving content to both on-net and off-net users. Edgio’s
private global CDN and caching technologies provide the capacity and reach your needs while reducing
network build-out and operational costs. The solutions are built for the future, including software that supports
Open Caching specifications. The solution is backed by Edgio’s unrestricted 24/7/365 free live support and
Network Operations Center.

## Edgio Edge Cache
Open Edge is powered by Edgio Edge Cache, a "plug and play" service that lets you directly serve content
from your infrastructure. Edge Cache servers are secure, high-performance CDN caching and distribution
systems worldwide to drive Edgio global network delivery. By embedding this power within your network with
dedicated connections to your routing systems, you turbocharge your delivery. Instead of repeated costly
network calls to a distant origin, you can serve cached content directly from local on-net systems. For the
lowest latency and maximum reliability, Edge Cache servers use high-speed solid-state devices for caching
content.

## Open Edge Benefits
- Significantly Reduce Backhaul Cost:
Reduce operational costs associated with retrieving content from the origin by caching content within your network.
- Improve Quality of Experience (QoE):
Improve overall QoE for your users with higher average video bitrates, faster start times, and lower rebuffer rates.
- Open the Door to Revenue Opportunities:
You can offer local content providers high-performance, in-region content delivery, and capture revenue from the
traffic that content providers deliver through your network.
- Grow With Minimal Additional Overhead:
Focus on building your business while Edgio manages and operates your CDN infrastructure.
- Get Support When You Need It
Get help quickly with our technology experts available through unrestricted 24/7/365 live support from Edgio’s Global Network Operations Center.

# For Service Providers
The Edgio Control Portal allows you to view data about your traffic and create additional users for your organization.
To log into Control:
1. Go to https://control.llnw.com/acontrol/#/login.
2. Enter the user and password that were provided to you in your Welcome Letter. The Dashboard is displayed, which is the initial view.
3. Select the 'Service Provider' report from the Reporting section.

## Service Provider Traffic Report
The Service Provider Traffic Report provides metrics and trends that allow service providers to:
- Identify, isolate, and resolve performance-related issues to maintain a superior end-user experience and potential
revenue share from Edgio.
- Proactively identify potential issues and take corrective actions or escalate to Edgio Operations for further
troubleshooting from a software perspective.

To access the report after logging into Control:
1. Hover the mouse pointer over the left navigation menu.
2. Expand the 'Reports' menu.
3. Select 'Service Provider Traffic'. The Service Provider Traffic Report is displayed.

### Report Specifications
|   |   |
| ----------- | ----------- |
| Latency | Five minutes |
| Granularity | Five minutes: Today, Last 24 (days), Last 7 (days) |
|   | Hourly: Last month, Last 30 (days) |
|  | Daily: Last 90 (days), Any custom date range > 90 days |
| Dimensions | Date/time, In, Out, Edgio content provider aggregate, POP, Service provider account, Service (HTTP, HTTPS), Service provider's content providers |
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
|   |   |
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

- The value is displayed in bold black text with the appropriate unit of measurement; for example, bytes per second for
bandwidth.
- A percentage up or down from the previous period is shown in green, red, or gray:

    o Increase: a circle with an arrow pointing up along with the percentage change, both in green.
    
    o Decrease: a circle with an arrow pointing down, along with the percentage change, both in red. 
    
    o No change: a circle with an arrow pointing to the right, 0% as the percentage change, circle and percentage both
in blue.
The percentage up or down is calculated as follows:
Percentage = ((newValue - oldValue) / oldValue)) * HUNDRED_PERCENT

## Creating Additional Users

Open Edge Benefits

