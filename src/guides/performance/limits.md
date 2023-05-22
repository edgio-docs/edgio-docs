---
title: Limits
---

{{ PRODUCT }} sets limits on requests, responses, and access logs.

### Units {/*units*/}

Data storage units are defined below.

- `Kb` stands for kilobytes and means 1,024 bytes (2^10 bytes)
- `Mb` stands for megabytes and means 1,024 kilobytes (2^20 bytes)
- `Gb` stands for gigabytes and means 1,024 megabytes (2^30 bytes)

### Request and Response Limits {/*request-and-response-limits*/}

{{ PRODUCT }} requires that all requests and responses meet the following requirements:

| Type                                                  | Limit                 | Description                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response time from origin server                      | 60 seconds            | The maximum number of seconds that {{ PRODUCT }} will wait for a response from an origin server (e.g., your web server). The response for a request that exceeds this limit is a [536 Project HTTP Response Timeout](/guides/performance/response#status-codes#536). |
| Response body size from static                        | 2Gb                   | The maximum size of a response body of {{ PRODUCT }} static assets.                                                                                                              |
| Response body size from custom origin                 | 2Gb                   | The maximum size of a response body from a custom origin.                                                                                                                             |
| Response body size from {{ PRODUCT }} serverless | 6Mb                   | The maximum size of a response body from {{ PRODUCT }} serverless.                                                                                                               |
| Path and query string size                            | 8Kb                   | The maximum bytes (not characters) that {{ PRODUCT }} will accept in path and query string.                                                                                      |
| Cookie size                                           | 32Kb                  | The maximum bytes that {{ PRODUCT }} will accept in request or response cookies.                                                                                                 |
| HTTP header size                                      | 64Kb                  | The maximum bytes that {{ PRODUCT }} will accept in request or response HTTP headers.                                                                                            |
| HTTP header count                                     | 70                    | The maximum number of developer-controlled headers {{ PRODUCT }} will accept in HTTP request or response. Exceeding this will result in 542 [status code](/guides/performance/response#status-codes). |
| Scheduling timeout                                    | 60 seconds            | The number of seconds {{ PRODUCT }} will try to schedule a request processing before timing out. Exceeding this will result in 541 [status code](/guides/performance/response#status-codes).          |
| Worker timeout                                        | 20 seconds            | The number of seconds {{ PRODUCT }} will wait for project code to process the request before timing out. Exceeding this will result in 539 [status code](/guides/performance/response#status-codes).  |
| Prerender concurrency                                 | 200                   |
| Total number of prerendered requests                  | 25,000 per deployment |
| Maximum number of nested requests                     | 3                     | "Nested" means an {{ PRODUCT }} site is the upstream of itself or of another {{ PRODUCT }} site. Exceeding this will result in 538 [status code](/guides/performance/response#status-codes).     |

#### Reserved Headers {/*prohibited-headers*/}

The following headers are served for use by {{ PRODUCT }}. You may not modify these request headers. 

<Condition version="7">
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
</Condition>
<Condition version="<=6">
* `{{ HEADER_PREFIX }}-platform`
* `{{ HEADER_PREFIX }}-version`
* `{{ HEADER_PREFIX }}-t`
* `{{ HEADER_PREFIX }}-components`
* `{{ HEADER_PREFIX }}-status`
* `host`
* `x-request-id`
* `content-length`
* `via`
</Condition>

### Access Logs {/*access-logs*/}

| Value | Limit     | Description                                                                                         |
| ----- | --------- | --------------------------------------------------------------------------------------------------- |
| Size  | Unlimited | All access logs will always be [logged](/guides/logs/access_logs).                          |
| Time  | 2 hours   | The minimum time that {{ PRODUCT }} guarantees that access logs will be available for reading. |
