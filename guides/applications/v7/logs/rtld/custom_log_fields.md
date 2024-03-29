---
title: Custom Log Fields (RTLD CDN)
---

RTLD CDN supports logging:
-   [Request headers, response headers, and cookies.](#headers-and-cookies)
-   [Headers through Rules.](#custom-logging-through-rules)

## Headers and Cookies {/*headers-and-cookies*/}

Setting up logging for a request header, response header, or a cookie is a two-step process that you must perform for each desired environment.

1.   Register the desired header(s) and cookie(s) from within the **Realtime Log Delivery** page. 
2.   Add the desired header(s) and cookie(s) within the desired RTLD CDN profile.

**Key information:**

-   It may take up to 90 minutes before {{ PRODUCT }} starts logging newly registered headers and cookies. 
-   Changes to a RTLD profile take effect quickly. If logging for a custom header or cookie has not been fully propagated, then RTLD will set those fields to blank values. 

**To set up header or cookie logging**

1.  Register the desired request headers, response headers, and cookies on the **Realtime Log Delivery** page. 
    {{ ENV_NAV }} **Realtime Log Delivery**.
    5.  From the **Log Custom Headers and Cookies** section, add the desired headers and cookies.
        1.  From the **Request Headers**, **Response Headers**, or the **Cookies** option, type the desired value and then press `ENTER`.
        2.  Repeat the previous step as needed.
    6.  Click **Deploy Changes** when you are finished adding headers and cookies.

2.  Add the desired headers and cookies from step 1 to the desired RTLD CDN profile(s).
    1.  Load the desired profile by clicking on it from the the **Realtime Log Delivery** page. 
    2.  From the **Fields** section, add the desired headers and cookies. 

        -   Click on the list to add additional headers or cookies. 
        -   You may either select the name of the desired header or cookie, or type its name and then press `ENTER`. 
        -   Remove a header or cookie by clicking on its `x`.

    3.  Click **Apply Changes**.

    <Callout type="important">

      If you see a warning after adding a header or cookie, then you should verify that it has been set on the **Realtime Log Delivery** page. 

    </Callout>

    4.  Repeat steps 1 - 3  as needed.

### Blank Log Fields {/*blank-log-fields*/}

RTLD returns a blank value for a header or cookie log field when any of the following conditions are true:
-   The header or cookie was missing.
-   The header or cookie was set to blank.
-   The header or cookie has not been registered on the current environment. 
-   The header or cookie has been registered, but it has not been fully propagated. Propagation may take up to 90 minutes.

## Custom Logging through Rules {/*custom-logging-through-rules*/}

<Callout type="important">

  The recommended method for logging headers is to [configure it directly from RTLD](#headers-and-cookies). 

</Callout>

Log request and response headers through the following procedure:

1.  Add the [Custom Log Field feature](/guides/performance/rules/features#custom-log-field) to the desired rule.

    [View header syntax.](/guides/performance/rules/features#custom-log-field)

2.  From within the desired RTLD CDN profile, enable the **Custom Field** field. 

    1.  Load the desired profile by clicking on it from the the **Realtime Log Delivery** page. 
    2.  From the **Fields** section, expand the **General** section and verify that the **Custom Field** field is marked.
    3.  If you modified your RTLD CDN profile, click **Apply Changes**.