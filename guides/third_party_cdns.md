# Third-Party CDNs

{{ PRODUCT_NAME }} is designed and built to be the component of your site to which your users will directly connect to from their devices. Such components are colloquially known as "edge components". But sometimes you may prefer to run {{ PRODUCT_NAME }} behind a third-party CDN due to a pre-existing contract. {{ PRODUCT_NAME }} fully supports this use case but it's important to call out some common pitfalls with this kind of network topology.

## HTTP traffic protocol

In order for {{ PRODUCT_NAME }} to correctly determine the HTTP protocol (HTTP or HTTPS) used by the user agent, the third-party party CDN must use the same protocol that the user agent used. Thus, if the user agent has connected with HTTPS, the request passed to {{ PRODUCT_NAME }} must also be HTTPS, otherwise a security hole has been created, ripe for the man-in-the-middle attack. Conversely, if the user agent connected with HTTP, the request passed to {{ PRODUCT_NAME }} must also be HTTP so that the router rules that depend on the protocol continue to work correctly.

## Redirects

By default, {{ PRODUCT_NAME }} automatically redirects all HTTP traffic to HTTPS by issuing a 301 Moved Permanently redirect response. That redirect relies on the value of the `host` request header in order to form the value of the `location` response header (e.g., a `host` header value of `{{ DOCS_DOMAIN }}` will result in a `location` value of `{{ DOCS_URL }}`). When a third-party CDN is in front of {{ PRODUCT_NAME }}, the `host` header may not be the public-facing domain but rather a domain to which the third-party CDN is routing traffic. In that case, the `location` header will have an incorrect value leading to an "escape" of the site from the public-facing domain to the private domain hosted on {{ PRODUCT_NAME }}. 

The same issue may affect all the custom redirects issued from {{ PRODUCT_NAME }} using the `redirect` router function or when leveraging the environment redirects feature.

There are two major techniques to solve these problems:

1. Configuring the third-party CDN to rewrite the `location` header whenever it sees such a response from {{ PRODUCT_NAME }}.
2. Configuring {{ PRODUCT_NAME }} to serve the traffic on the same public facing domain and configuring the third-party CDN to send the traffic to {{ PRODUCT_NAME }} edge IPs with the public facing domain in the `host` header.

## Split Testing

{{ PRODUCT_NAME }} offers fully featured [split testing](/guides/split_testing). When {{ PRODUCT_NAME }} is running behind another CDN, the CDN must be configured in a very specific way in order for split testing to work:

1. Third-party CDN must be configured to not [cache](#section_caching) anything.
2. The CDN must be configured to not affect any cookies that begin with [`{{ COOKIE_PREFIX }}_`](split_testing#section_how_requests_are_routed).

Unless these conditions are met, the users will almost certainly receive a mix of content from both experiences in the split test, which can lead to a broken app and invalid split testing results.

## Caching

When {{ PRODUCT_NAME }} is behind a third-party CDN, we strongly recommend that all caching on it be turned off. If, for whatever reason, you cannot do this, it is then your responsibility to first purge the cache on {{ PRODUCT_NAME }}, and only afterwards on CDN - in that exact order. Failing to do so will almost certainly lead to a situation where stale responses that you wanted to purge are served from {{ PRODUCT_NAME }} to your CDN and cached there as non-stale responses before {{ PRODUCT_NAME }} itself is purged (so-called cache poisoning).

Caching and traffic metrics are another area that is affected by CDN caching or any kind of traffic shaping where {{ PRODUCT_NAME }} no longer sees all the traffic that your site is serving. If the third-party CDN is caching responses, then the perceived cache hit ratio on {{ PRODUCT_NAME }} will be lower than it actually is ({{ PRODUCT_NAME }} would only serve cache misses but never cache hits). If the third-party CDN is routing some traffic away from {{ PRODUCT_NAME }}, then the traffic metrics will be affected as the {{ PRODUCT_NAME }} Developer Console will only provide statistics for the traffic that goes through {{ PRODUCT_NAME }}.

## Client IPs

When behind a third-party CDN, there is no way for {{ PRODUCT_NAME }} to securely determine the IP of the user agent that originated the request, hence the `{{ HEADER_PREFIX }}-client-ip` header will contain the IP of the third-party CDN rather than the actual user agent. Relying on headers like `x-forwarded-for` to determine the IP necessarily introduces a security hole where attackers can simply spoof the IP and work around IP allow/block and geolocation blocking features of the plaform. Since {{ PRODUCT_NAME }} uses the client IP to determine the [geolocation headers](/guides/request_headers#section_geolocation_headers), this means that geolocation headers will also have incorrect values.

In this situation, it is your responsibility to correctly set the client IP header and the dependent geolocation headers and pass it that way to {{ PRODUCT_NAME }} and upstream servers.

For example, if you wish to set the `{{ HEADER_PREFIX }}-client-ip` and related geolocation header, to the header values injected by the third-party CDN, you can add a shim for this which go at the top of your router:

```js
.match('/:splat*', ({ setRequestHeader, removeRequestHeader }) => {
    setRequestHeader('{{ HEADER_PREFIX }}-client-ip', '${req:x-your-cdn-client-ip-header}')
    removeRequestHeader('x-your-cdn-client-ip-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-country-code', '${req:x-your-cdn-geo-country-code-header}')
    removeRequestHeader('x-your-cdn-geo-country-code-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-state-code', '${req:x-your-cdn-geo-state-code-header}')
    removeRequestHeader('x-your-cdn-geo-state-code-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-city', '${req:x-your-cdn-geo-city-header}')
    removeRequestHeader('x-your-cdn-geo-city-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-postal-code', '${req:x-your-cdn-geo-postal-code-header}')
    removeRequestHeader('x-your-cdn-geo-postal-code-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-latitude', '${req:x-your-cdn-geo-latitude-header}')
    removeRequestHeader('x-your-cdn-geo-latitude-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-longitude', '${req:x-your-cdn-geo-longitude-header}')
    removeRequestHeader('x-your-cdn-geo-longitude-header')
    setRequestHeader('{{ HEADER_PREFIX }}-geo-asn', '${req:x-your-cdn-geo-asn-header}')
    removeRequestHeader('x-your-cdn-geo-asn-header')
})
```

## Security

As mentioned above, when not running on edge, it is impossible for {{ PRODUCT_NAME }} to securely determine the client IP and other parameters on which the {{ PRODUCT_NAME }} security features rely. We strongly recommend that in that case, all security be performed on the third-party CDN.

## Access Logs

{{ PRODUCT_NAME }} access logs continue to function normally but since they are not on the edge they may not include all of the traffic that comes to your site.

## Allowing IPs

{{ PRODUCT_NAME }} does not block any validly formed HTTP traffic coming from any IP so there is no need to specifically allow the backend IPs of your third-party CDN.
