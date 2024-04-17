---
title: {{CACHING_DELIVERY}}
---
{{CACHING_DELIVERY}} delivers content via HTTP and HTTPS for all file formats. Both full (entire file) and progressive (range request) downloads are supported.

Navigate to Configure > {{CACHING_DELIVERY}} in the navigation pane. The {{CACHING_DELIVERY}} for page is displayed.

## Configuration List {/*configuration-list*/}
The {{CACHING_DELIVERY}} page displays a list of the {{CACHING_DELIVERY}} configurations for the currently-selected Company and Account.

The following information is shown for each configuration:

- **Source Hostname** – The private URL prefix used by Edgio to retrieve and cache content from your origin server (not visible to end-users)
- **Source Path**- the URL path, if any, to use with the Source Hostname
- **Protocol** - The level of HTTP protocol security to use when delivering your cached content to end-users
- **Published Path** - The URL path, if any, to use with the Published Host

## Filtering the List of Configurations {/*filtering-the-list-of-configurations*/}
Use the **Filter by** dropdown menu and the filter text field to filter the list by specific fields:

To filter the list:
1. Make a selection in the drop-down menu.
2. Enter a value in the filter text field.
3. Press the Enter key on your keyboard. The list is reduced to include only configurations that match the filter.

Display the original list by clicking the x icon in the filter text field.

## Read-Only and Hidden Capabilities {/*read-only-and-hidden-capabilities*/}
For particular use cases, configurations may have certain fields presented as either read-only or hidden (masked).

An entire configuration may be read-only. Or, an editable configuration may have source and/or published fields hidden or read-only.

Source and published fields are:
- Source hostname
- Source path
- Published hostname
- Published path

Hidden fields are masked with asterisks.

|Use Case	|User Capabilities|
|---|---|
|Entire configuration is read-only.	|Users can only view the configuration. They cannot edit, clone, or revert the configuration.|
|Configuration is editable, but specific fields are read-only and/or hidden.	|Users can modify all but read-only/hidden fields.|

Users can edit, clone, and revert the configuration.

## Creating a New Configuration {/*creating-a-new-configuration*/}
To create a new configuration, click the **+ new** button, and the Create configuration screen will be displayed.

### Service Profiles  {/*service-profiles*/}

Each new configuration is based on a Service Profile. Service Profiles define the configuration structure and specify default and mandatory options that must be applied on every configuration. A Service Profile can serve as both a guide and a guardrail for the type of content your configuration will serve (characterized by a Use Case).

The **Use Case** and **Service Profile** drop-down menus are disabled:
- In existing configurations.
- After you have selected a Published and Source Protocol while you are creating a new configuration.

<Callout type="info">If you have not already saved the new configuration but you want to choose another Service Profile, you can do so by exiting out of the Create configuration screen and creating a new configuration by clicking the **+ new** button.</Callout>

If you wish to modify a Service Profile or migrate, add, or remove a Protocol Set for an existing configuration, contact your Account Manager.

### Page Organization  {/*page-organization*/}

Configuration options are grouped into sections by functional category, such as Content Location. Each section displays all of the related options made available by the Service Profile. For sections other than Content Location, the most commonly used options are always displayed. Any remaining options are grouped under the Advanced drop-down menu in each section.

Initially, only the Content Location section is visible. Once you select both a Published protocol and a Source protocol, the rest of the sections and configuration options become available. The combination of a Published protocol and Source protocol is known as a "protocol set."

After you've filled in the configuration fields in each section, click Activate (at the bottom of the page) to enable your new configuration.

