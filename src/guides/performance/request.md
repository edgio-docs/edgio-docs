---
title: Request
---

A request commonly contains the following components:

-   [Request Method](#request-method)
-   [Request Protocol Version](#request-protocol-version)
-   [Request URL](#request-url)
-   [Request Headers](#request-headers)
-   [Request Body](#request-body)

**Key information:**

-   By default, our edge servers will typically forward the entire request to your origin configuration. However, a rule or your CDN-as-code configuration can override the default CDN behavior.
-   Our CDN only accepts requests that comply with the HTTP specification (e.g., HTTP/1.1). We return a `400 Bad Request` for non-compliant requests.

## Request Flow {/*request-flow*/}

{{ PRODUCT }} routes requests according to traffic type and whether the request is eligible for caching.

-   **Standard Traffic:** By default, requests are routed to your web servers through an edge POP.

    ![](/images/v7/performance/request-flow-edge-origin.png)

    You can shield your web servers to improve cache efficiency, reduce the load on your servers, and reduce network bandwidth. If you have assigned at least one shield POP to your origin configuration, our edge POPs can funnel cache misses through a shield POP.

    ![](/images/overview/request-flow-edge-global.png)    

-   **Serverless Compute:** {{ PRODUCT }} routes Serverless Compute requests similar to standard traffic. However, cache misses are forwarded to a [Serverless Compute](/guides/performance/serverless_compute) load balancer which distributes requests to a Serverless Compute worker.

    ![](/images/overview/request-flow-serverless-compute.png)

## Request Method {/*request-method*/}

Every HTTP request must include instructions on how the request should be handled. This is known as an HTTP request method. The default manner in which our CDN service handles these request methods is described below.

| Request Method | Cache?  | Proxy? | Request Size Limit | Response Size Limit |
|---|---|---|---|---|
| GET | Yes  | Yes  | Request headers only  | Unlimited  |
|All other request methods (e.g., POST, PUT, and DELETE).   | No  | Yes | 100 MB  | Unlimited |

**Key information:**

-   By default, only `GET` requests are eligible for caching. Use the Enable Caching for Methods feature to allow caching for `POST` and/or `PUT` requests. Although you may enable caching for `POST` and `PUT` requests, purge is only supported for `GET` requests.
-   A request body should not be included when submitting a `GET` request.
-   The file size limit for the response provided by the CDN is determined by the client's operating system. 
-   Your CDN setup, including security measures, may place further restrictions on when content will be cached or proxied. 

### POST {/*post*/}

Our CDN accepts `POST` requests regardless of whether they contain a payload.

-   **No Payload:** A `POST` request that does not have a payload should include either a `Content-Length` or `Transfer-Encoding` request header. If the request does not contain either header, then our CDN automatically adds the following header: `Content-Length: 0`
-   **Payload:** A `POST` request that has a payload must also include either a `Content-Length` or `Transfer-Encoding` request header. Our CDN returns a `411 Length Required` error for `POST` requests that have payloads that are missing both of these request headers.

## Request Protocol Version {/*request-protocol-version*/}

The CDN service communicates using the HTTP protocol version (i.e., HTTP/1.0 or HTTP/1.1) defined in the request. The HTTP/2.0 protocol version is only used for the communication between the client and the edge of our network.

## Request URL {/*request-url*/}

By default, requests that are proxied through our network to an origin server will include the entire URL submitted by the client. If the requested URL includes a query string, then it will also be forwarded to the origin server. Request URLs, with the exception of the scheme and domain name, are case-sensitive.

## Request Headers {/*request-headers*/}

By default, {{ PRODUCT }} forwards all request headers to the origin server. However, we return a `400 Bad Request` if a request contains a header that does not comply with the HTTP specification (e.g., HTTP/1.1). For example, we will not accept a request with a header that contains whitespace between its name and the colon.

Our edge servers may also add or overwrite the following reserved request headers:

-   User-Agent
-   Via
-   X-Forwarded-For
-   X-Forwarded-Proto
-   X-Host
-   X-Midgress
-   Host
-   X-Gateway-List
-   X-EC-<NAME>
-   {{ HEADER_PREFIX }}-*`

<!--
### General headers {/*general-headers*/}

- `x-request-id`: unique request ID on {{ PRODUCT_NAME }} which may optionally be provided by you when issuing the requests to {{ PRODUCT_NAME }}
- `{{ HEADER_PREFIX }}-client-ip`: the client IP address from which the request to {{ PRODUCT_NAME }} edge components originated; cannot be used for user agent IP identification when [{{ PRODUCT_NAME }} is behind another CDN](/guides/performance/third_party_cdns)).
- `{{ HEADER_PREFIX }}-destination`: the routing destination as determined by traffic splitting rules if any; the name of the destinations are taken from {{ PRODUCT_NAME }} router code and if not specified then default is `default`
- `{{ HEADER_PREFIX }}-original-qs`: contains the original query string if [custom caching](/guides/performance/caching#customizing-the-cache-key) rules exclude query strings for the matching route; otherwise not set
- `{{ HEADER_PREFIX }}-protocol`: the protocol on which the connection to your site has been established; it can either be `https` or `http`; see more details [here](/guides/security/security_suite#ssl)

### User agent headers {/*user-agent-headers*/}

User agent headers are headers that {{ PRODUCT_NAME }} derives by analyzing the received `user-agent` request header.

- `{{ HEADER_PREFIX }}-device`: device type which can be `smartphone`, `tablet`, `mobile` (feature phones) or `desktop`
- `{{ HEADER_PREFIX }}-vendor`: vendor of the device which can be `apple`, `android` or `generic`
- `{{ HEADER_PREFIX }}-device-is-bot`: Indicates whether the request's user agent matches the user agent for a known bot. Returns `1` for known bots and `0` for all other requests.
- `{{ HEADER_PREFIX }}-browser`: browser type which can be `chrome`, `safari`, `firefox`, `opera`, `edge`, `msie` or `generic`

These values are provided as best effort as user agent, especially adversarial ones, can control the values by which we determine the values above.

### Geolocation headers {/*geolocation-headers*/}

Geolocation headers contain the geographical information about the provenance of the request. They are based on the IP of the actual request or, if overriding need is presented, on the content of `{{ HEADER_PREFIX }}-client-ip` request header.

- `{{ HEADER_PREFIX }}-geo-country-code`: the ISO 3166 two letter code for the country from which the request originated. See the Alpha-2 code column in the [list of ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for reference.
- `{{ HEADER_PREFIX }}-geo-state-code`: the two letter state code from which the request originated
- `{{ HEADER_PREFIX }}-geo-city`: the name of the city from which the request originated
- `{{ HEADER_PREFIX }}-geo-postal-code`: the ZIP or postal code from which the request originated
- `{{ HEADER_PREFIX }}-geo-latitude`: the geographical latitude from which the request originated
- `{{ HEADER_PREFIX }}-geo-longitude`: the geographical longitude from which the request originated
- `{{ HEADER_PREFIX }}-geo-asn`: the autonomous system number of the network operator from which the request originated

These values are provided as a best effort. {{ PRODUCT_NAME }} cannot guarantee the accuracy of geolocation based on the client's IP address. See also [geolocation](/guides/third_party_cdns#client-ips) behind [third-party CDNs](/guides/third_party_cdns).
-->

### Static prerendering headers {/*static-prerendering-headers*/}

- `{{ HEADER_PREFIX }}-preload`: Will be "1" if the request originated from [Static Prerendering](/guides/static_prerendering). Otherwise this header will not be present.

## Request Body {/*request-body*/}

Requests that are proxied through our network to an origin server will include a request body except if either of the following conditions are true:

-   A `GET` request is submitted.
-   The request is redirected due to the Follow Redirects feature.