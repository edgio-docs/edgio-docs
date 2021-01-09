# Status Codes

[HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are how the web signals errors and other states from the server to the web browser. If there is an error from your backend website, the error is simply forwarded by the XDN to the browser.

## Moovweb XDN exclusive status codes

If the error is generated in the XDN itself, the platform generates a 53x or 54x HTTP status code:

| CODE | NAME | DESCRIPTION |
| -- | -- | -- |
| 412 | Precondition Failed | This code is returned when query string parameter `xdn_prefetch` equals `1` and the result is not found in the edge cache. |
| 530 | Internal XDN Error | Unexpected error in the Moovweb XDN. Please contact [support](https://help.moovweb.com). |
| 531 | Project Upstream Timeout | Your project timed out while waiting for an upstream response. |
| 532 | Project Response Too Large | Your project returned a response size greater than the allowed 6MB. |
| 533 | Reserved | Not used by Moovweb XDN at this time. |
| 534 | Project Unexpected Error | Your project's serverless code has failed unexpectedly. Use [server logs](/guides/logs#section_server_logs) to debug. |
| 535 | Unknown Project | The HTTP header `host` is missing or does not match any Moovweb XDN deployment. Check your requesting URL and your project config. |
| 536 | Reserved | Not used by Moovweb XDN at this time. |
| 537 | Reserved | Not used by Moovweb XDN at this time. |
| 538 | Project Request Loop | The XDN project exceeded the maximum level (4) of nested Moovweb XDN requests. “Nested” means an XDN site is the upstream of itself or of another XDN site. |
| 539 | Project Timeout | Your project's serverless code did not respond on time, either due to slow upstreams or to badly handled asynchronous requests in code (e.g. missing `await` or call to `callback`). Use [server logs](/guides/logs#section_server_logs) and [performance profiling](/guides/performance) to debug. |
| 540 | Reserved | Reserved for experimental limits and features. Please contact [support](https://help.moovweb.com). |
| 541 | XDN Out of Workers | The traffic was so high that request could not be scheduled for processing within the scheduling timeout. Please contact [support](/guides/support) to upgrade your account. |
| 542 | Project Header Overflow | The XDN project's request or response had too many HTTP headers. See [limits](/guides/limits) |

Obviously, your project can set status codes of their own, which may sometimes match codes above. We encourage you to avoid that to lower the troubleshooting overhead and other issues.

## Standard status codes used by XDN itself

Moovweb XDN also issues these standard response codes:

| 400 | Bad Request | The URL is too long or the request headers are too large. See [limits](limits) |
| 404 | Not Found | The request did not match any route that would send a response and there is no fallback. See [routing](routing) |
| 412 | Precondition Failed | The query string parameter `xdn_prefetch` equals `1` and the result is not found in the edge cache. |
| 503 | Service Unavailable | Your project's upstream was unavailable. See [routing](routing) |
