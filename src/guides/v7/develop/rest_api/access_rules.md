---
title: Access Rules
---


Add Access Rule (ACL)
Delete Access Rule (ACL)
Get All Access Rules (ACL)
Get Access Rule (ACL)
Update Access Rule (ACL)

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

## Add Access Rule (ACL)

Creates an access rule that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

[Learn more.](/guides/security/access_rules)

### Request

A request to create an access rule is described below.

`POST {{ API_URL }}/waf/v1.0/acl`

Define the following variable when submitting the above request:

-   **:** Required. Replace this variable with your team's tenant ID. 

#### Request Headers

This endpoint only takes advantage of [common request headers](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Request).

#### Request Body

Pass the following request body parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|allowed_http_methods|Array of String values|Identifies each allowed HTTP method (e.g., GET).|
|allowed_request_content_types|Array of String values|Identifies each allowed media type (e.g., application\/json).|
|asn|Object|Contains access controls for autonomous system numbers (ASNs).|
|cookie|Object|Contains access controls for cookies.|
|country|Object|Contains access controls for countries. Specify each desired country using its country code.[Learn more.](FINDME)|
|customer_id|String|Identifies your account by its customer account number.|
|disallowed_extensions|Array of String values|Indicates each file extension for which WAF will send an alert or block the request.|
|disallowed_headers|Array of String values|Indicates each request header for which WAF will send an alert or block the request.|
|ip|Object|Contains access controls for IPv4 and/or IPv6 addresses. Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.|
|max_file_size|Integer|Indicates the maximum file size, in bytes, for a POST request body.|
|name|String|Assigns a name to this access rule.|
|referer|Object|Contains access controls for referrers. All referrers defined within a whitelist, accesslist, or blacklist are regular expressions.|
|response_header_name|String|Determines the name of the response header that will be included with blocked requests.|
|sd_iso|Object|Contains access controls for country subdivisons (e.g., states or provinces). Specify each desired country subdivision using an ISO-3166-2 code.|
|url|Object|Contains access controls for URL paths. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining `value | values`. <br />**Sample value:** `/marketing` <br />All URL paths defined within a whitelist, accesslist, or blacklist are regular expressions.|
|user_agent|Object|Contains access controls for user agents. All user agents defined within a whitelist, accesslist, or blacklist are regular expressions.|

##### ACL Type Object

The asn, cookie, country, ip, referer, url, and user_agent objects contain the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|accesslist|Array of string or integer values|Contains entries that identify traffic that may access your content upon passing a threat assessment. ASN access controls are integer values. All other access controls are string values.|
|blacklist|Array of string or integer values|Contains entries that identify traffic that will be blocked or for which an alert will be generated. ASN access controls are integer values. All other access controls are string values.|
|whitelist|of string or integer values|Contains entries that identify traffic that may access your content without undergoing threat assessment. ASN access controls are integer values. All other access controls are string values.|

All entries within a cookie, referrer, URL, or user agent whitelist, accesslist, or blacklist are regular expressions.

### Response

The response to the above request includes an HTTP status code, response headers, and a response body.

#### Status Code

A [status code](FINDME../../Introduction/Status_Codes_and_Error_Messages.htm) indicates whether the request was successfully performed.

#### Response Headers

The response for this endpoint only includes standard HTTP response headers.

[View common response headers.](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Response)

#### Response Body

The response body for a successful request contains the following parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the resource.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

##### Errors

The response body for an unsuccessful request contains the following parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|success|Boolean|Returns `false`.|
|errors|Array of objects|Contains one or more error(s).|

###### errors Array

The `errors` array describes each error that occurred using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|code|Integer|Indicates the HTTP status code for the error.|
|message|String|Indicates the description for the error that occurred.|

### Sample Request and Response (JSON)

A sample JSON request is shown below.

```
POST {{ API_URL }}/waf/v1.0/acl  HTTP/1.1
Authorization: TOK:12345678-1234-1234-1234-1234567890ab
Accept: application/json
Content-Type: application/json
Host:  api.edgecast.com

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
    }
}
```

A sample JSON response is shown below.

