---
title: Key Features
---

[Content Acquisition](#content-acquisition)

[Customization](#customization)

[Content Protection](#content-protection)

[Defensive Protection](#defensive-protection)

[Acceleration](#acceleration)

The Content Delivery service provides a rich set of features (configuration options) that give you complete control over how your content is requested, cached and delivered.

The most popular configuration options are categorized and described in detail in this section, with references to additional technical documentation when available. If you’re unsure whether you need certain options, or which settings to select, please contact your Account Manager or Solutions Engineer.

<Callout type="info">Some features must be purchased separately or specifically enabled by Edgio before they become available. Please contact your Account Manager or Edgio Customer Service if you have questions about the availability of specific features.
You can change many configuration options yourself, using the Configuration Self Service feature in Control. To access Configuration Self Service, choose the Configure tab in Control and select the service you want to configure.</Callout>

<Callout type="info">Some advanced options can only be configured by Edgio. If such options are configured, they will become visible in “read only” mode in Configuration Self Service.</Callout>
For more information on individual options and settings, please see the [Configure](/delivery/control/configure) section of the [Control User Guide](/delivery/control/).

## Content Acquisition  {/*content-acquisition*/}
### Origin Support and Origin Error Handling  {/*origin-support*/}

The Content Delivery service is designed to provide a caching service for digital files and content, delivering that content to end users requesting it from the Edgio CDN edge, not from the origin server where the content is stored. Distributing the delivery of the content away from the content origin provides the scalability and availability needed to deliver your content at scale, globally.

A content origin can be 1. a Edgio Origin Storage account, 2. a storage service hosted outside the Edgio infrastructure using a third-party storage service, or 3. a dedicated storage infrastructure hosted by you, within your data center facility.

Content Delivery includes a number of configuration options that specify how to acquire content from the content origin and what to do if the origin returns an error (or fails to respond at all).

#### Published and Origin Hostname URL pairs  {/*published-and-origin-hostname-url-pairs*/}

Every Published URL (a URL you publish to your audience) is mapped to an Origin URL (used by Content Delivery to request the content from your origin).

For example, suppose that your Published Hostname is `www.mydomain.com`, and your Origin Hostname is `origin.mydomain.com`. If you publish all the images in the `directory /images`, the URL pair would be

- Published URL: `http://www.mydomain.com/images/`
- Origin URL: `http://origin.mydomain.com/images/`

When Content Delivery receives a request for a Published URL, it “rewrites” the Published URL to form the Origin URL, and then uses the Origin URL to retrieve the associated content from cache, or from your origin if necessary.

#### Host Header Value (Host Header Override)  {/*host-header-value*/}
Specifies the hostname that will be provided in the HTTP Host Header when Content Delivery makes requests to your origin.

- This option is useful where the Origin Hostname is not a CNAME target for the Published Hostname, but the origin still expects to find the Published Hostname in the Host Header.
- Using the Host Header Override option changes only the HTTP Host Header value. Content Delivery will continue to use the Origin Hostname when making requests (DNS Lookups and TCP connections) to your origin, and the URL path of the content requested by the client will be unchanged.

<Callout type="info">Cache Keys are based on the Origin Host (not the Published Host ) of cached objects and contain the following:</Callout>

- protocol scheme (HTTP or HTTPS)
- domain (Origin Host )
- path
- HTTP method that caused the object to be cached
- optional custom values appended to the end of the key

All or part of an URL’s query terms can optionally be excluded from the key (see [Flexible Cache Key Manipulation](#flexible-cache-key-manipulation)).

#### Backup Origin Support  {/*backup-origin-support*/}
Specifies a backup origin to connect to, in the event that a request to the content origin specified by the Origin Hostname fails, with an HTTP 503 or 504 response code.

#### 301 & 302 Status Code Handling (Edge Redirection)  {/*301-302*/}
Content Delivery can redirect requests at the CDN edge, reducing response time by eliminating the need for origin-based redirects. Edge redirects can be triggered by requests for specific URLs and URL patterns and also by requests that contain specific headers.

- *URL-Based Redirection*: If a requested URL matches a specified URL or URL pattern, Content Delivery can return a `301 Moved Permanently` or `302 Moved Temporarily` HTTP Status Code in the response, with a `Location` header that contains a URL of your choosing. This URL may redirect the client to an object in cache, another Published URL, or the content origin.
- Request Header-Based Redirection: If a request contains a specified header, Content Delivery can return a `301 Moved Permanently` or `302 Moved Temporarily` HTTP Status Code in the response, with a `Location` header that contains a rewritten Published URL. When rewriting the Published URL, Content Delivery replaces the original hostname with a specified hostname.

#### Enhanced 302 Status Code Handling (Chase Redirect)  {/*302*/}
Content Delivery has the capability to "chase" (i.e., follow) the Location header returned with a `302 Moved Temporarily` HTTP status code from the origin, instead of returning it to the client. In this case, the status code returned to the client will be whatever is returned by the chase attempt.

#### 400, 403, & 404 Status Code Handling  {/*400-403-404*/}
When Content Delivery has an expired object in cache and receives a `400 Bad Request`, `403 Forbidden`, or `404 Not Found` HTTP status code on an ensuing refresh check, its default behavior is to remove the object from cache. Content Delivery can be configured to leave the object in cache instead. Stale content may be served as a result. This also removes negative caching, which may result in a performance hit.

#### 404 Status Code Handling  {/*404*/}
- *Request content from an alternate location*: If a response with a `404 Not Found` HTTP status code is received from the content origin, Content Delivery can request the same content from the “backup” host specified in an alternate hostname or from the "backup" origin specified by an alternate origin URL (instead of returning the error code to the client).

- *Object not available URL*: If a response with a `404` HTTP status code is received from the content origin, Content Delivery can return content from a secondary, or “fallback”, URL (instead of returning the error code). This makes it easy to specify a single “content not found” landing page.

- *Serve stale content*: If Content Delivery receives a response with a `404` HTTP status code from the content origin but there is cached content for the requested URL (that is, a refresh check is needed), Content Delivery can return the stale content instead of a response with the `404` status code.

- *Treat responses with 200 HTTP status code without a body as a response with `404` HTTP status code*: If a response with a200 OK HTTP status code is received from the content origin, but the response body is “empty” (contains no content), Content Delivery can be configured to return the `404` Not Found HTTP status code instead of serving the object.

#### 503 & 504 Status Code Handling  {/*503-504*/}
- *Request content from an alternate location*: If a response with a `503 Service Unavailable` or `504 Gateway Timeout` HTTP status code is received from the content origin, Content Delivery can request the same content from the “backup” host specified in an alternate hostname or from the "backup" origin specified by an alternate origin URL (instead of returning the error code to the client).

- *Service not available URL*: If a response with a `503 Service Unavailable` or `504 Gateway Timeout` HTTP status code is received from the content origin, Content Delivery can redirect the client to a specific URL (instead of returning the error code to the client). This makes it easy to specify a single “system error” landing page.

- *Don't serve stale content*: If Content Delivery receives a response with a `503 Service Unavailable` or `504 Gateway Timeout` HTTP status code from the content origin when doing a refresh check, and there is cached content for the requested URL, Content Delivery can return the `503` or `504` HTTP status code instead of returning the stale content.

#### HTTP Requests to Origin  {/*http-requests-to-origin*/}
Requests from Edgio CDN to a customer's origin always contain the `Via` and `X-Forwarded-For` headers.

##### Via Header  {/*via-header*/}
The `Via` header provides your origin with the gateways and proxies through which a request has passed. For example: `Via: 1.1 cds539.lax.llnw.net:80(EdgePrism/4.0.0.3)`

##### X-Forwarded-For  {/*x-fowarded-for*/}
The `X-Forwarded-For` header provides your origin with the IP address of each node through which a request passes on its way to the origin. For example:

`X-Forwarded-For: 10.21.18.15`

The `X-Forwarded-For` header may contain multiple IPs, making it difficult to determine the originating ("client") IP address. Content Delivery provides a separate header that contains the true IP address of the originator. For more information, see [Sending True-Client IP to Origin](#true-client-ip-origin).

### Custom Error Pages  {/*custom-error-pages*/}
If your origin returns one of the following HTTP Status Codes:

- `301 Object Moved`
- `404 Not Found`
- `503 Service Unavailable`
- `504 Gateway Timeout`

During a freshness check for a requested object, Content Delivery can respond with a “custom error page”.

### Geo IP Info to Origin  {/*geo-ip-info-to-origin*/}
When Content Delivery makes requests to your origin, it can also include geographic information about your users in special HTTP request headers. This means you can give your origin applications access to detailed user information by making simple configuration changes in Content Delivery.

Examples:

- Add a request header, such as `X-IP-Geo-Country`, containing the just the Country name
- Add a request header, such as `X-IP-Geo-All`, containing all geographic information available about the end user

The geographic information Content Delivery provides is based on the requesting IP address.

### True-Client IP to Origin  {/*true-client-ip-origin*/}
If you want to identify the IP addresses of end users during origin requests from Content Delivery, you can use the information in the `X-Forwarded-For` HTTP request header, which Content Delivery always provides with origin requests.

However, when a content request follows a complex internet path (such as when traversing multiple proxies and load balancers), the IP address of each traversed node is added to the `X-Forwarded-For` header. This can make it difficult to pick out the requesting IP address.

To avoid this problem, you can configure Content Delivery to provide just the requesting IP address in a separate HTTP request header, either the default `True-Client-IP` header or in another header name you specify.

### Header Debugging  {/*header-debugging*/}
By making an HTTP content request with special "Custom Debug Headers," including a shared secret specific to your service, you can retrieve cache-related information about individual content objects and prevent others from accessing the information.

Diagnostic response headers can include the following information:

- Whether or not a response is cacheable
- How the cache responded to a request (hit, miss, etc.)
- The number of seconds before the cached response will be considered stale (TTL)
- The total number of seconds representing the freshness lifetime of the response ( age + TTL) and how the value was determined (headers, overrides, adaptive TTL, etc. )

To enable this feature, please contact your Account Manager, Solutions Engineer, or Edgio Support, and specify which of the Header Keys you want to use. Each Header Key must be individually enabled by Edgio before it can be used.

When the feature is activated, you will be provided with a unique shared secret.

#### Using Secure Cache Diagnostics {/*using-secure-cache-diagnostics*/}
To use this feature, include the following custom headers in an `HTTP GET` request for an object:

`X-LLNW-Dbg-Secret <sharedsecret>`
`X-LLNW-Dbg-Hdrs <header_key1>,<header_key2>,...`
`X-LLNW-Dbg-Cache-Key-Hash`

If the `X-LLNW-Dbg-Secret` header or its value is missing, or if the secret is invalid, the `X-LLNW-Dbg-Hdrs` header will be ignored, and the request will be processed without it.

One or more header keys can be included in the `X-LLNW-Dbg-Hdrs` header. The Content Delivery service will reply with a separate response header and value for each.

The table below summarizes the request and response header values for each type of request.

| Header Key | Response Header | Possible Values |
| --- | --- | --- |
| `is-cacheable` | `X-LLNW-Dbg-Is-Cacheable` | `Yes`<br />`No`<br />`Negative` |
| `cache-hit-type` | `X-LLNW-Dbg-Cache-Hit-Type` | `HIT`<br />`MISS`<br />`REFRESH_HIT`<br />`REF_FAIL_HIT`<br />`REFRESH_MISS`<br />`CLIENT_REFRESH_MISS`<br />`IMS_HIT`<br />`NEGATIVE_HIT`<br />`DENIED`<br />`OFFLINE_HIT`<br />`REDIRECT` |
| `ttl` | `X-LLNW-Dbg-TTL` | `n{...} seconds`<br />an integer followed by a space and the string "seconds" |
| `fresh-life-total` | `X-LLNW-Dbg-Fresh-Life-Total` | `n{...} seconds`<br />an integer followed by a space and the string "seconds" |
| `cache-key-hash` | `X-LLNW-Dbg-Cache-Key-Hash` | Unique key for a cached object represented as a string of hexadecimal digits |

#### Request and Response Example  {/*request-and-response-example*/}
| Request | Response |
| --- | --- |
| `GET http://www.customer.com/object.txt HTTP/1.1...X-LLNW-Dbg-Hdrs: is-cacheable,cache-hit-typeX-LLNW-Dbg-Secret: sharedsecret` | `HTTP/1.1 200 OK...X-LLNW-Dbg-Is-Cacheable: Yes...X-LLNW-Dbg-Cache-Hit-Type: HIT` |


## Customization  {/*customization*/}
### HTTP Methods  {/*http-methods*/}
The Content Delivery service accepts the following types of HTTP methods:

- `GET`
- `HEAD`
- `POST`

If an HTTP request is received for a method that is not configured, Content Delivery responds with an HTTP `400 Bad Request` status code.

For `HTTP HEAD` requests, Content Delivery sends the `HEAD` request to the origin, caches the response if it is cacheable, and delivers the response to the requestor.

For `HTTP POST` requests, Content Delivery provides additional control: you can accept all POST requests and their request bodies, accept all `POST` requests but discard the request bodies and process as `GET` requests, or deny POS`T all requests. Accepted `POST` request bodies are passed on to your origin.

### HTTP Range Requests  {/*http-range-requests*/}
Content Delivery accepts HTTP `GET` requests containing Range headers (“range requests”), which can be used to access specific byte ranges (rather than the entire file). Range requests are often used to improve the performance of client-based download and media access operations.

Bytes are numbered from zero, and more than one byte range can be specified in each request.

If a range request is valid, Content Delivery responds with a `206 Partial Content` status code, and a Content-Range header specifying the range returned.

Content Delivery can be configured to respond with a `416 Requested Range Not Satisfiable` status code if a requested range is invalid.

For more information on range requests, please see [RFC 7233](https://tools.ietf.org/html/rfc7233).

### TTL Management {/*ttl-management*/}
A cached object’s time to live (TTL) determines if a freshness check should be performed on the object, to determine if an updated object should be obtained from the origin server, then cached. Edgio examines headers and performs freshness checks as described in [Freshness Checks](/delivery/delivery/guide/key_concepts/#freshness-checks). If needed, you can override the origin's `Cache-Control` header and TTL values as described in [Cacheability (TTL) Overrides](#ttl-overrides).

### Cacheability (TTL) Overrides  {/*ttl-overrides*/}
Edgio examines headers and performs freshness checks as described in [Time to Live (TTL)](/delivery/delivery/guide/key_concepts/#ttl). If desired, you can override the Cache-Control header and TTL values using Control.

The override feature is helpful if you cannot easily modify TTLs on your origin, or if you simply prefer to modify them using Content Delivery configurations.

You can configure Content Delivery to use a fixed TTL value you select, or to use minimum and maximum TTL values you specify (and calculate the most appropriate TTL for each request).

### Header Manipulation  {/*header-manipulation*/}
The SmartPurge Rest API Guide appendix includes the following:

[Request Endpoint Schema](/delivery/delivery/smartpurge/smartpurge_rest_api/#request-endpoint-schema)

[Error Response Schema](/delivery/delivery/smartpurge/smartpurge_rest_api/#error-response-schema)

[Error Response Descriptions](/delivery/delivery/smartpurge/smartpurge_rest_api/#error-response-descriptions)

[HTTP Status Codes](/delivery/delivery/smartpurge/smartpurge_rest_api/#https-status-codes)

[API Client Sample Code](/delivery/delivery/smartpurge/smartpurge_rest_api/#api-client-sample-code)

Content Delivery lets you manipulate both HTTP request and response headers. For example, Content Delivery can pre-process HTTP request headers before they are passed to your origin. You can configure Content Delivery to analyze and manipulate existing headers, to add new “custom” headers, and to remove named headers. In addition, Content Delivery can process the response headers received from your origin to determine how to respond to the original request. Content Delivery can strip specified response headers, pass specified headers on to the client either “as is” or with modifications, and even add new headers.

#### Request Header Manipulation  {/*request-header-manipulation*/}
HTTP request headers are used to convey specific information about the requesting user, the content requested and the capabilities of the browser or software making the request. Certain request headers are commonly used by browsers when requesting content, and request headers may also be added by custom clients making content requests.

Content Delivery passes on these request headers when requesting content from your origin (during freshness checks and when requesting non-cacheable content).

When your origin receives HTTP requests, your web applications can analyze the content of specific request headers and apply business logic to determine how to respond. For example, you may want to examine the Host header to determine if the request is being made by Edgio, or analyze the requesting IP address to filter out spam.

To make origin-based analysis easier, and also to support more complex business logic, Content Delivery can pre-process HTTP request headers before they are passed to your origin. You can configure Content Delivery to analyze and manipulate existing headers, to add new “custom” headers, and to remove named headers.

<Callout type="info">Manipulated request and response headers are not passed to any “fallback” URLs you may have specified. If you need to pass and react to header information after an HTTP error, Limelight recommends using the “backup” URL options instead. For more information, please see the [404 Status Code Handling](#404) and [50x Status Code Handling](#503-504) sections.</Callout>

#### Response Header Manipulation  {/*response-header-manipulation*/}
HTTP response headers are used by your origin to communicate specific information about the content being requested. Specific response headers may be intended for use by the requesting client, by the CDN, or both.

Content Delivery can process the response headers received from your origin to determine how to respond to the original request. Content Delivery can strip specified response headers, pass specified headers on to the client either “as is” or with modifications, and even add new headers.

For example, you can configure Content Delivery to add custom response headers to control the behavior of browsers and other clients. In Control, you can configure up to three custom response headers to set cookies, manipulate browser cache settings, and so on. You can also configure an unlimited number of additional response headers on request - if you need to do so, please contact Edgio Customer Service. Response headers can also be manipulated by other Content Delivery configuration options.

<Callout type="info">Manipulated request and response headers are not passed to any “fallback” URLs you may have specified. If you need to pass and react to header information after an HTTP error, Limelight recommends using the “backup” URL options instead. For more information, please see the [404 Status Code Handling](#404) and [50x Status Code Handling](#503-504) sections.</Callout>

#### Vary Header Optimization  {/*vary-header-optimization*/}
The HTTP Vary response header can be used to specify which HTTP request headers are used to determine the uniqueness of a cached object. For each variation in the values of the specified requests headers, a new version of the object must be requested from origin and stored in cache.

For example, Vary: `User-Agent` specifies that the value of the `User-Agent` request header should be used to determine uniqueness. This means that for each variation of the value of `User-Agent`, a different copy of the object will be requested from origin and stored in cache.

Obviously, the use of the Vary response header with request headers that have unrestricted values (such as `Cookie`, `Referer` and `User-Agent`) can significantly reduce CDN performance.

Because of this, Content Delivery ignores the `Vary` response header by default.

However, if you want to cache unique versions of content based on the `Vary: Accept Encoding` response header, you can configure Content Delivery to do so.

Specifically:

- If configured to ignore all Vary headers, the contents of the `Vary` header will not determine cacheability
- If configured to ignore a list of `Vary` headers, those headers will be filtered out of the `Vary` header sent from the origin. With the exception ofAccept-Encoding, if any headers remain, the content is marked as uncacheable
- If only `Vary`: Accept-Encoding remains, each different encoding of an object is cached
Regardless of this setting, all of the `Vary` headers associated with the object are cached and passed on to the client in the response.

#### CORS Header Manipulation  {/*cors-header-manipulation*/}
Content Delivery can be configured to add, set and override CORS ("Cross Origin Resource Sharing") HTTP Headers on a per-request basis.

The following CORS headers are supported:

- Request
    - `Origin`
- Response
    - `Access-Control-Allow-Origin`
    - `Access-Control-Allow-Credentials`
    - `Access-Control-Expose-Headers`

This feature ensures that CORS Request and Response headers are configurable, and simplifies and standardizes the process of adding CORS support to Content Delivery configurations.

Using CORS can significantly improve cache efficiency when using a single Origin to syndicate and distribute content over multiple published domains. If you need to use this feature, please contact Edgio Customer Service. For more information on CORS, see the [W3C Recommendation](https://www.w3.org/TR/cors/).

#### CORS Configuration Options  {/*cors-configuration-options*/}
| Header | Type | Options |
| --- | --- | --- |
| `Origin` | Request | The value to send in the header, in the form of an HTTP protocol and domain (such as http://www.example.com/). **Note**: This header is added only for requests sent to Origin. |
| `Access-Control-Allow-Origin (ACAO)` | Response | One of the following:<br />-   **Pass Through** (default). Do not add an ACAO header, but if the returns one, pass it through to the client.<br />-   **None**, Do not add an ACAO header. If an ACAO header is returned by the Origin , delete it.<br />-   **Wildcard**. Add an ACAO header with `*` (an asterisk) as the value.<br />-   **Origin**. Add an ACAO header with the same value as in the Origin header. |
| `Access-Control-Allow-Credentials (ACAC)` | Response | One of the following:<br />-   **Pass Through** (default). Do not add an ACAC header, but if the returns one, pass it through to the client.<br />-   **None**, Do not add an ACAC header. If an ACAC header is returned by the Origin, delete it.<br />-   **True**. Add an ACAC header with true as the value.<br /><br />If the ACAC header is set to true and the ACAO header is set to *, the ACAO header will be reset to the value in the Origin header. This complies with section 6.1 of the  specification, which states that if the ACAC header is true, the ACAO header may not be `*`. |
| `Access-Control-Expose-Headers (ACEH)` | Response | A list of comma-separated header names, without any spaces.<br /><br />Per section 6 of the  specification, the list should **not** contain any of the following headers:<br />-   `Cache-Control`<br />-   `Content-Language`<br />-   `Content-Type`<br />-   `Expires`<br />-   `Last-Modified`<br />-   `Pragma` |

<Callout type="info">ACAO, ACAC, and ACEH headers are added only for responses to clients (not to Origin). If the response comes from cache, the headers are added just before the response is sent.</Callout>

### Flexible Cache Key Manipulation {/*flexible-cache-key-manipulation*/}

Content Delivery uses unique “Cache Keys” to locate and return cached objects. By default, each Cache Key is based on the full origin URL of the requested object, including any query terms, and the HTTP method that caused the object to be cached.

#### Query Term Customization  {/*query-term-customization*/}
You can configure Content Delivery to extensively modify query terms before they are stored in the Cache Key. Modifications may include:

- Stripping (removing) all query terms.
- Excluding specific query terms
- Including only specific query terms

Removing query terms can eliminate duplicate caching of content (and increase CDN efficiency and “Cache Hit Ratios”). Duplicate caching can occur when the origin provides the same content regardless of the presence of one or more query terms. Unless those query terms are removed, a new copy of the content will be cached for each change in the values of the query terms. Removing query terms can also eliminate duplicate caching when multiple URLs map to the same cached content by using different query terms.

#### Adding Cache Key Suffixes
Cache Keys can also be configured to add custom values to the end of the key.

#### Adding Suffixes Using Request Headers
Content Delivery caches multiple responses identified by a single URL, based on different request header values

Custom Cache Key suffixes can be provided in an HTTP request header. When a specified header name is present in a request, Content Delivery appends the header value to the cache key of the response.

Contact your Account Manager or Solutions Engineer if you want customized query terms or custom values added to your Cache Keys.

### Cache Key Manipulation  {/*cache-key-manipulation*/}
Content Delivery uses unique “Cache Keys” to locate and return cached objects. By default, each Cache Key is based on the full origin URL of the requested object, including any query terms, and the HTTP method that caused the object to be cached.

Content Delivery uses unique “Cache Keys” to locate and return cached objects. By default, each Cache Key is based on the full origin URL of the requested object, including any query terms, and the HTTP method that caused the object to be cached.

#### Query Term Customization  {/*query-term-customization*/}
You can configure Content Delivery to extensively modify query terms before they are stored in the Cache Key. Modifications may include:

- Stripping (removing) all query terms.
- Excluding specific query terms
- Including only specific query terms

Removing query terms can eliminate duplicate caching of content (and increase CDN efficiency and “Cache Hit Ratios”). Duplicate caching can occur when the origin provides the same content regardless of the presence of one or more query terms. Unless those query terms are removed, a new copy of the content will be cached for each change in the values of the query terms. Removing query terms can also eliminate duplicate caching when multiple URLs map to the same cached content by using different query terms.

#### Adding Cache Key Suffixes {/*adding-cache-key-suffixes*/}
Cache Keys can also be configured to add custom values to the end of the key.

##### Adding Suffixes Using Request Headers {/*adding-suffixes-using-request-headers*/}
Content Delivery caches multiple responses identified by a single URL, based on different request header values

Custom Cache Key suffixes can be provided in an HTTP request header. When a specified header name is present in a request, Content Delivery appends the header value to the cache key of the response.

Contact your Account Manager or Solutions Engineer if you want customized query terms or custom values added to your Cache Keys.

#### Query Term Customization {/*query-term-customization*/}
You can configure Content Delivery to extensively modify query terms before they are stored in the Cache Key. Modifications may include:

- Stripping (removing) all query terms.
- Excluding specific query terms
- Including only specific query terms

Removing query terms can eliminate duplicate caching of content (and increase CDN efficiency and “Cache Hit Ratios”). Duplicate caching can occur when the origin provides the same content regardless of the presence of one or more query terms. Unless those query terms are removed, a new copy of the content will be cached for each change in the values of the query terms. Removing query terms can also eliminate duplicate caching when multiple URLs map to the same cached content by using different query terms.

#### Adding Cache Key Suffixes {/*adding-cache-key-suffixes*/}
Cache Keys can also be configured to add custom values to the end of the key.

##### Adding Suffixes Using Request Headers {/*adding-suffixes-using-request-headers*/}
Content Delivery caches multiple responses identified by a single URL, based on different request header values

Custom Cache Key suffixes can be provided in an HTTP request header. When a specified header name is present in a request, Content Delivery appends the header value to the cache key of the response.

Contact your Account Manager or Solutions Engineer if you want customized query terms or custom values added to your Cache Keys.

### Caching Dynamic Content {/*caching-dynamic-content*/}
Content Delivery normally requires at least one of the following "cache control" response headers before caching an object:

- Expires
- Last-Modified
- Cache-Control

An object length must also be specified in the Content-Length header.

However, for HTTP responses that are generated dynamically (“generated responses”), origins often do not supply these cache control response headers, or when they are provided, they are configured to state that the content is not cacheable.

The default caching behavior of Content Delivery is to obey the instructions in the cache control response headers provided by the origin server, ensuring that content your origin specifies as “not cacheable” is not cached, and vice-versa.

However, if most of your dynamically generated content is valid for the same amount of time, and your origin doesn’t supply cache control headers, you can also configure Content Delivery to cache it anyway. In these cases, your dynamic content will then be cached regardless of the Expires header, the `Last-Modified` header, or the `s-maxage` and `max-age` fields of the `Cache-Control` header.

The `Last-Modified` header is required in addition to a Content-Length to cache content whether or not Cache-Control is present.

### Configurations  {/*configurations*/}
To provide maximum flexibility during configuration, many features allow the use of wildcard and regular expressions (Regex) to specify the URL pattern that must be matched before a feature is applied.

### Cache Purging  {/*cache-purging*/}
Objects are normally updated in or removed from cache during “freshness checks” with your origin. For a given object, a freshness check is initiated when a request has been made for the object, and the object’s TTL (Time To Live) has expired.

In general, setting object TTL is the best and most efficient way to manage cached content. For example, a news site may need to provide rapid updates to a breaking video story. The video can be updated in cache as quickly as desired by assigning it a low TTL value using an HTTP response header. In most cases, there is no need to remove the video from cache directly.

However, there are special cases where content needs to updated on the next user request or even proactively removed from cache as soon as possible. This is known as "purging the cache" or just "purging". Examples of when purging might be necessary include:

- Text is misspelled in the caption of a newly-uploaded video, and you need to update the video in cache as quickly as possible.
- You discover that some of your cached content is infringing a copyright and need to delete the content from cache as soon as possible.
- You lose a contract with a content provider and are obligated to delete the provider’s content from your cache as soon as possible.
- During a full website update, when you need to quickly update many related website objects (images, text, video, etc.) at the same time.

Edgio's SmartPurge executes purge operations more quickly and reliably than older technologies, including higher purge queue priority, and additional API features such as unlimited callbacks.

You can access SmartPurge through either the Control Portal or the SmartPurge REST API.

Content Delivery lets you purge (remove) cached files. You can do so via the Control or the Purge REST API.

#### Purge Via Control {/*purge-via-control*/}
The Purge user interface in the Control lets you submit requests to purge one or more cached files. You can also view the status of previously-submitted purge requests, and save frequent requests for reuse.

#### Purge Via API {/*purge-via-api*/}
The Purge REST API provides programmatic access to the same capabilities as the Control. You can use the Purge API to generate Purge requests and view status programmatically.

## Content Protection {/*content-protection*/}
### URL Protection {/*url-protection*/}
URL protection is a feature that protects content via allow listing and deny listing of domains and geographic regions. You can use URL protection to guard content from link thieves, sniffers, and problem geographies and IP addresses or ranges.

#### MediaVault URL Protection {/*mediavault-url-protection*/}
MediaVault is a high-performance URL authentication service. MediaVault’s main purpose is to help you secure your content from unauthorized viewing.

##### Deep Link Prevention {/*deep-link-prevention*/}
Deep-linking is the practice whereby a user obtains access to a URL that points to some of your content and passes the URL to someone else not authorized to access the content (for example, someone who has not paid for your services). MediaVault ’s built-in URL protection ensures deep-link denial. The protection comes from specific parameters in the URL, which are usually generated on the fly using server-side scripting when the URL is published by the customer's server. Parameters include valid start and end time (so the URL can expire), and validation against user IP address, referrer and page URL (where user is coming from).

So, you could create a short-lived URL that gives a user, say, three minutes to access a specific asset on your website, and limits access to requests from that user’s originating IP address and referrer. That link would then be useless if published on any other website.

For large files that are accessed via HTTP range requests, MediaVault protection can be limited to range requests for a specified number of bytes at the beginning of a file (the “initial bytes”).. Subsequent range requests are not protected. This is useful for preventing deep links to very large files while ensuring the fastest possible response. Users are unable to make use of the files without access to the initial bytes, and only the initial request requires an interaction with MediaVault.

For detailed information on how MediaVault works and how to use the various MediaVault options, see the [MediaVault User Guide](/delivery/delivery/mediavault).

#### Content and URL Authentication {/*content-and-url-authentication*/}
MediaVault maximizes authentication performance by using tokens to avoid three-way handshakes (common to other methods of authentication) that can lead to severe connection time latency.

Please note that MediaVault is not a replacement for DRM and should not be associated with user authentication.

MediaVault works like this:

- You enter a shared secret during the configuration process.
- You then generate a token (MD5 hash) for each published URL, based on the shared secret, and append it to the URL in a query term or provide it in a cookie. You can generate the token manually by navigating to the *Content* > *Secure* > *MediaVault* page in the Control, or in server-side code on your origin.
- When a request is received, MediaVault uses the same hash algorithm to create it’s own token, which should be identical to the one you appended.
- If the tokens match, MediaVault then looks for additional MediaVault -specific query terms (such as end date/time and IP address/mask) to determine whether the request is valid. If the tokens don’t match, the request is rejected.

For more information, see the [MediaVault User Guide](/delivery/delivery/mediavault).

#### Cookie-Based Authentication {/*cookie-based-authentication*/}
URL authentication information is normally passed to MediaVault via URL query terms, which are appended to each protected URL.

For HTTP requests, MediaVault can switch to using a cookie (instead of the URL terms) after the first request from a given user. The cookie is then read on each subsequent request, authentication is performed using the cookie data, and the cookie is updated with new expiration information as needed on each response. This is typically used during request and response conversation involving some form of manifest file and subsequent requests for files, such as media streaming and software downloads. It is most commonly used for Media Content Delivery scenarios, but can also be used with Content Delivery if needed.

For detailed information on how MediaVault works and how to use the various MediaVault options, see the [MediaVault User Guide](/delivery/delivery/mediavault).

##### Geographic URL Protection {/*geographic-url-protection*/}
You can use the *Geo Complianc*e feature to restrict access to your content by geographic area. Both IPv4 and IPv6 addresses are used when determining geographic location.

This feature is ideal for managing media licenses with geographic restrictions. It’s also useful for sites where advertising is a primary driver, as the audience can be constrained to the target geographies specified by the advertisers.

**Geographic Blocking**
With *Geo Compliance*, you can either allow or deny (allow list or deny list) access for each geography you specify, and also control which parts of your content library are affected by each restriction. Geographies can be specified by country, region or US state.

<Callout type="info">The geographic origin of each request is determined based on the user’s IP address.</Callout>

**Anonymizer Blocking**
*Geo Compliance* also lets you control anonymizer access to your content. You can allow or deny anonymizer access, and specify the level of certainty to apply when identifying anonymizers.

### SSL Protection {/*ssl-protection*/}
#### Securing Your Content with SSL
Secure Sockets Layer (SSL) is a security protocol used by web browsers and web servers to help users protect their data during transfer. SSL Certificates are small data files that digitally bind a cryptographic key to an organization's details. In the case of a web browser, SSL activates https and allows secure connections from a Web server to the browser. Edgio supports SSL at both the origin server and the CDN edge.

Customers can use Edgio’s certificates but more typically, they opt to use their own. Using your own certificate has advantages: you can use your own domain, and you have full control over certificate attributes. However, note that if you use your own certificates, a custom setup is required, which may delay your implementation.

Using Edgio certificates also has advantages: they are less expensive, you do not have to renew them, and they are faster to implement. However, you cannot use your own domain, you must use a Edgio-owned hostname, and you do not have control over certification attributes.

If you sign up for the Edgio SSL service, we recommend that you use our supplied certificate for SSL connections.

If you sign up for the Edgio SSL service, we recommend that you use our supplied certificate for SSL connections. You can use your own certificate, but that requires a custom setup and may delay the SSL implementation.

<Callout type="info">You cannot use CNAMEs when using SSL. A CNAME will cause a site name mismatch with the Edgio certificate for the Edgio host.</Callout>

Contact your Account Manger if you want to include the SSL option.

##### How do SSL Certificates Work?  {/*how-do-certificates-work*/}
When a browser encounters a website with SSL:

1. A browser attempts to connect to a Website secured with SSL.
2. The browser requests that the web server identify itself.
3. The server sends the browser a copy of its SSL Certificate.
4. The browser checks whether it trusts the SSL Certificate. If so, it sends a message to the server.
5. The server sends back a digitally signed acknowledgment to start an SSL encrypted session.
6. Encrypted data is shared between the browser and the server.

HTTPS is HTTP delivered using the SSL protocol. Edgio is equipped to use HTTPS for secure communication between the origin server and Edge Servers. This section provides information about certificates and explains how to obtain and install certificates.

<Callout type="info">if you want to have your content delivered via HTTPS you must contact your Account Manager to have Edgio perform the necessary configurations. You can have content delivered via HTTP only, HTTPS only, or both HTTP and HTTPS.</Callout>

##### Certificate Types  {/*certificate-types*/}
Due to the prevalence of counterfeit Websites on the Internet, one of the key purposes of an SSL Certificate is to help assure consumers that they are actually doing business with the Website they believe they are accessing. An SSL Certificate provided by a trusted third-party authenticates the identity of a Web site based on a validation process performed by the Certificate Authority (CA). However, there are several different levels of validation that back SSL Certificates depending on the certificate and the CA.

The level of identity authentication assured by a CA is a significant differentiator between SSL Certificates. The explosive growth of phishing and other fraudulent websites designed to steal information from consumers has put a spotlight on the authentication strength of various SSL certificates and the authentication processes employed by different CAs. There are three commonly recognized categories of SSL authentication:

- Domain Validation
- Organization Validation
- Extended Validation.

**Domain Validation**

Domain validation (DV) provides the lowest level of validation available from commercial certificate authorities. DV verifies that the requestor has some kind of control over the domain and triggers most browsers to put a padlock in the address bar.

Most CAs can issue DV certificates in less than a day.

**Organization Validation**

Organizational Validation (OV) stands as a more advanced and better SSL certificate because it has more validation requirements. OV authenticates domain ownership plus the organization's information included in the certificate (name, city, state, and country). OV triggers some browsers to color the address bar blue.

Most CAs can issue OV certificates in one to two days.

**Extended Validation**

Extended Validation (EV) represents the best SSL Certificate and is the recommended SSL Certificate type. As the highest level of authentication using validation criteria defined by the CA/browser forum and audited annually by KPMG, EV triggers some web browsers to turn green in the address bar, and displays the organization's name plus the name of the issuing CA. It also validates domain ownership and organizational information, along with the legal existence of the organization, and certifies its awareness and approval of the request. The result of opting for a higher value EV certificate is more security and more online trust, which leads to more transactions conducted online.

Websites that benefit the most from EV are:

- E-commerce Websites that collect credit card information.
- Websites that operate in a competitive environment where customer loyalty and brand - protection is key.
- Websites collecting personal data.
- Websites with customer or employee login forms.
- Websites using third-party payment processing (for example PayPal).

Most CAs issue EV certificates in seven to ten days.

##### Obtaining a Certificate  {/*obtaining-a-certificate*/}
Customers generally have two SSL certificates options. You can bring your own, or you can use the Edgio shared certificate.

We recommend that you use our supplied certificate for SSL connections. You can use your own certificate, but that requires a custom setup and may delay the SSL implementation.

If you use your own certificates, Edgio has a partner relationship with Symantec in which we can order the certificates on behalf of the customer. For each SSL instance, you must provide Edgio the following:

- X509 server certificate in PEM format (not PKCS7, PKCS10, or DER)
- RSA private key, which will be used to generate the server certificate without a passphrase.

##### Installing Your Certificate  {/*installing-your-certificate*/}
Installation instructions depend on your platform/operating system. Contact your CA for details, or you can work with your Edgio support team. The support team will check your certificates periodically to ensure they do not expire.

#### Edgio SSL Protection  {/*edgio-ssl-protection*/}
HTTPS (SSL) support is provided for both IPv4 and IPv6 in all Edgio PoPs. You can use SSL to secure any content Edgio delivers.

<Callout type="info">During SSL negotiation between Edgio caching servers and customer origin, SNI extensions are not sent. This ensures that connection re-use is not impacted by specific hostnames being used during TLS negotiation with the origin.</Callout>

##### SSL Delivery With Custom Certificate Option  {/*ssl-delivery-with-custom-certificate-option*/}
Edgio makes it easy to procure and manage SSL certificates, including wildcard,Subject Alternative Name and Fully Qualified Domain Name (FQDN) certificates.

Both customer- and Edgio-hosted certificates can be implemented. If you want Edgio to host your existing, in-use certificates, Edgio can do so using 1024-bit encryption or higher intelligence routing. Edgio can even deploy complex custom certificates containing a mix of wildcards and FQDNs, for single or multiple subdomains.

There are two types of multi-use certificates:
- *Wildcard Certificates*: Normally employed to secure multiple subdomains under a single unique FQDN
- *SAN Certificates*: Usually employed to protect multiple domainnames using a single certificate

##### SSL & Transportation Layer Security (TLS) Offload  {/*ssl-and-tls-offload*/}
All incoming SSL requests are terminated on EdgioEdge Servers, improving response time by lowering the latency of the TLS negotiation between the end user and the content origin.

##### Support for Chunked Transfer Encoding Over SSL  {/*support-for-chunked-transfer*/}
Chunked Transfer Encoding via SSL improves throughput for secure uploads. Chunked Transfer Encoding enables uploads where the content length is not known in advance, forwarding data as received by the CDN rather than buffering the request.

To enable this feature, please contact Edgio Customer Service for assistance.This feature is enabled on a per-VIP basis.

### Authentication {/*authentication*/}
Edgio Content Delivery supports the use of Amazon S3 authentication for customers using Amazon S3 as their origin.

When Amazon S3 authorization is enabled, each Edgio request to Amazon S3 includes an Authorization header containing an access key identifier and secret access key.

To enable this feature, you must provide Edgio with your Amazon S3 access key identifier and secret access key.

<Callout type="info">Amazon S3 temporary credentials are not supported.</Callout>

## Defensive Protection  {/*defensive-protection*/}
The security features in Content Delivery offer a first line of defense from unwanted traffic and requests reaching our customer’s web application infrastructure. Built-in defense mechanisms and security features ensure high performance and availability of HTTP and HTTPS web applications.

In a multi-layered security solution, Content Delivery provides the best first line of active defense and can easily be augmented with the attack detection, reporting and scrubbing capabilities of the Edgio DDoS Attack Interceptor product.

Defense protection features are:

- Deflect network layer attacks:
    - Reflected and brute force attacks
    - HTTP SYN flood
    - ICMP flood
- Maintain HTTP and HTTPS application performance during attack
- Filter unwanted traffic:
    - Check headers, query terms and cookies
    - Assess user location for access rights
- Mask web application infrastructure from the public internet
- Protect access to content with time-limited and individualized URLs
- Real-time status code reporting describes user and application behavior
- Real-time reporting integrates with monitoring systems
- High-performance global SSL infrastructure

## Acceleration  {/*acceleration*/}
### Overview  {/*overview*/}
Web Site and Application Acceleration ensures that personalized, complex websites and applications are delivered to users on any device, anywhere, providing near-instant response times by optimizing and accelerating the delivery of dynamically generated website and application content and data. Web Site and Application Acceleration is a set of features integrated with Edgio’ global Content Delivery Network and is designed to interoperate with your existing infrastructure and online application solutions.

Web Site and Application Acceleration reduces network latency by providing optimizations in the first, middle, and last miles of the Internet. When combined, optimizations for all three areas are known as “symmetric acceleration” and enable two types of optimization and acceleration to be applied:

- Dynamic content acceleration (DCA): Optimizes the delivery of website HTML, application frameworks and the dynamic data from the origin infrastructure creating them, over a high speed, congestion-free private network of densely architected CDN Points of Presence (POPs), to the end user.
- Static object caching and delivery: Objects that are updated infrequently are cached at the Edgio CDN edge and delivered to end users, ensuring low latency delivery and high infrastructure offload. Edgio Network’s Cache Hit Ratio for cacheable content is is the highest in the industry.

![first-middle-last](/images/delivery/control/first-middle-last.jpg)

### Web Site and Application Acceleration Benefits  {/*web-site-and-application-acceleration-benefits*/}
Web Site and Application Acceleration helps your content get delivered faster and with better availability—everything from your dynamic web pages, to JavaScript files, to rich media.

With its two levels of optimization, Web Site and Application Acceleration provides the following benefits:

- Increases customer conversion rates
- Increases time users spend on web site
- Increases ad revenue
- Increases customer satisfaction
- Reduces support calls
- Improves response time
- Lowers cost of ownership
- Improves infrastructure return on investments
- Provides built-in reliability and redundancy
- Scales to accommodate changing traffic patterns
- Conserves valuable internal resources by offloading to Edgio
- Enforces business rules with an advanced policy engine
- Connects to user access networks through Edgio’s global network
- Detects and optimizes for mobile devices
- Shields and protects your application infrastructure from the public internet
- Deflects network layer attacks and filters unwanted traffic

#### Why Accelerate Website Content?  {/*why-accelerate*/}
Without website content acceleration, both mobile and desktop users can have a negative experience with your website.

##### Studies and Statistics  {/*studies*/}
Studies show that slow web site performance negatively impacts an end-user’s perception of a web page and the organization that owns the page. Almost half of all users expect a web page to load in two seconds or less.

A one-second delay in page load time results in 11% fewer page views and a 16% decrease in customer satisfaction. A one-second delay in page load also results in 7% loss in conversion. Moreover, users blame the retailer for this delay, and not the Internet or the service provider, thus eroding brand equity.

The longer a page takes to load, the greater the frequency of page abandonment by the user. About 80% of shoppers who are dissatisfied with web page performance are less likely to buy from the same site again. About half those users will tell their friends about their bad experience.

<Callout type="info">All statistics in this section are from Sean Work, kissmetrics.com</Callout>

![Page Load](/images/delivery/control/page-load.jpg)

##### Expectations of Mobile Users  {/*expectations-of-mobile-users*/}
Mobile users expect a desktop-quality experience in terms of the performance of the mobile website or application. Moreover, the mobile experience must be consistently high across all devices. Page loads must be blazingly fast. A CDN must be able to detect a device type and location in order to provide tailored formats and fastest access speeds. Web Site and Application Acceleration consistently meets these requirements and expectations.

##### Types of Content  {/*types-of-content*/}
Website and Application content can typically be divided into two categories:

- Static content: changes infrequently or never. Is cached at the CDN edge in compressed or uncompressed format. Seldom or never requires updates from the origin. Your website’s logo is an example of static content.
- Dynamic content: changes frequently and is generally classified as personalized or real-time information. The HTML used in dynamic websites is typically uniquely generated for each user that accesses the website; for example, a user’s investment allocation pie chart. Therefore, dynamic pages either need to be fetched from the origin each time a page is used, or they are updated very frequently. Furthermore, a browser can only download resources (images, JavaScript, stylesheets, etc.) after the HTML framework has been downloaded, because the HTML describes which resources are needed to make up the page. It is therefore imperative that the HTML arrives as quickly as possible, so that the delivery of additional resources is not delayed.

##### Benefits of Using Dynamic and Static Content Delivery {/*benefits-of-using-dynamic-and-static-content-delivery*/}
Without specialized content delivery technologies, all content, both static and dynamic, is delivered slowly thereby increasing the chances of end-users abandoning a page before it fully loads.

Web Site and Application Acceleration provides state of the art dynamic and static content delivery. For static content acceleration, Web Site and Application Acceleration uses configurable, high-density edge caching, resulting in an industry-leading Cache Hit Ratio and providing: lower wait times; lower page load errors; lower resource load errors; and lower costs.

Dynamic content delivery is accelerated via symmetric acceleration in the first, middle, and last miles of the content’s journey from the origin server to the end user. Web Site and Application Acceleration accelerates the delivery of dynamic content across the Edgio global CDN, optimizing its journey across the internet.

##### Architecture {/*types-of-content*/}
The following architectural elements help ensure fast, reliable communication and content acceleration with the Web Site and Application Acceleration product: densely architected POPs, cache hierarchies, and connection meshing.

##### Densely Architected POPs {/*densely-architected-pops*/}
Edgio employs a dense network architecture in which multiple data centers in metro locations (such as Los Angeles, London and Tokyo) are interconnected using high-capacity links and grouped around key transit locations and carrier-neutral interconnection points, using multiple high speed connections to deliver content with low-latency into last mile access networks.

These groupings of metro data centers are Edgio’s points of presence (POPs) that operate together as single logical groups in each metro area. They form over 40 POPs globally, housed in over 80 individual Data Centers (DC).

All Edgio POPs are connected together with our own private fiber-optic infrastructure, managed by Edgio for Edgio customers as a media grade, highly efficient private network. Edgio controls and manages this network and its densely architected POPs, to provide industry-leading cache-hit ratios for cacheable content and ensure that cache fill requests and requests for dynamic, personalized content are delivered to the POPs serving the end user requests without suffering from the congestion present on the public Internet. Requests can then be delivered using the Edgio 10+ terabit per second (Tbps) egress capacity Content Delivery Network.

Unlike sparsely architected content delivery service providers who distribute servers within third-party network locations, Edgio’s dense architecture of interconnected POPs enables each POP to contain many hundreds of servers, capable of delivering all of Edgio’s services from each location. Every server used in the delivery of the Web Site and Application Acceleration solution is highly specified and able to deliver multiple gigabits per second directly to the end user access networks available to each POP, and every Web Site and Application Acceleration customer’s service can be delivered from all of Edgio’s POPs.

![metro-pop](/images/delivery/control/metro-pop.png)

##### Cache Hierarchies   {/*cache-hierarchies*/}
As all of the Edgio POPs are connected together into a single physical network, a hierarchy of caching for each website being accelerated with Web Site and Application Acceleration is established across the network. A Cache Hierarchy is a logical path that is defined within the Edgio network so that requests which have to be sent to the customer origin, can be directed to use the most efficient path within the Edgio network, to get there.

Hierarchies are defined for Content Delivery customers so that requests for dynamic content are accelerated through the Edgio network to the POP closest to the customer’s content origin, from every other POP in the network, ensuring the optimization of end user requests for dynamic content.

Requests for Content Delivery customer’s cacheable content also follow a hierarchy. These can be configured to ensure that content not already in cache is populated across the Edgio POPs as requests for it flow to the origin and back to the end user, as the request is routed through Edgio POPs on its way to the origin and back.

##### Connection Meshing  {/*connection-meshing*/}
As connections for dynamic content flow through the Edgio network between POPs serving requests for end users and the POP closest to the customer’s origin infrastructure, a “mesh” of connections is established and maintained to suit the scale and frequency of end user requests. These connections are managed by Edgio’s caching and acceleration software so that they can be re-used for many end user requests and the high efficiency of Edgio’s accelerated request and response flow can be delivered.

### Capabilities {/*capabilities*/}
Web Site and Application Acceleration has a wide range of capabilities and components that work together to guarantee lightening-fast delivery of your content to end users. These capabilities are explained in the following sections:

#### Web Site and Application Acceleration Components  {/*components*/}
Web Site and Application Acceleration combines a number of technologies and optimizations in order to accelerate and optimize the delivery of complete websites and applications from your content origin to your end users. These components are:

- First-mile acceleration and optimizations
- Middle-mile acceleration and optimizations
- Last-mile acceleration and optimizations

All optimizations are features and are configurable.

##### About First, Middle, and Last Miles  {/*about-first-middle-last*/}
To understand Web Site and Application Acceleration ’s accelerations, it is helpful to understand the first, middle, and last miles:

- First mile: The path between the content origin and the Edge Server nearest the origin.
- Middle mile: The path between the Edgio Edge Server nearest the origin, to the Edgio Edge Server nearest the user, within the Edgio network.
- Last mile: The path from the Edgio Edge Server nearest the user to the user’s computer or device.

![first-middle-last](/images/delivery/control/first-middle-last.jpg)

##### First-Mile Acceleration  {/*first-mile*/}
First-mile acceleration occurs between the content origin infrastructure (origin) and the Edgio POP and Edge Server closest to this origin. To reduce the latency and maximize origin efficiency and resource utilization when returning the requested content into the Edgio network, Edge Servers within the Edgio POP closest to the origin are used to concentrate and control connections and communication between the Edgio Network and the origin.

Web Site and Application Acceleration optimizes this connection and data flow while requesting content and scaling to meet the demands of your audience. Web Site and Application Acceleration uses a cache-hierarchy (see [Cache Hierarchies](#cache-hierarchies)) to co-ordinate requests across the entire Edgio network and restrict requests to your origin from one Edgio POP to ensure that the parallel load to your infrastructure is controlled.

##### Middle-Mile Acceleration  {/*middle-mile*/}
Middle-mile acceleration takes place between Edgio Edge Servers in the POP nearest the origin, and the Edge Servers in the POP nearest to the end-user making the request. (See [About First, Middle, and Last Miles](#about-first-middle-last).) This middle-mile comprises the longest distance that content must travel, on its journey between the origin and the end user. In Edgio’s case, this middle mile is within our private network.

The optimizations that are employed by Web Site and Application Acceleration in the middle-mile are designed to ensure the fastest delivery of static and personalized, dynamic content from the origin. Web Site and Application Acceleration determines the fastest route between the origin and end users and provides a congestion-free connection between them, optimizing the communication protocols and connection management within the Edgio network.

Middle-mile optimizations include:

- Custom cache hierarchies, mapping the best path to the origin across Edgio’s private network (see [Cache Hierarchies](#cache-hierarchies).)
- Connection meshing between POPs, ensuring low latency for all connections across the network (see [Connection Meshing](#connection-meshing))
- Persistent connections for high traffic scalability (see [Dynamic Content Acceleration and Delivery Features In Context](#dynamic-in-context) and [Static Content Acceleration and Delivery Features In Context](#static-in-context))
- WAN and TCP optimization for lowest content propagation times (see TCP/IP Optimization)

##### Last-Mile Acceleration {/*last-mile*/}
Last-mile acceleration occurs between the Edgio Edge Servers in the POP nearest the user and the user’s computer or device, when delivering content over the access networks, internet service provider’s (ISP’s) and mobile operator networks that connect them. (See About First, Middle, and Last Miles.) Edgio is directly connected to over 900 ISPs, access networks, carriers and mobile networks with connections in multiple locations, ensuring that content being requested is delivered as fast as possible to any device on any network.

Last-mile optimizations include:

- Arc Light (see [Dynamic Content Acceleration and Delivery Features In Context](#dynamic-in-context) and [Static - Content Acceleration and Delivery Features In Context](#static-in-context))
- Cache Control (see [Caching Dynamic Content](#caching-dynamic-content))
- Compression
- Header control (see [Header Manipulation](#header-manipulation))
- MediaVault content protection (see [URL Protection](#url-protection))
- Accelerated SSL offload
- Persistent connections to browser
- TCP optimizations

#### Adaptive Intelligence {/*adaptive-intelligence*/}
Web Site and Application Acceleration provides adaptive intelligence capabilities that include:

- Origin offload: As much as is possible, objects are cached on Edge Servers, thereby reducing the number of hits on your origin server and improving performance.
- Connection optimizations: Connections in the first, middle, and last mile segments are optimized via connection pooling and multiplexing to optimize the delivery of uncacheable content from the content origin.
- Custom cache hierarchies
- Round-trip minimization
- Protocol maximization (Protocol maximization dynamically adjusts the parameters of Internet-standard protocols on a per-connection, per-delivery basis for maximum performance.)

#### Dynamic Content Acceleration and Delivery Features In Context {/*dynamic-in-context*/}
This section illustrates key dynamic content acceleration and delivery features involved in a request and response flow.

Dynamic content is that content which must be generated at the time of request due to its nature, being timely, personalized or unique depending on the parameters used to request it. Dynamic content is always created and served by a content origin or application server, such as a web server interfacing with a database or a content management system. Dynamic content, by definition, cannot be cached by Web Site and Application Acceleration, and HTTP response headers should be set by content origins to ensure that content is correctly identified as dynamic, non-cacheable content.

Examples of dynamic content are:

- The list of items in a user’s shopping basket
- A list of previously ordered goods in an e-Commerce website user profile
- The results of a search query
- Recommendations to be presented to a user based on a previous activity

Most dynamic content is HTML or similar application framework data, and describes the other resources that are needed to complete the rendering of the information being requested. It is critical that this content is delivered as fast as possible as the browser or app needs this content in order to build, request, and present the other items that make up the complete page.

Web Site and Application Acceleration uses its feature set to optimize the request and response flow of dynamic content to and from the content origin or application infrastructure in the following ways:

| Step | Features/  <br />Capabilities | Optimization Applied | Description | Implementation Options |
| --- | --- | --- | --- | --- |
| DNS resolution & Initial connection | Global \- Premium service.<br /><br />Traffic Director | CDN Scale<br /><br />Persistent connections to browser<br /><br />Request targeting | services are targeted by end users through DNS resolution at request time.<br /><br />DNS services target the appropriate POP for the request when the underlying Hostname is resolved. | Requests targeted to by are automatically serviced by the CDN configuration in place for that domain.<br /><br />Customer domains (i.e.www.mycompany.com) are D to a provided hostname (i.e. mycompany.hs.llnwd.net).<br /><br />Traffic Director can be utilized to control content delivery options based on user location (Geo, IP) and to balance content delivery between multiple services. |
| Secure Connection | SSL Offload | SSL termination | SSL is provided in all POPs and offers SSL termination at the for end users, lowering latency of the TLS negotiation.<br /><br />HTTP and HTTPS protocols can be used to communicate with the customer origin. | Customer certificates or hosted certificates can be implemented for use.<br /><br />Single domain, Wildcard, SAN and Extended Validation certificates can be used with Web Site and Application Acceleration. |
| Object request | HTTP Methods,<br /><br />Origin support | Origin selection | Options for specifying origin location and header override options | Primary & backup origin servers<br /><br />Host-Header override<br /><br />Cache Hierarchies<br /><br />Error handling<br /><br />Header insertion to identify to the origin |
| Object request | HTTP Control, Geographic compliance, GeoIP Information, | Request control<br /><br />Header manipulation | Requests can be analyzed for their authenticity and denied or allowed to be serviced by the CDN based on combinations of the end users geographic location and information present in the URL. | Allow or deny list countries from being able to access content via the CDN<br /><br />URL tokenization enables URLs to be single or limited use, time and referrer bound.<br /><br />Request Headers can be added to include the users GeoIP information in the request to origin. |
| Object request | Advanced Rules Engine | Rules on Request | Rules on request offer the opportunity for additional conditional logic to be performed at the point of the request being made to the CDN.<br /><br />Rules typically fall into the following categories and may consist of a combination of logical steps (not comprehensive):<br /><br />- Analysis of:<br />Headers, URL, Query Strings, or Cookies for their presence or specific values<br />- Changes to: URLs, request headers, origin location, cookies. | Rules are determined and implemented during configuration. |
| Object request | Cache hierarchy,<br /><br />Middle Mile Acceleration, First Mile Acceleration | Connection meshing<br /><br />Origin connectivity<br /><br />Connection pooling<br /><br />TCP & WAN acceleration | Requests for dynamic content are accelerated across the network using a hierarchy of determined paths to the POP closest to the origin location.<br /><br />TCP optimization and WAN acceleration are used to reduce the number of Round Trips needed between POPs and maintain connectivity across the network.<br /><br />Requests from across the network are concentrated into one POP to maximize resource reuse and control requests to the origin.<br /><br />Connection management, reuse and TCP optimizations are used to reduce latency and Round Trips for each request to origin. | Cache hierarchies are established during configuration.<br /><br />Middle Mile acceleration is enabled by default for customers.<br /><br />Best practices are implemented for origin connectivity and can be amended as necessary for specific customer configurations. |
| Object response | GZIP Passthrough | Compression on-the fly | Content that cannot be compressed or is not compressed by the origin server is selected for compression at the Origin facing s on-the-fly. The compressed object then delivered across the network faster. | Standard compression levels and best-practice sets of file types and sizes will be compressed by default.<br /><br />File types to be compressed can be altered as needed.<br /><br />More aggressive compression and options to compress larger options can be added.<br /><br />Large and small objects can be compressed when using HTTP or HTTPS |
| Object response | Middle Mile Acceleration | Connection meshing<br /><br />Connection pooling<br /><br />TCP & WAN acceleration | Responses are accelerated across the network using the same hierarchy of determined paths that was used to reach the POP closest to the origin location.<br /><br />TCP optimization and WAN acceleration is used to reduce the number of Round Trips needed between POPs and maintain connectivity across the network. | Cache Hierarchies are established during configuration.<br /><br />Middle Mile acceleration is enabled by default for customers. |
| Object response | Advanced Rules Engine | Rules on Response | Rules on response offer the opportunity for additional, conditional logic to be performed at the point of the response being sent to the end user.<br /><br />Rules typically fall into the following categories and may consist of a combination of logical steps (not comprehensive)<br /><br />Analysis of:<br /><br />Headers, URL, Query Strings, or Cookies for their presence or specific values<br /><br />Changes to:, response headers, cookies. | Rules are determined and implemented during configuration.<br /><br />Rules offer a flexible method of applying a required function. They are executed for each requested URL configuration, but being deterministic may not have to be applied each time. |
| Object response | HTTP Control | Header manipulation<br /><br />manipulation | Response headers can be inserted with specific values to enable debugging and identification of content delivered by in the client.<br /><br />s can be manipulated and modified according to specific conditions being present in the request and response details. | Established during configuration and changeable on request.<br /><br />These are specific to the configurations that they are applied to, being used for every response for a matched URL that has been requested. |
| Object response | Last Mile Acceleration | Last mile TCP acceleration | TCP optimizations are applied to control the opening and maintenance of the TCP window size during object transmission, reducing latency and Round Trips needed to deliver each object.<br /><br />Optimizations enable data packets to be consistently kept in flight across both highly latent or congested networks, and highly efficient ones. | Implemented by default and applied on a per-request basis.<br /><br />Options can be selected from based on the profile of the objects being delivered by each URL pattern configured. |

#### Static Content Acceleration and Delivery Features In Context {/*static-in-context*/}
This section illustrates key static content acceleration and delivery features involved in a request response flow.

Static content includes non-dynamic website content (such as images, CSS, and JavaScript) and file downloads (software releases and updates, downloadable content, and so on).

Web Site and Application Acceleration utilizes its feature set to optimize the request and response flow of static content to and from the content origin or application infrastructure in the following ways:

| Step | Web Features/  <br />Capabilities | Optimization Applied | Description | Implementation Options |
| --- | --- | --- | --- | --- |
| DNS Resolution And Initial Connection | Global - Premium service.<br /><br />Traffic Director | CDN Scale<br /><br />Persistent Connections to Browser<br /><br />Request Targeting | Services are targeted by end-users through DNS resolution at request time.<br /><br />DNS services target the appropriate POP for the request when the underlying Hostname is resolved. | Requests targeted to by are automatically serviced by the CDN configuration in place for that domain.<br /><br />Customer domains (example: [](https://www.mycompany.com/)www.mycompany.com)are ’d to a provided hostname (example: mycompany.hs.llnwd.net.)<br /><br />Traffic Director can be utilized to control content delivery options based on user location (Geo, IP) and to balance content delivery between services. |
| Secure Socket Connection | SSL Offload | SSL Termination | SSL is provided in all POPs and offers SSL termination at the for end users, lowering latency of the TLS negotiation.<br /><br />HTTP and HTTPS protocols can be used to communicate with the customer origin. | Customer certificates or -hosted certificates can be implemented for use.<br /><br />Single domain, wildcard, SAN and extended validation certificates can be used with Web Site and Application Acceleration. |
| Object request | HTTP Methods,<br /><br />Origin support | Origin Selection | Options for specifying origin location and header override options | Primary and backup origin servers<br /><br />Host-header override<br /><br />Cache hierarchies<br /><br />Error handling<br /><br />Header insertion to identify to the origin on cache-miss |
| Object Request | HTTP Control, Geographic Compliance, GeoIP Information, | Request Control<br /><br />Header Manipulation | Requests can be analyzed for their authenticity and denied or allowed to be serviced by the CDN based on combinations of the end users geographic location and information present in the URL. | Allow list or deny list countries from being able to access content via the CDN.<br /><br />URL tokenization enables URLs to be single or limited use, time bound and referrer bound.<br /><br />Request Headers can be added to include the users GeoIP information in the request to origin. |
| Object Request | Advanced Rules Engine | Rules on Request | Rules on request offer the opportunity for additional conditional logic to be performed at the point of the request being made to the CDN.<br /><br />Rules typically fall into the following categories and may consist of a combination of logical steps (not comprehensive):<br />- Analysis of:<br />headers, URL, query strings, or cookies for their presence or specific values<br />- Changes to: URLs, request headers, origin location, cookies. | Rules are determined and implemented during configuration. |
| Object request | Cache Efficiency, Content Freshness,<br /><br />Cache Hierarchy,<br /><br />Middle-Mile Acceleration, First-Mile Acceleration | Cache Calculations<br /><br />TTL Overrides<br /><br />Connection Meshing<br /><br />Origin Connectivity<br /><br />Connection Pooling<br /><br />TCP & WAN Acceleration | Requests for static content result in the server managing the request checking the local cache for the requested content. The location of the object is determined by a Cache Key, calculated on request and applied when content is initially cached.<br /><br />On cache-hit, the content is returned to the requesting user directly.<br /><br />Content freshness is determined through analysis of headers supplied by the content origin when content is initially cached. Overrides can be applied to deterministically control when content freshness checks will take place and how long content can remain in cache before the s must make a request to check that an object is still fresh.<br /><br />Requests that result in a or a content freshness check being needed are subsequently accelerated across the network in the same way as requests for dynamic content are. The responses are then analyzed for cacheability and returned to the end user. | Cache overrides are configured for each domain and path being accelerated and can be updated as needed.<br /><br />Cache hierarchies are established during configuration.<br /><br />Middle-mile acceleration is enabled by default for customers.<br /><br />Best practices are implemented for origin connectivity and can be amended as necessary for specific customer configurations. |
| Object Response | Advanced Rules Engine | Rules on Response. | Rules on response offer the opportunity for additional, conditional logic to be performed at the point of the response being sent to the end user.<br /><br />Rules typically fall into the following categories and may consist of a combination of logical steps (not comprehensive):<br /><br />Analysis of:<br /><br />Headers, URL, query strings, or cookies for their presence or specific values.<br /><br />Changes to:, response headers, cookies. | Rules are determined and implemented during configuration.<br /><br />Rules offer a flexible method of applying a required function. They are executed for each requested URL configuration, but being deterministic may not have to be applied each time. |
| Object Response | HTTP Control | Header Manipulation<br /><br />Manipulation | Response headers can be inserted with specific values to enable debugging and identification of content delivered by in the client.<br /><br />s can be manipulated and modified according to specific conditions being present in the request and response details. | Established during configuration and changeable on request.<br /><br />These are specific to the configurations that they are applied to, being used for every response for a matched URL that has been requested. |
| Object Response | Last-Mile Acceleration | Object Compression<br /><br />Last-Mile TCP Acceleration | Static content can be delivered as compressed objects to browsers that are able to de-compress them. This is commonly controlled through use of the VARY header. Compressed and uncompressed versions of the same object can be cached and delivered.<br /><br />TCP optimizations are applied to control the opening and maintenance of the TCP window size during object transmission, reducing latency and round trips needed to deliver each object.<br /><br />Optimizations enable data packets to be consistently kept in flight across both highly latent or congested networks, and highly efficient ones. | Implemented by default and applied on a per-request basis.<br /><br />Standard compression levels and best-practice sets of file types and sizes will be compressed by default.<br /><br />Content to be compressed can be altered as needed.<br /><br />More aggressive compression and options to compress larger options can be added.<br /><br />Large and small objects can be compressed when using HTTP or HTTPS.<br /><br />Options can be selected from, based on the profile of the objects being delivered by each URL pattern configured. |

## Delivery Optimization  {/*delivery-optimization*/}

The SmartPurge Rest API Guide appendix includes the following:

[Request Endpoint Schema](/delivery/delivery/smartpurge/smartpurge_rest_api/#request-endpoint-schema)

[Error Response Schema](/delivery/delivery/smartpurge/smartpurge_rest_api/#error-response-schema)

[Error Response Descriptions](/delivery/delivery/smartpurge/smartpurge_rest_api/#error-response-descriptions)

[HTTP Status Codes](/delivery/delivery/smartpurge/smartpurge_rest_api/#https-status-codes)

[API Client Sample Code](/delivery/delivery/smartpurge/smartpurge_rest_api/#api-client-sample-code)

## Analytics and Reporting  {/*analytics-and-reporting*/}

### View Reports in Control  {/*view-reports*/}
The reports provided by Control let you track overall traffic and detailed content usage for the Content Delivery service.

Reports are grouped by the major types of data they present. See [Reports](/delivery/control/reports).

You can use Content Delivery report data for a variety of purposes, including budget planning, marketing analytics and performance analysis and troubleshooting.

Report data can be displayed in hourly, daily, weekly, or monthly increments for both predefined and custom date ranges. All report charts are interactive and let you drag to zoom in on interesting data.

You can also set up any report to be emailed to you automatically at your preferred interval.

For more information, see [Reports](/delivery/control/reports).

### Access Report Data via the Realtime Reporting API  {/*access-report*/}
The Realtime Reporting API lets you programmatically access the data behind the EdgeQuery-powered reports in Control. You can use the Reporting API to integrate this data with other systems.

For more information, see the [Realtime Reporting REST API](https://support.limelight.com/public/openapi/realtimereporting/index.html) in the secure documentation site (under Support > Documentation in Control).

### Retrieve Logs  {/*retrieve-logs*/}
Edgio provides log data generated by worldwide Content Delivery servers via the Live Logs service. Live Logs are updated throughout the day as individual server log data is received and processed.

### Retrieve Download Completion Reports  {/*retrieve-download-completion-reports*/}
Download Completion Reports and Download Completion Geo Reports record the aggregate daily status of HTTP downloads.

For each URL, completion reports include the number of download requests initiated, the number and percentage of downloads completed, and may include optional geographic information. Both reports are available as .csv files through your FTP Account.

<Callout type="info">These reports are not included in the Content Delivery service and must be ordered separately.</Callout>

### Receive Real-Time Download Completion Receipts{/*receive-realtime-download-completion-receipts*/}
Download Completion Receipts are real time notifications of specific download events, and are sent in the form of HTTP GET requests to an IP address or URL you specify during setup.

Receipts are triggered by specific stages in the HTTP download process, and each receipt contains detailed information such as the URL of the requested object, the current download status, the IP address of the requesting client, and so on. The information is provided in predefined query terms appended to the GET request.

Note that if you are delivering a high volume of HTTP downloads, or expect significant download peaks, the receiving web server(s) should be able to handle the anticipated request load.

<Callout type="info">Download Completion Receipts are not included in the Content Delivery service, and must be ordered separately.</Callout>

## Rate Limiting  {/*rate-limiting*/}
If Edgio determines it is necessary, customer traffic may be rate limited (bandwidth controlled) on a per-PoP basis. Edgio reserves the right to rate limit traffic as needed to achieve the best overall experience for customers. Specific rate limiting parameters are determined in consultation with affected customers.

Rate limiting provides the following overall customer benefits:

- Service levels are maintained for all customers within individual POPs - even when user demand increases unexpectedly for specific content
- Individual user experience is improved in cases where content (such as video) must be delivered with a specified minimum bitrate, and the client is capable of taking action (such as delaying the end user, or redirecting traffic based) on an HTTP Status Code status code (see below)

For each affected POP, rate limiting parameters include:

- the affected customer Account and configuration(s)
- if needed, the targeted content (as specified by a pattern such as the file path, file name, or Regex)
- the bandwidth limitation (the throughput rate for all clients connected to that POP)
- an optional initial burst length to ignore(the number of bytes from the beginning of a response that should be exempt from rate limiting)

In cases where the maximum bandwidth has been reached, there are two configurable options:

- As new clients connect, overall throughput is adjusted for existing connections to maintain the maximum specified bandwidth, OR
- As new clients attempt to connect, existing connections are unaffected, and the new connections are rejected with a configurable HTTP Status Code (the default is 503).
