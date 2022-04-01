# Request Headers

This guide covers the headers that {{ PRODUCT_NAME }} injects into requests making them visible to your server code.

## General headers

- `x-request-id`: unique request ID on {{ PRODUCT_NAME }} which may optinally be provided by you when issuing the requests to {{ PRODUCT_NAME }}
- `{{ HEADER_PREFIX }}-client-ip`: the client IP address from which the request to {{ PRODUCT_NAME }} edge components originated; cannot be used for user agent IP identification when [{{ PRODUCT_NAME }} is behind another CDN](third_party_cdns)).
- `{{ HEADER_PREFIX }}-destination`: the routing destination as determined by traffic splitting rules if any; the name of the destinations are taken from {{ PRODUCT_NAME }} router code and if not specified then default is `default`
- `{{ HEADER_PREFIX }}-original-qs`: contains the original query string if [custom caching](caching#section_customizing_the_cache_key) rules exclude query strings for the matching route; otherwise not set
- `{{ HEADER_PREFIX }}-protocol`: the protocol on which the connection to your site has been established; it can either be `https` or `http`; see more details [here](security#section_ssl)

## User agent headers

User agent headers are headers that {{ PRODUCT_NAME }} derives by analyzing the received `user-agent` request header.

- `{{ HEADER_PREFIX }}-device`: device type which can be `smartphone`, `tablet`, `mobile` (feature phones) or `desktop`
- `{{ HEADER_PREFIX }}-vendor`: vendor of the device which can be `apple`, `android` or `generic`
- `{{ HEADER_PREFIX }}-device-is-bot`: flag indicating a bot device (`0` for not identified as bot, `1` for identified as bot)
- `{{ HEADER_PREFIX }}-browser`: browser type which can be `chrome`, `safari`, `firefox`, `opera`, `edge`, `msie` or `generic`

These values are provided as best effort as user agent, especially adversarial ones, can control the values by which we determine the values above.

## Geolocation headers

Geolocation headers contain the geographical information about the provenance of the request. They are based on the IP of the actual request or, if overriding need is presented, on the content of `{{ HEADER_PREFIX }}-client-ip` request header.

- `{{ HEADER_PREFIX }}-geo-country-code`: the ISO 3166 two letter code for the country from which the request originated. See the Alpha-2 code column in the [list of ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for reference.
- `{{ HEADER_PREFIX }}-geo-state-code`: the two letter state code from which the request originated
- `{{ HEADER_PREFIX }}-geo-city`: the name of the city from which the request originated
- `{{ HEADER_PREFIX }}-geo-postal-code`: the ZIP or postal code from which the request originated
- `{{ HEADER_PREFIX }}-geo-latitude`: the geographical latitude from which the request originated
- `{{ HEADER_PREFIX }}-geo-longitude`: the geographical longitude from which the request originated
- `{{ HEADER_PREFIX }}-geo-asn`: the autonomous system number of the network operator from which the request originated

These values are provided as a best effort. {{ PRODUCT_NAME }} cannot guarantee the accuracy of geolocation based on the client's IP address. See also [geolocation](/guides/third_party_cdns#section_client_ips) behind [third-party CDNs](/guides/third_party_cdns).

## Static prerendering headers

- `{{ HEADER_PREFIX }}-preload`: Will be "1" if the request originated from [Static Prerendering](/guides/static_prerendering). Otherwise this header will not be present.
