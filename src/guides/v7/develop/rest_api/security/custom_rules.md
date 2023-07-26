---
title: Custom Rules API
---

A custom rule tailors how {{ PRODUCT }} {{ PRODUCT_SECURITY }} identifies a threat. 

[Learn more about custom rules.](/guides/security/custom_rules)

Automate the following tasks:
-   [Add Custom Rule](#add-custom-rule)
-   [Delete Custom Rule](#delete-custom-rule)
-   [Get All Custom Rules](#get-all-custom-rules)
-   [Get Custom Rule](#get-custom-rule)
-   [Update Custom Rule](#update-custom-rule)

**Key information:** <a id="key-information" />

-   A custom rule set may contain up to 10 custom rules. Each `directive` object defines a custom rule via the `sec_rule` object.
-   A custom rule may contain up to 6 sets of criteria to identify a threat. The root of the `sec_rule` object defines the first set of criteria. Define additional criteria via `chained_rule` objects.
-   Define criteria by specifying an `operator` object and one or more `variable` object(s). A set of criteria is satisfied when at least one `variable` object results in a successful match.
    
    You may also transform the `source` string via the `action` object to simplify matching. For example, you may transform the `source` string to all lowercase characters.
-   The `type` property determines the type of variable (e.g., `REQUEST_HEADERS`) through which threats will be identified. Define a `value` property within the `match` object to further restrict the comparison (e.g., `User-Agent`).
    
    **Example:** A request will satisfy the following configuration when the value corresponding to any of its request headers contains the word `Windows`:
    
    ```json
    ...
    "operator": {
        "is_negated": false,
        "is_regex": false,
        "type": "CONTAINS",
        "value": "Windows"
    },
    "variable": [{
            "is_count": false,
            "match": [{
                    "is_negated": false,
                    "is_regex": false,
                }
            ],
            "type": "REQUEST_HEADERS"
        }
    ...
    ```
    
    The following code excerpt adds a `value` property to the `match` object that restricts the current variable (i.e., `REQUEST_HEADERS`) to `User-Agent`. This means that a request will only satisfy this configuration when the `User-Agent` request header contains the word `Windows`.
    
    ```json
    ...
    "operator": {
        "is_negated": false,
        "is_regex": false,
        "type": "CONTAINS",
        "value": "Windows"
    },
    "variable": [{
            "is_count": false,
            "match": [{
                    "is_negated": false,
                    "is_regex": false,
                    "value": "User-Agent"
                }
            ],
            "type": "REQUEST_HEADERS"
        }
    ...
    ```

-   An alternative to a string comparison is to count the number of times that a variable is found within a request. This requires the following configuration:
    
    -   Set the `is_count` property to `true`.
    -   From within the `operator` object, set the `type` property to `EQ` and then set the `value` property to the number of times that the variable must be found before being considered a threat.
    
    **Example:** A request will satisfy the following configuration when it contains 2 `User-Agent` request headers:
    
    ```json
    ...
    "operator": {
        "is_negated": false,
        "is_regex": false,
        "type": "EQ",
        "value": "2"
    },
    "variable": [{
            "is_count": false,
            "match": [{
                    "is_negated": false,
                    "is_regex": false,
                    "value": "User-Agent"
                }
            ],
            "type": "REQUEST_HEADERS"
        }
    ...
    ```

-   A request will be flagged as a threat when all of the following conditions are met:
    
    -   The request satisfies at least one `variable` object in the root of the `sec_rule` object.
    -   The request satisfies at least one `variable` object in each `chained_rule` object.

## Authorization {/*authorization*/}

Authorize requests through the `app.waf` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Add Custom Rule {/*add-custom-rule*/}

Creates a custom rule set that defines custom threat assessment criteria.

[View key configuration information.](#key-information)

<h3>Request</h3>

A request to create a custom rule set is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/rules`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|directive|Array of objects|Required. Contains custom rules. Each `directive` object defines a custom rule via the `sec_rule` object. You may create up to 10 custom rules.|
|name|String|Indicates the name of the custom rule.|

#### sec_rule Object

The `sec_rule` object describes a custom rule using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Required. Determines whether the string identified in a `variable` object will be transformed and the metadata that will be assigned to a threat.|
|chained_rule|Array of objects|Contains additional criteria that must be satisfied to identify a threat. You may add up to 5 `chained_rule` objects per custom rule.|
|name|String|Indicates the name assigned to this custom rule.|
|operator|Object|Required. Indicates the comparison that will be performed against the request element(s) identified within a `variable` object.|
|variable|Array of objects|Required. Contains criteria that identifies a request element.|

##### variable Array

The `variable` array identifies each request element for which a comparison will be made using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Required. Determines the request element that will be assessed. Valid values are:<ul><li>**ARGS_POST:** Identifies key-value pairs within a `POST` request. </li><li>**GEO:** Identifies the country from which the request originated by its 2 character country code. </li><li>QUERY_STRING</li><li>**REMOTE_ADDR:** Identifies the client's IP address. </li><li>REMOTE_ASN</li><li>**REQUEST_BODY:** Identifies a URL-encoded request body.</li><li>REQUEST_FILENAME</li><li>REQUEST_COOKIES </li><li>REQUEST_HEADERS</li><li>REQUEST_METHOD</li><li>REQUEST_URI</li></ul> If a request element consists of one or more key-value pairs, then you may identify a key via a match object. If is_count has been disabled, then you may identify a specific value via the `operator` object.|
|match|Array of objects |Contains comparison settings for the request element identified by the `type` property.|
|is_count|Boolean|Determines whether a comparison will be performed between the `operator` object and a string value or the number of matches found. Valid values are:<ul><li>**true:** A counter will increment whenever the request element defined by this variable object is found. The `operator` object will perform a comparison against this number. If you enable `is_count`, then you must also set the `type` property to `EQ`.</li><li>**false:** The `operator` object will perform a comparison against the string value derived from the request element defined by this `variable` object.</li></ul>|

###### match Array

The `match` array determines the comparison conditions for the request element identified by the `type` property.

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request element identified by the `variable` object is found or not found.<ul><li>**True:** Not found. Enabling this property requires an initial object that sets both the `is_negated` and `is_regex` properties to `False`. See sample code below. Omitting this initial object results in an invalid configuration.</li><li>**False:** Found</li></ul>|
|is_regex|Boolean|Determines whether the `value` property will be interpreted as a regular expression. Valid values are: <ul><li>**True:** Regular expression</li><li>**False:** Default value. Literal value.</li></ul>|
|value|String|Restricts the match condition defined by the `type` property to the specified value. <br />**Example:** If the `type` property is set to `REQUEST_HEADERS` and this property is set to `User-Agent`, then this match condition is restricted to the `User-Agent` request header. If the `value` property is omitted, then this match condition applies to all request headers.|

**Sample initial object required by is_negated: true:**
```json
...
[{
        "is_negated": false,
        "is_regex": false
    }, {
        "is_negated": true,
...
```

##### action Object

The `action` object determines whether the value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Determines the custom ID that will be assigned to this custom rule. This custom ID is exposed through the **Threats** view of the Security dashboard. Valid values fall within this range: `66000000 - 66999999`. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Random number|
|msg|String|Determines the rule message that will be assigned to this custom rule. This message is exposed through the **Threats** view of the Security dashboard. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Blank|
|t|Array of string values|Determines the set of transformations that will be applied to the value derived from the request element identified in a `variable` object (i.e., source value). Transformations are always applied to the source value, regardless of the number of transformations that have been defined. Valid values are:<ul><li>**NONE:** Indicates that the source value should not be modified.</li><li>**LOWERCASE:** Indicates that the source value should be converted to lowercase characters.</li><li>**URLDECODE:** Indicates that the source value should be URL decoded. This transformation is useful when the source value has been URL encoded twice.</li><li>**REMOVENULLS:** Indicates that null values should be removed from the source value.</li></ul> A criterion is satisfied if the source value or any of the modified string values meet the conditions defined by the `operator` object.|

##### operator Object

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required. Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ:** Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. You should only use `IPMATCH` with the `REMOTE_ADDR` variable.</li></ul>|
|value|String|Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. <br />If you are identifying traffic by URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property.<br />**Sample value:** `/marketing` <br />If you are identifying traffic by IP address (`REMOTE_ADDR / IPMATCH`), then you should use a comma-delimited list to specify multiple IP blocks and IP addresses. <br />**Sample value:** `192.0.2.20,203.0.113.0/24,2001:DB8::/32`|

##### chained_rule Array

Each object within the `chained_rule` array describes an additional set of criteria that must be satisfied in order to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify threats.|
|operator|Object|Indicates the comparison that will be performed on the string value(s) derived from the request element(s) defined within the `variable` array.|
|variable|Array of objects |Identifies each request element for which a comparison will be made.|

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
POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/rules  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "directive": [{
            "sec_rule": {
                "action": {
                    "id": "123456",
                    "msg": "Invalid user agent.",
                    "t": [
                        "NONE"
                    ]
                },
                "operator": {
                    "is_negated": false,
                    "is_regex": false,
                    "type": "CONTAINS",
                    "value": "bot"
                },
                "variable": [{
                        "is_count": false,
                        "match": [{
                                "is_negated": false,
                                "is_regex": false,
                                "value": "User-Agent"
                            }
                        ],
                        "type": "REQUEST_HEADERS"
                    }
                ]
            }
        }
    ],
    "name": "My-Rule"
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
    "id": "N8NxAJOA",
    "status": "success",
    "success": true
}
```

## Delete Custom Rule {/*delete-custom-rule*/}

Deletes a custom rule.

<h3>Request</h3>

A request to delete a custom rule is described below.

`DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/rules/<CUSTOM RULE ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<CUSTOM RULE ID>`**:** Replace this variable with the system-defined ID for your custom rule. Use the [Get All Custom Rules operation](#get-all-custom-rules) to retrieve a list of custom rule sets and their IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h3>Response Body</h3>

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
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/rules/N8NxAJOA  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "N8NxAJOA",
    "status": "success",
    "success": true
}
```

## Get All Custom Rules {/*get-all-custom-rules*/}

Retrieves a list of custom rule sets. A custom rule set allows you to define custom threat assessment criterion.

<h3>Request</h3>

A request to retrieve all custom rule sets is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/rules`

Define the following variable when submitting the above request:

{{ TEAM_ID }}

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h3>Response Body</h3>

The response body for a successful request contains the following response elements for each custom rule set:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for a custom rule. Pass this ID to the [Get Custom Rule Set operation](#get-custom-rule) to retrieve the properties for this custom rule.|
|last_modified_date|String|Indicates the date and time at which the custom rule was last modified. <br />**Syntax:** `MM/DD/YYYYhh:mm:ss [AM|PM]`|
|name|String|Indicates the name of the custom rule.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/rules  HTTP/1.1
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
        "name": "My Custom Rule",
        "last_modified_date": "2020-12-17T20:44:23.695323Z",
        "id": "VSgeVhmb"
    }
]
```

## Get Custom Rule {/*get-custom-rule*/}

Retrieves a custom rule set. Use a custom rule to define custom threat assessment criteria.

[View key configuration information.](#key-information)

<h3>Request</h3>

A request to retrieve a custom rule is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/rules/<CUSTOM RULE ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<CUSTOM RULE ID>`**:** Replace this variable with the system-defined ID for your custom rule. Use the [Get All Custom Rules operation](#get-all-custom-rules) to retrieve a list of custom rule sets and their IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h3>Response Body</h3>

The response body for a successful request contains the following response elements:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id|String|Identifies your account by its customer account number.|
|directive|Array of objects|Contains a custom rule. Each `directive` object defines a custom rule via the `sec_rule` object. You may create up to 10 custom rules per custom rule.|
|id|String|Indicates the system-defined ID for the custom rule.|
|last_modified_date|String|Indicates the date and time at which the custom rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ` |
|name|String|Indicates the name of the custom rule.|

#### sec_rule Object

The `sec_rule` object describes a custom rule using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string identified in a `variable` object will be transformed and the metadata that will be assigned to a threat.|
|chained_rule|Array of objects|Contains additional criteria that must be satisfied to identify a threat. You may add up to 5 `chained_rule` objects per custom rule.|
|id|String|Indicates the system-defined ID for this custom rule.|
|name|String|Indicates the name assigned to this custom rule.|
|operator|Object|Indicates the comparison that will be performed against the request element(s) identified within a `variable` object.|
|variable|Array of objects|Contains criteria that identifies a request element.|

##### variable Array

The `variable` array identifies each request element for which a comparison will be made using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Determines the request element that will be assessed. Valid values are:<ul><li>**ARGS_POST:** Identifies key-value pairs within a `POST` request. </li><li>**GEO:** Identifies the country from which the request originated by its 2 character country code. </li><li>QUERY_STRING</li><li>**REMOTE_ADDR:** Identifies the client's IP address. </li><li>REMOTE_ASN</li><li>**REQUEST_BODY:** Identifies a URL-encoded request body.</li><li>REQUEST_FILENAME</li><li>REQUEST_COOKIES </li><li>REQUEST_HEADERS</li><li>REQUEST_METHOD</li><li>REQUEST_URI</li></ul> If a request element consists of one or more key-value pairs, then you may identify a key via a match object. If is_count has been disabled, then you may identify a specific value via the `operator` object.|
|match|Array of objects |Contains comparison settings for the request element identified by the `type` property.|
|is_count|Boolean|Determines whether a comparison will be performed between the `operator` object and a string value or the number of matches found. Valid values are:<ul><li>**true:** A counter will increment whenever the request element defined by this variable object is found. The `operator` object will perform a comparison against this number. If you enable `is_count`, then you must also set the `type` property to `EQ`.</li><li>**false:** The `operator` object will perform a comparison against the string value derived from the request element defined by this `variable` object.</li></ul>|

###### match Array

The `match` array determines the comparison conditions for the request element identified by the `type` property.

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request element identified by the `variable` object is found or not found.<ul><li>**True:** Not found. If this property has been enabled, then the `match` array should contain an initial object that sets both the `is_negated` and `is_regex` properties to `False`. See sample code below. </li><li>**False:** Found</li></ul>|
|is_regex|Boolean|Determines whether the `value` property will be interpreted as a regular expression. Valid values are: <ul><li>**True:** Regular expression</li><li>**False:** Default value. Literal value.</li></ul>|
|value|String|Restricts the match condition defined by the `type` property to the specified value. <br />**Example:** If the `type` property is set to `REQUEST_HEADERS` and this property is set to `User-Agent`, then this match condition is restricted to the `User-Agent` request header. If the `value` property is omitted, then this match condition applies to all request headers.|

**Sample initial object required by is_negated: true:**
```json
...
[{
        "is_negated": false,
        "is_regex": false
    }, {
        "is_negated": true,
...
```

##### action Object

The `action` object determines whether the value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Determines the custom ID that will be assigned to this custom rule. This custom ID is exposed through the **Threats** view of the Security dashboard. Valid values fall within this range: `66000000 - 66999999`. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Random number|
|msg|String|Determines the rule message that will be assigned to this custom rule. This message is exposed through the **Threats** view of the Security dashboard. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Blank|
|t|Array of string values|Determines the set of transformations that will be applied to the value derived from the request element identified in a `variable` object (i.e., source value). Transformations are always applied to the source value, regardless of the number of transformations that have been defined. Valid values are:<ul><li>**NONE:** Indicates that the source value should not be modified.</li><li>**LOWERCASE:** Indicates that the source value should be converted to lowercase characters.</li><li>**URLDECODE:** Indicates that the source value should be URL decoded. This transformation is useful when the source value has been URL encoded twice.</li><li>**REMOVENULLS:** Indicates that null values should be removed from the source value.</li></ul> A criterion is satisfied if the source value or any of the modified string values meet the conditions defined by the `operator` object.|

##### operator Object

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ:** Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. You should only use `IPMATCH` with the `REMOTE_ADDR` variable.</li></ul>|
|value|String|Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. |

##### chained_rule Array

Each object within the `chained_rule` array describes an additional set of criteria that must be satisfied in order to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify threats.|
|operator|Object|Indicates the comparison that will be performed on the string value(s) derived from the request element(s) defined within the `variable` array.|
|variable|Array of objects |Identifies each request element for which a comparison will be made.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/rules/N8NxAJOA  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 665

{
    "customer_id": "0001",
    "directive": [{
            "sec_rule": {
                "action": {
                    "id": "123456",
                    "msg": "Invalid user agent.",
                    "t": [
                        "NONE"
                    ]
                },
                "id": "cpQSrgEk",
                "operator": {
                    "is_negated": false,
                    "is_regex": false,
                    "type": "CONTAINS",
                    "value": "bot"
                },
                "variable": [{
                        "is_count": false,
                        "match": [{
                                "is_negated": false,
                                "is_regex": false,
                                "value": "User-Agent"
                            }
                        ],
                        "type": "REQUEST_HEADERS"
                    }
                ]
            }
        }
    ],
    "id": "N8NxAJOA",
    "last_modified_date": "2020-09-24T18:52:13.589646Z",
    "name": "My-Rule"
}
```

## Update Custom Rule {/*update-custom-rule*/}

Updates a custom rule that defines custom threat assessment criteria.

[View key configuration information.](#key-information)

<h3>Request</h3>

A request to update a custom rule set is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/rules/<CUSTOM RULE ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<CUSTOM RULE ID>`**:** Replace this variable with the system-defined ID for your custom rule. Use the [Get All Custom Rules operation](#get-all-custom-rules) to retrieve a list of custom rule sets and their IDs.

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id|String|Identifies your account by its customer account number.|
|directive|Array of objects |Required. Contains custom rules. Each `directive` object defines a custom rule via the `sec_rule` object. You may create up to 10 custom rules.|
|id|String|Indicates the system-defined ID for the custom rule.|
|last_modified_date|String|Indicates the date and time at which the custom rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ`|
|name|String|Indicates the name of the custom rule.|

#### sec_rule Object

The `sec_rule` object describes a custom rule using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Required. Determines whether the string identified in a `variable` object will be transformed and the metadata that will be assigned to a threat.|
|chained_rule|Array of objects|Contains additional criteria that must be satisfied to identify a threat. You may add up to 5 `chained_rule` objects per custom rule.|
|id|String|Indicates the system-defined ID for this custom rule.|
|name|String|Indicates the name assigned to this custom rule.|
|operator|Object|Required. Indicates the comparison that will be performed against the request element(s) identified within a `variable` object.|
|variable|Array of objects|Required. Contains criteria that identifies a request element.|

##### variable Array

The `variable` array identifies each request element for which a comparison will be made using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Required. Determines the request element that will be assessed. Valid values are:<ul><li>**ARGS_POST:** Identifies key-value pairs within a `POST` request. </li><li>**GEO:** Identifies the country from which the request originated by its 2 character country code. </li><li>QUERY_STRING</li><li>**REMOTE_ADDR:** Identifies the client's IP address. </li><li>REMOTE_ASN</li><li>**REQUEST_BODY:** Identifies a URL-encoded request body.</li><li>REQUEST_FILENAME</li><li>REQUEST_COOKIES </li><li>REQUEST_HEADERS</li><li>REQUEST_METHOD</li><li>REQUEST_URI</li></ul> If a request element consists of one or more key-value pairs, then you may identify a key via a match object. If is_count has been disabled, then you may identify a specific value via the `operator` object.|
|match|Array of objects |Contains comparison settings for the request element identified by the `type` property.|
|is_count|Boolean|Determines whether a comparison will be performed between the `operator` object and a string value or the number of matches found. Valid values are:<ul><li>**true:** A counter will increment whenever the request element defined by this variable object is found. The `operator` object will perform a comparison against this number. If you enable `is_count`, then you must also set the `type` property to `EQ`.</li><li>**false:** The `operator` object will perform a comparison against the string value derived from the request element defined by this `variable` object.</li></ul>|

###### match Array

The `match` array determines the comparison conditions for the request element identified by the `type` property.

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request element identified by the `variable` object is found or not found.<ul><li>**True:** Not found. Enabling this property requires an initial object that sets both the `is_negated` and `is_regex` properties to `False`. See sample code below. Omitting this initial object results in an invalid configuration.</li><li>**False:** Found</li></ul>|
|is_regex|Boolean|Determines whether the `value` property will be interpreted as a regular expression. Valid values are: <ul><li>**True:** Regular expression</li><li>**False:** Default value. Literal value.</li></ul>|
|value|String|Restricts the match condition defined by the `type` property to the specified value. <br />**Example:** If the `type` property is set to `REQUEST_HEADERS` and this property is set to `User-Agent`, then this match condition is restricted to the `User-Agent` request header. If the `value` property is omitted, then this match condition applies to all request headers.|

**Sample initial object required by is_negated: true:**
```json
...
[{
        "is_negated": false,
        "is_regex": false
    }, {
        "is_negated": true,
...
```

##### action Object

The `action` object determines whether the value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Determines the custom ID that will be assigned to this custom rule. This custom ID is exposed through the **Threats** view of the Security dashboard. Valid values fall within this range: `66000000 - 66999999`. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Random number|
|msg|String|Determines the rule message that will be assigned to this custom rule. This message is exposed through the **Threats** view of the Security dashboard. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Blank|
|t|Array of string values|Determines the set of transformations that will be applied to the value derived from the request element identified in a `variable` object (i.e., source value). Transformations are always applied to the source value, regardless of the number of transformations that have been defined. Valid values are:<ul><li>**NONE:** Indicates that the source value should not be modified.</li><li>**LOWERCASE:** Indicates that the source value should be converted to lowercase characters.</li><li>**URLDECODE:** Indicates that the source value should be URL decoded. This transformation is useful when the source value has been URL encoded twice.</li><li>**REMOVENULLS:** Indicates that null values should be removed from the source value.</li></ul> A criterion is satisfied if the source value or any of the modified string values meet the conditions defined by the `operator` object.|

##### operator Object

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Required. Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property.</li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ:** Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. You should only use `IPMATCH` with the `REMOTE_ADDR` variable.</li></ul>|
|value|String|Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. <br />If you are identifying traffic by URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property.<br />**Sample value:** `/marketing` <br />If you are identifying traffic by IP address (`REMOTE_ADDR / IPMATCH`), then you should use a comma-delimited list to specify multiple IP blocks and IP addresses. <br />**Sample value:** `192.0.2.20,203.0.113.0/24,2001:DB8::/32`|

##### chained_rule Array

Each object within the `chained_rule` array describes an additional set of criteria that must be satisfied in order to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify threats.|
|operator|Object|Indicates the comparison that will be performed on the string value(s) derived from the request element(s) defined within the `variable` array.|
|variable|Array of objects |Identifies each request element for which a comparison will be made.|

{{ API_RESPONSE.md }}

<h3>Response Body</h3>

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
PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/rules/N8NxAJOA  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "directive": [{
            "sec_rule": {
                "action": {
                    "id": "123456",
                    "msg": "Invalid user agent.",
                    "t": [
                        "NONE"
                    ]
                },
                "operator": {
                    "is_negated": false,
                    "is_regex": false,
                    "type": "CONTAINS",
                    "value": "bot"
                },
                "variable": [{
                        "is_count": false,
                        "match": [{
                                "is_negated": false,
                                "is_regex": false,
                                "value": "User-Agent"
                            }
                        ],
                        "type": "REQUEST_HEADERS"
                    }
                ]
            }
        }
    ],
    "name": "My-Rule"
}
```

A sample response is shown below.

HTTP/1.1 200 OK

Cache-Control: private

Content-Type: application/json; charset=utf-8

Date:  Thu, 15 Apr 2021 12:00:00 GMT

Content-Length: 65

```{
    "id": "N8NxAJOA",
    "status": "success",
    "success": true
}
```
