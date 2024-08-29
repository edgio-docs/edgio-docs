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

| Type                                                 | Limit                 | Description                                                                                                                                                                                                                                                                |
|------------------------------------------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Response time from origin server                     | 60 seconds            | The maximum number of seconds that {{ PRODUCT }} will wait for a response from an origin server (e.g., your web server). The response for a request that exceeds this limit is a [536 Project HTTP Response Timeout](/applications/performance/response#status-codes#536). |
| Response body size from static                       | 2GB                   | The maximum size of a response body of {{ PRODUCT }} static assets.                                                                                                                                                                                                        |
| Response body size from custom origin                | 2GB                   | The maximum size of a response body from a custom origin.                                                                                                                                                                                                                  |
| Cookie size                                          | 32KB                  | The maximum bytes that {{ PRODUCT }} will accept in request or response cookies.                                                                                                                                                                                           |
| Maximum number of nested requests                    | 3                     | "Nested" means an {{ PRODUCT }} site is the upstream of itself or of another {{ PRODUCT }} site. Exceeding this will result in 538 [status code](/applications/performance/response#status-codes).                                                                         |

### Cloud function Limits {/*cloud-function-limits*/}

The below limits apply to all {{ PRODUCT }} cloud functions:

| <div style={{ minWidth: '10em' }}>Type</div> | Limit      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|----------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Request body size                            | 6MB        | The maximum size of a request body that is accepted by {{ PRODUCT }} cloud function. Exceeding this limit will result in 413 status code.                                                                                                                                                                                                                                                                                                                                                                                                           |
| Response body size                           | 6MB        | The maximum size of a response body from the {{ PRODUCT }} cloud function uncompressed. The cloud function is able to return either 6MB of raw string data or approximately 4.5MB of buffered/binary data due to base64 encoding overhead. However, Edgio compresses (using brotli, gzip or deflate) responses from the cloud function, which allows you to return response with total size over this limit for most of the modern clients. Exceeding this limit will result in 532 [status code](/applications/performance/response#status-codes). |
| Request headers size                         | 8KB        | The maximum overall size of all requests headers that is accepted by {{ PRODUCT }} cloud function. The overall limit is lower with increasing number of headers. Exceeding this will result in 431 or 413 status code depending on size.                                                                                                                                                                                                                                                                                                            |
| Response headers size                        | 80KB       | The maximum overall size of all response headers that {{ PRODUCT }} will accept. The size of each individual header is limited to 32KB. Exceeding this will result in 542 [status code](/applications/performance/response#status-codes)                                                                                                                                                                                                                                                                                                            |
| Response headers count                       | Unlimited  | The maximum number of developer-controlled headers in the {{ PRODUCT}} cloud function's response is not limited. However, all headers need to fit into total `Response headers size` limit.                                                                                                                                                                                                                                                                                                                                                         |
| Path and query string size                   | 11KB       | The maximum total size of path + query string that {{ PRODUCT }} cloud function will accept. Exceeding this limit will result in 414 status code.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Timeout                                      | 20 seconds | The number of seconds {{ PRODUCT }} will wait for project code to process the request before timing out. Exceeding this will result in 539 [status code](/applications/performance/response#status-codes).                                                                                                                                                                                                                                                                                                                                          |
| Memory                                       | 896MB      | The maximum memory allocated for your cloud function project in Free Tier. Exceeding this this memory limit will result in 540 [status code](/applications/performance/response#status-codes). Contact your account manager or our [sales department](https://edg.io/contact-us/) if you wish to increase this limit.                                                                                                                                                                                                                               |
| Temporal storage                             | 512MB      | The guaranteed available temporal storage for your cloud function project inside `/tmp` directory. The content inside this storage isn't preserved between multiple requests.                                                                                                                                                                                                                                                                                                                                                                       |

The following additional limits are applied to {{ PRODUCT }} cloud functions with @edgio/core prior to version 7.12.0:
| <div style={{ minWidth: '10em' }}>Type</div> | Limit      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|----------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Request headers size                                      | 64Kb                  | The maximum overall size of all requests headers that is accepted by {{ PRODUCT }} cloud function. Exceeding this will result in 542 [status code](/applications/performance/response#status-codes).                                                                                          |
| Response headers size                                     | 64Kb                  | The maximum overall size of all response headers that Edgio will accept. Exceeding this will result in 542 [status code](/applications/performance/response#status-codes).                                                                                          |
| Response headers count                                    | 70                    | The maximum number of developer-controlled headers {{ PRODUCT }} will accept in HTTP request or response. Exceeding this will result in 542 [status code](/applications/performance/response#status-codes). |
| Scheduling timeout                                        | 60 seconds            | The number of seconds {{ PRODUCT }} will try to schedule a request processing before timing out. Exceeding this will result in 541 [status code](/applications/performance/response#status-codes).          |

### Deployment Limits {/*deployment-limits*/}

The below limits are applied to all {{ PRODUCT }} deployments:
| Type                                                 | Limit                 | Description                                                                                                                                                                                                                                                                |
|------------------------------------------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Prerender concurrency                                | 200                   |
| Total number of prerendered requests                 | 25,000 per deployment |

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
