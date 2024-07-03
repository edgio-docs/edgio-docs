---
title: Access Rules
---

An access rule identifies legitimate traffic and threats by:

-   [ASN](#asn)
-   [Cookie](#cookie)
-   [Country](#country)
-   [Country Subdivision](#country-subdivision--iso3166-2-)
-   [IP address](#ip-address)
-   [JA3](#ja3)
-   [Referrer](#referrer)
-   [URL](#url)
-   [User agent](#user-agent)
-   [HTTP method](#http-methods)
-   [Media type (aka content type)](#media-types--aka-content-types-)
-   [File extension](#file-extensions)
-   [File size](#file-size)
-   [Request headers](#request-headers)

<Callout type="tip">

  The recommended approach for setting up geoblocking is to create a blacklist for Country or Country Subdivision.

</Callout>

## Basic Access Controls {/*basic-access-controls*/}

Control access to your content by creating whitelists, accesslists, and
blacklists for the following categories:

<a id="asn"></a>

-   **ASN:** Identifies requests according to the autonomous system (AS) from which the request originated. Specify each desired AS by its autonomous system number (ASN).

    <a id="cookie"></a>

-   **Cookie:** Identifies requests by searching for a cookie name that matches the specified regular expression.  Certain common characters (e.g., ?.+) have special meaning in a regular expression. Use a backslash to escape a special character.

    <a id="country"></a>

-   **Country:** Identifies requests by the country from which the request originated. Specify each desired country using a [country code](/applications/reference/country_codes).

    <Callout type="info">

      Country access controls take precedence over [country subdivision](#country-subdivision--iso3166-2-) access controls.

      For example, if you define `US` within a whitelist, then state-specific access controls will be ignored for requests that originate within the United States.

    </Callout>

    **Example:**
    The following value identifies requests from the United States:  `US`

    <a id="country-subdivision--iso3166-2-"></a>

-   **Country Subdivision (ISO3166-2):** Identifies requests by a country's subdivision (e.g., state or province). Specify each desired subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).

    <Callout type="info">

      [Country](#country) access controls take precedence over country subdivision access controls.

      For example, if you define `US` within a whitelist, then state-specific access controls will be ignored for requests that originate within the United States.

    </Callout>

    **Syntax:**

    `<Country Code>`-`<Subdivision Code>`

    **Example:**

    The following value identifies requests from California:  `US-CA`

    <a id="ja3"></a>
-   **JA3:** {{ PRODUCT }} Premier only. Identifies requests by the JA3 fingerprint assigned to the request. A JA3 fingerprint identifies a client using key characteristics from a TLS request. This allows us to classify traffic across various IP addresses and ports.

    <a id="ip-address"></a>

-   **IP Address:** Identifies requests by the requester's IPv4 and/or IPv6 address.

    **Key information:**

    -   Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.

        <Callout type="info">

          Specify a subnet by appending a slash (/) and the desired bit-length of the prefix (e.g., 11.22.33.0/22).

        </Callout>

    -   **Limit:** You may specify up to 1,000 IP addresses or IP blocks per access rule. Whitelist, accesslist, and blacklist entries count towards this limit.

        <Callout type="tip">

          {{ PRODUCT }} Premier and Enterprise customers are allowed to create up to 2 access rules that may contain up to 50,000 IP addresses or IP blocks. Use the **High-Capacity** option to identify these two access rules. All other access rules are limited to a maximum of 1,000 IP addresses or IP blocks. You may reassign high-capacity status to another access rule by first clearing the **High-Capacity** option from an existing high-capacity access rule.

        </Callout>

    -   Certain services and applications, such as VPNs, mask a client's IP address. Specifically, they will report an IP address of their choosing instead of the client's real IP address. As a result, multiple devices and perhaps even users may end up sharing the same IP address.

    <a id="referrer"></a>

-   **Referrer:** Identifies requests by referrer. A successful match is found when the specified regular expression matches any portion of the `Referer` request header value.

    <Callout type="info">

      The `Referer` request header identifies the URL of the resource (e.g., web page) from which the request was initiated. The specified regular expression may match any portion of the entire URL including the protocol and hostname.

    </Callout>

    <a id="url"></a>

-   **URL:** Identifies requests by searching for a value that matches the specified regular expression within the request URI.

    <Callout type="important">

      Do not include a protocol or a hostname (e.g., `http://cdn.mydomain.com`) when defining a regular expression for this access control.

    </Callout>

    <Callout type="info">

      Certain common characters (e.g., ?.+) have special meaning in a regular expression. Use a backslash to escape a special character (e.g., main\\.html\\?user=Joe).

    </Callout>

    **Example:**

    All of the entries in the following sample access control list will match a request for `http://www.mydomain.com/marketing/images/ad001.png`:

    `/marketing/.*`

    `.*images.*`

    `.*/ad[0-9]*\.png`

    <a id="user-agent"></a>

-   **User Agent:** Identifies requests by the user agent that acted on behalf of a user to submit the request. A successful match is found when the specified regular expression matches any portion of the `User-Agent` request header value.

### Whitelists {/*whitelists*/}

The purpose of a whitelist is to identify legitimate traffic.
-   Traffic is whitelisted if it satisfies at least one whitelist
    criterion.
-   {{ PRODUCT_SECURITY }} automatically approves the delivery of whitelisted requests
    without inspecting them. As a result, all other security requirements are
    not applicable to whitelisted traffic.

### Accesslists {/*accesslists*/}

The purpose of an accesslist is to identify traffic that may access your content upon passing a threat assessment. 

{{ PRODUCT_SECURITY }} processes requests according to the following workflow:

1.  Whitelisted traffic is automatically allowed. All other traffic proceed to the next step.
2.  Has an accesslist been defined?
    -   **Yes:** Does the request satisfy at least one criterion in any accesslist?
        -   **Yes:** {{ PRODUCT_SECURITY }} will inspect the request.
        -   **No:** {{ PRODUCT_SECURITY }} will block the request.
    -   **No:** Proceed to check whether it should be blacklisted.

### Blacklists {/*blacklists*/}

The purpose of a blacklist is to describe unwanted traffic.

-   Traffic is blacklisted when it satisfies all of the following conditions:
    -   The request satisfies at least one blacklist criterion.
    -   The request does not qualify for whitelisting or accesslisting.
-   {{ PRODUCT_SECURITY }} automatically flags blacklisted requests as threats without inspecting them.

**Key information:**

-   A whitelist, accesslist, and blacklist may consist of zero or more entries (e.g., IP address, country, referrer, etc.).
-   A blank whitelist, accesslist, or blacklist is ignored.
-   The order of precedence is:

    `Whitelist > Accesslist > Blacklist`

    For example, {{ PRODUCT_SECURITY }} will inspect a request that satisfies both an accesslist and a blacklist. However, it will automatically allow the delivery of a request that satisfies a whitelist, an accesslist, and
    a blacklist.
-   Specify only a single item per line.
-   All entries within a URL, referrer, cookie, or user agent whitelist, accesslist, and blacklist are regular expressions.

    <Callout type="info">

      By default, a regular expression defines a case-sensitive match. Use syntax (e.g., `[a-zA-Z]`) to make it case-insensitive.

    </Callout>

-   Unlike whitelists and blacklists, a request must satisfy at least one criterion in each defined [accesslist](#Accesslists).

    <a id="list-limits"></a>

-   The maximum number of entries varies by category.

    | Category            | Combined Limit (Whitelist, Accesslist, and Blacklist) |
    |---------------------|-------------------------------------------------------|
    | ASN                 | 200                                                   |
    | Cookie              | 200                                                   |
    | Country             | 600                                                   |
    | Country Subdivision | 200                                                   |
    | JA3                 | 1,000                                                 |
    | IP Address          | 1,000  <Callout type="tip">{{ PRODUCT }} Premier and Enterprise customers are allowed to create up to 2 access rules that may contain up to 50,000 IP addresses or IP blocks. Use the **High-Capacity** option to identify these two access rules. All other access rules are limited to a maximum of 1,000 IP addresses or IP blocks. You may reassign high-capacity status to another access rule by first clearing the **High-Capacity** option from an existing high-capacity access rule.</Callout> |
    | Referrer            | 200                                                   |
    | URL                 | 200                                                   |
    | User Agent          | 200                                                   |

    <Callout type="info">

      {{ PRODUCT_SECURITY }} Insights supports up to 25 entries for each of the above categories. {{ ACCOUNT_UPGRADE  }}

    </Callout>

    <Callout type="info">

      Whitelist, accesslist, and blacklist entries count towards this limit.

    </Callout>

-   Unlike managed rules, access controls are enforced regardless of whether the requested content will be served from cache or your web server.

## Additional Access Controls {/*additional-access-controls*/}

Unlike the access controls described above, the following access controls are limited to identifying malicious traffic:

-   [HTTP method](#http-methods)
-   [Media type](#media-types--aka-content-types-)
-   [File extension](#file-extensions)
-   [File size](#file-size)
-   [Request headers](#request-headers)

### HTTP Methods {/*http-methods*/}

Define the set of valid and invalid HTTP request methods through the
**Allowed HTTP Methods** option.

-   **Valid:** {{ PRODUCT_SECURITY }} performs a threat assessment on requests whose
    HTTP method matches a marked option.
-   **Invalid:** {{ PRODUCT_SECURITY }} automatically sends an alert or blocks a
    request when its HTTP method does not match a marked option.

    **Sample HTTP methods:**

    `GET | POST | OPTIONS | HEAD | PUT | DELETE`

### Anonmymous Proxy {/*anonymous-proxy*/}

Determine whether we will detect requests that use an anonymizer or anonymous proxy tool through the **Detect Anon Proxy** option.

### Media Types (aka Content Types) {/*media-types-aka-content-types-*/}

Define the set of valid media types (aka content types or MIME types)
through the **Allowed Request Content Types** option.

**Key information:**

-   {{ PRODUCT_SECURITY }} restricts requests by media type when the **Allowed Request
    Content Types** option contains one or more value(s). Skip
    this requirement by setting this option to a blank value.

    <Callout type="info">

      If you would like to skip this check, make sure to remove all
      characters, including whitespace (e.g., a space character), from
      this option.

    </Callout>

-   If the **Allowed Request Content Types** option contains one
    or more value(s), then {{ PRODUCT_SECURITY }} will check whether the request contains a
    `Content-Type` header.

    -   **Missing:** If a request does not include the
        `Content-Type` header, then {{ PRODUCT_SECURITY }} will proceed to the
        next security check within this threat assessment.

        <Callout type="info">

          A client should only include a `Content-Type` header
          when the request includes a payload (e.g., HTTP
          `PUT` and `POST` requests). HTTP
          `GET` requests should not include this header.

        </Callout>

    -   **Present:** If a request includes the
        `Content-Type` header, then {{ PRODUCT_SECURITY }} will compare its value
        against the list of allowed values.

        -   **Match Found:** If a request's
            `Content-Type` header matches a media type defined
            by this option, then it will proceed to the next security
            check within this threat assessment.
        -   **Match Not Found:** If a request's
            `Content-Type` header does not match a media type
            defined by this option, then {{ PRODUCT_SECURITY }} will consider this a
            violation of this access rule and enforce the security
            policy (e.g., alert or block) defined within your [security application
            configuration](/applications/security/security_applications#enforcement-mode).
-   Add a media type by typing it and then pressing `ENTER`.
-   Media types are case-insensitive.

-   **Sample media types:**

    `application/x-www-form-urlencoded`

    `multipart/form-data`

    `text/xml`

    `application/xml`

    `application/x-amf`

    `application/json`

### File Extensions {/*file-extensions*/}

Define the set of invalid file extensions through the **Extension
Blacklist** option.

**Key information:**

-   {{ PRODUCT_SECURITY }} flags a request as a threat when its file extension, as determined by the request's relative path, matches one
    defined by this option.
-   File extensions are case-insensitive.
-   Add a file extension by typing it and then pressing `ENTER`.
-   **Syntax:**

    `.<File Extension>`

    **Sample list:**

    `.bat`

    `.cfg`

    `.dll`

### File Size {/*file-size*/}

Define the maximum file size, in bytes, for a `POST`
request via the **Single File Upload Limit** option

<Callout type="tip">

The recommended maximum value is 6,291,456 bytes.

</Callout>

<Callout type="info">

Define the maximum file size for a request that is part of a multipart
message through a managed rule.

[Learn more](/applications/security/managed_rules#file-size-and-query-string-limits-advanced).

</Callout>


### Request Headers {/*request-headers*/}

Define the set of invalid request headers via the **Header
Blacklist** option.

**Key information:**

-   {{ PRODUCT_SECURITY }} flags a request as a threat when it contains a header whose name
    matches one defined by this option.
-   Header names are case-insensitive.
-   Add a request header by typing it and then pressing `ENTER`.

## Access Rule Administration {/*access-rule-administration*/}

You may create, modify, and delete access rules.

**Key information:**

-   Administer access rules from the **Access Rules**
    page.
-   Apply an access rule to production traffic by adding it to a
    [Security Application configuration](/applications/security/security_applications) and then
    determining how it will be enforced. Multiple Security Application
    configurations may use the same access rule. Leverage this
    capability to tailor security screening by application or traffic
    profile.
-   It may take up to 2 minutes for an updated access rule to be applied
    across our entire network.

**To create an access rule**

1.  Navigate to the **Access Rules** page.
    {{ SECURITY_NAV }} **Access Rules**.
2.  Click **+ New Access Ruleset**.
3.  In the **Name of Rule** option, type the unique name by which this
    access rule will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    configuration.
4.  Define the desired whitelists, accesslists, and blacklists.

    1.  From the **Add an Access Control** option, select the
        [desired category](#basic-access-controls) (IP, Country, Referrer,
        etc.).
    2.  Click **+ Whitelist**, **+ Blacklist**, or
        **+ Accesslist**.
    3.  Add a value by typing it and then pressing `ENTER`. Repeat this step as needed.

        <Callout type="info">

           All entries within a URL, referrer, cookie, or user agent
           whitelist, accesslist, and blacklist are regular expressions.

        </Callout>

    4.  Repeat steps 4.2 and 4.3 if you need to add another type of
        access control for this category.
    5.  Repeat steps 4.1 - 4.4 to add whitelists, accesslists, and
        blacklists for other categories.
5.  Define which HTTP methods and media types are allowed and which file
    extensions and request headers are disallowed.

    1.  If the **Advanced Settings** section is collapsed, click on it to expand it.
    2.  From the **Allowed HTTP Methods** section, verify that
        only the [HTTP methods](#http-methods) that should be
        allowed are marked. If the desired HTTP method is not listed,
        then you may manually define it in the **Other HTTP
        Methods** option by typing it and then pressing 'ENTER'.

        <Callout type="info">

          Requests that use a disallowed HTTP method are deemed a
          threat.

        </Callout>

    3.  In the **Response Header Name** option, set the name of
        the response header that will be included with blocked requests.
        This name may only consist of alphanumeric characters and dashes.

    4.  In the **Single File Upload Limit** option, define the maximum file size, in bytes, for a `POST` request.

    5.  From the **Allowed Request Content Types** option,
         verify that the list only contains the [media
         types](#media-types--aka-content-types-) that should be allowed.

        Add a media type by typing it and then pressing `ENTER`. Remove a media type by clicking the `x` icon that appears directly to the right of it.

        <Callout type="info">

          Requests that use a disallowed media type are deemed a
          threat.

        </Callout>

    6.  From the **Extension Blacklist** option, verify that all
        of the listed [file extensions](#file-extensions) should be
        blocked.

        Add a file extension by typing it and then pressing `ENTER`. Remove a file extension by clicking the `x` icon that appears directly to the right of it.

        <Callout type="info">

          A request is blocked when its file extension, as determined by the request's relative path, matches a value defined within this option.

        </Callout>

    7.  From the **Header Blacklist** option, add the set of [request headers](#request-headers) that should be blocked.

        Add a request header by typing it and then pressing `ENTER`. Remove a request header by clicking the `x` icon that appears directly to the right of it.

        <Callout type="info">

          A request is blocked when it contains a header whose name matches
          a value defined within this option.

        </Callout>

6.  Click **Save**.

**To modify an access rule**

1.  Navigate to the **Access Rules** page.
    {{ SECURITY_NAV }} **Access Rules**.
2.  Click on the desired access rule.
3.  Make the desired changes.
4.  Click **Save**.

**To delete an access rule**

<Callout type="important">

  You cannot delete an access rule that is associated with a Security
  Application configuration. Please either modify the Security
  Application configuration to point to a different access rule or
  delete that Security Application configuration.

</Callout>

1.  Check your Security Application configurations to verify
    that the desired access rule is not in use.
2.  Navigate to the **Access Rules** page.
    {{ SECURITY_NAV }} **Access Rules**.
3.  Click on the desired access rule set.
4.  Click **Delete**.
5.  Click **Confirm**.

{{ security_version_control.md }}
