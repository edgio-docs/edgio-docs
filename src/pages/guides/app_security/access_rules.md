# Access Rules {/*access-rules*/}

An access rule identifies legitimate traffic and threats by:

-   ASN
-   Cookie
-   Country
-   IP address
-   Referrer
-   URL
-   User agent
-   HTTP method
-   Media type (aka content type)
-   File extension
-   File size
-   Request headers

## Basic Access Controls {/*basic-access-controls-2*/}

Control access to your content by creating whitelists, accesslists, and
blacklists for the following categories:

| Type        | Description |
| ----------- | ----------- |
| <a id="ASN"></a>ASN | Identifies requests according to the autonomous system (AS) from which the request originated. Specify each desired AS by its autonomous system number (ASN).  |
| <a id="Cookie"></a>Cookie                | Identifies requests by searching for a cookie name that matches the specified regular expression.  Certain common characters (e.g., ?.+) have special meaning in a regular expression. Use a backslash to escape a special character.                       |
| <a id="Country"></a>Country | Identifies requests by the country from which the request originated. Specify each desired country using a [country code]( ../Reference/Country_Codes.htm).  Country access controls take precedence over [country subdivision](#Country-Subdivision--ISO3166-2-) access controls.<br /><br />For example, if you define `US` within a whitelist, then state-specific access controls will be ignored for requests that originate within the United States.  <br /><br />**Example:**<br /><br />The following value identifies requests from the United States:  `US`                              |
| <a id="Country-Subdivision--ISO3166-2-"></a>Country Subdivision (ISO3166-2)| Identifies requests by a country's subdivision (e.g., state or province). Specify each desired subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/ #search/code/).<br /><br />[Country](#Country) access controls take precedence over country subdivision access controls.<br /><br />For example, if you define `US` within a whitelist, then state-specific access controls will be ignored for requests that originate within the United States.  <br /><br /> **Syntax:**   <br /><br />`Country Code`-`Subdivision Code`<br /><br /> <br /><br /> **Example:** <br /><br />The following value identifies requests from California:  `US-CA`                              |
| <a id="IPAddress"></a>IP Address         | Identifies requests by the requester's IPv4 and/or IPv6 address. Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.  Specify a subnet by appending a slash (/) and the desired bit-length of the prefix (e.g., 11.22.33.0/22).  Do not specify more than 1,000 IP addresses or IP blocks. Whitelist, accesslist, and blacklist entries count towards this limit.                      |
| <a id="Referrer"></a>Referrer            | Identifies requests by referrer. A successful match is found when the specified regular expression matches any portion of the `Referer` request header value.  The `Referer` request header identifies the URL of the resource (e.g., web page) from which the request was initiated. The specified regular expression may match any portion of the entire URL including the protocol and hostname.           |
| <a id="URL"></a>URL                      | Identifies requests by searching for a value that matches the specified regular expression within the request URI.  Do not include a protocol or a hostname (e.g., http://cdn.mydomain.com) when defining a regular expression for this access control.  Certain common characters (e.g., ?.+) have special meaning in a regular expression. Use a backslash to escape a special character (e.g., main\\.html\\?user=Joe).  Example  All of the entries in the following sample access control list will match the sample request:  <br /><br />``` /marketing/.\*  .\*images.\*  .\*/ad\[0-9\]\*\\.png ```  <br /><br /> **Sample request:**<br /><br /> `*** http://www.mydomain.com***/marketing/images/ad001.png`                              |
| <a id="UserAgent"></a>User Agent         | Identifies requests by the user agent that acted on behalf of a user to submit the request. A successful match is found when the specified regular expression matches any portion of the `User-Agent` request header value.                    |

### Whitelists {/*whitelists*/}

The purpose of a whitelist is to identify legitimate traffic.

-   Traffic is whitelisted if it satisfies at least one whitelist
    criterion.
-   WAF automatically approves the delivery of whitelisted requests
    without inspecting them. As a result, all other WAF requirements are
    not applicable to whitelisted traffic.

### Accesslists {/*accesslists*/}

The purpose of an accesslist is to identify traffic that may access your
content upon passing a threat assessment. If one or more accesslists
have been defined, WAF will only inspect requests that satisfy at least
one criterion in each defined accesslist. All other traffic, unless it
has been whitelisted, will be blocked.

### Blacklists {/*blacklists*/}

The purpose of a blacklist is to describe unwanted traffic.

-   Traffic is blacklisted when it satisfies all of the following
    conditions:

    -   The request satisfies at least one blacklist criterion.
    -   The request does not qualify for whitelisting or accesslisting.

-   WAF automatically flags blacklisted requests as threats without
    inspecting them.

Key information:

-   A whitelist, accesslist, and blacklist may consist of zero or more
    entries (e.g., IP address, country, referrer, etc.).

-   A blank whitelist, accesslist, or blacklist is ignored.

-   The order of precedence is:

```
Whitelist \> Accesslist \> Blacklist
```

    For example, WAF will inspect a request that satisfies both an
    accesslist and a blacklist. However, it will automatically allow the
    delivery of a request that satisfies a whitelist, an accesslist, and
    a blacklist.

-   Specify only a single item per line.

-   All entries within a URL, referrer, cookie, or user agent whitelist,
    accesslist, and blacklist are regular expressions.

    By default, a regular expression defines a case-sensitive match. Use
    syntax (e.g., \[a-zA-Z\]) to make it case-insensitive.

-   Unlike whitelists and blacklists, a request must satisfy at least
    one criterion in each defined [accesslist](#Accesslists).

-   <a id="maximum"></a>The maximum number of entries varies by category.

    | Category   | Combined Limit (Whitelist, Accesslist, and Blacklist) |
    |------------|-------------------------------------------------------|
    | ASN        | 200                                                   |
    | Cookie     | 200                                                   |
    | Country    | 600                                                   |
    | IP Address | 1,000                                                 |
    | Referrer   | 200                                                   |
    | URL        | 200                                                   |
    | User Agent | 200                                                   |

    WAF Insights supports up to 25 entries for each of the above
    categories. If you currently have WAF Insights and would like to add
    additional entries, please contact your CDN account manager to
    upgrade to the full version.

    Whitelist, accesslist, and blacklist entries count towards this
    limit.

-   Unlike WAF rule sets, access controls are enforced regardless of
    whether the requested content will be served from cache or your web
    server.

## Additional Access Controls {/*additional-access-controls*/}

Unlike the access controls described above, the following access
controls are limited to identifying malicious traffic:

-   [HTTP method](#HTTPMethod)
-   [Media type](#MediaTypes)
-   [File extension](#FileExtensions)
-   [File size](#FileSize)
-   [Request headers](#RequestHeaders)

### HTTP Methods {/*http-methods*/}

Define the set of valid and invalid HTTP request methods via the
**Allowed HTTP Methods** option.

-   **Valid:** WAF performs a threat assessment on requests whose
    HTTP method matches a marked option.
-   **Invalid:** WAF automatically sends an alert or blocks a
    request when its HTTP method does not match a marked option.

View a sample list of HTTP methods.

GET

POST

OPTIONS

HEAD

PUT

DELETE

### Media Types (aka Content Types) {/*media-types--aka-content-types-*/}

Define the set of valid media types (aka content types or MIME types)
via the **Allowed Request Content Types** option.

Key information:

-   WAF restricts requests by media type when the **Allowed Request
    Content Types** option contains one or more value(s). Skip
    this requirement by setting this option to a blank value.

    If you would like to skip this check, make sure to remove all
    characters, including whitespace (e.g., a space character), from
    this option.

-   If the **Allowed Request Content Types** option contains one
    or more value(s), then WAF will check whether the request contains a
    `Content-Type` header.

    -   **Missing:** If a request does not include the
        `Content-Type` header, then WAF will proceed to the
        next security check within this threat assessment.

        A client should only include a `Content-Type` header
        when the request includes a payload (e.g., HTTP
        `PUT` and `POST` requests). HTTP
        `GET` requests should not include this header.

    -   **Present:** If a request includes the
        `Content-Type` header, then WAF will compare its value
        against the list of allowed values.

        -   **Match Found:** If a request's
            `Content-Type` header matches a media type defined
            by this option, then it will proceed to the next security
            check within this threat assessment.
        -   **Match Not Found:** If a request's
            `Content-Type` header does not match a media type
            defined by this option, then WAF will consider this a
            violation of this access rule and enforce the security
            policy (e.g., alert or block) defined within your [SAM
            configuration](SAM.htm#enforcementmode).

-   List each desired media type on a separate line.

-   Media types are case-insensitive.

View a sample list of media types.

application/x-www-form-urlencoded

multipart/form-data

text/xml

application/xml

application/x-amf

application/json

### File Extensions {/*file-extensions*/}

Define the set of invalid file extensions via the **Extension
Blacklist** option.

Key information:

-   WAF flags a request as a threat when its file extension matches one
    defined by this option.

-   **Syntax:** 

```
.*ext*
```

-   File extensions are case-insensitive.

-   List each desired file extension on a separate line.

View a sample list of file extensions.

.asa

.asax

.ascx

.axd

.backup

.bak

.bat

.cdx

.cer

.cfg

.cmd

.com

.config

.conf

.cs

.csproj

.csr

.dat

.db

.dbf

.dll

.dos

.htr

.htw

.ida

.idc

.idq

.inc

.ini

.key

.licx

.lnk

.log

.mdb

.old

.pass

.pdb

.pol

.printer

.pwd

.resources

.resx

.sql

.sys

.vb

.vbs

.vbproj

.vsdisco

.webinfo

.xsd

.xsx

### File Size {/*file-size*/}

Define the maximum file size, in bytes, for a `POST`
request via the **Single File Upload Limit** option

The recommended maximum value is 6,291,456 bytes.

Define the maximum file size for a request that is part of a multipart
message through a managed rule.\
[Learn more](Managed-Rules.htm#FileSizeandQueryStringLimits).

### Request Headers {/*request-headers*/}

Define the set of invalid request headers via the **Header
Blacklist** option.

Key information:

-   WAF flags a request as a threat when it contains a header whose name
    matches one defined by this option.

-   Header names are case-insensitive.

-   List each desired request header on a separate line.

## Access Rule Administration {/*access-rule-administration*/}

You may create, modify, and delete access rules.

Key information:

-   Administer access rules from the **Access Rules**
    page.
-   Apply an access rule to production traffic by adding it to a
    [Security Application Manager configuration](SAM.htm) and then
    determining how it will be enforced. Multiple Security Application
    Manager configurations may use the same access rule. Leverage this
    capability to tailor security screening by application or traffic
    profile.
-   It may take up to 2 minutes for an updated access rule to be applied
    across our entire network.

To create an access rule

1.  

2.  Click **Add Access Rule**.

3.  In the **Name** option, type the unique name by which this
    access rule will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    Manager configuration.

4.  Define the desired whitelists, accesslists, and blacklists.

    i.  From the **Add an Access Control** option, select the
        [desired category](#BasicAccessControls) (IP, Country, Referrer,
        etc.).

    ii. Click **Add Whitelist**, **Add Blacklist**, or
        **Add Accesslist**.

    iii. Specify each unique value on a separate line.

         All entries within a URL, referrer, cookie, or user agent
         whitelist, accesslist, and blacklist are regular expressions.

    iv. Repeat steps ii and iii if you need to add another type of
        access control for this category.

    v.  Repeat steps i - iv to add whitelists, accesslists, and
        blacklists for other categories.

5.  Define which HTTP methods and media types are allowed and which file
    extensions and request headers are disallowed.

    i.  Click **Advanced Settings** to expand that section.
    ii. From the **Allowed HTTP Methods** section, verify that
        only the [HTTP methods](#HTTPMethod) that should be
        allowedRequests that use a disallowed HTTP method are deemed a
        threat. are marked. If the desired HTTP method is not listed,
        then you may manually define it in the **Other HTTP
        Methods** option.
    iii. From the **Allowed Request Content Types** option,
         verify that the list only contains the [media
         types](#MediaTypes) that should be allowedRequests that use a
         disallowed media type are deemed a threat.. If the desired
         media type is not listed, then type it on a separate line.
    iv. From the **Extension Blacklist** option, verify that all
        of the listed [file extensions](#FileExtensions) should be
        blockedA request is blocked when its file extension matches a
        value defined in this option.. If the desired file extension is
        not listed, then type it on a separate line.
    v.  From the **Header Blacklist** option, verify that all of
        the listed [request headers](#RequestHeaders) should be blockedA
        request is blocked when it contains a header whose name matches
        a value defined in this option.. If the desired request header
        is not listed, then type it on a separate line.
    vi. In the **Response Header Name** option, set the name of
        the response header that will be included with blocked requests.
        This name only consist of alphanumeric characters and dashes.

6.  Click **Save**.

To modify an access rule

1.  
2.  Click on the desired access rule.
3.  Make the desired changes.
4.  Click **Save**.

To delete an access rule

You cannot delete an access rule that is associated with a Security
Application Manager configuration. Please either modify the Security
Application Manager configuration to point to a different access rule or
delete that Security Application Manager configuration.

1.  Check your Security Application Manager configurations to verify
    that the desired access rule is not in use.
2.  
3.  Click **Delete Access Rule**.
4.  Type **DELETE**.
5.  Click **Delete**.
