##### scopes Array

The `scopes` array describes each Security App using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|acl_audit_action|Object|Contains properties that describe the type of action that will take place when an access rule defined within the `acl_audit_id` property is violated.|
|acl_audit_id|String|Indicates the system-defined ID for the access rule that will audit production traffic for this Security App. Use the Get All Access Rules (ACLs) endpoint to retrieve a list of access rules and their IDs.|
|acl_prod_action|Object|Contains properties that describe the type of action that will take place when an access rule defined within the `acl_prod_id` property is violated.|
|acl_prod_id|String|Indicates the system-defined ID for the access rule that will be applied to production traffic for this Security App. Use the Get All Access Rules (ACLs) endpoint to retrieve a list of access rules and their IDs.|
|bot_manager_config_id|String|Identifies a bot manager configuration by its system-defined ID. Use the [Get All Bot Manager Configurations operation](/applications/v7/develop/rest_api_security/bot_manager#get-all-bot-manager-configurations) to retrieve a list of bot manager configurations and their system-defined IDs. |
|host|Object|Contains properties that describe a hostname match condition.|
|id|String|Identifies the current Security App by its system-defined ID.|
|limits|Array of objects|Identifies the set of rate rules that will be enforced for this Security App and the enforcement action that will be applied to rate limited requests.|
|name|String|Indicates the name assigned to the Security App. <br />**Default Value:** `name`|
|path|Object|Contains properties that describe a URL match condition.|
|profile_audit_action|Object|Contains properties that describe the type of action that will take place when the managed rule defined within the `profile_audit_id` property is violated.|
|profile_audit_id|String|Indicates the system-defined ID for the managed rule that will audit production traffic for this Security App. Use the Get All Managed Rules (Profiles) endpoint to retrieve a list of managed rules and their IDs.|
|profile_prod_action|Object|Contains properties that describe the type of action that will take place when the managed rule defined within the `profile_prod_id` property is violated.|
|profile_prod_id|String|Indicates the system-defined ID for the managed rule that will be applied to production traffic for this Security App. Use the Get All Managed Rules (Profiles) endpoint to retrieve a list of managed rules and their IDs.|
|recaptcha_action_name | String | Indicates the name of the reCAPTCHA configuration. |
|recaptcha_secret_key | String | Indicates the secret key provided by Google. |
|recaptcha_site_key | String |Indicates the site key provided by Google. |
|rules_audit_action|Object|Contains properties that describe the type of action that will take place when the custom rule set defined within the `rules_audit_id` property is violated.|
|rules_audit_id|String|Indicates the system-defined ID for the custom rule set that will audit production traffic for this Security App. Use the Get All Custom Rule Sets endpoint to retrieve a list of custom rule sets and their IDs.|
|rules_prod_action|Object|Contains properties that describe the type of action that will take place when the custom rule set defined within the rules_prod_id property is violated.|
|rules_prod_id|String|Indicates the system-defined ID for the custom rule set that will be applied to production traffic for this Security App. Use the Get All Custom Rule Sets endpoint to retrieve a list of custom rule sets and their IDs.|

###### CONFIGURATION_prod_action Object

The `acl_prod_action`, `profile_prod_action`, and `rules_prod_action` objects describe the enforcement action that will be taken when a request violates the configuration defined by `acl_prod_id`, `profile_prod_id`, or `rules_prod_id`, respectively. These objects may contain the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|enf_type|String|Indicates the enforcement action that will be applied to traffic identified as a threat. Valid values are:<ul><li>**BLOCK_REQUEST:** Block Request</li><li>**ALERT:** Alert Only</li><li>**REDIRECT_302:** Redirect (HTTP 302)</li><li>**CUSTOM_RESPONSE:** Custom Response</li></ul>|
|id|String|Reserved for future use.|
|name|String|Indicates the name assigned to this enforcement action configuration.|
|response_body_base64|String|`enf_type:` `CUSTOM_RESPONSE`. Indicates the response body for traffic identified as a threat. This value is Base64 encoded.|
|response_headers|Object|`enf_type:` `CUSTOM_RESPONSE`. Indicates the set of response headers for traffic identified as a threat. Each response header is specified as a name/value pair.|
|status|Integer|`enf_type` = `CUSTOM_RESPONSE`. Indicates the HTTP status code (e.g., 404) for the custom response for traffic identified as a threat.|
|url|String|`enf_type` = `REDIRECT_302 Only`. Indicates the URL to which malicious requests will be redirected.|

###### CONFIGURATION_audit_action Object

The `acl_audit_action`, `profile_audit_action`, and `rules_audit_action` objects describe the enforcement action that will be taken when a request violates the configuration defined by `acl_audit_id`, `profile_audit_id`, or `rules_audit_id`, respectively. These objects may contain the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|id|String|Reserved for future use.|
|name|String|Indicates the name assigned to this enforcement action configuration.|
|enf_type|String|Returns `ALERT`. This indicates that threats will be audited.|

###### host Object

The `host` object describes a hostname match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_case_insensitive|Boolean|`type: EM Only.` Indicates whether the comparison between the  requested hostname and the values property is case-sensitive. Valid values are:<ul><li>**True:** Case-insensitive</li><li>**False:** Case-sensitive</li></ul>|
|is_negated|Boolean|Indicates whether this match condition will be satisfied when the requested hostname matches or does not match the value defined by the `value \| values` property. Valid values are:<ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Indicates how the system will interpret the comparison between the request's hostname and the value defined within the `value \| values` property. Valid values are: <ul><li>**EM:** Indicates that request's hostname must be an exact match to one of the case-sensitive values specified in the values property.</li><li>**GLOB:** Indicates that the request's hostname must be an exact match to the wildcard pattern defined in the `value` property. </li><li>**RX:** Indicates that the request's hostname must be an exact match to the regular expression defined in the `value` property.</li></ul> Apply this Security App across all hostnames by setting this property to `GLOB` and setting the `value` property to `*.` This type of configuration is also known as "Default."|
|value|String|`type: GLOB or RX`. Identifies a value that will be used to identify requests that are eligible for this Security App.|
|values|Array of string values|`type: EM Only`. Identifies one or more values used to identify requests that are eligible for this Security App.|

###### limits Array

The `limits` array identifies the set of rate rules that will be enforced for this Security App and the enforcement action that will be applied to rate limited requests.

|Name|Data Type|Description|
|--- |--- |--- |
|action|Object|Describes the action that will take place when the rate rule identified by the `id` property is enforced.|
|duration_sec|Integer|Indicates the length of time, in seconds, that the action defined within this object will be applied to a client that violates the rate rule identified by the `id` property. Valid values are: `10 \| 60 \| 300`|
|enf_type|String|Indicates the type of action that will be applied to rate limited requests. Valid values are: <ul><li>**ALERT:** Alert Only</li><li>**REDIRECT_302:** Redirect (HTTP 302)</li><li>**CUSTOM_RESPONSE:** Custom Response</li><li>**DROP_REQUEST:** Drop Request (`503 Service Unavailable` response with a retry-after of 10 seconds)</li></ul>|
|name|String|Indicates the name assigned to this enforcement action.|
|response_body_base64|String|`enf_type: CUSTOM_RESPONSE Only.` Indicates the response body that will be sent to rate limited requests. This value is Base64 encoded.|
|response_headers|Object|`enf_type: CUSTOM_RESPONSE Only.` Contains the set of headers that will be included in the response sent to rate limited requests. <br />**Syntax:** `"<RESPONSE HEADER>": "<VALUE>"`|
|status|Integer|`enf_type: CUSTOM_RESPONSE Only.` Indicates the HTTP status code (e.g., `404`) for the custom response sent to rate limited requests.|
|url|String|`enf_type: REDIRECT_302 Only.` Indicates the URL to which rate limited requests will be redirected.|
|id|String|Indicates the system-defined ID for the rate rule that will be applied to this Security App.|

###### path Object

The `path` object describes a URL path match condition using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|is_case_insensitive|Boolean|`enf_type: EM Only.` Indicates whether the comparison between the  requested URL and the values property is case-sensitive. Valid values are: <ul><li>**True:** Case-insensitive </li><li>**False:** Case-sensitive</li></ul>|
|is_negated|Boolean|Indicates whether this match condition will be satisfied when the requested URL matches or does not match the value defined by the `value \| values` property. Valid values are: <ul><li>**True:** Does not match</li><li>**False:** Matches</li></ul>|
|type|String|Indicates how the system will interpret the comparison between the request's URL and the value defined within the `value \| values` property. Valid values are: <ul><li>**EM:** Indicates that request's URL path must be an exact match to one of the case-sensitive values specified in the `values` property. </li><li>**GLOB:** Indicates that the request's URL path must be an exact match to the wildcard pattern defined in the `value` property. </li><li>**RX:** Indicates that the request's URL path must be an exact match to the regular expression defined in the value property.</li></ul> Apply this Security App across all URLs by setting this property to `GLOB` and setting the `value` property to `*`. This type of configuration is also known as "Default."|
|value|String|`enf_type: GLOB or RX.` Identifies a value that will be used to identify requests that are eligible for this Security App.|
|values|Array of string values|`enf_type: EM Only.` Identifies one or more values used to identify requests that are eligible for this Security App.|

A URL path pattern starts directly after the hostname. Exclude a protocol or a hostname when defining `value \| values`.

**Sample value:** `/marketing`
