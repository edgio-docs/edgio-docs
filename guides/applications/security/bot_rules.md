---
title: Bot Manager
---

Bot Manager is designed to mitigate undesired bot traffic and prevent them from performing undesired or malicious activity, such as scraping your site, carding, taking over accounts through credential stuffing, spamming your forms, launching DDoS attacks, and committing ad fraud.

There are two versions of Bot Manager: 

-   **Bot Manager Standard:** This version is designed to mitigate basic bots through a browser challenge. 

    <Callout type="important">

      Solving a challenge requires a JavaScript-enabled client. Users that have disabled JavaScript on their browsing session will be unable to
  access content protected by bot rules.

    </Callout>

-   **Bot Manager Advanced:**  This version adds an additional layer of security that is dedicated to bot detection and mitigation. It is designed to automatically detect known bots (e.g., search bots) and bad bots, including those that spoof good bots, by analyzing requests and behavior. You may even customize how bad bots are detected and mitigated by defining custom criteria that profiles a bad bot and the action that we will take for that traffic. Bot Manager Advanced is also able to mitigate basic bots by requiring a web browser to resolve a JavaScript challenge before our service will resolve traffic. Finally, it provides actionable near real-time data on detected bots through which you may fine-tune your configuration to reduce false positives.

<Callout type="info">

  Bot Manager requires activation. {{ ACCOUNT_UPGRADE }}

</Callout>

## How Does It Work? {/*how-does-it-work*/}

The differences between the behavior of Bot Manager Standard and Bot Manager Advanced are described below.

### Bot Manager Standard {/*bot-manager-standard*/}

