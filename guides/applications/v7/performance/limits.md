---
title: Limits
---

{{ PRODUCT }} sets limits on requests, responses, and access logs.

### Units {/*units*/}

Data storage units are defined below.

- `KB` stands for kilobytes and means 1,024 bytes (2^10 bytes)
- `MB` stands for megabytes and means 1,024 kilobytes (2^20 bytes)
- `GB` stands for gigabytes and means 1,024 megabytes (2^30 bytes)

### Request and Response Limits {/*request-and-response-limits*/}

{{ PRODUCT }} requires that all requests and responses meet the following requirements:

| Type                              | Limit      | Description                                                                                                                                                                                                                                                   |
| --------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response time from origin server  | 60 seconds | The maximum number of seconds that {{ PRODUCT }} will wait for a response from an origin server (e.g., your web server). Exceeding this limit results in a [536 Project HTTP Response Timeout](/applications/performance/response#status-codes#536) response. |
| Response body size                | 2GB        | The maximum size for the response body.                                                                                                                                                                                                                       |
| Cookie size                       | 32KB       | The maximum size for request or response cookies.                                                                                                                                                                                                             |
| Maximum number of nested requests | 3          | The term "nested" means that an {{ PRODUCT }} site is the upstream of itself or of another {{ PRODUCT }} site. Exceeding this limit results in a [538 Project Request Loop](/applications/performance/response#status-codes) response.                        |

### Cloud Functions Limits {/*cloud-functions-limits*/}

Limitations for {{ PRODUCT }} Cloud Functions are listed below. If your project was deployed using `@edgio/core` version 7.13.3 or lower, then [additional limitations](#7134) are applicable.

| Type                       | Limit      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ---------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Request body size          | 6MB        | The maximum size for the request body. Exceeding this limit results in a `413  Request Entity Too Large` response.                                                                                                                                                                                                                                                                                                                                                                                                         |
| Response body size         | 6MB        | The maximum size for the uncompressed response body. A cloud function is able to return either 6MB of raw string data or approximately 4.5MB of buffered/binary data due to base64 encoding overhead. However, {{ PRODUCT }} compresses responses using brotli, gzip or deflate. This allows {{ PRODUCT }} to provide a response to most modern clients whose total size exceeds this limit. Exceeding this limit results in a [532 Project Response Too Large](/applications/performance/response#status-codes) response. |
| Request headers size       | 8KB        | The maximum overall size for all headers defined within a request. The overall limit is lower with increasing number of headers. Exceeding this limit results in either a `431 Request Header Fields Too Large` or a `413 Request Entity Too Large` response.                                                                                                                                                                                                                                                              |
| Response headers size      | 80KB       | The maximum overall size for all headers defined within a response. The size of each individual header is limited to 32KB. Exceeding this limit results in a [542 Project Header Overflow](/applications/performance/response#status-codes) response.                                                                                                                                                                                                                                                                      |
| Response headers count     | Unlimited  | The maximum number of developer-controlled headers in the response is not limited. However, the total size for these headers must comply with the `Response headers size` limit.                                                                                                                                                                                                                                                                                                                                           |
| Path and query string size | 11KB       | The maximum total size for the path including query string. Exceeding this limit results in a `414 URI Too Long` response.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Timeout                    | 20 seconds | The number of seconds that {{ PRODUCT }} will wait for project code to process the request before timing out. Exceeding this limit results in a [539 Project Timeout](/applications/performance/response#status-codes) response.                                                                                                                                                                                                                                                                                           |
| Memory                     | 896MB      | **Free tier only:** The maximum memory allocated for your Cloud Functions project. Exceeding this limit results in a [540 {{ PRODUCT }} Out of Resources](/applications/performance/response#status-codes) response. {{ ACCOUNT_UPGRADE }}                                                                                                                                                                                                                                                                                 |
| Temporary storage          | 512MB      | The maximum available storage for the `/tmp` directory. The content stored in this directory does not persist between multiple requests.                                                                                                                                                                                                                                                                                                                                                                                   |

<a id="7134" />Additional {{ PRODUCT }} Cloud Functions limitations for projects deployed using `@edgio/core` version 7.13.3 or lower:

| Type                   | Limit      | Description                                                                                                                                                                                                                                          |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Request headers size   | 64Kb       | The maximum overall size for all headers defined within the request. Exceeding this limit results in a [542 Project Header Overflow](/applications/performance/response#status-codes) response.                                                      |
| Response headers size  | 64Kb       | The maximum overall size for all headers defined within the response. Exceeding this limit results in a [542 Project Header Overflow](/applications/performance/response#status-codes) response.                                                     |
| Response headers count | 70         | The maximum number of developer-controlled headers defined within the response. Exceeding this limit results in a [542 Project Header Overflow](/applications/performance/response#status-codes) response.                                           |
| Scheduling timeout     | 60 seconds | The maximum number of seconds that {{ PRODUCT }} will try to schedule the processing of a request before timing out. Exceeding this limit results in a [541 {{ PRODUCT }} Out of Workers](/applications/performance/response#status-codes) response. |

<!--
### Deployment Limits {/*deployment-limits*/}

{{ PRODUCT }} deployment limits are provided below.

| Type                                 | Limit                 | Description |
| ------------------------------------ | --------------------- | ----------- |
| Prerender concurrency                | 200                   |             |
| Total number of prerendered requests | 25,000 per deployment |             |
-->
#### Reserved Headers {/*prohibited-headers*/}

The following headers are served for use by {{ PRODUCT }}. You may not modify these request headers.

-   accept-ranges
-   age
-   connection
-   content-encoding
-   content-length
-   content-range
-   date
-   server
-   trailer
-   transfer-encoding
-   upgrade
-   vary
-   via
-   warning
-   All header names that start with `{{ HEADER_PREFIX }}` and `x-ec` are reserved.

### RTLD Log Data {/*rtld-log-data*/}

[RTLD](/applications/logs/rtld) limitations are described below.

| Value | Limit     | Description                                                                                                                                                                                                       |
| ----- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time  | 3 days    | If our service is unable to deliver log data, then we will store it for up to 3 days and deliver it when communication resumes. If we cannot deliver log data within 3 days, then it will be permanently deleted. |
| Size  | Unlimited |                                                                                                                                                                                                                   |
