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
To create a new configuration, click the `+new` button, and the Create configuration screen will be displayed.

### Service Profiles  {/*service-profiles*/}

Each new configuration is based on a Service Profile. Service Profiles define the configuration structure and specify default and mandatory options that must be applied on every configuration. A Service Profile can serve as both a guide and a guardrail for the type of content your configuration will serve (characterized by a Use Case).

The **Use Case** and **Service Profile** drop-down menus are disabled:
- In existing configurations.
- After you have selected a Published and Source Protocol while you are creating a new configuration.

<Callout type="info">If you have not already saved the new configuration but you want to choose another Service Profile, you can do so by exiting out of the Create configuration screen and creating a new configuration by clicking the `+new` button.</Callout>

If you wish to modify a Service Profile or migrate, add, or remove a Protocol Set for an existing configuration, contact your Account Manager.

### Page Organization  {/*page-organization*/}

Configuration options are grouped into sections by functional category, such as Content Location. Each section displays all of the related options made available by the Service Profile. For sections other than Content Location, the most commonly used options are always displayed. Any remaining options are grouped under the Advanced drop-down menu in each section.

Initially, only the Content Location section is visible. Once you select both a Published protocol and a Source protocol, the rest of the sections and configuration options become available. The combination of a Published protocol and Source protocol is known as a "protocol set."

After you've filled in the configuration fields in each section, click Activate (at the bottom of the page) to enable your new configuration.

### Content Location  {/*current-location*/}

| Setting| Information Requested| Purpose| Selecting the Right Option|
|---|---|---|---|
| Published protocol| The level of HTTP protocol security to use when delivering your cached content to end-users| To ensure your content is delivered with the level of security you require| The Published protocol and Source protocol drop-down menus are disabled:  <br /> - In existing configurations. <br /> - After you have selected a Published and Source protocol while you are creating a new configuration. <br /> <Callout type="info">If you have not already saved the new configuration but you want to choose another Published and Source protocol, you can do so by exiting out of the Create configuration screen and creating a new configuration by clicking the `+new` button.</Callout> |
|Published hostname|The fully qualified domain name that will be used in all public links (Published URLs) to your cached content <br /> <Callout type="info">A URL that includes the Published Hostname is referred to as a Published URL.</Callout> | To direct your users to the Content Delivery service (instead of your origin) |In the Published hostname field, enter the published hostname specified in the Welcome Letter associated with your {{COMPANY_NAME}} Account or a CNAME if desired. <br /> The published hostname provided by Edgio will be in a form similar to: <br /> ```accountname.vo.llnwd.net``` <br /> If you prefer to publish under a different hostname, you can use a DNS CNAME record to alias (point) your desired name to Edgio published hostname. <br /><Callout type="info"> - IP addresses are not accepted. You must enter a fully qualified domain name. <br /> - If you can't find the Edgiopublished hostname in your Welcome Letter, please contact {{COMPANY_NAME}} Support.</Callout> <br /> If you want to use a directory name “alias” for a particular origin path, you can add the alias by entering it in the Published URL path field. <br /> If needed, you can add a regex expression to the start of the Published hostname field, but you must have permissions to do so. Without the permissions, you are restricted as follows: <br /> - When creating or cloning a configuration, you cannot add regex to the field. <br /> - If a configuration has regex in the field, you cannot clone the configuration. <br /> - When updating a configuration that has regex in the field, you cannot modify any part of the Published hostname. <br /> Please contact your account manager if you need assistance with any of these operations. |
| Published URL path	|The path portion of a published URL|To allow your published hostname URL to be more specific and include a path.| Enter the path enclosed in forward slashes. <br /> <Callout type="info"> - This field must contain a value and defaults to / <br /> - If you have the PERMISSION_CONFIGURE_SSUI_REGEX permission, you can include regular expressions in the path.</Callout> |
|This path ends with a filename	|Whether the last component in the path is a file| File names are not validated by extension, so when the Published URL path or Source URL path does not end with a slash, it is treated as a file name. <br /> <Callout type="info">This field and **Only publish files with these extensions** are mutually exclusive. </Callout>| Place a checkmark in the checkbox if the path ends in a file name. <br /><Callout type="info">If you check this option, you must make entries in the **Published URL path** and **Source URL path** fields</Callout> |
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
|Ignore "No cache" header|Whether Content Delivery should ignore certain ```Cache-Control``` headers when determining whether or not to cache an object retrieved from your origin||You may want to cache objects regardless of origin settings that attempt to turn off caching|If you want to ignore the followingCache-Control headers: <br /> - Cache-control: no-cache <br /> - Cache-control: no-store <br /> - Cache-control: private <br /> - Pragma: no-cache <br /> Enable this option. Otherwise, leave it disabled. |
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

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|
| Which rules do you want to enable?| 	If you want to create a new rule, the type of HTTP request or response to associate it with| 	Content Delivery can trigger rules for several types of requests and responses	| (see the options below)|
| Rules on Any Request	| Request type| 	Content Delivery can trigger rules for several types of requests	| To trigger a rule on any request received by a EdgioEdge Server, check the **Rules on Any Request** checkbox, and select one of the predefined rules in the list|
| Rules on Edge Request| 	Request type| 	Content Delivery can trigger rules for several types of requests	| To trigger a rule on client requests to a EdgioEdge Server, check the **Rules on Edge Request** checkbox, and select one of the predefined rules in the list|
| Rules on Origin Request	| Request type	| Content Delivery can trigger rules for several types of requests| To trigger a rule on Edgio requests to your Origin, check the **Rules on Origin Request** checkbox, and select one of the predefined rules in the list|
| Rules on Any Response| 	Response type	| Content Delivery can trigger rules for several types of responses	| To trigger a rule on any response received by a EdgioEdge Server, check the **Rules on Any Response** checkbox, and select one of the predefined rules in the list|
| Rules on Origin Response	| Response type	| Content Delivery can trigger rules for several types of responses	| To trigger a rule on responses received from your Origin, check the **Rules on Origin Response** checkbox, and select one of the predefined rules in the list|
| Rules on Client Response	| Response type	| Content Delivery can trigger rules for several types of responses	| To trigger a rule on responses received from the requesting client, check the **Rules on Client Response** checkbox, and select one of the predefined rules in the list|

