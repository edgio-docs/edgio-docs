---
title: Splunk Enterprise Log Delivery
---

RTLD may automatically deliver compressed log data to Splunk Enterprise by submitting HTTPS `POST` requests to it. The Splunk HTTP Event Collector (HEC) will collect and log each request. Each request contains a compressed JSON document that describes one or more log entries.

The format for log data delivered to Splunk Enterprise is JSON Lines. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.

**Key information:**

-   The prerequisite for log delivery are:
    -   Splunk Enterprise 7.x
    -   Your instance of Splunk Enterprise 7.x must be secured with SSL.
    -   SSL must be enabled on the HTTP Event Collector.
        
    For information on how to set up Splunk Enterprise, please refer to [their documentation](https://docs.splunk.com/Documentation).

-   The set of available log fields varies by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

**To set up Splunk Enterprise log delivery**

1.  Set up Splunk Enterprise's HTTP Event Collector to accept CDN log data in JSON format.

    1.  From with Splunk Enterprise, click **Settings** and then **Add Data**.

        ![](/images/logs/splunk-1.png?width=500)
        
    3.  Click **Monitor**.
        
        ![](/images/logs/splunk-2.png?width=500)
        
    4.  Click **HTTP Event Collector**.
        
        ![](/images/logs/splunk-3.png?width=500)
        
    5.  In the **Name** option, define a name for the CDN log data that will be collected.
        
        ![](/images/logs/splunk-4.png?width=500)
        
    6.  Click **Next >**.
    7.  Click **Select** to display the **Select Source Type** option. Click that option, type `\_json` to filter source types, and then select it.
        
        ![](/images/logs/splunk-5.png?width=500)
        
    8.  Click **Review**.
    9.  Click **Submit >** to finish setting up the HTTP Event Collector. An HEC token will be generated. Use this token to authorize requests posted to the HEC.

2.  Perform the following steps if you have hosted Splunk Enterprise within your network:
    
    1.  Configure your firewall to allow `POST` requests from the following IP blocks:
        
    2.  Set up support for the HTTPS protocol.
        
        Log delivery requires a certificate whose trust anchor is a publicly trusted certificate authority (CA). Additionally, the certificate must include a chain of trust for all intermediate certificate(s) and a leaf certificate.

3.  Upon completing the above steps, you should create a log delivery profile for Splunk Enterprise.

{{ RTLD_PROFILE_SETUP_1 }} `Splunk Enterprise`.

4.  Define how RTLD will communicate with Splunk Enterprise.

    1.  Set the **Splunk URL** option to a URL that points to your Splunk Enterprise's HTTP Event Collector configuration.
    
        **Default URL syntax:** `https://<SPLUNK ENTERPRISE HOSTNAME>:<PORT>/services/collector/raw`
    
         Replace `<SPLUNK ENTERPRISE HOSTNAME>` with the hostname where your instance of Splunk Enterprise is hosted. Replace `<PORT>` with the port number (e.g., `8088`) that the HTTP Event Collector is listening for data. This port number may be configured when defining your HEC's global settings.

    2.  Set the **HEC Token** option to the token generated for your HTTP Event Collector configuration.

{{ RTLD_PROFILE_SETUP_2 }}
