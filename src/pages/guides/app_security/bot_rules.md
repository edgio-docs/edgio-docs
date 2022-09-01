---
title: Bot Rules
---

Use bot rules to require a client (e.g., a web browser) to solve a
challenge before resolving the request. {{ PRODUCT_SECURITY }} blocks traffic when the
client cannot solve this challenge within a few seconds. Basic bots
typically cannot solve this type of challenge and therefore their
traffic is blocked. This prevents them from scraping your siteRefers to
harvesting data from your site., carding, spamming your forms,
launching DDoS attacks, and committing ad fraud.

<Callout type="important">

  Solving a challenge requires a JavaScript-enabled client. Users that
  have disabled JavaScript on their browsing session will be unable to
  access content protected by bot rules.

</Callout>

<Callout type="important">

  We strongly recommend that you avoid applying bot rules to
  machine-to-machine interactions. For example, applying bot rules to API
  traffic will disrupt your API workflow.

</Callout>

## How Does It Work? {/*how-does-it-work*/}

Content protected by bot rules undergoes the following workflow:

1.  Browser Challenge

    {{ PRODUCT_SECURITY }} sends a browser challenge in response to requests for content
    protected by bot rules. It is up to the client to solve this
    challenge within a few seconds.
2.  Response

    The results of the above browser challenge determines what happens
    next.
    -   **Solved:** If the client is able to solve the challenge,
        then our CDN serves the requested content. Additionally, a
        cookie will be added to the user's session. This cookie
        instructs our CDN to serve content to the user without requiring
        a browser challenge. Once the cookie expires, new requests for
        content protected by bot rules will once again require the
        client to solve a challenge.

        <Callout type="info">

          Define the duration for this cookie through the **Valid for (in
          minutes)** option when setting up the enforcement of bot
          rules within your Security Application configuration.

        </Callout>

    -   **Unsolved:** If the client is unable to solve the
        challenge, then our CDN responds with a new browser challenge.

## Bot Rule Sets {/*bot-rule-sets*/}

A bot rule set defines the set of requests that will be protected by bot
rules. Each rule contains:

-   Up to 6 conditions that define request identification criteria.
-   A rule ID and message that will be associated with requests
    identified by this rule.

    <Callout type="tip">

      Assigning a unique ID and message to each rule makes it easy to
      identify requests detected as a result of a specific rule.

    </Callout>

    <Callout type="info">

      A rule ID must be a number between 77,000,000 and 77,999,999.

    </Callout>

<Callout type="info">

  A bot rule set may contain up to 10 rules.

</Callout>

### Request Identification {/*request-identification*/}

{{ PRODUCT_SECURITY }} identifies a request when it satisfies at least one rule in a bot
rule set. The manner in which a rule is satisfied varies by type.

-   **Custom Matches:** This type of rule is satisfied when a match is
    found for each of its conditions. A condition determines request
    identification by defining what will be matched (i.e., variable),
    how it will be matched (i.e., operator), and a match value.

    <Callout type="info">

      Certain variables match on key-value pairs. If you match on multiple
      keys within a single variable, {{ PRODUCT_SECURITY }} will only need to find one of
      those matches to satisfy that variable.
    
      For example, if you set up a request header variable to match for
      `Authorization` and `Content-Type`, then requests
      that contain either or both of those headers will satisfy that
      variable.

    </Callout>

-   **Edgecast Reputation DB:** This type of rule is satisfied when
    the client's IP address matches an IP address defined within our
    reputation database. Our reputation database contains a list of
    IP addresses known to be used by bots.

**Example #1:**

This example assumes that your bot rule set contains the following two
rules:

| Rule | Type           | Description                            |
|------|----------------|----------------------------------------|
| 1    | Custom matches | This rule contains a single condition. |
| 2    | Custom matches | This rule contains two conditions.     |

Assuming the above configuration, {{ PRODUCT_SECURITY }} applies bot rules protection under
either of the following circumstances:

-   A match is found for the variable defined in the first rule's
    condition.
-   A match is found for the variables defined in both of the second
    rule's conditions.

**Example #2:**

This example assumes that your bot rule set contains the following two
rules:

| Rule | Type                   | Description                                                                                                |
|------|------------------------|------------------------------------------------------------------------------------------------------------|
| 1    | Custom matches         | This rule contains two conditions.                                                                         |
| 2    | Edgecast Reputation DB | This rule is satisfied when the client's IP address matches an IP address within our reputation database. |

Assuming the above configuration, {{ PRODUCT_SECURITY }} applies bot rules protection under
either of the following circumstances:

-   A match is found for the variables defined in both of the first
    rule's conditions.
