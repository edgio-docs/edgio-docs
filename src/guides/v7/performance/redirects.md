---
title: Redirects
---

Redirect URLs through one of the following methods:
-   **Rules:** Rules allow you to define how a URL will be redirected through the [URL Redirect feature](/guides/performance/rules/features#url-redirect). This feature is especially useful when URL redirects should only occur under specific conditions. 
-   **CDN-as-Code:** If you are using CDN-as-code, then you may define URL redirects through the [url.url_redirect feature](/guides/performance/cdn_as_code/route_features#redirecting).
-   **Edge Functions:** Edge Functions allow you to [intelligently redirect URLS](/guides/edge_functions/example_redirects). 
-   **Location Header:** Include the `Location` response header within a `3xx` response to instruct clients to redirect to a different URL. Alternatively, you can instruct {{ PRODUCT }} to follow a redirect defined within a `Location` header provided by the origin through the [Follow Redirects feature](/guides/performance/rules/features#follow-redirects) ([follow_redirects](/docs/api/core/interfaces/types.Url.html#follow_redirects)).
-   **Bulk Redirects:** Use this capability to define a list of URLs for which we will return a `3xx` response with a `Location` header set to the desired URL. In addition to managing URL redirects on an individual basis, you may import and export a list of URL redirects.

## Bulk Redirects {/*bulk-redirects*/}

This capability allows you to define a list of URLs for which we will return a `3xx` response with a `Location` header set to the desired URL. Manage URL redirects on a per environment basis by either manually adding redirect configurations or by importing a CSV file. 

**Key information:**
-   Your redirect configuration is excluded from versioning. This allows you to roll back an environment to a previous version without affecting your URL redirects. 

    <Callout type="tip">

      We strongly recommend that you [back up your redirect configuration as a CSV file](#export) and place it under source control. 

    </Callout>

-   Requests are redirected before being processed by rules. Additionally, once a request is redirected, only features that affect the response can be applied.  For example, you may set headers for the `3xx` response sent to the client.

-   For each redirect, you must define a source and a destination. 

    ![Add a redirect - Source and Destination](/images/v7/performance/redirects-source-destination.png?width=600)

    Specify either of the following types of URLs when defining the source and destination:
    -   **Absolute:** Specify the protocol, hostname, and relative path. You may also include a query string.

        **Example:** `https://cdn.example.com/conferences/2023`

    -   **Relative:** Specify a relative path that starts directly after the hostname. You may also include a query string.

        **Example:** `/conferences/2023`

-   If the requested URL matches the source URL defined within a redirect configuration, we will return a `3xx` response with a `Location` header set to the destination URL. It is up to the client (e.g., web browser) to follow this redirect. 

-   The source URL must be unique, since we can only redirect a URL to a single location. However, since we support query strings and relative URLs, the requested URL could still potentially match against multiple source URLs. For this reason, {{ PRODUCT }} prefers precise source URLs according to the following order:
    -   Absolute URL with query string
    -   Absolute URL without query string
    -   Relative URL with query string
    -   Relative URL without query string

    {{ PRODUCT }} will not perform further comparisons once a match is found. This ensures that the request is redirected according to the configuration that is the most precise match. 

-   Redirecting requests to a relative path may result in an invalid URL when fielding requests from various hostnames. Use an absolute URL to ensure that requests are properly redirected.
-   Define a `3xx` status code for the redirect through the **Response status** option. By default, we return a `301 Moved Permanently` response.
-   The **Forward query string to redirect location** option determines whether the `Location` header will include or exclude the request's query string. 
-   You may define up to 10,000 redirects per environment.
-   Changes to your redirect configuration will not take effect until the next deployment. 

### CSV Files {/*csv-files*/}

You may import or export a comma-separated values (CSV) file containing a list of redirect configurations. 

This CSV file must contain the following header row:

`from,to,status,forwardQueryString`

These columns are defined below.

-   **from:** Required. Identifies a URL that will be redirected. Specify either an absolute or relative URL.
-   **to:** Required. Identifies the URL to which clients will be redirected. Specify either an absolute or relative URL.
-   **status:** Determines the `3xx` status code for the response sent to the client. Valid values are: `301 | 302 | 307 | 308`
-   **forwardQueryString:** A Boolean value that determines whether the `Location` response header will include the request's query string. Valid values are: `true | false`

**Sample CSV:**

```csv filename="default-redirects.csv"
from,to,status,forwardQueryString
/widgets-conference,https://cdn.example.com/conferences/widgets-conference,302,false
https://cdn.example.com/bicycles,/transportation/bicycles,,true
https://cdn.example.com/images,https://cdn.example.com/resources/images,,
```

Upon importing a CSV file, you may choose whether to replace or append to your existing redirect configuration. 

**To import redirect configurations (CSV)**
1.  Navigate to the **Redirects** page.

    {{ ENV_NAV }} **Redirects**.
2.  Click **Import**.
3.  Select a CSV file by clicking **Browse**, navigating to the desired CSV file, selecting it, and then clicking **Open**.
4.  Determine whether you will replace or append to your existing redirect configurations.
    -   **Replace:** Select **Override existing list with file content**.
    -   **Append:** Select **Append file content to existing redirects list**.
    
        <Callout type="info">
        
          The source URL (`from`) must be unique across all redirect configurations. You will not be allowed to append a CSV file to your existing configuration if doing so will create a redirect configuration with a duplicate source URL. 
        
        </Callout>
5.  Click **Upload redirects**.
6.  If you are finished making changes, click **Deploy Now** to deploy your changes to this environment.

**<a id="export" />To export redirect configurations (CSV)**
1.  Navigate to the **Redirects** page.

    {{ ENV_NAV }} **Redirects**.
2.  Click **Export** to download a CSV file called `default-redirects.csv`.

### Redirect Configuration Administration {/*redirect-configuration-administration*/}

You may add, modify, and delete redirect configurations regardless of whether they were added manually or [imported from a CSV file](#csv-files).

**To add a redirect**

1.  Navigate to the **Redirects** page.

    {{ ENV_NAV }} **Redirects**.
2.  Click **Add a redirect**.
3.  From the **Redirect from** option, type the URL that will be redirected.
4.  From the **To** option, type the URL to which the `Location` response header will be set.
5.  Optional. From the **Response status** option, select the `3xx` status code for the response sent to the client.
6.  Optional. Mark the **Forward query string to redirect location** option to allow the request's query string to be included with the destination URL defined within the `Location` response header.

    Your redirect configuration should now look similar to the following illustration:
    
    ![Add a redirect](/images/v7/performance/redirects-add-a-redirect.png?width=600)

7.  Click **Add a redirect**.
8.  Repeat steps 2 - 7 as needed.
9.  If you are finished making changes, click **Deploy Now** to deploy your changes to this environment.

**To modify a redirect**
1.  Navigate to the **Redirects** page.

    {{ ENV_NAV }} **Redirects**.
2.  Find the desired redirect configuration and then click on it.

    <Callout type="tip">
    
      Use the search field to filter the list to redirect configurations whose source or destination URL matches the specified value. 
    
    </Callout>

3.  Make the desired changes.
4.  Click **Save redirect**.
5.  Repeat steps 2 - 4 as needed.
6.  If you are finished making changes, click **Deploy Now** to deploy your changes to this environment.

**To delete a redirect**
1.  Navigate to the **Redirects** page.

    {{ ENV_NAV }} **Redirects**.
2.  Mark each desired redirect. 
3.  Click **Remove selected redirect(s)**.
4.  If you are finished making changes, click **Deploy Now** to deploy your changes to this environment.