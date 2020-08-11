# Logs

The XDN platform exposes three types of logs to users: build logs, server logs, and access logs.

## Build Logs

Each time you deploy to the XDN using the `xdn deploy` command, information about the deployment is logged, including the output of the `xdn deploy` command itself. You can view these logs in real-time by viewing your deployment on [moovweb.app](https://moovweb.app).

![build](/images/logs/build.png)

## Server Logs

The output of `console.log`, `console.warn`, `console.error`, etc... calls within your code can be viewed in real time from the "Server" tab on any deployment:

![server](/images/logs/server.png)

Here you can limit the output to only those statements coming from your IP address, or filter by regex. This can use useful when trying to sift through noisy logs on high-traffic sites.

## Access Logs

XDN customers can receive streaming access logs that capture information about each request served by the XDN. Access logs contain the following fields:

### timestamp

Millisecond resolution of the request start time in UNIX epoch.

### xdn

The application's XDN version processing this request.

### bld

The application's build number processing this request.

### ev

The active environment version number

### ip

IP of the most downstream client, determined either through XFF or by reading socket infromation.

### met

HTTP method

### hh

Host header as received from the downstream.

### url

HTTP path

### h2

Flag indicating whether downstream connection is http/2 or not

### psh

Flag indicating whether this request is an http/2 server-side push or not

### code

HTTP response status code

### ic

Flag indicating whether this request was cacheable even in theory

### cc

Country code per geo-location.

### s_rq

Size of the request in bytes.

### s_rs

Size of the response in bytes.

### ds

Destination, determined by split testing rules

### be

Backend, determined by split testing rules

### bk

Split testing bucket cookie value

### zip

Flag indicating whether the response is compressed or not.

### rid

Unique request ID

### waf

WAF security state: geo for geo blocking, bl for black list, dl-<list name> for dynamic lists
if the request was blocked; wl for whitelist, by for bypass if the request was passed.

### sh

Flag indicating whether the request was shielded.

### dv

Device type desktop, smartphone, tablet, mobile

### vn

Vendor: apple, microsoft, android

### br

Browser: chrome, safari, firefox

### bot

Flag indicating whether the requet was made by a bot.

### er

Flag indicating whether the request was responded from edge (not true for cache hits, just for synthetic requests)

### clv

Cache level on which the request was responded or 0 if it was a miss

### stl

Indicates if the response was stale or not (0, 1)

### done

Flag indicating if the response has completed (analogous to 499 in Nginx)

### cs

Caching status (why something was or wasn't cached)

### ct

Response content type.

### xmr

Request header x-xdn-matched-routes, logs all routes matched and is required to order the routes table in caching metrics

### rfr

Referrer request header (note the misspelling per HTTP standard)

### ua

User agent.

### xmt

Response x-xdn-t header with different critical path timings

### xms

Response x-xdn-status header with different critical path status codes

### pre

If xdn_prefetch parameter was specified value of 1, otherwise not present.

### ttl

Time to live in seconds of the response if it was cached.

### uv

The response vary header received from upstream; it's sometimes different to what's sent downstream
as we inject user-agent in moov_deliver, but it's this value what actually splits the cache;
we don't have access to beresp from moov_log so we preserve it in req

### bip

IP of the backend that responded to the request