-   The client's IP address matches an IP address within our reputation
    database.

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

    <a id="request-query-string"></a>

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

## Bot Rule Administration {/*bot-rule-administration*/}

You may create, modify, and delete bot rule sets.

**Key information:**
-   Administer bot rule sets from the **Bot Rules** page.
-   Apply a bot rule set to production traffic by adding it to a
    [Security Application configuration](security_applications) and then
    determining how it will be enforced. Multiple Security Application
    configurations may use the same bot rule set. Leverage this
    capability to tailor security screening by application or traffic
    profile.
-   It may take up to 2 minutes for an updated bot rule set to be
    applied across our entire network.

**To create a bot rule set**
1.  Navigate to the **Bot Rules** page.
    {{ SECURITY_NAV }} **Bot Rules**.
2.  Click **Add Bot Rule**.
3.  In the **Name** option, type the unique name by which this
    bot rule set will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    configuration.
4.  In the **Rule type** option, select the type of rule that
    will be created.
    -   **Custom Matches:** This type of rule is satisfied when a
        match is found for each of its conditions.
        1.  In the **Name** option, type a name that identifies the purpose of this rule.
        2.  In the **Rule ID** option, specify a number between 77,000,000 and 77,999,999.
        3.  In the **Rule message** option, type a brief description for this rule.
        4.  A custom matches rule automatically includes a default condition. Modify this condition to determine how {{ PRODUCT_SECURITY }} will identify requests. From the condition's **Variable** option, select the request element through which {{ PRODUCT_SECURITY }} will identify requests.

            [Learn more about variables.](#variables)

        5.  Certain variables (e.g., request cookies and request header) match on name and value. If you have selected this type of variable, then perform the following steps:
            1.  Click **+ Add Match**.
            2.  From the **Name** option, type the desired name.

            For example, match for requests that contain an `Authorization` header by setting this option to ***Authorization***.

            3.  Optional. Mark the **Negative Match** option to match for requests that do not contain a matching value for the name defined in the previous step.
            4.  If you specified a regular expression in the **Name** option, then you should mark the **Regex Match** option.
            5.  Optional. Add another match through which this variable can be satisfied by repeating steps 4.5.1 - 4.5.4.
        6.  Optional. Mark the **Count** option to match by the number of instances that a match is found instead of by inspecting that request element.

            [Learn more.](#count)

        7.  From the **Operator** option, select an operator that determines how {{ PRODUCT_SECURITY }} will compare the match value to the request element identified by the above variable.

            [Learn more.](#operators)

        8.  In the **Match value** option, type the value that will be compared against the request element identified by the above variable.
        9.  Optional. Mark the **Negative Match** option to match for requests that do not contain a matching value for the value defined in step 4.6.
        10. Optional. Click **+ Add Condition** to add another condition that must be met prior to request identification. Repeat steps 4.1 - 4.9 for this new condition.
    -   **Edgecast Reputation DB:** This type of rule is satisfied
        when the client's IP address matches an IP address within our
        reputation database. Proceed to the next step.
5.  Optional. Click **Add Rule** to add another rule through
    which {{ PRODUCT_SECURITY }} may identify requests. Repeat step 4.
6.  Click **Save**.

**To modify a bot rule set**
1.  Navigate to the **Bot Rules** page.
    {{ SECURITY_NAV }} **Bot Rules**.
2.  Click on the desired bot rule set.
3.  Make the desired changes.

    **Key tasks:**
    -   Change the [type of rule](#request-identification) from the **Rule
        type** option.
    -   **Custom matches only:**

        Delete variables and matches within a variable by clicking the <img data-inline-img src="/images/icons/remove.png" alt="Delete" /> (delete) icon.
    -   **Custom matches only:**

        Delete a condition by clicking **Delete Condition**.

        <Callout type="info">

          A rule must have at least one condition. Therefore, you cannot
          delete the root condition.

        </Callout>

    -   Delete a rule by clicking **Delete Rule** and then
        clicking **Confirm**.
4.  Click **Save**.

**To delete a bot rule set**

<Callout type="important">

  You cannot delete a bot rule that is associated with a Security
  Application configuration. Please either modify the Security
  Application configuration to point to a different bot rule or
  delete that Security Application configuration.

</Callout>

1.  Check your Security Application configurations to verify
    that the desired bot rule is not in use.
2.  Navigate to the **Bot Rules** page.
    {{ SECURITY_NAV }} **Bot Rules**.
3.  Click on the desired bot rule set.
4.  Click **Delete Bot Rule Profile**.
5.  Type *DELETE*.
6.  Click **Delete**.
