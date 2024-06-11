---
title: Security App
---

A Security App configuration:
-   [Identifies the set of traffic](#identifying-traffic-for-inspection) to which it applies by hostname, a URL path, or both.
-   Defines how [threats will be detected](#threat-detection) through:
    -   **Access Rules:** An access rule identifies legitimate traffic and threats through access control lists.
    -   **API Security Ruleset:** An API Security rule validates the payload for `POST`, `PUT`, and `PATCH` requests against a JSON schema.
    -   **Rate Rules:** A rate rule defines the rate of traffic that may be directed to one or more web sites.
    -   **Bot Manager:** A bot manager configuration identifies bot traffic.
    -   **Custom Rules:** A custom rule identifies threats using custom criteria that takes into account your site's traffic profile to avoid false positives.
    -   **Managed Rules:** A managed rule identifies threats through threat detection policies.
    -   **Client-Side Protection Policy:** A Client-Side Protection policy detects and mitigates attacks, such as cross-site scripting (XSS) and code injection, by applying a Content Security Policy to your traffic.
-   Identifies how the above [rules are enforced](#enforcement) on rate limited requests or threats .
-   Allows you to audit new access rules, API Security rules, custom rules, and managed rules without impacting production traffic while keeping your applications secure with known configurations.

    Use the **Threats** tab of the **Security** dashboard to isolate and analyze threats detected as a result of an audit of new access rules,  API Security rules, custom rules, and managed rules.

    <Callout type="info">

      The ability to secure and audit your production traffic using separate configurations requires {{ PRODUCT }} Premier, Business, or Essentials. {{ ACCOUNT_UPGRADE }}

    </Callout>

<a id="traffic-identification"></a>

## Identifying Traffic for Inspection {/*identifying-traffic-for-inspection*/}

Identify the set of traffic to which a Security App configuration's rules will be applied by host, URL path, or both.

### Host {/*host*/}

By default, a Security App configuration applies to all hosts. However, you may limit a Security App configuration to one or more hosts. {{ PRODUCT }} {{ PRODUCT_SECURITY }} compares the entire `Host` header value against the specified value.

**Key information:**
-   The `Host` header identifies either a hostname or IP address using the following syntax:

    `<Host>`

    `<Host>:<Port>`

-   The CDN only accepts HTTP/HTTPS requests on standard ports (i.e., 80 and 443). Typically, a `Host` request header does not include port information for standard ports. However, the requesting user agent defines the `Host` request header submitted to the CDN.
-   For the purpose of this comparison, the hostname defined by this match condition will not be resolved to an IP address.
-   For the purpose of this comparison, an origin configuration's **Override Host Header** option is irrelevant.
-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} supports various comparison modes (i.e., exact match, wildcard, and regular expression).

    [Learn more.](#match-comparison-modes)

### URL Path {/*url-path*/}

By default, a Security App configuration applies to all URL paths. However, you may limit a Security App configuration to one or more URL paths. {{ PRODUCT }} {{ PRODUCT_SECURITY }} compares the entire URL path against the specified value.

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

    <Callout type="info">

      Rate rules and Bot Manager may only run in production mode. You cannot run them in audit mode.

    </Callout>

<Callout type="info">

  Although you may audit a security policy that has been applied to production traffic (i.e., production mode), this will cause the same threat to be logged twice.

</Callout>

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

The available enforcement actions are described below.
-   **Alert Only:** Rate limited requests or detected threats will only generate an alert.

    <Callout type="tip">

      Our recommendation for testing new configurations is to use [audit mode](#enforcement-mode) instead of applying the `Alert Only` enforcement action to a rule running in production mode.

    </Callout>

    <Callout type="info">

      {{ PRODUCT }} {{ PRODUCT_SECURITY }} applies a single enforcement action per mode (i.e., [production or audit](#enforcement-mode)). Once enforcement is triggered for that mode, {{ PRODUCT }} {{ PRODUCT_SECURITY }} does not perform further [evaluation of that request](/applications/security/waf#threat-detection). If you are setting up a rule in production mode, we recommend that you limit your use of the `Alert Only` enforcement to the shortest amount of time necessary to validate changes to your configuration.

    </Callout>
-   **Block Request:** Detected threats will be dropped and the client will receive a `403 Forbidden` response.
-   **Custom Response:** Rate limited requests or detected threats will receive a custom response.
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

-   **Drop request:** Rate rules only. Rate limited requests will be dropped and the client will receive the following response:

    -   **HTTP status code:** `503 Service Unavailable`
    -   **Response header:** `Retry-After: 10 seconds`

    <Callout type="info">

      The `Retry-After` response header provides a hint to the client as to when service may resume.

    </Callout>

-   **Redirect (HTTP 302):** Rate limited requests or detected threats will be redirected to the specified URL.

    **Key information:**
    -   The HTTP status code for this response will be a `302 Found`.
    -   Set the **URL** option to the full URL to which rate limited requests or detected threats will be redirected.

        **Example:** `http://cdn.mydomain.com/marketing/busy.html`

-   **Silent Close:** {{ PRODUCT }} Premier only. Drops the request without providing a response to the client.

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
-   Use [audit mode](#threat-detection) to verify that new access rules, API Security rules, custom rules, and managed rules will not generate substantial false positives.
-   It may take up to 2 minutes for an updated Security App configuration to be applied across our entire network.

**To create a Security App configuration**
1.  Navigate to the **Security Apps** page.
    {{ SECURITY_NAV }} **Security Apps**.
2.  Click **+ New Security App**.
3.  In the **Name** option, type the unique name by which this Security App configuration will be identified.
4.  Optional. Identify the set of traffic to which this security policy will be applied by defining a hostname and/or URL path through the **Hostname** and **URL path(s)** options.

    Select one of the following modes:
    -   **Default:** Use this mode to apply this Security App configuration regardless of the request's host or URL path.
    -   **Exact match (multiple entries):** Use this mode to apply this Security App configuration to the specified hostname(s) or URL path(s).

        [Learn more.](#exact-match-multiple-entries)

    -   **Wildcard match:** Use this mode to apply this Security App configuration to all hostnames or URL paths that satisfy the specified wildcard pattern.

        [Learn more.](#wildcard-match)
    -   **Regex match:** Use this mode to apply this Security App configuration to all hostnames or URL paths that satisfy the specified regular expression pattern.

        [Learn more.](#regex-match)

    <Callout type="info">

      Enable the **Negative match** option to configure a Security App configuration to look for requests that do not match the specified value or pattern.

    </Callout>
5.  Optional. Select an [access rule](/applications/security/access_rules#access-rule-administration) through which production traffic will be screened and determine how threats identified by it are handled.

    1.  From the **Rules** section, click **Access Rule**.
    2.  From the **Production Access Rule** option, select the desired access rule.
    3.  Optional. From the **Action name** option, type a name that describes the enforcement action configuration.
    4.  From the **Action type** option, determine how threats identified by the access rule selected in step 5.2 will be handled (i.e., block, alert, redirect, or send a custom response).

        [Learn more.](#enforcement)

6.  Optional. [Audit production traffic](#threat-detection) using a different access rule.
    1.  From the **Rules** section, click **Access Rule**.
    2.  From the **Audit Access Rule** option, select the desired access rule.

    <Callout type="info">

      Filter the **Threats** tab of the **Security** dashboard by the above access rule or the `audit` profile type to track detected threats.

    </Callout>

    <Callout type="info">

      Disable auditing by setting the **Audit Access Rule** option to `No Audit Rule`.

    </Callout>

7.  Optional. Select an [API Security ruleset](/applications/security/api_security#api-security-ruleset-administration) through which production traffic will be screened and determine how threats identified by it are handled.

    1.  From the **Rules** section, click **API Security Rule**.
    2.  From the **Production API Security Rule** option, select the desired API Security ruleset.
    3.  From the **Action type** option, determine how threats identified by the API Security ruleset selected in step 7.2 will be handled (i.e., block, alert, redirect, or send a custom response).

        [Learn more.](#enforcement)

8.  Optional. [Audit production traffic](#threat-detection) using a different API Security ruleset.

    1.  From the **Rules** section, click **API Security**.
    2.  From the **Audit API Security Rule** option, select the desired API Security ruleset.

    <Callout type="info">

      Filter the **Threats** tab of the **Security** dashboard by the above API Security ruleset or the `audit` profile type to track detected threats.

    </Callout>

    <Callout type="info">

      Disable auditing by setting the **Audit API Security Rule** option to `No Audit Rule`.

    </Callout>

9.  Optional. Select a [rate rule](/applications/security/rate_rules#rate-rule-administration) through which production traffic will be rate limited.

    1.  From the **Rules** section, click **Rate Rule**.
    2.  From the **Add Rate Rule** option, select the desired rate rule.

        <Callout type="info">

          If the selected rate rule contains a condition group, then a request must satisfy the Security App configuration's host and URL path match conditions and all of the conditions within at least one condition group in order to be eligible for rate limiting.

        </Callout>

    3.  Optional. From the **Action name** option, type a name that describes the enforcement action configuration.
    4.  From the **Action type** option, determine how threats identified by the rate rule selected in step 9.2 will be handled (i.e., drop request, alert, redirect, or send a custom response).

        [Learn more.](#enforcement)

        <Callout type="important">

          {{ PRODUCT }} {{ PRODUCT_SECURITY }} does not perform further [evaluation of a request](/applications/security/waf#threat-detection) once enforcement is triggered. For this reason, we recommend that you limit your use of the `Alert Only` enforcement to the shortest amount of time necessary to validate changes to your configuration.

        </Callout>

    5.  From the **Time period** option, select the time period for which the action selected in the next step will be applied to clients that exceed the rate limit defined in the rate rule selected in step 9.2.

        <Callout type="info">

          A "client" is defined by each rate rule according to the **Apply rate limit to** option. For example, configuring that option to **Any request** will apply the selectedaction to all requests regardless of the number of requests generated by each device. Alternatively, identifying clients by **IP Address** will only apply the selected action to requests that originate from each IP address that violates the specified rate limit.

        </Callout>

    6.  If you would like to apply an additional rate limit, then repeat steps 9.2 - 9.5.

        <Callout type="tip">

          Use multiple rate rules to apply different rate limits to various traffic profiles. Set up this type of configuration using either a single or multiple Security App configurations. If you assign multiple rate rules to a single
          Security App configuration, then each rate rule should contain one or more [condition group(s)](/applications/security/rate_rules#condition-group).

        </Callout>

    <a id="bot-rule-configuration"></a>

10. Optional. Select a [bot manager configuration](/applications/security/bot_rules#bot-rule-administration) that identifies the set of production traffic that will be secured by Bot Manager.

    1.  From the **Rules** section, click **Bot Manager**.
    2.  From the **Production Bot Rule** option, select the desired bot manager configuration.
    3.  Perform the following steps if the selected bot manager configuration uses reCAPTCHA:

            1.  Toggle the **reCAPTCHA off** option to **reCAPTCHA on**.
            2.  If you have not already added Google reCAPTCHA v3 to your site, [add it now](https://www.google.com/recaptcha/admin/create).
            3.  Set the **reCAPTCHA Site Key** option to the site key provided by Google.
            4.  Set the **reCAPTCHA Secret Key** option to the secret key provided by Google.

11. Optional. Select a [custom rule](/applications/security/custom_rules#custom-rule-administration) through which production traffic will be screened and determine how threats identified by it are handled.

    1.  From the **Rules** section, click **Custom Rule**.
    2.  From the **Production Custom Rule** option, select the desired custom rule.
    3.  Optional. From the **Action name** option, type a name that describes the enforcement action configuration.
    4.  From the **Action type** option, determine how threats identified by the custom rule selected in step 11.2 will be handled (i.e., block, alert, redirect, or send a custom response).

        [Learn more.](#enforcement)

12. Optional. [Audit production traffic](#threat-detection) using a different custom rule.
    1.  From the **Rules** section, click **Custom Rule**.
    2.  From the **Audit Custom Rule** option, select the desired custom rule.

    <Callout type="info">

      Filter the **Threats** tab of the **Security** dashboard by the above custom rule or the *audit* profile type to track detected threats.

    </Callout>

    <Callout type="info">

      Disable auditing by setting the **Audit Custom Rule** option
      to `No Audit Rule`.

    </Callout>

13. Optional. Select a [managed rule](/applications/security/managed_rules#managedruleadministration) through which production traffic will be screened and determine how threats identified by it are handled.

    1.  From the **Rules** section, click **Managed Rule**.
    2.  From the **Production Managed Rule** option, select the desired managed rule.
    3.  Optional. From the **Action name** option, type a name that describes the enforcement action configuration.
    4.  From the **Action type** option, determine how threats identified by the managed rule selected in step 13.2 will be handled (i.e., block, alert, redirect, or send a custom response).

        [Learn more.](#enforcement)

14. Optional. [Audit production traffic](#threat-detection) using a different managed rule.
    1.  From the **Rules** section, click **Managed Rule**.
    2. From the **Audit Managed Rule** option, select the desired managed rule.

    <Callout type="info">

      Filter the **Threats** tab of the **Security** dashboard by the above managed rule or the *audit* profile type to track detected threats.

    </Callout>

    <Callout type="info">

      Disable auditing by setting the **Audit Managed Rule** option
      to *No Audit Rule*.

    </Callout>

15. Optional. Apply a production and audit Content Security Policy to your traffic by selecting the desired Client-Side Protection policy.

    1.  From the **Rules** section, click **Client Protection**.
    2.  From the **Select Policy** option, select the desired Client-Side Protection policy.
    
    <Info>
    
    The Client-Side Protection policy's configuration determines whether its production and audit Content Security Policy will be applied to your traffic through the `Content-Security-Policy` and `Content-Security-Policy-Report-Only` response headers, respectively. 
    
    </Info>

16. Click **Save**.
17. Click **Accept All Changes**.
18. Click **Save Changes**.

**To reorder Security App configurations**
1.  Navigate to the **Security App** page.
    {{ SECURITY_NAV }} **Security Apps**.
2.  Drag the desired configuration's <Image inline src="/images/v7/icons/drag.png" /> icon to the desired position.
3.  Click **Accept All Changes**.
4.  Click **Save Changes**.

<Callout type="tip">

  If multiple Security App configurations are applicable to the same request, then consider updating their host or URL path conditions to a more restrictive pattern.

</Callout>

<Callout type="info">

  Traffic is always screened using the first eligible Security App configuration.

</Callout>

**To modify a Security App configuration**
1.  Navigate to the **Security App** page.
    {{ SECURITY_NAV }} **Security Apps**.
2.  Click on the desired Security App configuration.
3.  Make the desired changes.
4.  Click **Save**.
5.  Click **Accept All Changes**.
6.  Click **Save Changes**.

**To delete a Security App configuration**
1.  Navigate to the **Security App** page.
    {{ SECURITY_NAV }} **Security Apps**.
2.  Click on the desired Security App configuration.
3.  Click **Delete**.
4.  When prompted, confirm the deletion by clicking **Confirm**.
6.  Click **Accept All Changes**.
7.  Click **Save Changes**.

## Version Control {/*version-control*/}

Version control allows you to:
-   View a previous version of your Security App configuration.
-   Reactivate a previous version of your Security App configuration.
-   Compare a previous version of your Security App configuration to the current version.

An advantage of using version control is that it allows you to quickly roll back to a previously vetted configuration. For example, if you notice that a new configuration has resulted in more false positives, then you can roll back to the previous version before analyzing the data.

**To view, compare, and reactivate a previous configuration**

1.  Navigate to the **Security App** page.
    {{ SECURITY_NAV }} **Security Apps**.
2.  Click **Versions**.
3.  Optional. Compare the current version with a previous one by clicking the <Image inline src="/images/v7/icons/diff.png" alt="Diff" /> icon next to the desired previous version. Differences between those two versions are highlighted in green (new or updated lines) and red (modified or deleted lines).
4.  Click on the desired version to view it.

    ![Version selection](/images/v7/security/version-control-version-selection-sa.png?width=750)

4.  Optional. Reactivate the version selected in the previous step by clicking **Reactivate**. Click **Reactivate this version** to confirm that it will be reactivated.
