---
title: Key Concepts
---

## CDN Operation {/*cdn-operation*/}

When using the Content Delivery service, incoming content requests are handled directly by the Content Delivery service running at the CDN edge of the Edgio CDN, rather than your origin, using a cache hierarchy customized to your content type and the location of your content origin.

Fresh content is retrieved from the origin only as needed, and is quickly cached as close as possible to your audience. The scale needed to service your audience is provided by the CDN edge, delivering content quickly over the last mile of the Internet, removing the issue of scaling your infrastructure to accommodate for peak traffic, enhancing the user experience while retaining your workflow logic and reducing the overall overhead placed on your digital content infrastructure.

## Cacheability   {/*cacheability*/}

Content Delivery determines object cacheability (whether an object should be cached) by examining the response headers and status codes received when the object is requested from your origin.

### Cache Control Headers {/*cache-control-headers*/}
Content Delivery normally requires at least one of the following "cache control" response headers before caching an object:

- `Expires`
- `Last-Modified`
- `Cache-Control`

Objects are generally not cacheable when an origin provides any of the following headers (see ignore_nocache below):

- `Cache-Control: private`
- `Cache-Control: no-cache`
    <Callout type="info">When determining cacheability, anything including and after = is stripped. For example. `Cache-Control: no-cache="set-cookie"` becomes `Cache-Control: no-cache`</Callout>

- `Cache-Control: no-store`
- `Pragma: no-cache`

