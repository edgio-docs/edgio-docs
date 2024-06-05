---
title: Client-Side Protection
---

Client-Side Protection allows you to apply a consistent Content Security Policy (CSP) across all of your pages. The purpose of a CSP is to detect and mitigate attacks, such as cross-site scripting (XSS) and code injection. It does this by defining the type of resources that can be loaded on your site and the location from which they can be loaded. Use Client-Side Protection to detect, monitor, and block CSP violations.

<Callout type="info">

  Client-Side Protection requires {{ PRODUCT }} {{ PRODUCT_SECURITY }} Standard and manual activation. {{ ACCOUNT_UPGRADE }}

</Callout>

## How Does It Work? {/*how-does-it-work-*/}

Client-Side Protection allows you to define a production and an audit configuration within a single Client-Side Protection policy. 

-   **Production:** Your production configuration defines the CSP that clients will enforce. It sets this CSP through the `Content-Security-Policy` response header. 
-   **Audit:** Your audit configuration allows you to test a new CSP or audit the assets being loaded by your clients. It sets a CSP through the `Content-Security-Policy-Report-Only` response header. 

<Callout type="info">

  Client-Side Protection takes precedence over Rules. Specifically, Client-Side Protection can override a CSP response header set through Rules.

</Callout>

Once you have applied a Client-Side Protection policy to your traffic, each CSP violation will be listed within the **Report** section of the **Client Protection** page. Review each violation to either confirm that it is malicious or to identify how your CSP should be adjusted.

## Quick Start {/*quick-start*/}

1.  Set up a Client-Side Protection policy by defining a production CSP, audit CSP, or both. 
2.  Apply the Client-Side Protection policy to your traffic by selecting it from a Security Application. 

    <Callout type="info">

      A Security Application configuration determines the set of requests to which your Client-Side Protection policy will be applied.

    </Callout>

## Policy Administration {/*policy-administration*/}

You may create, modify, and delete Client-Side Protection policies. 

**Key information:**

-   Apply a policy to your traffic by adding it to a [Security Application configuration](/applications/security/security_applications).
-   It may take up to 2 minutes for an updated policy to be applied across our entire network.

**To create a Client-Side Protection policy**
1.  Navigate to the **Client Protection** page.
    {{ SECURITY_NAV }} **Client Protection**.
