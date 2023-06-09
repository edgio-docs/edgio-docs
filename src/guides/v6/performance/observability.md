---
title: Observability
---

Use Observability to monitor the performance of an application running on {{ PRODUCT }}. Key tools and methods for tracking performance are described below.
-   Use our Real User Monitoring (RUM) library ({{ PACKAGE_NAME }}/rum) to track [Core Web Vitals](/guides/performance/observability/core_web_vitals) and identify areas for improvement. 
-   Use our [DevTools](/guides/performance/observability/devtools) to monitor the impact of your caching and predictive prefetching configurations on your site in real time. This allows use to identify and remediate issues.
-   Analyze the performance for specific requests through the [{{ HEADER_PREFIX }}-t](/guides/performance/response#-t-response-header). This response header contains the time the request spent at each layer of the {{ PRODUCT }} stack.
-   Track code execution time through our `{{ PACKAGE_NAME }}/core/timing` module.

## Tracking your Own Timings {/*tracking-your-own-timings*/}

You can use the `{{ PACKAGE_NAME }}/core/timing` module to track how long it takes parts of your code to execute. A common case is
tracking how long it takes to fetch a result from an upstream API. For example:

```js
import Timing from '{{ PACKAGE_NAME }}/core/timing'

const timing = new Timing('api').start()

try {
  const result = await fetch(API_URL)
} finally {
  timing.end() // this will result in a `{{ HEADER_PREFIX }}-user-t: api=(millis)` response header
}
```

- All timings are returned in an `{{ HEADER_PREFIX }}-user-t` response header.
- The value is a comma-delimited list of pairs of the form `(name)=(duration-in-millis)`.
- The value of this header will be logged into `xut` field in [access logs](/guides/develop/logs#access-logs). The logged data is limited to 50 bytes after which it will be truncated.
- Any timings that are not ended before the response is sent will have a value of `na`
