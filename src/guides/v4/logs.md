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

### Timestamp (Number) {/*timestamp-number*/}

Millisecond resolution of the request start time in UNIX epoch.

### Bld (String) {/*bld-string*/}

The application's build number processing this request. Example '1021'.

### Eid (String) {/*eid-string*/}

The active environment ID in {{ PRODUCT_NAME }}.

_Available since {{ PRODUCT_NAME }} v2.9.0._

### Ev (Number) {/*ev-number*/}

The active environment version number. Example 95 (number). 

### Ip (String) {/*ip-string*/}

IP of the most downstream client, determined either through XFF or by reading socket information.

### Met (String) {/*met-string*/}

HTTP method.

### Hh (String) {/*hh-string*/}

Host header as received from the downstream.

### URL (String) {/*url-string*/}

HTTP path.

### H2 (String) {/*h2-string*/}

Flag indicating whether downstream connection is http/2 or not. Can be '0' or '1'. 

### Psh (Number) {/*psh-number*/}

Flag indicating whether this request is an http/2 server-side push or not. Can be 0 or 1. 

### Code (String) {/*code-string*/}

HTTP response status code.

### Ic (Integer) {/*ic-integer*/}

Flag indicating whether this request was cacheable even in theory. Can be 0 or 1. 

### Cc (String) {/*cc-string*/}

Country code per geo-location.

### S_rq (Number) {/*s_rq-number*/}

Size of the request in bytes.

### S_rs (Number) {/*s_rs-number*/}

Size of the response in bytes.

### Ds (String) {/*ds-string*/}

Destination, determined by split testing rules, if any; if no rules, the value is left as the default router.

### Be (String) {/*be-string*/}

Backend, determined by the routing rules. The names come from the `backends` structure exported from your `{{ CONFIG_FILE }}` file.

### Bk (String) {/*bk-string*/}

Split testing bucket cookie value.

### Zip (String) {/*zip-string*/}

Flag indicating whether the response is compressed or not. Can be '0' or '1'. 

### Rid (String) {/*rid-string*/}

Unique request ID.

### Waf (String) {/*waf-string*/}

WAF security state: geo for geo blocking, bl for block list, `dl-{list name}` for dynamic lists
if the request was blocked; wl for allow list, by for bypass if the request was passed.

### Sh (Number) {/*sh-number*/}

Flag indicating whether the request was shielded. Can be 0 or 1. 

### Dv (String) {/*dv-string*/}

Device type desktop, smartphone, tablet, mobile.

### Vn (String) {/*vn-string*/}

Vendor: apple, microsoft, android.

### Br (String) {/*br-string*/}

Browser: chrome, safari, firefox.

### Bot (Number) {/*bot-number*/}

Flag indicating whether the request was made by a bot. Can be 0 or 1. 

### Er (Number) {/*er-number*/}

Flag indicating whether the request was responded from edge (not true for cache hits, just for synthetic requests). Can be 0 or 1. 

### Clv (Number) {/*clv-number*/}

Cache level on which the request was responded or 0 if it was a miss. Possible values are 0 - miss, 1 - Level 1 hit (edge), 2 - level 2 hit (global).

### Stl (Number) {/*stl-number*/}

Indicates if the response was stale or not. Can be 0 or 1.

### Done (String) {/*done-string*/}

Flag indicating if the response has completed (analogous to 499 in Nginx). '0' or '1'. 

### Cs (String) {/*cs-string*/}

[Caching status](/guides/caching#section_why_is_my_response_not_being_cached_) (why something was or wasn't cached).

### Ct (String) {/*ct-string*/}

Response content type.

### Xmr (String) {/*xmr-string*/}

Request header {{ HEADER_PREFIX }}-matched-routes, logs all routes matched and is required to order the routes table in caching metrics.

### Rfr (String) {/*rfr-string*/}

Referrer request header (note the misspelling per HTTP standard).

### Ua (String) {/*ua-string*/}

User agent.

### Xmt (String) {/*xmt-string*/}

Response [{{ HEADER_PREFIX }}-t](/guides/response_headers#section_structure_of_) header with different critical path timings.
Example: 'eh=4,ect=2,ecc=hit'.

### Xut (String) {/*xut-string*/}

Response {{ HEADER_PREFIX }}-user-t header with different user [performance](/guides/performance) metrics.
Example: fetch:/path=123

### Xms (String) {/*xms-string*/}

Response {{ HEADER_PREFIX }}-status header with different critical path status codes. Example: 'eh=200,ed=200,gh=200,gd=200,p=200,w=200'.

### Pre (Number or Not Present) {/*pre-number-or-not-present*/}

If {{ COOKIE_PREFIX }}\_prefetch parameter was specified value of 1, otherwise not present.

### Uv (String) {/*uv-string*/}

Upstream response's `vary` header value.

### Bip (String) {/*bip-string*/}

IP of the backend that responded to the request.

### Hrid (String) {/*hrid-string*/}

Request ID of the response hit in the cache. Corresponds to [`{{ HEADER_PREFIX }}-hit-request-id`](response_headers#section_general_headers) response header.

### Ac (String) {/*ac-string*/}

Accept-Encoding header value. Example: 'gzip'.

### Asn (String) {/*asn-string*/}

The ASN for the (Autonomous System Number) for this IP.
Example: '20940'.

### Ce (String) {/*ce-string*/}

The normalized value of content encoding header as used by edge. Example: 'gzip'.

### Ckh (String) {/*ckh-string*/}

Cache key hash.

### Cv (String) {/*cv-string*/}

Edgio edge compiler version. Example '1.7.3'.

### Cy (String) {/*cy-string*/}

City name per geo-location. Example: 'new york'.

### JWT (String) {/*jwt-string*/}

Value of the recommended action per JWT parsing. Can be one of "", "blocked", "permit", "redirect".

### Lo (String) {/*lo-string*/}

Geographical longitude per geo-location. Example '-73.98'.

### Lt (String) {/*lt-string*/}

Geographical latitude per geo-location. Example '40.76'.

### Lp (Number) {/*lp-number*/}

Flag indicating if loading page was served during incremental static rendering. Can be 0 or 1 (number).

### Pc (String) {/*pc-string*/}

Postal code per geo-location. Example: '10020'

### Prl (Number) {/*prl-number*/}

Flag indicating if this was a preload request. Can be 0 or 1. 

### Prod (Number) {/*prod-number*/}

Indicates whether this request belongs to the production environment. Can be 0 or 1 (number).

### Sc (String) {/*sc-string*/}

State code as per geo-location
Example: 'NY'

### Sec (String) {/*sec-string*/}

Security - set to "ip_block_list" if blocked by IP or "country_block_list" if blocked by country code on the edge.

### Ssl (Number) {/*ssl-number*/}

A flag that indicates whether the request was done on HTTPS protocol. Can be 0 or 1.

### T (String) {/*t-string*/}

Same as `xmt`. 

### V (String) {/*v-string*/}

Layer0/Edgio platform version. Example: '4.19.3'

### Wafv (String) {/*wafv-string*/}

Version of the WAF. Can be an empty string if WAF was not enabled, otherwise the version of the WAF (like 'WAF-1,2').

### Xff (String) {/*xff-string*/}

The value of the header 'x-forwarded-for'.
