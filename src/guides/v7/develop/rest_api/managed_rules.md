---
title: Managed Rules API
---

A managed rule identifies threats through predefined rules and prevents false positives.

[Learn more about managed rules.](/guides/security/managed_rules)

Automate the following tasks:
-   [Add Managed Rule](#add-managed-rule)
-   [Delete Managed Rule](#delete-managed-rule)
-   [Get All Managed Rules](#get-all-managed-rules)
-   [Get Managed Rule](#get-managed-rule)
-   [Update Managed Rule](#update-managed-rule)

Retrieve all available managed rule sets (e.g., ERS), policies (e.g., TW IP Reputation), and rules (e.g., 2200000):
-   [Get Available Policies](#get-available-policies)
-   [Get Available Managed Rule Sets](#get-available-managed-rule-sets)
-   [Get Available Rules](#get-available-rules)

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

## Authorization

Authorize requests through the `app.waf` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Add Managed Rule {/*add-managed-rule*/}

Creates a managed rule that identifies a rule set configuration and describes a valid request.

<h3>Request</h3>

A request to create a managed rule is described below.

`POST {{ API_DOMAIN }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile`

Define the following variable when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|disabled_rules|Array of objects |Contains all disabled rules. <br /> **Default Value:** `Null`|
|general_settings|Object|Required. Contains settings that define the profile for a valid request.|
|name|String|Indicates the name of the managed rule.|
|policies|Array of string values|Contains a list of policies that have been enabled on this managed rule. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of policies and their IDs.|
|rule_target_updates|Array of objects|Defines one or more targets that will be ignored and/or replaced.<br /> **Key information:** <ul><li>If `is_negated` is set to `true`, then this target identifies rule criterion that will be ignored when identifying threats.</li><li>The `replace_target` property defines criterion that will be used to identify threats instead of the existing criterion.</li><li>If `is_regex` property is set to `true`, then you may use regular expressions to define criteria for identifying multiple types of threats.</li><li>A maximum of 25 target configurations may be created.</li></ul>|
|ruleset_id|String|Required. Indicates the ID for the rule set associated with this managed rule. Use the [Get Available Managed Rule Sets operation](#get-available-managed-rule-sets) to retrieve a list of rule sets and their IDs.|
|ruleset_version|String|Required. Indicates the version of the rule set associated with this managed rule.|

#### disabled_rules Array

The `disabled_rules` array identifies each rule that has been disabled using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|policy_id|String|Identifies a policy from which a rule will be disabled by its system-defined ID. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of policies and their system-defined IDs. <br />**Default Value:** `Null`|
|rule_id|String|Identifies a rule that will be disabled by its system-defined ID. Use the [Get Available Rules operation](#get-available-rules) to retrieve a list of rules and their system-defined IDs. <br />**Default Value:** `Null`|

#### general_settings Object

The `general_settings` object describes a valid request using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|anomaly_threshold|Integer|Required. Indicates the anomaly score threshold.|
|arg_length|Integer|Required. Indicates the maximum number of characters for any single query string property value.|
|arg_name_length|Integer|Required. Indicates the maximum number of characters for any single query string property name.|
|combined_file_sizes|Integer|Indicates the total file size for multipart message lengths.|
|ignore_cookie|Array of string values|Identifies each cookie that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|ignore_header|Array of string values|Identifies each request header that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|ignore_query_args|Array of string values|Identifies each query string argument that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|json_parser|Boolean|Determines whether JSON payloads will be inspected. Valid values are: `true \| false`|
|max_num_args|Integer|Required. Indicates the maximum number of query string properties.|
|paranoia_level|Integer|Indicates the balance between the level of protection and false positives. Valid values are: `1 \| 2 \| 3 \| 4`|
|process_request_body|Boolean|Indicates whether WAF will inspect a POST request body. Valid values are: `true \| false`|
|response_header_name|String|Determines the name of the response header that will be included with blocked requests.|
|total_arg_length|Integer|Required. Indicates the maximum number of characters for the query string value.|
|validate_utf8_encoding|Boolean|Indicates whether WAF may check whether a request variable (e.g., `ARGS`, `ARGS_NAMES`, and `REQUEST_FILENAME`) is a valid UTF-8 string. This validation includes checking for missing bytes, invalid characters, and ASCII to UTF-8 character mapping. Valid values are: `true \| false` <br />You should only enable this validation if your web server or application uses UTF-8. Otherwise, this validation will result in many false positives.|
|xml_parser|Boolean|Determines whether XML payloads will be inspected. Valid values are: `true \| false`|

#### rule_target_updates Array

The `rule_target_updates` array describes each target using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether the current target, as defined within this object, will be ignored when identifying threats. Valid values are: <ul><li>**True:** Ignore this target.</li><li>**False:** Default value. Allow this target to identify threats.</li></ul>|
|is_regex|Boolean|Required. Determines whether the `target_match` property may leverage regular expressions. Valid values are: <ul><li>**True:** Interprets the `target_match` property as a regular expression.</li><li>**False:** Default value. Interprets the target_match property as a literal value.</li></ul>|
|replace_target|String|Defines the data source (e.g., `REQUEST_COOKIES`, `ARGS`, `GEO`, etc.) that will be used instead of the one defined in the `target` property. <br />**Key information:** <ul><li>This property should be a blank value unless you are configuring a rule to identify threats based on a different data source.</li><li>This property replaces an existing threat identification criterion. For example, this capability may be used to identify threats based on a cookie value instead of a query string argument.</li></ul>|
|rule_id|String|Required. Identifies a rule by its system-defined ID. The configuration defined within this object will alter the behavior of the rule identified by this property.|
|target|String|Required. Identifies the type of data source (e.g., `REQUEST_COOKIES`, `ARGS`, `GEO`, etc.) for which a target will be created. The maximum size of this value is 256 characters.|
|target_match|String|Required. Identifies a name or category (e.g., cookie name, query string name, country code, etc.) for the data source defined in the `target` property. The category defined by this property will be analyzed when identifying threats. The maximum size of this value is 256 characters.|

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
POST {{ API_URL }}/12345/waf/{{ API_SECURITY_VERSION }}/profile  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "created_date": "06/10/2020 05:54:31 PM",
    "customer_id": "0001",
    "general_settings": {
        "anomaly_threshold": 5,
        "arg_length": 400,
        "arg_name_length": 100,
        "combined_file_sizes": 1048576,
        "disallowed_headers": [],
        "max_file_size": 1048576,
        "max_num_args": 3,
        "process_request_body": true,
        "total_arg_length": 64000,
        "validate_utf8_encoding": true,
        "xml_parser": true
    },
    "id": "Oxeludse",
    "last_modified_date": "2020-06-10T17:54:31.252870Z",
    "name": "my_managed_rule",
    "policies": [
        "r4020_tw_cpanel.conf.json",
        "r4040_tw_drupal.conf.json",
        "r4030_tw_iis.conf.json",
        "r4070_tw_joomla.conf.json",
        "r4050_tw_microsoft_sharepoint.conf.json",
        "r4010_tw_struts.conf.json",
        "r4060_tw_wordpress.conf.json",
        "r5040_cross_site_scripting.conf.json",
        "r2000_ec_custom_rule.conf.json",
        "r5021_http_attack.conf.json",
        "r5020_http_protocol_violation.conf.json",
        "r5043_java_attack.conf.json",
        "r5030_local_file_inclusion.conf.json",
        "r5033_php_injection.conf.json",
        "r5032_remote_code_execution.conf.json",
        "r5031_remote_file_inclusion.conf.json",
        "r5010_scanner_detection.conf.json",
        "r5042_session_fixation.conf.json",
        "r5041_sql_injection.conf.json",
        "r4000_tw_ip_reputation.conf.json",
        "r6000_blocking_evaluation.conf.json"
    ],
    "ruleset_id": "ECRS",
    "ruleset_version": "2019-11-01"
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date: Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "Tq2WAbLu",
    "status": "success",
    "success": true
}
```

## Delete Managed Rule {/*delete-managed-rule*/}

A request to delete a managed rule is described below.

`DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION}}/<TEAM ID>/profile/<MANAGED RULE ID>`

Define the following variables when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<MANAGED RULE ID>`**:** Required. Replace this variable with the system-defined ID for the desired managed rule. Use the [Get All Managed Rules operation](#get-all-managed-rules) to retrieve a list of managed rules and their system-defined IDs.

<h4>Request Headers</h4>

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
DELETE {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile/Oxeludse  HTTP/1.1
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
    "id": "Oxeludse",
    "status": "success",
    "success": true
}
```

## Get All Managed Rules {/*get-all-managed-rules*/}

Retrieves a list of managed rules. A managed rule identifies a rule set configuration and describes a valid request.

<h3>Request</h3>

A request to retrieve all managed rules is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile`

Define the following variable when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for each managed rule:

|Name|Data Type|Description|
|--- |--- |--- |
|created_date|String|Indicates the date and time at which the managed rule was created. <br />**Syntax:** `MM/DD/YYYY hh:mm:ss [AM\|PM]`|
|id|String|Indicates the system-defined ID for the managed rule. Pass this ID to the [Get Managed Rule operation](#get-managed-rule) to retrieve the properties for this managed rule.|
|last_modified_date|String|Indicates the date and time at which the managed rule was last modified. <br />**Syntax:** `MM/DD/YYYYhh:mm:ss [AM\|PM]`|
|name|String|Indicates the name of the managed rule.|
|ruleset_id|String|Indicates the ID for the rule set associated with this managed rule.|
|ruleset_version|String|Indicates the version of the rule set associated with this managed rule.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 221

[{
        "ruleset_id": "ECRS",
        "name": "My Managed Rule",
        "last_modified_date": "2020-12-17T19:30:17.029762Z",
        "created_date": "12/17/2020 07:20:42 PM",
        "ruleset_version": "2020-05-01",
        "id": "8R3VoYmr"
    }
]
```

## Get Available Policies {/*get-available-policies*/}

Retrieves a list of the available policies for the specified rule set.

<h3>Request</h3>

A request to retrieve policies is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile/rulesets/<RULE SET ID>/version/<RULE SET VERSION>/policies`

Define the following variables when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<RULE SET ID>`**:** Required. Replace this variable with the system-defined ID of the rule set whose policies will be retrieved. Find out the system-defined ID of the rule set associated with the desired managed rule through the `ruleset_id` response property of the [Get Managed Rule operation](#get-managed-rule). Alternatively, retrieve a list of the available rule sets and their system-defined IDs through the [Get Available Managed Rule Sets operation](#get-available-managed-rule-sets).
-   `<RULE SET VERSION>`**:** Required. Replace this variable with the version of the rule set whose policies will be retrieved. Find out the version of the rule set associated with the desired managed rule through the `ruleset_version` response property of the [Get Managed Rule operation](#get-managed-rule).

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response properties for each policy returned by this operation:

|Name|Data Type|Description|
|--- |--- |--- |
|index|String|Identifies a policy by its index number.|
|id|String|Identifies a policy by its system-defined ID.|
|name|String|Identifies a policy by its name.|

{{ API_ERRORS.md }}

### Sample Request and Response

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile/rulesets/ECRS/version/latest/policies HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date: Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 2603

[{
        "id": "r2000_ec_custom_rule.conf.json",
        "name": "EC Custom Rule",
        "index": "2000"
    }, {
        "id": "r4000_tw_ip_reputation.conf.json",
        "name": "TW IP Reputation",
        "index": "4000"
    }, {
        "id": "r4010_tw_struts.conf.json",
        "name": "Adv Struts",
        "index": "4010"
    }, {
        "id": "r4020_tw_cpanel.conf.json",
        "name": "Adv cPanel",
        "index": "4020"
    }, {
        "id": "r4030_tw_iis.conf.json",
        "name": "Adv IIS",
        "index": "4030"
    }, {
        "id": "r4040_tw_drupal.conf.json",
        "name": "Adv Drupal",
        "index": "4040"
    }, {
        "id": "r4050_tw_microsoft_sharepoint.conf.json",
        "name": "Adv Sharepoint",
        "index": "4050"
    }, {
        "id": "r4051_tw_microsoft_exchange.conf.json",
        "name": "microsoft exchange",
        "index": "4051"
    }, {
        "id": "r4060_tw_wordpress.conf.json",
        "name": "Adv WordPress",
        "index": "4060"
    }, {
        "id": "r4070_tw_joomla.conf.json",
        "name": "Adv Joomla",
        "index": "4070"
    }, {
        "id": "r4080_tw_vbulletin.conf.json",
        "name": "vBulletin",
        "index": "4080"
    }, {
        "id": "r4090_tw_citrix.conf.json",
        "name": "Citrix",
        "index": "4090"
    }, {
        "id": "r4100_tw_solarwinds_orion.conf.json",
        "name": "SolarWinds Orion",
        "index": "4100"
    }, {
        "id": "r4120_tw_apache.conf.json",
        "name": "Adv Apache Apps",
        "index": "4120"
    }, {
        "id": "r5010_scanner_detection.conf.json",
        "name": "Scanner Detection",
        "index": "5010"
    }, {
        "id": "r5020_http_protocol_violation.conf.json",
        "name": "HTTP Protocol Violation",
        "index": "5020"
    }, {
        "id": "r5021_http_attack.conf.json",
        "name": "HTTP Attack",
        "index": "5021"
    }, {
        "id": "r5030_local_file_inclusion.conf.json",
        "name": "Local File Inclusion (LFI)",
        "index": "5030"
    }, {
        "id": "r5031_remote_file_inclusion.conf.json",
        "name": "Remote File Inclusion (RFI)",
        "index": "5031"
    }, {
        "id": "r5032_remote_code_execution.conf.json",
        "name": "Remote Code Execution (RCE)",
        "index": "5032"
    }, {
        "id": "r5033_php_injection.conf.json",
        "name": "PHP Injection (PHPi)",
        "index": "5033"
    }, {
        "id": "r5034_nodejs_attack.conf.json",
        "name": "Nodejs Attack",
        "index": "5034"
    }, {
        "id": "r5040_cross_site_scripting.conf.json",
        "name": "Cross Site Scripting (XSS)",
        "index": "5040"
    }, {
        "id": "r5041_sql_injection.conf.json",
        "name": "SQL Injection (SQLi)",
        "index": "5041"
    }, {
        "id": "r5042_session_fixation.conf.json",
        "name": "Session Fixation",
        "index": "5042"
    }, {
        "id": "r5043_java_attack.conf.json",
        "name": "Java Attack",
        "index": "5043"
    }
]
```

## Get Available Managed Rule Sets {/*get-available-managed-rule-sets*/}

Retrieves a list of the available rule sets. The purpose of this operation is to identify each rule set/version combination (e.g., ECRS) that may be assigned to a managed rule.

<Callout type="info">

  The set of supported versions for a given rule set is subject to change as new versions are made available. Although this doesn't affect existing managed rules, it is always a best practice to review and update managed rules to use the latest version whenever possible.
  
</Callout>

<h3>Request</h3>

A request to retrieve rule sets is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile/rulesets`

Define the following variable when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response properties for each rule set returned by this operation:

|Name|Data Type|Description|
|--- |--- |--- |
|description|String|This property is reserved for future use.|
|id|String|Identifies a rule set by its system-defined ID.|
|versions|Array of string values|Identifies the current versions of the rule set identified by the `id` response property.|

{{ API_ERRORS.md }}

### Sample Request and Response

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile/rulesets HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date: Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 665

[{
        "id": "ECRS",
        "description": "NA",
        "versions": [
            "2018-09-14",
            "2019-02-11",
            "2019-08-07",
            "2019-09-05",
            "2019-10-01",
            "2019-11-01",
            "2020-01-09",
            "2020-02-04",
            "2020-03-06",
            "2020-04-03",
            "2020-05-01",
            "2020-06-08",
            "2020-08-01",
            "2020-09-01",
            "2020-10-05",
            "2020-11-02",
            "2020-12-04",
            "2021-01-04",
            "2021-02-05",
            "2021-03-01",
            "2021-03-09",
            "2021-04-02",
            "2021-05-03",
            "2021-06-01",
            "2021-07-01",
            "2021-08-03",
            "2021-09-07",
            "2021-10-04",
            "2021-11-04",
            "2021-12-10",
            "2021-12-13",
            "latest"
        ],
        "display": "ECRS"
    }
]
```

## Get Available Rules {/*get-available-rules*/}

Retrieves the set of rules associated with the specified policy. The set of rules associated with a policy may vary by a rule set's version.

<h3>Request</h3>

A request to retrieve rules is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile/rulesets/<RULE SET ID>/version/<RULE SET VERSION>/policies/<POLICY ID>/rules`

Define the following variables when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<RULE SET ID>`**:** Required. Replace this variable with the system-defined ID of the rule set that contains the policy whose rules will be retrieved. Find out the system-defined ID of the rule set associated with the desired managed rule through the `ruleset_id` response property of the [Get Managed Rule operation](#get-managed-rule). Alternatively, retrieve a list of the available rule sets and their system-defined IDs through the [Get Available Managed Rule Sets operation](#get-available-managed-rule-sets).
-   `<RULE SET VERSION>`**:** Required. Replace this variable with the version of the rule set that contains the policy whose rules will be retrieved. Find out the version of the rule set associated with the desired managed rule through the `ruleset_version` response property of the [Get Managed Rule operation](#get-managed-rule).
-   `<POLICY ID>`**:** Required. Replace this variable with the system-defined ID of the policy whose rules will be retrieved. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of the available policies and their system-defined IDs.

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response properties for each rule returned by this operation:

|Name|Data Type|Description|
|--- |--- |--- |
|Id|Integer|Identifies a rule by its system-defined ID.|
|Msg|String|Describes the rule identified by the `Id` response property.|

{{ API_ERRORS.md }}

### Sample Request and Response

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile/rulesets/ECRS/version/latest/policies/r2000_ec_custom_rule.conf.json/rules HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date: Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 1194

[{
        "Id": "431000",
        "Msg": "Bash shellshock attack detected",
        "Tag": [
            "CVE-2014-6271"
        ]
    }, {
        "Id": "431001",
        "Msg": "httpoxy attack detected, Proxy header unnecessary",
        "Tag": [
            "CVE-2016-5385,CVE-2016-5386,CVE-2016-5387,CVE-2016-5388,CVE-2016-1000109,CVE-2016-1000110"
        ]
    }, {
        "Id": "431002",
        "Msg": "SLR: Drupal 7.x/8.x RCE CVE-2018-7600 ",
        "Tag": [
            "application-Drupal",
            "language-php",
            "platform-multi",
            "attack-rce",
            "https://www.drupal.org/sa-core-2018-002"
        ]
    }, {
        "Id": "431003",
        "Msg": "SLR: Drupal 7.x/8.x RCE CVE-2018-7600 ",
        "Tag": [
            "application-Drupal",
            "language-php",
            "platform-multi",
            "attack-rce",
            "https://www.drupal.org/sa-core-2018-002"
        ]
    }, {
        "Id": "431007",
        "Msg": "Log4j Headers CVE-2021-44228",
        "Tag": [
            "language-java",
            "attack-rce",
            "CVE-2021-44228"
        ]
    }, {
        "Id": "431008",
        "Msg": "Log4j Body CVE-2021-44228",
        "Tag": [
            "language-java",
            "attack-rce",
            "CVE-2021-44228"
        ]
    }, {
        "Id": "431009",
        "Msg": "Log4j URI CVE-2021-44228",
        "Tag": [
            "language-java",
            "attack-rce",
            "CVE-2021-44228"
        ]
    }
]
```

## Get Managed Rule {/*get-managed-rule*/}

Retrieves a managed rule that identifies a rule set configuration and describes a valid request.

<h3>Request</h3>

A request to retrieve a managed rule is described below.

`GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile/<MANAGED RULE ID>`

Define the following variables when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<MANAGED RULE ID>`**:** Required. Replace this variable with the system-defined ID for the desired managed rule. Use the [Get All Managed Rules operation](#get-all-managed-rules) to retrieve a list of managed rules and their system-defined IDs.

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements for each managed rule:

|Name|Data Type|Description|
|--- |--- |--- |
|created_date|String|Indicates the date and time at which the managed rule was created. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ`|
|customer_id|String|Identifies your account by its customer account number.|
|disabled_rules|Array of objects|Contains all disabled rules.|
|general_settings|Object|Contains settings that describe a valid request.|
|id|String|Indicates the system-defined ID for the managed rule.|
|last_modified_by|String|Reserved for future use.|
|last_modified_date|String|Indicates the date and time at which the managed rule was last modified. <br />**Syntax:** `YYYY-MM-DDThh:mm:ss:ffffffZ` |
|name|String|Indicates the name of the managed rule.|
|policies|Array of string values|Contains a list of policies that have been enabled on this managed rule. Identify each desired policy by its system-defined ID. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of policies and their IDs.|
|rule_target_updates|Array of objects|Defines one or more targets that will be ignored and/or replaced.<br />**Key information:** <ul><li>If `is_negated` is set to `true`, then this target identifies rule criterion that will be ignored when identifying threats.</li><li>The `replace_target` property defines criterion that will be used to identify threats instead of the existing criterion.</li><li>If `is_regex` property is set to `true`, then you may use regular expressions to define criteria for identifying multiple types of threats.</li><li>A maximum of 25 target configurations may be created.</li></ul>|
|ruleset_id|String|Indicates the ID for the rule set associated with this managed rule. Use the [Get Available Managed Rule Sets operation](#get-available-managed-rule-sets) to retrieve a list of rule sets and their IDs.|
|ruleset_version|String|Indicates the version of the rule set associated with this managed rule.|
|version|String|Reserved for future use.|

#### disabled_rules Array

The `disabled_rules` array identifies each rule that has been disabled using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|policy_id|String|Identifies a policy from which a rule will be disabled by its system-defined ID. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of policies and their system-defined IDs. <br />**Default Value:** `Null`|
|rule_id|String|Identifies a rule that will be disabled by its system-defined ID. Use the [Get Available Rules operation](#get-available-rules) to retrieve a list of rules and their system-defined IDs. <br />**Default Value:** `Null`|

#### general_settings Object

The `general_settings` object describes a valid request using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|anomaly_threshold|Integer|Indicates the anomaly score threshold.|
|arg_length|Integer|Indicates the maximum number of characters for any single query string property value.|
|arg_name_length|Integer|Indicates the maximum number of characters for any single query string property name.|
|combined_file_sizes|Integer|Indicates the total file size for multipart message lengths.|
|ignore_cookie|Array of string values|Identifies each cookie that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|ignore_header|Array of string values|Identifies each request header that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|ignore_query_args|Array of string values|Identifies each query string argument that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|json_parser|Boolean|Indicates whether JSON payloads will be inspected. Valid values are: `true \| false`|
|max_num_args|Integer|Indicates the maximum number of query string properties.|
|paranoia_level|Integer|Indicates the balance between the level of protection and false positives. Valid values are: `1 \| 2 \| 3 \| 4`|
|process_request_body|Boolean|Indicates whether WAF will inspect a POST request body. Valid values are: `true \| false`|
|response_header_name|String|Indicates the name of the response header that will be included with blocked requests.|
|total_arg_length|Integer|Indicates the maximum number of characters for the query string value.|
|validate_utf8_encoding|Boolean|Indicates whether WAF may check whether a request variable (e.g., `ARGS`, `ARGS_NAMES`, and `REQUEST_FILENAME`) is a valid UTF-8 string. This validation includes checking for missing bytes, invalid characters, and ASCII to UTF-8 character mapping. Valid values are: `true \| false` <br />You should only enable this validation if your web server or application uses UTF-8. Otherwise, this validation will result in many false positives.|
|xml_parser|Boolean|Indicates whether XML payloads will be inspected. Valid values are: `true \| false`|

#### rule_target_updates Array

The `rule_target_updates` array describes each target using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Indicates whether the current target, as defined within this object, will be ignored when identifying threats. Valid values are: <ul><li>**True:** Ignore this target.</li><li>**False:** Default value. Allow this target to identify threats.</li></ul>|
|is_regex|Boolean|Indicates whether the `target_match` property may leverage regular expressions. Valid values are: <ul><li>**True:** Interprets the `target_match` property as a regular expression.</li><li>**False:** Default value. Interprets the `target_match` property as a literal value.</li></ul>|
|replace_target|String|Defines the data source (e.g., `REQUEST_COOKIES`, `ARGS`, `GEO`, etc.) that will be used instead of the one defined in the `target` property. <br />**Key information:** <ul><li>This property should be a blank value unless you are configuring a rule to identify threats based on a different data source.</li><li>This property replaces an existing threat identification criterion. For example, this capability may be used to identify threats based on a cookie value instead of a query string argument.</li></ul>|
|rule_id|String|Identifies a rule by its system-defined ID. The configuration defined within this object will alter the behavior of the rule identified by this property.|
|target|String|Indicates the type of data source (e.g., `REQUEST_COOKIES`, `ARGS`, `GEO`, etc.) for which a target will be created. The maximum size of this value is 256 characters.|
|target_match|String|Identifies a name or category (e.g., cookie name, query string name, country code, etc.) for the data source defined in the `target` property. The category defined by this property will be analyzed when identifying threats. The maximum size of this value is 256 characters.|

{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample JSON request is shown below.

```json
GET {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile/Oxeludse  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 1400

{
    "created_date": "06/10/2020 05:54:31 PM",
    "customer_id": "0001",
    "general_settings": {
        "anomaly_threshold": 5,
        "arg_length": 400,
        "arg_name_length": 100,
        "combined_file_sizes": 1048576,
        "disallowed_headers": [],
        "max_file_size": 1048576,
        "max_num_args": 3,
        "process_request_body": true,
        "total_arg_length": 64000,
        "validate_utf8_encoding": true,
        "xml_parser": true
    },
    "id": "Oxeludse",
    "last_modified_date": "2020-06-10T17:54:31.252870Z",
    "name": "my_managed_rule",
    "policies": [
        "r4020_tw_cpanel.conf.json",
        "r4040_tw_drupal.conf.json",
        "r4030_tw_iis.conf.json",
        "r4070_tw_joomla.conf.json",
        "r4050_tw_microsoft_sharepoint.conf.json",
        "r4010_tw_struts.conf.json",
        "r4060_tw_wordpress.conf.json",
        "r5040_cross_site_scripting.conf.json",
        "r2000_ec_custom_rule.conf.json",
        "r5021_http_attack.conf.json",
        "r5020_http_protocol_violation.conf.json",
        "r5043_java_attack.conf.json",
        "r5030_local_file_inclusion.conf.json",
        "r5033_php_injection.conf.json",
        "r5032_remote_code_execution.conf.json",
        "r5031_remote_file_inclusion.conf.json",
        "r5010_scanner_detection.conf.json",
        "r5042_session_fixation.conf.json",
        "r5041_sql_injection.conf.json",
        "r4000_tw_ip_reputation.conf.json",
        "r6000_blocking_evaluation.conf.json"
    ],
    "ruleset_id": "ECRS",
    "ruleset_version": "2019-11-01"
}
```

## Update Managed Rule {/*update-managed-rule*/}

Updates a managed rule that identifies a rule set configuration and describes a valid request.

<h3>Request</h3>

A request to update a managed rule is described below.

`PUT {{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/profile/<MANAGED RULE ID>`

Define the following variables when submitting the above request:

-   `<TEAM ID>`**:** Required. Replace this variable with your team's tenant ID. 
-   `<MANAGED RULE ID>`**:** Required. Replace this variable with the system-defined ID for the desired managed rule. Use the [Get All Managed Rules operation](#get-all-managed-rules) to retrieve a list of managed rules and their system-defined IDs.

<h4>Request Headers</h4>

This operation only takes advantage of [common request headers](FINDME/../Introduction/Common_Request_and_Response_Elements.htm#Request).

<h4>Request Body</h4>

Pass the following request body properties:

|Name|Data Type|Description|
|--- |--- |--- |
|disabled_rules|Array of objects |Contains all disabled rules. <br /> **Default Value:** `Null`|
|general_settings|Object|Required. Contains settings that define the profile for a valid request.|
|name|String|Indicates the name of the managed rule.|
|policies|Array of string values|Contains a list of policies that have been enabled on this managed rule. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of policies and their IDs.|
|rule_target_updates|Array of objects|Defines one or more targets that will be ignored and/or replaced. <br />**Key information:** <ul><li>If `is_negated` is set to `true`, then this target identifies rule criterion that will be ignored when identifying threats.</li><li>The `replace_target` property defines criterion that will be used to identify threats instead of the existing criterion.</li><li>If `is_regex` property is set to `true`, then you may use regular expressions to define criteria for identifying multiple types of threats.</li><li>A maximum of 25 target configurations may be created.</li></ul>|
|ruleset_id|String|Required. Indicates the ID for the rule set associated with this managed rule. Use the [Get Available Managed Rule Sets operation](#get-available-managed-rule-sets) to retrieve a list of rule sets and their IDs.|
|ruleset_version|String|Required. Indicates the version of the rule set associated with this managed rule.|

#### disabled_rules Array

The `disabled_rules` array identifies each rule that has been disabled using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|policy_id|String|Identifies a policy from which a rule will be disabled by its system-defined ID. Use the [Get Available Policies operation](#get-available-policies) to retrieve a list of policies and their system-defined IDs. <br />**Default Value:** `Null`|
|rule_id|String|Identifies a rule that will be disabled by its system-defined ID. Use the [Get Available Rules operation](#get-available-rules) to retrieve a list of rules and their system-defined IDs. <br />**Default Value:** `Null`|

#### general_settings Object

The `general_settings` object describes a valid request using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|anomaly_threshold|Integer|Required. Indicates the anomaly score threshold.|
|arg_length|Integer|Required. Indicates the maximum number of characters for any single query string property value.|
|arg_name_length|Integer|Required. Indicates the maximum number of characters for any single query string property name.|
|combined_file_sizes|Integer|Indicates the total file size for multipart message lengths.|
|ignore_cookie|Array of string values|Identifies each cookie that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|ignore_header|Array of string values|Identifies each request header that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|ignore_query_args|Array of string values|Identifies each query string argument that will be ignored for the purpose of determining whether a request is a threat. Each element in this array defines a regular expression.|
|json_parser|Boolean|Determines whether JSON payloads will be inspected. Valid values are: `true \| false`|
|max_num_args|Integer|Required. Indicates the maximum number of query string properties.|
|paranoia_level|Integer|Indicates the balance between the level of protection and false positives. Valid values are:`1 \| 2 \| 3 \| 4`|
|process_request_body|Boolean|Indicates whether WAF will inspect a POST request body. Valid values are: `true \| false`|
|response_header_name|String|Determines the name of the response header that will be included with blocked requests.|
|total_arg_length|Integer|Required. Indicates the maximum number of characters for the query string value.|
|validate_utf8_encoding|Boolean|Indicates whether WAF may check whether a request variable (e.g., `ARGS`, `ARGS_NAMES`, and `REQUEST_FILENAME`) is a valid UTF-8 string. This validation includes checking for missing bytes, invalid characters, and ASCII to UTF-8 character mapping. Valid values are: `true \| false` <br />You should only enable this validation if your web server or application uses UTF-8. Otherwise, this validation will result in many false positives.|
|xml_parser|Boolean|Determines whether XML payloads will be inspected. Valid values are: `true \| false`|

#### rule_target_updates Array

The `rule_target_updates` array describes each target using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_negated|Boolean|Determines whether the current target, as defined within this object, will be ignored when identifying threats. Valid values are: <ul><li>**True:** Ignore this target.</li><li>**False:** Default value. Allow this target to identify threats.</li></ul>|
|is_regex|Boolean|Required. Determines whether the `target_match` property may leverage regular expressions. Valid values are: <ul><li>**True:** Interprets the `target_match` property as a regular expression.</li><li>**False:** Default value. Interprets the target_match property as a literal value.</li></ul>|
|replace_target|String|Defines the data source (e.g., `REQUEST_COOKIES`, `ARGS`, `GEO`, etc.) that will be used instead of the one defined in the `target` property. <br />**Key information:** <ul><li>This property should be a blank value unless you are configuring a rule to identify threats based on a different data source.</li><li>This property replaces an existing threat identification criterion. For example, this capability may be used to identify threats based on a cookie value instead of a query string argument.</li></ul>|
|rule_id|String|Required. Identifies a rule by its system-defined ID. The configuration defined within this object will alter the behavior of the rule identified by this property.|
|target|String|Required. Identifies the type of data source (e.g., `REQUEST_COOKIES`, `ARGS`, `GEO`, etc.) for which a target will be created. The maximum size of this value is 256 characters.|
|target_match|String|Required. Identifies a name or category (e.g., cookie name, query string name, country code, etc.) for the data source defined in the `target` property. The category defined by this property will be analyzed when identifying threats. The maximum size of this value is 256 characters.|

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
PUT {{API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile/Oxeludse  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}

{
    "created_date": "06/10/2020 05:54:31 PM",
    "customer_id": "0001",
    "general_settings": {
        "anomaly_threshold": 5,
        "arg_length": 400,
        "arg_name_length": 100,
        "combined_file_sizes": 1048576,
        "disallowed_headers": [],
        "max_file_size": 1048576,
        "max_num_args": 3,
        "process_request_body": true,
        "total_arg_length": 64000,
        "validate_utf8_encoding": true,
        "xml_parser": true
    },
    "id": "Oxeludse",
    "last_modified_date": "2020-06-10T17:54:31.252870Z",
    "name": "my_managed_rule",
    "policies": [
        "r4020_tw_cpanel.conf.json",
        "r4040_tw_drupal.conf.json",
        "r4030_tw_iis.conf.json",
        "r4070_tw_joomla.conf.json",
        "r4050_tw_microsoft_sharepoint.conf.json",
        "r4010_tw_struts.conf.json",
        "r4060_tw_wordpress.conf.json",
        "r5040_cross_site_scripting.conf.json",
        "r2000_ec_custom_rule.conf.json",
        "r5021_http_attack.conf.json",
        "r5020_http_protocol_violation.conf.json",
        "r5043_java_attack.conf.json",
        "r5030_local_file_inclusion.conf.json",
        "r5033_php_injection.conf.json",
        "r5032_remote_code_execution.conf.json",
        "r5031_remote_file_inclusion.conf.json",
        "r5010_scanner_detection.conf.json",
        "r5042_session_fixation.conf.json",
        "r5041_sql_injection.conf.json",
        "r4000_tw_ip_reputation.conf.json",
        "r6000_blocking_evaluation.conf.json"
    ],
    "ruleset_id": "ECRS",
    "ruleset_version": "2019-11-01"
}
```

A sample JSON response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date: Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{
    "id": "Tq2WAbLu",
    "status": "success",
    "success": true
}
```
