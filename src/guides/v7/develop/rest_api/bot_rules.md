---
title: Bot Manager API
---

A bot manager configuration mitigates undesired bot traffic and prevents them from performing undesired or malicious activity.

[Learn more about bot manager.](/guides/security/bot_rules)

Automate the following tasks:
-   [Add Bot Manager Configuration](#add-bot-manager-configuration)
-   [Delete Bot Manager Configuration](#delete-bot-manager-configuration)
-   [Get All Bot Manager Configurations](#get-all-bot-manager-configurations)
-   [Get Bot Manager Configuration](#get-bot-manager-configuration)
-   [Update Bot Manager Configuration](#update-bot-manager-configuration)

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

**Key information:** <a id="key-information" />

-   A bot manager configuration contains one or more bot rules. Each bot rule defines the set of requests that will require a client (e.g., a web browser) to solve a challenge before resolving the request.
-   There are two types of bot rules:
    
    -   **Reputation Database:** A bot rule that relies on our reputation database is defined through the `directive.include` property.
        
        **Example:**
        
        ```
		...
        {
            "directive": [{
                    "include": "r3010_ec_bot_challenge_reputation.conf.json"
        ...
        ```
    -   **Custom Match Conditions:** A bot rule that contains match conditions is defined through a `directive.sec_rule` object.
-   A bot rule that contains custom match conditions may contain up to 6 sets of criteria to identify a request. The root of the `sec_rule` object defines the first set of criteria. Define additional criteria through `chained_rule` objects.
-   Define criteria by specifying an `operator` object and one or more `variable` object(s). A set of criteria is satisfied when at least one `variable` object results in a successful match.
    
    You may also transform the source string through the `action` object to simplify matching. For example, you may transform the source string to all lowercase characters.
-   The `variable.type` property determines the type of variable (e.g., `REQUEST_HEADERS`) through which traffic will be identified. Define a `value` property within the `match` object to further restrict the comparison (e.g., `User-Agent`).
    
    **Example:** A request will satisfy the following configuration when the value corresponding to any of its request headers contains the word `Windows`:
    
    ```
    ...
    "operator": {
        "type": "CONTAINS",
        "value": "Windows"
    },
    "variable": [{
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
    
    ```
    ...
    "operator": {
        "type": "CONTAINS",
        "value": "Windows"
    },
    "variable": [{
            "match": [{
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
    
    ```
    ...
    "operator": {
        "is_negated": false,
        "type": "EQ",
        "value": "2"
    },
    "variable": [{
            "is_count": true,
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

-   A request satisfies a bot rule when all of the following conditions are met:

    -   The request satisfies at least one `variable` object in the root of the `sec_rule` object.
    -   The request satisfies at least one `variable` object in each `chained_rule` object.

## Authorization

Authorize requests through the `app.bot_security` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Add Bot Manager Configuration {/*add-bot-manager-configuration*/}

Creates a bot manager configuration. 

[View key configuration information.](#key-information)

### Request

A request to add a bot manager configuration is described below.

`POST {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/bots

Define the following variable when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|directive|Array of objects|Required. Contains the bot rules associated with this bot manager configuration. You may create up to 10 bot rules per bot manager configuration.|
|name|String|Indicates the name assigned to this bot manager configuration.|

#### directive Array

The `directive` array describes each bot rule through the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|include|String|Indicates that the bot rule that will use our reputation database. This type of rule is satisfied when the client's IP address matches an IP address defined within our reputation database. Our reputation database contains a list of IP addresses known to be used by bots. Set this property to the following value to include a bot rule that uses our reputation database: `r3010_ec_bot_challenge_reputation.conf.json`|
|sec_rule|Object|Indicates that the bot rule that will use custom match conditions. This type of rule is satisfied when a match is found for each of its conditions. A condition determines request identification by defining what will be matched (i.e., `variable`), how it will be matched (i.e., `operator`), and a match value.|

<Callout type="important">

  You must define at least one bot rule through either the `include` or `sec_rule` property.
  
</Callout>

#### sec_rule Object

The `sec_rule` object describes a bot rule using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Required. Determines whether the string identified in a `variable` object will be transformed and metadata through which you may identify traffic to which this bot rule was applied.|
|chained_rule|Array of objects|Contains additional criteria that must be satisfied to identify traffic to which this bot rule will be applied. You may add up to 5 `chained_rule` objects per bot rule.|
|id|String|Indicates the system-defined ID for this bot rule.|
|name|String|Indicates the name assigned to this bot rule.|
|operator|Object|Required. Indicates the comparison that will be performed against the request element(s) identified within a `variable` object.|
|variable|Array of objects|Required. Contains criteria that identifies a request element.|

##### variable Array

The `variable` array identifies each request element for which a comparison will be made using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Required. Determines the request element that will be assessed. Valid values are:<ul><li>**GEO:** Identifies the country from which the request originated by its 2 character country code. </li><li>QUERY_STRING </li><li>**REMOTE_ADDR:** Identifies the client's IP address. </li><li>**REMOTE_ASN </li><li>**REQUEST_COOKIES </li><li>REQUEST_FILENAME</li><li>REQUEST_HEADERS </li><li>REQUEST_METHOD </li><li>REQUEST_URI</li></ul> <br />If a request element consists of one or more key-value pairs (e.g., `REQUEST_HEADERS`), then you may identify a key through a `match` object. If `is_count` has been disabled, then you may identify a specific value through the `operator` object.|
|match|Array of objects|Contains comparison settings for the request element identified by the `type` property.|
|is_count|Boolean|Determines whether a comparison will be performed between the `operator` object and a string value or the number of matches found. Valid values are:<ul><li>**true:** A counter will increment whenever the request element defined by this `variable object` is found. Our service will compare this value against the `operator.value` property. If you enable the `is_count` property, then you must also set the `operator.type` property to `EQ`.</li><li>**false:** Our service will compare the string value derived from the request element defined by this `variable` object against the `operator.value` property.|

###### match Array

The `match` array determines the comparison conditions for the request element identified by the `type` property.

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request element identified by the `variable` object is found or not found. <ul><li>**True:** Not found. If this property has been enabled, then the `match` array should contain an initial object that sets both the `is_negated` and `is_regex` properties to `False`. See sample code below. </li><li>**False:** Found</li></ul>|
|is_regex|Boolean|Determines whether the `value` property will be interpreted as a regular expression. Valid values are:<ul><li>**True:** Regular expression</li><li>**False:** Default value. Literal value.</li></ul>|
|value|String|Restricts the match condition defined by the `type` property to the specified value. <br />**Example:** If the `type` property is set to `REQUEST_HEADERS` and this property is set to `User-Agent`, then this match condition is restricted to the `User-Agent` request header. If the `value` property is omitted, then this match condition applies to all request headers.|

**Sample excerpt for `is_negated: true`:**

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

The `action` object determines whether the value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify traffic to which this bot rule was applied.

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Determines the custom ID that will be assigned to this bot rule. This custom ID is exposed through the Bot Events view of the Security dashboard. Valid values fall within this range: `77000000 - 77999999`. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Random number|
|msg|String|Determines the rule message that will be assigned to this bot rule. This message is exposed through the Bot Events view of the Security dashboard. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Blank|
|t|Array of string values|Determines the set of transformations that will be applied to the value derived from the request element identified in a `variable` object (i.e., source value). Transformations are always applied to the source value, regardless of the number of transformations that have been defined. Valid values are:
<ul><li>**NONE:** Indicates that the source value should not be modified.</li><li>**LOWERCASE:** Indicates that the source value should be converted to lowercase characters.</li><li>**URLDECODE:** Indicates that the source value should be URL decoded. This transformation is useful when the source value has been URL encoded twice.</li><li>**REMOVENULLS:** Indicates that null values should be removed from the source value.</li></ul> A criterion is satisfied if the source value or any of the modified string values meet the conditions defined by the `operator` object.|

operator Object

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</ul>|
|type|String|Required. Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:
<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property. </li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ: Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. Only use `IPMATCH` with the `REMOTE_ADDR` variable.|
|value|String|Required. Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. If you are identifying traffic by URL path (`REQUEST_URI`), then you should specify a URL path pattern that starts directly after the hostname. Exclude a protocol or a hostname when defining this property. <br />**Example:** `/marketing` <br />If you are identifying traffic by IP address (`REMOTE_ADDR` / `IPMATCH`), then you should use a comma-delimited list to specify multiple IP blocks and IP addresses. <br />**Example:** `192.0.2.20,203.0.113.0/24,2001:DB8::/32`|

##### chained_rule Array

Each object within the `chained_rule` array describes an additional set of criteria that must be satisfied in order to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string value derived from the request element identified in a `variable` object will be transformed and metadata through which you may identify traffic to which this bot rule was applied.|
|operator|Object|Indicates the comparison that will be performed on the string value(s) derived from the request element(s) defined within the `variable` array.|
|variable|Array of objects|Identifies each request element for which a comparison will be made.|

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

A sample JSON request is shown below.

```json
POST  {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/bots  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "directive": [{
            "include": "r3010_ec_bot_challenge_reputation.conf.json"
        }, {
            "sec_rule": {
                "action": {
                    "id": "77000001",
                    "t": [
                        "NONE"
                    ]
                },
                "chained_rule": [],
                "name": "Popular Bots",
                "operator": {
                    "type": "RX",
                    "value": ".*(Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Spider|Exabot).*"
                },
                "variable": [{
                        "match": [{
                                "value": "User-Agent"
                            }
                        ],
                        "type": "REQUEST_HEADERS"
                    }
                ]
            }
        }
    ],
    "name": "My Bot Manager Configuration"
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "pfJKToQF",
    "status": "success",
    "success": true
}
```

## Delete Bot Manager Configuration {/*delete-bot-manager-configuration*/}

Deletes a bot manager configuration.

<h3>Request</h3>

A request to delete a bot manager configuration is described below.

`DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/bots/<BOT MANAGER CONFIGURATION ID>`

Define the following variables when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<BOT MANAGER CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired bot manager configuration. Use the [Get All Bot Manager Configurations operation](#get-all-bot-manager-configurations) to retrieve a list of bot manager configurations and their system-defined IDs.

h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

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

A sample JSON request is shown below.

```json
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/bots/pfJKToQF  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "pfJKToQF",
    "status": "success",
    "success": true
}
```

## Get All Bot Manager Configurations {/*get-all-bot-manager-configurations*/}

Retrieves a list of bot manager configurations. A bot manager configuration defines the set of requests that will be protected by bot rules. 

<h3>Request</h3>

A request to retrieve all bot manager configurations is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/bots

Define the following variable when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for each bot manager configuration:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Indicates the system-defined ID for the bot manager configuration. Pass this ID to the [Get Bot Manager Configuration operation](#get-bot-manager-configuration) to retrieve the properties for this bot manager configuration.|
|last_modified_date|String|Indicates the date and time at which the bot manager configuration was last modified. <br />**Syntax:** `MM/DD/YYYYhh:mm:ss [AM\|PM]`|
|name|String|Indicates the name of the bot manager configuration.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/bots  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 114

[{
        "name": "My Bot Manager Configuration",
        "last_modified_date": "2021-12-15T17:27:37.691682Z"
        "id": "1CaCTGJV"
    }
]
```

## Get Bot Manager Configuration {/*get-bot-manager-configuration*/}

Retrieves a bot manager configuration. A bot manager configuration contains one or more bot rules. 

<h3>Request</h3>

A request to retrieve a bot manager configuration is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/bots/<BOT MANAGER CONFIGURATION ID>`

Define the following variables when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<BOT MANAGER CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired bot manager configuration. Use the [Get All Bot Manager Configurations operation](#get-all-bot-manager-configurations) to retrieve a list of bot manager configurations and their system-defined IDs.

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

### Response Body

The response body for a successful request contains the following response elements for each bot manager configuration:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id|String|Identifies your account by its customer account number.|
|directive|Array of objects|Contains the bot rules associated with this bot manager configuration.|
|id|String|Indicates the system-defined ID for this bot manager configuration.|
|last_modified_date|String|Indicates the timestamp at which this bot manager configuration was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ` |
|name|String|Indicates the name assigned to this bot manager configuration.|

#### directive Array

The `directive` array describes each bot rule through the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|include|String|Indicates that the bot rule that will use our reputation database. This type of rule is satisfied when the client's IP address matches an IP address defined within our reputation database. Our reputation database contains a list of IP addresses known to be used by bots. This property is only returned when your bot manager configuration contains a bot rule that uses our reputation database. Returns the following value: `r3010_ec_bot_challenge_reputation.conf.json`|
|sec_rule|Object|Indicates that the bot rule that will use custom match conditions. This type of rule is satisfied when a match is found for each of its conditions. A condition determines request identification by defining what will be matched (i.e., `variable`), how it will be matched (i.e., `operator`), and a match value.|

#### sec_rule Object

The `sec_rule` object describes a bot rule using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string identified in a `variable` object will be transformed and metadata through which you may identify traffic to which this bot rule was applied.|
|chained_rule|Array of objects|Contains additional criteria that must be satisfied to identify traffic to which this bot rule will be applied. You may add up to 5 `chained_rule` objects per bot rule.|
|id|String|Indicates the system-defined ID for this bot rule.|
|name|String|Indicates the name assigned to this bot rule.|
|operator|Object|Indicates the comparison that will be performed against the request element(s) identified within a `variable` object.|
|variable|Array of objects|Contains criteria that identifies a request element.|

##### variable Array

The `variable` array identifies each request element for which a comparison will be made using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Determines the request element that will be assessed. Valid values are:<ul><li>**GEO:** Identifies the country from which the request originated by its 2 character country code. </li><li>QUERY_STRING </li><li>**REMOTE_ADDR:** Identifies the client's IP address. </li><li>**REMOTE_ASN </li><li>**REQUEST_COOKIES </li><li>REQUEST_FILENAME</li><li>REQUEST_HEADERS </li><li>REQUEST_METHOD </li><li>REQUEST_URI</li></ul> <br />If a request element consists of one or more key-value pairs (e.g., `REQUEST_HEADERS`), then you may identify a key through a `match` object. If `is_count` has been disabled, then you may identify a specific value through the `operator` object.|
|match|Array of objects|Contains comparison settings for the request element identified by the `type` property.|
|is_count|Boolean|Determines whether a comparison will be performed between the `operator` object and a string value or the number of matches found. Valid values are:<ul><li>**true:** A counter will increment whenever the request element defined by this `variable object` is found. Our service will compare this value against the `operator.value` property. If you enable the `is_count` property, then you must also set the `operator.type` property to `EQ`.</li><li>**false:** Our service will compare the string value derived from the request element defined by this `variable` object against the `operator.value` property.|


###### match Array

The `match` array determines the comparison conditions for the request element identified by the `type` property.

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request element identified by the `variable` object is found or not found. <ul><li>**True:** Not found. If this property has been enabled, then the `match` array should contain an initial object that sets both the `is_negated` and `is_regex` properties to `False`. See sample code below. </li><li>**False:** Found</li></ul>|
|is_regex|Boolean|Determines whether the `value` property will be interpreted as a regular expression. Valid values are:<ul><li>**True:** Regular expression</li><li>**False:** Default value. Literal value.</li></ul>|
|value|String|Restricts the match condition defined by the `type` property to the specified value. <br />**Example:** If the `type` property is set to `REQUEST_HEADERS` and this property is set to `User-Agent`, then this match condition is restricted to the `User-Agent` request header. If the `value` property is omitted, then this match condition applies to all request headers.|

**Sample excerpt for `is_negated: true`:**

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

The `action` object determines whether the value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify traffic to which this bot rule was applied.

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Determines the custom ID that will be assigned to this bot rule. This custom ID is exposed through the Bot Events view of the Security dashboard. Valid values fall within this range: `77000000 - 77999999`. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Random number|
|msg|String|Determines the rule message that will be assigned to this bot rule. This message is exposed through the Bot Events view of the Security dashboard. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Blank|
|t|Array of string values|Determines the set of transformations that will be applied to the value derived from the request element identified in a `variable` object (i.e., source value). Transformations are always applied to the source value, regardless of the number of transformations that have been defined. Valid values are:
<ul><li>**NONE:** Indicates that the source value should not be modified.</li><li>**LOWERCASE:** Indicates that the source value should be converted to lowercase characters.</li><li>**URLDECODE:** Indicates that the source value should be URL decoded. This transformation is useful when the source value has been URL encoded twice.</li><li>**REMOVENULLS:** Indicates that null values should be removed from the source value.</li></ul> A criterion is satisfied if the source value or any of the modified string values meet the conditions defined by the `operator` object.|

##### operator Object

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</ul>|
|type|String|Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:
<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property. </li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ: Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. Only use `IPMATCH` with the `REMOTE_ADDR` variable.|
|value|String|Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. |

##### chained_rule Array

Each object within the chained_rule array describes an additional set of criteria that must be satisfied in order to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string value derived from the request element identified in a `variable` object will be transformed and metadata through which you may identify traffic to which this bot rule was applied.|
|operator|Object|Indicates the comparison that will be performed on the string value(s) derived from the request element(s) defined within the `variable` array.|
|variable|Array of objects|Identifies each request element for which a comparison will be made.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/bots/pfJKToQF  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 750

{
    "customer_id": "0001",
    "directive": [{
            "include": "r3010_ec_bot_challenge_reputation.conf.json"
        }, {
            "sec_rule": {
                "action": {
                    "id": "77000001",
                    "t": [
                        "NONE"
                    ]
                },
                "chained_rule": [],
                "id": "Ukg1khPJ",
                "name": "Popular Bots",
                "operator": {
                    "type": "RX",
                    "value": ".*(Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Spider|Exabot).*"
                },
                "variable": [{
                        "match": [{
                                "value": "User-Agent"
                            }
                        ],
                        "type": "REQUEST_HEADERS"
                    }
                ]
            }
        }
    ],
    "id": "pfJKToQF",
    "last_modified_by": "joe@example.com via MCC portal",
    "last_modified_date": "2022-05-04T17:18:33.017946Z",
    "name": "My Bot Manager Configuration"
}
```

## Update Bot Manager Configuration {/*update-bot-manager-configuration*/}

Updates a bot manager configuration. A bot manager configuration contains one or more bot rules. 

<h3>Request</h3>

A request to update a bot manager configuration is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TENANT ID>/bots/<BOT MANAGER CONFIGURATION ID>`

Define the following variables when submitting the above request:

-   `<TENANT ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<BOT MANAGER CONFIGURATION ID>`**:** Required. Replace this variable with the system-defined ID for the desired bot manager configuration. Use the [Get All Bot Manager Configurations operation](#get-all-bot-manager-configurations) to retrieve a list of bot manager configurations and their system-defined IDs.

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|customer_id|String|Identifies your account by its customer account number.|
|directive|Array of objects|Required. Contains the bot rules associated with this bot manager configuration. You may create up to 10 bot rules per bot manager configuration.|
|id|String|Indicates the system-defined ID for this bot manager configuration.|
|last_modified_date|String|Indicates the timestamp at which this bot manager configuration was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ`|
|name|String|Indicates the name assigned to this bot manager configuration.|

#### directive Array

The `directive` array describes each bot rule through the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|include|String|Indicates that the bot rule that will use our reputation database. This type of rule is satisfied when the client's IP address matches an IP address defined within our reputation database. Our reputation database contains a list of IP addresses known to be used by bots. Set this property to the following value to include a bot rule that uses our reputation database: `r3010_ec_bot_challenge_reputation.conf.json`|
|sec_rule|Object|Indicates that the bot rule that will use custom match conditions. This type of rule is satisfied when a match is found for each of its conditions. A condition determines request identification by defining what will be matched (i.e., `variable`), how it will be matched (i.e., `operator`), and a match value.|

<Callout type="important">

  You must define at least one bot rule through either the `include` or `sec_rule` property.
  
</Callout>

#### sec_rule Object

The `sec_rule` object describes a bot rule using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Required. Determines whether the string identified in a `variable` object will be transformed and metadata through which you may identify traffic to which this bot rule was applied.|
|chained_rule|Array of objects|Contains additional criteria that must be satisfied to identify traffic to which this bot rule will be applied. You may add up to 5 `chained_rule` objects per bot rule.|
|id|String|Indicates the system-defined ID for this bot rule.|
|name|String|Indicates the name assigned to this bot rule.|
|operator|Object|Required. Indicates the comparison that will be performed against the request element(s) identified within a `variable` object.|
|variable|Array of objects|Required. Contains criteria that identifies a request element.|

##### variable Array

The `variable` array identifies each request element for which a comparison will be made using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|type|String|Required. Determines the request element that will be assessed. Valid values are:<ul><li>**GEO:** Identifies the country from which the request originated by its 2 character country code. </li><li>QUERY_STRING </li><li>**REMOTE_ADDR:** Identifies the client's IP address. </li><li>**REMOTE_ASN </li><li>**REQUEST_COOKIES </li><li>REQUEST_FILENAME</li><li>REQUEST_HEADERS </li><li>REQUEST_METHOD </li><li>REQUEST_URI</li></ul> <br />If a request element consists of one or more key-value pairs (e.g., `REQUEST_HEADERS`), then you may identify a key through a `match` object. If `is_count` has been disabled, then you may identify a specific value through the `operator` object.|
|match|Array of objects|Contains comparison settings for the request element identified by the `type` property.|
|is_count|Boolean|Determines whether a comparison will be performed between the `operator` object and a string value or the number of matches found. Valid values are:<ul><li>**true:** A counter will increment whenever the request element defined by this `variable object` is found. Our service will compare this value against the `operator.value` property. If you enable the `is_count` property, then you must also set the `operator.type` property to `EQ`.</li><li>**false:** Our service will compare the string value derived from the request element defined by this `variable` object against the `operator.value` property.|

###### match Array

The `match` array determines the comparison conditions for the request element identified by the `type` property.

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether this condition is satisfied when the request element identified by the `variable` object is found or not found. <ul><li>**True:** Not found. If this property has been enabled, then the `match` array should contain an initial object that sets both the `is_negated` and `is_regex` properties to `False`. See sample code below. </li><li>**False:** Found</li></ul>|
|is_regex|Boolean|Determines whether the `value` property will be interpreted as a regular expression. Valid values are:<ul><li>**True:** Regular expression</li><li>**False:** Default value. Literal value.</li></ul>|
|value|String|Restricts the match condition defined by the `type` property to the specified value. <br />**Example:** If the `type` property is set to `REQUEST_HEADERS` and this property is set to `User-Agent`, then this match condition is restricted to the `User-Agent` request header. If the `value` property is omitted, then this match condition applies to all request headers.|

**Sample excerpt for `is_negated: true`:**

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

The `action` object determines whether the value derived from the request element identified in a `variable` object will be transformed and the metadata that will be used to identify traffic to which this bot rule was applied.

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Determines the custom ID that will be assigned to this bot rule. This custom ID is exposed through the Bot Events view of the Security dashboard. Valid values fall within this range: `77000000 - 77999999`. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Random number|
|msg|String|Determines the rule message that will be assigned to this bot rule. This message is exposed through the Bot Events view of the Security dashboard. This field is only applicable for the `action` object that resides in the root of the `sec_rule` object. <br />**Default Value:** Blank|
|t|Array of string values|Determines the set of transformations that will be applied to the value derived from the request element identified in a `variable` object (i.e., source value). Transformations are always applied to the source value, regardless of the number of transformations that have been defined. Valid values are:
<ul><li>**NONE:** Indicates that the source value should not be modified.</li><li>**LOWERCASE:** Indicates that the source value should be converted to lowercase characters.</li><li>**URLDECODE:** Indicates that the source value should be URL decoded. This transformation is useful when the source value has been URL encoded twice.</li><li>**REMOVENULLS:** Indicates that null values should be removed from the source value.</li></ul> A criterion is satisfied if the source value or any of the modified string values meet the conditions defined by the `operator` object.|

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</ul>|
|type|String|Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:
<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property. </li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ: Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. Only use `IPMATCH` with the `REMOTE_ADDR` variable.|
|value|String|Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. |

##### operator Object

The `operator` object describes the comparison that will be performed on the request element(s) defined within a `variable` object using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether a condition will be satisfied when the value derived from the request element defined within a `variable` object matches or does not match the `value` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</ul>|
|type|String|Indicates how the system will interpret the comparison between the `value` property and the value derived from the request element defined within a `variable` object. Valid values are:
<ul><li>**RX:** Indicates that the string value derived from the request element must satisfy the regular expression defined in the `value` property. </li><li>**STREQ:** Indicates that the string value derived from the request element must be an exact match to the `value` property.</li><li>**CONTAINS:** Indicates that the `value` property must contain the string value derived from the request element.</li><li>**BEGINSWITH:** Indicates that the `value` property must start with the string value derived from the request element.</li><li>**ENDSWITH:** Indicates that the `value` property must end with the string value derived from the request element.</li><li>**EQ: Indicates that the number derived from the `variable` object must be an exact match to the `value` property. You should only use `EQ` when the `is_count` property has been enabled.</li><li>**IPMATCH:** Requires that the request's IP address either be contained by an IP block or be an exact match to an IP address defined in the `value` property. Only use `IPMATCH` with the `REMOTE_ADDR` variable.|
|value|String|Indicates a value that will be compared against the string or number value derived from the request element defined within a `variable` object. |

##### chained_rule Array

Each object within the `chained_rule` array describes an additional set of criteria that must be satisfied in order to identify a threat.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Determines whether the string value derived from the request element identified in a `variable` object will be transformed and metadata through which you may identify traffic to which this bot rule was applied.|
|operator|Object|Indicates the comparison that will be performed on the string value(s) derived from the request element(s) defined within the `variable` array.|
|variable|Array of objects|Identifies each request element for which a comparison will be made.|

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

A sample JSON request is shown below.

`PUT  {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/bots/pfJKToQF  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "directive": [{
            "include": "r3010_ec_bot_challenge_reputation.conf.json"
        }, {
            "sec_rule": {
                "action": {
                    "id": "77000001",
                    "t": [
                        "NONE"
                    ]
                },
                "chained_rule": [],
                "name": "Popular Bots",
                "operator": {
                    "type": "RX",
                    "value": ".*(Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Spider|Exabot|facebot).*"
                },
                "variable": [{
                        "match": [{
                                "value": "User-Agent"
                            }
                        ],
                        "type": "REQUEST_HEADERS"
                    }
                ]
            }
        }
    ],
    "name": "My Bot Manager Configuration"
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "pfJKToQF",
    "status": "success",
    "success": true
}
```