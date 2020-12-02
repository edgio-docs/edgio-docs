# Request Headers

This guide covers the headers that Moovweb XDN injects into requests making them visible to your server code.

## General headers

* `x-request-id`: unique request ID on Moovweb XDN which may optinally be provided by you when issuing the requests to XDN
* `x-xdn-client-ip`: client IP from which the request originated *or* first IP in `x-forwarded-for` is already present (which may happen when [XDN is behind another CDN](third_party_cdns)).
* `x-xdn-destination`: the routing destination as determined by traffic splitting rules if any; the name of the destinations are taken from Moovweb XDN router code and if not specified then default is `default`
* `x-xdn-original-qs`: contains the original query string if [custom caching](caching#section_customizing_the_cache_key) rules exclude query strings for the matching route; otherwise not set
* `x-xdn-protocol`: the protocol on which the connection to your site has been established; it can either be `https` or `http`; see more details [here](security#section_ssl)

## User agent headers

User agent headers are headers that Moovweb XDN derives by analyzing the received `user-agent` request header.

- `x-xdn-device`: device type which can be `smartphone`, `tablet`, `mobile` (feature phones) or `desktop`
- `x-xdn-vendor`: vendor of the device which can be `apple`, `android` or `generic`
- `x-xdn-device-is-bot`: flag indicating a bot device (`0` for not identified as bot, `1` for identified as bot)
- `x-xdn-browser`: browser type which can be `chrome`, `safari`, `firefox`, `opera`, `edge`, `msie` or `generic`

These values are provided as best effort as user agent, especially adversarial ones, can control the values by which we determine the values above.

## Geolocation headers

Geolocation headers contain the geographical information about the provenance of the request. They are based on the IP of the actual request or, if overriding need is presented, on the content of `x-xdn-client-ip` request header.

- `x-xdn-geo-country-code`: two letter country code from which the request originated
- `x-xdn-geo-city`: the name of the city from which the request originated
- `x-xdn-geo-postal-code`: the ZIP or postal code from which the request originated
- `x-xdn-geo-latitude`: the geographical latitude from which the request originated
- `x-xdn-geo-longitude`: the geographical longitude from which the request originated

These values are provided as best effort as Moovweb cannot guarantee that client IP to geographical location is always accurate.

## Static prerendering headers

- `x-xdn-preload`: Will be "1" if the request originated from [Static Prerendering](/guides/static_prerendering). Otherwise this header will not be present.
