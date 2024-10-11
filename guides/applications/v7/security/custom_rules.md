---
title: Custom Rules
---

Use custom rules to tailor how {{ PRODUCT_SECURITY }} identifies malicious traffic. This provides added flexibility for threat identification that allows you to target malicious traffic with minimal impact to legitimate traffic. Custom threat identification combined with rapid testing and deployment enables you to quickly address long-term and zero-day vulnerabilities.

<Callout type="info">

  The Custom rules capability requires {{ PRODUCT }} Enterprise, {{ PRODUCT }} Premier, {{ PRODUCT_SECURITY }} Premier, or {{ PRODUCT_SECURITY }} Business. {{ ACCOUNT_UPGRADE }}

</Callout>

## Custom Rule Sets {/*custom-rule-sets*/}

A custom rule set defines how threats will be identified through rules. Each custom rule set may contain up to 10 rules. Each rule contains:
-   Up to 6 conditions that define threat identification criteria.
-   A rule ID and message that will be associated with threats identified by this rule. A rule ID must be a number between 66,000,000 and 66,999,999.

    <Callout type="tip">

      Assigning a unique ID and message to each rule makes it easy to identify threats detected as a result of a specific rule.

    </Callout>

### Threat Identification {/*threat-identification*/}

{{ PRODUCT }} identifies a threat when a request satisfies at least one rule in a custom rule set. A rule is satisfied when a match is found for each of its conditions. A condition defines what will be matched (i.e., variable), how it will be matched (i.e., operator), and a match value.

<Callout type="info">

  A variable identifies the request element (e.g., request header, query string, or request body) that {{ PRODUCT }} will analyze.

</Callout>

**Example #1:**

This example assumes that your custom rule set contains the following two rules:

| Rule | Description                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | This rule contains a single condition with a single variable.                                                                                                       |
| 2    | This rule contains the following conditions: <ol><li>The first condition contains a single variable.</li><li>The second condition contains two variables.</li></ol> |

Assuming the above configuration, {{ PRODUCT_SECURITY }} identifies a threat under either of the following circumstances:

-   A match is found for the variable defined in the first rule's condition.
-   A match is found for the variable defined in the second rule's first condition.

    **AND**

    A match is found for either of the variables defined in the second rule's second condition.

<Callout type="info">

  Certain variables match on key-value pairs. If you match on multiple keys within a single variable, {{ PRODUCT }} will only need to find one of those matches to satisfy that variable. For example, if you set up a request header variable to match for `Authorization` and `Content-Type`, then requests that contain either or both of those headers will satisfy that variable.

</Callout>

#### Conditions {/*conditions*/}

A condition determines how requests will be identified through variables, operators, match values, transformations, and negative matching.

##### Variables {/*variables*/}

A variable identifies the request element that {{ PRODUCT }} will analyze. 

**Key information:**

-   <a id="count" />All variables support the ability to match on the number of times that a request element is found within the request. Set up a variable to match on the number of instances instead of inspecting the element for a specific value or regular expression pattern by marking the **Count** option.
-   You may define zero or more keys when setting up variables that match on key-value pairs. {{ PRODUCT }} must find at least one of the specified keys in the request before that variable will be satisfied. 

    For example, if you set up a request header variable to match for `Authorization` and `Content-Type`, then requests that contain either or both of those headers will satisfy that variable.

