# Response Headers

This guide describes the headers that {{ PRODUCT_NAME }} injects into responses, making them visible to your client code.

## General Headers

- `{{ HEADER_PREFIX }}-version`: version fingerprint that includes {{ PRODUCT_NAME }} version number, site build number and UTC timestamp of the build
- `{{ HEADER_PREFIX }}-t`: telemetry measurements for all the components in {{ PRODUCT_NAME }} critical path that served your request
- `{{ HEADER_PREFIX }}-request-id`: the unique ID of the request on {{ PRODUCT_NAME }} infrastructure
- `{{ HEADER_PREFIX }}-hit-request-id`: the unique ID of the request whose cached response is being returned (not present if cache miss)
- `{{ HEADER_PREFIX }}-caching-status`: indicates why a response was or was not cached. See [Caching](/guides/caching#section_why_is_my_response_not_being_cached_).
- `{{ HEADER_PREFIX }}-surrogate-key`: a space separated list of secondary cache keys used for [cache clearing](/guides/purging#surrogate_keys)

### Structure of `{{ HEADER_PREFIX }}-t`

The format is `{{ HEADER_PREFIX }}-t: <id>=<time>[,<id2>=<time2>...]`

`{{ HEADER_PREFIX }}-t` is an ordered list of telemetry measurements; values are **prepended** at response time. Thus, from left to right, measurements are ordered from the outermost edge component to the innermost cloud component that handled the request.

All times are in milliseconds.

***
**Note**: When a request is reentrant, telemetry information is not duplicated; instead, each request logs its own telemetry but does not return it to the downstream Layer0 request. As a result, duplicate entries are not possible.
***


#### Component Names and Prefixes

Component names within the header are abbreviated: 

| Abbreviation | Component Name |
| ------------ | -------------- |
| eh  | HAProxy on edge POP              |
| ec  | Varnish cache on edge POP        |
| ed  | DPS on edge POP                  |
| gh | HAProxy on global POP            |
| gc | Varnish cache on global POP      |
| gd | DPS on global POP                |
| p  | XDN Buffer Proxy                 |
| w  | Lambda workers                   |


#### Telemetry Types
| Type | Description |
| ------------ | -------------- |
| t | Total time (example: `eht`) total time as measured by edge HAProxy) |
| f | Fetch time (example: `gdf`) total fetch time time as measured by global DPS) |
| c | Cache status (example: `ecc=miss,...,gcc=hit`) miss on the edge pop, hit on the global pop |
 
#### Example
A response that traversed from the edge, to global, to serverless might look like this:


`< x-0-components: eh=0.1.6,e=atl,ec=1.1.0,ed=1.0.1,gh=0.1.6,g=hef,gd=1.0.1,p=1.21.10,w=3.11.0,wi=e8ce8753-163d-4be9-a39e-40454ace5146,b=serverless`
`< x-0-t: eh=1020,ect=1019,ecc=miss,edt=1015,edd=0,edf=1015,gh=952,gct=950,gcc=miss,gdt=945,gdd=24,gdf=921,pt=912,pc=1,pf=912,wm=79,wt=299,wc=1,wa=402,wl=299,wr=21,wp=233,wz=0`
`< x-0-status: eh=200,ed=200,gh=200,gd=200,p=200,w=200`


## server-timing

{{ PRODUCT_NAME }} adds the following values to the standard [server-timing](https://www.w3.org/TR/server-timing/) response header:

- layer0-cache: desc=`value` - value will be one of:
  - `HIT-L1` - The page was served from the edge cache
  - `HIT-L2` - The page was served from the shield cache
  - `MISS` - The page could not be served from the cache
- country: desc=`country_code` - where country_code is the two letter code of the country from which the request was sent.
- xrj: desc=`route` - where route is the matched route serialized as JSON.

## Troubleshooting Headers

The following headers are used internally by {{ PRODUCT_NAME }} staff to troubleshoot issues with requests.

- `{{ HEADER_PREFIX }}-status`: HTTP status that each component in {{ PRODUCT_NAME }} returned (can vary depending on the component)
- `{{ HEADER_PREFIX }}-components`: version of various components in {{ PRODUCT_NAME }} critical path that serviced your request