### Content Location  {/*content-location*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
| Published protocol| The level of HTTP protocol security to use when delivering your cached content to end-users| To ensure your content is delivered with the level of security you require| The Published protocol and Source protocol drop-down menus are disabled:  <br /> - In existing configurations. <br /> - After you have selected a Published and Source protocol while you are creating a new configuration. <br /> <Callout type="info">If you have not already saved the new configuration but you want to choose another Published and Source protocol, you can do so by exiting out of the Create configuration screen and creating a new configuration by clicking the **+ new** button.</Callout> |
|Published hostname|The fully qualified domain name that will be used in all public links (Published URLs) to your cached content <br /> <Callout type="info">A URL that includes the Published Hostname is referred to as a Published URL.</Callout> | To direct your users to the Content Delivery service (instead of your origin) |In the Published hostname field, enter the published hostname specified in the Welcome Letter associated with your {{COMPANY_NAME}} Account or a CNAME if desired. <br /> The published hostname provided by Edgio will be in a form similar to: <br /> ```accountname.vo.llnwd.net``` <br /> If you prefer to publish under a different hostname, you can use a DNS CNAME record to alias (point) your desired name to Edgio published hostname. <br /><Callout type="info"> - IP addresses are not accepted. You must enter a fully qualified domain name. <br /> - If you can't find the Edgiopublished hostname in your Welcome Letter, please contact {{COMPANY_NAME}} Support.</Callout> <br /> If you want to use a directory name “alias” for a particular origin path, you can add the alias by entering it in the Published URL path field. <br /> If needed, you can add a regex expression to the start of the Published hostname field, but you must have permissions to do so. Without the permissions, you are restricted as follows: <br /> - When creating or cloning a configuration, you cannot add regex to the field. <br /> - If a configuration has regex in the field, you cannot clone the configuration. <br /> - When updating a configuration that has regex in the field, you cannot modify any part of the Published hostname. <br /> Please contact your account manager if you need assistance with any of these operations. |
| Published URL path	|The path portion of a published URL|To allow your published hostname URL to be more specific and include a path.| Enter the path enclosed in forward slashes. <br /> <Callout type="info"> - This field must contain a value and defaults to / <br /> - If you have the PERMISSION_CONFIGURE_SSUI_REGEX permission, you can include regular expressions in the path.</Callout> |
|This path ends with a filename	|Whether the last component in the path is a file| File names are not validated by extension, so when the Published URL path or Source URL path does not end with a slash, it is treated as a file name. <br /> <Callout type="info">This field and **Only publish files with these extensions** are mutually exclusive. </Callout>| Place a checkmark in the checkbox if the path ends in a file name. <br /> <Callout type="info">If you check this option, you must make entries in the **Published URL path** and **Source URL path** fields</Callout> |
|Only publish files with these extensions	|File extensions to publish | Provides flexibility, allowing you to specify file extensions to publish. More flexible than using This path ends with a filename, which allows you to specify only one file. <br /> <Callout type="info">This field and **This path ends with a filename** are mutually exclusive.</Callout>	| Place a checkmark in the checkbox, then enter file extensions (excluding a leading period) in the field below the checkbox. |
| Host Header| The value to include in the HTTP Host header when communicating with your origin server| To help prevent end-users from requesting content directly from your origin.| If you plan to block requests to your origin based on the value of the Host header, select **Published Hostname** or enter a value in the **Value** field. <br /> If you are hosting more than one origin on a single server, please see the additional information below. <br /> For more information, see [Host Header Details](#host-header-details). |
|Source protocol|The HTTP protocol(s) to use when retrieving content from your origin (when the content is not found in the cache or has expired in cache) | To ensure your content is retrieved with the level of security you require |See Published Protocol in this table. |
|Source hostname|The fully qualified domain name or IP address of your origin server|The Content Delivery service needs to know where to get your content when users first request it and also when it needs to be refreshed in the cache| Enter the domain name or IP address of your origin server in the Source hostname field. <br /> If you enter a domain name, it must be fully qualified.|
| Source URL path|The specific path of the source hostname that contains content.|The Content Delivery service needs to know the specific path because a source hostname can contain many paths.| If your content is all in a particular path on your origin, or you added a directory name “alias” with the Published Hostname for a particular origin path, you can enter the origin path by clicking the **Add Path** link <br /> <Callout type="info">This field must contain a value and defaults to /</Callout> |
| Source port| The HTTP port number to use when communicating with your origin server, using the Origin Host and Origin Path you specified| If you are using a port other than the default (80) for HTTP, the Content Delivery service needs to know which port you’ve chosen| Leave the default port number for HTTP unless you are using another port number. If so, enter the new port number in the Origin HTTP Port Number field. <br /> <Callout type="info">The default for HTTPS is 443, and this is the value used by Edgio for all HTTP requests to origin (the value is not editable).</Callout> |
|Location of Content Source|The location of the content you want the Content Delivery service to deliver (the “origin”)|The Content Delivery service needs to know where to find your content when users first request it and also when it needs to be refreshed in the cache|If your content is not stored with Edgio, choose **Outside Edgio infrastructure**. Otherwise, choose the appropriate Edgio Storage location. <br /> If you choose **Outside Edgio infrastructure** in **Location of Content** Origin, the following additional fields are displayed: <br /> - Origin Protocol <br /> - Origin Host <br /> - Origin Path <br /> - Origin HTTP Port <br /> If you choose a storage option in **Location of Content** Origin, the following fields are displayed: Origin Path <br /> <Callout type="info">If you are using {{COMPANY_NAME}} storage but your storage option is not shown, your Content Delivery service is not fully configured. If this is the case, please contact Support.</Callout>

#### Host Header Details {/*host-header-details*/}

Browsers usually include the origin domain name of the requested URL in the HTTP Host header. You can use this behavior to detect and block such requests on your origin, denying those with a Host header that matches your domain name and accepting those that match either your **Published hostname** or another value you enter in the **Value** field.

If you are hosting more than one origin on a single server and want to block based on Host headers, don’t use **Published hostname**; instead, enter a value in the Value field. If you are hosting more than one origin on a single server and don’t want to block them based on Host headers, choose **Origin Host**.

#### Example Settings {/*example-settings*/}

| Configuration Field| Value| Notes|
|---|---|---|
| Published protocol| HTTPS| Accept only HTTPS requests for cached content|
| Published hostname| ```published.host.com```| Use a CNAME alias instead of the name provided in the Welcome Letter (need to set up the CNAME separately)|
| Published URL path| ```/pubimages/```| Use the pubimages directory to identify the content in cache uniquely.|
| Source protocol| HTTP Always| Always use HTTP to communicate with the origin server|
| Source hostname| ```origin.host.com```|  |
| Source URL path| ```/images/```| Directory path to the origin content; note that this doesn’t need to match the path (if any) for the Published Hostname|
| Origin HTTP Port| ```80```| Use the default HTTP port (no need to change anything)|
| Host Header| Published Hostname| Blocks most browser requests made directly to the origin|

Using the example configuration settings above, if favicon.ico is not cached for this configuration or has expired in the cache, a request to ```https://published.host.com/pubimages/favicon.ico``` will result in an origin request for ```http://origin.host.com/images/favicon.ico```, with an HTTP Host header of ```published.host.com```.

### Caching Rules  {/*caching-rules*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
| TTL| Whether to override the default method for determining if an object in the cache is expired.| In some cases, you may want to take explicit control over object expiration times (TTL - “Time To Live”).|  Make selections in the TTL presets field. <br /> -To allow Content Delivery to calculate TTL, select **Not selected**. <br /> - To make your TTL settings, select **Configure manually** and configure the **Minimum TTL** and **Maximum TTL** fields. When you make manual settings, you must also configure the Cache Generated Responses field. <br /> - To set TTL to a specific length of time, select one of the preset times. When you opt for preset values, you must also configure the **Include generated responses** and **Cache Generated Responses** fields. See [Caching Best Practices](#caching-best-practices) for additional information.|
|Cache large files on first request|Whether you want any request for an object to force the full object to be cached, even if the request is canceled.	 | ||This feature is intended for large file downloads and is not recommended for caching website objects (such as image, CSS, and JavaScript files).|
|Ignore "No cache" header|Whether Content Delivery should ignore certain Cache-Control headers when determining whether or not to cache an object retrieved from your origin||You may want to cache objects regardless of origin settings that attempt to turn off caching|If you want to ignore the followingCache-Control headers: <br /> - Cache-control: no-cache <br /> - Cache-control: no-store <br /> - Cache-control: private <br /> - Pragma: no-cache <br /> Enable this option. Otherwise, leave it disabled. |
| Query String Caching| Whether to use URL query terms to determine whether or not objects are cached| 	You may want to increase cache efficiency by ensuring certain objects are not duplicated due to variations in their query terms	| Choose the option that caches the minimum number of objects necessary based on query parameters: <br /> - Strip no query terms from the cache key <br /> - Strip all query terms from the cache key <br /> - Exclude specific query terms <br /> - Keep only specific query terms <br /> <Callout type="info">For the Exclude specific query terms and Keep only specific query terms options, you must enter a comma-separated list of the query terms to be excluded or included.</Callout> |
|Vary Headers <Callout type="info">For static content configurations only</Callout> |Which **Vary** response header fields Content Delivery should use when differentiating versions of an object in the cache |Content Delivery stores a different version of a requested object for each unique set of request header fields specified by the **Vary** header. <br /> If the Vary header specifies request header fields that change frequently, multiple copies of the same object may be stored in the cache. <br /> To control this behavior, you can configure Content Delivery to ignore all Vary headers or specific Vary headers when caching and retrieving objects. <br /> All of the Vary headers associated with the object are still maintained and passed on to the client in the response. | - If you only want to cache a single version of an object regardless of its **Vary** header fields, choose **Ignore all Vary headers** <br /> - If you want to cache a new version of an object whenever any of its **Vary** header fields changes, choose **Do not ignore Vary headers**  <br /> - If want cache a new version of an object whenever all but certain specified **Vary** header fields change, choose **Ignore specific vary headers** and select the Vary headers fields to ignore|
|Partial Cache|Whether to use Partial Caching to improve cache performance|Partial Caching is a Content Delivery feature that caches commonly-requested portions of content requested using HTTP GET ranges. This optimization can significantly improve performance for large media files.|To enable this setting, check the **Partial Cache** checkbox, and in the associated field, enter a Regex value that matches the object URLs you want to optimize|
| N Byte Download|Whether to download the first "n" bytes to improve cache performance|Content Delivery can automatically cache a specified number of bytes from the beginning of cached files. This optimization can improve first-byte response times in some scenarios.|To enable this setting, check the **N Byte Download** checkbox, and in the associated field, enter a Regex value that matches the object URLs you want to optimize

#### Caching Best Practices {/*caching-best-practices*/}

Use the Not selected setting unless you have a specific reason to override how the Time to Live (TTL) is calculated.

By default, Content Delivery considers an object “stale” (expired from cache) if the number of seconds specified by the associated Cache-Control: ```s-maxage or Cache-Control```: ```max-age``` header has elapsed since initial caching or since the last freshness check, or if neither header is present if the date and time in the ```Expires``` header have passed. The order of precedence is ```Cache-Control: s-maxage```, ```Cache-Control: maxage```, then ```Expires```.

If no explicit freshness information is supplied (there are no Cache-Control: s-maxage, Cache-Control: max-age or Expires headers), and a Last-Modified header is present, the CDN will by default use the adaptive cache freshness algorithm to calculate remaining TTL, based on 20% of the age of the cached response, subject to a floor of 3 seconds and a ceiling of 3 days.

If you need to override (ignore) the above behavior, you can use the **Configure manually** option to specify a new TTL value using the **Time to live (TTL)** drop-down menu.

You can also control whether generated responses are cached using the **Cache Generated Responses** checkbox (for the Custom option) or **Including Generated Responses** (for other values in the drop-down menu).

<Callout type="info">Generated responses are HTTP responses that are generated dynamically (“dynamic content”). These responses often do not include any of the cache-control headers needed to determine TTL and are not cached by default to avoid caching personalized or user-specific responses. <br /> <br />
By default, Edgio defines a generated response as one that is missing all of the following headers: <br /> - Expires <br /> - Last-Modified <br /> - Cache-Control: max-age <br /> - Cache-Control: s-max-age</Callout>

If you choose the **Custom** option for **Time to live (TTL)**, you can change the cache freshness algorithm's parameters using **Specify custom floor and ceiling cache values**.

If desired, the floor (minimum) can be raised, and the ceiling (maximum) can be lowered or raised. If min and max are set equal to each other, the TTL becomes explicit rather than adaptive.

### Arc Light  {/*arc-light*/}

You can use Arc Light to customize how Content Delivery reacts to HTTP requests and responses. Rules can be triggered when a request or response meets pre-defined conditions, such as a pattern match. Rules are designed based on specific customer needs.

<Callout type="info">This option is available only for websites & apps configurations</Callout>

#### Configuration Overview  {/*configuration-overview*/}

Use Arc Light to customize how Content Delivery reacts to the following HTTP request and response types:
- Requests
    - Any
    - Origin only
    - Edge only
- Responses
    - Any
    - Origin only
    - Client only

For each of the above request and response types, you can assign one rule. Content Delivery will then execute that rule each time it receives the associated request or response type. The rule will be executed on the Edge Server that receives the request or response.

To enable Arc Light for a specific request or response type, check the checkbox next to the desired type (example: **x Rules on Edge Request**). To assign a rule, click one of the rules in the list below the request/response type.

Rules can be triggered when a request or response meets pre-defined conditions, such as a pattern match with:
- The URL, file name, or query term
- The IP address
- The value of a specified HTTP header
- A cookie
- The geographic location of a request (using the IP address)

When a rule is triggered, it can perform a variety of actions, such as:
- Controlling which CORS headers are sent in response to a client request
- Adding a cookie that contains geolocation information
- Adding specific HTTP headers
- Appending special “keys” to cache keys Enabling or disabling GZIP compression
- Controlling whether the requested content is cached and setting content TTLs

Rules are designed based on specific customer needs. If you need to use Arc Light or want more information on the types of rules that can be created, please contact your Account Manager or Solutions Engineer.

#### Configuration Settings {/*configuration-settings*/}

| Setting|Information Requested|Purpose|Selecting the Right Option|
|---|---|---|---|
| Which rules do you want to enable?|If you want to create a new rule, the type of HTTP request or response to associate it with| 	Content Delivery can trigger rules for several types of requests and responses	| (see the options below)|
| Rules on Any Request	| Request type|Content Delivery can trigger rules for several types of requests	| To trigger a rule on any request received by a EdgioEdge Server, check the **Rules on Any Request** checkbox, and select one of the predefined rules in the list|
| Rules on Edge Request| 	Request type| 	Content Delivery can trigger rules for several types of requests	| To trigger a rule on client requests to a EdgioEdge Server, check the **Rules on Edge Request** checkbox, and select one of the predefined rules in the list|
| Rules on Origin Request	| Request type	| Content Delivery can trigger rules for several types of requests| To trigger a rule on Edgio requests to your Origin, check the **Rules on Origin Request** checkbox, and select one of the predefined rules in the list|
| Rules on Any Response| 	Response type	| Content Delivery can trigger rules for several types of responses	| To trigger a rule on any response received by a EdgioEdge Server, check the **Rules on Any Response** checkbox, and select one of the predefined rules in the list|
| Rules on Origin Response	| Response type	| Content Delivery can trigger rules for several types of responses	| To trigger a rule on responses received from your Origin, check the **Rules on Origin Response** checkbox, and select one of the predefined rules in the list|
| Rules on Client Response	| Response type	| Content Delivery can trigger rules for several types of responses	| To trigger a rule on responses received from the requesting client, check the **Rules on Client Response** checkbox, and select one of the predefined rules in the list|

### Media Delivery  {/*media-delivery*/}

Content Delivery supports "seeking" or "scrubbing" (skipping back and forth) within FLV and MP4/H.264 video files. Seeking is controlled via parameters specified in the query terms of the request URL.

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
| Enable FLV Scrubbing| Whether to allow a video client to skip forward and back (seek) within FLV files based on parameters specified in the query terms of the request URL.| Custom clients may want to provide the “seek” capability (“forward” and “back” buttons)| To enable this feature, check the **Enable FLV Scrubbing** checkbox|
| Enable MP4/H.264 Scrubbing| Whether to allow a video client to skip forward and back (seek) within MP4 files based on parameters specified in the query terms of the request URL.| Custom clients may want to provide the “seek” capability (“forward” and “back” buttons)| To enable this feature, check the **Enable MP4/H.264 Scrubbing** checkbox|

### Optimization  {/*optimization*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
|Type of Compression|Whether to use Gzip compression when delivering XHTML, JavaScript, CSS, and other text files|Compressed objects are delivered more quickly, potentially improving the user experience| - If you want to provide all compressed files from your origin server, choose the **Gzip Passthrough** option <br /> - If you prefer to have the Content Delivery service compress files when the requesting client can accept them, choose **Gzip on-the-fly** <br /> - If you need to modify Gzip compression defaults, choose **Custom**, then either **Gzip on-the-fly** or **Gzip Passthrough**, and enter your Gzip modification extensions <br /> - You can also choose **No compression** if none of your files should be delivered compressed <br /> - For more information on this feature, see [Gzip Details](#gzip-details)|
|TCP Acceleration|The “profile” to use when accelerating the transfer of IP packets by modifying default TCP parameters|In certain circumstances, you may want to change the **TCP Acceleration** profile to optimize your delivery performance|When TCP Acceleration is enabled, the XDLL profile is the most efficient in many cases. <br /> <Callout type="info">TCP Acceleration is an advanced configuration setting and should only be changed if you’re an expert user.</Callout>|
|Enable chunked response to client <br /> <Callout type="info">for static content configurations only </Callout>| Whether the Content Delivery service can maintain open TCP connections to your origin server|If there is a cache “miss” and your origin doesn’t provide a Content-Length header, this option allows Content Delivery to serve the requested content more efficiently (in “chunks”)|We recommend you enable this option. Otherwise, new TCP sessions must be established for each new request to origin, and cache miss requests are delivered only when the entire object has been transferred from origin.|

#### GZip Details  {/*gzip-details*/}

When **Gzip Passthrough** is enabled, and a client indicates (via HTTP request header) that it prefers to receive compressed content, theContent Delivery service will serve a compressed version of the requested object if one is available on the origin server.

<Callout type="info">Gzip Passthrough is available to all customers. If it is not enabled for you, please contact Edgio Support.</Callout>

If **Gzip On-the-fly** is selected, the Content Delivery service creates, caches, and delivers Gzip-compressed content as needed.

Compressible file types include: ```action, ashx, asmx, asp, aspx, axd, cfm, css, css3, csv, do, doc, docx, htm, html, js, jsf, json, jsp, php, portal, rtf, svg, svgz, tsv, txt, xhtml, xml, site root (/),``` and extensionless URLs.

### Headers & Methods  {/*headers-and-methods*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
|Client Analytics|Whether you want the Content Delivery service to provide geographic user information when requesting content from your origin|You may want to capture, analyze, and report on user geographic information internally.|To use this feature, check the **Client Analytics** checkbox. <br /> The geo information is provided to your origin server via two request headers: X-IP-Geo-Country and X-IP-Geo-All. <br /> The geo fields provided are ``continent, state, city, dma_id```, and ```asn```.|
|Add client IP address to origin request header <br /> <Callout type="info">for static content configurations only </Callout>| Whether you want the Content Delivery service to provide the requesting client’s IP address in a custom header when requesting content from your origin|You may want to capture, analyze, and report on user IP information internally.|To enable this feature, check the **Add client IP address to origin request header** checkbox, and enter the header names containing the client IP address. <br /> The default header name is ```True-Client-IP```. <br /> Note that the above headers are in addition toX-Forwarded-For, which is always provided to the origin.|
|POST Requests|Whether you want to accept or ignore POST requests from clients|If you are using a custom client to display content, you may want to communicate analytics or other information to your origin. Alternatively, you may want to convert POST requests to GET requests or ignore them.| - To ignore all POST requests, select **Disable HTTP POST requests**. Content Delivery will respond with an ```HTTP 413 Request Entity Too Large``` status code to all POST requests. <br /> - To accept POST requests and pass them through to your origin, select Enable HTTP POST requests. If a POST request body exceeds 500 MB,Content Delivery will respond with a ```413 Request Entity Too Large``` status code. <br /> - To accept POST requests but treat them as GET requests, select **Enable HTTP POST requests**, and check the **Discard request body on POST request** checkbox. POST bodies will be discarded.|
|Add custom request header|Whether you want to include custom headers and values wheneverContent Delivery makes a request to your origin|If you want to tag all requests from Content Delivery for later analysis|To add a custom origin request header, enter a unique header name and value and. Click the "+" button to add additional headers.|
| Add Edgio server IP address when responding to client|Whether to provide clients with the IP address of the Content DeliveryEdge Server responding to their requests|If you are using a custom client to display content, and you are also capturing performance-related data via the client, you may want to include the Content DeliveryEdge Server IP address for later analysis and reporting. <br /> The IP address will be provided in the X-IP-Address response header.|
| To enable this feature, check the **Add Edgio server IP address when responding to client** checkbox|
|
Add custom response header|Whether you want to include custom headers and values whenever Content Delivery responds to a client request|If you are using a custom client to display content, you may want to provide it with information that uniquely identifies the Content Delivery service, Limelight Account, etc.|To add a custom client response header, enter a unique header name and value and. Click the "+" button to add additional headers.|
|Enable Custom Debug Headers|Whether you want to enable Custom Debug Headers|By making an HTTP content request with special "Custom Debug Headers," including a shared secret specific to your service, you can retrieve cache-related information about individual content objects and prevent others from accessing the information.|In the **Debug Headers** field, enter one or more "tags" to include in the Custom Debug Headers. Then in the **Secret Key To Request Debug Information** field, enter the secret key (shared secret) provided by Edgio when the Custom Debug Headers feature was enabled. <br /> For more information, see [Secure Cache Diagnostics](#secure-cache-diagnostics).|

### Secure Cache Diagnostics  {/*secure-cache-diagnostics*/}

When troubleshooting caching issues, customers can directly access diagnostic information about cached content.

Content Delivery customers with Configuration Self Service can request cache-related information about individual content objects and prevent others from accessing the information.

To enable this feature, check the **Enable Custom Debug Headers** checkbox in the **Request and Response Headers** section of Content Delivery Configuration Self Service, and provide a comma-separated list of object properties that should be returned in the response, along with a Secret Key to authenticate the request.

Diagnostic response headers can include the following information:

- Whether or not a response is cacheable
- How the cache responded to a request (hit, miss, etc.)
- The number of seconds before the cached response will be considered stale (TTL)
- The total number of seconds representing the freshness lifetime of the response (age + TTL) and how the value was determined (headers, overrides, adaptive TTL, etc . )
- When the feature is activated, you will be provided with a unique shared secret.

The properties that can be requested, and their associated response headers and values, are:

|Request Key | Response Header | Return Values |
|---|---|---|
|```is-cacheable```	|```X-LLNW-Dbg-Is-Cacheable```	| ```Yes``` <br /> ```No``` <br /> ```Negative```|
|```cache-hit-type```	|```X-LLNW-Dbg-Cache-Hit-Type```	| ```HIT``` <br /> ```MISS``` <br /> ```REFRESH_HIT``` <br /> ```REF_FAIL_HIT``` <br /> ```REFRESH_MISS``` <br /> ```CLIENT_REFRESH_MISS``` <br /> ```IMS_HIT``` <br /> ```NEGATIVE_HIT``` <br /> ```DENIED``` <br /> ```OFFLINE_HIT``` <br /> ```REDIRECT```|
|```ttl```	|```X-LLNW-Dbg-TTL```	| ```n{...} seconds``` <br /> an integer followed by a space and the string "seconds"|
|```fresh-life-total```	|```X-LLNW-Dbg-Fresh-Life-Total```	|```n{...} seconds``` <br /> an integer followed by a space and the string "seconds"|

If the secret is invalid, the X-LLNW-Dbg-Hdrs header will be ignored, and the request will be processed without it.

Request and response example:
|Request | Response|
|---|---|
|```GET http://www.customer.com/object.txt HTTP/1.1...X-LLNW-Dbg-Hdrs: is-cacheable,cache-hit-typeX-LLNW-Dbg-Secret: sharedsecret```| ```HTTP/1.1 200 OK...X-LLNW-Dbg-Is-Cacheable: Yes...X-LLNW-Dbg-Cache-Hit-Type: HIT``` |

### Failover  {/*failover*/}

Normally when the CDN receives a ```404 (Not Found), 503 (Service Unavailable)```, or ```504 (Gateway Timeout)``` response from your origin, the error is passed back to the requesting client. You can modify this configuration option as follows:

For ```404``` errors:
- Serve "stale" content from the CDNCache, or
- Request content from a "backup host" (with or without a path), or
- Redirect to a custom "Not Found" URL.

For ```503``` and ```504``` errors:
- Request content from a "backup host" or
- Redirect to a custom "Service Unavailable URL."

<Callout type="info">Failover URLs must match their configuration within the CDN <br /> For ```404``` error redirects, the original request is reissued to the fallback URL with any modifications still in place <br /> ```503``` or ```504``` errors may have been generated by the origin but could also be generated by CDN if a connection can't be made to your origin</Callout>

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
|Serve stale content instead of ```404``` error|If the requested content is cached but stale (expired), and there is an HTTP 404 status when requesting a fresh version from your origin, this field indicates whether you want to pass the ```404``` status back to the client or serve the stale content instead|If an object has expired in the cache and your origin server returns a ```404 (Page Not Found)``` error when Content Delivery attempts to get a fresh copy of the object, you may want to serve the expired object instead of allowing the client to handle ```404``` messages.|If you don't want the client to handle ```404``` messages, and it is acceptable to serve stale content instead, check the **Serve stale content instead of 404 error** checkbox. <br /> <Callout type="info">If there is no cached object, a ```404``` message will still be returned to the browser.</Callout>|
|Request content from backup host on ```404``` error||If there is an HTTP ```404``` status when requesting fresh content from your origin, this field indicates whether to use a backup origin (hostname only) before handling the ```404``` status|If your primary origin returns a ```404``` status, and you have a backup origin, you may want Content Delivery to try the backup before handling the error.|To serve content from a backup origin if the primary origin responds with a ```404``` status, enter the fully qualified hostname of the backup origin. <br /> <Callout type="info">Specific ports are not supported. </Callout>|
|Use custom "Not Found" page|Whether you want to pass HTTP ```404``` status messages back to the client or serve a custom error page instead|If an object has expired in the cache, and your origin server returns a ```404``` error to Content Delivery, you may want to serve a custom error page rather than allowing the client to handle the ```404``` message.|To take control over clients' content when the origin returns a ```404```, enter the fully qualified URL of the content to serve.|
|Request content from backup origin URL on ```404``` error|If the origin responds with an HTTP 404 status upon request for fresh content, this field indicates whether the request should be sent to a backup URL path before handling the ```404``` status|If your primary origin returns a ```404``` status, and you have a backup origin, you may want Content Delivery to try the backup before handling the error.|To serve content from a backup URL path if the primary origin responds with a ```404``` status, enter the fully qualified path on the backup origin. <br /> <Callout type="info">- You can specify either the HTTP or HTTPS protocol and a port number if desired. <br /> This option is required when using the Intelligent Ingest feature of Origin Storage</Callout>|
|Request content from backup host on 5xx error|If there is an HTTP ```5xx``` status when requesting fresh content from your origin, whether to try a backup origin before handling the ```5xx``` status|If your primary origin returns a ```5xx``` status, and you have a backup origin, you may want Content Delivery to try the backup before handling the error.|To serve content from a backup origin if the primary origin responds with a ```5xx``` status, enter the backup origin's fully qualified hostname. <br /> <Callout type="info">Specific ports are not supported.</Callout>|
|Use custom "Service Unavailable" page|Whether you want to pass HTTP ```503``` and ```504``` status messages back to the client or serve a custom error page instead|If an object has expired in the cache, and your origin server returns a ```503 Service Unavailable``` or ```504 Gateway Timeout``` error to Content Delivery, you may want to serve a custom error page instead of allowing the client to handle the error message.|
| If you want to take control over the content displayed by clients when there is a ```503``` or ```504``` error from the origin, enter the fully qualified URL of the content to serve.|

### Content Security  {/*content-security*/}

#### IP Access Control {/*ip-access-control*/}

This section allows you to allow or deny access to content based on IP addresses and geographic locations ("geo-fencing").

Content Delivery Configuration Self Service provides access control using IP addresses and geographic locations ("geo-fencing"). When configuring an Account, you can associate lists of IP addresses and groups of geographic locations with the Account and specify whether to allow or deny each. When managing IP address lists, you can also view whether they are currently in use and which Accounts they are associated with (or limited to).

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
|Enable IP Access Control|Whether you want to "allow list" or "deny list" requests based on IP address lists and IP-based geographic locations	|IP Access Control allows you to exclude specific geographies or limit access to known entities| Assign access lists to the Caching & Delivery configuration using the following drop-down menus: <br /> - **By IP address list**: Select one or more existing lists, then choose either Deny or Allow to indicate the type of restriction. Click Add to add the lists to the Access control list for this configuration section. <br /> - **By geolocation**: Select one or more geographic areas (continents or countries), then choose either Deny or Allow to indicate the type of restriction. Click Add to add the lists to the "Access control list for this configuration" section. <br /> **Access control list for this configuration** Section <br /> You can select a default security setting for the configuration - either **Default Allow** or **Default Deny**. You can then add one or more IP address lists and geographic locations that modify the default setting. IP address lists and geolocations can be "mixed and matched" in any order desired. <br /> To move an item in the list, move the mouse pointer over the item and use the vertical ellipses to drag and drop the item to another location in the list. <br /> If you have the correct permissions, click **Manage IP Lists** to display a dialog that allows you to create new IP access lists. You can also view, edit, and delete existing IP address lists. <br /> To view list details, click the + icon to the left of a list. <br /> - The text "Used by configs in accounts" shows which Accounts have configurations that use the list. <br /> - The text "Limited to accounts" shows any accounts to which your Company Admin has limited the list. <br /> To create a new list, click the **new list** button at the top of the dialog, then: 1. Provide a name for the list. <br /> 2. Provide a single IP address or range of IP addresses. You can also create and upload CSV files of IP addresses. Click the link to see a sample CSV file. <br /> 3. Optionally limit the list to accounts. <br /> 4. Click the **Save** button. The new list is now available in the ***By IP address list:** drop-down menu at the top of the section. <br /> To deny access to end users attempting to access your content using an anonymous VPN from an unauthorized geolocation, select the **Deny 'Anonymized with VPN' access** option. <br /> <Callout type="info">- IP address lists and geographic locations are processed in the order they are specified (top to bottom). Once a match is found, subsequent lists and locations are ignored <br /> - Users with the Company Admin role can manage lists for all accounts. Users with the User role who have been granted the Manage Delivery Configurations permission can apply all lists in the Accounts for which they have been granted management permission. <br /> - Changes made to IP address lists are applied immediately and affect all Account configurations which use them (even legacy configurations that can't be edited in Control.) <br /> - IP address lists cannot be deleted if they are in use.</Callout>|

### {{MEDIAVAULT}}  {/*mediavault*/}
| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
|Enable {{MEDIAVAULT}} content protection|Whether you want to use {{MEDIAVAULT}} to provide additional content security. {{MEDIAVAULT}} provides high-performance URL authentication.|{{MEDIAVAULT}} can help you prevent “deep linking” and other unauthorized viewing behavior|To enable this feature, check the **Enable {{MEDIAVAULT}} content protection** checkbox, and provide a primary and secondary “shared secret” (both used to prevent URL tampering). <br /> You can also change the HTTP Error Code returned by {{MEDIAVAULT}} from the default 400 code by entering a new value in the Deny Status Code field.|

#### More about {{MEDIAVAULT}}

{{MEDIAVAULT}} is a high-performance URL authentication service. {{MEDIAVAULT}}’s main purpose is to help you secure your content from unauthorized viewing.

{{MEDIAVAULT}} maximizes authentication performance by using tokens to avoid three-way handshakes (common to other authentication methods) that can lead to severe connection time latency.

Please note that {{MEDIAVAULT}} is not a replacement for DRM and should not be associated with user authentication.

{{MEDIAVAULT}} works like this:

- You enter a shared secret during the configuration process
- You then generate a token (MD5 hash) for each published URL, based on the shared secret, and append it to the URL in a query term or provide it in a cookie.You can generate the token manually by navigating to the Configure > {{MEDIAVAULT}} in the navigation pane, or by creating server-side code on your origin.
- {{MEDIAVAULT}} uses the same hash algorithm to create its token when a request is received, identical to the one you appended.
- If the tokens match, {{MEDIAVAULT}} then looks for additional {{MEDIAVAULT}}-specific query terms (such as end date/time and IP address/mask) to determine whether the request is valid. If the tokens don’t match, the URL was tampered with, and the request is rejected.

For more information, see the [{{MEDIAVAULT}} User Guide](delivery/delivery/mediavault).

#### Amazon S3 Authorization {/*amazon-s3-authorization*/}

If you store content on Amazon S3, use this option to set your S3 access key, secret, and region.

#### Send SSL SNI to Origin {/*send-ssl-sni-to-origin*/}

Server Name Indication (SNI) is a TLS extension that allows multi-tenancy of domains hosted on a web server. Shared cloud platforms often require SNI. The extension helps select the appropriate certificate for that domain and helps serve the appropriate content. Most modern web servers handle SNI; this option disables SNI for the minority of web servers that do not handle SNI correctly.

If a user is creating a new configuration and the selected protocol sets include HTTPS, then the **Send SSL SNI to Origin** option is selected by default.

If a user is editing a configuration, then the field is visible and enabled depending on the selected [Service Profile](#service-profiles).

### Logging  {/*logging*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
|Log cookies|Whether you want Content Delivery to stop saving cookie information in your log files|If you process log files and don’t need the information in the Cookie header, you may want to remove it to simplify processing and reduce log file size.|If you know you need Cookie header information in your log files, check the **Log cookies** checkbox. Otherwise, leave it unchecked. <br /> When this setting is enabled, Content Delivery logs all Cookie header information, up to a maximum of 8 KB for the entire header (regardless of the number of cookies in the header).|
|Log request header|Whether you wantContent Delivery tostart saving specific Request Headers in your log files|If you process log files and need access to information in the Request Headers, you may want to enable this option|If you know you need Request Header information in your log files, check the **Log Request Header** checkbox and enter the names of the specific headers to log. Otherwise, leave it unchecked.

### Cookie Handling  {/*cookie-handling*/}

{{EDGEPRISM}} issues a ```Set-Cookie``` header whenever it receives a request that has a specified query parameter. This feature provides a way for a cookie to be set with the query string sent in a request URL. You can create a configuration by entering values into the fields provided.

|Field|Description|
|---|---|
|Cookie parameter|	Cookie name|
|URL query term selector	|String that identifies the query term|
|Expiration	|Date when the configuration expires|
|Domain	|Domain to which the configuration applies|

<Callout type="info">You can also use the feature to indicate when a ```Set-Cookie``` header should not be issued.</Callout>

#### Cookie Handling Example  {/*cookie-handling-example*/}

This example instructs EdgePrism to issue a ```Set-Cookie``` header to the requesting client with the key nlpqtid, no expiration, and a Domain parameter of .ExampleDomain.com whenever EdgePrism detects ```pid=``` in the requested URL's query string.

|Field|Value|
|---|---|
|Cookie parameter|	nlpqtid|
|URL query term selector	|pid=|
|Expiration	|0|
|Domain	|.ExampleDomain.com|

### Redirect  {/*redirect*/}

You can specify conditions under which a content request should be redirected.

#### Redirect hostname header regex {/*redirect-hostname-header-regex*/}

This option can be used to issue a redirect based on a specified header and value. You can optionally request strict header regex checking.

|Field|Description/ Instructions|
|---|---|
|Header name|Name of the header on which the redirect is based.|
|HTTP Code	|HTTP Status Code upon which to issue the redirect.|
|Comma-separated key-value pairs	|Header values upon which to issue the redirect.|
|HTTP code 301 or 302 |Status code to use for the redirect. Enter either 301 or 302. <br /> Instead of delivering content from the origin, EdgePrism can redirect the user to a particular URL.|

#### Strict Header Regex Checking {/*strict-header-regex-checking*/}
If the header values you entered in the Redirect hostname header regex are not in the specified Header name, EdgePrism will use the fields below as the conditions under which it will issue the redirect.

|Field|Description/ Instructions|
|---|---|
|HTTP Code	|HTTP status code returned from the content request.|
|hostname	| Hostname from which content was requested.|

### Others  {/*others*/}

This section presents additional delivery options you can use in the Chunked Streaming configuration. For descriptions, hover your mouse pointer over the right side of the option name. An information icon appears along with the option description.

### Additional Options  {/*additional-options*/}
The **Additional Options** section allows you to quickly configure options that are available elsewhere on the page. If you know the options you want, you can configure them here in one location.

If you selected **Both HTTP and HTTPS** in the Content Location section, you could use the section to configure options for a particular protocol set.

1. Begin typing an option name in the Options field. The field has auto-complete capabilities, so you do not have to type the full name. As you type, matching options display in the auto-filtered list. <Callout type="info">Available options depend on your account name and the service profile at the top of the page.</Callout>
2. Select the option from the auto-filtered list.

The UI adds the option to a list above the option field.

#### Working with the Option/Protocol Sets List

This list allows you to associate protocol sets for the option you selected and enter any required option parameters.

1. If parameters are required for the option, a field is displayed to enter parameter values. A prompt describing the parameter is displayed beneath the field.

2. Enter a parameter value.

3. If you selected Both HTTP and HTTPS in the Content Location section, two protocol sets are displayed to the right of the list item; otherwise, only one protocol set is displayed.

4. Associate an option set with the option by selecting the desired protocol sets.

5. To remove an option, hover over its row in the list and click the ( x ) icon on the right side of the row.

### Notes  {/*notes*/}

You can use the **Notes** field for additional information for others (why the configuration changes were made, etc.). Users can refer to the notes later when browsing historical configuration changes


## Editing a Configuration  {/*editing-a-configuration*/}

To make configuration changes to existing Published Protocols or Source Protocols,

1. Click the edit (pencil) icon on the right side of the configuration.
2. In the CONTENT LOCATION section, select the drop-down arrow for the published or source protocol to launch the PROTOCOL SETS MIGRATION window.
3. Choose your HTTP/HTTPS Protocol Set combinations; add one more protocol set if the configuration consists of just one protocol set; or remove one protocol set by selecting the 'Do not use' option.
4. Click APPLY.

<Callout type="info">On rare occasions, a configuration might contain unsupported protocol set configurations, and if you attempt to edit the configuration, Control prevents you from editing and displays this message: <br /> "Configuration cannot be saved. Please contact administrator to resolve the conflict between options." <br /> Unsupported protocol sets are often the byproduct of migrating a configuration from an older configuration version.</Callout>

For information on the individual settings displayed, see the descriptions in [Creating a New Configuration](#creating-a-new-configuration).

<Callout type="info"> - The ability to edit configurations is subject to conditions described in [Read-Only and Hidden Capabilities](#read-only-and-hidden-capabilities). <br /> - On rare occasions, a configuration might contain unsupported protocol set configurations, and if you attempt to edit the configuration, Control prevents you from editing and displays this message: "This protocol combination is not supported in this application. You may view it here, but to make modifications, either do so via our configuration API or reach out to your account team." <br /> - Unsupported protocol sets are generally the byproduct of migrating a configuration from an older configuration version. </Callout>

## Previewing a Configuration  {/*previewing-a-configuration*/}

<Image inline src="/images/delivery/control/preview-icon.png" alt="Preview" /> To preview the settings associated with a configuration, click the "eye" icon at the bottom right of the configuration row. For information on the individual settings displayed, please see the setting descriptions in [Creating a New Configuration](#creating-a-new-configuration).

## Cloning a Configuration  {/*cloning-a-configuration*/}

<Image inline src="/images/delivery/control/clone-icon.png" alt="Clone" /> To clone (make a copy of) a configuration, click the "copy" icon at the configuration row's bottom right. When you have finished making changes to the settings, click **Activate** to enable the new configuration.

If you want to change protocol sets, see [Changing Protocol Sets](/delivery/control/configure/chunked_streaming).

<Callout type="info">The ability to clone configurations is subject to conditions described in [Read-Only and Hidden Capabilities](#read-only-and-hidden-capabilities).</Callout>

<Callout type="info">For some configurations created for you by Edgio, only the preview ("eye") icon will be visible. If this is the case, and you need to make changes, please contact your Account Manager or Solutions Engineer. Edgio can continue to manage the configuration, or it can be made available for you to edit in {{CONTROL}}.</Callout>

## Deleting a Configuration  {/*deleting-a-configuration*/}

Users are not able to delete configurations. For more information, see [Read-Only and Hidden Capabilities](#read-only-and-hidden-capabilities).

## Reverting to a Previous Configuration  {/*reverting-to-a-previous-configuration*/}

<Image inline src="/images/delivery/control/revert-icon.png" alt="Revert" /> Each time you update a configuration, a new version is assigned.

To revert to a previous configuration:
1. Click the "undo" icon at the bottom right of the configuration row. A list of previous versions is displayed in a dialog.
2. Select the version to which you want to revert. <br /> <Callout type="info">Although you intend to revert to a previous version, the reverted version will become the current version with a new version number. The new version number is displayed at the bottom of the dialog.</Callout>
3. Click the Activate button. <br /><Callout type="info"> The ability to revert configurations is subject to conditions described in [Read-Only and Hidden Capabilities](#filtering-the-list-of-configurations).</Callout>