Bot Manager Standard requires a client (e.g., a web browser) to solve a challenge before resolving the request. {{ PRODUCT }} {{ PRODUCT_SECURITY }} blocks traffic when the client cannot solve this challenge within a few seconds. Basic bots typically cannot solve this type of challenge and therefore their
traffic is blocked. [Learn more.](#browser-challenge)

### Bot Manager Advanced {/*bot-manager-advanced*/}

Bot Manager Advanced inspects each request to determine whether the client:

1.  Matches a known good bot (e.g., search bot).
2.  Is spoofing a known good bot.
3.  Matches a rule. A rule defines the criteria that our service will use to identify a bad bot.
    
    You may identify bots using:
    
    -   Information derived from the request, such as geolocation, IP address, and the URL path.
    -   Our request and behavioral analysis that assigns a bot score to the request that defines our level of confidence that it is a bot.

        <Callout type="tip">

          You may set actions based off of bot score thresholds.  
          
          For example, you may redirect requests whose bot score is between 50 and 80% and block requests whose bot score is greater than 80%.

        </Callout>

    -   The JA3 fingerprint assigned to the request. A JA3 fingerprint identifies a client using key characteristics from a TLS request. This allows us to classify traffic as a specific bot across various IP addresses and ports.

**Key information:**

-   Your configuration determines how our service will handle the above traffic patterns.
-   If a request satisfies multiple criteria, then the above order determines the action that will be applied to it. Specifically, the order of precedence is:
    
    `Known Bots > Spoofed Bots > Bots Identified by a Rule`
    
-   Bypass the above bot detection measures by creating an exception for one or more URL(s), user agent(s), JA3 fingerprint(s), or cookie(s).

## Actions {/*actions*/}

If you are using Bot Manager Standard, then you may only apply a browser challenge to requests. If you are using Bot Manager Advanced, then you may apply any of the following enforcement actions to bot traffic:

-   **Alert:** Generates an alert. Use this mode to track detected threats through the **Security** dashboard without impacting production traffic.
-   **Block:** Drops the request and the client will receive a `403 Forbidden` response. <a id="browser-challenge" />
-   **Browser Challenge:** Sends a browser challenge to the client. The client must solve this challenge within a few seconds.

    **Response:** The results of the above browser challenge determines what happens next.

    -   **Solved:** If the client is able to solve the challenge, then our CDN serves the requested content. Additionally, a cookie will be added to the user's session. This cookie instructs our CDN to serve content to the user without requiring a browser challenge. Once the cookie expires, new requests for content protected by Bot Manager will once again require the client to solve a challenge.

        <Callout type="info">

          Define the duration for this cookie through the **Valid for (in seconds)** option.

        </Callout>

    -   **Unsolved:** If the client is unable to solve the challenge, then our CDN responds with a new browser challenge.

    **Key information:**

    -   Solving a challenge requires a JavaScript-enabled client. Users that have disabled JavaScript on their browsing session will be unable to access content protected by browser challenges.
    -   We strongly recommend that you avoid applying browser challenges to machine-to-machine interactions.
    
        For example, applying browser challenges to API traffic will disrupt your API workflow.
    
    -   The **HTTP Status Code** option determines the HTTP status code for the response provided to clients that are being served the browser challenge.

        <Callout type="info">

          Setting this option to certain status codes (e.g., `204`) may prevent clients that successfully solve a browser challenge from properly displaying your site.

        </Callout>

    -   You may define a custom payload for the browser challenge by enabling the **Custom Browser Challenge Page** option and then setting the **Browser Challenge Page Template** option to a Base64-encoded HTML page that we will serve as a custom browser challenge. This HTML page must satisfy the following requirements:

        -   It must contain the following mustache: `{{BOT_JS}}`

            <Callout type="tip">

              Due to the speed at which our JavaScript function is executed, we recommend that you place the `{{BOT_JS}}` mustache after all rendered content (e.g., near the end of the document's body).

            </Callout>

            <Callout type="info">

              We will replace the above `{{BOT_JS}}` mustache with JavaScript upon serving a browser challenge.

            </Callout>

        -   It must check whether the user agent allows JavaScript using a `<noscript>` tag. Your custom HTML must display an error message if it has been disabled.
        -   It must check whether the user agent allows third-party cookies. Your custom HTML must display an error message if they have been disabled.

        <Callout type="info">

          A custom browser challenge will not be served if your custom HTML does not satisfy the above requirements.

        </Callout>

    <a id="custom-response" />

-   **Custom Response:** Returns a custom response.

    -   Response body: Define the payload that will be delivered to the client.

        <Callout type="tip">

          This option supports the use of [event variables](/applications/security/security_applications#event-variables) to customize the response.

        </Callout>

        **Sample payload for a HTML file:**

        ```html
        <!DOCTYPE html><html>
    
        <head><title>Page Not Found</title></head>
    
        <body>Page not found.</body>
    
        </html>
        ```
    
    -   **HTTP Status Code:** Defines the HTTP status code that will be sent to the client.
    
    -   **Custom Response Headers:** Defines one or more response headers that will be sent to the client. Define each custom response header on a separate line.
    
        **Syntax:** `<HEADER>:<VALUE>`
    
        **Example:** `MyCustomHeader: True`

        <Callout type="info">

          This option supports the use of [event variables](/applications/security/security_applications#event-variables) to customize the response.

        </Callout>

        <Callout type="info">
    
          All characters, including spaces, defined before or after the colon will be treated as a part of the specified header name or value, respectively.

        </Callout>

-   **reCAPTCHA:** Performs an automated assessment of a client's interaction with your site. This assessment, which is performed without user interaction, requires [Google reCAPTCHA v3](https://www.google.com/recaptcha/about/).

    **Response:** The results of the above reCAPTCHA determines what happens next.

    -   **Acceptable:** If the client's reCAPTCHA score is acceptable, then our CDN serves the requested content. Additionally, a cookie will be added to the user's session. This cookie instructs our CDN to serve content to the user without performing an additional reCAPTCHA assessment. Once the cookie expires, new requests for content protected by Bot Manager will require the client's interactions with your site to be reassessed.

        <Callout type="info">

          Define the duration for this cookie through the **Valid for (in seconds)** option.

        </Callout>

    -   **Unacceptable:** If the client's reCAPTCHA score is unacceptable, then the response from the CDN is determined by the enforcement action defined within the reCAPTCHA's **Rule Action** option. You may set this option to any enforcement action, with the exception of Browser Challenge, that has been enabled within this bot rule set.

    **Key information:**

    -   Google reCAPTCHA v3 is a score-based system that learns through real traffic. For this reason, we recommend that you avoid applying reCAPTCHA to machine-to-machine interactions.

    -   Setting up reCAPTCHA requires:

        1.  [Adding reCAPTCHA v3 to your site](https://www.google.com/recaptcha/admin/create) through Google. Upon adding reCAPTCHA to your site, Google will provide a reCAPTCHA site key and secret key. 
        2.  Configure a reCAPTCHA action within the desired bot rule set. 
        3.  From the **Bot Rules** tab, find the desired bot rule(s) and set the **Rule Action** option to `reCAPTCHA`. Save your changes.
        4.  From the desired Security Application configuration:

            1.  Verify that the **Production Bot Manager** option is set to the above bot rule set. 
            2.  Toggle the **reCAPTCHA off** option to **reCAPTCHA on**.
            3.  Set the **reCAPTCHA Site Key** option to the site key provided by Google in step 1.
            4.  Set the **reCAPTCHA Secret Key** option to the secret key provided by Google in step 1.
            5.  Save your changes.

    -   The **Action Status** option determines the HTTP status code for the response provided to clients that are being assessed through reCAPTCHA.

        <Callout type="info">

          Setting this option to certain status codes (e.g., `204`) may prevent clients from properly displaying your site.

        </Callout>

-   **Redirect:** Redirects requests to the specified URL.

    **Key information:**

    -   The HTTP status code for this response will be a `302 Found`.
    -   Set the **URL** option to the full URL to which requests will be redirected.
    
        **Example:** `http://cdn.mydomain.com/marketing/busy.html`

## Bot Manager Configuration {/*bot-manager-configuration*/}

Each rule within a Bot Manager configuration identifies bot traffic. Each rule contains:

-   Up to 6 conditions that define request identification criteria.
-   A rule ID and message that will be associated with requests identified by this rule.
    
    <Callout type="tip">

      Assigning a unique ID and message to each rule makes it easy to identify requests detected as a result of a specific rule.

    </Callout>

    <Callout type="info">

      A rule ID must be a number between 77,000,000 and 77,999,999.

    </Callout>

<Callout type="info">

  A Bot Manager configuration may contain up to 10 rules.

</Callout>

### Custom Bot Detection {/*custom-bot-detection*/}

A request must satisfy at least one rule before WAF will consider it bot traffic. There are two types of rules, which are:

-   **Custom Matches:** This type of rule is satisfied when a match is found for each of its conditions. A condition defines what will be matched (i.e., variable), how it will be matched (i.e., operator), and a match value.
    
    <Callout type="info">

      Certain variables match on key-value pairs. If you match on multiple keys within a single variable, {{ PRODUCT }} {{ PRODUCT_SECURITY }} will only need to find one of those matches to satisfy that variable.
    
      For example, if you set up a request header variable to match for `Authorization` and `Content-Type`, then requests that contain either or both of those headers will satisfy that variable.

    </Callout>
    
-   **Edgecast Reputation DB:** This type of rule is satisfied when the client's IP address matches an IP address defined within our reputation database. Our reputation database contains a list of IP addresses known to be used by bots.

**Example #1:**

This example assumes that your Bot Manager configuration contains the following two rules:

| Rule | Type           | Description                            |
|------|----------------|----------------------------------------|
| 1    | Custom matches | This rule contains a single condition. |
| 2    | Custom matches | This rule contains two conditions.     |

Assuming the above configuration, WAF identifies bot traffic whenever either of the following conditions are met:

-   A match is found for the variable defined in the first rule's condition.
-   A match is found for the variables defined in both of the second rule's conditions.

**Example #2:**

This example assumes that your Bot Manager configuration contains the following two rules:

| Rule | Type                   | Description                                                                                                |
|------|------------------------|------------------------------------------------------------------------------------------------------------|
| 1    | Custom matches         | This rule contains two conditions.                                                                         |
| 2    | Edgecast Reputation DB | This rule is satisfied when the client's IP address matches an IP address within our reputation database. |

Assuming the above configuration, {{ PRODUCT }} {{ PRODUCT_SECURITY }} applies bot rules protection under either of the following circumstances:

-   A match is found for the variables defined in both of the first rule's conditions.
-   The client's IP address matches an IP address within our reputation database.

#### Conditions {/*conditions*/}

A condition determines how requests will be identified through variables, operators, match values, transformations, and negative matching.

##### Variables {/*variables*/}

A variable identifies the request element that {{ PRODUCT }} {{ PRODUCT_SECURITY }} will analyze. We support the following request elements:

<a id="asn" />

-   **ASN:** Identifies requests by the Autonomous System Number (ASN) associated with the client's IP address.

    <Callout type="tip">

      Specify a regular expression to match for multiple ASNs.

      **Example:**

      Use the following pattern to match for requests from 15133 and 14153: `15133|14153`

    </Callout>

    <a id="bot-score" />

-   **Bot score:** Bot Manager Advanced only. Identifies requests based off a score that defines our level of confidence that it is a bot. This score is calculated by analyzing the request and its behavior. The range for this score is 0 to 100.

    <a id="country" />

-   **Country:** Identifies requests by the country from which the request originated. Specify the desired country using a [country code](/applications/reference/country_codes).

    <Callout type="tip">

      Specify a regular expression to match for multiple country codes.

      **Example:**

      Use the following pattern to match for requests from the United States, Canada, and Mexico: `US|CA|MX`

    </Callout>

    <a id="ip-address" />

-   **IP address:** Identify requests by the requester's IPv4 and/or IPv6 address. 

    -   Specify a comma-delimited list of the desired IP address(es) using standard IPv4/IPv6 and CIDR notation. 
    -   Specify a subnet by appending a slash (/) and the desired bit-length of the prefix (e.g., 11.22.33.0/22). 
    -   Do not specify more than 1,000 IP addresses or IP blocks.

    **Example:** `192.0.2.20,203.0.113.0/24,2001:DB8::/32`

    <a id="ja3" />

-   **Ja3:** Bot Manager Advanced only. Identifies requests by the JA3 fingerprint assigned to the request. A JA3 fingerprint identifies a client using key characteristics from a TLS request. This allows us to classify traffic as a specific bot across various IP addresses and ports.

    <a id="request-cookies" />

-   **Request cookies:** Match against all or specific cookies.

    -   **All:** Do not specify the desired cookie within this variable. Specify the desired cookie value or pattern within the **Match value** option.
    -   **Specific Cookies:** Define the name of the desired cookie within this variable. Specify the desired cookie value or pattern within the **Match value** option.

        <Callout type="info">

          Setting up a cookie variable also allows you to define whether {{ PRODUCT }} {{ PRODUCT_SECURITY }} uses a regular expression, a negative match, or both when comparing the value assigned to the variable against cookies. Use a negative match to find requests whose payload does not
          contain the specified cookie.

        </Callout>

    <a id="request-header" />

-   **Request header:** Match against all or specific request headers.

    -   **All:** Do not specify the desired request header within this variable and specify the desired header value or pattern within the **Match value** option.
    -   **Specific Request Headers:** Define the name of the desired request header within this variable and specify the desired header value or pattern within the **Match value** option.

        <Callout type="info">

          Setting up a request header variable also allows you to define whether {{ PRODUCT }} {{ PRODUCT_SECURITY }} uses a regular expression, a negative match, or both when comparing the value assigned to the variable against request headers. Use a negative match to find requests whose
          payload does not contain the specified request header.

        </Callout>

    <a id="request-method" />

-   **Request method:** Match against request method (e.g., `GET` and `POST`).

    <a id="request-query-string" />

-   **Request query:** Match against the request's query string. Specify the desired value or pattern within the **Match value** option.

    <a id="request-uri" />

-   **Request URI:** Match against the request's URL path and query string. Define a URL path that starts directly after the hostname. Exclude the protocol and hostname when defining this property.

    **Sample values:** `/marketing?id=123456` and `/resources/images`

    <a id="request-url-path" />

-   **Request URL path:** Match against the request's URL path. Define a URL path that starts directly after the hostname. Exclude the protocol, hostname, and query string when defining this property.

    **Sample values:** `/marketing` and `/resources/images`

    <a id="count" />

<Callout type="info">

  All variables support the ability to match on the number of times that a request element is found within the request. Set up a variable to match on the number of instances instead of inspecting the element for a specific value or regular expression pattern by marking the **Count** option.

</Callout>

<Callout type="info">

  You may define zero or more keys when setting up variables that match on key-value pairs. {{ PRODUCT }} {{ PRODUCT_SECURITY }} must find at least one of the specified keys in the request before that variable will be satisfied. For example, if you set up a request header variable to match for `Authorization` and `Content-Type`, then requests that contain either or both of those headers will satisfy that variable.

</Callout>

##### Operators {/*operators*/}

An operator determines how {{ PRODUCT }} {{ PRODUCT_SECURITY }} will compare a match value against the request element identified by a variable.
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

{{ PRODUCT }} {{ PRODUCT_SECURITY }} uses a match value to identify threats.
-   **Default:** By default, {{ PRODUCT }} {{ PRODUCT_SECURITY }} compares a match value against the request element identified by a variable (e.g., URL path or a
    request header's value).
-   **Count:** Enable the **Count** option on a variable to compare this value against the number of times that the request element identified by a variable (e.g., a specific cookie or request header) occurs within the request.

**Example:**

This example assumes the following configuration:

```
Variable: Request header = Authentication
Match value: 1
```

We will now examine how the **Count** option affects comparisons for this configuration.
-   **Disabled:** If the **Count** option has been disabled on the variable, then {{ PRODUCT }} {{ PRODUCT_SECURITY }} will compare the value of the
    `Authentication` request header to `1`.
-   **Enabled:** If the **Count** option has been enabled on the variable, then {{ PRODUCT }} {{ PRODUCT_SECURITY }} will compare the number of times that the
    `Authentication` request header occurred in the request to *1*.

<Callout type="info">

  The type of comparison that will be performed is determined by the **Operator** option.

</Callout>

## Exceptions {/*exceptions*/}

Bot Manager Advanced allows you to exempt traffic from bot detection by URL, user agent, JA3 fingerprint, and cookie.

**Key information:**

-   Define each entry on a separate line.
-   URL, user agents, and cookies are regular expressions.
-   A JA3 fingerprint identifies a client using key characteristics from a TLS request.
-   Our service will only bypass bot detection when it finds an exact match for a JA3 fingerprint exception.

    <Callout type="info">

      Use the **Security** dashboard to find the JA3 fingerprint that corresponds to a false positive.

    </Callout>

## Bot Manager Configuration Administration {/*bot-manager-configuration-administration*/}

You may create, modify, and delete Bot Manager configurations.

**Key information:**
-   Administer Bot Manager configurations from the **Bot Manager** page.
-   Apply a Bot Manager configuration to production traffic by adding it to a [Security Application configuration](/applications/security/security_applications). Multiple Security Application Manager configurations may use the same Bot Manager configuration.
-   It typically takes less than a minute to apply Bot Manager configuration changes across our entire network.

**To create a Bot Manager configuration**
1.  Navigate to the **Bot Rules** page.
    {{ SECURITY_NAV }} **Bot Rules**.
2.  Click **Add Bot Rule**.
3.  In the **Name** option, type the unique name by which this Bot Manager configuration will be identified. This name should be sufficiently descriptive to identify it when setting up a Security Application Manager configuration.
4.  Set up the desired enforcement action(s). 

    <Callout type="info">

      Bot Manager Standard only supports browser challenges. Once you have defined a browser challenge, skip to step 7.

    </Callout>

    -   Perform the following steps to set up a browser challenge:

        1.  From the **HTTP status code** option, determine the HTTP status code for the response provided to clients that are being served the browser challenge.

            <Callout type="info">

              Setting this option to certain status codes (e.g., `204`) may prevent clients that successfully solve a browser challenge from properly displaying your site.

            </Callout>

        2.  From the **Valid for (in seconds)** option, type the number of seconds for which our CDN will serve content to a client that solves a browser challenge without requiring an additional browser challenge to be solved. Specify a value between 1 and 1,000,000 seconds.
        3.  Serve a custom browser challenge by enabling the **Custom Browser Challenge Page** option and then setting the **Browser Challenge Page Template** option to the desired payload.

    -   **Bot Manager Advanced:** Set up a browser challenge (see above), custom response, or redirect that can be applied to known bots, spoofed bots, and bots detected through rules.

        <Callout type="info">

          Unlike other actions, alert actions do not require configuration before they can be applied to bot traffic.

        </Callout>

        -   **Block:** From the **Actions** section, select **Block** and then toggle it to the on position.

        -   **Custom Response:** Perform the following steps:

            1.  From the **Actions** section, select **Custom Response**.
            2.  From the **Response Body** option, specify the body of the response that will be sent to clients.
            3.  From the **HTTP status code** option, determine the HTTP status code for the response that will be sent to clients.
            4.  From the **Response Headers** option, define each desired [custom response header](#custom-response) on a separate line.
                
                **Example:** `MyCustomHeader: True`

        -   **reCAPTCHA:** Perform the following steps to set up a reCAPTCHA:

            1.  Set the **Rule Action** option to the enforcement action that will be applied when a client's reCAPTCHA score falls below an acceptable level.
            2.  From the **Action Status** option, determine the HTTP status code for the response provided to clients that are being served the reCAPTCHA.

                <Callout type="info">

                  Setting this option to certain status codes (e.g., `204`) may prevent clients from properly displaying your site.

                </Callout>

            3.  From the **Valid for (in seconds)** option, type the number of seconds for which our CDN will serve content to a client with an acceptable reCAPTCHA score without reassessment. Specify a value between 1 and 1,000,000 seconds.

            <Callout type="important">

              You must enable reCAPTCHA within a Security Application configuration and provide your Google reCAPTCHA site and secret keys.

            </Callout>

        -   **Redirect:** Set the **URL** option to the full URL to which requests will be redirected.

5.  Bot Manager Advanced only. Perform the following steps to automatically detect known bots:
    
    1.  From the left-hand pane, verify that **Known Bots** is selected. 
    2.  Select whether to apply an action to all known bots (**Toggle all**), a specific bot, or to 200+ bots (**other**).

        <Callout type="info">

          Toggle **other** to apply an action to 200+ known good bots. This option excludes the bots listed on the **Known Bots** tab. 

        </Callout>

    3.  From the **Actions** column, select the action that will be applied to each known bot that was enabled in the previous step.
    4.  Repeat steps 2 and 3 as needed.

6.  Bot Manager Advanced only. The **Spoofed Bots** section determines how to handle traffic that spoofs the known bots selected in the previous step. From the **Rule Action** option, select the desired action.

    <Callout type="info">

      The **Spoofed Bots** section does not apply to the 200+ known bots defined within the `other` category.

    </Callout>

7.  Create rules for identifying bots from the **Bot Rules** tab. 

    1.  Click **+ Create New Rule**.
    2.  In the **Rule type** option, select the type of rule that will be created.
        
        -   **Custom Matches:** This type of rule is satisfied when a match is found for each of its conditions.
            
            1.  Optional. In the **Name of Rule** option, type a name that identifies the purpose of this rule.
            2.  In the **Rule ID** option, specify a number between 77,000,000 and 77,999,999.
            3.  In the **Rule message** option, type a brief description for this rule.
            4.  A custom matches rule automatically includes a default condition. Modify this condition to determine how WAF will identify requests. From the condition's **Variable** option, select the request element through which WAF will identify requests.
                
                [Learn more about variables.](#variables)
                
            5.  Certain variables (e.g., request cookies and request header) match on name and value. If you have selected this type of variable, then perform the following steps:
                
                1.  Click **+ Add Match**.
                2.  From the **Name** option, type the desired name.
                    
                    For example, match for requests that contain an `Authorization` header by setting this option to `Authorization`.
                    
                3.  Optional. Mark the **Negative Match** option to match for requests that do not contain a matching value for the name defined in the previous step.
                4.  If you specified a regular expression in the **Name** option, then you should mark the **Regex Match** option.
                5.  Optional. Add another match through which this variable can be satisfied by repeating the above steps.
            6.  Optional. Mark the **Count** option to match by the number of instances that a match is found instead of by inspecting that request element.
                
                [Learn more.](#count)
                
            7.  From the **Operator** option, select an operator that determines how WAF will compare the match value to the request element identified by the above variable.
                
                [Learn more.](#operators)
                
            8.  In the **Match value** option, type the value that will be compared against the request element identified by the above variable.
            9.  Optional. Mark the **Negative Match** option to match for requests that do not contain a matching value for the value defined in the previous step.
            10.  Optional. Click **+ Add Condition** to add another condition that must be met prior to request identification. 
        -   **Edgecast Reputation DB:** This type of rule is satisfied when the client's IP address matches an IP address within our reputation database. Proceed to the next step.

    3.   Click the **Save** button that appears directly below your rule.
8.  Optional. Add another rule by repeating step 7.
9.  Optional. Bot Manager Advanced only. Identify traffic that will bypass bot detection.

    1.  Click the **Exceptions** tab.
    2.  Add the desired URL(s), user agent(s), JA3 fingerprint(s), and cookie(s) as [exception(s)](#exceptions).

        <Callout type="info">

          Place each entry on a separate line.

        </Callout>

10.  Click **Save**.

**To modify a Bot Manager configuration**
1.  Navigate to the **Bot Manager** page.
    {{ SECURITY_NAV }} **Bot Manager**.
2.  Click on the desired bot rule set.
3.  Make the desired changes.

    **Key tasks:**
    -   Bot Manager Advanced only. Add, modify, or delete an action.
    -   Bot Manager Advanced only. Set or modify the action that will be taken for all known bots, specific known bots, and spoofed bots from the **Known Bots** tab.
    -   Bot Manager Advanced only. Update your exceptions to bot detection by adding, modifying, or deleting entries from the **Exceptions** tab.
    -   Change the [type of rule](#request-identification) from the **Rule type** option.
    -   **Custom matches only:** Delete variables and matches within a variable by clicking the <Image inline src="/images/v7/icons/remove.png" alt="Delete" /> (delete) icon.
    -   **Custom matches only:** Delete a condition by clicking **Delete Condition**.

        <Callout type="info">

          A rule must have at least one condition. Therefore, you cannot delete the root condition.

        </Callout>

    -   Delete a rule by clicking **Delete Rule** and then clicking **Confirm**.
4.  Click **Save**.

**To delete a Bot Manager configuration**

1.  Navigate to the **Bot Manager** page.
    {{ SECURITY_NAV }} **Bot Manager**.
2.  Click on the desired Bot Manager configuration.
3.  Click **Delete**.
6.  When prompted, confirm the deletion by clicking **Confirm**.
