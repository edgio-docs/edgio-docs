---
title: Request
---

Learn about reserved request headers and how requests are routed through our service.

## Request Flow {/*request-flow*/}

{{ PRODUCT }} routes requests according to traffic type.

-   **Standard Traffic:** By default, requests are routed to an origin server through an edge POP (L1) and a global POP (L2). This behavior maximizes cache hits and shields your origin servers by funneling all cache misses through a global POP. 

    ![](/images/overview/request-flow-edge-global.png)

    [View image.](/images/overview/request-flow-edge-global.png)

    {{ PRODUCT }} is optimized for performance and therefore always routes requests to the closest POP. If a global POP is the closest POP to a client, then {{ PRODUCT }} will treat it as an edge and global POP. This means that cache misses on that POP are sent directly to the origin server as illustrated below.

    ![](/images/overview/request-flow-edge.png)
-   **Serverless Compute:** {{ PRODUCT }} routes Serverless Compute requests similar to standard traffic. However, cache misses are forwarded to a [Serverless Compute](serverless_functions) load balancer which distributes requests to a Serverless Compute Lambda worker.

    ![](/images/overview/request-flow-serverless-compute.png)

    [View image.](/images/overview/request-flow-serverless-compute.png)

### POP Components {/*pop-components*/}

All POPs have the following components:

-   **HAProxy**: This component load balances requests to Varnish.
-   **Varnish**: This component is a web application accelerator that is responsible for cache management.
-   **Dynamic Proxy Service (DPS)**: This component forwards requests from Varnish to an origin server. 

Requests are routed through the above components in the following order:

`HAProxy -> Varnish -> DPS`

If a request is routed to an orign server through both an edge and global POP, then it will be routed through the above components twice:

` Client -> Edge POP (HAProxy -> Varnish -> DPS) -> Global POP (HAProxy -> Varnish -> DPS) -> Origin Server`

## Reserved Request Headers {/*request-headers*/}
{{ PRODUCT }} injects headers into requests making them visible to your server code. 

<Callout type="important">

  Request headers that start with `{{ HEADER_PREFIX }}-*` are reserved for use by {{ PRODUCT }}. You may not modify these request headers. 

  [Learn more.](limits#prohibited-headers)

</Callout>

### General headers {/*general-headers*/}

- `x-request-id`: unique request ID on {{ PRODUCT_NAME }} which may optinally be provided by you when issuing the requests to {{ PRODUCT_NAME }}
- `{{ HEADER_PREFIX }}-client-ip`: the client IP address from which the request to {{ PRODUCT_NAME }} edge components originated; cannot be used for user agent IP identification when [{{ PRODUCT_NAME }} is behind another CDN](third_party_cdns)).
- `{{ HEADER_PREFIX }}-destination`: the routing destination as determined by traffic splitting rules if any; the name of the destinations are taken from {{ PRODUCT_NAME }} router code and if not specified then default is `default`
- `{{ HEADER_PREFIX }}-original-qs`: contains the original query string if [custom caching](caching#customizing-the-cache-key) rules exclude query strings for the matching route; otherwise not set
- `{{ HEADER_PREFIX }}-protocol`: the protocol on which the connection to your site has been established; it can either be `https` or `http`; see more details [here](security#ssl)

### User agent headers {/*user-agent-headers*/}

User agent headers are headers that {{ PRODUCT_NAME }} derives by analyzing the received `user-agent` request header.

- `{{ HEADER_PREFIX }}-device`: device type which can be `smartphone`, `tablet`, `mobile` (feature phones) or `desktop`
- `{{ HEADER_PREFIX }}-vendor`: vendor of the device which can be `apple`, `android` or `generic`
- `{{ HEADER_PREFIX }}-device-is-bot`: flag indicating a bot device (`0` for not identified as bot, `1` for identified as bot)
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

### Static prerendering headers {/*static-prerendering-headers*/}

- `{{ HEADER_PREFIX }}-preload`: Will be "1" if the request originated from [Static Prerendering](/guides/static_prerendering). Otherwise this header will not be present.