-   We support the following request elements:
    -   [ASN](#asn)
    -   [Country](#country)
    -   [Country subdivision (ISO-3166-2)](#country-subdivision--iso3166-2-)
    -   [IP address](#ip-address)
    -   [Request body parsed](#request-body-parsed)
    -   [Request body raw](#request-body-raw)
    -   [Request cookies](#request-cookies)
    -   [Request header](#request-header)
    -   [Request method](#request-method)
    -   [Request query](#request-query)
    -   [Request URI](#request-uri)
    -   [Request URL Path](#request-url-path)

###### ASN {/*asn*/}

Identifies requests by the Autonomous System Number (ASN) associated with the client's IP address.

Specify a regular expression to match for multiple ASNs.

**Example:**

Use the following pattern to match for requests from 15133 and 14153: `15133|14153`

###### Country {/*country*/}

Identifies requests by the country from which the request originated. Specify the desired country using a [country code](/applications/reference/country_codes).

Specify a regular expression to match for multiple country codes.

**Example:**

Use the following pattern to match for requests from the United States, Canada, and Mexico: `US|CA|MX`

###### Country Subdivision (ISO3166-2) {/*country-subdivision--iso3166-2-*/}

Identifies requests by a country's subdivision (e.g., state or province). Specify each desired subdivision using an [ISO-3166-2 code](https://www.iso.org/obp/ui/#search/code/).

    **Syntax:**

    `<Country Code>`-`<Subdivision Code>`

    **Example:**

    The following value identifies requests from California:  `US-CA`

###### IP Address {/*ip-address*/}

Identify requests by the requester's IP address.

**Key information:** 

-   Specify a comma-delimited list of the desired IP address(es) using standard IPv4/IPv6 and CIDR notation.
-   Specify a subnet by appending a slash (/) and the desired bit-length of the prefix (e.g., `11.22.33.0/22`).
-   Do not specify more than 1,000 IP addresses or IP blocks.
-   Identifying requests by IP address is only supported when a condition contains a single variable.
-   **Example:** `192.0.2.20,203.0.113.0/24,2001:DB8::/32`

###### Request Body Parsed {/*request-body-parsed*/}

Match against all or specific key-value pair(s) in the request body for a URL-encoded or JSON `POST` request:
-   **All:** Do not specify a key within this variable and specify the desired value or pattern within the **Match value** option.
-   **Specific Key-Value Pair:** Define the name of the desired key within this variable and specify the desired value or pattern within the **Match value** option.

    <Callout type="info">

      Setting up a request body parsed variable also allows you to define whether {{ PRODUCT }} uses a regular expression, a negative match, or both when comparing the value assigned to the variable against key names. Use a negative match to find requests whose payload does not contain the specified key.

    </Callout>

<Callout type="tip">

  Use the `Request body raw` variable to match against the URL-encoded request body for any type of request (e.g., XML).

</Callout>

<Callout type="info">

  {{ PRODUCT }} only inspects the first 8 KB of the request body. You may [restrict the request body](/applications/security/access_rules#file-size) for valid requests to 8 KB (8,192 bytes) through an access rule.

</Callout>

**Example:**

Match against the following request body by setting the the **Match value** option to `blue`. Require that this value be assigned to the `sky` key by also setting the request body parsed variable to `sky`.

```
{
    "id": "srZf45oP34p",
    "sky": "blue"
}
```

###### Request Body Raw {/*request-body-raw*/}

Match against a URL-encoded request body for any type of request (e.g., XML).

<Callout type="info">

  {{ PRODUCT }} only inspects the first 8 KB of the request body. You may [restrict the request body](/applications/security/access_rules#file-size) for valid requests to 8 KB (8,192 bytes) through an access rule.

</Callout>

###### Request Cookies {/*request-cookies*/}

Match against all or specific cookies.

-   **All:** Match against all cookies by not specifying a cookie name within this variable. Specify the desired cookie value or pattern within the **Match value** option. 
-   **Specific Cookies:** Define the name of the desired cookie within this variable and specify the desired cookie value or pattern within the **Match value** option.

    <Callout type="info">

      Setting up a cookie variable also allows you to define whether {{ PRODUCT }} uses a regular expression, a negative match, or both when comparing the value assigned to the variable against cookies. Use a negative match to find requests that do not contain the specified cookie.

    </Callout>

###### Request Header {/*request-header*/}

Match against all or specific request headers.

-   **All:** Match against all request headers by not specifying a request header name within this variable. Specify the desired header value or pattern within the **Match value** option.
-   **Specific Request Headers:** Define the name of the desired request header within this variable and specify the desired header value or pattern within the **Match value** option.

    <Callout type="info">

      Setting up a request header variable also allows you to define whether {{ PRODUCT }} uses a regular expression, a negative match, or both when comparing the value assigned to the variable against request headers. Use a negative match to find requests that do not contain the specified request header.

    </Callout>

###### Request Method {/*request-method*/}

Match against request method (e.g., `GET` and `POST`).

###### Request Query {/*request-query*/}

Match against the request's query string. Specify the desired value or pattern within the **Match value** option.

###### Request URI {/*request-uri*/}

Match against the request's URL path and query string. Define a URL path that starts directly after the hostname. Exclude the protocol and hostname when defining this property.

**Sample values:** `/marketing?id=123456` and `/resources/images`

###### Request URL Path {/*request-url-path*/}

Match against the request's URL path. Define a URL path that starts directly after the hostname. Exclude the protocol, hostname, and query string when defining this property.

**Sample values:** `/marketing` and `/resources/images`

##### Operators {/*operators*/}

An operator determines how {{ PRODUCT }} will compare a match value against the request element identified by a variable.

-   **Begins with:** A match is found when the request element starts with the specified match value.
-   **Contains:** A match is found when the request element contains the specified match value.
-   **Ends with:**  A match is found when the request element ends with the specified match value.
-   **Exact match:**  A match is found when the request element is an exact match to the specified match value.

    <Callout type="info">

      Avoid enabling the **Negative match** option with the `Exact match` operator. This configuration will not yield the expected set of matches.

    </Callout>

-   **Regex:** A match is found when the request element satisfies the regular expression defined in the match value.
-   **Value match:** A match is found when the request element occurs the exact number of times defined in the match value.

    <Callout type="info">

      The `Value match` operator should only be used when the [Count option](#count) has been enabled.

    </Callout>

##### Match Value {/*match-value*/}

{{ PRODUCT }} uses a match value to identify threats.

-   **Default:** By default, {{ PRODUCT }} compares a match value against the request element identified by a variable (e.g., URL path or a request header's value).
-   **Count:** Enable the **Count** option on a variable to compare this value against the number of times that the request element identified by a variable (e.g., a specific cookie or request header) occurs within the request.

    **Example:**

    This example assumes the following configuration:

    ```
    Variable: Request header = Authentication
    Match value: 1
    ```

    We will now examine how the **Count** option affects comparisons for this configuration.
    -   **Disabled:** If the **Count** option has been disabled on the variable, then {{ PRODUCT }} will compare the value of the
        `Authentication` request header to `1`.
    -   **Enabled:** If the **Count** option has been enabled on the variable, then {{ PRODUCT }} will compare the number of times that the `Authentication` request header occurred in the request to *1*.

    <Callout type="info">

      The type of comparison that will be performed is determined by the **Operator** option.

    </Callout>

##### Match Transformations {/*match-transformations*/}

{{ PRODUCT }} can transform the source value before it inspects it. Select one or more of the following transformations to allow {{ PRODUCT }} to compare the match value against the result of each selected transformation:
-   **Lowercase:** Converts all uppercase characters to lowercase characters.
-   **None:** The source value will not be modified.
-   **Remove nulls:** Removes all null values from the source value.
-   **URL decode:** Applies URL decoding to the source value. This transformation is useful when the source value has been URL encoded twice.

## Custom Rule Administration {/*custom-rule-administration*/}

You may create, modify, and delete custom rule sets.

**Key information:**
-   Administer custom rule sets from the **Custom Rules** page.
-   Apply a custom rule set to production traffic by adding it to a [Security Application configuration](/applications/security/security_applications) and then determining how it will be enforced. Multiple Security Application configurations may use the same custom rule set. Leverage this capability to tailor security screening by application or traffic profile.
-   It may take up to 2 minutes for an updated custom rule set to be applied across our entire network.

**To create a custom rule set**
1.  Navigate to the **Custom Rules** page.
    {{ SECURITY_NAV }} **Custom Rules**.
2.  Click **+ New Custom Ruleset**.
3.  <a id="create-name" />In the **Name** option, type the unique name by which this custom rule set will be identified. This name should be sufficiently descriptive to identify it when setting up a Security Application configuration.
4.  By default, a blank rule is associated with each new custom rule. Find the rule's **Rule message** option and set it to a brief description that identifies the purpose of this rule.
5.  In the **Rule ID** option, specify a number between 66,000,000 and 66,999,999.
6.  The default rule contains a default condition. Modify this condition to determine how {{ PRODUCT }} will identify threats.

    ![Default condition](/images/v7/security/custom_rules_default_condition.png?width=450)

    1.  From the condition's **Variable** option, select the [request element](#variables) through which {{ PRODUCT }} will identify threats.

    2.  Certain variables (e.g., request cookies and request header) match on name and value. If you have selected this type of variable, then perform the following steps:

        1.  Optional. Mark the **Count** option to match by the [number of instances that a match is found](#count) instead of by inspecting that request element.
        2.  Click **+ Add Match**.
        3.  From the **Name** option, type the desired name.

            <Callout type="info">

              For example, match for requests that contain an `Authorization` header by setting this option to *Authorization*.

            </Callout>

        4.  Optional. Mark the **Negative Match** option to match for requests that do not contain a matching value for the name defined in the previous step.
        5.  If you specified a regular expression in the **Name** option, then you should mark the **Regex Match** option.
        6.  Optional. Add another match through which this variable can be satisfied by repeating steps 6.ii.a - 6.ii.e.

    3.  From the **Operator** option, select an [operator](#operators) that determines how {{ PRODUCT }} will compare the match value to the request element identified by the above variable.
    4.  In the **Match value** option, type either of the following values:

        -   **Count Option - Disabled:** Type the value that will be compared against the value associated with the request element identified by the variable selected above.
        -   **Count Option - Enabled:** Type the number of instances that a match must be found within a single request. 
        
            For example, if you are counting the `Set-Cookie` header, then this numerical value determines the number of times that the `Set-Cookie` header must be found within a request. 
    5.  From the **Match transformations** option, select each [transformation](#match-transformations) that will be applied to the source value.
    6.  Optional. Mark the **Negative Match** option to match for requests that do not contain a matching value for the value defined in step 6.iv.
7.  Optional. Click **+ Add Condition** to add another condition that must be met before a request can be flagged as a threat. Repeat step 6 for this new condition.
8.  Optional. Click **+ Add Rule** to add another rule through which {{ PRODUCT }} may identify threats. Repeat steps 6 and 7.
9. Click **Save**.

**To modify a custom rule set**
1.  Navigate to the **Custom Rules** page.
    {{ SECURITY_NAV }} **Custom Rules**.
2.  Click on the desired custom rule set.
3.  Make the desired changes.

    **Key tasks:**
    -   Delete a variable by clicking <Image inline src="/images/v7/icons/delete-3.png" alt="Delete icon" />  **Delete Variable**.
    -   Delete a match within a variable by clicking the <Image inline src="/images/v7/icons/delete-3.png" alt="Delete icon" /> icon.
    -   Delete a condition by clicking <Image inline src="/images/v7/icons/delete-3.png" alt="Delete icon" /> **Delete Condition**.

        <Callout type="info">

          A rule must have at least one condition.

        </Callout>

    -   Delete a rule by clicking the <Image inline src="/images/icons/delete.png" alt="Delete icon" /> icon that appears to the right of the **Name** option and then clicking **Confirm**.
4.  Click **Save**.

**To delete a custom rule set**

<Callout type="important">

  You cannot delete a custom rule that is associated with a Security Application configuration. Please either modify the Security Application configuration to point to a different custom rule or delete that Security Application configuration.

</Callout>

1.  Check your Security Application configurations to verify that the desired custom rule is not in use.
2.  Navigate to the **Custom Rules** page.
    {{ SECURITY_NAV }} **Custom Rules**.
3.  Click on the desired custom rule set.
3.  Click **Delete**.
4.  Click **Confirm**.

{{ security_version_control.md }}
