---
title: API Security API
---

An API security configuration requires API requests to conform to a JSON schema (draft 4).

Automate the following tasks:
-   API gateway configuration:
    -   [Add API Gateway Configuration](#add-api-gateway-configuration)
    -   [Delete API Gateway Configuration](#delete-api-gateway-configuration)
    -   [Get All API Gateway Configurations](#get-all-api-gateway-configurations)
    -   [Get API Gateway Configuration](#get-api-gateway-configuration)
    -   [Update API Gateway Configuration](#update-api-gateway-configuration)
-   API schema:
    -   [Add API Schema](#add-api-schema)
    -   [Delete API Schema](#delete-api-schema)
    -   [Get All API Schemas](#get-all-api-schemas)
    -   [Get API Schema](#get-api-schema)
    -   [Update API Schema](#update-api-schema)

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

## Setup

Set up API security by performing the following steps:
1.  Create an empty API gateway configuration through the [Add API Gateway Configuration operation](#add-api-gateway-configuration).
2.  Create an API schema through the [Add API Schema operation](#add-api-schema) and assign it to the API gateway created in the previous step.
3.  Update the API gateway configuration created in step 1 through the [Update API Gateway Configuration operation](#add-api-gateway-configuration) to identify the API schema that will be used to screen requests for a specific URL path. 

**Key information:** <a id="key-information" />

-   Setting up API security involves two configurations:
    -   **API Gateway Configuration:** This configuration defines the conditions under which an API schema will be enforced. 
    -   **API Schema:** This configuration defines a JSON schema (draft 4) to which API requests must conform.

## Authorization {/*authorization*/}

Authorize requests through the `app.api_security` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Add API Gateway Configuration {/*add-api-gateway-configuration*/}

Creates an API gateway configuration. 

<h3>Request</h3>

A request to add an API gateway configuration is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_gw`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Pass the following request body properties:
|Name|Data Type|Description|
|--- |--- |--- |
| name | String | Determines the name of this API gateway configuration. |
| rules | Array of objects | Contains one or more rule(s) that identify a set of requests and a JSON schema through which {{ PRODUCT }} will screen that traffic. |

##### rules Array

The `rules` array contains an object for each rule. This object contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
| id | String | Reserved for future use. |
| name | String | Defines a name for this rule. |
| methods  | Array of string values | Identifies the set of API requests that will be screened by one or more HTTP method(s). Valid values are: `GET \| DELETE \| PATCH \| POST \| PUT` |
| path | Object | Identifies the set of API requests that will be screened by URL path.  |
| response | Integer | Reserved for future use. | 
| schema_id | String | Identifies an API schema by its system-defined ID. Use the [Get All API Schemas operation](#get-all-api-schemas) to retrieve a list of API schemas and their system-defined ID.  |

##### path Object

The `path` object identifies requests by URL path through the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request's path matches the pattern defined in the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li>|
|type|String|Required. Indicates how {{ PRODUCT }} will interpret the comparison between the request's path and the `value` property. Valid values are:<ul><li>**RX:** Indicates that the request's path must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the request's path must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the request's path.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the request's path.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the request's path.</li></ul>|
|value|String|Indicates a value that will be compared against the request's path. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property.<br />**Sample value:** `/marketing` |

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_gw  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "name": "My API Gateway",
    "rules": [{
            "name": "Widgets API",
            "methods": [
                "POST", "GET", "PATCH", "DELETE"
            ],
            "path": {
                "is_negated": false,
                "type": "RX",
                "value": "/widgets/.*"
            },
            "schema_id": "MMOEG9qK"
        }
    ]
}
```

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
```

## Delete API Gateway Configuration {/*delete-api-gateway-configuration*/}

Deletes an API gateway configuration.

<h3>Request</h3>

A request to delete an API gateway configuration is described below.

`DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_gw/<API GATEWAY CONFIGURATION ID>`

Define the following variable when submitting the above request:

{{ TEAM_ID }}
-   `<API GATEWAY CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired API gateway configuration. Use the [Get All API Gateway Configurations operation](#get-all-api-gateway-configurations) to retrieve a list of API gateway configurations and their system-defined IDs

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME../../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_gw/CGifudum  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
```

## Get All API Gateway Configurations {/*get-all-api-gateway-configurations*/}


## Get API Gateway Configuration {/*get-api-gateway-configuration*/}


## Update API Gateway Configuration {/*update-api-gateway-configuration*/}


## Add API Schema {/*add-api-schema*/}


## Delete API Schema {/*delete-api-schema*/}


## Get All API Schemas {/*get-all-api-schemas*/}


## Get API Schema {/*get-api-schema*/}


## Update API Schema {/*update-api-schema*/}