```
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

Delete Access Rule (ACL)
========================

Deletes an access rule (ACL) that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

[Learn more.](/guides/security/access_rules)

Request
-------

A request to delete an access rule is described below.

`DELETE {{ API_URL }}/waf/v1.0/acl/[Access Rule ID](#AccessRuleID)`


Define the following variable when submitting the above request:

-   **:** Required. Replace this variable with your team's tenant ID. 
-   **:** Required. Replace this variable with 


Access Rule ID

Required

Replace this variable with the system-defined ID for the desired access rule.

Use the [Get All Access Rules (ACLs) endpoint](Get-All-ACLs.htm) to retrieve a list of access rules and their system-defined IDs



#### Request Headers

This endpoint only takes advantage of [common request headers](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Request).

#### Request Body

Request body parameters are not required by this endpoint.

Response
--------

The response to the above request includes an HTTP status code, response headers, and a response body.

#### Status Code

A [status code](FINDME../../Introduction/Status_Codes_and_Error_Messages.htm) indicates whether the request was successfully performed.

#### Response Headers

The response for this endpoint only includes standard HTTP response headers.

[View common response headers.](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Response)

#### Response Body

The response body for a successful request contains the following parameters:

NameData TypeDescriptionid

String

Indicates the system-defined ID for the resource.

status

String

Returns success.

success

Boolean

Returns true.



##### Errors

The response body for an unsuccessful request contains the following parameters:

NameData TypeDescriptionsuccess

Boolean

Returns false.

[errors](#errors)

Array

Objects

Contains one or more error(s).



###### errors Array

The errors array describes each error that occurred using the following properties:

NameData TypeDescriptioncode

Integer

Indicates the HTTP status code for the error.

message

String

Indicates the description for the error that occurred.



Sample Request and Response (JSON)
----------------------------------

A sample JSON request is shown below.

DELETE {{ API_URL }}/waf/v1.0/acl/CGifudum  HTTP/1.1

Authorization: TOK:12345678-1234-1234-1234-1234567890ab

Accept: application/json

Content-Type: application/json

Host: api.edgecast.com

A sample JSON response is shown below.

HTTP/1.1 200 OK

Cache-Control: private

Content-Type: application/json; charset=utf-8

Date:  Thu, 15 Apr 2021 12:00:00 GMT

Content-Length: 51

```
{
"id": "CGifudum",
"status": "success",
"success": true
}
```

Get All Access Rules (ACLs)
===========================

Retrieves a list of access rules. An access rule identifies valid or malicious requests via whitelists, accesslists, and blacklists.

[Learn more.](/guides/security/access_rules)

Request
-------

A request to retrieve all access rules is described below.

`GET

{{ API_URL }}/waf/v1.0/acl

Define the following variable when submitting the above request:

-   **:** Required. Replace this variable with your team's tenant ID. 

#### Request Headers

This endpoint only takes advantage of [common request headers](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Request).

#### Request Body

Request body parameters are not required by this endpoint.

Response
--------

The response to the above request includes an HTTP status code, response headers, and a response body.

#### Status Code

A [status code](FINDME../../Introduction/Status_Codes_and_Error_Messages.htm) indicates whether the request was successfully performed.

#### Response Headers

The response for this endpoint only includes standard HTTP response headers.

[View common response headers.](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Response)

#### Response Body

The response body for a successful request contains the following response elements for each access rule:

NameData TypeDescriptionid

String

Indicates the system-defined ID for the access rule.

Pass this ID to the [Get Access Rule (ACL) endpoint](Get-ACL.htm) to retrieve the properties for this access rule.

last_modified_date

String

Indicates the date and time at which the access rule was last modified.

Syntax:

MM/DD/YYYYhh:mm:ss [AM|PM]name

String

Indicates the name of the access rule.



##### Errors

The response body for an unsuccessful request may contain an error element that provides additional information.

[View common error messages.](../../Introduction/Error_Messages.htm)

Sample Request and Response (JSON)
----------------------------------

A sample JSON request is shown below.

GET {{ API_URL }}/waf/v1.0/acl  HTTP/1.1

Authorization: TOK:12345678-1234-1234-1234-1234567890ab

Accept: application/json

Content-Type: application/json

Host: api.edgecast.com

A sample JSON response is shown below.

HTTP/1.1 200 OK

Cache-Control: private

Content-Type: application/json; charset=utf-8

Date:  Thu, 15 Apr 2021 12:00:00 GMT

Content-Length: 141

```
[
{
"name": "My Access Rule",
"last_modified_date": "2020-12-17T20:44:23.695323Z",
"id": "VSgeVhmb"
}
]
```

Get Access Rule (ACL)
=====================


Retrieves an access rule that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

[Learn more.](/guides/security/access_rules)

Request
-------

A request to retrieve an access rule is described below.

`GET

{{ API_URL }}/waf/v1.0/acl/[Access Rule ID](#AccessRuleID)

Define the following variable when submitting the above request:

-   **:** Required. Replace this variable with your team's tenant ID. 
-   **:** Required. Replace this variable with 

Access Rule ID

Required

Replace this variable with the system-defined ID for the desired access rule.

Use the [Get All Access Rules (ACLs) endpoint](Get-All-ACLs.htm) to retrieve a list of access rules and their system-defined IDs



#### Request Headers

This endpoint only takes advantage of [common request headers](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Request).

#### Request Body

Request body parameters are not required by this endpoint.

Response
--------

The response to the above request includes an HTTP status code, response headers, and a response body.

#### Status Code

A [status code](FINDME../../Introduction/Status_Codes_and_Error_Messages.htm) indicates whether the request was successfully performed.

#### Response Headers

The response for this endpoint only includes standard HTTP response headers.

[View common response headers.](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Response)

#### Response Body

The response body for a successful request contains the following response elements for each access rule:

NameData TypeDescriptionallowed_http_methods

Array

String values

Identifies each allowed HTTP method (e.g., GET).

allowed_request_content_types

Array

String values

Identifies each allowed media type (e.g., application\\/json).

[asn](#ACLTypeObject)

Object

Contains access controls for autonomous system numbers (ASNs).

[cookie](#ACLTypeObject)

Object

Contains access controls for cookie names.

All cookies defined within a whitelist, accesslist, or blacklist are regular expressions.

[country](#ACLTypeObject)

Object

Contains access controls for countries. Each country is identified by its country code.

[Learn more.](https://docs.edgecast.com/cdn/index.html#Reference/Country_Codes.htm)

customer_id

String

Identifies your account by its customer account number.

disallowed_extensions

Array

String values

Indicates each file extension for which WAF will send an alert or block the request.

disallowed_headers

Array

String values

Indicates each request header for which WAF will send an alert or block the request.

id

String

Indicates the system-defined ID for this access rule.

[ip](#ACLTypeObject)

Object

Contains access controls for IPv4 and/or IPv6 addresses. Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.

last_modified_by

String

Reserved for future use.

last_modified_date

String

Indicates the timestamp at which this access rule was last modified.

Syntax:

YYYY-MM-DDThh:mm:ss:ffffffZ[Learn more.](../../References/Report_Date_Time_Format.htm)

max_file_size

Integer

Indicates the maximum file size, in bytes, for a POST request body.

name

String

Indicates the name assigned to this access rule.

[referer](#ACLTypeObject)

Object

Contains access controls for referrers.

All referrers defined within a whitelist, accesslist, or blacklist are regular expressions.

response_header_name

String

Indicates the name of the response header that will be included with blocked requests.

[sd_iso](#ACLTypeObject)

Object

Contains access controls for country subdivisons (e.g., states or provinces). Specify each desired country subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).

[url](#ACLTypeObject)

Object

Contains access controls for URL paths.

All URL paths defined within a whitelist, accesslist, or blacklist are regular expressions.

[user_agent](#ACLTypeObject)

Object

Contains access controls for user agents.

All user agents defined within a whitelist, accesslist, or blacklist are regular expressions.

version

String

Reserved for future use.



##### ACL Type Object

The asn, cookie, country, ip, referer, url, and user_agent objects contain the following properties:

NameData TypeDescriptionaccesslist

Array

String / integer values

Contains entries that identify traffic that may access your content upon passing a threat assessment.

ASN access controls are integer values. All other access controls are string values.

blacklist

Array

String / integer values

Contains entries that identify traffic that will be blocked or for which an alert will be generated.

ASN access controls are integer values. All other access controls are string values.

whitelist

Array

String / integer values

Contains entries that identify traffic that may access your content without undergoing threat assessment.

ASN access controls are integer values. All other access controls are string values.



All entries within a cookie, referrer, URL, or user agent whitelist, accesslist, or blacklist are regular expressions.

##### Errors

The response body for an unsuccessful request may contain an error element that provides additional information.

[View common error messages.](../../Introduction/Error_Messages.htm)

Sample Request and Response (JSON)
----------------------------------

A sample JSON request is shown below.

GET {{ API_URL }}/waf/v1.0/acl/CGifudum  HTTP/1.1

Authorization: TOK:12345678-1234-1234-1234-1234567890ab

Accept: application/json

Content-Type: application/json

Host: api.edgecast.com

A sample JSON response is shown below.

HTTP/1.1 200 OK

Cache-Control: private

Content-Type: application/json; charset=utf-8

Date:  Thu, 15 Apr 2021 12:00:00 GMT

Content-Length: 1400

```
{
"allowed_http_versions": [
"HTTP/1.0",
"HTTP/1.1",
"HTTP/2.0"
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
"customer_id": "0001",
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
"id": "CGifudum",
"ip": {
"accesslist": [],
"blacklist": [],
"whitelist": []
},
"last_modified_date": "2020-06-03T23:02:22.803847Z",
"name": "ACL configuration",
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
}
}
```


Update Access Rule (ACL)
========================

Updates an access rule that identifies valid or malicious requests via whitelists, accesslists, and blacklists.

[Learn more.](/guides/security/access_rules)

Request
-------

A request to update an access rule is described below.

`PUT

{{ API_URL }}/waf/v1.0/acl/[Access Rule ID](#AccessRuleID)

Define the following variable when submitting the above request:

-   **:** Required. Replace this variable with your team's tenant ID. 
-   **:** Required. Replace this variable with 

Access Rule ID

Required

Replace this variable with the system-defined ID for the desired access rule.

Use the [Get All Access Rules (ACLs) endpoint](Get-All-ACLs.htm) to retrieve a list of access rule and their system-defined IDs



#### Request Headers

This endpoint only takes advantage of [common request headers](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Request).

#### Request Body

Pass the following request body parameters:

NameData TypeDescriptionallowed_http_methods

Array

String values

Identifies each allowed HTTP method (e.g., GET).

allowed_request_content_types

Array

String values

Identifies each allowed media type (e.g., application\\/json).

[asn](#ACLTypeObject)

Object

Contains access controls for autonomous system numbers (ASNs).

[cookie](#ACLTypeObject)

Object

Contains access controls for cookies.

[country](#ACLTypeObject)

Object

Contains access controls for countries. Specify each desired country using its country code.

[Learn more.](https://docs.edgecast.com/cdn/index.html#Reference/Country_Codes.htm)

customer_id

String

Identifies your account by its customer account number.

disallowed_extensions

Array

String values

Indicates each file extension for which WAF will send an alert or block the request.

disallowed_headers

Array

String values

Indicates each request header for which WAF will send an alert or block the request.

id

String

Indicates the system-defined ID for this access rule.

[ip](#ACLTypeObject)

Object

Contains access controls for IPv4 and/or IPv6 addresses. Specify each desired IP address using standard IPv4/IPv6 and CIDR notation.

max_file_size

Integer

Indicates the maximum file size, in bytes, for a POST request body.

name

String

Indicates the name assigned to this access rule.

[referer](#ACLTypeObject)

Object

Contains access controls for referrers.

All referrers defined within a whitelist, accesslist, or blacklist are regular expressions.

response_header_name

String

Determines the name of the response header that will be included with blocked requests.

[sd_iso](#ACLTypeObject)

Object

Contains access controls for country subdivisons (e.g., states or provinces). Specify each desired country subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).

[url](#ACLTypeObject)

Object

Contains access controls for URL paths.

Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining value | values.   
Sample values:  
/marketing   
/800001/mycustomerorigin

All URL paths defined within a whitelist, accesslist, or blacklist are regular expressions.

[user_agent](#ACLTypeObject)

Object

Contains access controls for user agents.

All user agents defined within a whitelist, accesslist, or blacklist are regular expressions.



##### ACL Type Object

The asn, cookie, country, ip, referer, url, and user_agent objects contain the following properties:

NameData TypeDescriptionaccesslist

Array

String / integer values

Contains entries that identify traffic that may access your content upon passing a threat assessment.

ASN access controls are integer values. All other access controls are string values.

blacklist

Array

String / integer values

Contains entries that identify traffic that will be blocked or for which an alert will be generated.

ASN access controls are integer values. All other access controls are string values.

whitelist

Array

String / integer values

Contains entries that identify traffic that may access your content without undergoing threat assessment.

ASN access controls are integer values. All other access controls are string values.



All entries within a cookie, referrer, URL, or user agent whitelist, accesslist, or blacklist are regular expressions.

Response
--------

The response to the above request includes an HTTP status code, response headers, and a response body.

#### Status Code

A [status code](FINDME../../Introduction/Status_Codes_and_Error_Messages.htm) indicates whether the request was successfully performed.

#### Response Headers

The response for this endpoint only includes standard HTTP response headers.

[View common response headers.](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Response)

#### Response Body

The response body for a successful request contains the following parameters:

NameData TypeDescriptionid

String

Indicates the system-defined ID for the resource.

status

String

Returns success.

success

Boolean

Returns true.



##### Errors

The response body for an unsuccessful request contains the following parameters:

NameData TypeDescriptionsuccess

Boolean

Returns false.

[errors](#errors)

Array

Objects

Contains one or more error(s).



###### errors Array

The errors array describes each error that occurred using the following properties:

NameData TypeDescriptioncode

Integer

Indicates the HTTP status code for the error.

message

String

Indicates the description for the error that occurred.



Sample Request and Response (JSON)
----------------------------------

A sample JSON request is shown below.

PUT {{ API_URL }}/waf/v1.0/acl/CGifudum  HTTP/1.1

Authorization: TOK:12345678-1234-1234-1234-1234567890ab

Accept: application/json

Content-Type: application/json

Host: api.edgecast.com

```
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
"customer_id": "0001",
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
}
}
```

A sample JSON response is shown below.

HTTP/1.1 200 OK

Cache-Control: private

Content-Type: application/json; charset=utf-8

Date:  Thu, 15 Apr 2021 12:00:00 GMT

Content-Length: 51

```
{
"id": "dQndQsnv",
"status": "success",
"success": true
}
```