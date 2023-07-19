---
title: Security Apps API
---

A Security App:

- Identifies the set of traffic to which it applies by hostname, a URL path, or both.
- Defines how threats will be detected via access rules, custom rule set, managed rules, and rate rules.

    <Callout type="info">
      If one or more condition group(s) have been defined within a rate rule, then traffic will only be rate limited when it also satisfies at least one of those condition groups.

    </Callout>

- Defines the production and audit enforcement action that will be applied to the requests identified as threats by the above rules.

[Learn more about Security Apps.](/guides/security/security_applications)

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

## Authorization {/*authorization*/}

Authorize requests through the `app.waf` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Get All Security Apps (Scopes)

Retrieves a list of Security Apps and their properties. 

<h3>Request</h3>

A request to retrieve all Security Apps is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/scopes`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id|String|Identifies your account by its customer account number.|
|id|String|Indicates the system-defined ID for the set of Security Apps defined within the `scopes` array.|
|last_modified_by|String|Reserved for future use.|
|last_modified_date|String|Indicates the timestamp at which the Security App returned by the `scopes` array was last modified. <br /> **Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ` |
|name|String|Reserved for future use.|
|scopes|Array of objects|Contains a list of Security Apps and their properties.|
|version|String|Reserved for future use.|

{{ API_SECURITY_SECURITY_APPS_SCOPES_ARRAY.md }}

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/scopes  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 1889

{
    "customer_id": "0001",
    "id": "SzElzPq7",
    "last_modified_by": "jsmith",
    "last_modified_date": "2020-07-29T20:36:37.648475Z",
    "name": "scopes-web-security",
    "scopes": [{
            "acl_prod_action": {
                "name": "acl-action",
                "response_body_base64": "VGhpcyBpcyBhY2wgY3VzdG9tIHJlc3BvbnNlCg==",
                "response_headers": {
                    "x-ec-rules": "acl-rejected"
                },
                "status": 403,
                "enf_type": "CUSTOM_RESPONSE"
            },
            "acl_prod_id": "CGefudum",
            "host": {
                "is_negated": false,
                "type": "RX",
                "value": ".*.toontot.com"
            },
            "id": "Je0eroPH",
            "limits": [{
                    "action": {
                        "duration_sec": 10,
                        "name": "ddos-action",
                        "response_body_base64": "VGhpcyBpcyBkZG9zIGN1c3RvbSByZXNwb25zZQo=",
                        "response_headers": {
                            "x-ec-rules": "ddos_rejected"
                        },
                        "status": 403,
                        "enf_type": "CUSTOM_RESPONSE"
                    },
                    "id": "vTma2xvK"
                }
            ],
            "name": "name",
            "path": {
                "is_negated": false,
                "type": "GLOB",
                "value": "*"
            },
            "profile_prod_action": {
                "id": "QCtpQ46-",
                "name": "waf-action",
                "response_headers": {
                    "x-ec-rules": "profile-rejected"
                },
                "status": 403,
                "enf_type": "CUSTOM_RESPONSE"
            },
            "profile_prod_id": "jYrI-b9K",
            "rules_prod_action": {
                "name": "rules-action",
                "response_headers": {
                    "x-ec-rules": "customrules-rejected"
                },
                "status": 403,
                "enf_type": "CUSTOM_RESPONSE"
            },
            "rules_prod_id": "nTCd8ghw"
        }
    ],
    "version": "0.0.0"
}
```

## Manage All Security Apps (Scopes)

Creates, updates, and deletes one or more Security Apps. 

**Key information:**

-   This operation allows you to quickly create, update, or delete one or more Security Apps. These actions cannot be undone.
-   Create a Security App by adding a scope object in the request.
-   Update a Security App by modifying an existing scope object in the request. The id property identifies the Security App that will be updated.
-   Delete a Security App by excluding a scope object from the request.

    <Callout type="important">

      All Security Apps that are not explicitly defined within the request will be deleted.

    </Callout>

-   The recommended method for updating your Security Apps is to perform the following steps:
    
    1.  Retrieve your current set of Security Apps via the [Get All Security Apps (Scopes) operation](FINDME).
    2.  Add, modify, or remove Security Apps from the response as needed.
    3.  Post the updated response to this operation.

<h3>Request</h3>

A request to manage Security Apps is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/scopes`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id|String|Identifies your account by its customer account number. This value is case-sensitive.|
|id|String|Indicates the system-defined ID for the set of Security Apps defined within the `scopes` array.|
|last_modified_by|String|Reserved for future use.|
|last_modified_date|String|Indicates the timestamp at which the Security App returned by the `scopes` array was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ`|
|name|String|Reserved for future use.|
|scopes|Array of objects|Contains a list of Security Apps and their properties.|
|version|String|Reserved for future use.|

{{ API_SECURITY_SECURITY_APPS_SCOPES_ARRAY.md }}

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates your customer account number.|
|status|String|Returns `success`.|
|success|Boolean|Returns `true`.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/scopes  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

```json
{
    "name": "scopes-web-security",
    "scopes": [{
            "acl_prod_action": {
                "name": "acl-action",
                "response_body_base64": "VGhpcyBpcyBhY2wgY3VzdG9tIHJlc3BvbnNlCg==",
                "response_headers": {
                    "x-ec-rules": "acl-rejected"
                },
                "status": 403,
                "enf_type": "CUSTOM_RESPONSE"
            },
            "acl_prod_id": "CGefudum",
            "host": {
                "is_negated": false,
                "type": "RX",
                "value": ".*.toontot.com"
            },
            "id": "Je0eroPH",
            "limits": [{
                    "action": {
                        "duration_sec": 10,
                        "name": "ddos-action",
                        "response_body_base64": "VGhpcyBpcyBkZG9zIGN1c3RvbSByZXNwb25zZQo=",
                        "response_headers": {
                            "x-ec-rules": "ddos_rejected"
                        },
                        "status": 403,
                        "enf_type": "CUSTOM_RESPONSE"
                    },
                    "id": "vTma2xvK"
                }
            ],
            "name": "name",
            "path": {
                "is_negated": false,
                "type": "GLOB",
                "value": "*"
            },
            "profile_prod_action": {
                "id": "QCtpQ46-",
                "name": "waf-action",
                "response_headers": {
                    "x-ec-rules": "profile-rejected"
                },
                "status": 403,
                "enf_type": "CUSTOM_RESPONSE"
            },
            "profile_prod_id": "jYrI-b9K",
            "rules_prod_action": {
                "name": "rules-action",
                "response_headers": {
                    "x-ec-rules": "customrules-rejected"
                },
                "status": 403,
                "enf_type": "CUSTOM_RESPONSE"
            },
            "rules_prod_id": "nTCd8ghw"
        }
    ]
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 1889


{
    "id": "0001",
    "status": "success",
    "success": true
}
```
