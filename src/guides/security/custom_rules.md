---
title: Custom Rules
---

Use custom rules to tailor how {{ PRODUCT_SECURITY }} identifies malicious traffic. This
provides added flexibility for threat identification that allows you to
target malicious traffic with minimal impact to legitimate traffic.
Custom threat identification combined with rapid testing and deployment
enables you to quickly address long-term and zero-day vulnerabilities.

<Callout type="info">

  The Custom rules capability requires {{ PRODUCT_SECURITY }} Premier or Business. {{ ACCOUNT_UPGRADE }} 

</Callout>

## Custom Rule Sets {/*custom-rule-sets*/}

A custom rule set defines how threats will be identified through rules.
Each rule contains:
-   Up to 6 conditions that define threat identification criteria.
-   A rule ID and message that will be associated with threats
    identified by this rule.

    <Callout type="tip">

      Assigning a unique ID and message to each rule makes it easy to
      identify threats detected as a result of a specific rule.

    </Callout>

    <Callout type="info">

      A rule ID must be a number between 66,000,000 and 66,999,999.

    </Callout>

<Callout type="info">

  A custom rule set may contain up to 10 rules.

</Callout>

### Threat Identification {/*threat-identification*/}

{{ PRODUCT_SECURITY }} identifies a threat when a request satisfies at least one rule in a
custom rule set. A rule is satisfied when a match is found for one or
more variable(s) in each condition. 

<Callout type="info">

  A variable identifies the request element (e.g., request
  header, query string, or request body) that {{ PRODUCT_SECURITY }} will analyze. 

</Callout>

**Example #1:**

This example assumes that your custom rule set contains the following
two rules:

| Rule | Description                                                   |
| ----------- | ----------- |
| 1    | This rule contains a single condition with a single variable. |
| 2    | This rule contains the following conditions: <br />1.  The first condition contains a single variable. <br />2.  The second condition contains two variables.              |

Assuming the above configuration, {{ PRODUCT_SECURITY }} identifies a threat under either
of the following circumstances:

-   A match is found for the variable defined in the first rule's
    condition.
-   A match is found for the variable defined in the second rule's
    first condition.

    **AND**

    A match is found for either of the variables defined in the second
    rule's second condition.

<Callout type="info">

  Certain variables match on key-value pairs. If you match on multiple
  keys within a single variable, {{ PRODUCT_SECURITY }} will only need to find one of those
  matches to satisfy that variable. For example, if you set up a request
  header variable to match for `Authorization` and
  `Content-Type`, then requests that contain either or both of
  those headers will satisfy that variable.

</Callout>

#### Conditions {/*conditions*/}

A condition determines how requests will be identified through
variables, operators, match values, transformations, and negative
matching.

##### Variables {/*variables*/}

A variable identifies the request element that {{ PRODUCT_SECURITY }} will analyze. We
support the following request elements:

<a id="asn"></a>

-   **ASN:** Identifies requests by the Autonomous System
    Number (ASN) associated with the client's IP address.

    <Callout type="tip">

      Specify a regular expression to match for multiple ASNs.

      **Example:**

      Use the following pattern to match for requests from 15133 and
      14153: `15133|14153`

    </Callout>

    <a id="country"></a>

-   **Country:** Identifies requests by the country
    from which the request originated. Specify the desired country using
    a [country code](/reference/country_codes).

    <Callout type="tip">

      Specify a regular expression to match for multiple country codes.

      **Example:**

      Use the following pattern to match for requests from the United
      States, Canada, and Mexico: `US|CA|MX`

    </Callout>

    <a id="ip-address"></a>

-   **IP address:** Identify requests by the
    requester's IPv4 and/or IPv6 address. 

    -   Specify a comma-delimited list of the desired IP address(es) 
        using standard IPv4/IPv6 and CIDR notation. 
    -   Specify a subnet by appending a slash (/) and the desired
        bit-length of the prefix (e.g., 11.22.33.0/22). 
    -   Do not specify more than 1,000 IP addresses or IP blocks.

    <Callout type="info">

      Identifying requests by IP address is only supported when a condition contains a single variable. 

    </Callout>

    **Example:** `192.0.2.20,203.0.113.0/24,2001:DB8::/32`

    <a id="request-body-parsed"></a>

