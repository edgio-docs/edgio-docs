# Limits

This guide describes limits of {{ PRODUCT_NAME }} platform as applied to all projects running on it.

## Legend

- `Kb` stands for kilobytes and means 1,024 bytes (2^10 bytes)
- `Mb` stands for megabytes and means 1,024 kilobytes (2^20 bytes)
- `Gb` stands for gigabytes and means 1,024 megabytes (2^30 bytes)

## Request and Response Limits

| Value                                                 | Limit                 | Description                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response body size from static                        | 2Gb                   | The maximum size of a response body of {{ PRODUCT_NAME }} static assets.                                                                                                              |
| Response body size from custom origin                 | 2Gb                   | The maximum size of a response body from a custom origin.                                                                                                                             |
| Response body size from {{ PRODUCT_NAME }} serverless | 6Mb                   | The maximum size of a response body from {{ PRODUCT_NAME }} serverless.                                                                                                               |
| Path and query string size                            | 8Kb                   | The maximum bytes (not characters) that {{ PRODUCT_NAME }} will accept in path and query string.                                                                                      |
| Cookie size                                           | 32Kb                  | The maximum bytes that {{ PRODUCT_NAME }} will accept in request or response cookies.                                                                                                 |
| HTTP header size                                      | 64Kb                  | The maximum bytes that {{ PRODUCT_NAME }} will accept in request or response HTTP headers.                                                                                            |
| HTTP header count                                     | 70                    | The maximum number of developer-controlled headers {{ PRODUCT_NAME }} will accept in HTTP request or response. Exceeding this will result in 542 [status code](/guides/status_codes). |
| Scheduling timeout                                    | 60 seconds            | The number of seconds {{ PRODUCT_NAME }} will try to schedule a request processing before timing out. Exceeding this will result in 541 [status code](/guides/status_codes).          |
| Worker timeout                                        | 20 seconds            | The number of seconds {{ PRODUCT_NAME }} will wait for project code to process the request before timing out. Exceeding this will result in 539 [status code](/guides/status_codes).  |
| Prerender concurrency                                 | 200                   |
| Total number of prerendered requests                  | 25,000 per deployment |

## Access Logs

| Value | Limit     | Description                                                                                         |
| ----- | --------- | --------------------------------------------------------------------------------------------------- |
| Size  | Unlimited | All access logs will always be [logged](/guides/logs#section_access_logs).                          |
| Time  | 2 hours   | The minimum time that {{ PRODUCT_NAME }} guarantees that access logs will be available for reading. |
