---
title: Real-Time Log Delivery (RTLD)
---

Real-Time Log Delivery (RTLD) delivers log data in near real-time to a variety of destinations. It consists of two modules, which are:

-   **Real-Time Log Delivery CDN (RTLD CDN):** Delivers log data that describes requests submitted to our CDN service.
    
    <Callout type="info">

      This feature must be purchased separately. For more information, please contact your CDN account manager.

    </Callout>

-   **Real-Time Log Delivery Rate Limiting (RTLD Rate Limiting):** Delivers log data that describes requests for which [Web Application Firewall (WAF)](/guides/security/waf) enforced a rate limit as defined through a rate rule.

    <Callout type="info">

      RTLD Rate Limiting requires WAF Premier, WAF Standard, or WAF Essentials. If you currently have WAF Insights and would like to use this capability, please contact your CDN account manager to upgrade to the full version.

    </Callout>

-   **Real-Time Log Delivery WAF (RTLD WAF):** Delivers log data that describes requests identified as threats by [Web Application Firewall (WAF)](/guides/security/waf).

    <Callout type="info">

      RTLD WAF requires WAF Premier, WAF Standard, or WAF Essentials. If you currently have WAF Insights and would like to use this capability, please contact your CDN account manager to upgrade to the full version.

    </Callout>

    <Callout type="info">

      RTLD WAF delivers log data for threats identified by WAF. It excludes log data for rate limited requests as determined by rate rules. Use RTLD Rate Limiting to deliver log data for rate limited requests.

    </Callout>

RTLD delivers compressed log data to one or more of the following destination(s):

-   Your [web server](/guides/logs/rtld/web_server_log_delivery).
-   An [AWS S3 bucket](/guides/logs/rtld/aws_s3_log_delivery).
-   An [Azure Block Blob](/guides/logs/rtld/azure_log_delivery).
-   [Datadog](/guides/logs/rtld/datadog_log_delivery).
-   A [Google Cloud Storage bucket](/guides/logs/rtld/google_cloud_storage_log_delivery).
-   [New Relic (RTLD CDN and RTLD Rate Limiting)](/guides/logs/rtld/new_relic_log_delivery).
-   [Splunk Enterprise](/guides/logs/rtld/splunk_log_delivery).
-   [Sumo Logic](/guides/logs/rtld/sumo_logic_log_delivery).

![RTLD Workflow](/images/v7/logs/rtld-workflow.png)

Log data consists a set of log entries. Each entry describes either:

-   **RTLD CDN:** A HTTP/HTTPS request that was directed to our CDN service.
-   **RTLD Rate Limiting:** A HTTP/HTTPS request that exceeded a rate limit enforced by a Security Application Manager configuration.
-   **RTLD WAF:** A HTTP/HTTPS request that was identified as a threat by WAF and information on why it was deemed a threat.

If our service is unable to deliver log data, then we will store it for up to 3 days and deliver it when communication resumes. If we cannot deliver log data within 3 days, then it will be permanently deleted.

## Quick Start

Setting up log delivery consists of the following steps:

1.  Decide on and prepare the service or web server(s) to which log data will be delivered.
2.  If required, gather authentication information for the above destination.
3.  Create a log delivery profile for the above destination.

## Log Delivery Profiles

A log delivery profile identifies:

-   Where log data will be delivered.
-   The amount of data that will be delivered.
-   Whether log data will be filtered prior to delivery.
-   The set of log fields that will be delivered.

### Multiple Profiles

You may create multiple profiles. This allows you to:

-   Send log data to one or more destinations. This is useful for disaster recovery.
-   Segregate log data by type within a single destination.
-   Gather more detailed data as needed.

**Key information:**

-   Perform profile administration from the Real-Time Log Delivery CDN or WAF landing page. 
    
-   Log fields vary by RTLD module.
    
    Learn more about log fields: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)
    
-   Log data will only be delivered when a profile's status is enabled.
-   The procedure for creating and modifying profiles varies by the destination to which log files will be delivered. Learn more about delivering to:
    
    [Your web server(s)](/guides/logs/rtld/web_server_log_delivery) | [An AWS S3 Bucket](/guides/logs/rtld/aws_s3_log_delivery)| [An Azure Block Blob container](/guides/logs/rtld/azure_log_delivery) | [Splunk Enterprise](/guides/logs/rtld/splunk_log_delivery) | [Sumo Logic](/guides/logs/rtld/sumo_logic_log_delivery) | [Datadog](/guides/logs/rtld/datadog_log_delivery) | [Google Cloud Storage](/guides/logs/rtld/google_cloud_storage_log_delivery) | [New Relic (RTLD CDN and RTLD Rate Limiting)](/guides/logs/rtld/new_relic_log_delivery)
    
-   Delete a profile by clicking the corresponding <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon. When prompted, confirm the deletion.
