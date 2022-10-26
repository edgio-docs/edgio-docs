---
title: Logs
---

{{ PRODUCT }} provides the following types of log data:

- [Build logs](#build-logs) capture the build output from your {{ PRODUCT }} deployments.
- [Server logs](#server-logs) captures console messages defined within your application and data logged by Deep Request Inspection.
- [Access logs](#access-logs) describes requests served by {{ PRODUCT }}.

## Build Logs {/*build-logs*/}

{{ PRODUCT }} captures deployment information and the build output whenever you run the `{{ FULL_CLI_NAME }} deploy` command. You may view this log data from within the {{ PORTAL }}  either in real time or after the deployment has completed by loading the desired deployment and then scrolling down to the `DEPLOYMENT` tab.

![build](/images/logs/build.png)

## Serverless Compute Console Logs (Server Logs) {/*server-logs*/}

Serverless Compute supports the ability to log console messages. Console messages are defined within your application using methods, such as `console.log()`, `console.warn()`, and `console.error()`. 

[Learn more about the console object.](https://developer.mozilla.org/en-US/docs/Web/API/console) 

You may view these console messages in real time or as log data.

-   **Real Time:** From within the {{ PORTAL }}, load the desired deployment and then click on the `SERVER` tab. Focus on specific data by limiting the output to your IP address or through a regular expression. 
-   **Log Data:** Retrieve log data from an AWS S3 bucket.
    - Availability for this log data is only guaranteed for 2 hours. 
    - Use the following environment-specific data, which is available from the desired environment's **Logs** tab, to access log data:
        - Base AWS S3 bucket URL (Server Logs)
        - Key ID
        - Secret access key

![server](/images/logs/server.png)

[View log field definitions.](#serverless-compute-console-and-dri-log-fields)

### Deep Request Inspection (DRI) {/*deep-request-inspection*/}

<Video src="https://www.youtube.com/watch?v=M0KPpX89nO4"/>

<Callout type="info">

  Deep Request Inspection (DRI) requires enablement for each desired environment.

</Callout>

Use DRI to view the headers and body for:
-   Every request and response served through {{ PRODUCT }} Serverless Compute.
-   Each upstream API request made by your application.

<Callout type="warning">

  {{ PRODUCT }} automatically scrubs Social Security Numbers and common credit card formats from our log data. However, it is unaware of other personally identifiable information (PII). Any team member that has been assigned the Admin role will have access to this data.

</Callout>

![Deep Request Inspection](/images/logs/http-request-logging.png)

One use case for DRI is to analyze traffic during a deployment by tailing the server logs for that environment.

**To enable Deep Request Inspection**

1.  From within the {{ PORTAL }}, navigate to the desired environment.
2.  Click the **Configuration** tab.
3.  From the banner at the top of the page, click **Edit v#**.
4.  Mark the **Deep Request Inspection is disabled** option.
5.  From the banner at the top of the page, click **Activate**.

### Serverless Compute Console and DRI Log Fields {/*serverless-compute-console-and-dri-log-fields*/}

Log data for Serverless Compute console messages and DRI may contain the following fields:

-   **awsTag:** <a id="awsTag" /> Reserved for future use.
-   **clientIp:** <a id="clientIp" /> Indicates the IP address (IPv4 or IPv6) for the computer that submitted the request. 
-   **data:** <a id="data" /> Contains additional information about the request and the response logged by [Deep Request Inspection](#deep-request-inspection). 
    -   **headers:** <a id="headers" /> Contains request headers. 
    -   **method:** <a id="method" /> Indicates the request's HTTP method (e.g., `GET`, `HEAD`, and `POST`).
    -   **path:** <a id="path" /> Indicates the URL path for the content that was requested, posted, or deleted. This URL, which excludes the query string, is reported as a relative path that starts directly after the hostname.
    -   **protocol:** <a id="protocol" /> Indicates the request's scheme. Valid values are: 

        `http: | https:`

-   **requestId:** <a id="requestId" /> Indicates the request's unique ID.
-   **fn:** <a id="fn" /> Indicates the ID of the AWS Lambda function.
-   **level:** <a id="level" /> Indicates the severity of the console message or log data type. Valid values are:

    -   **100 - 104:** Indicates log data generated as a result of Deep Request Inspection.
    -   **60:** Fatal. This severity, which requires immediate attention, typically indicates that your application will stop or become unusable soon. 
    -   **50:** Error. This severity typically indicates that the request was unsuccessful. Errors require investigation and remediation to ensure optimal performance for all users.
    -   **40:** Warn. This severity typically indicates an issue that should be investigated as time allows.
    -   **30:** Info. This severity indicates information describing normal operation within your application.
    -   **20:** Debug. This severity contains more detailed information than Info console messages. 
    -   **10:** Trace. This severity is indicative of detailed application logging or log data generated by an external library used by your application.

-   **time:** <a id="time" /> Indicates the Unix time, in milliseconds, at which the request was submitted.

## Access Logs {/*access-logs*/}

<Callout type="info">

  Access to log data requires an Enterprise account. {{ ACCOUNT_UPGRADE }}

</Callout>

Our access log data describes each request served by {{ PRODUCT }}. 
-   Availability for this log data is only guaranteed for 2 hours. 
-   Use the following environment-specific data, which is available from the desired environment's **Logs** tab, to access log data:
    - Base AWS S3 bucket URL
    - Key ID
    - Secret access key

![access](/images/logs/access.png)

### Access Log Fields {/*access-log-fields*/}

Access logs contain the following fields:

-   **ac:** <a id="ac" /> Reserved for future use.
-   **asn:** <a id="asn" /> Reserved for future use.
-   **be:** <a id="be" /> Identifies the backend associated with the route that corresponds to this request. The name for this backend is defined within your `{{ CONFIG_FILE }}` file's `backends` structure.
-   **bip:** <a id="bip" /> Indicates the IP address of the backend that responded to the request.
-   **bk:** <a id="bk" /> Indicates the value associated with the `edgio_bucket` cookie. This cookie reports the random number assigned to a user when A/B Testing has been enabled. 
-   **bld:** <a id="bld" /> Indicates the application's build number.
-   **bot:** <a id="bot" /> Indicates whether the request was generated by a bot. 
-   **br:** <a id="br" /> Indicates the type of browser (e.g., chrome, safari, firefox, and generic).
-   **bse:** <a id="bse" /> Reserved for future use.
-   **cc:** <a id="cc" /> Indicates the code for the country from which the request originated.
-   **ce:** <a id="ce" /> Reserved for future use.
-   **clv:** <a id="clv" /> Indicates the level at which the request was served from cache. Returns `0` for a cache miss. 
-   **code:** <a id="code" /> Indicates the HTTP status code for the response.
-   **cs:** <a id="cs" /> Indicates whether the response was cached or the reason why it was not cached. [Learn more.](/guides/caching#why-is-my-response-not-being-cached)
-   **ct:** <a id="ct" /> Indicates the response's media type (aka content type).
-   **cv:** <a id="cv" /> Reserved for future use.
-   **cy:** <a id="cy" /> Reserved for future use.
-   **done:** <a id="done" /> Indicates whether the client was able to complete the request. This field is analogous to Nginx's `499` error code. Returns `1` for completed requests and `0` for uncompleted requests.
-   **ds:** <a id="ds" /> Indicates the destination assigned to this request as determined by your A/B test. Returns `default` if a destination has not been assigned to this request. 
-   **dv:** <a id="dv" /> Indicates the type of device (e.g., desktop, smartphone, tablet, and mobile) that submitted the request.
-   **eid:** <a id="eid" /> Indicates the system-defined ID for the {{ PRODUCT }} environment through which the request was processed.
-   **er:** <a id="er" /> Indicates whether we sent a custom response as a result of the [send method](routing#route-execution). Returns `1` for custom responses and `0` for all other responses.
-   **ev:** <a id="ev" /> Indicates the version for the {{ PRODUCT }} environment through which the request was processed.
-   **h2:** <a id="h2" /> Indicates whether the connection between the client and our network is HTTP/2. Returns `1` for HTTP/2 and `0` for HTTP/1.1.
-   **hh:** <a id="hh" /> Indicates the `Host` header value submitted by the client. 
-   **hrid:** <a id="hrid" /> If the response is served from cache, this field indicates the unique ID of the request whose response was cached. This value matches the ID reported by the [`{{ HEADER_PREFIX }}-hit-request-id` response header](response_headers#reserved-response-headers).
-   **ic:** <a id="ic" /> Indicates whether this request was eligible to be cached. This field does not indicate whether the response was actually cached.
-   **ip:** <a id="ip" /> Indicates the client's IP address.
-   **jwt:** <a id="jwt" /> Reserved for future use.
-   **lo:** <a id="lo" /> Reserved for future use.
-   **lp:** <a id="lp" /> Reserved for future use.
-   **lt:** <a id="lt" /> Reserved for future use.
-   **met:** <a id="met" /> Indicates the request's HTTP method (e.g., `GET`, `HEAD`, and `POST`).
-   **pc:** <a id="pc" /> Reserved for future use.
-   **pre:** <a id="pre" /> Indicates whether the request was prefetched. Returns `1` for requests that have the `{{ COOKIE_PREFIX }}_prefetch=1` query string parameter and `0` for all other requests.
-   **prl:** <a id="prl" /> Reserved for future use.
-   **prod:** <a id="prod" /> Reserved for future use.
-   **psh:** <a id="psh" /> Indicates whether this response was sent as a result of a HTTP/2 server push. Returns `1` for a HTTP/2 server push and `0` for all other responses.
-   **rfr:** <a id="rfr" /> Indicates the value for the `Referer` request header.
-   **rid:** <a id="rid" /> Indicates the system-defined ID assigned to the request. 
-   **s_rq:** <a id="s_rq" /> Indicates the size, in bytes, of the request.
-   **s_rs:** <a id="s_rs" /> Indicates the size, in bytes, of the response.
-   **sc:** <a id="sc" /> Reserved for future use.
-   **sec:** <a id="sec" /> Reserved for future use.
-   **sh:** <a id="sh" /> Returns `1` for requests that were shielded by a global POP and `0` for all other requests.
-   **ssl:** <a id="ssl" /> Reserved for future use.
-   **stl:** <a id="stl" /> Returns `1` when the Time-To-Live (TTL) for the cached response has expired. Returns `0` for all other requests. 
-   **t:** <a id="t" /> Reserved for future use.
-   **timestamp:** <a id="timestamp" /> Indicates the Unix time, in milliseconds, at which our network received the request. 
-   **ttl:** <a id="ttl" /> Indicates the Time-To-Live (TTL) for a cached response. 
-   **ua:** <a id="ua" /> Indicates the user agent that submitted the request. 
-   **url:** <a id="url" /> Indicates the URL path for the content that was requested, posted, or deleted. This URL, which excludes the query string, is reported as a relative path that starts directly after the hostname.
-   **uv:** <a id="uv" /> Indicates the `Vary` response header value as received from the upstream. Although this value may be different from the one sent to the client, it determines how we split the cache.
-   **v:** <a id="v" /> Indicates the version of {{ PRODUCT }} that processed this request.
-   **vn:** <a id="vn" /> Indicates the vendor (e.g., apple, microsoft, android, or generic).
-   **waf:** <a id="waf" /> Indicates the state of WAF security: `geo` for geo blocking, `bl` for block list, `dl-<LIST NAME>` for dynamic lists, `wl` for allow list, and `by` for bypass.
-   **wafv:** <a id="wafv" /> Reserved for future use.
-   **xff:** <a id="xff" /> Reserved for future use.
-   **xmr:** <a id="xmr" /> Indicates the value for the `{{ HEADER_PREFIX }}-matched-routes` request header. This request header identifies all matched routes.
-   **xms:** <a id="xms" /> Indicates the value for the `{{ HEADER_PREFIX }}-status` response header. This request header indicates the status codes for key [POP components](response_headers#-t-response-header). 
-   **xmt:** <a id="xmt" /> Indicates the value for the [{{ HEADER_PREFIX }}-t](response_headers#-t-response-header) response header. The {{ HEADER_PREFIX }}-t response header contains time measurements for each Edgio POP component through which a request was routed.
-   **xut:** <a id="xut" /> Indicates the value for the `{{ HEADER_PREFIX }}-user-t` response header. This response header contains [performance](/guides/performance) metrics.
-   **zip:** <a id="zip" /> Indicates whether the response was compressed. Returns `1` for compressed responses and `0` for uncompressed responses.


## Log Aggregation Tools {/*setting-up-log-aggregation-tools*/}

{{ PRODUCT }} temporarily stores log data within Amazon S3. Use a log aggregation tool to extract log data from AWS S3. Here are a few popular log aggregation tools:

- Sematext | [[Logagent docs]](https://sematext.com/docs/logagent/)
- Sumo Logic | [[S3 ingest docs]](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/AWS-S3-Source)
- AWS Athena | [[docs]](https://aws.amazon.com/blogs/big-data/analyzing-data-in-s3-using-amazon-athena/)
- Splunk | [[S3 ingest docs]](https://docs.splunk.com/Documentation/AddOns/released/AWS/S3)
- Loggly | [[S3 ingest docs]](https://documentation.solarwinds.com/en/Success_Center/loggly/Content/admin/s3-ingestion-auto.htm)
