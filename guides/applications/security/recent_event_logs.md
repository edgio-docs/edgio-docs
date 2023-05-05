---
title: Recent Event Logs
---

{{ PRODUCT }} provides log data for recent events within the {{ PORTAL }}. Use this log data to analyze specific requests that were flagged as violations of your security policy, exceeded your rate limit, or were classified as bot traffic.

**To view recent event logs**
1.  Navigate to the **Logs** page.
    {{ SECURITY_NAV }} **Logs**.
    
    By default, the dashboard displays recent log events for [threats](#threat-log-data) (i.e., access rule, custom rule, and managed rule violations).

2.  Optional. Click on the [Bot](#bot-log-data), [Rates](#rate-limit-log-data), or [Rate Enforcement](#rate-enforcement-log-data) tab to view recent log events for bot traffic or rate limiting.

## Threat Log Data {/*threat-log-data*/}

The **Threats** tab contains log events for recent access rule, custom rule, or managed rule violations. The header bar for each violation contains the following information:
-   `<Rule Message>`**:** Identifies the rule that was violated.
-   `<Elapsed Time>`**:** Indicates the amount of time that has passed since the request was screened.
-   `<Time>`**:** Indicates the time (UTC) at which the request was screened.

**Syntax:** 

`<Rule Message>    [<Elapsed Time>  <Time>]`

**Example:** 

`Access rule for Marketing site [10s ago 15:01:23.45 UTC]`

### Threat Log Fields {/*threat-log-fields*/}

Clicking on an event (i.e., rule violation) expands that entry to show detailed information about it. Each event field is described below.
-   **Timestamp:** Indicates the point-in-time at which the rule violation occurred. This timestamp is reported using a 24 hour time format (UTC/GMT).

    **Format:** 

    `<YYYY>-<MM>-<DD> <hh>:<mm>:<ss>.<milliseconds>`

    **Example:** 

    `{{ YEAR }}-07-08 15:00:22.123`

-   **Managed Rules Name:** Indicates the name of the managed rule set that was violated. If a managed rule was not violated, then this field will be empty.
-   **Rule Message:** Provides a description of the rule that the request violated. The syntax for this field varies according to the type of rule that was violated.  
    -   **Managed Rule Set - Anomaly Score:** This field indicates the request's anomaly score and the last rule that it violated. Please refer to the **Sub Event(s)** section, which contains a [sub event](#sub-events) for each rule violated by a request, to find out why the request was flagged or blocked. Each sub event indicates the rule that was violated and the data used to identify the violation. 

        `Inbound Anomaly Score Exceeded (Total Score: <#>): Last Matched Message: <Rule Message>`

    -   **Syntax (All Other Rule Sets):**

        `<Rule Message>`

-   **Event ID:** Indicates the system-defined ID assigned to this event (i.e., rule violation).
-   **Security Application Name:** Indicates the name of the Security Application Manager configuration that was assigned the rule set that was triggered.
-   **Profile Type:** Indicates whether the request was screened as a result of a production or audit rule.
-   **Country Name:** Identifies the country from which the request originated by its name.
-   **Action Type:** Indicates the type of action that was taken in response to the rule violation. Valid values are:
    -   **BLOCK_REQUEST:** Indicates that the request that violated a rule was blocked.
    -   **ALERT:** Indicates that an alert was generated in response to the rule violation.
    -   **REDIRECT_302:** Indicates that the request that violated a rule was redirected to the URL associated with the instance defined by the **Instance Name** field.
    -   **CUSTOM_RESPONSE:** Indicates that a custom response was returned to the client that submitted a request that violated a rule.
-   **Client IP:** Identifies the IP address of the client from which the request originated.
-   **URL:** Indicates the URL of the request that triggered the rule violation.
-   **Referer:** Indicates the request’s referrer as defined by the `Referer` request header.
-   **User Agent:** Indicates the user agent that submitted the request that triggered the rule violation. 
    This information is derived from the `User-Agent` request header.

#### Sub Events {/*sub-events*/}

In addition to the core set of fields described above, a sub event for
each rule that was violated by the request will be reported. The syntax
for the header bar associated with each sub event is described below.

`Rule ID: <Rule ID>`

`Rule Message: <Rule Message>`

Each sub event contains the following fields:

-   **Matched On:** Indicates a [variable](/applications/security/matched_on_variables) that identifies where the violation was found.
-   **Matched Value:** Indicates the value of the variable defined by the **Matched On** field.  

<Callout type="info">

  Standard security practices dictate that measures should be taken to prevent sensitive data (e.g., credit card information or passwords) from being passed as clear text from the client to your origin server. Another incentive for encrypting sensitive data is that it will be logged by our system when an alert is triggered as a result of this data. If sensitive data cannot be encrypted or obfuscated, then it is strongly recommended to contact our technical customer support to disable logging for the **Matched Value** field.

</Callout>

-   **Rule ID:** Indicates the ID for the rule that the request violated.
-   **Rule Message:** Provides a description of the rule that the request violated.
-   **Operator Name:** Indicates how the system interpreted the comparison between the **Operator Parameter** and the **Matched Value** fields. Common operators are:
    -   **BEGINSWITH:** Begins with. Identifies a match due to a request element that started with the specified match value. 
    -   **CONTAINS:** Contains. Identifies a match due to a request element that contained the specified match value. 
    -   **ENDSWITH:** Ends with. Identifies a match due to a request element that ended with the specified match value. 
    -   **STREQ:** Exact match. Identifies a match due to a request element that was an exact match to the specified match value. 
    -   **RX:** Regex. Identifies a match due to a request element that satisfied the regular expression defined in the match value.
    -   **EQ:** Value match. Identifies a match due to a request element 
        that occurred the exact number of times defined in your custom rule. 
    -   **IPMATCH:** IP Address. Identifies a match due to the request's IP 
        address either being contained within an IP block or that was an 
        exact match to an IP address defined in your custom rule.
-   **Operator Parameter:** Indicates the source or the value that was compared against the **Matched Value** field.           
-   **Rule Tags:** Indicates the tags associated with the rule that the 
    request violated. These tags may be used to determine whether a rule, 
    access control, or global setting was violated.  

    **Naming convention:**

    `<Rule Set>/<Category>/<Subcategory>`

    <Callout type="info">

      `<Category>` identifies whether the request violated a rule, an access control, or the delivery profile.

    </Callout>

    **Example values:**

    -   **Policy:** The following sample values identify a policy:

        `OWASP_CRS/PROTOCOL_VIOLATION/INVALID_HREQ`
        `OWASP_CRS/WEB_ATTACK/SQL_INJECTION`

    -   **Blacklist:** The following sample values identify a blacklist criterion:

        `BLACKLIST/IP`
        `BLACKLIST/COUNTRY`
        `BLACKLIST/REFERRER`
        `BLACKLIST/URL`

    -   **Setting:** The following sample values identify a setting:

        `OWASP_CRS/POLICY/SIZE_LIMIT`

-   **Total Anomaly Score:** Indicates the anomaly score assigned to the request. This score is determined by the number of rules that were violated and their severity.

## Bot Log Data {/*bot-log-data*/}

The **Bot** tab contains log events for recent requests that were flagged as bot traffic. Each request is described as follows:

`Enforced Rule: <Rule>  <Elapsed Time>  <Time>`

-   `<Rule>`**:** Identifies the rate rule that was violated by its
    name.
-   `<Elapsed Time>`**:** Indicates the amount of time that has passed since
    the request was screened.
-   `<Time>`**:** Indicates the time (UTC) at which the
    request was screened.

A sample rule violation is provided below.

`Enforced Rule: Marketing [10s ago 12:00:00.00 UTC]`

### Bot Log Fields {/*bot-log-fields*/}

A brief description for each field used to describe/categorize bot traffic is provided below.

-   **Bot Rules Name:** Indicates the name of the bot rule set that triggered the browser challenge.
-   **Browser Challenge Status:** Indicates the reason why a browser challenge was served. Valid values are:  
    -   **CHAL_STATUS_NONE:** Indicates that a browser challenge was not issued.
    -   **CHAL_STATUS_IP_MISMATCH:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a token is shared or the user's IP address is modified after the initial token was generated.  
    -   **CHAL_STATUS_NO_TOKEN:** Indicates that a browser challenge was served for a new session.  
    - **CHAL_STATUS_TOKEN_CORRUPTED:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a user agent submits a request that includes a token that our service cannot decrypt.  
    -   **CHAL_STATUS_TOKEN_EXPIRED:** Indicates that a browser challenge was served due to an expired token. This status is typically reported when a user agent (e.g., web browser) submits a request after the expiration of the previously solved browser challenge. 

        <Callout type="tip">

          You may configure the duration for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge through the [Security Application](/applications/security/security_applications#bot-rule-configuration)'s **Valid for (in minutes)** option.  

        </Callout>

    -   **CHAL_STATUS_UA_MISMATCH:** Indicates that a browser challenge was served due to an invalid token. This status is typically reported when a token is shared with another user agent (e.g., web browser) within the same machine.  
    -   **CHAL_STATUS_WRONG_ANSWER:** Indicates that a browser challenge was served because the user was unable to solve the previous browser challenge. This status may also be reported when the user agent (e.g., web browser) submits a tampered token.
-   **Client IP:** Identifies the IP address (IPv4) of the client from which the request originated.
-   **Country Name:** Identifies the country from which the request originated.
-   **Matched On:** Indicates a [variable](/applications/security/matched_on_variables) that identifies where the violation was found.
-   **Matched Value:** Indicates the value of the variable defined by the **Matched On** field.  

    <Callout type="info">

      Standard security practices dictate that measures should be taken to prevent sensitive data (e.g., credit card information or passwords) from being passed as clear text from the client to your origin server. Another incentive for encrypting sensitive data is that it will be logged by our system when an alert is triggered as a result of this data. If sensitive data cannot be encrypted or obfuscated, then it is strongly recommended to contact our technical customer support to disable logging for the **Matched Value** field.

    </Callout>

-   **Referer:** Indicates the request's referrer as defined by the `Referer` request header. A referrer identifies the address of the resource that linked to the requested content.
-   **Request Method:** Indicates the request's HTTP method.  

    **Format:**

    `HTTP_METHOD_<NAME>`

    **Example:**

    `HTTP_METHOD_GET`

-   **Rule ID:** Indicates the ID of the rule that triggered the browser challenge.
-   **Rule Message:** Indicates the message of the rule that triggered the browser challenge.
-   **Security Application Name:** Indicates the name of the Security Application configuration that was assigned the bot rule set that was triggered.
-   **Timestamp:** Indicates the date and time (UTC) at which the browser challenge was issued.

    <Callout type="info">

      This field is only available from within the Event Log view. Requests may not be filtered by this field. Filter by time through the **Time Range** option that appears on the left-hand side of the dashboard.

    </Callout>

    <Callout type="info">

      Local time is displayed on the right-hand side of the event log entry header that appears directly above this field.

    </Callout>

-   **Token Validity Duration:** Indicates the number of minutes for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge.
-   **URL:** Indicates the URL for which a browser challenge was issued.
-   **User Agent:** Indicates the user agent (e.g., web browser) that submitted the request that resulted in a browser challenge. A request's user agent is defined in the `User-Agent` request header.

## Rate Limit Log Data {/*rate-limit-log-data*/}

The **Rates** tab contains log events for recent requests that were rate limited. Each request is described as follows:

`Enforced Rule: <Rule>  <Elapsed Time> <Time>`

`Action Type: <Action Type>`

The above terms are defined as follows:
-   `<Rule>`**:** Identifies the rate rule that was violated by its
name.
-   `<Elapsed Time>`**:** Indicates the amount of time that has passed since
the request was screened. 
-   `<Time>`**:** Indicates the time (UTC) at which the
request was screened.
-   `<Action Type>`**:** Represents the type of action that was applied
to the rate limited request. This action is determined by the rate rule
that it violated.

A sample rule violation is provided below.

`Enforced Rule: Marketing [10s ago 12:00:00.00 UTC]`

`Action Type: CUSTOM-RESPONSE`

### Rate Limit Log Fields {/*rate-limit-log-fields*/}

A brief description for each field used to describe/categorize rate limited requests is provided below.
-   **Client IP:** Identifies the IP address (IPv4) of the client from which the request originated.
-   **Country Name:** Identifies the country from which the request originated.
-   **Action Type:** Indicates the action (e.g., `CUSTOM-RESPONSE`) that was applied to the rate limited request.
-   **Referer:** Indicates the request's referrer as defined by the `Referer` request header. A referrer identifies the address of the resource that linked to the requested content.   
-   **Request Method:** Indicates the request's HTTP method.

    **Format:**

    `HTTP_METHOD_<NAME>`

    **Example:**

    `HTTP_METHOD_GET`

-   **Rule Name:** Indicates the name of the rule that was applied to the rate limited request.   
-   **Timestamp:** Indicates the date and time (UTC) at which the request was rate limited.

    <Callout type="info">

      This field is only available from within the Event Log view. Requests may not be filtered by this field. Filter by time through the **Time Range** option that appears on the left-hand side of the dashboard.

    </Callout>

    <Callout type="info">

      Local time is displayed on the right-hand side of the event log entry header that appears directly above this field.

    </Callout>
-   **URL:** Indicates the URL of the request that was rate limited.   
-   **User Agent:** Indicates the user agent that submitted the request that was rate limited. A request's user agent is defined in the `User-Agent` request header.             

## Rate Limit Enforcement Log Data {/*rate-limit-enforcement-log-data*/}

The **Rate Enforcement** tab contains log events for recent rate limit enforcement events. Each enforcement event is described as follows:

`Enforced Rule: <Rule>  <Elapsed Time> <Time>`

`Action Type: <Action Type>`

The above terms are defined as follows:
-   `<Rule>`**:** Identifies the rate rule that was violated by its name.
-   `<Elapsed Time>`**:** Indicates the amount of time that has passed since the request was screened. 
-   `<Time>`**:** Indicates the time (UTC) at which the request was screened.
-   `<Action Type>`**:** Represents the type of action that was applied to the rate limited request. This action is determined by the rate rule
that it violated.

A sample rule violation is provided below.

`Enforced Rule: Drop Traffic [10s ago 12:00:00.00 UTC]`

`Action Type: drop-request`

### Rate Limit Enforcement Log Fields {/*rate-limit-enforcement-log-fields*/}

A brief description for each field used to describe/categorize rate
limiting enforcement is provided below.

-   **Action Name:** Indicates the name of the action that was applied to rate limited requests as a result of this enforcement event. 

<!--
    <Callout type="tip">

      Assign names to actions by defining your rate rule through our REST API.

    </Callout>
-->

-   **Action Type:** Indicates the type of action (e.g., `custom-response`) that was applied to rate limited requests as a result of this enforcement event.
-   **Rule Name:** Indicates the name of the rule whose threshold was exceeded.
-   **Timestamp:** Indicates the date and time (UTC) at which rate limiting enforcement was initiated.

    <Callout type="info">

      This field is only available from within the Event Log view. Requests may not be filtered by this field. Filter by time through the **Time Range** option that appears on the left-hand side of the dashboard.         

    </Callout>
