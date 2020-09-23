# Third Party CDNs

Moovweb XDN is designed and built to be the component of your site that your users will directly connect to from their devices. Such components are colloquially known as "edge components". But sometimes you may prefer, usually not due to technical reasons, to run XDN behind a third-party CDN. XDN fully supports this use case but it's important to call out some common pitfals with this kind of network topology.

## Split Testing

Moovweb XDN offers fully featured [split testing](/guides/split_testing) but when running behind another CDN, you must configure that CDN in a very [specific way](split_testing#section_third_party_cdns)

## IPs

When behind a third-party CDN, Moovweb XDN will analyze `x-forwarded-for` to correctly extract the client IP from it and inject it into [`x-xdn-client-ip`](request_headers#section_general_headers). You can continue to use `x-xdn-client-ip` as you otherwise would.

## Caching

When the XDN is behind a third-party CDN, we strongly recommend that all caching on it be turned off. If you cannot do this for whatever reason, it is then your responsibility to purge the cache on XDN and only afterwards on CDN - in that exact order. Failing to do so will almost certainly lead to a situation where stale responses that you wanted to purge are served from the XDN to your CDN and cached there as non-stale responses before XDN itself is purged (so-called cache poisoning).

Caching and traffic metrics are another area that is affected by CDN caching or any kind of traffic shaping where the XDN no longer sees all the traffic that your site is serving. If the downstream CDN is caching responses then perceived cache hit ratio on the XDN will be lower than it actually is (the XDN would only serve cache misses but never cache hits). If the downstream CDN is routing some traffic away from the XDN, then the traffic metrics will be affected as the XDN Developer Console will only provide statistics for the traffic that goes through the XDN.

## Access Logs

Moovweb XDN access logs continue to function normally but since they are not on the edge they may not include all of the traffic that comes to your site.

## Whitelisting

Moovweb XDN does not block any validly formed HTTP traffic coming from any IP so there is no need to specifically whitelist the backend IPs of your third party CDN.
