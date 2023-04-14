---
title: Feature Variables Reference
---

Feature variables retrieves request and response metadata. Use this metadata to dynamically alter a request or a response.

The following features support variables:

-   [Rewrite Cache Key (cache_key_rewrite)](/guides/performance/rules/features#rewrite-cache-key)
-   [Add Response Headers (add_response_headers)](/guides/performance/rules/features#add-response-headers)
-   [Set Request Headers (set_request_headers)](/guides/performance/rules/features#set-request-headers)
-   [Set Response Headers (set_response_headers)](/guides/performance/rules/features#set-response-headers)
-   [URL Redirect (url_redirect)](/guides/performance/rules/features#url-redirect)
-   [URL Rewrite (url_rewrite)](/guides/performance/rules/features#url-rewrite)

## Definitions {/*definitions*/}

Feature variables are described below.

<Callout type="info">

  A blank value is returned when GEO metadata (e.g., postal code) is unavailable for a particular request.

</Callout>

-   `%{geo_asnum}`**:** Indicates the client's AS number.

    **Sample Value:** `AS15133`

-   `%{geo_city}`**:** Indicates the client's city.

    **Sample Value:** `Los Angeles`

-   `%{geo_continent}`**:** Indicates the client's continent through its abbreviation. Valid values are:
    -   **AF:** Africa
    -   **AS:** Asia
    -   **EU:** Europe
    -   **NA:** North America
    -   **OC:** Oceania
    -   **SA:** South America

    **Sample Value:** `NA`

-   `%{cookie_<COOKIE>}`**:** Returns the value corresponding to the cookie identified by the `<COOKIE>` term. Replace dashes in the cookie name with underscores (e.g., change `preferences-cookie` to `preferences_cookie`).

    **Sample Usage:** `%{cookie__utma}`

    **Sample Value:** `111662281.2.10.1222100123`

-   `%{geo_country}`**:** Indicates the country from which the requested originated through its country code.

    **Sample Value:** `US`

-   `%{geo_dma_code}`**:** Indicates the client's media market by its region code. This field is only applicable to requests that originate from the United States.

    **Sample Value:** `745`

-   `%{request_method}`**:** Indicates the HTTP request method.

    **Sample Value:** `GET`

-   `%{status}`**:** Indicates the HTTP status code for the response.

    **Sample Value:** `200`

-   `%{virt_dst_addr}`**:** Indicates the client's IP address.

    **Sample Value:** `192.168.1.1`

-   `%{geo_latitude}`**:** Indicates the client's latitude.

    **Sample Value:** `34.0995`

-   `%{geo_longitude}`**:** Indicates the client's longitude.

    **Sample Value:** `-118.4143`

-   `%{geo_metro_code}`**:** Indicates the client's metropolitan area. This field is only applicable to requests that originate from the United States.

    **Sample Value:** `745`

-   `%{normalized_path}`**:** Indicates the normalized relative path for the request submitted to the CDN.

    **Key information:**

    -   This relative path excludes the query string.
    -   This relative path corresponds to the request submitted to the CDN and it does not reflect URL rewrites.
    -   URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.

    **Sample Value:** `/marketing/images/bunny.png`

-   `%{normalized_query}`**:** Indicates the normalized query string defined in the request URL. URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.

    **Original Query String:** `"client=/123?"`

    **Sample Value:** `%22client=/123?%22`

-   `%{normalized_uri}`**:** Indicates the normalized relative path and query string for the request submitted to the CDN.

    **Key information:**

    -   This relative path corresponds to the  request submitted to the CDN and it does not reflect URL rewrites.
    -   URL normalization, as defined in [RFC 3986](https://tools.ietf.org/html/rfc3986#page-38), was applied to this value.

    **Sample Value:** `/dir/foo.js?%22client=/123?%22`

-   `%{path}`**:** Indicates the relative path to the requested content. 

    **Key information:**

    -   This relative path excludes the query string.
    -   This relative path reflects URL rewrites due to `url_rewrite`.

    **Sample Value:** `/rewrittendir/foo.js`

-   `%{virt_dst_port}`**:** Indicates the client's ephemeral port. 

    **Sample Value:** `55885`

-   `%{geo_postal_code}`**:** Indicates the client's postal code. We only return the first 3 characters for Canadian postal codes and the first 2 - 4 characters for United Kingdom postal codes.

    **Sample Value:** `90210`

-   `%{is_args}`**:** The value for this variable varies according to whether the request contains a query string.
    -   **Query String Found:** ?
    -   **No Query String:** NULL

    **Sample Value:** `?`

-   `%{is_amp}`**:** The value for this variable varies according to whether the request contains at least one query string parameter.
    -   **Parameter Found:** &
    -   **No Parameters:** NULL

    **Sample Value:** `&`

-   `%{arg_<QUERY STRING PARAMETER>}`**:** Returns the value corresponding to the query string parameter identified by the `<QUERY STRING PARAMETER>` term. 

    **Sample Usage:** `%{arg_language} `

    **Sample Query String Parameter:** `language=en`

    **Sample Value:** `en`

-   `%{query_string}`**:** Indicates the entire query string value defined in the request URL.

    **Sample Value:** `key1=val1&key2=val2&key3=val3`

-   `%{quic_altsvc_versions}`**:** Indicates the set of QUIC versions supported by our CDN service. This variable identifies QUIC versions using Google's latest specification.

    **Sample Value:** `h3-Q049=":443"; ma=2592000,h3-Q048=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000`

-   `%{quic_versions}`**:** Indicates the set of QUIC versions supported by our CDN service. This variable identifies QUIC versions using Google's legacy specification.

    **Sample Value:** `43,41,39,35`

-   `%{referring_domain}`**:** Indicates the domain defined in the `Referer` request header. 

    **Sample Value:** `www.google.com`

-   `%{geo_region}`**:** Indicates the client's region (e.g., state or province) through its alphanumeric abbreviation. 

    **Sample Value:** `CA`

-   `%{http_<REQUEST HEADER>}`**:**  Returns the value corresponding to the request header identified by the `<REQUEST HEADER>` term. Replace dashes in the request header name with underscores (e.g., change `User-Agent` to `User_Agent`).

    **Sample Usage:** `%{http_Connection} `

    **Sample Value:** `Keep-Alive`

-   `%{host}`**:** Indicates the host defined in the request URL. 

    **Sample Value:** `www.example.com`

-   `%{http_x_ec_uuid}`**:** Indicates a request's unique system-defined ID.  A new ID is generated whenever a client (i.e., user agent) submits a request.

    **Sample Value:** `12345678901234567890123456789012345678`

-   `%{virt_http_version}`**:** Indicates the version of the client's request protocol.

    **Sample Value:** `2.0`

-   `%{request_protocol}`**:** Indicates the request protocol used by an edge server to proxy the request.

    **Sample Value:** `HTTP/1.1`

-   `%{scheme}`**:** Indicates the request scheme.

    **Sample Value:** `http`

-   `%{request}`**:** Describes the request.

    **Syntax:**

    `<HTTP METHOD> <RELATIVE PATH> <PROTOCOL>`

    -   `<HTTP METHOD>`**:** Indicates the HTTP method that was requested. 
    -   `RELATIVE PATH>`**:** Indicates the relative path, including query string parameters, defined in the request URI.
    -   `<PROTOCOL>`**:** Indicates the HTTP protocol and version that was requested.

    **Sample Value:** `GET /marketing/foo.js?loggedin=true HTTP/1.1`

-   `%{request_uri}`**:** Indicates the relative path, including the query string, defined in the request URI.

    **Sample Value:** `/marketing/foo.js?loggedin=true`

-   `%{resp_<RESPONSE HEADER>}`**:**  Returns the value corresponding to the response header identified by the `<RESPONSE HEADER>` term. Replace dashes in the response header name with underscores (e.g., change `User-Agent` to `User_Agent`).

    <Callout type="info">

      Requests cannot be defined using variables associated with response metadata. For example, this variable cannot be used to define a request header through the `set_request_headers` feature.

    </Callout>

    **Sample Usage:** `%{resp_Content_Length}`

    **Sample Value:** `100`

-   `%{http_x_ec_session_id}`**:** Indicates a unique system-defined ID for the request's connection to our servers.

    <Callout type="tip">

      Multiple rapid requests by a single client may result in a single session ID when the connection is reused for those requests. Use `%{http_x_ec_uuid}` if you require a unique ID for each request.

    </Callout>

    **Sample Value:** `12345678901234567890123456789012345678`

-   `%{virt_ssl_cipher}`**:** Indicates the name of the cipher suite used to secure a HTTPS connection.

    **Sample Value:** `ECDHE-RSA-AES256-SHA`

-   `%{virt_ssl_protocol}`**:** Indicates the SSL/TLS protocol used to secure a HTTPS connection. 

    **Sample Value:** `TLSv1.2`

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