-   **Request body parsed:** Match against
    all or specific key-value pair(s) in the request body for a
    URL-encoded or JSON POST request:
    -   **All:** Do not specify a key within this variable and
        specify the desired value or pattern within the **Match
        value** option.
    -   **Specific Key-Value Pair:** Define the name of the desired
        key within this variable and specify the desired value or
        pattern within the **Match value** option.

        <Callout type="info">

          Setting up a request body parsed variable also allows you to
          define whether {{ PRODUCT_SECURITY }} uses a regular expression, a negative match,
          or both when comparing the value assigned to the variable
          against key names. Use a negative match to find requests whose
          payload does not contain the specified key.

        </Callout>

    <Callout type="tip">

      Use the `Request body raw` variable to match against the
      URL-encoded request body for any type of request (e.g., XML).

    </Callout>

    <Callout type="info">

      {{ PRODUCT_SECURITY }} only inspects the first 8 KB of the request body. You may
      [restrict the request body](managed_rules#file-size-and-query-string-limits-advanced)
      for valid requests to 8 KB (8,192 bytes) through a managed rule.

    </Callout>

    **Example:**

    Match against the following request body by setting the the **Match
    value** option to *blue*. Require that this
    value be assigned to the sky key by also setting the request body
    parsed variable to `sky`.

    ```
    {
        "id": "srZf45oP34p",    
        "sky": "blue"
    }
    ```

    <a id="request-body-raw"></a>

-   **Request body raw:** Match against a
    URL-encoded request body for any type of request (e.g., XML).

    <Callout type="info">

      {{ PRODUCT_SECURITY }} only inspects the first 8 KB of the request body. You may
      [restrict the request body](managed_rules#file-size-and-query-string-limits-advanced)
      for valid requests to 8 KB (8,192 bytes) through a managed rule.

    </Callout>

    <a id="request-cookies"></a>

-   **Request cookies:** Match against all or specific
    cookies.
    -   **All:** Do not specify the desired cookie within this
        variable and specify the desired cookie value or pattern within
        the **Match value** option.
    -   **Specific Cookies:** Define the name of the desired cookie
        within this variable and specify the desired cookie value or
        pattern within the **Match value** option.

        <Callout type="info">

          Setting up a cookie variable also allows you to define whether
          {{ PRODUCT_SECURITY }} uses a regular expression, a negative match, or both when
          comparing the value assigned to the variable against cookies.
          Use a negative match to find requests whose payload does not
          contain the specified cookie.

        </Callout>

    <a id="request-header"></a>

-   **Request header:** Match against all or
    specific request headers.
    -   **All:** Do not specify the desired request header within
        this variable and specify the desired header value or pattern
        within the **Match value** option.
    -   **Specific Request Headers:** Define the name of the
        desired request header within this variable and specify the
        desired header value or pattern within the **Match
        value** option.

        <Callout type="info">

          Setting up a request header variable also allows you to define
          whether {{ PRODUCT_SECURITY }} uses a regular expression, a negative match, or both
          when comparing the value assigned to the variable against
          request headers. Use a negative match to find requests whose
          payload does not contain the specified request header.

        </Callout>

    <a id="request-method"></a>

-   **Request method:** Match against request
    method (e.g., `GET` and `POST`).

    <a id="request-query"></a>

-   **Request query:** Match against the
    request's query string. Specify the desired value or pattern within
    the **Match value** option.

    <a id="request-uri"></a>

-   **Request URI:** Match against the request's
    URL path and query string. Define a URL path that starts directly
    after the hostname. Exclude the protocol and hostname when defining
    this property.

    <Callout type="info">

      {{ PRODUCT_SECURITY }} does not transform edge CNAME URLs to CDN URLs prior to
      performing this comparison.

    </Callout>

    **Sample values:**

    `/marketing?id=123456`

    `/resources/images`

    <a id="request-url-path"></a>

-   **Request URL path:** Match against the
    request's URL path. Define a URL path that starts directly after
    the hostname. Exclude the protocol, hostname, and query string when
    defining this property.

    <Callout type="info">

      Our service does not transform edge CNAME URLs to CDN URLs prior to
      performing this comparison.

    </Callout>

    **Sample values:**

    `/marketing`

    `/resources/images`

    <a id="count"></a>

<Callout type="info">

  All variables support the ability to match on the number of
  times that a request element is found within the request. Set up a
  variable to match on the number of instances instead of inspecting the
  element for a specific value or regular expression pattern by marking
  the **Count** option.

</Callout>

<Callout type="info">

  You may define zero or more keys when setting up variables that match on
  key-value pairs. {{ PRODUCT_SECURITY }} must find at least one of the specified keys in the
  request before that variable will be satisfied. For example, if you set
  up a request header variable to match for `Authorization` and
  `Content-Type`, then requests that contain either or both of
  those headers will satisfy that variable.

</Callout>

##### Operators {/*operators*/}

An operator determines how {{ PRODUCT_SECURITY }} will compare a match value against the
request element identified by a variable.
-   **Begins with:** A match is found when the request element
    starts with the specified match value.
-   **Contains:** A match is found when the request element
    contains the specified match value.
-   **Ends with:**  A match is found when the request element ends
    with the specified match value.
-   **Exact match:**  A match is found when the request element is
    an exact match to the specified match value.

    <Callout type="info">

      Avoid enabling the **Negative match** option with the `Exact
      match` operator. This configuration will not yield the
      expected set of matches.

    </Callout>

-   **Regex:** A match is found when the request element satisfies
    the regular expression defined in the match value.
-   **Value match:** A match is found when the request element
    occurs the exact number of times defined in the match value.

    <Callout type="info">

      The `Value match` operator should only be used when the
      [Count option](#count) has been enabled.

    </Callout>

##### Match Value {/*match-value*/}

{{ PRODUCT_SECURITY }} uses a match value to identify threats.
-   **Default:** By default, {{ PRODUCT_SECURITY }} compares a match value against the
    request element identified by a variable (e.g., URL path or a
    request header's value).
-   **Count:** Enable the **Count** option on a variable to
    compare this value against the number of times that the request
    element identified by a variable (e.g., a specific cookie or request
    header) occurs within the request.

**Example:**

This example assumes the following configuration:

`Variable: Request header = Authentication`

`Match value: 1`

We will now examine how the **Count** option affects comparisons
for this configuration.
-   **Disabled:** If the **Count** option has been
    disabled on the variable, then {{ PRODUCT_SECURITY }} will compare the value of the
    `Authentication` request header to `1`.
-   **Enabled:** If the **Count** option has been enabled on
    the variable, then {{ PRODUCT_SECURITY }} will compare the number of times that the
    `Authentication` request header occurred in the request to
    *1*.

<Callout type="info">

  The type of comparison that will be performed is determined by the
  **Operator** option.

</Callout>

##### Match Transformations {/*match-transformations*/}

{{ PRODUCT_SECURITY }} can transform the source value before it inspects it. Select one or
more of the following transformations to allow {{ PRODUCT_SECURITY }} to compare the match
value against the result of each selected transformation:
-   **Lowercase:** Converts all uppercase characters to lowercase
    characters.
-   **None:** The source value will not be modified.
-   **Remove nulls:** Removes all null values from the source
    value.
-   **URL decode:** Applies URL decoding to the source value. This
    transformation is useful when the source value has been URL encoded
    twice.

## Custom Rule Administration {/*custom-rule-administration*/}

You may create, modify, and delete custom rule sets.

**Key information:**
-   Administer custom rule sets from the **Custom Rules** page.
-   Apply a custom rule set to production traffic by adding it to a
    [Security Application configuration](security_applications) and then
    determining how it will be enforced. Multiple Security Application
    configurations may use the same custom rule set. Leverage
    this capability to tailor security screening by application or
    traffic profile.
-   It may take up to 2 minutes for an updated custom rule set to be
    applied across our entire network.

**To create a custom rule set**
1.  Navigate to the **Custom Rules** page.
    {{ SECURITY_NAV }} **Custom Rules**.
2.  Click **Add Custom Rule**.
3.  In the **Name** option, type the unique name by which this
    custom rule set will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    configuration.
4.  Create a custom rule by clicking **+ Add Rule**. Find the rule's **Name**
    option and set it to a name that identifies
    the purpose of this rule.
5.  In the **Rule ID** option, specify a number between
    66,000,000 and 66,999,999.
6.  In the **Rule message** option, type a brief description for
    this rule.
7.  The default rule contains a default condition. Modify this condition
    to determine how {{ PRODUCT_SECURITY }} will identify threats.
    1.  From the condition's **Variable** option, select the
        request element through which {{ PRODUCT_SECURITY }} will identify threats.

        [Learn more about variables.](#variables)

    2.  Certain variables (e.g., request cookies and request header)
        match on name and value. If you have selected this type of
        variable, then perform the following steps:

        1.  Click **+ Add Match**.
        2.  From the **Name** option, type the desired name.

            <Callout type="info">

              For example, match for requests that contain an
              `Authorization` header by setting this option to
              *Authorization*.

            </Callout>

        3.  Optional. Mark the **Negative Match** option to match
            for requests that do not contain a matching value for the
            name defined in the previous step.
        4.  If you specified a regular expression in the **Name**
            option, then you should mark the **Regex Match**
            option.
        5.  Optional. Add another match through which this variable can
            be satisfied by repeating steps 7.2.1 - 7.2.4.
    3.  Optional. Mark the **Count** option to match by the
         number of instances that a match is found instead of by
         inspecting that request element.

        [Learn more.](#count)

    4.  Optional. Click **+ Add Variable** to add another
        variable through which this request may be satisfied. Repeat
        steps 7.1 - 7.3.

        <Callout type="info">

          If you would like to a use a different match value for this
          variable, then you should create a new rule. Alternatively, if
          you would like to require both variables prior to threat
          identification, then you should add it as a new condition to
          this rule.

        </Callout>

    5.  From the **Operator** option, select an operator that
        determines how {{ PRODUCT_SECURITY }} will compare the match value to the request
        element identified by the above variable.

        [Learn more.](#operators)

    6.  In the **Match value** option, type the value that will
        be compared against the request element identified by the above
        variable.
    7.  From the **Match transformations** option, select each
        transformation that will be applied to the source value.

        [Learn more.](#match-transformations)

    8.  Optional. Mark the **Negative Match** option to match
        for requests that do not contain a matching value for the
        value defined in step 7.6.
8.  Optional. Click **+ Add Condition** to add another
    condition that must be met prior to threat identification. Repeat
    step 7 for this new condition.
9.  Optional. Click **+ Add Rule** to add another rule through
    which {{ PRODUCT_SECURITY }} may identify threats. Repeat steps 7 and 8.
10. Click **Submit**.

**To modify a custom rule set**
1.  Navigate to the **Custom Rules** page.
    {{ SECURITY_NAV }} **Custom Rules**.
2.  Click on the desired custom rule set.
3.  Make the desired changes.

    **Key tasks:**
    -   Delete a variable by clicking <img data-inline-img src="/images/v7/icons/delete-3.png" alt="Delete icon" />  **Delete Variable**.
    -   Delete a match within a variable by clicking the <img data-inline-img src="/images/v7/icons/delete-3.png" alt="Delete icon" /> icon.
    -   Delete a condition by clicking <img data-inline-img src="/images/v7/icons/delete-3.png" alt="Delete icon" /> **Delete Condition**.

        <Callout type="info">

          A rule must have at least one condition. 

        </Callout>

    -   Delete a rule by clicking the <img data-inline-img src="/images/icons/delete.png" alt="Delete icon" /> icon that appears to the right of the **Name** option and then clicking **Confirm**.
4.  Click **Submit**.

**To delete a custom rule set**

<Callout type="important">

  You cannot delete a custom rule that is associated with a Security
  Application configuration. Please either modify the Security
  Application configuration to point to a different custom rule or
  delete that Security Application configuration.

</Callout>

1.  Check your Security Application configurations to verify
    that the desired custom rule is not in use.
2.  Navigate to the **Custom Rules** page.
    {{ SECURITY_NAV }} **Custom Rules**.
3.  Click on the desired custom rule set.
3.  Click **Delete**.
4.  Click **Confirm**.

