---
title: New Relic Log Delivery
---

RTLD may automatically deliver compressed log data to your New Relic account by submitting HTTPS POST requests to it. Each request represents a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   The format for log data delivered to New Relic is JSON Array. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.
-   You must define an event type when setting up a log delivery profile. Query delivered log data by constructing a NRQL that selects data using this event type label (e.g., `SELECT \* FROM Event Type`).
-   RTLD authorizes requests to New Relic through an Inserts insight API key. Due to security best practices, we recommend using a dedicated API key for RTLD requests.
-   The set of available log fields varies by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

<!--
RTLD CDN and RTLD Rate Limiting support delivery to the New Relic destination.
-->

**To set up New Relic log delivery**

1.  Optional. Register an Inserts insight API key that is dedicated for RTLD log delivery.
    
    [View New Relic documentation on how to register an Inserts insight API key.](https://docs.newrelic.com/docs/telemetry-data-platform/ingest-manage-data/ingest-apis/introduction-event-api/)

2.  Upon completing the above step, you should create a log delivery profile for New Relic.

{{ RTLD_PROFILE_SETUP_1 }} New Relic.

    1.  Set the **Account ID** option to your New Relic account ID.
    2.  Set the **Event Type** option to a label that identifies log data delivered to New Relic as a result of this profile. Specify a label that solely consists of alphanumeric characters, underscores, and colons.
    3.  Set the **Insert Key** option to an Inserts insight API key.

{{ RTLD_PROFILE_SETUP_2 }}