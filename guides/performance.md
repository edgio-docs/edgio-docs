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
- The total length of this header is limited to 50 bytes. Anything over 50 bytes will be truncated.
- Any timings that are not ended before the response is sent will have a value of "na"
