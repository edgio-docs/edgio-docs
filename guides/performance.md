# Performance

This guide shows you how to monitor and improve the performance of your application running on the Moovweb XDN.

## Built-in timings

All responses contain an [x-xdn-t](/guides/response_headers#section_structure_of_) header that contains the time the request spent at each layer of the XDN stack.

## Tracking your own timings

You can use the `@xdn/core/timing` module to track how long it takes parts of your code to execute. A common case is
tracking how long it takes to fetch a result from an upstream API. For example:

```js
import Timing from '@xdn/core/timing'

const timing = new Timing('api').start()

try {
  const result = await fetch(API_URL)
} finally {
  timing.end() // this will result in a `x-xdn-user-t: api=(millis)` response header
}
```

- All timings are returned in an `x-xdn-user-t` response header.
- The value is a comma-delimited list of pairs of the form `(name)=(duration-in-millis)`.
- The value of this header will be logged into `xut` field in [access logs](/guides/logs#section_access_logs). The logged data is limited to 50 bytes after which it will be truncated.
- Any timings that are not ended before the response is sent will have a value of `na`

## Performance optimizations

### Turn off caching when not needed

For `GET` routes that you know you will or must not cache not cache, always explicitly disable caching. This indicates to the XDN that it should not try to coalesce requests which leads to improved performance especially on slower upstreams.

For example, if you know that nothing from your legacy upstream will or can ever be cached, do this:

```js
new Router().fallback(({ proxy, cache }) => {
  cache({
    edge: false,
  })
  proxy('legacy')
})
```
