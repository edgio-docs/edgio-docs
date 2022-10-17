---
title: Performance
---

This guide shows you how to monitor and improve the performance of your application running on {{ PRODUCT_NAME }}.

## Built-in Timings {/*built-in-timings*/}

All responses contain an [{{ HEADER_PREFIX }}-t](/guides/response_headers#x-0-t-response-header) header that contains the time the request spent at each layer of the {{ PRODUCT_NAME }} stack.

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
- The value of this header will be logged into `xut` field in [access logs](/guides/logs#access-logs). The logged data is limited to 50 bytes after which it will be truncated.
- Any timings that are not ended before the response is sent will have a value of `na`

## Performance Optimizations {/*performance-optimizations*/}

### Turn off Caching When not Needed {/*turn-off-caching-when-not-needed*/}

For `GET` routes that you know you will not or must not cache, always explicitly disable caching. This indicates to {{ PRODUCT_NAME }} that it should not try to coalesce requests which leads to improved performance especially on slower upstreams.

For example, if you know that nothing from your legacy upstream will or can ever be cached, do this:

```js
new Router().fallback(({ proxy, cache }) => {
  cache({
    edge: false,
  })
  proxy('legacy')
})
```
