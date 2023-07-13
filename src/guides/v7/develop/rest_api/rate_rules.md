---
title: Rate Rules
---

A rate rule restricts the flow of site traffic.

[Learn more about rate rules.](/guides/security/rate_rules)

Automate the following tasks:
-   [Add Rate Rule](#add-rate-rule)
-   [Delete Rate Rule](#delete-rate-rule)
-   [Get All Rate Rules](#get-all-rate-rules)
-   [Get Rate Rule](#get-rate-rule)
-   [Update Rate Rule](#update-rate-rule)

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

## Add Rate Rule {/*add-rate-rule*/}

Creates a rate rule that determines the maximum number of requests that will be allowed within a given time period.

### Request

A request to add a rate rule is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit`

Define the following variable when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 

### Request Headers

This operation only takes advantage of [common request headers](../../Introduction/Common_Request_and_Response_Elements.htm#Request).

### Request Body

Pass the following request body parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|condition_groups|Array of objects|Contains the set of condition groups associated with a rule.|
|customer_id|String|Identifies your account by its customer account number.|
|disabled|Boolean|Indicates whether this rate rule will be enforced. Valid values are: <ul><li>**true:** Disabled. This rate limit will not be applied to traffic.</li><li>**false:** Enabled. Traffic is restricted to this rate limit.</li></ul>|
|duration_sec|Integer|Required. Indicates the length, in seconds, of the rolling window that tracks the number of requests eligible for rate limiting. The `num` property determines the number of requests allowed for the time period defined within this property. <br /> Valid values are: `1 \| 5 \| 10 \| 30 \| 60 \| 120 \| 300`|
|keys|Array of string values|Indicates the method by which requests will be grouped for the purposes of this rate rule. Valid values are: <ul><li>**Missing or Empty Array:** If the keys property is not defined or set to an empty array, all requests will be treated as a single group for the purpose of rate limiting.</li><li>**IP:** Indicates that requests will be grouped by IP address. Each unique IP address is considered a separate group.</li><li>**USER_AGENT:** Indicates that requests will be grouped by a client's user agent. Each unique combination of IP address and user agent is considered a separate group.</li></ul>|
|name|String|Indicates the name of the rate rule.|
|num|Integer|Required. Indicates the rate limit value. This value identifies the number of requests for the time period defined in the `duration_sec` property that will trigger rate limiting.|

#### condition_groups Array

The `condition_groups` array describes each condition group using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|conditions|Array of objects|Contains a list of match conditions. This array describes each condition within a condition group using the following properties: <ul><li>**target Object:** The `target` object describes the type of match condition.</li><li>**op Object:** The op object contains the match condition's properties.</li></ul>|
|id|String|Indicates the system-defined alphanumeric ID of a condition group. <br />**Example:** `12345678-90ab-cdef-ghij-klmnopqrstuvwxyz1`|
|name|String|Indicates the name of a condition group.|

##### target Object

The `target` object describes the type of match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Required for the `target` object. Determines how requests will be identified. Valid values are: `FILE_EXT \| GEO \| REMOTE_ADDR \| REMOTE_ASN \| REQUEST_HEADERS \| REQUEST_METHOD \| REQUEST_URI` |
|value|String|Required for `type: REQUEST_HEADERS`. Indicates the name of the request header through which requests will be identified. Valid values are: `Host \| Referer \| User-Agent`|

##### op Object

The `op` object describes each match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_case_insensitive|Boolean|Indicates whether the comparison between the request and the `values` property is case-sensitive. Valid values are: <ul><li>**True:** Case-insensitive </li><li>**False:** Case-sensitive</li></ul> |
|is_negated|Boolean|Indicates whether this match condition will be satisfied when the request matches or does not match the value defined by the `values` property. Valid values are: <ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required for the `op` object. Indicates how the system will interpret the comparison between the request and the `values` property. Valid values are:<ul><li>**EM:** Requires that the request's attribute be set to one of the value(s) defined in the `values` property. </li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `values` property. Only use `IPMATCH` with the `REMOTE_ADDR` match condition.</li><li>**RX:** Requires that the request's attribute be an exact match to the regular expression defined in the `value` property.</li></ul>|
|value|String|Required for `type: RX`. Identifies a regular expression used to identify requests that are eligible for rate limiting. If you are identifying traffic through a URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Sample value:** `/marketing`|
|values|Array of string values|Required for `type: EM and IPMATCH`. Identifies one or more values used to identify requests that are eligible for rate limiting. If you are identifying traffic via a URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Sample value:** `/marketing` <br />If you are matching requests by IP address, make sure to use standard IPv4 and CIDR notation.|

<Callout type="info">

  `is_case_insensitive`, `is_negated`, and `type` properties: The attribute (e.g., hostname, URL path, IP address, etc.) of the request that will be compared is determined by the `variable` array.

</Callout>


{{ API_RESPONSE.md }}

### Response Body

The response body for a successful request contains the following parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the rate rule.|
|success|Boolean|Indicates whether this request was successful. Valid values are: `true \| false`|
|status|String|Indicates whether this request was successful.|
|errors|Array of objects|Contains one or more error(s).|

{{ API_ERRORS.md }}

### Sample Request and Response (JSON)

A sample JSON request is shown below.

```json
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "duration_sec": 5,
    "condition_groups": [{
            "conditions": [{
                    "target": {
                        "type": "REQUEST_METHOD"
                    },
                    "op": {
                        "type": "EM",
                        "values": ["POST"]
                    }
                }
            ]
        }
    ],
    "num": 10
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 164

{
    "id": "fgSagLvT",
    "status": "success",
    "success": true
}
```

## Delete Rate Rule {/*delete-rate-rule*/}

Deletes a rate rule that determines the maximum number of requests that will be allowed within a given time period.

### Request

A request to delete a rate rule is described below.

`DELETE {{ API_URL })/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit/<RATE RULE ID>`

Define the following variables when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<RATE RULE ID>`**:** Required. Replace this variable with the system-defined ID of the desired rate rule. Use the [Get All Rate Rules operation]() to retrieve a list of rate rules and their IDs.

### Request Headers

This operation only takes advantage of [common request headers](../../Introduction/Common_Request_and_Response_Elements.htm#Request).

### Request Body

Request body parameters are not required by this operation.

{{ API_RESPONSE.md }}

### Response Body

The response body for a successful request contains the following parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the resource.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

{{ API_ERRORS.md }}

### Sample Request and Response (JSON)

A sample JSON request is shown below.

```json
DELETE {{ API_URL}}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit/vTma2xvK  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 51

{
    "id": "vTma2xvK",
    "status": "success",
    "success": true
}
```

## Get All Rate Rules {/*get-all-rate-rules*/}

Retrieves a list of rate rules. A rate rule determines the maximum number of requests that will be allowed within a given time period.

### Request

A request to retrieve all rate rules is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit`

Define the following variable when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 

### Request Headers

This operation only takes advantage of [common request headers](../../Introduction/Common_Request_and_Response_Elements.htm#Request).

### Request Body

Request body parameters are not required by this operation.

{{ API_RESPONSE.md }}

### Response Body

The response body for a successful request contains the following response elements for each rate rule:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the rate rule. Pass this ID to the [Get Rate Rule operation]() to retrieve the properties for this rate rule.|
|last_modified_date|String|Indicates the date and time at which the rate rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ`|
|name|String|Indicates the name of the rate rule.|

{{ API_ERRORS.md }}

### Sample Request and Response (JSON)

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 57

[{
        "name": "my-rate-limit",
        "id": "vTma2xvK"
    }
]
```

## Get Rate Rule {/*get-rate-rule*/}

Retrieves a list of rate rules. A rate rule determines the maximum number of requests that will be allowed within a given time period.

### Request

A request to retrieve all rate rules is described below.

`GET {{API_URL}}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit/<RATE RULE ID>`

Define the following variables when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<RATE RULE ID>`**:** Required. Replace this variable with the system-defined ID of the desired rate rule. Use the [Get All Rate Rules operation](#get-all-rate-rules) to retrieve a list of rate rules and their IDs.

### Request Headers

This operation only takes advantage of [common request headers](../../Introduction/Common_Request_and_Response_Elements.htm#Request).

### Request Body

Request body parameters are not required by this operation.

{{ API_RESPONSE.md }}

### Response Body

The response body for a successful request contains the following response elements:

|Name|Data Type|Description|
|--- |--- |--- |
|condition_groups|Array of objects|Contains the set of condition groups associated with a rule.|
|customer_id|String|Identifies your account by its customer account number.|
|disabled|Boolean|Indicates whether this rate rule will be enforced. Valid values are: <ul><li>**true:** Disabled. This rate limit will not be applied to traffic.</li><li>**false:** Enabled. Traffic is restricted to this rate limit.</li></ul>|
|duration_sec|Integer|Required. Indicates the length, in seconds, of the rolling window that tracks the number of requests eligible for rate limiting. The `num` property determines the number of requests allowed for the time period defined within this property. <br /> Valid values are: `1 \| 5 \| 10 \| 30 \| 60 \| 120 \| 300`|
|id|String|Indicates the system-defined ID for the rate rule.|
|keys|Array of string values|Indicates the method by which requests will be grouped for the purposes of this rate rule. Valid values are: <ul><li>**Missing or Empty Array:** If the keys property is not defined or set to an empty array, all requests will be treated as a single group for the purpose of rate limiting.</li><li>**IP:** Indicates that requests will be grouped by IP address. Each unique IP address is considered a separate group.</li><li>**USER_AGENT:** Indicates that requests will be grouped by a client's user agent. Each unique combination of IP address and user agent is considered a separate group.</li></ul>|
|last_modified_by|String|Reserved for future use.|
|last_modified_date|String|Indicates the timestamp at which this rate rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ` |
|name|String|Indicates the name of the rate rule.|
|num|Integer|Required. Indicates the rate limit value. This value identifies the number of requests for the time period defined in the `duration_sec` property that will trigger rate limiting.|
|version|Integer|Reserved for future use.|

#### condition_groups Array

The `condition_groups` array describes each condition group using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|conditions|Array of objects|Contains a list of match conditions. This array describes each condition within a condition group using the following properties: <ul><li>**target Object:** The `target` object describes the type of match condition.</li><li>**op Object:** The op object contains the match condition's properties.</li></ul>|
|id|String|Indicates the system-defined alphanumeric ID of a condition group. <br />**Example:** `12345678-90ab-cdef-ghij-klmnopqrstuvwxyz1`|
|name|String|Indicates the name of a condition group.|

##### target Object

The target object describes the type of match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Determines how requests will be identified. Valid values are: `FILE_EXT \| GEO \| REMOTE_ADDR \| REMOTE_ASN \| REQUEST_HEADERS \| REQUEST_METHOD \| REQUEST_URI` |
|value|String|`type: REQUEST_HEADERS`. Indicates the name of the request header through which requests will be identified. Valid values are: `Host \| Referer \| User-Agent`|

##### op Object

The `op` object describes each match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_case_insensitive|Boolean|Indicates whether the comparison between the request and the `values` property is case-sensitive. Valid values are: <ul><li>**True:** Case-insensitive </li><li>**False:** Case-sensitive</li></ul> |
|is_negated|Boolean|Indicates whether this match condition will be satisfied when the request matches or does not match the value defined by the `values` property. Valid values are: <ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required for the `op` object. Indicates how the system will interpret the comparison between the request and the `values` property. Valid values are:<ul><li>**EM:** Requires that the request's attribute be set to one of the value(s) defined in the `values` property. </li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `values` property. Only use `IPMATCH` with the `REMOTE_ADDR` match condition.</li><li>**RX:** Requires that the request's attribute be an exact match to the regular expression defined in the `value` property.</li></ul>|
|value|String|Required for `type: RX`. Identifies a regular expression used to identify requests that are eligible for rate limiting. If you are identifying traffic through a URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Sample value:** `/marketing`|
|values|Array of string values|Required for `type: EM and IPMATCH`. Identifies one or more values used to identify requests that are eligible for rate limiting. If you are identifying traffic via a URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Sample value:** `/marketing` <br />If you are matching requests by IP address, make sure to use standard IPv4 and CIDR notation.|

<Callout type="info">

  `is_case_insensitive`, `is_negated`, and `type` properties: The attribute (e.g., hostname, URL path, IP address, etc.) of the request that will be compared is determined by the `variable` array.

</Callout>

{{ API_ERRORS.md }}

### Sample Request and Response (JSON)

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit/vTma2xvK  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 164

{
    "customer_id": "0001",
    "duration_sec": 5,
    "id": "vTma2xvK",
    "last_modified_date": "2020-05-30T00:50:12.868998Z",
    "name": "My Rate Limit",
    "num": 10
}
```

## Update Rate Rule {/*update-rate-rule*/}

Updates a rate rule that determines the maximum number of requests that will be allowed within a given time period.

### Request

A request to update a rate limit is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit/<RATE RULE ID>`

Define the following variable when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<RATE RULE ID>`**:** Required. Replace this variable with the system-defined ID of the desired rate rule. Use the [Get All Rate Rules operation](#get-all-rate-rules) to retrieve a list of rate rules and their IDs.

### Request Headers

This operation only takes advantage of [common request headers](../../Introduction/Common_Request_and_Response_Elements.htm#Request).

### Request Body

Pass the following request body parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|condition_groups|Array of objects|Contains the set of condition groups associated with a rule.|
|customer_id|String|Identifies your account by its customer account number.|
|disabled|Boolean|Indicates whether this rate rule will be enforced. Valid values are: <ul><li>**true:** Disabled. This rate limit will not be applied to traffic.</li><li>**false:** Enabled. Traffic is restricted to this rate limit.</li></ul>|
|duration_sec|Integer|Required. Indicates the length, in seconds, of the rolling window that tracks the number of requests eligible for rate limiting. The `num` property determines the number of requests allowed for the time period defined within this property. <br /> Valid values are: `1 \| 5 \| 10 \| 30 \| 60 \| 120 \| 300`|
|id|String|Indicates the system-defined ID for the rate rule.|
|keys|Array of string values|Indicates the method by which requests will be grouped for the purposes of this rate rule. Valid values are: <ul><li>**Missing or Empty Array:** If the keys property is not defined or set to an empty array, all requests will be treated as a single group for the purpose of rate limiting.</li><li>**IP:** Indicates that requests will be grouped by IP address. Each unique IP address is considered a separate group.</li><li>**USER_AGENT:** Indicates that requests will be grouped by a client's user agent. Each unique combination of IP address and user agent is considered a separate group.</li></ul>|
|last_modified_date|String|Indicates the timestamp at which this rate rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ` |
|name|String|Indicates the name of the rate rule.|
|num|Integer|Required. Indicates the rate limit value. This value identifies the number of requests for the time period defined in the `duration_sec` property that will trigger rate limiting.|

#### condition_groups Array

The `condition_groups` array describes each condition group using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|conditions|Array of objects|Contains a list of match conditions. This array describes each condition within a condition group using the following properties: <ul><li>**target Object:** The `target` object describes the type of match condition.</li><li>**op Object:** The op object contains the match condition's properties.</li></ul>|
|id|String|Indicates the system-defined alphanumeric ID of a condition group. <br />**Example:** `12345678-90ab-cdef-ghij-klmnopqrstuvwxyz1`|
|name|String|Indicates the name of a condition group.|

##### target Object

The `target` object describes the type of match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Required for the `target` object. Determines how requests will be identified. Valid values are: `FILE_EXT \| GEO \| REMOTE_ADDR \| REMOTE_ASN \| REQUEST_HEADERS \| REQUEST_METHOD \| REQUEST_URI` |
|value|String|Required for `type: REQUEST_HEADERS`. Indicates the name of the request header through which requests will be identified. Valid values are: `Host \| Referer \| User-Agent`|

##### op Object

The `op` object describes each match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_case_insensitive|Boolean|Indicates whether the comparison between the request and the `values` property is case-sensitive. Valid values are: <ul><li>**True:** Case-insensitive </li><li>**False:** Case-sensitive</li></ul> |
|is_negated|Boolean|Indicates whether this match condition will be satisfied when the request matches or does not match the value defined by the `values` property. Valid values are: <ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required for the `op` object. Indicates how the system will interpret the comparison between the request and the `values` property. Valid values are:<ul><li>**EM:** Requires that the request's attribute be set to one of the value(s) defined in the `values` property. </li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `values` property. Only use `IPMATCH` with the `REMOTE_ADDR` match condition.</li><li>**RX:** Requires that the request's attribute be an exact match to the regular expression defined in the `value` property.</li></ul>|
|value|String|Required for `type: RX`. Identifies a regular expression used to identify requests that are eligible for rate limiting. If you are identifying traffic through a URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Sample value:** `/marketing`|
|values|Array of string values|Required for `type: EM and IPMATCH`. Identifies one or more values used to identify requests that are eligible for rate limiting. If you are identifying traffic via a URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Sample value:** `/marketing` <br />If you are matching requests by IP address, make sure to use standard IPv4 and CIDR notation.|

<Callout type="info">

  `is_case_insensitive`, `is_negated`, and `type` properties: The attribute (e.g., hostname, URL path, IP address, etc.) of the request that will be compared is determined by the `variable` array.

</Callout>


{{ API_RESPONSE.md }}

### Response Body

The response body for a successful request contains the following parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the resource.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

{{ API_ERRORS.md }}

### Sample Request and Response (JSON)

A sample JSON request is shown below.

```json
PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/limit/fgSagLvT  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "duration_sec": 5,
    "condition_groups": [{
            "conditions": [{
                    "target": {
                        "type": "REQUEST_METHOD"
                    },
                    "op": {
                        "type": "EM",
                        "values": ["POST"]
                    }
                }
            ]
        }
    ],
    "num": 10
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 164

{
    "id": "fgSagLvT",
    "status": "success",
    "success": true
}
```