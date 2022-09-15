---
title: Response Headers
---

This guide describes the headers that {{ PRODUCT_NAME }} injects into responses, making them visible to your client code. Note that the `{{ HEADER_PREFIX }}-*` headers namespace is reserved for {{ PRODUCT_NAME }} internal use and setting them yourself, except where so noted, is unsupported. See [Prohibited Headers](limits#prohibited-headers) for more information.

## General Headers {/*general-headers*/}

- `{{ HEADER_PREFIX }}-version`: version fingerprint that includes {{ PRODUCT_NAME }} version number, site build number and UTC timestamp of the build
- `{{ HEADER_PREFIX }}-t`: telemetry measurements for all the components in {{ PRODUCT_NAME }} critical path that served your request
- `{{ HEADER_PREFIX }}-request-id`: the unique ID of the request on {{ PRODUCT_NAME }} infrastructure
- `{{ HEADER_PREFIX }}-hit-request-id`: the unique ID of the request whose cached response is being returned (not present if cache miss)
- `{{ HEADER_PREFIX }}-caching-status`: indicates why a response was or was not cached. See [Caching](/guides/caching#section_why_is_my_response_not_being_cached_).
- `{{ HEADER_PREFIX }}-surrogate-key`: a space separated list of secondary cache keys used for [cache clearing](/guides/purging#surrogate_keys) that can be injected when needed into your backend responses.

### Structure of `{{ HEADER_PREFIX }}-t` {/*structure-of-x-0-t*/}

The format is `{{ HEADER_PREFIX }}-t: <id>=<time>[,<id2>=<time2>...]`

`{{ HEADER_PREFIX }}-t` is an ordered list of telemetry measurements; values are **prepended** at response time. Thus, from left to right, measurements are ordered from the outermost edge component to the innermost cloud component that handled the request.

All times are in milliseconds.

The following structure is important to note when reading the telemtry data:

All POPs have the same components:
* HAProxy -> Varnish -> DPS
* L1 is Edge w/ HAProxy -> Varnish -> DPS -> Global POP
* L2 is Global w/ HAProxy -> Varnish -> DPS  -> backend (user defined backend from [layer0.config](https://docs.layer0.co/guides/layer0_config#section_backends) | [static page](https://docs.layer0.co/guides/static_sites#section_router_configuration) | Serverless Load Balancer->[Serverless](https://docs.layer0.co/guides/serverless_functions#section_serverless_functions))

<Callout type="info">

  When a request is reentrant, telemetry information is not duplicated; instead, each request logs its own telemetry but does not return it to the downstream {{ PRODUCT_NAME }} request. As a result, duplicate entries are not possible.

</Callout>

#### Component Names and Prefixes {/*component-names-and-prefixes*/}

Component names within the header are abbreviated:

| Abbreviation | Component Name                    |
|--------------|-----------------------------------|
| e            | Edge POP ID                       |
| eh           | HAProxy on edge POP               |
| ec           | Varnish cache on edge POP         |
| ed           | DPS on edge POP                   |
| ek           | Kolben on edge POP                |
| g            | Global POP ID                     |
| gh           | HAProxy on global POP             |
| gc           | Varnish cache on global POP       |
| gd           | DPS on global POP                 |
| p            | Serverless Load Balancer          |
| w            | Lambda workers                    |
| pu           | Proxy upstream or customer origin |

#### Telemetry Types {/*telemetry-types*/}
| Type | Description |
| ------------ | -------------- |
| t | Total time (example: `eht`) total time as measured by edge HAProxy) |
| f | Fetch time (example: `gdf`) total fetch time as measured by global DPS) |
| u | Upstream fetch time (example: `pu` total upstream fetch time as measured by serverless load balancer, requested through WAF)
| c | Cache status (example: `ecc=miss,...,gcc=hit`) miss on the edge pop, hit on the global pop |
| bt | Billed time (example: `wbt`) serverless billed time as measured by serverless load balancer) |

### Examples {/*examples*/}
The examples below use a response that traversed from the edge, to global and to serverless:
##### _{{ HEADER_PREFIX }}-t_ {/*-header_prefix--t*/}
<!-- `{{ HEADER_PREFIX }}-t: eh=1160,ect=1158,ecc=miss,edt=1152,edd=0,edf=1152,gh=869,gct=866,gcc=miss,gdt=853,gdd=0,gdf=853,pt=811,pc=1,pf=809,wbt=723,wm=317,wt=722,wc=19,wg=746940,wl=30896,wr=1,wp=705,wa=1,wz=1` -->
`eh=1160,ect=1158,ecc=miss,edt=1152,edd=0,edf=1152,gh=869,gct=866,gcc=miss,gdt=853,gdd=0,gdf=853,pt=811,pc=1,pf=809,wbt=723,wm=317,wt=722,wc=19,wg=746940,wl=30896,wr=1,wp=705,wa=1,wz=1`

Below is a translation of each value in this example:

| Value | Description |
| -------------- | -------------- |
| `eh=1160`  | Edge POP total time of 1160ms |
| `ect=1158` | Edge POP Varnish total time of 1158ms |
| `ecc=miss` | Edge POP Cache Miss, on miss the request will go to global POP |
| `edt=1152` | Edge POP DPS total time of 1015ms |
| `edd=0`    | Edge DPS DNS lookup time of 0ms (We do DNS caching in DPS to accerate requests, so 0 is common and expected) |
| `edf=1152` | Edge DPS Fetch time of 1152ms |
| `gh=869`   | Global POP HAProxy total time of 869ms |
| `gct=866`  | Global POP Varnish total time of 866ms |
| `gcc=miss` | Global POP Cache Miss - on miss request will go to backend |
| `gdt=853`  | Global POP DPS total time of 853ms |
| `gdd=0`    | Global POP DNS Lookup time of 0ms (implying cached DNS lookup) |
| `gdf=853`  | Global POP DPS fetch time to backend of 853ms |
| `pt=811`   | Serverless Load Balancer Total time of 811ms |
| `pc=1`     | Serverless Load Balancer total request count. if > 1 it implies scaling where we had to queue and retry this request |
| `pf=809`   | Serverless Load Balancer Total Fetch time to serverless of 809ms |
| `wbt=723`  | Serverless billed time of 723ms. This includes serverless workload time plus time spent capturing serverless logs. |
| `wm=317`   | Serverless worker memory used 317mb |
| `wt=722`   | Serverless workload time of 722ms |
| `wc=19`    | Number of times this specific serverless instance has been invoked (19) |
| `wg=746940`| Age of this serverless instance of 749s |
| `wl=30896` | Sum of worker times across all requests of 30.8s |
| `wr=1`     | Time spent evaluating route of 1ms|
| `wp=705`   | Worker fetch or proxy time of 705ms |
| `wa=1`     | `transformRequest` time |
| `wz=1`     | If the route is using `transformResponse`, this is the `transformResponse` time in ms. If the route does not contain a transform, but contains an image optimization tag, like Next [Image](https://nextjs.org/docs/api-reference/next/image) or Nuxt [nuxt-img](https://image.nuxtjs.org/components/nuxt-img/) this is that processing time |

##### _{{ HEADER_PREFIX }}-status_ {/*-header_prefix--status*/}
The `{{ HEADER_PREFIX }}-status` header will show the response codes received from the preceding service at each step in the process
`{{ HEADER_PREFIX }}-status: eh=200,ed=200,gh=200,gd=200,p=200,w=200`

##### _{{ HEADER_PREFIX }}-components_ {/*-header_prefix--components*/}
`{{ HEADER_PREFIX }}-components`. This is most useful for {{ PRODUCT_NAME }} in identifying the versions of each service, the id of the environment, and which backend serviced the request

`{{ HEADER_PREFIX }}-components: eh=0.1.6,e=atl,ec=1.1.0,ed=1.0.1,gh=0.1.6,g=hef,gd=1.0.1,p=1.21.10,w=3.11.0,wi=e8ce8753-163d-4be9-a39e-40454ace5146,b=serverless`

## Server Timing {/*server-timing*/}

{{ PRODUCT_NAME }} adds the following values to the standard [server-timing](https://www.w3.org/TR/server-timing/) response header:

- layer0-cache: desc=`value` - value will be one of:
  - `HIT-L1` - The page was served from the edge cache
  - `HIT-L2` - The page was served from the shield cache
  - `MISS` - The page could not be served from the cache
- country: desc=`country_code` - where country_code is the two letter code of the country from which the request was sent.
- xrj: desc=`route` - where route is the matched route serialized as JSON.

## Serverless Timing {/*serverless-timing*/}

### Cold start timing {/*serverless-cold-start-timing*/}

To calculate the Serverless cold start timing you must take the difference between `pf` and `wt` in the `{{ HEADER_PREFIX }}-t` header. `wt` is time taken for the lambda to execute after it has started, this is can be read as the time is takes the project code to execute. If that seems large, evaluate the code within your project to see why this might be. To [track timings](/guides/performance#tracking-your-own-timings) for a function, it is possible to add specific code to do that. 

Based on the example above, that would be `809 (pf) - 722 (wt) = 87ms`. 

## Troubleshooting Headers {/*troubleshooting-headers*/}

The following headers are used internally by {{ PRODUCT_NAME }} staff to troubleshoot issues with requests.

- `{{ HEADER_PREFIX }}-status`: HTTP status that each component in {{ PRODUCT_NAME }} returned (can vary depending on the component)
- `{{ HEADER_PREFIX }}-components`: version of various components in {{ PRODUCT_NAME }} critical path that serviced your request
