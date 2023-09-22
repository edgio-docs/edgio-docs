---
title: Access Rules API
---

An access rule identifies legitimate traffic and threats through access controls.

[Learn more.](/guides/security/access_rules)

Automate the following tasks:
-   [Add Access Rule (ACL)](#add-access-rule-acl)
-   [Delete Access Rule (ACL)](#delete-access-rule-acl)
-   [Get All Access Rules (ACL)](#get-all-access-rules-acl)
-   [Get Access Rule (ACL)](#get-access-rule-acl)
-   [Update Access Rule (ACL)](#update-access-rule-acl)

## Authorization {/*authorization*/}

Authorize requests through the `app.waf` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Add Access Rule (ACL) {/*add-access-rule-acl*/}

Creates an access rule that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

<h3>Request</h3>

A request to create an access rule is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/acl`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|allow_anonymous_proxy |Boolean | Determines whether we will detect requests that use an anonymizer or anonymous proxy tool. |
|allowed_http_methods|Array of strings|Identifies each allowed HTTP method (e.g., `GET`).|
|allowed_request_content_types|Array of strings|Identifies each allowed media type (e.g., `application/json`).|
|asn|Object|Contains access controls for autonomous system numbers (ASNs).|
|cookie|Object|Contains access controls for cookie names. All cookies defined within a whitelist, accesslist, or blacklist are regular expressions.|
|country|Object|Contains access controls for countries. Specify each desired country using its [country code](/guides/reference/country_codes).|
|disallowed_extensions|Array of strings|Indicates each file extension for which WAF will send an alert or block the request.|
|disallowed_headers|Array of strings|Indicates each request header for which WAF will send an alert or block the request.|
|ip|Object|Contains access controls for IPv4 and/or IPv6 addresses. Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.|
|max_file_size|Integer|Indicates the maximum file size, in bytes, for a `POST` request body.|
|name|String|Assigns a name to this access rule.|
|referer|Object|Contains access controls for referrers. All referrers defined within a whitelist, accesslist, or blacklist are regular expressions.|
|response_header_name|String|Determines the name of the response header that will be included with blocked requests.|
|sd_iso|Object|Contains access controls for country subdivisons (e.g., states or provinces). Specify each desired country subdivision using an ISO-3166-2 code.|
| super_capacity | Boolean | Indicates whether this is a high-capacity access rule. A high-capacity access rule supports up to 10,000 IP addresses or IP blocks. |
| team_config | Boolean | Required. Set to `true`. |
|url|Object|Contains access controls for URL paths. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining `value \| values`. <br />**Sample value:** `/marketing` <br />All URL paths defined within a whitelist, accesslist, or blacklist are regular expressions.|
|user_agent|Object|Contains access controls for user agents. All user agents defined within a whitelist, accesslist, or blacklist are regular expressions.|

##### Access Control Object {/*access-control-object-add-access-rule-acl*/}

The `asn`, `cookie`, `country`, `ip`, `referer`, `sd_iso`, `url`, and `user_agent` objects contain the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|accesslist|Array of string or integer values|Contains entries that identify traffic that may access your content upon passing a threat assessment. ASN access controls are integer values. All other access controls are strings.|
|blacklist|Array of string or integer values|Contains entries that identify traffic that will be blocked or for which an alert will be generated. ASN access controls are integer values. All other access controls are strings.|
|whitelist|Array of string or integer values|Contains entries that identify traffic that may access your content without undergoing threat assessment. ASN access controls are integer values. All other access controls are strings.|

All entries within a cookie, referrer, URL, or user agent whitelist, accesslist, or blacklist are regular expressions.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the resource.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/acl  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "asn": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "cookie": {
        "blacklist": [
            "bot"
        ],
        "whitelist": [
            "trusted"
        ]
    },
    "country": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "disallowed_extensions": [
        ".asa",
        ".asax",
        ".ascx",
        ".axd",
        ".backup",
        ".bak",
        ".bat",
        ".cdx",
        ".cer",
        ".cfg",
        ".cmd",
        ".com",
        ".config",
        ".conf",
        ".cs",
        ".csproj",
        ".csr",
        ".dat",
        ".db",
        ".dbf",
        ".dll",
        ".dos",
        ".htr",
        ".htw",
        ".ida",
        ".idc",
        ".idq",
        ".inc",
        ".ini",
        ".key",
        ".licx",
        ".lnk",
        ".log",
        ".mdb",
        ".old",
        ".pass",
        ".pdb",
        ".pol",
        ".printer",
        ".pwd",
        ".resources",
        ".resx",
        ".sql",
        ".sys",
        ".vb",
        ".vbs",
        ".vbproj",
        ".vsdisco",
        ".webinfo",
        ".xsd",
        ".xsx/"
    ],
    "ip": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "referer": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "url": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "user_agent": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "team_config": true
}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "dQndQsnv",
    "status": "success",
    "success": true
}
```

## Delete Access Rule (ACL) {/*delete-access-rule-acl*/}

Deletes an access rule (ACL) that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

<h3>Request</h3>

A request to delete an access rule is described below.

`DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/acl/<ACCESS RULE ID>`

Define the following variable when submitting the above request:

{{ TEAM_ID }}
-   `<ACCESS RULE ID>`**:** Required. Replace this variable with the system-defined ID for the desired access rule.

    <Callout type="tip">

      Use the [Get All Access Rules (ACLs) operation](#get-all-access-rules-acl) to retrieve a list of access rules and their system-defined IDs

	</Callout>

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the resource.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/acl/CGifudum  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 51

{
    "id": "CGifudum",
    "status": "success",
    "success": true
}
```

## Get All Access Rules (ACLs) {/*get-all-access-rules-acl*/}

Retrieves a list of access rules. An access rule identifies valid or malicious requests via whitelists, accesslists, and blacklists.

<h3>Request</h3>

A request to retrieve all access rules is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/acl`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for each access rule:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the access rule. Pass this ID to the [Get Access Rule (ACL) operation](#get-access-rule-acl) to retrieve the properties for this access rule.|
|last_modified_date|String|Indicates the date and time at which the access rule was last modified. <br />**Syntax:** `MM/DD/YYYYhh:mm:ss [AM|PM]`|
|name|String|Indicates the name of the access rule.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/acl  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 141

[{
        "id": "VSgeVhmb",
        "name": "My Access Rule",
        "super_capacity": false,
        "last_modified_date": "2023-07-28T19:10:42.931050Z"
    }
]
```

## Get Access Rule (ACL) {/*get-access-rule-acl*/}

Retrieves an access rule that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

<h3>Request</h3>

A request to retrieve an access rule is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/acl/<ACCESS RULE ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<ACCESS RULE ID>`**:** Required. Replace this variable with the system-defined ID for the desired access rule.

    <Callout type="tip">

      Use the [Get All Access Rules (ACLs) operation](#get-all-access-rules-acl) to retrieve a list of access rules and their system-defined IDs

	</Callout>

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements:

|Name|Data Type|Description|
|--- |--- |--- |
|allow_anonymous_proxy |Boolean | Determines whether we will detect requests that use an anonymizer or anonymous proxy tool. |
|allowed_http_methods|Array of strings|Identifies each allowed HTTP method (e.g., `GET`).|
|allowed_request_content_types|Array of strings|Identifies each allowed media type (e.g., `application/json`).|
|asn|Object|Contains access controls for autonomous system numbers (ASNs).|
|cookie|Object|Contains access controls for cookie names. All cookies defined within a whitelist, accesslist, or blacklist are regular expressions.|
|country|Object|Contains access controls for countries. Each country is identified by its [country code](/guides/reference/country_codes).|
|customer_id|String|Identifies your account by its customer account number.|
|disallowed_extensions|Array of strings|Indicates each file extension for which WAF will send an alert or block the request.|
|disallowed_headers|Array of strings|Indicates each request header for which WAF will send an alert or block the request.|
|id|String|Indicates the system-defined ID for this access rule.|
|ip|Object|Contains access controls for IPv4 and/or IPv6 addresses. Each IP address is defined through standard IPv4/IPv6 and CIDR notation.|
|last_modified_by|String|Identifies the {{ PORTAL }} user that last modified this access rule. This field does not reflect updates performed through the REST API.|
|last_modified_date|String|Indicates the timestamp at which this access rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ`|
|max_file_size|Integer|Indicates the maximum file size, in bytes, for a `POST` request body.|
|name|String|Indicates the name assgined to this access rule.|
|referer|Object|Contains access controls for referrers. All referrers defined within a whitelist, accesslist, or blacklist are regular expressions.|
|response_header_name|String|Indicates the name of the response header that will be included with blocked requests.|
|sd_iso|Object|Contains access controls for country subdivisons (e.g., states or provinces). Each country subdivision is defined as an ISO-3166-2 code.|
| super_capacity | Boolean | Indicates whether this is a high-capacity access rule. A high-capacity access rule supports up to 10,000 IP addresses or IP blocks. |
| team_config | Boolean | Returns `true`. |
|url|Object|Contains access controls for URL paths. This URL path starts directly after the hostname. All URL paths defined within a whitelist, accesslist, or blacklist are regular expressions.|
|user_agent|Object|Contains access controls for user agents. All user agents defined within a whitelist, accesslist, or blacklist are regular expressions.|
|version|String|Reserved for future use.|

##### Access Control Object {/*access-control-object-get-access-rule-acl*/}

The `asn`, `cookie`, `country`, `ip`, `referer`, `sd_iso`, `url`, and `user_agent` objects contain the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|accesslist|Array of string or integer values|Contains entries that identify traffic that may access your content upon passing a threat assessment. ASN access controls are integer values. All other access controls are strings.|
|blacklist|Array of string or integer values|Contains entries that identify traffic that will be blocked or for which an alert will be generated. ASN access controls are integer values. All other access controls are strings.|
|whitelist|Array of string or integer values|Contains entries that identify traffic that may access your content without undergoing threat assessment. ASN access controls are integer values. All other access controls are strings.|

All entries within a cookie, referrer, URL, or user agent whitelist, accesslist, or blacklist are regular expressions.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/acl/CGifudum  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 2671

{
    "allow_anonymous_proxy": true,
    "allowed_http_methods": [
        "GET",
        "POST",
        "PUT",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "DELETE"
    ],
    "allowed_request_content_types": [
        "application/json",
        "application/x-amf",
        "application/x-www-form-urlencoded",
        "application/xml",
        "multipart/form-data",
        "text/html",
        "text/plain",
        "text/xml"
    ],
    "asn": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "cookie": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "country": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "customer_id": "{{ SAMPLE_TEAM_ID }}",
    "disallowed_extensions": [
        ".asa",
        ".asax",
        ".ascx",
        ".axd",
        ".backup",
        ".bak",
        ".bat",
        ".cdx",
        ".cer",
        ".cfg",
        ".cmd",
        ".conf",
        ".config",
        ".cs",
        ".csproj",
        ".csr",
        ".dat",
        ".db",
        ".dbf",
        ".dll",
        ".dos",
        ".exe",
        ".htr",
        ".htw",
        ".ida",
        ".idc",
        ".idq",
        ".inc",
        ".ini",
        ".key",
        ".licx",
        ".lnk",
        ".log",
        ".mdb",
        ".old",
        ".pass",
        ".pdb",
        ".pol",
        ".printer",
        ".pwd",
        ".resources",
        ".resx",
        ".sql",
        ".sys",
        ".vb",
        ".vbproj",
        ".vbs",
        ".vsdisco",
        ".webinfo",
        ".xsd",
        ".xsx"
    ],
    "disallowed_headers": [],
    "id": "CGifudum",
    "ip": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "last_modified_by": "joe@example.com via Edgio AppOps Console",
    "last_modified_date": "2023-07-28T19:10:42.931050Z",
    "max_file_size": 6291456,
    "name": "My Access Rule",
    "referer": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "response_header_name": "x-edgio-security-audit",
    "sd_iso": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "super_capacity": false,
    "team_config": true,
    "url": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "user_agent": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "version": null
}
```

## Update Access Rule (ACL) {/*update-access-rule-acl*/}

Updates an access rule that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

<h3>Request</h3>

A request to update an access rule is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/acl/<ACCESS RULE ID>`

Define the following variable when submitting the above request:

{{ TEAM_ID }}
-   `<ACCESS RULE ID>`**:** Required. Replace this variable with the system-defined ID for the desired access rule.

    <Callout type="tip">

      Use the [Get All Access Rules (ACLs) operation](#get-all-access-rules-acl) to retrieve a list of access rules and their system-defined IDs

	</Callout>

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|allow_anonymous_proxy |Boolean | Determines whether we will detect requests that use an anonymizer or anonymous proxy tool. |
|allowed_http_methods|Array of strings|Identifies each allowed HTTP method (e.g., `GET`).|
|allowed_request_content_types|Array of strings|Identifies each allowed media type (e.g., `application/json`).|
|asn|Object|Contains access controls for autonomous system numbers (ASNs).|
|cookie|Object|Contains access controls for cookie names. All cookies defined within a whitelist, accesslist, or blacklist are regular expressions.|
|country|Object|Contains access controls for countries. Specify each desired country using its [country code](/guides/reference/country_codes).|
|customer_id|String|Identifies your account by its customer account number.|
|disallowed_extensions|Array of strings|Indicates each file extension for which WAF will send an alert or block the request.|
|disallowed_headers|Array of strings|Indicates each request header for which WAF will send an alert or block the request.|
|id|String|Indicates the system-defined ID for this access rule.|
|ip|Object|Contains access controls for IPv4 and/or IPv6 addresses. Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.|
|max_file_size|Integer|Indicates the maximum file size, in bytes, for a `POST` request body.|
|name|String|Assigns a name to this access rule.|
|referer|Object|Contains access controls for referrers. All referrers defined within a whitelist, accesslist, or blacklist are regular expressions.|
|response_header_name|String|Determines the name of the response header that will be included with blocked requests.|
|sd_iso|Object|Contains access controls for country subdivisons (e.g., states or provinces). Specify each desired country subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).|
| super_capacity | Boolean | Indicates whether this is a high-capacity access rule. A high-capacity access rule supports up to 10,000 IP addresses or IP blocks. |
| team_config | Boolean | Required. Set to `true`. |
|url|Object|Contains access controls for URL paths. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining `value \| values`. <br />**Sample value:** `/marketing` <br />All URL paths defined within a whitelist, accesslist, or blacklist are regular expressions.|
|user_agent|Object|Contains access controls for user agents. All user agents defined within a whitelist, accesslist, or blacklist are regular expressions.|

##### Access Control Object {/*access-control-object-update-access-rule-acl*/}

The `asn`, `cookie`, `country`, `ip`, `referer`, `sd_iso`, `url`, and `user_agent` objects contain the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|accesslist|Array of string or integer values|Contains entries that identify traffic that may access your content upon passing a threat assessment. ASN access controls are integer values. All other access controls are strings.|
|blacklist|Array of string or integer values|Contains entries that identify traffic that will be blocked or for which an alert will be generated. ASN access controls are integer values. All other access controls are strings.|
|whitelist|Array of string or integer values|Contains entries that identify traffic that may access your content without undergoing threat assessment. ASN access controls are integer values. All other access controls are strings.|

All entries within a cookie, referrer, URL, or user agent whitelist, accesslist, or blacklist are regular expressions.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the resource.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/acl/CGifudum  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "allow_anonymous_proxy": true,
    "allowed_http_methods": [
        "GET",
        "POST",
        "PUT",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "DELETE"
    ],
    "allowed_request_content_types": [
        "application/json",
        "application/x-amf",
        "application/x-www-form-urlencoded",
        "application/xml",
        "multipart/form-data",
        "text/html",
        "text/plain",
        "text/xml"
    ],
    "asn": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "cookie": {
        "blacklist": [
            "bot"
        ],
        "whitelist": [
            "trusted"
        ]
    },
    "country": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "customer_id": "{{ SAMPLE_TEAM_ID }}",
    "disallowed_extensions": [
        ".asa",
        ".asax",
        ".ascx",
        ".axd",
        ".backup",
        ".bak",
        ".bat",
        ".cdx",
        ".cer",
        ".cfg",
        ".cmd",
        ".conf",
        ".config",
        ".cs",
        ".csproj",
        ".csr",
        ".dat",
        ".db",
        ".dbf",
        ".dll",
        ".dos",
        ".exe",
        ".htr",
        ".htw",
        ".ida",
        ".idc",
        ".idq",
        ".inc",
        ".ini",
        ".key",
        ".licx",
        ".lnk",
        ".log",
        ".mdb",
        ".old",
        ".pass",
        ".pdb",
        ".pol",
        ".printer",
        ".pwd",
        ".resources",
        ".resx",
        ".sql",
        ".sys",
        ".vb",
        ".vbproj",
        ".vbs",
        ".vsdisco",
        ".webinfo",
        ".xsd",
        ".xsx"
    ],
    "disallowed_headers": [],
    "id": "CGifudum",
    "ip": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "last_modified_by": "joe@example.com via Edgio AppOps Console",
    "last_modified_date": "2023-07-28T19:10:42.931050Z",
    "max_file_size": 6291456,
    "name": "My Access Rule",
    "referer": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "response_header_name": "x-edgio-security-audit",
    "sd_iso": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "super_capacity": false,
    "team_config": true,
    "url": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "user_agent": {
        "accesslist": [],
        "blacklist": [],
        "whitelist": []
    },
    "version": null
}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 51

{
    "id": "CGifudum",
    "status": "success",
    "success": true
}
```