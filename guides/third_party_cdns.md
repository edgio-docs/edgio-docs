# Third Party CDNs

Moovweb XDN is designed and built to be the component of your site that your users will directly connect to from their devices. Such components are colloquially known as "edge components". But sometimes you may prefer, usually not due to technical reasons, to run XDN behind a third-party CDN. XDN fully supports this use case but it's important to call out some common pitfals with this kind of network topology.

## Split Testing

Moovweb XDN offers fully featured [split testing](/guides/split_testing) but when running behind another CDN, you must configure that CDN in a very [specific way](split_testing#section_third_party_cdns)

## IPs

When behind a third-party CDN, Moovweb XDN will analyze `x-forwarded-for` to correctly extract the client IP from it and inject it into `x-xdn-client-ip`. You can continue to use `x-xdn-client-ip` as you otherwise would.

## Caching

When XDN is behind a third-party CDN, we most strongly recommend that all caching on it be turned off. If you cannot do this for whatever reason, it is then your responsibility to purge the cache on XDN and only afterwards on CDN - in that exact order. Failing to do so will almost certainly lead to a situation where stale responses that you wanted to purge are served from XDN to your CDN and cached there as non-stale responses before XDN itself is purged (so-called cache poisoning)

Caching and traffic metrics are another area that is affected by CDN caching or any kind of traffic shaping where XDN no longer sees all the traffic that your site is serving. If downstream CDN is caching then perceived cache hit ration on XDN will be lower than it actually is (XDN would only see cache misses but never see cache hits). If downstream CDN is routing some traffic away from XDN, then the traffic metrics will be affected as XDN will only account the traffic that goes through it.

## Access Logs

Moovweb XDN access log continue to function normally but since they are not on the edge they may not be capturing all the traffic that is coming to your site.

## Whitelisting

Moovweb XDN does not block any validly formed HTTP traffic coming from any IP so there is no need to specifically whitelist the backend IPs of your third party CDN.
