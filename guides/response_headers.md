# Response Headers

This guide covers the headers that Moovweb XDN injects into responses making them visible to your client code.

## General headers

- `x-xdn-version`: version fingerprint that includes XDN version number, site build number and UTC timestamp of the build
- `x-xdn-t`: timings of all the components in Moovweb critical path that served your request
- `x-xdn-request-id`: the unique ID of the request on Moovweb XDN infrastructure
- `x-xdn-hit-request-id`: the unique ID of the request whose cached response is being returned (not present if cache miss)
- `x-xdn-caching-status`: indicates why a response was or was not cached. See [Caching](/guides/caching#section_why_is_my_response_not_being_cached_).

### Structure of `x-xdn-t`

The format is `x-xdn-t: <id>=<time>[,<id2>=<time2>...]`

`x-xdn-t` is an order list of timings: values are prepended at response time. Thus reading them left to right goes from the outermost edge component to the innermost cloud component that handled the request.

The components are:

- Level 1 Edge POP = `o`
- Level 2 Shield POP = `s`
- Custom Moovweb Proxy = `p`
- JavaScript Compute Workers = `w`

All times are in milliseconds.

|Name|Description|
|----|-----------|
|ot|The total time spent processing the request|
|or|The time spent matching routes at the edge pop|
|of|The time spent fetching the response at the edge pop|
|oc|The caching status for the edge pop|
|ow|The free memory left after request processing at the edge pop|
|oq|The time spent at the edge pop in fetch queue during the request coalescing|
|st|The time spent processing the request at the shield pop|
|sr|The time spent matching routes at the shield pop|
|sf|The time spent waiting for a response from the serverless backend or origin, including request queueing|
|sc|The caching status for the shield pop|
|ow|The free memory in bytes on the shield pop after processing the request|
|sq|The time spent at the shield pop in fetch queue during the request coalescing|
|bf|???| 
|pc|???| 
|pf|The time spent waiting for a response from the serverless backend or origin, excluding request queueing| 
|wm|The amount of memory used in MB by the JavaScript worker to process the request| 
|wt|The JavaScript worker execution time| 
|wr|The time spent matching routes in the JavaScript worker| 
|wa|The time spent transforming the request in JavaScript worker. Will only be provided if the request was transformed.| 
|wp|The time spent waiting for your application (Next, Nuxt, Sapper, Angular, etc...) or origin to respond| 
|wz|The time spent transforming the response in JavaScript worker. Will only be provided if the response was transformed.| 

## Troubleshooting headers

The following headers are used internally by Moovweb staff to troubleshoot issues with requests.

- `x-xdn-status`: statuses of different components in Moovweb XDN critical path that serviced your request
- `x-xdn-components`: versions of different components in Moovweb XDN critical path that serviced your request
