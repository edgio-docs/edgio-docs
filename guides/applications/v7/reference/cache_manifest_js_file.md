---
title: Cache-Manifest.js File
---

The `cache-manifest.js` file is generated during deployment. It is used to automatically prefetch all links based on configured rules. This file is publicly available from the `/__edgio__/cache-manifest.js` path.

It exposes rules with the following features:
- [`caching.max_age`](/applications/performance/rules/features#set-max-age)
- [`caching.service_worker_max_age`](/applications/performance/rules/features#set-service-worker-max-age)
- [`caching.bypass_cache`](/applications/performance/rules/features#bypass-cache)
- [`caching.bypass_client_cache`](/applications/performance/rules/features#bypass-client-cache)

and conditions:
- [`request.path`](/applications/performance/rules/conditions#path)
- [`request.method`](/applications/performance/rules/conditions#method)
- [`request.scheme`](/applications/performance/rules/conditions#scheme)
- [`request.query`](/applications/performance/rules/conditions#query)
- [`request.querystring`](/applications/performance/rules/conditions#query-string)
- [`request.origin_query_string`](/applications/performance/rules/conditions#origin-query-string)
- [`request.origin_query`](/applications/performance/rules/conditions#query-parameter)
- [`request.origin_path`](/applications/performance/rules/conditions#origin-path)

All other features and conditions are unsupported and will be ignored. Exclude a rule from this file by adding a `cache-manifest-ignore` comment to it.

**Example:**

```js filename="routes.js"
import { Router } from '{{ PACKAGE_NAME }}/core/router'

export default new Router()
    // This rule will not be listed in the cache-manifest.js file
    .get("/static/my-image.png", {
        caching: {
            max_age: "1h", // Caches the response on the edge for 1 hour
        },
        comment: "cache-manifest-ignore"
    })
```