2.  Click **+ New Policy**.
3.  Type the unique name by which this policy will be identified. This name should be sufficiently descriptive to identify it when setting up a Security Application configuration.
4.  Define an Audit policy through which you can detect attacks.

    1.  Click on the **Audit** tab.
    2.  From the **Overwrite Origin** option, determine whether this policy will override the policy defined within the `Content-Security-Policy-Report-Only` response header provided by your origin. 

        -   **Enabled:** Your audit policy will overwrite the `Content-Security-Policy-Report-Only` header when present in the response provided by an origin. 

            If the **Status** option is disabled, then {{ PRODUCT }} will not set this header. As a result, your origin will be allowed to set this header.

        -   **Disabled:** If the response from your origin includes a `Content-Security-Policy-Report-Only` header, then it will be served. If it is missing and the **Status** option is enabled, then this header will be set to your audit policy.
        
            <Callout type="info">
            
              The {{ PORTAL }} only reports Client-Side Protection violations. Specifically, it excludes violations for a CSP defined by your origin. If you would like to monitor these violations through your own workflow, you should define the `report-to` directive. 
            
            </Callout>

    3.  From the **Status** option, determine whether {{ PRODUCT }} will audit your traffic using this policy.

        -   **Enabled:** Violations will be reported from within the **Client Protection** page.
        -   **Disabled:** {{ PRODUCT }} will not set the `Content-Security-Policy-Report-Only` header to your audit policy. However, this header can still be set through either Rules or by your origin.

    4.  Define a policy by performing either of the following steps:
        -   **Rule Editor:** Use our rule editor to construct the value of the `Content-Security-Policy-Report-Only` response header.

            1.  Expand the desired [directive](#content-security-policy-directives).
            2.  [Configure it](#csp-source-configuration) as desired. 
            3.  Repeat steps 1 and 2 as needed.

        -   **Raw Editor:** Manually set the value of the `Content-Security-Policy-Report-Only` response header.
            1.  Click the **Raw Editor** tab.
            2.  From the **Use this Content-Security-Policy-Report-Only** option, set the value of the `Content-Security-Policy-Report-Only` response header.

5.  Define a Production policy through which you can block violations.

    1.  Click the **Production** tab.
    2.  From the **Overwrite Origin** option, determine whether this policy will override the policy defined within the `Content-Security-Policy` response header provided by your origin. 

        -   **Enabled:** Your production policy will overwrite the `Content-Security-Policy` header when present in the response provided by an origin.

            If the **Status** option is disabled, then {{ PRODUCT }} will not set this header. As a result, your origin will be allowed to set this header.

        -   **Disabled:** If the response from your origin includes a `Content-Security-Policy` header, then it will be served. If it is missing and the **Status** option is enabled, then this header will be set to your production policy.
        
            <Callout type="info">
            
              The {{ PORTAL }} only reports Client-Side Protection violations. Specifically, it excludes violations for a CSP defined by your origin. If you would like to monitor these violations through your own workflow, you should set the `Reporting-Endpoints` response header. 
            
            </Callout>

    3.  From the **Status** option, determine whether {{ PRODUCT }} will set the `Content-Security-Policy` response header to your production policy.

        -   **Enabled:** Sets the `Content-Security-Policy` header to your production policy. Violations will be reported from within the **Client Protection** page.
        -   **Disabled:** {{ PRODUCT }} will not set the `Content-Security-Policy` header to your production policy. However, this header can still be set through either Rules or by your origin. 

    4.  Define a policy by performing either of the following steps:
        -   **Rule Editor:** Use our rule editor to construct the value of the `Content-Security-Policy` response header.

            1.  Expand the desired [directive](#content-security-policy-directives).
            2.  [Configure it](#csp-source-configuration) as desired. 
            3.  Repeat steps 1 and 2 as needed.

        -   **Raw Editor:** Manually set the value of the `Content-Security-Policy` response header.

            1.  Click **Raw Editor**.
            2.  From the **Use this Content-Security-Policy** option, set the value of the `Content-Security-Policy` response header.

6.  Click **Save**.

**To modify a Client-Side Protection policy**

1.  Navigate to the **Client Protection** page.
    {{ SECURITY_NAV }} **Client Protection**.
2.  Open the desired policy by clicking on it.
3.  Make the desired changes.
4.  Click **Save**.

**To delete a Client-Side Protection policy**

1.  Navigate to the **Client Protection** page.
    {{ SECURITY_NAV }} **Client Protection**.
2.  Open the desired policy by clicking on it.
3.  Click **Delete**.
4.  When prompted, click **Confirm** to confirm the deletion of this policy.

## Content Security Policy Directives {/*content-security-policy-directives*/}

A brief description for each CSP directive is provided below.

-   **default-src:** If set, this directive serves as the default configuration for all fetch directives. 

    A fetch directive ends with `-src` (e.g., `style-src` and `script-src`). For example, if `style-src` is not defined within your policy, then the `default-src` directive determines the security policy for loading stylesheets.
-   **style-src:** This directive defines valid sources for loading stylesheets.
-   **script-src:** This directive defines valid sources for loading JavaScript.
-   **img-src:** This directive defines valid sources for loading images and favicons.
-   **font-src:** This directive defines valid sources for loading fonts through `@font-face`.
-   **connect-src:** This directive defines valid URLs for the following script interfaces:
    -   **&lt;a> ping:** Allows hyperlink monitoring and tracking.
    -   **fetch():** Enables network requests through the Fetch API.
    -   **XMLHttpRequest (XHR / AJAX):** Allows asynchronous communication with a server.
    -   **WebSocket:** Facilitates real-time communication between the client and server through a WebSocket connection.
    -   **EventSource:** Allows server-sent events (SSE).
    -   **Navigator.sendBeacon():** Sends data asynchronously to a server through an HTTP `POST` request.

-   **frame-src:** This directive defines valid sources for loading frames (e.g., `<frame>` and `<iframe>`).
-   **media-src:** This directive defines valid sources for loading multimedia files through the `<audio>` and `<video>` elements.
-   **worker-src:** This directive defines valid sources for loading workers through Worker, SharedWorker, or ServiceWorker scripts.
-   **form-action:** This directive defines valid URLs for form submissions.

### CSP Source Configuration {/*csp-source-configuration*/}

You must define a source configuration for each enabled CSP directive. However, the set of supported source configurations vary by directive. 

-   **allowlist:** Allows content from one or more URL(s). 

    -   Specify a hostname or IP address. The scheme, port, and path are optional. 
    -   Use a space character to delimit each URL.
    -   Use the `*` wildcard to match one or more character(s). 
    -   **Example:** `example.com https://cdn.example.com`

-   **none:** Blocks all sources. 
-   **self:** Allows content from the same domain as the current page, but disallows content from subdomains.
-   **unsafe-inline:** Allows inline scripts and styles, which are typically considered unsafe. If your site requires inline content, we recommend using `nonce` or `hash` instead.
-   **unsafe-eval:** Allows the use of `eval()` and similar methods for creating code from strings. This is typically considered unsafe.
-   **hash:** Allows scripts or styles whose SHA-256 hash matches one of the provided values.

    Create a hash by attempting to load the file and then checking the browser's console error message. It will report the expected hash. Set the `hash` source configuration to this hash value. 

-   **nonce:** A randomly generated token used to allow a specific file (e.g., script or stylesheet). Define this single use token, which should be regenerated on each page load, within each desired tag. 

    **Example:** `<script nonce="ABC123">...</script>`

## Monitoring Violations {/*monitoring-violations*/}

Monitor violations for all Client-Side Protection policies from the **Report** section of the **Client Protection** page. Use this report to:

-   Find out the location from which resources are being loaded. 

    For example, you could configure an Audit policy's `default-src` to `none`. After which, the **Audit** tab would list all resources loaded by your site and the location from which they were loaded. 

-   Identify valid resources that violate your production policy. After which, you should adjust your production policy to allow those resources to be loaded.

**Key information:**
-   Violations are categorized according to whether the request violated a production or audit policy. These violations are listed on the **Production** tab and the **Audit** tab, respectively.
-   Violations are sorted from most recent to oldest.
-   By default, violations for the last hour are shown. However, you may view violations for up to the last 30 days. Adjust the report's time period from the time period option on the right-hand side. 

    ![Client-Side Protection - Report - Time period](/images/v7/security/client-side-protection-report-time-period.png)

-   View additional information about the request by clicking on the `Details` link.

## Best Practices for Multiple Properties {/*best-practices-for-multiple-properties*/}

Setting up Client-Side Protection for multiple properties introduces complexity due to existing Content-Security Policies (CSPs). Simplify this configuration through the following procedure:

1.  Track each origin server that defines a CSP. Note the CSP that it sets.
2.  Set up a strict audit Client-Side Protection policy and apply it to one of your properties. 

    -   The default settings for a new Client-Side Protection policy creates a strict audit configuration. 
    -   Apply your Client-Side Protection policy to one of your properties by restricting its Security Application configuration to the set of hostnames associated with that property. 
    -   The purpose of this strict policy is to identify the assets being loaded by your site. 

3.  Define a production policy within the above Client-Side Protection policy. 

    -   This production policy should allow all of the resources associated with the property identified in step 2 to be loaded. If an origin server associated with this property sets a CSP, then your initial configuration should use that CSP.
    -   Make sure that the **Status** option remains disabled. This allows us to collect logs without enforcing your CSP.
    -   Enable the **Overwrite Origin** option.

4.  After 24 hours have passed, review logs and adjust your production policy as needed.
5.  Once you have optimized your production policy, you should enable the **Status** option.
6.  Identify all properties that should use this CSP. Update the Security Application configuration to include the hostnames associated with those properties.  
7.  For all remaining properties, develop and apply separate policies by performing steps 2 - 6.