See also: [Caching Dynamic Content](/delivery/delivery/guide/features/#caching-dynamic-content).

#### Response Codes  {/*response-codes*/}

For the following response codes, responses will generally be cacheable if they contain Date or Last-Modified headers, or expiry information (Cache-Control or Expires headers).

- 200 OK
- 203 Non-Authoritative Information
- 300 Multiple Choices
- 301 Moved Permanently
- 410 Gone

The following are cacheable under certain circumstances:

- 206 Partial Content
Cacheable only if Partial Caching is enabled
- 302 Moved Temporarily
Cacheable only if the origin sends Cache-Control headers defining expiry
Normally, Content Delivery does not cache responses with the following HTTP status codes:

- 204 No Content
- 305 Use Proxy
- 400 Bad Request
- 403 Forbidden
- 404 Not found
- 405 Method Not Allowed
- 414 Request-URI Too Large
- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout

In some cases, this behavior can be modified. For more information, see Content Acquisition, Origin Support and Origin Error Handling.

#### Authentication, Vary Headers & Cookies
Responses to content requests that require authentication (as defined by the presence of an Authorization header) are not cacheable by default; however, options are available to override this and provide cacheability for authenticated responses. If you need this feature, please contact Limelight Customer Service.

Responses with a Vary header are generally not cacheable unless the Accept-Encoding header is present and compression is applied by the configuration. Content Delivery can also be configured to ignore Vary headers. For more information, see Vary Header Optimization.

Even though Content Delivery caches cookie headers, they are stripped when serving objects from cache. Therefore, clients will only see cookie headers when an object they request results in a cache miss. This applies to both Set-Cookie and Set-Cookie2 headers.

### Vary Header Optimization {/*vary-header-optimization*/}
The HTTP Vary response header can be used to specify which HTTP request headers are used to determine the uniqueness of a cached object. For each variation in the values of the specified requests headers, a new version of the object must be requested from origin and stored in cache.

For example, Vary: User-Agent specifies that the value of the User-Agent request header should be used to determine uniqueness. This means that for each variation of the value of User-Agent, a different copy of the object will be requested from origin and stored in cache.

Obviously, the use of the Vary response header with request headers that have unrestricted values (such as Cookie, Referer and User-Agent) can significantly reduce CDN performance.

Because of this, Content Delivery ignores the Vary response header by default.

However, if you want to cache unique versions of content based on the Vary: Accept Encoding response header, you can configure Content Delivery to do so.

Specifically:

- If configured to ignore all Vary headers, the contents of theVaryheader will not determine cacheability
- If configured to ignore a list ofVaryheaders, those headers will be filtered out of theVaryheader sent from the origin. With the exception ofAccept-Encoding, if any headers remain, the content is marked as uncacheable
- If onlyVary: Accept-Encoding remains, each different encoding of an object is cached
Regardless of this setting, all of the Vary headers associated with the object are cached and passed on to the client in the response.

### Authentication, Vary Headers, and Cookies {/*authentication*/}

Responses to content requests that require authentication (as defined by the presence of an Authorization header) are not cacheable by default; however, options are available to override this and provide cacheability for authenticated responses. If you need this feature, please contact Edgio Customer Service.

Responses with a Vary header are generally not cacheable unless the *Accept-Encoding* header is present and compression is applied by the configuration. Content Delivery can also be configured to ignore Vary headers. For more information, see [Vary Header Optimization](#vary-header-optimization).

Even though Content Delivery caches cookie headers, they are stripped when serving objects from cache. Therefore, clients will only see cookie headers when an object they request results in a cache miss. This applies to both `Set-Cookie` and `Set-Cookie2` headers.

## Freshness Checks {/*freshness-checks*/}

Content Delivery automatically performs “freshness checks” on your cached content when stale content is requested and retrieves updates from your origin whenever content becomes “stale”. You have complete control over how often Content Delivery refreshes cached objects and under what conditions.

Each time it receives a request for an object, Content Delivery determines if the object is cacheable, and if so, whether it is currently in cache:

- If the object is not cacheable, Content Delivery requests it from your origin and delivers it to the requesting client.
- If the object is cacheable but not in cache, Content Delivery requests it from your origin, and then simultaneously caches and delivers it to the requesting client.
- If the object is in cache, Content Delivery performs a freshness check based on the cacheability of the object and the details of how it was cached. If the object is fresh, it is delivered directly from cache. Otherwise, it is requested from origin, and then simultaneously cached and delivered.

## Time To Live (TTL) {/*ttl*/}
Object freshness is managed using the concept of “Time To Live” (TTL) - how long an object may remain in cache before a freshness check. Content Delivery assigns a TTL to every object it caches, and then evaluates the TTL during each freshness check.

If an object’s TTL is found to be expired during a freshness check, Content Delivery asks your origin if there is a newer version of the object. Specifically, Content Delivery makes an HTTP request for the object and includes an `If-Modified-Since` (IMS) header with the date and time the object was last modified.

If your origin determines that the object has not been modified since the last freshness check, it responds with an `HTTP 304 Not Modified` status, and Content Delivery immediately delivers the cached object.

However, if the object has been modified, your origin responds with an HTTP `200 OK` response and the updated object. Content Delivery then simultaneously caches the object, updates its TTL, and delivers it to the requesting client.

If your origin did not provide a TTL-related response header when Content Delivery originally cached the object, and no special TTL-related options are configured in Content Delivery, TTL is re-calculated during each freshness check based on the HTTP `Last-Modified` header provided by your origin.

Generally speaking, the longer it has been since an object was modified on your origin, the less frequently it will be checked for freshness.

Specifically, Content Delivery calculates the TTL by determining the elapsed time since the object was modified and multiplying by a conversion ratio. The default conversion ratio is 20%, and there is also a default maximum freshness check interval of 72 hours.

Examples:

- During a freshness check, object “A” is determined to have been modified 5 hours ago. Multiplying 5 hours by 20% yields a TTL of 1 hour. This means that Content Delivery will not check the object for freshness during the next hour.
- During a freshness check, object “B” is determined to have been modified 500 hours ago. Multiplying 500 hours by 20% yields a TTL of 100 hours. However, this exceeds the maximum of 72 hours. This means that Content Delivery will not check the object for freshness during the next 72 hours.

<Callout type="info">By using certain Content Delivery features, you can adjust the conversion ratio and also specify the minimum and maximum freshness check intervals. For more information, see [TTL Management](/delivery/delivery/guide/key_concepts/#ttl-management).</Callout>
