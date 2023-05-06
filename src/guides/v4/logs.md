---
title: Logs
---

The {{ PRODUCT_NAME }} platform exposes three types of logs to users:

- [Build logs](#build-logs) capture all the build output from your {{ PRODUCT_NAME }} deploys.
- [Server logs](#server-logs) capture your {{ PRODUCT_NAME }} serverless console output at real time.
- [Access logs](#access-logs) capture information about all the requests served by {{ PRODUCT_NAME }}.

## Build Logs {/*build-logs*/}

Each time you deploy to {{ PRODUCT_NAME }} using the `{{ CLI_NAME }} deploy` command, information about the deployment is logged, including the output of the `{{ CLI_NAME }} deploy` command itself. You can view these logs in real-time by viewing your deployment on [{{ APP_DOMAIN }}]({{ APP_URL }}).

![build](/images/logs/build.png)

## Server Logs {/*server-logs*/}

All messages logged using `console.log`, `console.warn`, `console.error`, etc... within your application can be viewed in real time from the "Server" tab on any deployment:

![server](/images/logs/server.png)

Here you can limit the output to only those statements coming from your IP address, or filter by regex. This can use useful when trying to sift through noisy logs on high-traffic sites.

### Deep Request Inspection {/*deep-request-inspection*/}

<Video src="https://www.youtube.com/watch?v=M0KPpX89nO4"/>

By enabling Deep Request Inspection in your environment, you can also see the headers and body of every request and response served by your application via the {{ PRODUCT }} serverless cloud. You can also see each upstream API request made by your application. To enable Deep Request Inspection, navigate to the environment in the {{ PRODUCT }} Developer Console, select the configuration tab, click "Edit" and enable "Deep Request Inspection" in the Debugging section.

![Deep Request Inspection](/images/logs/http-request-logging.png)

Finally, activate the new environment configuration and tail the server logs on any deployment to see detailed information about every request served by that deployment.

## Setting up Log Aggregation Tools {/*setting-up-log-aggregation-tools*/}

{{ PRODUCT_NAME }} saves its logs to Amazon S3. Most log aggregation tools are able to ingest logs from S3. We attempt to link to the docs that explain how to ingest logs from S3 for each popular log aggregation tool below. Even if your tool is not listed, there's a good chance it can ingest logs from S3.

- Sematext | [[Logagent docs]](https://sematext.com/docs/logagent/)
- Sumo Logic | [[S3 ingest docs]](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/AWS-S3-Source)
- AWS Athena | [[docs]](https://aws.amazon.com/blogs/big-data/analyzing-data-in-s3-using-amazon-athena/)
- Splunk | [[S3 ingest docs]](https://docs.splunk.com/Documentation/AddOns/released/AWS/S3)
- Loggly | [[S3 ingest docs]](https://documentation.solarwinds.com/en/Success_Center/loggly/Content/admin/s3-ingestion-auto.htm)

## Access Logs {/*access-logs*/}

{{ PRODUCT_NAME }} [Enterprise tier]({{ WWW_URL }}/pricing) customers can receive streaming access logs that capture information about each request served by {{ PRODUCT_NAME }}. To do so refer to the "Access Logs" tab:

![access](/images/logs/access.png)

Note that if you are not an Enterprise tier customer you will see a message to contact support to upgrade your account.

Access logs contain the following fields:

### timestamp (number) {/*timestamp*/}

Millisecond resolution of the request start time in UNIX epoch.

### bld (string) {/*bld*/}

The application's build number processing this request. Example '1021'.

### eid (string) {/*eid*/}

The active environment ID in {{ PRODUCT_NAME }}.

_Available since {{ PRODUCT_NAME }} v2.9.0._

### ev (number) {/*ev*/}

The active environment version number. Example 95 (number). 

### ip (string) {/*ip*/}

IP of the most downstream client, determined either through XFF or by reading socket information.

### met (string) {/*met*/}

HTTP method.

### hh (string) {/*hh*/}

Host header as received from the downstream.

### url (string) {/*url*/}

HTTP path.

### h2 (string) {/*h2*/}

Flag indicating whether downstream connection is http/2 or not. Can be '0' or '1'. 

### psh (number) {/*psh*/}

Flag indicating whether this request is an http/2 server-side push or not. Can be 0 or 1. 

### code (string) {/*code*/}

HTTP response status code.

### ic (integer) {/*ic*/}

Flag indicating whether this request was cacheable even in theory. Can be 0 or 1. 

### cc (string) {/*cc*/}

Country code per geo-location.

### s_rq (number) {/*s_rq*/}

Size of the request in bytes.

### s_rs (number) {/*s_rs*/}

Size of the response in bytes.

### ds (string) {/*ds*/}

Destination, determined by split testing rules, if any; if no rules, the value is left as the default router.

### be (string) {/*be*/}

Backend, determined by the routing rules. The names come from the `backends` structure exported from your `{{ CONFIG_FILE }}` file.

### bk (string) {/*bk*/}

Split testing bucket cookie value.

### zip (string) {/*zip*/}

Flag indicating whether the response is compressed or not. Can be '0' or '1'. 

### rid (string) {/*rid*/}

Unique request ID.

### waf (string) {/*waf*/}

WAF security state: geo for geo blocking, bl for block list, dl-{list name} for dynamic lists
if the request was blocked; wl for allow list, by for bypass if the request was passed.

### sh (number) {/*sh*/}

Flag indicating whether the request was shielded. Can be 0 or 1. 

### dv (string) {/*dv*/}

Device type desktop, smartphone, tablet, mobile.

### vn (string) {/*vn*/}

Vendor: apple, microsoft, android.

### br (string) {/*br*/}

Browser: chrome, safari, firefox.

### bot (number) {/*bot*/}

Flag indicating whether the request was made by a bot. Can be 0 or 1. 

### er (number) {/*er*/}

Flag indicating whether the request was responded from edge (not true for cache hits, just for synthetic requests). Can be 0 or 1. 

### clv (number) {/*clv*/}

Cache level on which the request was responded or 0 if it was a miss. Possible values are 0 - miss, 1 - Level 1 hit (edge), 2 - level 2 hit (global).

### stl (number) {/*stl*/}

Indicates if the response was stale or not. Can be 0 or 1.

### done (string) {/*done*/}

Flag indicating if the response has completed (analogous to 499 in Nginx). '0' or '1'. 

### cs (string) {/*cs*/}

[Caching status](/guides/caching#section_why_is_my_response_not_being_cached_) (why something was or wasn't cached).

### ct (string) {/*ct*/}

Response content type.

### xmr (string) {/*xmr*/}

Request header {{ HEADER_PREFIX }}-matched-routes, logs all routes matched and is required to order the routes table in caching metrics.

### rfr (string) {/*rfr*/}

Referrer request header (note the misspelling per HTTP standard).

### ua (string) {/*ua*/}

User agent.

### xmt (string) {/*xmt*/}

Response [{{ HEADER_PREFIX }}-t](/guides/response_headers#section_structure_of_) header with different critical path timings.
Example: 'eh=4,ect=2,ecc=hit'.

### xut (string) {/*xut*/}

Response {{ HEADER_PREFIX }}-user-t header with different user [performance](/guides/performance) metrics.
Example: fetch:/path=123

### xms (string) {/*xms*/}

Response {{ HEADER_PREFIX }}-status header with different critical path status codes. Example: 'eh=200,ed=200,gh=200,gd=200,p=200,w=200'.

### pre (number or not present) {/*pre*/}

If {{ COOKIE_PREFIX }}\_prefetch parameter was specified value of 1, otherwise not present.

### uv (string) {/*uv*/}

Upstream response's `vary` header value.

### bip (string) {/*bip*/}

IP of the backend that responded to the request.

### hrid (string) {/*hrid*/}

Request ID of the response hit in the cache. Corresponds to [`{{ HEADER_PREFIX }}-hit-request-id`](response_headers#section_general_headers) response header.

### ac (string) {/*ac*/}

Accept-Encoding header value. Example: 'gzip'.

### asn (string) {/*asn*/}

The ASN for the (Autonomous System Number) for this IP.
Example: '20940'.

### ce (string) {/*ce*/}

The normalized value of content encoding header as used by edge. Example: 'gzip'.

### ckh (string) {/*ckh*/}

Cache key hash.

### cv (string) {/*cv*/}

Edgio edge compiler version. Example '1.7.3'.

### cy (string) {/*cy*/}

City name per geo-location. Example: 'new york'.

### jwt (string) {/*jwt*/}

Value of the recommended action per JWT parsing. Can be one of "", "blocked", "permit", "redirect".

### lo (string) {/*lo*/}

Geographical longitude per geo-location. Example '-73.98'.

### lt (string) {/*lt*/}

Geographical latitude per geo-location. Example '40.76'.

### lp (number) {/*lp*/}

Flag indicating if loading page was served during incremental static rendering. Can be 0 or 1 (number).

### pc (string) {/*pc*/}

Postal code per geo-location. Example: '10020'

### prl (number) {/*prl*/}

Flag indicating if this was a preload request. Can be 0 or 1. 

### prod (number) {/*prod*/}

Indicates whether this request belongs to the production environment. Can be 0 or 1 (number).

### sc (string) {/*sc*/}

State code as per geo-location
Example: 'NY'

### sec (string) {/*sec*/}

Security - set to "ip_block_list" if blocked by IP or "country_block_list" if blocked by country code on the edge.

### ssl (number) {/*ssl*/}

A flag that indicates whether the request was done on HTTPS protocol. Can be 0 or 1.

### t (string) {/*t*/}

Same as `xmt`. 

### v (string) {/*v*/}

Layer0/Edgio platform version. Example: '4.19.3'

### wafv (string) {/*wafv*/}

Version of the WAF. Can be an empty string if WAF was not enabled, otherwise the version of the WAF (like 'WAF-1,2').

### xff (string) {/*xff*/}

The value of the header 'x-forwarded-for'.
