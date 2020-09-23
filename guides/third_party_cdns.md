# Third Party CDNs

Moovweb XDN is designed and built to be the component of your site that your users will directly connect to from their devices. Such components are colloquially known as "edge components". But sometimes you may prefer, usually not due to technical reasons, to run XDN behind a third-party CDN. XDN fully supports this use case but it's important to call out some common pitfals with this kind of network topology.

## HTTP traffic

Moovweb XDN does not support HTTP traffic and has a built-in redirect to HTTPS. That redirect relies on the value of `host` request header in order to form the value of `location` response header (e.g. `host` value of `developer.moovweb.com` will result in `location` value of `https://developer.moovweb.com`). When a third-party CDN is in front of XDN, the `host` header is not the public facing domain but rather then XDN domain to which downstream CDN is routing traffic. If downstream CDN allows HTTP traffic to reach XDN then XDN will respond with incorrect value in `location` response header.

Options to solve these all rely on different ways of configuring the third-party CDN:

1. Add HTTP to HTTPS redirect on the CDN rather than relying on XDN.
2. Rewrite `location` header on the CDN whenever you see response from XDN.
3. Use XDN domain for IP resolution on the CDN but set the value for `host` to be the same as public facing domain. In this case XDN site has to be configured to accept requests with this header so that the reverse proxy works correctly.

## Split Testing

Moovweb XDN offers fully featured [split testing](/guides/split_testing) but when running behind another CDN, you must configure that CDN in a very [specific way](https://developer.moovweb.com/guides/split_testing#section_third_party_cdns)

## IPs

When behind a third-party CDN, Moovweb XDN will analyze `x-forwarded-for` to correctly extract the client IP from it and inject it into `x-xdn-client-ip`. You can continue to use `x-xdn-client-ip` as you otherwise would.

## Caching

When XDN is behind a third-party CDN, we most strongly recommend that all caching on it be turned off. If you cannot do this for whatever reason, it is then your responsibility to purge the cache on XDN and only afterwards on CDN - in that exact order. Failing to do so will almost certainly lead to a situation where stale responses that you wanted to purge are served from XDN to your CDN and cached there as non-stale responses before XDN itself is purged (so-called cache poisoning)

Caching and traffic metrics are another area that is affected by CDN caching or any kind of traffic shaping where XDN no longer sees all the traffic that your site is serving. If downstream CDN is caching then perceived cache hit ration on XDN will be lower than it actually is (XDN would only see cache misses but never see cache hits). If downstream CDN is routing some traffic away from XDN, then the traffic metrics will be affected as XDN will only account the traffic that goes through it.

## Access Logs

Moovweb XDN access log continue to function normally but since they are not on the edge they may not be capturing all the traffic that is coming to your site.

## Whitelisting

Moovweb XDN does not block any validly formed HTTP traffic coming from any IP so there is no need to specifically whitelist the backend IPs of your third party CDN.
