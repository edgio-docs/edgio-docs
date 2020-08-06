# Migration

## v2

To upgrade your project to XDN v2, run `xdn use latest`. XDN v2 introduces the following breaking changes:

### Path syntax change

The syntax for capturing multiple path tokens has been changed from `*variable` to `:variable*`. The XDN now uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for route path matching, which is the same library used by express.

### Custom cache keys

The `key` property has been moved from `edge` to the root of the options object passed to `cache()`. So, for example:

```js
import { Router, CustomCacheKey } from '@xdn/core/router'

new Router().get('/', ({ cache }) => {
  cache({
    edge: {
      key: new CustomCacheKey().excludeAllQueryParameters(),
      maxAgeSeconds: 60 * 60,
    },
  })
})
```

becomes:

```js
import { Router, CustomCacheKey } from '@xdn/core/router'

new Router().get('/', ({ cache }) => {
  cache({
    key: new CustomCacheKey().excludeAllQueryParameters(),
    edge: {
      maxAgeSeconds: 60 * 60,
    },
  })
})
```

This reflects the fact that custom cache keys now take effect in the browser as well via the service-worker.

### createCustomCacheKey has been removed

After being deprecated for some time, `createCustomCacheKey` has been removed from `@xdn/core/router`. Use `new CustomCacheKey()` instead.
