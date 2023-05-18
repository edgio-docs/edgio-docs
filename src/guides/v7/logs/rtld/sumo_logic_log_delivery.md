---
title: Sumo Logic Log Delivery
---

RTLD may automatically deliver compressed log data to Sumo Logic by submitting HTTPS `POST` requests to it. Sumo Logic will collect these requests as they are pushed from the CDN. Each request represents a compressed JSON document that describes one or more log entries.

**Key information:**

-   The format for log data delivered to Sumo Logic is JSON Lines. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.
-   The set of available log fields varies by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

**To set up Sumo Logic log delivery**

1.  Set up Sumo Logic to listen for CDN log data in JSON format.
    
    1.  Log in to Sumo Logic.
    2.  Click **Setup Wizard**.
        
        ![](/images/v7/logs/sumo-logic-1.png)
        
    3.  Click **Set Up Streaming Data**.
        
        ![](/images/v7/logs/sumo-logic-2.png?width=500)
        
    4.  Click **Your Custom App**.
        
        ![](/images/v7/logs/sumo-logic-3.png)

        <a id="http-source" />

    5.  Click **HTTP Source**.
        
        ![](/images/v7/logs/sumo-logic-4.png?width=500)
        
    6.  In the **Source Category** option, type the name of the tag that will be applied to CDN log data. This tag may be used to search for CDN log data within Sumo Logic.
        
        ![](/images/v7/logs/sumo-logic-5.png)
        
    7.  Click **Continue**. An HTTP Source for CDN log data will be created.
    8.  Copy the URL associated with this HTTP Source.

2.  Upon completing the above steps, you should create a log delivery profile for Sumo Logic.

{{ RTLD_PROFILE_SETUP_1 }} `Sumo Logic`.

4.  Define how RTLD will communicate with Sumo Logic.

    In the **Sumo Logic URL** option, paste the URL associated with your [HTTP Source](#http-source).

{{ RTLD_PROFILE_SETUP_2 }}