### Media Delivery  {/*media-delivery*/}

Content Delivery supports "seeking" or "scrubbing" (skipping back and forth) within FLV and MP4/H.264 video files. Seeking is controlled via parameters specified in the query terms of the request URL.

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|
| Enable FLV Scrubbing| Whether to allow a video client to skip forward and back (seek) within FLV files based on parameters specified in the query terms of the request URL.| Custom clients may want to provide the “seek” capability (“forward” and “back” buttons)| To enable this feature, check the **Enable FLV Scrubbing** checkbox|
| Enable MP4/H.264 Scrubbing| Whether to allow a video client to skip forward and back (seek) within MP4 files based on parameters specified in the query terms of the request URL.| Custom clients may want to provide the “seek” capability (“forward” and “back” buttons)| To enable this feature, check the **Enable MP4/H.264 Scrubbing** checkbox|

### Optimization  {/*optimization*/}

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|

### Headers & Methods  {/*headers-and-methods*/}

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|

### Secure Cache Diagnostics  {/*secure-cache-diagnostics*/}
### Failover  {/*failover*/}

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|

### Content Security  {/*content-security*/}

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|

### MediaVault  {/*mediavault*/}
| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|

### Logging  {/*logging*/}

| Setting| Information Requested| Purpose| Selecting the Right Option
|---|---|---|---|

### Cookie Handling  {/*cookie-handling*/}
### Redirect  {/*redirect*/}
### Others  {/*others*/}
### Additional Options  {/*additional-options*/}
### Notes  {/*notes*/}
## Editing a Configuration  {/*editing-a-configuration*/}
## Previewing a Configuration  {/*previewing-a-configuration*/}
## Cloning a Configuration  {/*cloning-a-configuration*/}
## Deleting a Configuration  {/*deleting-a-configuration*/}

Users are not able to delete configurations. For more information, see [Read-Only and Hidden Capabilities](#filtering-the-list-of-configurations).

## Reverting to a Previous Configuration  {/*reverting-to-a-previous-configuration*/}

<Image inline src="/images/delivery/control/revert-icon.png" alt="Revert" /> Each time you update a configuration, a new version is assigned.

To revert to a previous configuration:
1. Click the "undo" icon at the bottom right of the configuration row. A list of previous versions is displayed in a dialog.
2. Select the version to which you want to revert. <br /> <Callout type="info">Although you intend to revert to a previous version, the reverted version will become the current version with a new version number. The new version number is displayed at the bottom of the dialog.</Callout>
3. Click the Activate button. <br /><Callout type="info"> The ability to revert configurations is subject to conditions described in [Read-Only and Hidden Capabilities](#filtering-the-list-of-configurations).</Callout>
