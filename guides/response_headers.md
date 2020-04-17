# Response Headers

This guide covers the headers that Moovweb XDN injects into responses making them visible to your client code.

## General headers

* `x-xdn-version`: version fingerprint that includes XDN version number, site build number and UTC timestamp of the build
* `x-xdn-t`: timings of all the components in Moovweb critical path that served your request
* `x-xdn-request-id`: the unique ID of the request on Moovweb XDN infrastructure
* `x-xdn-hit-request-id`: the unique ID of the request whose cached response is being returned (not present if cache miss)

### Structure of `x-xdn-t`

The format is `x-xdn-t: <id>=<time>[,<id2>=<time2>...]`

`x-xdn-t` is an order list of timings: values are prepended at response time. Thus reading them left to right goes from the outermost edge component to the innermost cloud component that handled the request.

The components are:

* Level 1 CDN POP = `o`
* Level 2 CDN POP = `s`
* Custom Moovweb Proxy = `p`
* JavaScript Compute Workers = `w`

All times are in milliseconds.

## Troubleshooting headers

The following headers are used internally by Moovweb staff to troubleshoot issues with requests.

* `x-xdn-status`: statuses of different components in Moovweb XDN critical path that serviced your request
* `x-xdn-components`: versions of different components in Moovweb XDN critical path that serviced your request
