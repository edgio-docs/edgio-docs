---
title: Security Application Manager
---

The **Security Application Manager** page contains the Security App configurations that {{ PRODUCT }} may use to screen your traffic. Traffic is screened using the first eligible Security App configuration according to the order in which they are listed. 

[Learn more about threat detection.](/applications/security/waf#threat-detection)

## Security Apps {/*security-apps*/}

A Security App configuration:
-   [Identifies the set of traffic](#identifying-traffic-for-inspection) that will undergo security screening by hostname, a URL path, or both.
-   Determines how [threats will be detected](#threat-detection) through:
    -   **Access Rules:** An access rule identifies legitimate traffic and threats through access control lists.
    -   **API Security Ruleset:** An API Security rule validates the payload for `POST`, `PUT`, and `PATCH` requests against a JSON schema.
    -   **Rate Rules:** A rate rule defines the rate of traffic that may be directed to one or more web sites.
    -   **Bot Manager:** A bot manager configuration identifies bot traffic.
    -   **Custom Rules:** A custom rule identifies threats using custom criteria that takes into account your site's traffic profile to avoid false positives.
    -   **Managed Rules:** A managed rule identifies threats through threat detection policies.
    -   **Client-Side Protection Policy:** A Client-Side Protection policy detects and mitigates attacks, such as cross-site scripting (XSS) and code injection, by applying a Content Security Policy to your traffic.
-   Determines how violations of your access rules, API security rulesets, rate rules, custom rules, and managed rules are [enforced](#enforcement).
-   Allows you to audit new access rules, API Security rules, custom rules, and managed rules without impacting production traffic and while keeping your applications secure with known configurations.

    From the **Security** dashboard, click **WAF Events** and then filter by `Profile Type = AUDIT` to isolate and analyze threats detected as a result of an audit of new access rules,  API Security rules, custom rules, and managed rules.

    <Callout type="info">

      The ability to secure and audit your production traffic using separate configurations requires {{ PRODUCT }} Premier, Business, or Essentials. {{ ACCOUNT_UPGRADE }}

    </Callout>

## <a id="traffic-identification" />Identifying Traffic for Inspection {/*identifying-traffic-for-inspection*/}

Restrict the set of traffic that will be screened by this Security App configuration by hostname, URL path, or both.

### Host {/*host*/}

By default, a Security App configuration applies to all hosts. However, you may restrict security screening to requests to one or more hosts. 

**Key information:**
-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} compares the entire `Host` header value against the specified value.
-   The `Host` header identifies either a hostname or IP address using the following syntax:

    `<Host>`

    `<Host>:<Port>`

-   The CDN only accepts HTTP/HTTPS requests on standard ports (i.e., 80 and 443). Typically, a `Host` request header does not include port information for standard ports. However, the requesting user agent defines the `Host` request header submitted to the CDN.
-   For the purpose of this comparison, the hostname defined by this match condition will not be resolved to an IP address.
-   For the purpose of this comparison, an origin configuration's **Override Host Header** option is irrelevant.
-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} supports various comparison modes (i.e., exact match, wildcard, and regular expression).

    [Learn more.](#match-comparison-modes)

### URL Path {/*url-path*/}

By default, a Security App configuration applies to all URL paths. However, you may restrict security screening to requests to one or more URL paths. {{ PRODUCT }} {{ PRODUCT_SECURITY }} compares the entire URL path against the specified value.

**Key information:**
-   URL path comparisons start directly after the hostname.

    `/<Path>/<Asset>`

    **Example:**

    `/marketing/brochures/widget.htm`

-   A partial match does not count towards the rate limit.

    **Example:**

    Given the above sample configuration, the following request would not count towards the rate limit:

    `http://cdn.example.com/marketing/brochures/widget.html`

-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} supports various comparison modes (i.e., exact match, wildcard, and regular expression).

    [Learn more.](#match-comparison-modes)

### Match Comparison Modes {/*match-comparison-modes*/}

Your Security App configuration determines how {{ PRODUCT }} {{ PRODUCT_SECURITY }} compares a request's host or URL path against the specified value. The available modes are listed below.
-   **Default:** {{ PRODUCT }} {{ PRODUCT_SECURITY }} will not perform a comparison. It will apply the current Security App configuration to all hosts or URL paths.
-   [Exact match (multiple entries):](#exact-match-multiple-entries) Use this mode to specify each desired value.
-   [Wildcard match:](#wildcard-match) Use this mode to specify a wildcard pattern.
-   [Regex match:](#regex-match) Use this mode to specify a regular expression.

<Callout type="info">

  Wildcard and regular expression match comparison modes require {{ PRODUCT }} Premier, Business, or Essentials. {{ ACCOUNT_UPGRADE }}

</Callout>

#### Exact Match (Multiple Entries) {/*exact-match-multiple-entries*/}

{{ PRODUCT }} {{ PRODUCT_SECURITY }} compares the specified value(s) against the entire host or URL path.
It will only apply this Security App configuration to a request when one of the specified value(s) is an exact match. This comparison is case-sensitive.

| Sample Configuration | Matches  | Does Not Match  |
|---|---|---|
| cat | cat | Cat <br /> Category <br /> Moscato |
| bat | bat | Bat <br /> Batch |

#### Wildcard Match {/*wildcard-match*/}

{{ PRODUCT }} {{ PRODUCT_SECURITY }} checks whether the entire host or URL path is a case-sensitive match for the wildcard pattern. The supported set of wildcards are listed below.
-   **\*:** Matches zero or more characters.
    -   **Example:** `cat*`
    -   **Matches:** `cat | category | muscat`
    -   **Does not match:** `cAt | Category`
-   **?:** Matches a single character.
    -   **Example:** `cat?`
    -   **Matches:** `cats | muscats`
    -   **Does not match:** `Cats | cat`
-   **[*abc*]:** Matches a single character defined within the brackets.
    -   **Example:** `[cm]art`
    -   **Matches:** `cart | mart`
    -   **Does not match:** `tart | start`
-   **[*a*-*z*]:** Matches a single character from the specified range.
    -   **Example:** `[a-z]art`
    -   **Matches:** `cart | mart | tart`
    -   **Does not match:** `Cart | marT | start`
-   **[!*abc*]:** Matches a single character that is not defined within the brackets.
    -   **Example:** `[!cm]art`
    -   **Matches:** `Cart | Mart | tart`
    -   **Does not match:** `cart | mart | tArt`
-   **[!*a*-*z*]:** Matches a single character that is excluded from the specified range.
    -   **Example:** `[!a-m]art`
    -   **Matches:** `Cart | Mart | tart`
    -   **Does not match:** `cart | mart | tArt`

**Example:**

Setting the `URL path(s)` option to the following value allows {{ PRODUCT }} {{ PRODUCT_SECURITY }} to apply this Security App configuration to any request whose URL path starts with */marketing/*: `/marketing/*`

The following sample request will match the above pattern:

`https://cdn.example.com/marketing/mycampaign/image.png`

#### Regex Match {/*regex-match*/}

{{ PRODUCT }} {{ PRODUCT_SECURITY }} checks whether the entire host or URL path is a match for the pattern defined in a regular expression.

<Callout type="info">

  Regular expressions are case-sensitive.

</Callout>

**Example:** `^[a-zA-Z0-9]*$`

**Matches:** `cat` | `CAT7` | `Category`

**Does Not Match:** `Category 7` | `Cat#7`

## Threat Detection {/*threat-detection*/}

Identify threats by adding the following rule(s) to your Security App configuration:
-   **Access Rules:** An [access rule](/applications/security/access_rules) identifies legitimate traffic and threats through access control lists.
-   **API Security Ruleset:** An [API Security rule](/applications/security/api_security) identifies threats by validating the payload of `POST`, `PUT`, and `PATCH` requests against a JSON schema.
-   **Rate Rules:** A [rate rule](/applications/security/rate_rules) defines a limit for the rate at which your content may be requested.

    Requests that originate from rate limited clients will not count towards the rate limit. Upon the expiration of the time period defined in the **Time period** option, we will resume counting these requests. If the client exceeds the rate limit again, then this action will be reapplied to it for the duration defined by this option. A "client" is defined by each rate rule's **Apply rate limit to** option. [Learn how rate limits are applied to clients.](/applications/security/rate_rules#how-does-it-work)

-   **Bot Manager:** A [bot manager configuration](/applications/security/bot_rules) determines how bot traffic will be detected and the enforcement action that will be applied to bot traffic.

    <Callout type="info">

      Bot Manager Standard is restricted to serving browser challenges.

    </Callout>

-   **Custom Rules:** A [custom rule](/applications/security/custom_rules) identifies threats using custom criteria that takes into account your site's traffic profile to avoid false positives.
-   **Managed Rules:** A [managed rule](/applications/security/managed_rules) identifies threats through threat detection policies.

<a id="enforcement-mode"></a>

### Threat Detection Mode {/*threat-detection-mode*/}

You may apply an access, custom, or managed rule in one of the following modes:
-   **Production:** This mode secures your application by allowing you to choose from a variety of actions through which your security policy will be [enforced](#enforcement).
-   **Audit:** This mode allows you to test new security policies without impacting production traffic. Requests that are identified as threats are logged. Use the **Threats** tab of the **Security** dashboard to analyze detected
    threats and check for false positives. You should apply this security policy to production traffic once you are confident that it will generate minimal false positives.

    **Key information:**
    
    -   Rate rules and Bot Manager may only run in production mode. You cannot run them in audit mode.
    -   Track threats identified by your audit policy by filtering the **WAF Events** view of the **Security** dashboard by the `audit` profile type.
    -   Although you may audit a security policy that has been applied to production traffic (i.e., production mode), this will cause the same threat to be logged twice.

### Client IP Address

{{ PRODUCT }} uses a client's IP address in various ways, such as identifying the client's geolocation for use with access control lists and rate limiting. By default, {{ PRODUCT }} gets a client's IP address from the request submitted to our network. However, you may wish to override this behavior under certain circumstances, such as testing or if {{ PRODUCT }} is behind another CDN. For these cases, you can instruct {{ PRODUCT }} to look up a client's IP address through a request header by setting a Security Application's **Use Header for Client IP** option to the desired request header.

<Callout type="important">

  Enabling this advanced setting has the potential to negatively impact {{ PRODUCT }} {{ PRODUCT_SECURITY }}'s ability to secure or rate limit your traffic. {{ PRODUCT }} does not validate the request header defined within the **Use Header for Client IP** option. We strongly recommend that you verify the spelling of the request header's name. You should also verify that the request header will be populated with the desired IP address(es).

</Callout>

## Enforcement {/*enforcement*/}

You may customize how rules that run in [production mode](#enforcement-mode) will be enforced. Enforcement is triggered when:
-   A threat is detected when the security policy defined within an access rule, custom rule, or managed rule is violated.
-   A rate limit defined within a rate rule is exceeded.

<Callout type="info">

  Rules that run in audit mode are restricted to alerting. This enforcement action cannot be customized.

</Callout>

<Callout type="info">

  Rate rules and Bot Manager may only run in production mode. You cannot run them in audit mode.

</Callout>

The available enforcement actions are:

-   [Alert Only](#alert-only)
-   [Block Request](#block-request)
-   [Custom Response](#custom-response)
-   [Drop Request](#drop-request)
-   [Redirect](#redirect--http-302-)
-   [Silent Close](#silent-close)

#### Alert Only{/*alert-only*/} 

Rate limited requests or detected threats will only generate an alert.

**Best Practices:**

Our recommendation for testing new configurations varies by the type of security rule:

-   **Rate Rules:** Use the `Alert Only` enforcement action.

    {{ PRODUCT }} {{ PRODUCT_SECURITY }} will continue evaluating a request that triggers an alert due to a rate rule violation.

-   **All Other Types:** Use [audit mode](#enforcement-mode).

    {{ PRODUCT }} {{ PRODUCT_SECURITY }} applies a single enforcement action per mode (i.e., [production or audit](#enforcement-mode)). Once enforcement is triggered for that mode, {{ PRODUCT }} {{ PRODUCT_SECURITY }} does not perform further [evaluation of that request](/applications/security/waf#threat-detection). If you are setting up a rule in production mode, we recommend that you limit your use of the `Alert Only` enforcement to the shortest amount of time necessary to validate changes to your configuration.

#### Block Request{/*block-request*/}

Detected threats will be dropped and the client will receive a `403 Forbidden` response.

#### Custom Response{/*custom-response*/} 

Rate limited requests or detected threats will receive a custom response.
-   **Response Body:** Define the payload that will be delivered to the client in response to a detected threat.

    <Callout type="tip">

      This option supports the use of [event variables](#event-variables) to customize the response according to the detected threat.

    </Callout>

    **Sample payload for a CSS file:**

    ```
    body {

        background-color: #ffffff;
    }
    ```

-   **HTTP Status Code:** Defines the HTTP status code that will be sent to the client.

    <details>
      <summary>View valid status codes.</summary>

      -   100
      -   101
      -   102
      -   200
      -   201
      -   202
      -   203
      -   204
      -   205
      -   206
      -   207
      -   208
      -   226
      -   300
      -   301
      -   302
      -   303
      -   304
      -   305
      -   306
      -   307
      -   308
      -   400
      -   401
      -   402
      -   403
      -   404
      -   405
      -   406
      -   407
      -   408
      -   409
      -   410
      -   411
      -   412
      -   413
      -   414
      -   415
      -   416
      -   417
      -   421
      -   422
      -   423
      -   424
      -   426
      -   428
      -   429
      -   431
      -   451
      -   500
      -   501
      -   502
      -   503
      -   504
      -   505
      -   507
      -   508
      -   509
      -   510
      -   511

    </details>

-   **Custom Response Headers:** Defines one or more response headers that will be sent to the client. Add a custom response header by clicking **+ Add Response Header**, setting the **Name** option to the name of the response header, and then setting the **Value** option to the response header value.

    <Callout type="tip">

      This option supports the use of [event variables](#event-variables) to customize the response according to the detected threat.

    </Callout>

    <Callout type="info">

      All characters, including spaces, will be treated as a part of the specified header name or value, respectively.

    </Callout>

#### Drop request{/*drop-request*/} 

Rate rules only. Rate limited requests will be dropped and the client will receive the following response:

-   **HTTP status code:** `503 Service Unavailable`
-   **Response header:** `Retry-After: 10 seconds`

<Callout type="info">

  The `Retry-After` response header provides a hint to the client as to when service may resume.

</Callout>

#### Redirect (HTTP 302){/*redirect--http-302-*/} 

Rate limited requests or detected threats will be redirected to the specified URL.

**Key information:**
-   The HTTP status code for this response will be a `302 Found`.
-   Set the **URL** option to the full URL to which rate limited requests or detected threats will be redirected.

    **Example:** `http://cdn.mydomain.com/marketing/busy.html`

#### Silent Close{/*silent-close*/} 

{{ PRODUCT }} Premier only. Drops the request without providing a response to the client.

### Event Variables {/*event-variables*/}

A custom response header value or a custom response body may include
variables that describe the event. These variables are described below.

| Variable    | Description                                           |
| ----------- | ----------- |
| EVENT_ID    | Represents the system-defined ID assigned to the request that was identified as a threat. <!--Find out detailed information about the detected threat by passing this ID to the Get Event Log Entry endpoint (REST API).-->|
| CLIENT_IP   | Represents the IP address of the device that submitted the detected threat.                        |
| TIMESTAMP   | Represents the date and time at which the detected threat was submitted.                                 |
| REQUEST_URL | Represents the URL for the request that was deemed a threat.                                               |

Add an event variable to a custom response header value or a custom response body by enclosing it with double curly braces.

**Example:**

`{{EVENT_ID}}`

### Event Logging {/*event-logging*/}

Each detected threat is logged regardless of enforcement action (i.e., block, custom response, redirect, or alert). View logged threats from the **Threats**, **Bots**, **Rates**, or **Rate Enforcement** tabs of the **Security** dashboard.

Sensitive data  (e.g., credit card information or passwords) can be redacted from our event logs.

[Learn how to redact sensitive data.](/applications/security/managed_rules#redacting-sensitive-data)

## Origin Signaling {/*origin-signaling*/}

{{ PRODUCT }} can add custom headers to requests that meet the following conditions:

-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} generated an alert for the request. All other enforcement actions prevent {{ PRODUCT }} from communicating with the origin server. 
-   The request was forwarded to an origin server because it could not be served from cache.

These custom headers may return any of the following information:

-   **Known Bot:** Returns `1` if the request was categorized as a known bot. Otherwise, returns `0`.
-   **Bot Score:** Indicates the request's bot score. This score indicates our level of confidence that the request originated from a bot.
-   **WAF Score:** Indicates the request's anomaly score. This score is determined by the number of rules that were violated and their severity.

Set up origin signaling by enabling the `Origin Signal Header` section within the desired Security App configuration and then defining the custom headers that will be included with requests forwarded to an origin. 

## Order of Precedence {/*order-of-precedence*/}

The recommended practice is to create a Security App configuration that is tuned for each of your applications. This allows you to apply a restrictive security policy with minimal false positives. Each Security App configuration's host and URL path conditions determine the set of traffic to which it may be applied. If a request is eligible to be screened by multiple Security App configurations, then {{ PRODUCT }} {{ PRODUCT_SECURITY }} will screen it using the first eligible configuration in the list.

<Callout type="tip">

  Reorder Security App configurations by dragging the desired configuration's <Image inline src="/images/v7/icons/drag.png" /> icon to the desired position.

</Callout>

## Security App Administration {/*security-application-administration*/}

You may create, modify, and delete Security App configurations.

**Key information:**
-   Administer Security App configurations from the **Security App** page.
-   Identify the set of traffic (e.g., all requests or by origin) to which your security policy will be applied by balancing the need to secure as much traffic as possible with the level of restrictive measures imposed by it.

    <Callout type="tip">

      The recommended approach is to apply the most restrictive policy to as much traffic as possible while causing minimal impact to data delivery.

    </Callout>
-   Apply [access rules](/applications/security/access_rules), [API Security](/applications/security/api_security), [rate rules](/applications/security/rate_rules), [bot manager configurations](/applications/security/bot_rules), [custom
    rules](/applications/security/custom_rules), and [managed rules](/applications/security/managed_rules) to production traffic by adding it to a Security App configuration and then determining how it will be enforced.

    <Callout type="info">

      Rules are administered independently from Security App configurations. This allows you to use the same rule within multiple Security App configurations. Leverage this capability to tailor security screening by application or traffic
      profile.

    </Callout>
-   Use [audit mode](#threat-detection-mode) to verify that new access rules, API Security rules, custom rules, and managed rules will not generate substantial false positives.
-   It may take up to 2 minutes for an updated Security App configuration to be applied across our entire network.

**To create a Security App configuration**
1.  Navigate to the **Security Application Manager** page.
    {{ SECURITY_NAV }} **Application Manager**.
2.  Click **+ Create New**.
3.  In the **Security Application Name** option, type the unique name by which this Security App configuration will be identified. After which, click **Continue**.
4.  Optional. From the **Hostname and URL Paths** section, identify the set of traffic to which this security policy will be applied.

    Restrict this security policy by hostname, URL path, or both by configuring the **Hostname** and **URL path(s)** options, respectively. Before you can specify a hostname or URL path, you must first select one of the following modes:
    -   **Default:** Use this mode to apply this Security App configuration regardless of the request's host or URL path.
    -   [Exact match (multiple entries):](#exact-match-multiple-entries) Use this mode to apply this Security App configuration to the specified hostname(s) or URL path(s).

    -   [Wildcard match:](#wildcard-match) Use this mode to apply this Security App configuration to all hostnames or URL paths that satisfy the specified wildcard pattern.

    -   [Regex match:](#regex-match) Use this mode to apply this Security App configuration to all hostnames or URL paths that satisfy the specified regular expression pattern.

    <Callout type="info">

      Enable the **Negative match** option to configure a Security App configuration to look for requests that do not match the specified value or pattern.

    </Callout>
5.  Optional. Set up an access control policy by assigning an [access rule](/applications/security/access_rules) to the Security App configuration.

    1.  Click **Access Rule**. An **Access Rule** section will appear.
    2.  If the desired access rule does not currently exist, then you should create it now by clicking on `+ Create New Access Rule`. 
    
        [Learn how to create an access rule.](/applications/security/access_rules#create-name)

    3.  Optional. Set up production [threat detection](#threat-detection-mode).

        1.  From the **Production Access Rule** option, select the desired access rule.
        2.  From the **Production action** option, determine how threats identified by the access rule selected in the previous step will be handled (i.e., block, alert, redirect, or send a custom response).

            [Learn more.](#enforcement)

    4.  Optional. Set up auditing for threat detection by selecting the desired access rule from the **Audit Access Rule** option.

6.  Optional. Define how to secure API requests by assigning an [API Security ruleset](/applications/security/api_security) to the Security App configuration.

    1.  Click **API Security**. An **API Security** section will appear.
    2.  If the desired API Security ruleset does not currently exist, then you should create it now by clicking on `+ Create New API Security Rule`. 
    
        [Learn how to create an API Security ruleset.](/applications/security/api_security#create-name)
    3.  Optional. Set up production [threat detection](#threat-detection-mode).

        1.  From the **Production API Security Rule** option, select the desired API Security ruleset.
        2.  From the **Production action** option, determine how threats identified by the API Security ruleset selected in the previous step will be handled (i.e., block, alert, redirect, or send a custom response).

            [Learn more.](#enforcement)

    4.  Optional. Set up auditing for threat detection by selecting the desired API Security ruleset from the **Audit API Security Rule** option.

7.  Optional. Set up rate limiting by assigning one or more [rate rule(s)](/applications/security/rate_rules) to the Security App configuration. 

    1.  Click **Rate Rule**. A **Rate Rule** section will appear.
    2.  If the desired rate rule does not currently exist, then you should create it now by clicking on `+ Create New Rate Rule`. 
    
        [Learn how to create a rate rule.](/applications/security/rate_rules#create-name)
    3.  Select the desired rate rule. 

        <Callout type="info">

          If the selected rate rule contains a condition group, then a request must satisfy the Security App configuration's host and URL path match conditions and all of the conditions within at least one condition group in order to be eligible for rate limiting.

        </Callout>

    4.  From the **Action** option, select how requests that exceed the limit defined within this rate rule will be handled (i.e., drop request, alert, redirect, or send a custom response).

        [Learn more.](#enforcement)

    5.  From the **Time period** option, select the time period for which the action selected in the previous step will be applied to clients that exceed the rate limit defined in the rate rule selected in step 7.3.

        <Callout type="info">

          A "client" is defined by each rate rule according to the **Apply rate limit to** option. For example, configuring that option to **Any request** will apply the selectedaction to all requests regardless of the number of requests generated by each device. Alternatively, identifying clients by **IP Address** will only apply the selected action to requests that originate from each IP address that violates the specified rate limit.

        </Callout>

    6.  If you would like to apply an additional rate limit, then repeat steps 7.ii - 7.v.

        <Callout type="tip">

          Use multiple rate rules to apply different rate limits to various traffic profiles. Set up this type of configuration using either a single or multiple Security App configurations. If you assign multiple rate rules to a single Security App configuration, then each rate rule should contain one or more [condition group(s)](/applications/security/rate_rules#condition-group).

        </Callout>

8.  <a id="bot-rule-configuration" />Optional. Determine how bots will be detected by assigning a [bot manager configuration](/applications/security/bot_rules) to the Security App configuration.

    1.  Click **Bot Manager**. A **Bot Manager** section will appear.
    2.  If the desired bot manager configuration does not currently exist, then you should create it now by clicking on `+ Create New Bot Manager Rule`. 
    
        [Learn how to create a bot manager configuration.](/applications/security/bot_rules#create-name)

    3.  From the **Production Bot Manager** option, select the desired bot manager configuration.
    4.  Perform the following steps if the selected bot manager configuration uses reCAPTCHA:

            1.  Toggle the **reCAPTCHA off** option to **reCAPTCHA on**.
            2.  If you have not already added Google reCAPTCHA v3 to your site, [add it now](https://www.google.com/recaptcha/admin/create).
            3.  Set the **reCAPTCHA Site Key** option to the site key provided by Google.
            4.  Set the **reCAPTCHA Secret Key** option to the secret key provided by Google.

9. Optional. Define a custom security policy by assigning a [custom rule](/applications/security/custom_rules) to the Security App configuration.

    1.  Click **Custom Rule**. A **Custom Rule** section will appear.
    2.  If the desired custom rule does not currently exist, then you should create it now by clicking on `+ Create New Custom Rule`. 
    
        [Learn how to create a custom rule.](/applications/security/custom_rules#create-name)

    3.  Optional. Set up production [threat detection](#threat-detection-mode).

        1.  From the **Production Custom Rule** option, select the desired custom rule.
        2.  From the **Production action** option, determine how threats identified by the custom rule selected in the previous step will be handled (i.e., block, alert, redirect, or send a custom response).

            [Learn more.](#enforcement)

    4.  Optional. Set up auditing for threat detection by selecting the desired custom rule from the **Audit Custom Rule** option.

10. Optional. Apply a predefined security policy by assigning a [managed rule](/applications/security/managed_rules) to the Security App configuration.

    1.  Click **Managed Rule**. A **Managed Rule** section will appear.
    2.  If the desired managed rule does not currently exist, then you should create it now by clicking on `+ Create New Managed Rule`. 
    
        [Learn how to create a managed rule.](/applications/security/managed_rules#create-name)

    3.  Optional. Set up production [threat detection](#threat-detection-mode).

        1.  From the **Production Managed Rule** option, select the desired managed rule.
        2.  From the **Production action** option, determine how threats identified by the managed rule selected in the previous step will be handled (i.e., block, alert, redirect, or send a custom response).

            [Learn more.](#enforcement)

    4.  Optional. Set up auditing for threat detection by selecting the desired managed rule from the **Audit Managed Rule** option.

11. Optional. Apply a Content Security Policy to your traffic by assigning a [Client-Side Protection policy](/applications/security/client_side_protection) to the Security App configuration.

    1.  Click **Client Protection**. A **Client Protection** section will appear.
    2.  If the desired Client-Side Protection policy does not currently exist, then you should create it now by clicking on `+ Create New Client Rule`. 
    
        [Learn how to create a Client-Side Protection policy.](/applications/security/client_side_protection#create-name)

    3.  From the **Select Policy** option, select the desired Client-Side Protection policy.

    <Info>
    
    The Client-Side Protection policy's configuration determines whether its production and audit Content Security Policy will be applied to your traffic through the `Content-Security-Policy` and `Content-Security-Policy-Report-Only` response headers, respectively. 
    
    </Info>

12. Optional. Set up [origin signaling](#origin-signaling). 
    1.  Enable the **Origin Signal Header** section.
    2.  Add a header that will be included with requests forwarded to an origin.

        1.  From the **Signal** option, select the type of information that will be reported by that custom header.
        2.  From the **Request Header Name** option, assign a name for this custom header.

    3.  Optional. Add another custom request header by clicking **+ Add Header** and then repeating the previous step.
13. Click **Save & Continue**.
14. If no additional changes to your security configuration are needed, then click **Deploy Changes** to allow these changes to take effect. 

**To reorder Security App configurations**
1.  Navigate to the **Security Application Manager** page.
    {{ SECURITY_NAV }} **Application Manager**.
2.  Drag the desired configuration's <Image inline src="/images/v7/icons/drag.png" /> icon to the desired position.
3.  If no additional changes to your security configuration are needed, then click **Deploy Changes** to allow these changes to take effect. 

<Callout type="tip">

  Traffic is always screened using the first eligible Security App configuration. If multiple Security App configurations are applicable to the same request, then consider updating their host or URL path conditions to a more restrictive pattern.

</Callout>

**To modify a Security App configuration**
1.  Navigate to the **Security Application Manager** page.
    {{ SECURITY_NAV }} **Application Manager**.
2.  Click on the desired Security App configuration.
3.  Make the desired changes.
4.  Click **Save & Continue**.
5.  If no additional changes to your security configuration are needed, then click **Deploy Changes** to allow these changes to take effect. 

**To delete a Security App configuration**
1.  Navigate to the **Security Application Manager** page.
    {{ SECURITY_NAV }} **Application Manager**.
2.  Click on the desired Security App configuration.
3.  Click the <Image inline src="/images/v7/icons/delete-2.png" /> icon.
4.  When prompted, confirm the deletion by clicking **Confirm**.
5.  If no additional changes to your security configuration are needed, then click **Deploy Changes** to allow this deletion to take effect. 

## Version Control {/*version-control*/}

Version control allows you to:
-   View a previous version of your Security App configuration.
-   Reactivate a previous version of your Security App configuration.
-   Compare a previous version of your Security App configuration to the current version.

<Info>

{{ PRODUCT }} {{ PRODUCT_SECURITY }} Premier and Business support a rolling window of up to 200 versions, while {{ PRODUCT }} {{ PRODUCT_SECURITY }} Essentials and Insights is restricted to a rolling window of up to 100 versions.

</Info>

An advantage of using version control is that it allows you to quickly roll back to a previously vetted configuration. For example, if you notice that a new configuration has resulted in more false positives, then you can roll back to the previous version before analyzing the data.

**To view, compare, and reactivate a previous configuration**

1.  Navigate to the **Security Application Manager** page.
    {{ SECURITY_NAV }} **Application Manager**.
2.  Click **Versions**.
3.  Optional. Compare the current version with a previous one by clicking the <Image inline src="/images/v7/icons/diff.png" alt="Diff" /> icon next to the desired previous version. Differences between those two versions are highlighted in green (new or updated lines) and red (modified or deleted lines).
4.  Click on the desired version to view it.

    ![Version selection](/images/v7/security/version-control-version-selection-sa.png?width=750)

4.  Optional. Reactivate the version selected in the previous step by clicking **Reactivate**. Click **Reactivate this version** to confirm that it will be reactivated.