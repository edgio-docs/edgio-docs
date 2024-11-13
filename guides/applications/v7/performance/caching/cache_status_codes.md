---
title: Cache Status Codes
---

Cache status codes reported for CDN activity are defined below.

## CONFIG_NOCACHE {/*config-nocache*/}

This status indicates that a customer-specific configuration on our edge servers prevented the asset from being cached.

For example, a rule may prevent an asset from being cached by enabling the [Bypass Cache feature](/applications/performance/rules/features#bypass-cache) for qualifying requests. 

## NONE {/*none*/}

This status indicates that a cache content freshness check was not performed. This check is skipped when Token Auth denies a request or when an HTTP request method is used that bypasses cache (e.g., `PUT`, `DELETE`, etc).

## TCP_CLIENT_REFRESH_MISS {/*tcp-client-refresh-miss*/}

This status is reported when an HTTP client (e.g., browser) forces an edge server to retrieve a new version of a stale asset from the origin server.

By default, our servers prevent an HTTP client from forcing our edge servers to retrieve a new version of the asset from the origin server. However, this behavior may be overridden by leveraging the [Honor No-Cache Request Header feature](/applications/performance/rules/features#honor-no-cache-request-header). 

## TCP_EXPIRED_HIT {/*tcp-expired-hit*/}

This status is reported when a request for an asset with an expired time to live (TTL), such as when the asset's `max-age` has expired, that was served directly from the POP to the client.

An expired request typically results in a revalidation request to the origin server. In order for a `TCP_EXPIRED_HIT` to occur, the origin server must indicate that a newer version of the asset does not exist. This type of situation will typically update that asset's `Cache-Control` and `Expires` headers.

## TCP_EXPIRED_MISS {/*tcp-expired-miss*/}

This status is reported when a newer version of an expired cached asset is served to the client. This occurs when the TTL for a cached asset has expired (e.g., expired `max-age`) and the origin server returns a newer version of that asset. This new version of the asset will be served to the client instead of the cached version. Additionally, it will be cached on the edge server and the client.

## TCP_HIT {/*tcp-hit*/}

This status is reported when a request is served directly from the POP to the client. An asset is immediately served from a POP when it is cached on the POP closest to the client and it has a valid TTL. 

Define TTL through [cache directives](/applications/performance/caching#cache-directives).

## TCP_MISS {/*tcp-miss*/}

This status indicates that a cached version of the requested asset was not found on the POP closest to the client. The asset will be requested from either an origin server or an Origin Shield server. If either the origin server or the Origin Shield server returns an asset, it will be served to the client and cached on both the client and the edge server. Otherwise, a non-`200` status code (e.g., `403 Forbidden`, `404 Not Found`, etc.) will be returned.

## TCP_PARTIAL_HIT {/*tcp-partial-hit*/}

This status indicates that an edge server found a partially cached asset for the requested content and served it to the client. Partially cached content is typically a result of:
-   **Byte Range Requests:** A client may request a specific portion of an asset through the `Range` request header. {{ PRODUCT }} can then cache the requested range and serve this partial asset for subsequent requests. 
-   [Partial Cache Sharing Min Hit Size Feature](/applications/performance/rules/features#partial-cache-sharing-min-hit-size)**:** This feature allows {{ PRODUCT }} to cache content as it receives the response. {{ PRODUCT }} may then serve this partially cached content for subsequent requests while the cache fill is in progress. 

## UNCACHEABLE {/*uncacheable*/}

This status indicates that the response contains [cache directives](/applications/performance/caching#cache-directives) that instruct our servers and the client that it should not be cached.