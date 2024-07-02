---
title: {{ OPEN_EDGE }}
---

The goal of this guide is to help Edgio's Open Edge partners:

- Become familiar with Edgio's Open Edge.
- Learn about the Edgio Edge Cache.
- Gain an understanding of the Control Portal and the Service Provider Traffic Report.

## About Open Edge  {/*about*/}
For service providers, video streaming and online gaming are key drivers of revenue and growth. But they are bandwidth-intensive, putting pressure on cost and infrastructure. And with growing demand compounded by file downloads and webpage delivery, the pressure continues to mount. The solution? Embed Content Delivery Network technology (CDN) on-net, reducing backhaul cost and improving performance while opening potential revenue opportunities.

Open Edge offers you a fully-managed CDN service embedded within your network. The flexible, easy-to-deploy architecture addresses many challenges in serving content to both on-net and off-net users. Edgio’s private global CDN and caching technologies provide the capacity and reach your needs while reducing network build-out and operational costs. The solutions are built for the future, including software that supports Open Caching specifications. The solution is backed by Edgio’s unrestricted 24/7/365 free live support and Network Operations Center.

### Edgio Edge Cache  {/*cache*/}
Open Edge is powered by Edgio Edge Cache, a "plug and play" service that lets you directly serve content from your infrastructure. Edge Cache servers are secure, high-performance CDN caching and distribution systems worldwide to drive Edgio global network delivery. By embedding this power within your network with dedicated connections to your routing systems, you turbocharge your delivery. Instead of repeated costly network calls to a distant origin, you can serve cached content directly from local on-net systems. For the lowest latency and maximum reliability, Edge Cache servers use high-speed solid-state devices for caching content.

## Open Edge Benefits  {/*benefits*/}
- Significantly Reduce Backhaul Cost

    Reduce operational costs associated with retrieving content from the origin by caching content within your network.

- Improve Quality of Experience (QoE)

    Improve overall QoE for your users with higher average video bitrates, faster start times, and lower rebuffer rates.

- Open the Door to Revenue Opportunities

    You can offer local content providers high-performance, in-region content delivery, and capture revenue from the traffic that content providers deliver through your network.

- Grow With Minimal Additional Overhead

- Focus on building your business while Edgio manages and operates your CDN infrastructure.

- Get Support When You Need It

    Get help quickly with our technology experts available through unrestricted 24/7/365 live support from Edgio’s Global Network Operations Center.

## Requirements  {/*requirements*/}

### Blockers  {/*blockers*/}
This section lists the minimum requirements prospective clients must meet to implement Edgio’s Open Edge Appliance or Full Stack solutions. Clients who do not meet these specifications are not candidates for these Edgio products.

#### General  {/*general*/}

|Appliance| Full Stack| Requirement|
|---|---|---|
|Yes|Yes|Reverse DNS zones must be delegated to Edgio DNS servers. See [Reverse DNS requirements](/open_edge/rdns_requirements) for details.|

#### Space and Power  {/*space*/}

|Appliance| Full Stack| Requirement|
|---|---|---|
|Yes|No| 1U appliance server (Minimum rack dimensions: Width = 600mm; depth = 1070mm)|
|No|Yes|Minimum rack dimensions: Width = 600mm; depth = 1070mm; height = 42RU (2000mm)|
|Yes|No|A maximum of 1100w at boot and steady-state operation at approximately 500-600w using C13-C14 power cords|
|Yes|Yes|Operate with A/B - Primary/ Redundant, AC-protected UPS power|
|No |Yes|208/30 (NEMA L6-30) single-phase power or 230/32 (IEC-60309) single-phase power. (PDUs will be provided).|

#### Connectivity  {/*connectivity*/}

|Appliance| Full Stack| Requirement|
|---|---|---|
|Yes|Yes|One Out-of-Band (OOB) connection <br />- Standardized OOB connection on 1G-LR <br />- 1G connection for OOB connectivity to the infrastructure<br />- /30 or /31 IPv4 public address for OOB|
|Yes|No|Two In-Band connections LACP-bonded, either 10G-LR or 100G-LR|
|Yes|Yes|Publicly available IPv4/IPv6 addresses <br />- An aggregate IPv4/28 for infrastructure and services, which can be divided into /29s, if necessary<br />- /124 of IPv6 address space per PoP. These subnets must be globally routable.|
|Yes|Yes|Provider-operated DNS infrastructure advertised to their customers for use. (While not a complete blocker, this requirement has significant impacts into the percentage of the current traffic available to be sourced from this new Open Edge installation.)|
|Yes|Yes|Provider-operated DNS resolvers available for their customers’ usage. Not a complete blocker but has significant impacts into what percentage of the current traffic is available to be sourced from this new Open Edge installation.|

#### Routing  {/*routing*/}

|Appliance| Full Stack| Requirement|
|---|---|---|
|Yes|Yes|- Anycast announcements restricted to the connected provider network edge. Specifically, the Anycast prefix cannot be allowed to propagate beyond the connected network edge and any downstreams that have had their traffic computed in the analysis (e.g., single homed downstreams or even smaller ISPs peered with a local ‘friendly big brother’.)<br />- Target network (s/network/infrastructure) routes to the Internet|

### rDNS  {/*rdns*/}

See the [Reverse DNS Requirements](/open_edge/rdns_requirements) document for details.

## Edgio Portal Capabilities for Service Providers  {/**/}
The Control Portal allows you to view data about your traffic and create additional users for your organization.

To log into Control:

1. Go to https://control.llnw.com/acontrol/#/login.

2. Enter the user and password that were provided to you in your Welcome Letter.

    The Dashboard is displayed, which is the initial view.

### Service Provider Traffic Report  {/*sp*/}

Refer to the [Service Provider Report](/delivery/control/reports/traffic/service_provider_traffic) guide for details.

### Creating Additional Users  {/*users*/}

To learn more about managing users, see the [Control Portal Users](/delivery/control/manage/control_portal_users) guide.
