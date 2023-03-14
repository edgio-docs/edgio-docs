---
title: Datadog Log Delivery
---

RTLD may automatically deliver compressed log data to Datadog by submitting HTTPS POST requests to it. Datadog will collect these requests as they are pushed from the CDN. Each request contains a compressed JSON document that describes one or more log entries.

**Key information:**

-   The format for log data delivered to Datadog is JSON Array. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.
-   The set of available log fields varies by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

**To prepare Datadog for log delivery**

1.  From within the Datadog portal, copy your API key.
2.  Identify the Datadog location to which log data will be delivered.
3.  Upon completing the above steps, you should create a log delivery profile for Datadog.

{{ RTLD_PROFILE_SETUP_1 }} Datadog.

    1.  From the **Datadog Site** option, select the Datadog location to which log data will be delivered.
    2.  From the **Datadog API Key** option, paste your Datadog API key. This API key authorizes our service to upload log data to Datadog.
    3.  From the **Datadog Service Attribute Value** option, type a value that identifies the data delivered as a result of this profile. Our service sets Datadog's service reserved attribute to this value.

{{ RTLD_PROFILE_SETUP_2 }}