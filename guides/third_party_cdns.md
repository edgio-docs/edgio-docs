# Third-Party CDNs

{{ PRODUCT_NAME }} is designed and built to be the component of your site to which your users will directly connect to from their devices. Such components are colloquially known as "edge components". But sometimes you may prefer to run {{ PRODUCT_NAME }} behind a third-party CDN due to a pre-existing contract. {{ PRODUCT_NAME }} fully supports this use case but it's important to call out some common pitfalls with this kind of network topology.

## HTTP traffic

{{ PRODUCT_NAME }} does not support HTTP traffic and has a built-in redirect to HTTPS. That redirect relies on the value of `host` request header in order to form the value of `location` response header (e.g. a `host` value of `{{ DOCS_DOMAIN }}` will result in a `location` value of `{{ DOCS_URL }}`). When a third-party CDN is in front of {{ PRODUCT_NAME }}, the `host` header is not the public facing domain but rather the domain to which the downstream CDN is routing traffic. If the downstream CDN allows HTTP traffic to reach {{ PRODUCT_NAME }} then {{ PRODUCT_NAME }} will respond with an incorrect value in the `location` response header.

Options to solve these all rely on different ways of configuring the third-party CDN:

1. Add an HTTP to HTTPS redirect on the CDN rather than relying on {{ PRODUCT_NAME }}.
2. Rewrite the `location` header on the CDN whenever you see a response from {{ PRODUCT_NAME }}.
3. Use the {{ PRODUCT_NAME }} domain for IP resolution on the CDN but set the value for `host` to be the same as the public facing domain. In this case the {{ PRODUCT_NAME }} site has to be configured to accept requests with this header so that the reverse proxy works correctly.

## Split Testing

{{ PRODUCT_NAME }} offers fully featured [split testing](/guides/split_testing). When {{ PRODUCT_NAME }} is running behind another CDN, the CDN must be configured in a very specific way in order for split testing to work:

1. Downstream CDN must be configured to not [cache](#section_caching) anything.
2. The CDN must be configured to not affect any cookies that begin with [`{{ COOKIE_PREFIX }}_`](split_testing#section_how_requests_are_routed).

Unless these conditions are met, the users will almost certainly receive a mix of content from both experiences in the split test, which can lead to a broken app and invalid split testing results.

## Caching

When {{ PRODUCT_NAME }} is behind a third-party CDN, we strongly recommend that all caching on it be turned off. If you cannot do this for whatever reason, it is then your responsibility to purge the cache on {{ PRODUCT_NAME }} and only afterwards on CDN - in that exact order. Failing to do so will almost certainly lead to a situation where stale responses that you wanted to purge are served from {{ PRODUCT_NAME }} to your CDN and cached there as non-stale responses before {{ PRODUCT_NAME }} itself is purged (so-called cache poisoning).

Caching and traffic metrics are another area that is affected by CDN caching or any kind of traffic shaping where {{ PRODUCT_NAME }} no longer sees all the traffic that your site is serving. If the downstream CDN is caching responses then perceived cache hit ratio on {{ PRODUCT_NAME }} will be lower than it actually is ({{ PRODUCT_NAME }} would only serve cache misses but never cache hits). If the downstream CDN is routing some traffic away from {{ PRODUCT_NAME }}, then the traffic metrics will be affected as the {{ PRODUCT_NAME }} Developer Console will only provide statistics for the traffic that goes through {{ PRODUCT_NAME }}.

## IPs

When behind a third-party CDN, {{ PRODUCT_NAME }} will analyze `x-forwarded-for` to correctly extract the client IP from it and inject it into [`{{ HEADER_PREFIX }}-client-ip`](request_headers#section_general_headers). You can continue to use `{{ HEADER_PREFIX }}-client-ip` as you otherwise would.

## Access Logs

{{ PRODUCT_NAME }} access logs continue to function normally but since they are not on the edge they may not include all of the traffic that comes to your site.

## Allowing IPs

{{ PRODUCT_NAME }} does not block any validly formed HTTP traffic coming from any IP so there is no need to specifically allow the backend IPs of your third-party CDN.
