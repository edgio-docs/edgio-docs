---
title: Managed Rules
---

Use managed rules to:
-   Identify malicious traffic via predefined rules. A collection of
    policies and rules is known as a [managed rule set](#managed-rule-set).
-   Prevent false positives by:
    -   Defining cookies, request headers, and query string arguments
        that should be ignored when performing a threat assessment. This
        type of configuration is known as an [ignore list](#preventing-false-positives-ignore-list).
    -   Identifying requests for which specific predefined rules will
        not be applied. This type of configuration is known as a [rule
        exception](#rule-exceptions).

## Preventing False Positives (Ignore List) {/*preventing-false-positives-ignore-list*/}

The characteristics of certain cookies, headers, and query string
arguments may resemble malicious traffic. This may result in {{ PRODUCT_SECURITY }}
incorrectly identifying a request as a threat. Avoid this situation by
identifying the cookies, headers, and query string arguments that should
be ignored when {{ PRODUCT_SECURITY }} performs threat assessment.

**Key information:**

-   An ignore list does not behave like a whitelist, accesslist, or
    blacklist. Rather, it simply allows the system to ignore specific
    cookies when assessing whether a request is malicious traffic.
-   Specify each unique cookie, header, or query string argument by typing it and then pressing 'ENTER'.
-   Each value defines a regular expression.

    <Callout type="info">

      By default, a regular expression defines a case-sensitive match. Use
      syntax (e.g., `[a-zA-Z]`) to make it case-insensitive.

    </Callout>
-   A maximum of 100 entries may be defined within a single ignore list.

## File Size and Query String Limits (Advanced) {/*file-size-and-query-string-limits-advanced*/}

You may define query string argument and file size limitations 
for valid requests.

<Callout type="important">

  The modification of these advanced settings is strongly discouraged.

</Callout>

<Callout type="info">

  Any single violation of these limits adds 5 points to a request's anomaly score. 

  For example, our service adds 10 points to a request's anomaly score if it exceeds both the query string length limit and the limit for the number of query string arguments.

  [Learn more.](/guides/security/waf#managed-rule-violations)

</Callout>

-   **File size:** The **Multiple File Upload Limit** option defines the total file size, in bytes, for a `POST` request that is a multipart message.

    <Callout type="tip">

      The recommended maximum value is 6,291,456 bytes.

    </Callout>

    <Callout type="info">

      For the purpose of this setting, file size is calculated from the body (i.e., message or payload) of `POST` requests with a `Content-Type` header that is set to `multipart/form-data`.

    </Callout>

    <Callout type="info">

      Define the maximum file size for all other requests through an access rule. 

      [Learn more](access_rules#file-size).

    </Callout>

-   **Query string value / parameters:** A variety of restrictions may be placed on either a request's query string value or parameters.
    -   The **Total Argument Length** option defines the maximum number of characters for the query string value in the request URL.
    -   The **Max # of Arguments /Request** option defines the maximum number of parameters that a query string may contain.  
    -   The **Single Argument Length** option defines the maximum number of characters for any single query string parameter value in the request URL.  
    -   The **Argument Name Length** option defines the maximum number of characters for any single query string parameter name in the request URL.
-   **JSON Inspection:** Determines whether JSON payloads will be inspected.

## Managed Rule Set {/*managed-rule-set*/}

The ECRS rule set, which is primarily based off of OWASP CRS 3.x rules,
identifies malicious traffic and provides generic protection against a
variety of unknown vulnerabilities. This rule set does not solely rely
on signatures to check for known vulnerabilities. Rather, it analyzes
all HTTP data for malicious payloads.

In addition to defining a [threshold](basic_setup#managed-rule-violations), this
rule set allows you to balance protection against false positives through
the **Paranoia Level** option. Paranoia levels are explained
below.
-   **1:** Recommended. Choose this level to keep the number of
    false positives to a minimum.
-   **2:** Choose this level to provide a slightly higher level of
    protection to your web applications.
-   **3:** Choose this level to provide more protection with a
    higher rate of false positives.
-   **4:** Choose this level to provide the most amount of
    protection. This level may cause a much higher rate of false
    positives.

<Callout type="important">

  Before leveraging a new rule set to secure production traffic, it is
  strongly recommended to fine-tune its configuration to account for your
  traffic profile.

  [Learn more.](#rule-set-updates)

</Callout>

<Callout type="tip">

  Automatically verify that your web applications are compatible with our
  latest threat detection policies by enabling the **Automatically opt-in
  to the latest ECRS ruleset** option. This mode is only
  recommended for auditing new rule sets. You should set your Security
  Application configuration's **Audit Managed Rule**
  option to a managed rule that has opted-in to automatic updates to the
  latest rule set. This type of setup provides you with the opportunity to
  minimize false positives before enforcing our latest threat detection
  policies on your production traffic.

</Callout>

The ECRS rule set consists of a set of threat detection policies. Each
threat detection policy contains a set of rules that define how threats
to site traffic will be detected.

![](/images/v7/security/managed_rule_set.png)

**Key information:**
-   Only a single rule set may be associated with a managed rule.
-   A threat detection policy or its rules may be disabled.
    -   View a policy's rules by clicking on the <Image inline src="/images/v7/icons/expand-section.png" alt="Delete icon" /> icon that appears directly to the left of its name. 

        <Callout type="info">

          The link's label (e.g., 0 Rules Disabled) indicates the number
          of rules that have been disabled for that policy.

        </Callout>

    -   Take care when disabling a policy or an individual rule since it
        increases the vulnerability of site traffic.
-   Changing the rule set associated with a managed rule will overwrite
    the existing threat detection configuration.
-   The purpose of a rule set is to protect your origin servers. As a
    result, managed rules are only applied to requests that will be
    served from your web servers. {{ PRODUCT_SECURITY }} does not use them to screen
    requests for cached content served directly from the edge of our
    network.
-   A Security Application configuration determines the
    enforcement action that will take place when a request is identified
    as a threat as a result of a managed rule.

### Policy and Rule Updates {/*policy-and-rule-updates*/}

Periodic updates to the policies and rules in a rule set are necessary
to address the dynamic nature of threats to site traffic. Due to this
changing landscape of threats, it is critical to keep up with the latest
rule set updates. Using the latest rule set version maximizes the degree
to which HTTP/HTTPS traffic is protected.

Identify a rule set's version by the date on which it was released.  

**Syntax:** 

`<Rule Set Name> <Date>`

**Example:** 

`ECRS **2022-12-14**`

<a id="rule-set-updates"></a>

**To apply an updated rule set to production traffic (recommended)**

1.  Create a managed rule that points to the updated rule set.
2.  Modify the desired Security Application configuration's
    **Audit Managed Rule** option to the above managed rule.
3.  Wait a reasonable amount of time (e.g., 24 to 48 hours) to screen
    traffic. After which, review the Threats dashboard for false
    positives.
    -   If many false positives are found, identify the policies and/or
        rules that are causing them and disable them from the managed
        rule created in step 1. After which, repeat step 3.
    -   If few false positives are found, set the Security Application
        configuration's managed rule to the one created in step 1.

### Threat Detection Policies {/*threat-detection-policies*/}

A brief description for each available threat detection policy is
provided below.

<Callout type="info">

  The set of available policies varies according to the selected rule set.

</Callout>

<Callout type="info">

  Balance security with optimal data delivery performance by disabling
  policies that do not apply to your site's traffic. For example, the
  Typo3 attacks policy should be disabled if your site does not use that
  CMS.

</Callout>

<Callout type="info">

  The ability to monitor outbound traffic is currently unsupported.
  Therefore, none of the following policies are applicable to outbound
  traffic.

</Callout>

#### ECRS Policies {/*ecrs-policies*/}

<Callout type="info">

The EC Custom Rule policy and polices that start with "Adv"
run in signature mode, while all other policies run in anomaly mode.
Signature mode means that a single violation will result in a request
being categorized as a threat. Anomaly mode means that a threshold must
be met before a request will be considered a threat.

</Callout>

-   **Adv CPanel:** Detects attacks that target sites that leverage cPanel.
-   **Adv Drupal:** Detects attacks that target Drupal CMS installations.
-   **Adv IIS:** Detects attacks that target Microsoft IIS servers.
-   **Adv Joomla:** Detects attacks that target Joomla! CMS installations.
-   **Adv SharePoint:** Detects attacks that target SharePoint installations.
-   **Adv Struts:** Detects attacks that target Apache Struts installations.
-   **Adv WordPress:** Detects attacks that target WordPress installations. 
-   **Cross Site Scripting (XSS):** Detects cross-site scripting (XSS) attacks. An XSS attack is designed to add an unauthorized client-side script to a site.
-   **EC Custom Rule:** Detects Bash shellshock attacks, httpoxy attacks, and attacks on Drupal and Apache installations.
-   **HTTP Attack:** Detects attacks that leverage HTTP requests and responses.
-   **HTTP Protocol Validation:** Detects attacks that violate the HTTP protocol.
-   **Java Attack:** Detects Java-based attacks.
-   **Local File Inclusion (LFI):** Detects attacks that target the web server's file system.
-   **PHP Injection (PHPi):** Detects a variety of different methods for initiating a PHP injection (PHPi) attack.
-   **Remote Code Execution (RCE):** Detects a variety of different methods for initiating a Remote Code Execution (RCE) attack.
-   **Remote File Inclusion (RFI):** Detects a variety of different methods for initiating a Remote File Inclusion (RFI) attack.
-   **Scanner Detection:** Detects requests generated by a security scanner or web crawler/bot.
-   **Session Fixation:** Detects session fixation attack by referrer and cookie values.
-   **SQL Injection (SQLi):** Detects a variety of different methods for initiating a SQL injection (SQLi) attack.
-   **TW IP Reputation:** Detects requests that originate from blacklisted IP addresses.

### Rule Exceptions {/*rule-exceptions*/}

An effective strategy for reducing false positives (i.e., a legitimate request that was identified as a threat) is to create rule
exceptions. A rule exception identifies one or more rules that will be
ignored for a set of requests. Identify requests using any of the
following criteria:
-   **Argument:** Identifies all requests with a query string
    parameter or body parameter whose name matches the specified value.
-   **Cookies:** Identifies all requests with a cookie whose name
    matches the specified value.
-   **Header:** Identifies all requests with a request header whose
    name matches the specified value.

<Callout type="tip">

  Another strategy for reducing false positives is to reduce the **Paranoia
  Level** option. The recommended level is 1.

</Callout>

Tips for setting up rule exceptions:

-   Use regular expressions to create a pattern through which requests
    will be identified. Mark the **Regex?** option to specify a
    regular expression instead of a literal value.
-   The best strategy for defining exceptions is to:
    1.  Identify false positives within the **Threats Dashboard**         
        by reviewing recent threats and identifying requests that were
        made by actual users.
    2.  Identify a common attribute within those requests and the
        rule(s) that they inadvertently triggered.
    3.  Use the information identified in step 2 to [create a rule
        exception](#create-rule-exception).

## Managed Rule Administration {/*managed-rule-administration*/}

You may create, modify, and delete managed rules.

**Key information:**
-   Administer managed rules from the **Manage Rules** page.    
-   Apply a managed rule to production traffic by adding it to a
    [Security Application configuration](security_applications) and then
    determining how it will be enforced. Multiple Security Application
    configurations may use the same managed rule. Leverage this
    capability to tailor security screening by application or traffic
    profile.
-   It may take up to 2 minutes for an updated managed rule to be
    applied across our entire network.

**To create a managed rule**
1.  Navigate to the **Managed Rules** page.
    {{ SECURITY_NAV }} **Managed Rules**.
2.  Click **Add Managed Rule**.
3.  In the **Name** option, type the unique name by which this
    managed rule will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    configuration.
4.  In the **Response Header Name** option, verify the name of
    the response header that will be included with blocked requests.
    This name may only consist of alphanumeric characters and dashes.
5.  Determine whether {{ PRODUCT_SECURITY }} will [ignore specific cookies, request
    headers, or query string arguments](#preventing-false-positives-ignore-list) when assessing
    whether a request is a threat.
    1.  From the **Ignore List** section, choose to ignore
        specific cookies, request headers, or query string arguments.
    2.  Add a cookie, request header, or query string argument that should be ignored by typing it and then pressing 'ENTER'.
    3.  Repeat the above steps if you need to create additional ignore lists.
6.  **Advanced Users Only**

    Customize [file size and query string
    limits](#file-size-and-query-string-limits-advanced) by expanding **More
    Details** and then making the necessary adjustments.
7.  Enable the desired threat detection rules and define the threat
    identification threshold.
    1.  Click the **Policies** tab. In the **Ruleset ERS**
        option, select the type and date for the rule set that may be
        used to monitor traffic for threats. The list of policies shown below this section will be automatically refreshed to reflect the selected rule set.

        <Callout type="tip">

          Automatically verify that your web applications are compatible
          with our latest threat detection policies by enabling the
          **Automatically opt-in to the latest ECRS ruleset**
          option. This mode is only recommended for auditing new rule
          sets. You should set your Security Application
          configuration's **Audit Managed Rule** option to a
          managed rule that has opted-in to automatic updates to the
          latest rule set. This type of setup provides you with the
          opportunity to minimize false positives before enforcing our
          latest threat detection policies on your production traffic.

        </Callout>

    2.  Set the **Threshold** option to a level (e.g., 5) that
        balances security with risk tolerance. Requests that are scored
        at or higher than the specified value will be identified as
        malicious traffic.

        [Learn more.](basic_setup#managed-rule-violations)

        <Callout type="info">

          This option only applies to policies other than Custom EC Rules
          and policies that start with **Adv**.

        </Callout>

    3.  Set the **Paranoia Level** option to a level (e.g., `1`)
        that balances security with risk tolerance.

        <Callout type="tip">

          This is an advanced setting. The recommended paranoia level
          is 1. Setting this option to a higher value will increase the
          number of false positives.

        </Callout>

         [Learn more.](basic_setup#managed-rule-violations)
    4.  Review all enabled policies and rules to ensure that the
        legitimate traffic is not targeted by mistake.

    <a id="create-rule-exception"></a>

8.  Optional. Add one or more rule exceptions.
    1.  Click the **Exceptions** tab.
    2.  Click **+ Add New Condition**.
    3.  From the **Parameter** option, select whether requests
        will be identified by argument (i.e., query string argument or
        request body parameter), cookie, or request header.
    4.  From the **Argument | Cookie | Header Name** option,
        type one of the following values:
        -   The exact name of the query string argument / request body
            parameter, cookie, or request header by which requests will
            be identified.
        -   A regular expression pattern for the query string argument /
            request body parameter, cookie, or request header by which
            requests will be identified. Mark the **Regex?**
            option to indicate that the specified value should be
            interpreted as a regular expression.
    5.  In the **Applied Rule ID's** option, type the ID for
        a rule that will be ignored when processing the requests
        identified in steps 8.3 and 8.4 and then press 'ENTER'. Repeat this step as needed.
9.  Click **Submit**.

**To modify a managed rule**

<Callout type="tip">

  A common reason for updating a managed rule is to reduce false positives
  by [adding a rule exception](#create-rule-exception). A rule exception identifies one
  or more rules that should be ignored for a specific set of requests.
  Typically, the criteria for a rule exception are identified through analysis within the
  Threats Dashboard.

</Callout>

1.  Navigate to the **Managed Rules** page.
    {{ SECURITY_NAV }} **Managed Rules**.
2.  Click on the desired managed rule.
3.  Make the desired changes.
4.  Click **Submit**.

**To delete a managed rule**

<Callout type="important">

  You cannot delete a managed rule that is associated with a Security
  Application configuration. Please either modify the Security
  Application configuration to point to a different managed rule or
  delete that Security Application configuration.

</Callout>

1.  Check your Security Application configurations to verify
    that the desired managed rule is not in use.
2.  Navigate to the **Managed Rules** page.
    {{ SECURITY_NAV }} **Managed Rules**.
3.  Click on the desired managed rule set.
4.  Click **Delete**.
5.  Click **Confirm**.
