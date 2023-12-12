---
title: Feature Variables Reference
---

Feature variables retrieves request and response metadata. Use this metadata to dynamically alter a request or a response.

The following features support variables:

-   [Rewrite Cache Key (cache_key_rewrite)](/guides/performance/rules/features#rewrite-cache-key)
-   [Cache Key (cache_key)](/guides/performance/rules/features#cache-key). Feature variable supported is limited to the **Expressions** option (`include_expressions`).
-   [Add Response Headers (add_response_headers)](/guides/performance/rules/features#add-response-headers)
-   [Set Request Headers (set_request_headers)](/guides/performance/rules/features#set-request-headers)
-   [Set Response Headers (set_response_headers)](/guides/performance/rules/features#set-response-headers)
-   [URL Redirect (url_redirect)](/guides/performance/rules/features#url-redirect)
-   [URL Rewrite (url_rewrite)](/guides/performance/rules/features#rewrite-url)

## Definitions {/*definitions*/}

Feature variables are categorized as follows:

-   [Client Device](#client-device)
-   [Client Geography](#client-geography)
-   [Client Network](#client-network)
-   [General](#general)
-   [Request](#request)
-   [Response](#response)

### Client Device {/*client-device*/}

This category contains feature variables that describe the client's device or browser.

| Type | Variable  | Description  |
|---|---|---|
|Brand Name|`%{wurfl_cap_brand_name}`| Indicates the brand name of the device.<br />**Sample Value:** `Samsung`|
|Device OS|`%{wurfl_cap_device_os}`| Indicates the operating system installed on the device.<br />**Sample Value:** `IOS`|
|Device OS Version|`%{wurfl_cap_device_os_version}`| Indicates the version number of the OS installed on the device.<br />**Sample Value:** `1.0.1`|
|Dual Orientation|`%{wurfl_cap_dual_orientation}`| Indicates whether the device supports dual orientation.<br />**Sample Value:** `true`|
|HTML Preferred DTD|`%{wurfl_cap_html_preferred_dtd}`| Indicates the mobile device's preferred document type definition (DTD) for HTML content. <br />**Sample Value:** `html5` |
|Image Inlining|`%{wurfl_cap_image_inlining}`| Indicates whether the device supports Base64-encoded images.<br />**Sample Value:** `false`|
|Is Android|`%{wurfl_vcap_is_android}`| Indicates whether the device uses the Android OS.<br />**Sample Value:** `true`|
|Is App|`%{wurfl_vcap_is_app}`|  Indicates whether a native application requested content.<br />**Sample Value:** `true`|
|Is Full Desktop|`%{wurfl_vcap_is_full_desktop}`| Indicates whether the device provides a full desktop experience.<br />**Sample Value:** `true`|
|Is IOS|`%{wurfl_vcap_is_ios}`|  Indicates whether the device uses iOS.<br />**Sample Value:** `false`|
|Is Robot|`%{wurfl_vcap_is_robot}`|  Indicates whether the device is considered to be an automated HTTP client (e.g., a robot crawler).<br />**Sample Value:** `true`|
|Is Smart TV|`%{wurfl_cap_is_smarttv}`| Indicates whether the device is a smart TV.<br />**Sample Value:** `false`|
|Is Smartphone|`%{wurfl_vcap_is_smartphone}`| Indicates whether the device is a smartphone.<br />**Sample Value:** `true`|
|Is Tablet|`%{wurfl_cap_is_tablet}`| Indicates whether the device is a tablet. This is an OS-independent description.<br />**Sample Value:** `true`|
|Is Touchscreen|`%{wurfl_vcap_is_touchscreen}`| Indicates whether the device's primary pointing device is a touchscreen.<br />**Sample Value:** `true`|
|Is Windows Phone|`%{wurfl_vcap_is_windows_phone}`| Indicates whether the device is a a Windows Mobile 6.5/Windows Phone 7 or higher.<br />**Sample Value:** `true`|
|Is Wireless Device|`%{wurfl_cap_is_wireless_device}`| Indicates whether the device is considered a wireless device For the purposes of this capability, PCs and laptops are not considered to be mobile devices.<br />**Sample Value:** `true`|
|Marketing Name|`%{wurfl_cap_marketing_name}`| Indicates the device's marketing name.<br />**Sample Value:** `BlackBerry 8100 Pearl`|
|Mobile Browser|`%{wurfl_cap_mobile_browser}`| Indicates the browser used to request content from the device.<br />**Sample Value:** `Chrome`|
|Mobile Browser Version|`%{wurfl_cap_mobile_browser_version}`| Indicates the version of the browser used to request content from the device.<br />**Sample Value:** `31`|
|Model Name|`%{wurfl_cap_model_name}`| Indicates the device's model name.<br />**Sample Value:** `s10`|
|Progressive Download|`%{wurfl_cap_progressive_download}`| Indicates whether the device supports the playback of audio/video while it is still being downloaded.<br />**Sample Value:** `true`|
|Release Date|`%{wurfl_cap_release_date}`| Indicates the year and month on which the device was added to the WURFL database. <br />**Format:** `yyyy_mm` <br />**Sample Value:** `2022_december`|
|Resolution Height|`%{wurfl_cap_resolution_height}`| Indicates the device's height in pixels.<br />**Sample Value:** `768`|
|Resolution Width|`%{wurfl_cap_resolution_width}`| Indicates the device's width in pixels.<br />**Sample Value:** `1024`|

### Client Geography {/*client-geography*/}

This category contains feature variables that describe the client's geography.

<Callout type="info">

  A blank value is returned when GEO metadata is unavailable for a particular request.

</Callout>

| Type | Variable  | Description  |
|---|---|---|
|City (Client)|`%{geo_city}` |  Indicates the client's city.<br />**Sample Value:** `Los Angeles`|
|Continent (Client)|`%{geo_continent}` |  Indicates the client's continent through its abbreviation. Valid values are:<ul><li>**AF:** Africa</li><li>**AS:** Asia</li><li>**EU:** Europe</li><li>**NA:** North America</li><li>**OC:** Oceania</li><li>**SA:** South America</li></ul><br />**Sample Value:** `NA`|
|Country (Client)|`%{geo_country}` |  Indicates the country from which the requested originated through its country code.<br />**Sample Value:** `US`|
|Designated Market Area (Client) |`%{geo_dma_code}` |  Indicates the client's media market by its region code. This field is only applicable to requests that originate from the United States.<br />**Sample Value:** `745`|
|Latitude (Client)|`%{geo_latitude}` |  Indicates the client's latitude.<br />**Sample Value:** `34.0995`|
|Longitude (Client)|`%{geo_longitude}` |  Indicates the client's longitude.<br />**Sample Value:** `-118.4143`|
|Metropolitan Statistical Area (Client)|`%{geo_metro_code}` |  Indicates the client's metropolitan area. This field is only applicable to requests that originate from the United States.<br />**Sample Value:** `745`|
|Postal Code (Client)|`%{geo_postal_code}` |  Indicates the client's postal code. We only return the first 3 characters for Canadian postal codes and the first 2 - 4 characters for United Kingdom postal codes.<br />**Sample Value:** `90210`|
|Region (Client)|`%{geo_region}` |  Indicates the client's region (e.g., state or province) through its alphanumeric abbreviation. <br />**Sample Value:** `CA`|

### Client Network {/*client-network*/}

This category contains feature variables that describe the client's network.

| Type | Variable  | Description  |
|---|---|---|
|ASN (Client)|`%{geo_asnum}` |  Indicates the client's AS number.<br />**Sample Value:** `AS15133`|
|IP Address (Client)|`%{virt_dst_addr}` |  Indicates the client's IP address.<br />**Sample Value:** `192.168.1.1`|
|Port (Client)|`%{virt_dst_port}` |  Indicates the client's ephemeral port. <br />**Sample Value:** `55885`|

### General {/*general*/}

This category contains the QUIC Versions feature variable.

| Type | Variable  | Description  |
|---|---|---|
|QUIC Versions|`%{quic_altsvc_versions}` |  Indicates the set of QUIC versions supported by our CDN service. This variable identifies QUIC versions using Google's latest specification.<br />**Sample Value:** `h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000`|

### Request {/*request*/}

This category contains feature variables that describe the request.

| Type | Variable  | Description  |
|---|---|---|
|Cookie Value|`%{cookie_<COOKIE>}` |  Returns the value corresponding to the cookie identified by the `<COOKIE>` term. Replace dashes in the cookie name with underscores (e.g., change `preferences-cookie` to `preferences_cookie`).<br />**Sample Usage:** `%{cookie__utma}`<br />**Sample Value:** `111662281.2.10.1222100123`|
|HTTP Method|`%{request_method}` |  Indicates the HTTP request method.<br />**Sample Value:** `GET`|
|JA3 MD5 Hash |`%{virt_ssl_client_ja3_md5}`| Indicates the JA3 fingerprint assigned to the request. A JA3 fingerprint identifies a client using key characteristics from a TLS request. This allows us to classify traffic across various IP addresses and ports.|
|Normalized Path|`%{normalized_path}` |  Indicates the normalized relative path for the request submitted to the CDN. <br />**Key information:**<ul><li>This relative path excludes the query string.</li><li>This relative path corresponds to the request submitted to the CDN and it does not reflect URL rewrites.</li><li>URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.</li></ul>**Sample Value:** `/marketing/images/bunny.png`|
|Normalized Query String|`%{normalized_query}` |  Indicates the normalized query string defined in the request URL. URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value. <br />**Original Query String:** `"client=/123?"`<br />**Sample Value:** `%22client=/123?%22`|
|Normalized URI|`%{normalized_uri}` |  Indicates the normalized relative path and query string for the request submitted to the CDN. <br />**Key information:**<ul><li>This relative path corresponds to the  request submitted to the CDN and it does not reflect URL rewrites.</li><li>URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.</li></ul>**Sample Value:** `/dir/foo.js?%22client=/123?%22`|
|Path|`%{path}` |  Indicates the relative path to the requested content. <br />**Key information:**<ul><li>This relative path excludes the query string.</li><li>This relative path reflects URL rewrites due to `url_rewrite`.</li></ul><br />**Sample Value:** `/rewrittendir/foo.js`|
|Query String Found |`%{is_args}` |  The value for this variable varies according to whether the request contains a query string.<ul><li>**Query String Found:** ?</li><li>**No Query String:** NULL</li></ul>**Sample Value:** `?`|
|Query String Parameter Found|`%{is_amp}` |  The value for this variable varies according to whether the request contains at least one query string parameter.<ul><li>**Parameter Found:** &</li><li>**No Parameters:** NULL</li></ul>**Sample Value:** `&`|
|Query String Parameter Value|`%{arg_<QUERY STRING PARAMETER>}` |  Returns the value corresponding to the query string parameter identified by the `<QUERY STRING PARAMETER>` term. <br />**Sample Usage:** `%{arg_language} `<br />**Sample Query String Parameter:** `language=en`<br />**Sample Value:** `en`|
|Query String Value|`%{query_string}` |  Indicates the entire query string value defined in the request URL.<br />**Sample Value:** `key1=val1&key2=val2&key3=val3`|
|Referrer Domain|`%{referring_domain}` |  Indicates the domain defined in the `Referer` request header. <br />**Sample Value:** `www.google.com`|
|Request Header Value|`%{http_<REQUEST HEADER>}` |   Returns the value corresponding to the request header identified by the `<REQUEST HEADER>` term. Replace dashes in the request header name with underscores (e.g., change `User-Agent` to `User_Agent`).<br />**Sample Usage:** `%{http_Connection} `<br />**Sample Value:** `Keep-Alive`|
|Request Host|`%{host}` |  Indicates the host defined in the request URL. <br />**Sample Value:** `www.example.com`|
|Request ID|`%{http_x_ec_uuid}` |  Indicates a request's unique system-defined ID.  A new ID is generated whenever a client (i.e., user agent) submits a request.<br />**Sample Value:** `12345678901234567890123456789012345678`|
|Request Protocol (Client)|`%{virt_http_version}` |  Indicates the version of the client's request protocol.<br />**Sample Value:** `2.0`|
|Request Protocol (Edge Server) |`%{request_protocol}` |  Indicates the request protocol used by an edge server to proxy the request.<br />**Sample Value:** `HTTP/1.1`|
|Request Scheme|`%{scheme}` |  Indicates the request scheme.<br />**Sample Value:** `http`|
|Request URI|`%{request}` |  Describes the request. <br />**Syntax:** `<HTTP METHOD> <RELATIVE PATH> <PROTOCOL>` <ul><li>`<HTTP METHOD>`**:** Indicates the HTTP method that was requested. </li><li>`RELATIVE PATH>`**:** Indicates the relative path, including query string parameters, defined in the request URI.</li><li>`<PROTOCOL>`**:** Indicates the HTTP protocol and version that was requested. </li></ul> **Sample Value:** `GET /marketing/foo.js?loggedin=true HTTP/1.1`|
|Request URI (Relative)|`%{request_uri}` |  Indicates the relative path, including the query string, defined in the request URI.<br />**Sample Value:** `/marketing/foo.js?loggedin=true`|
|Session ID|`%{http_x_ec_session_id}` |  Indicates a unique system-defined ID for the request's connection to our servers. <Callout type="tip">  Multiple rapid requests by a single client may result in a single session ID when the connection is reused for those requests. Use `%{http_x_ec_uuid}` if you require a unique ID for each request.</Callout><br />**Sample Value:** `12345678901234567890123456789012345678`|
|TLS Cipher Suite|`%{virt_ssl_cipher}` |  Indicates the name of the cipher suite used to secure a HTTPS connection.<br />**Sample Value:** `ECDHE-RSA-AES256-SHA`|
|TLS Protocol|`%{virt_ssl_protocol}` |  Indicates the SSL/TLS protocol used to secure a HTTPS connection. <br />**Sample Value:** `TLSv1.2`|

### Response {/*response*/}

This category contains feature variables that describe the response sent to the client.

| Type | Variable  | Description  |
|---|---|---|
|HTTP Status Code|`%{status}` |  Indicates the HTTP status code for the response.<br />**Sample Value:** `200`|
|Response Header Value|`%{resp_<RESPONSE HEADER>}` |   Returns the value corresponding to the response header identified by the `<RESPONSE HEADER>` term. Replace dashes in the response header name with underscores (e.g., change `User-Agent` to `User_Agent`). <Callout type="info">  Requests cannot be defined using variables associated with response metadata. For example, this variable cannot be used to define a request header through the `set_request_headers` feature.</Callout>**Sample Usage:** `%{resp_Content_Length}`<br />**Sample Value:** `100`|

## Usage {/*usage*/}

Feature variables support the following syntax:

-   **Feature Variable:** Use this syntax to get the entire value corresponding to the specified feature variable. 

    **Example:** `%{host}`

-   **Feature Variable with a Delimiter:** Use this syntax to transform the value corresponding to the specified feature variable. 

    **Example:** The following example converts the value associated with the `%{host}` variable to lower-case.

    `%{host,}`

-   **Feature Variable with a Delimiter and an Expression:** Use regular expressions to replace, delete, or manipulate a feature variable's value. 

    **Example:** `%{host/=^www\.([^\.]+)\.([^\.:]+)/cdn.$2.$3:80}`

<Callout type="important">

  Feature variable names only support alphabet characters and underscores. Convert unsupported characters to underscores. 

</Callout>

### Delimiter Quick Reference {/*delimiter-quick-reference*/}

A delimiter can be specified after a feature variable to achieve any of the following effects:

-   Transform the value associated with the variable.

    **Example:** Convert the entire value to lower-case.

-   Delete the value associated with the variable.
-   Manipulate the value associated with the variable.

    **Example:** Use regular expressions to change the value associated with the feature variable.

A brief description for each delimiter is provided below.

| Delimiter | Description                                                                                                     |
|-----------|-----------------------------------------------------------------------------------------------------------------|
| :=        | Indicates that a default value will be assigned to the variable when it is either missing or set to NULL.       |
| :+        | Indicates that a default value will be assigned to the variable when a value has been assigned to it.           |
| :         | Indicates that a substring of the value assigned to the variable will be expanded.                              |
| #         | Indicates that the pattern specified after this delimiter should be deleted when it is found at the beginning of the value associated with the variable.  |
| %         | Indicates that the pattern specified after this delimiter should be deleted when it is found at the end of the value associated with the variable. The above definition is only applicable when the % symbol is used as a delimiter.                               |
| /         | Delimits a feature variable or a pattern.                                                                         |
| //        | Find and replace all instances of the specified pattern.                                                        |
| /=        | Find, copy, and rewrite all occurrences of the specified pattern.                                               |
| ,         | Convert the value associated with the feature variable to lower-case.                                              |
| ^         | Convert the value associated with the feature variable to upper-case.                                              |
| ,,        | Convert all instances of the specified character in the value associated with the feature variable to lower-case.  |
| ^^        | Convert all instances of the specified character in the value associated with the feature variable to upper-case.  |

### Exceptions {/*exceptions*/}

Text will not be treated as a feature variable under the following circumstances:

-   **Escaping % Symbol:** The percentage symbol can be escaped through the use of a backslash.

    **Example:** The following sample value will be treated as a literal value and not as a feature variable: `\%{host}`

-   **Unknown Variables:** An empty string is always returned for unknown variables.

    **Example:** `%{unknownvariable}`

-   **Invalid Characters or Syntax:** Variables that contain invalid characters or syntax are treated as literal values.

    **Example #1:** The following value contains an invalid character (i.e., -): `%{resp_user-agent}`
    **Example #2:** The following value contains a double set of curly braces: `%{{host}}`
    **Example #3:** The following value is missing a closing curly brace: `%{host`

-   **Missing Variable Name:** A NULL value is always returned when a variable is not specified.

    **Example:** `%{}`

-   **Trailing Characters:** Characters that trail a variable are treated as literal values.

    **Example:** The following sample value contains a trailing curly brace that will be treated as a literal value: `%{host}}`

### Setting Default Header Values {/*setting-default-header-values*/}

A default value can be assigned to a header when it meets any of the following conditions:

-   Missing/unset
-   Set to `NULL`.

Define this default value through any of the following methods:

-   Set a header to a default value when the header is missing or its value is set to `NULL`. 

    **Syntax:** `%{<FEATURE VARIABLE>:=<DEFAULT VALUE>}`

    **Example:** The following value sets the `Referer` header to `unspecified` when it is either missing or set to NULL. No action will take place if it has been set.

    `%{http_referer:=unspecified}`

-   Set a header to a default value when it is missing. 

    **Syntax:** `%{<FEATURE VARIABLE>=<DEFAULT VALUE>}`

    **Example:** The following value sets the `Referer` header to `unspecified` when it is missing. No action will take place if it has been set.

    `%{http_referer=unspecified}`

-   Set the header to a default value when it does not meet any of the following conditions:

    -   Missing header.
    -   Set to `NULL`.

    **Syntax:** `%{<FEATURE VARIABLE>:+<DEFAULT VALUE>}`

    **Example:** The following value sets the `Referer` header to `unspecified` when a value has been assigned to it. No action will take place if it has been set.

    `%{http_referer:+unspecified}`

### Manipulating Variables {/*manipulating-variables*/}

Variables can be manipulated in the following ways:

-   Expanding substrings
-   Removing patterns

### Substring Expansion {/*substring-expansion*/}

By default, a variable will expand to its full value. Use the following syntax to only expand a substring of the variable's value:

`%{<VARIABLE>:<OFFSET>:<LENGTH>}`

**Key information:**

-   The value assigned to the `<OFFSET>` term determines the starting character of the substring.
    -   **Positive:** The starting character of the substring is calculated from the first character in the string. 
    -   **Zero:** The starting character of the substring is the first character in the string.
    -   **Negative:** The starting character of the substring is calculated from the last character in the string. 

-   The length of the substring is determined by the `<LENGTH>` term.
    -   **Omitted:** Omitting the `<LENGTH>` term allows the substring to include all characters between the starting character and the end of the string.
    -   **Positive:** Determines the length of the substring from the starting character to the right.
    -   **Negative:** Determines the length of the substring from the starting character to the left.

**Example:**

This example relies on the following sample request URL:
`https://cdn.mydomain.com/folder/marketing/myconsultant/proposal.html`

The following string demonstrates various methods for manipulating variables:
`https://www%{http_host:3}/mobile/%{request_uri:7:10}/%{request_uri:-5:-8}.htm`

Based on the sample request URL, the above variable manipulation will produce the following value:
`https://www.mydomain.com/mobile/marketing/proposal.htm`

### Pattern Removal {/*pattern-removal*/}

Text that matches a specific pattern can be removed from either the beginning or the end of a variable's value. 
-   Remove text when the specified pattern is found at the beginning of a variable's value.

    `%{<VARIABLE>#<PATTERN>}`

-   Remove text when the specified pattern is found at the end of a variable's value.

    `%{<VARIABLE>%<PATTERN>}`

### Find And Replace {/*find-and-replace*/}

Find and replace syntax is described below.

-   Find and replace first occurrence of the specified pattern.

    **Syntax:** `%{<VARIABLE>/<FIND>/<REPLACE>}`

-   Find and replace all occurrences of the specified pattern.

    **Syntax:** `%{<VARIABLE>//<FIND>/<REPLACE>}`

-   Convert the entire value to upper-case.

    **Syntax:** `%{<VARIABLE>^}`

-   Convert the first occurrence of the specified pattern to upper-case.

    **Syntax:** `%{<VARIABLE>^<FIND>}`

-   Convert the entire value to lower-case.

    **Syntax:** `%{<VARIABLE>,}`

-   Convert the first occurrence of the specified pattern to lower-case.

    **Syntax:** `%{<VARIABLE>,<FIND>}`

**Key information:**

-   Expand text that matches the specified pattern by specifying a dollar sign followed by a whole integer (e.g., `$1`).
-   Multiple patterns may be specified. The order in which the pattern is specified determines the integer that will be assigned to it. 

    In the following example, the first pattern matches `www` or `www` followed by a single digit, the second pattern matches the second-level domain, and the third pattern matches the top-level domain.

    `%{host/=^(www\d?)\.([^\.]+)\.([^\.:]+)/cdn.$2.$3:80}`

-   The rewritten value can consist of any combination of text and these placeholders.

    In the above example, the hostname will be rewritten according to this pattern: `cdn.$2.$3:80` (e.g., cdn.mydomain.com:80).

-   The case of a pattern placeholder (e.g., `$1`) can be modified through the following flags:

    -   **U:** Upper-case the expanded value.

        **Sample syntax:** `%{host/=^(www\d?)\.([^\.]+)\.([^\.:]+)/cdn.$U2.$3:80}`

    -   **L:** Lower-case the expanded value.

        **Sample syntax:** `%{host/=^(www\d?)\.([^\.]+)\.([^\.:]+)/cdn.$L2.$3:80}`

-   An operator must be specified before the pattern. The specified operator determines the pattern capturing behavior:
    -   `=` indicates that all occurrences of the specified pattern must be captured and rewritten.
        `^` indicates that only text that starts with the specified pattern will be captured.
        `$` indicates that only text that ends with the specified pattern will be capture.
-   Omitting the `/<REWRITE>` value will result in the deletion of the text that matches the pattern.
