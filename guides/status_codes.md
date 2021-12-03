# Status Codes

[HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are how the web signals errors and other states from the server to the web browser. If there is an error from your backend website, the error is simply forwarded by {{ PRODUCT_NAME }} to the browser.

## {{ PRODUCT_NAME }} exclusive status codes

If the error is generated in {{ PRODUCT_NAME }} itself, the platform generates a 53x or 54x HTTP status code:

| CODE | NAME | DESCRIPTION |
| --- | --- | --- |
| 530 | Internal {{ PRODUCT_NAME }} Error | Unexpected error in {{ PRODUCT_NAME }}. Please contact [support]({{ HELP_URL }}) immediately. |
| 531 | Project Upstream Timeout | Your project timed out while waiting for an upstream response. |
| 532 | Project Response Too Large | Your project returned a response size greater than the allowed 6MB. |
| 533 | Reserved | Not used by {{ PRODUCT_NAME }} at this time. |
| 534 | Project Unexpected Error | Your project's serverless code has failed unexpectedly. Use [server logs](/guides/logs#section_server_logs) to debug. |
| 535 | Unknown Project | The HTTP header `host` is missing or does not match any {{ PRODUCT_NAME }} deployment. Check your requesting URL and your project config. |
| 536 | Reserved | Not used by {{ PRODUCT_NAME }} at this time. |
| 537 | DNS Resolution Error | Failed to resolve the host name through DNS, which might indicate a problem with your DNS provider or incorrectly configured domain name. |
| 538 | Project Request Loop | The {{ PRODUCT_NAME }} project exceeded the maximum level (4) of nested {{ PRODUCT_NAME }} requests. “Nested” means an {{ PRODUCT_NAME }} site is the upstream of itself or of another {{ PRODUCT_NAME }} site. |
| 539 | Project Timeout | Your project's serverless code did not respond on time, either due to slow upstreams or to badly handled asynchronous requests in code (e.g. missing `await` or call to `callback`). Use [server logs](/guides/logs#section_server_logs) and [performance profiling](/guides/performance) to debug. |
| 540 | Out of Memory | Your project's serverless code caused an out-of-memory situation. Use [server logs](/guides/logs#section_server_logs) to debug and lower the memory use. |
| 541 | {{ PRODUCT_NAME }} Out of Workers | The traffic was so high that the request could not be scheduled for processing within the scheduling timeout. Please contact [support](/guides/support) to upgrade your account. |
| 542 | Project Header Overflow | The {{ PRODUCT_NAME }} project's request or response had too many HTTP headers. See [limits](/guides/limits) |
| 543 | Global Upstream Timeout | The request failed to propagate between {{ PRODUCT_NAME }} edge and the global POP. Please contact [support]({{ HELP_URL }}). |
| 544 | Reserved | Not used by {{ PRODUCT_NAME }} at this time. |
| 545 | {{ PRODUCT_NAME }} Component Not Ready | An unprepared {{ PRODUCT_NAME }} component received traffic. Please contact [support]({{ HELP_URL }}) immediately. |

Obviously, your project can set status codes of their own, which may sometimes match codes above. We encourage you to avoid setting your own status code so as to lower troubleshooting overhead and other issues.

## Standard status codes used by {{ PRODUCT_NAME }} itself

{{ PRODUCT_NAME }} also issues these standard response codes:

| CODE | NAME | DESCRIPTION |
| --- | --- | --- |
| 400 | Bad Request | The URL is too long or the request headers are too large. See [limits](limits) |
| 404 | Not Found | The server cannot find the requested resource. This usually occurs when the browser requests a page that your app does not have. A 404 will also occur when a request does not match any of the routes in your {{ PRODUCT_NAME }} router. See [routing](routing) for more information. |
| 412 | Precondition Failed | This code is returned when the query string parameter `{{ COOKIE_PREFIX }}_prefetch` equals `1` and the content was not found in the edge cache. |
