---
title: EdgeQuery Data
---
EdgeQuery (EQ) is Edgio’s powerful data collection engine powered by an edge-based computing platform. EdgeQuery provides near-real-time aggregated data for many of the reports in Control, and is also accessible to customers via REST API.

EdgeQuery data is pre-aggregated data (as displayed in Control reports) accessed via REST API. (Live Logs data is un-aggregated HTTP log data accessed via FTP.) EdgeQuery also enriches the data available from Live Logs with additional data types, such as geographic location and validations.

## EQ API

The EdgeQuery API is a fee-based RESTful service that provides access to:

- Standard data (the same data displayed in Control reports powered by EdgeQuery)
- Custom data (customer-specific aggregations of standard data)

### Pricing {/*pricing*/}

<Callout type="info">The EdgeQuery REST API is priced separately from other Edgio services. Please contact your Account Manager for more information on pricing.</Callout>

Pricing for the EdgeQuery REST API is based on the following:

- Data complexity (number of queries, data granularity, frequency of access, data retention time)
- Data quantity (GB transferred)

Normally there is an initial setup fee, a fixed monthly access fee, and incremental fees based on data access volume. Different rate limits are also applied based on the pricing plan.

### Data Retention {/*data-retention*/}

The maximum retention time for EdgeQuery data is 90 days. Retention is configurable at the account level, but most customers need only a few hours or days of historical data.

## EQ Reports in Control  {/*eq-reports-in-control*/}

The following reports are powered by EdgeQuery data:
- [Billing](/delivery/control/reports/traffic/billing)
- [CMCD](/delivery/control/reports/traffic/cmcd)
- [DNS Overview](/delivery/control/reports/traffic/dns_overview)
- [Live Stats](/delivery/control/reports/traffic/live_stats)
- [LivePush Streaming Report](/delivery/control/reports/traffic/live_push)
- [Origin Storage](/delivery/control/reports/traffic/origin_storage)
- [Live Stats](/delivery/control/reports/traffic/live_stats)
- [Status Codes](/delivery/control/reports/traffic/status_codes)
- [Traffic](/delivery/control/reports/traffic/traffic)
- [Transit](/delivery/control/reports/traffic/transit)
- [Unified Traffic](/delivery/control/reports/traffic/unified_traffic)


## Custom Queries  {/*custom-queries*/}

<Callout type="info">The development and use of custom queries is priced separately from other Edgio services. Contact your Account Manager with inquiries.</Callout>

Custom queries can be developed by Edgio based on specific customer requests, and may be accessed via the EdgeQuery REST API. In general, custom queries can be created for any aggregation of the standard data generally available via the API.

Custom queries can be used when customers need:

- Real-time data at small increments (~300 seconds)
- End-user analytics to measure engagement and quality of service
- Proactive monitoring/alerting for general status and/or errors
- Data for custom NOC reporting dashboards
- Specific billing data for clients based on URL path
- Reduced need to aggregate and process raw CDN logs

Examples of custom queries include:

- Totaling content usage across multiple Edgio accounts, services and/or regions
- Breaking out content usage by domain or other data dimension
- Flagging when predefined usage limits are exceeded

<Callout type="info">Custom queries and their results are not currently viewable in Control.</Callout>

## Pricing  {/*pricing*/}

The EdgeQuery REST API and the development of custom queries are priced separately from other Edgio services. Please contact your Account Manager for more information on pricing.

Pricing for the EdgeQuery REST API is based on the following:

- Data complexity (number of queries, data granularity, frequency of access, data retention time)
- Data quantity (GB transferred)

Normally there is an initial setup fee, a fixed monthly access fee, and incremental fees based on data access volume. Different rate limits are also applied based on the pricing plan.
