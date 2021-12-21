# Logs

The {{ PRODUCT_NAME }} platform exposes three types of logs to users:

- [Build logs](#section_build_logs) capture all the build output from your {{ PRODUCT_NAME }} deploys.
- [Server logs](#section_server_logs) capture your {{ PRODUCT_NAME }} serverless console output at real time.
- [Access logs](#section_access_logs) capture information about all the requests served by {{ PRODUCT_NAME }}.

## Build Logs

Each time you deploy to {{ PRODUCT_NAME }} using the `{{ CLI_NAME }} deploy` command, information about the deployment is logged, including the output of the `{{ CLI_NAME }} deploy` command itself. You can view these logs in real-time by viewing your deployment on [{{ APP_DOMAIN }}]({{ APP_URL }}).

![build](/images/logs/build.png)

## Server Logs

All messages logged using `console.log`, `console.warn`, `console.error`, etc... within your application can be viewed in real time from the "Server" tab on any deployment:

![server](/images/logs/server.png)

Here you can limit the output to only those statements coming from your IP address, or filter by regex. This can use useful when trying to sift through noisy logs on high-traffic sites.

### Deep Request Inspection

![video](https://www.youtube.com/watch?v=M0KPpX89nO4)

By enabling Deep Request Inspection in your environment, you can also see the headers and body of every request and response served by your application via the Layer0 serverless cloud. You can also see each upstream API request made by your application. To enable Deep Request Inspection, navigate to the environment in the Layer0 Developer Console, select the configuration tab, click "Edit" and enable "Deep Request Inspection" in the Debugging section.

![Deep Request Inspection](/images/logs/http-request-logging.png)

Finally, activate the new environment configuration and tail the server logs on any deployment to see detailed information about every request served by that deployment.

## Setting up Log Aggregation Tools

{{ PRODUCT_NAME }} saves its logs to Amazon S3. Most log aggregation tools are able to ingest logs from S3. We attempt to link to the docs that explain how to ingest logs from S3 for each popular log aggregation tool below. Even if your tool is not listed, there's a good chance it can ingest logs from S3.

- Sematext | [[Logagent docs]](https://sematext.com/docs/logagent/)
- Sumo Logic | [[S3 ingest docs]](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/AWS-S3-Source)
- AWS Athena | [[docs]](https://aws.amazon.com/blogs/big-data/analyzing-data-in-s3-using-amazon-athena/)
- Splunk | [[S3 ingest docs]](https://docs.splunk.com/Documentation/AddOns/released/AWS/S3)
- Loggly | [[S3 ingest docs]](https://documentation.solarwinds.com/en/Success_Center/loggly/Content/admin/s3-ingestion-auto.htm)

## Access Logs

{{ PRODUCT_NAME }} [Enterprise tier]({{ WWW_URL }}/pricing) customers can receive streaming access logs that capture information about each request served by {{ PRODUCT_NAME }}. To do so refer to the "Access Logs" tab:

![access](/images/logs/access.png)

Note that if you are not an Enterprise tier customer you will see a message to contact support to upgrade your account.

Access logs contain the following fields:

### timestamp

Millisecond resolution of the request start time in UNIX epoch.

### {{ PRODUCT_NAME_LOWER }}

The application's {{ PRODUCT_NAME }} version processing this request.

### bld

The application's build number processing this request.

### eid

The active environment ID in {{ PRODUCT_NAME }}.

_Available since {{ PRODUCT_NAME }} v2.9.0._

### ev

The active environment version number.

### ip

IP of the most downstream client, determined either through XFF or by reading socket information.

### met

HTTP method.

### hh

Host header as received from the downstream.

### url

HTTP path.

### h2

Flag indicating whether downstream connection is http/2 or not.

### psh

Flag indicating whether this request is an http/2 server-side push or not.

### code

HTTP response status code.

### ic

Flag indicating whether this request was cacheable even in theory.

### cc

Country code per geo-location.

### s_rq

Size of the request in bytes.

### s_rs

Size of the response in bytes.

### ds

Destination, determined by split testing rules.

### be

Backend, determined by split testing rules.

### bk

Split testing bucket cookie value.

### zip

Flag indicating whether the response is compressed or not.

### rid

Unique request ID.

### waf

WAF security state: geo for geo blocking, bl for black list, dl-<list name> for dynamic lists
if the request was blocked; wl for whitelist, by for bypass if the request was passed.

### sh

Flag indicating whether the request was shielded.

### dv

Device type desktop, smartphone, tablet, mobile.

### vn

Vendor: apple, microsoft, android.

### br

Browser: chrome, safari, firefox.

### bot

Flag indicating whether the request was made by a bot.

### er

Flag indicating whether the request was responded from edge (not true for cache hits, just for synthetic requests).

### clv

Cache level on which the request was responded or 0 if it was a miss.

### stl

Indicates if the response was stale or not (0, 1).

### done

Flag indicating if the response has completed (analogous to 499 in Nginx).

### cs

[Caching status](/guides/caching#section_why_is_my_response_not_being_cached_) (why something was or wasn't cached).

### ct

Response content type.

### xmr

Request header {{ HEADER_PREFIX }}-matched-routes, logs all routes matched and is required to order the routes table in caching metrics.

### rfr

Referrer request header (note the misspelling per HTTP standard).

### ua

User agent.

### xmt

Response [{{ HEADER_PREFIX }}-t](/guides/response_headers#section_structure_of_) header with different critical path timings.

### xut

Response {{ HEADER_PREFIX }}-user-t header with different user [performance](/guides/performance) metrics.

### xms

Response {{ HEADER_PREFIX }}-status header with different critical path status codes.

### pre

If {{ COOKIE_PREFIX }}\_prefetch parameter was specified value of 1, otherwise not present.

### ttl

Time to live in seconds of the response if it was cached.

### uv

The response vary header received from upstream; it's sometimes different to what's sent downstream
as we inject user-agent in moov_deliver, but it's this value what actually splits the cache;
we don't have access to beresp from moov_log so we preserve it in req.

### bip

IP of the backend that responded to the request.

### hrid

Request ID of the response hit in the cache. Corresponds to [`{{ HEADER_PREFIX }}-hit-request-id`](response_headers#section_general_headers) response header.
