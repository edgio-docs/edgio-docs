---
title: API Security API
---

An API security configuration requires API requests to conform to a JSON schema (draft 4).

[Learn more about JSON schema.](https://json-schema.org/understanding-json-schema/)

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

## Setup {/*setup*/}

Set up API security by performing the following steps:
1.  Create an empty API gateway configuration through the [Add API Gateway Configuration operation](#add-api-gateway-configuration).
2.  Create an API schema through the [Add API Schema operation](#add-api-schema) and assign it to the API gateway created in the previous step.
3.  Update the API gateway configuration created in step 1 through the [Update API Gateway Configuration operation](#add-api-gateway-configuration) to identify the API schema that will be used to screen requests for a specific URL path. 
4.  Update a security apps configuration to enforce this API gateway configuration through the [Manage All Security Apps (Scopes) operation](/guides/develop/rest_api/security/security_apps#manage-all-security-apps-scopes).

**Key information:** <a id="key-information" />

-   Setting up API security involves two configurations:
    -   **API Gateway Configuration:** This configuration defines the conditions under which an API schema will be enforced. 
    -   **API Schema:** This configuration defines a JSON schema to which API requests must conform.
	
	    <Callout type="tip">
		
		  The JSON Schema site provides [guidance and examples on how to define a JSON schema](https://json-schema.org/understanding-json-schema/index.html). Restrictions on supported syntax are documented below. 
		
		</Callout>

-   An API schema is a JSON schema with a few additional properties (e.g., `api_gw_id`). {{ PRODUCT }} restricts syntax support as follows:
    -   A number  with a zero fractional part (e.g., *1.0*, or *42.0*) is not considered an integer.
    -   {{ PRODUCT }} ignores the `$schema` keyword.
    -   Specify `exclusiveMaximum` and `exclusiveMinimum` as integers. 
    -   Remote schemas are unsupported.	
    -   [String formats](https://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats) introduced after draft 4 are unsupported. For example, the following formats are unsupported: `time | date | duration | idn-email`
    -   The following keywords are unsupported:
        `$anchor | $comment | $dynamicAnchor | $dynamicRef | $recursiveRef |const | contentEncoding | contentMediaType| contentSchema | dependentRequired | if-then-else | minContains | maxContains | prefixItems | propertyNames | unevaluated`
-   A common method for setting up an API schema is to define the expected data type through the `type` property. 

    **String Example:** The following sample schema requires an API request to only contain a single string value:
	
	```json
    {
        "api_gw_id": "mnriXoB6",
        "type": "string"
    }
    ```
	**Object Examples:** The following sample schema requires an API request to contain an object. This object must contain a property called `email` set to a properly formatted email address:
	
    ```json
	{
	    "api_gw_id": "mnriXoB6",
	    "type": "object",
	    "properties": {
        	"email": {
	            "type": "string",
            	"format": "email"
        	}
    	},
        "required": ["email"]
	}
    ```

    The following sample schema requires an API request to contain an object. This object must contain a property called `price` set to a number greater than 0. If this object contains `latitude`, `longitude`, or `id`, then the validation defined for those properties will be enforced. For example, `latitude` may only be set to -90, 90, or any number in between that range.

    ```json
    {
        "api_gw_id": "fg3r67doc1",
        "type": "object",
        "properties": {
            "latitude": {
                "type": "number",
                "minimum": -90,
                "maximum": 90
            },
            "longitude": {
                "type": "number",
                "minimum": -180,
                "maximum": 180
            },
            "id": {
                "type": "integer",
                "minimum": 0,
                "maximum": 999,
                "exclusiveMaximum": false
            },
            "price": {
                "type": "number",
                "minimum": 0,
                "exclusiveMinimum": true
            }
        },
        "required": ["price"]
    }
    ```
- Use a JSON schema linter to fine - tune your API schema before applying it to your traffic.

    For example, the [JSON Schema Link site](https://jsonschemalint.com/#!/version/draft-04/markup/json) checks whether your JSON schema is valid and validates it against a sample API request.

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

{{ API_REQUEST_HEADERS }}

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
|is_negated|Boolean|Determines whether this condition is satisfied when the request's path matches the pattern defined in the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required. Indicates how {{ PRODUCT }} will interpret the comparison between the request's path and the `value` property. Valid values are:<ul><li>**RX:** Indicates that the request's path must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the request's path must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the request's path.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the request's path.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the request's path.</li></ul>|
|value|String|Indicates a value that will be compared against the request's path. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property.<br />**Sample value:** `/marketing` |

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

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

A sample response is shown below.

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
-   `<API GATEWAY CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired API gateway configuration. Use the [Get All API Gateway Configurations operation](#get-all-api-gateway-configurations) to retrieve a list of API gateway configurations and their system-defined IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_gw/CGifudum  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
```

## Get All API Gateway Configurations {/*get-all-api-gateway-configurations*/}

Retrieves a list of API gateway configurations. 

<h3>Request</h3>

A request to retrieve all API gateway configurations is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_gw`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for each API gateway configuration:

|Name|Data Type|Description|
|--- |--- |--- |
| id | String | Indicates the API gateway configuration's system-defined ID. |
| name | String | Indicates the name of the API gateway configuration. |
|last_modified_date |String |Indicates the date and time at which this configuration was last modified.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_gw  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 155

[{
        "id": "e3mpHQY5",
        "name": "api.example.com"
    }, {
        "id": "d2m4H6Yj",
        "name": "api-internal.example.com"
    }
]
```

## Get API Gateway Configuration {/*get-api-gateway-configuration*/}

Retrieves an API gateway configuration.

<h3>Request</h3>

A request to retrieve an API gateway configuration is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_gw/<API GATEWAY CONFIGURATION ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<API GATEWAY CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired API gateway configuration. Use the [Get All API Gateway Configurations operation](#get-all-api-gateway-configurations) to retrieve a list of API gateway configurations and their system-defined IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for the specified API gateway configuration:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id |String |Identifies your account number. |
| id |String |Identifies this API gateway configuration by its system-defined ID. |
|last_modified_by |String |Reserved for future use.|
|last_modified_date |String |Indicates the date and time at which this configuration was last modified.|
| name | String | Indicates the name of this API gateway configuration. |
| rules | Array of objects | Contains one or more rule(s) that identify a set of requests and a JSON schema through which {{ PRODUCT }} will screen that traffic. |
| team_config | Boolean | Returns `true`. |

##### rules Array

The `rules` array contains an object for each rule. This object contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
| id | String | Indicates the rule's system-defined ID.|
| name | String | Indicates the name of this rule. |
| methods  | Array of string values | Identifies the set of API requests that will be screened by one or more HTTP method(s). Valid values are: `GET \| DELETE \| PATCH \| POST \| PUT` |
| path | Object | Identifies the set of API requests that will be screened by URL path.  |
| response | Integer | Reserved for future use. | 
| schema_id | String | Identifies an API schema by its system-defined ID. Use the [Get All API Schemas operation](#get-all-api-schemas) to retrieve a list of API schemas and their system-defined ID.  |

##### path Object

The `path` object identifies requests by URL path through the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request's path matches the pattern defined in the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required. Indicates how {{ PRODUCT }} will interpret the comparison between the request's path and the `value` property. Valid values are:<ul><li>**RX:** Indicates that the request's path must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the request's path must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the request's path.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the request's path.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the request's path.</li></ul>|
|value|String|Indicates a value that will be compared against the request's path. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property.<br />**Sample value:** `/marketing` |

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_gw/1exlud2e  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 1400

{
    "id": "1exlud2e",
    "name": "My API Gateway",
    "customer_id": "0001",
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

## Update API Gateway Configuration {/*update-api-gateway-configuration*/}

Updates an API gateway configuration.

<h3>Request</h3>

A request to update an API gateway configuration is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_gw/<API GATEWAY CONFIGURATION ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<API GATEWAY CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired API gateway configuration. Use the [Get All API Gateway Configurations operation](#get-all-api-gateway-configurations) to retrieve a list of API gateway configurations and their system-defined IDs.

{{ API_REQUEST_HEADERS }}

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
| id | String | Identifies a rule by its system-defined ID. |
| name | String | Defines a name for this rule. |
| methods  | Array of string values | Identifies the set of API requests that will be screened by one or more HTTP method(s). Valid values are: `GET \| DELETE \| PATCH \| POST \| PUT` |
| path | Object | Identifies the set of API requests that will be screened by URL path.  |
| response | Integer | Reserved for future use. | 
| schema_id | String | Identifies an API schema by its system-defined ID. Use the [Get All API Schemas operation](#get-all-api-schemas) to retrieve a list of API schemas and their system-defined ID.  |

##### path Object

The `path` object identifies requests by URL path through the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request's path matches the pattern defined in the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required. Indicates how {{ PRODUCT }} will interpret the comparison between the request's path and the `value` property. Valid values are:<ul><li>**RX:** Indicates that the request's path must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the request's path must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the request's path.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the request's path.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the request's path.</li></ul>|
|value|String|Indicates a value that will be compared against the request's path. Specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property.<br />**Sample value:** `/marketing` |

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_gw/fnm3f892msd9A1  HTTP/1.1
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

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
```

## Add API Schema {/*add-api-schema*/}

Creates an API schema. An API schema is a JSON schema (draft 4) with a few additional properties (e.g., `api_gw_id`).

[View key configuration information.](#key-information)

<h3>Request</h3>

A request to add an API schema is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_schema`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Pass the following request body properties:
|Name|Data Type|Description|
|--- |--- |--- |
|id |String |Reserved for future use. |
|api_gw_id |String |Required. Identifies an API gateway configuration by its system-defined ID. |
|customer_id |String |Identifies your account number. |
|last_modified_date |String |Reserved for future use. |
|type |String |Identifies the data type for the root element. This data type determines the set of allowed properties at the root. <br />For example, if you set this property to `object`, then this schema will expect an object at the root of the API request. Additionally, this configuration allows you to add a sibling property for any keyword supported by JSON schema (draft 4) for the object data type (e.g., `properties`, `patternProperties`, and `additionalProperties`). In turn, the `properties` property may contain a `type` property that determines the set of available properties that may be included within the `properties` object. |
|required |Array of string values |Identifies each required property by name.|

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_schema  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "api_gw_id": "mnriXoB6",
    "type": "object",
    "properties": {
        "latitude": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
        },
        "longitude": {
            "type": "number",
            "minimum": -180,
            "maximum": 180
        },
        "id": {
            "type": "integer",
            "minimum": 0,
            "maximum": 999,
            "exclusiveMaximum": false
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        }
    },
    "required": ["price"]
}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
```

## Delete API Schema {/*delete-api-schema*/}

Deletes an API schema.

<h3>Request</h3>

A request to delete an API schema is described below.

`DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_schema/<API SCHEMA ID>`

Define the following variable when submitting the above request:

{{ TEAM_ID }}
-   `<API SCHEMA ID>`**:** Required. Replace this variable with the system-defined ID for the desired API schema. Use the [Get All API Schemas operation](#get-all-api-schemas) to retrieve a list of API schemas and their system-defined IDs

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_schema/C3ifgeum  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
```

## Get All API Schemas {/*get-all-api-schemas*/}

Retrieves a list of API schemas. 

<h3>Request</h3>

A request to retrieve all API schemas is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_schema`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for each API gateway configuration:

|Name|Data Type|Description|
|--- |--- |--- |
| id | String | Indicates the API schema's system-defined ID. |
| name | String | Indicates the name of the API schema. |
|last_modified_date |String |Indicates the date and time at which this configuration was last modified.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_schema  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 74

[{
        "id": "mnriXoB6",
        "name": "Sample API schema"
    }
]
```

## Get API Schema {/*get-api-schema*/}

Retrieves an API schema. An API schema is a JSON schema (draft 4) with a few additional properties (e.g., `api_gw_id`).

<h3>Request</h3>

A request to retrieve an API schema is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_schema/<API SCHEMA ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<API SCHEMA ID>`**:** Required. Replace this variable with the system-defined ID for the desired API schema. Use the [Get All API Schemas operation](#get-all-api-schemas) to retrieve a list of API schemas and their system-defined IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for the specified API schema:

|Name|Data Type|Description|
|--- |--- |--- |
|id |String |Indicates the API schema's system-defined ID.|
|api_gw_id |String |Identifies an API gateway configuration by its system-defined ID. |
|customer_id |String |Identifies your account number. |
|last_modified_date |String |Indicates the date and time at which this configuration was last modified.|
|type |String |Identifies the data type for the root element. This data type determines the set of allowed properties at the root. <br />For example, if this property is set to `object`, then this schema will expect an object at the root of the API request. Additionally, this configuration supports a sibling property for any keyword supported by JSON schema (draft 4) for the object data type (e.g., `properties`, `patternProperties`, and `additionalProperties`). In turn, the `properties` property may contain a `type` property that determines the set of available properties that may be included within the `properties` object. |
|required |Array of string values |Identifies each required property by name.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_schema/kmWY3L8o  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT

{
    "id": "kmWY3L8o",
    "api_gw_id": "mnriXoB6",
    "customer_id": "0001",
    "last_modified_date": "2023-07-18T19:48:25.142172Z",
    "type": "object",
    "properties": {
        "latitude": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
        },
        "longitude": {
            "type": "number",
            "minimum": -180,
            "maximum": 180
        },
        "id": {
            "type": "integer",
            "minimum": 0,
            "maximum": 999,
            "exclusiveMaximum": false
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        }
    },
    "required": ["price"]
}
```

## Update API Schema {/*update-api-schema*/}

Updates an API schema. An API schema is a JSON schema (draft 4) with a few additional properties (e.g., `api_gw_id`).

[View key configuration information.](#key-information)

<h3>Request</h3>

A request to update an API schema is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/api_schema/<API SCHEMA ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<API SCHEMA ID>`**:** Required. Replace this variable with the system-defined ID for the desired API schema. Use the [Get All API Schemas operation](#get-all-api-schemas) to retrieve a list of API schemas and their system-defined IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Pass the following request body properties:
|Name|Data Type|Description|
|--- |--- |--- |
|id |String |Identifies this API schema by its system-defined ID. |
|api_gw_id |String |Required. Identifies an API gateway configuration by its system-defined ID. |
|customer_id |String |Identifies your account number. |
|last_modified_date |String |Reserved for future use. |
|type |String |Identifies the data type for the root element. This data type determines the set of allowed properties at the root. <br />For example, if you set this property to `object`, then this schema will expect an object at the root of the API request. Additionally, this configuration allows you to add a sibling property for any keyword supported by JSON schema (draft 4) for the object data type (e.g., `properties`, `patternProperties`, and `additionalProperties`). In turn, the `properties` property may contain a `type` property that determines the set of available properties that may be included within the `properties` object. |
|required |Array of string values |Identifies each required property by name.|

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

A successful request returns a `200 OK` without a response body.

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/api_schema/kmWY3L8o  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
{
    "id": "kmWY3L8o",
    "api_gw_id": "mnriXoB6",
    "customer_id": "0001",
    "last_modified_date": "2023-07-18T19:48:25.142172Z",
    "type": "object",
    "properties": {
        "latitude": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
        },
        "longitude": {
            "type": "number",
            "minimum": -180,
            "maximum": 180
        },
        "id": {
            "type": "integer",
            "minimum": 0,
            "maximum": 999,
            "exclusiveMaximum": false
        },
        "price": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
        }
    },
    "required": ["price"]
}
```