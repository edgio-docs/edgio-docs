---
title: Real-Time Log Delivery (RTLD)
---

Real-Time Log Delivery (RTLD) delivers log data in near real-time to a variety of destinations. It consists of the following modules, which are:

| Module               | Description                                                                                                                                                                                                               | Requirements                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| RTLD CDN             | Delivers log data that describes requests submitted to the {{ PRODUCT }} network. This data includes [Edge Functions](/applications/edge_functions) requests.                                                              | Purchased Separately                                    |
| RTLD WAF             | Delivers log data that describes requests identified as threats by [Web Application Firewall (WAF)](/applications/security/waf). <br />It excludes log data for threats identified by Rate Rules or Bot Manager.          | {{ PRODUCT_SECURITY }} Premier, Business, or Essentials |
| RTLD Rate Limiting   | Delivers log data that describes requests for which {{ PRODUCT }} enforced a rate limit as defined through a [rate rule](/applications/security/rate_rules).                                                              | {{ PRODUCT_SECURITY }} Premier, Business, or Essentials |
| RTLD Bot             | Delivers log data that describes requests for which [Bot Manager](/applications/security/bot_rules) identified as bot traffic.                                                                                            | Bot Manager                                             |
| RTLD Cloud Functions | Delivers log data that describes requests processed by [Cloud Functions](/applications/performance/serverless_compute). This data includes [{{ PRODUCT }} {{PRODUCT_PLATFORM}}](/applications/sites_frameworks) requests. | Cloud Functions                                         |

<Callout type="info">

  {{ ACCOUNT_UPGRADE }}

</Callout>

RTLD delivers compressed log data to one or more of the following destination(s):

-   Your [web server](/applications/logs/rtld/web_server_log_delivery).
-   An [AWS S3 bucket](/applications/logs/rtld/aws_s3_log_delivery).
-   An [Azure Block Blob](/applications/logs/rtld/azure_blob_storage_log_delivery).
-   [Datadog](/applications/logs/rtld/datadog_log_delivery).
-   A [Google Cloud Storage bucket](/applications/logs/rtld/google_cloud_storage_log_delivery).
-   [New Relic (RTLD CDN and RTLD Rate Limiting)](/applications/logs/rtld/new_relic_log_delivery).
-   [Splunk Enterprise](/applications/logs/rtld/splunk_enterprise_log_delivery).
-   [Sumo Logic](/applications/logs/rtld/sumo_logic_log_delivery).

![RTLD Workflow](/images/v7/logs/rtld-workflow.png)

Log data consists a set of log entries. Each entry describes either:

-   **RTLD CDN:** A HTTP/HTTPS request that was directed to the {{ PRODUCT }} network.
-   **RTLD WAF:** A HTTP/HTTPS request that was identified as a threat by WAF and information on why it was deemed a threat.
-   **RTLD Rate Limiting:** A HTTP/HTTPS request that exceeded a rate limit enforced by a Security Application configuration.
-   **RTLD Bot:** A HTTP/HTTPS request that was identified as originating from a bot.
-   **RTLD Cloud Functions:** A HTTP/HTTPS request that was processed by Cloud Functions.

<Callout type="info">

  If our service is unable to deliver log data, then we will store it for up to 3 days and deliver it when communication resumes. If we cannot deliver log data within 3 days, then it will be permanently deleted.

</Callout>

## Quick Start {/*quick-start*/}

Setting up log delivery consists of the following steps:

1.  Decide on and prepare the service or web server(s) to which log data will be delivered.
2.  If required, gather authentication information for the above destination.
3.  Create a log delivery profile for the above destination.

<Callout type="info">

  Configure RTLD from within the {{ PORTAL }}. Log data will be delivered regardless of whether you are using Rules or CDN-as-code.

</Callout>

## Log Delivery Profiles {/*log-delivery-profiles*/}

A log delivery profile identifies:

-   Where log data will be delivered.
-   The amount of data that will be delivered.
-   Whether log data will be filtered prior to delivery.
-   The set of log fields that will be delivered.

### Multiple Profiles {/*multiple-profiles*/}

You may create multiple profiles. This allows you to:

-   Send log data to one or more destinations. This is useful for disaster recovery.
-   Segregate log data by type within a single destination.
-   Gather more detailed data as needed.

**Key information:**

-   Perform profile administration from the Real-Time Log Delivery CDN or WAF landing page.

-   Log fields vary by RTLD module.

    Learn more about log fields: [RTLD CDN](/applications/logs/rtld/log_fields_rtld_cdn) | [RTLD WAF](/applications/logs/rtld/log_fields_rtld_waf) | [RTLD Rate Limiting](/applications/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD Bot](/applications/logs/rtld/log_fields_rtld_bot_manager) | [RTLD Cloud Functions](/applications/logs/rtld/log_fields_rtld_cloud_functions)

-   Log data will only be delivered when a profile's status is enabled.
-   The procedure for creating and modifying profiles varies by the destination to which log files will be delivered. Learn more about delivering to:

    [Your web server(s)](/applications/logs/rtld/web_server_log_delivery) | [An AWS S3 Bucket](/applications/logs/rtld/aws_s3_log_delivery)| [An Azure Block Blob container](/applications/logs/rtld/azure_blob_storage_log_delivery) | [Splunk Enterprise](/applications/logs/rtld/splunk_enterprise_log_delivery) | [Sumo Logic](/applications/logs/rtld/sumo_logic_log_delivery) | [Datadog](/applications/logs/rtld/datadog_log_delivery) | [Google Cloud Storage](/applications/logs/rtld/google_cloud_storage_log_delivery) | [New Relic (RTLD CDN and RTLD Rate Limiting)](/applications/logs/rtld/new_relic_log_delivery)

-   Delete a profile by clicking the corresponding <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon. When prompted, confirm the deletion.
