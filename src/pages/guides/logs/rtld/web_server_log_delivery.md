---
title: Web Server Log Delivery
---

RTLD may automatically deliver compressed log data to a web server by submitting HTTPS POST requests to it. The body for each of these requests will be a JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

Log fields vary by RTLD module. Learn more: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

RTLD applies gzip compression to log data. Each HTTPS POST request includes a `Content-Encoding` header set to gzip.

**To prepare your web servers for log delivery**

1.  Configure your web server(s) to:
    
    -   Support the HTTPS protocol.
        
        Log delivery requires a certificate whose trust anchor is a publicly trusted certificate authority (CA). Additionally, the certificate must include a chain of trust for all intermediate certificate(s) and a leaf certificate.
        
    -   Allow HTTPS POST requests.
    -   Return a 2xx response (e.g., `200 OK`) whenever data is successfully received.
        
        If your web server responds with any other status code, then our service will retransmit the same log data at regular intervals. This may result in the delivery of duplicate log data.
        
2.  Configure your firewall to allow POST requests from the following IP blocks:
    
3.  Set up a workflow for handling or processing the log data that will be posted to your web server(s).
    
    **Example:** Create a listener for HTTPS POST requests that mines specific data from log entries.

**To create a log delivery profile**

1.  From the **Real-Time Log Delivery CDN** page, click **+ New Log Delivery Profile**.

    1.  Open the desired property by loading either your private or a team space and then clicking on it.
    2.  From the left pane, click on the desired environment.
    3.  From the left pane, click **Realtime Log Delivery**.

2.  From the **Profile Name** option, assign a name to this log delivery profile.
3.  From the **Log Delivery Method** option, select HTTP Post.
4.  Set the **Request URL** option to a URL that may leverage the workflow defined in the **To prepare your web servers for log delivery** procedure. This URL must use the HTTPS protocol.

    <Callout type="info">

      Specify a custom port to deliver log data over that port instead of 443.

    </Callout>
    
    **Sample URL:** `https://logs.mydomain.com/cdn/logs.aspx`
    
5.  From the **Authentication Type** option, select one of the following modes:
    
    -   **Custom Authentication:** Select this mode when your web server(s) expects the `Authorization` request header to be set to a custom token value. Set the **Token** option to a value that will authorize requests to your web server(s).
        
        Log data will be posted to your web server(s) via HTTPS POST requests with an `Authorization` request header set to the specified value.
        
        **Authorization header syntax:** `Authorization: <TOKEN>`
        
    -   **HTTP Basic:** Select this mode if your web server(s) allow content to be uploaded via standard HTTP basic authentication. Set the desired credentials via the **Username** and **Password** options.
        
        Base-64 encoding will applied to the specified credentials. After which, the encoded value will be passed via the `Authorization` header.
        
        **Authorization header syntax:** `Authorization: Basic <BASE64-ENCODED CREDENTIALS>`
        
    -   **None:** Select this mode if your web server(s) allow content to be posted without authorization.
6.  From the **Log Format** option, select whether to format log data using our standard JSON format, as a JSON array, as JSON lines, or as a CSV (RTLD CDN only).
    
    Learn more: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)
    
7. From the **Downsample the Logs** option, determine whether all or downsampled Reduces the amount of log data that will be delivered. For example, you may choose to only deliver 1% of your log data. log data will be delivered.
    
    -   **All Log Data:** Verify that the **Downsample the Logs** option is cleared.
    -   **Downsampled Log Data:** Downsample logs to 0.1%, 1%, 25%, 50%, or 75% of total log data by enabling the **Downsample the Logs** option and then selecting the desired rate from the **Downsampling Rate** option.

        <Callout type="tip">

          Use this capability to reduce the amount of data that needs to be processed or stored within your web server(s).  

        </Callout>

        <Callout type="info">

          **RTLD CDN Only:** Downsampling log data also reduces usage charges for this service.

        </Callout>
        
8. Log delivery setup varies according to whether you are delivering log data for CDN traffic, threats identified by WAF, or rate limited requests.
 
{/*   
    **To set up RTLD CDN**
    
    1.  From the **Filter by Edge CNAME** section, perform one of the following steps:
        
        -   Filter log data by one or more edge CNAME(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected edge CNAME(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more edge CNAMEs from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing co will filter the list to include all hostnames that contain co (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of edge CNAME
            
            Verify that an edge CNAME has not been defined within this section.
            
    2.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    3.  From the **Filter by Status Code** section, perform one of the following steps:
        
        -   Filter log data by status code
            
            Mark each status code class (e.g., 2xx or 3xx) for which log data will be delivered. Clear all other status code classes.
            
        -   Upload all log data regardless of status code
            
            Clear all status code classes (e.g., 2xx and 3xx).
            
    4.  From the **Log file contains the following fields** section, perform the following steps:
        
        1.  Add the request headers, response headers, and cookies that will be logged for each request from the **Custom Request Headers**, **Custom Response Headers**, and **Custom Cookies** options.
            
            You may either select or type the name of the desired headers and/or cookies. Click on the list to add additional headers or cookies. Remove a header or cookie by clicking on its x.
            
            Although other settings take effect quickly, it may take up to 90 minutes before data for custom request/response headers and cookies is logged.
            
        2.  Click Expand All.
        3.  Mark [each field](/guides/logs/rtld/log_fields_rtld_cdn#logs-array) that will be reported for each request submitted to the CDN.
        4.  Clear each field for which log data should not be reported.
        
        Add or clear all of the fields associated with a category by marking or clearing the category's header.
        
    
    **To set up RTLD Rate Limiting**
    
    1.  From the **Filter by Edge CNAME** section, perform one of the following steps:
        
        -   Filter log data by one or more edge CNAME(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected edge CNAME(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more edge CNAMEs from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing co will filter the list to include all hostnames that contain co (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of edge CNAME
            
            Verify that an edge CNAME has not been defined within this section.
            
    2.  From the **Filter by Country** section, perform one of the following steps:
        
        -   Filter log data by one or more countries:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either Matches or Does Not Match, respectively.
            2.  Select one or more countries from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial country name. For example, typing un will filter the list to include all countries that contain un (e.g., United States and United Kingdom).
                
        -   Upload all log data regardless of country of origin:
            
            Verify that a country has not been defined within this section.
            
    3.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    4.  From the **Filter by Client IP** option, perform one of the following steps:
        
        -   Filter log data by one or more IP addresses:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected IP addresses by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Type one or more IP addresses within the option directly to the right of the above option.
        -   Upload all log data regardless of IP address:
            
            Verify that an IP address has not been defined within this section.
            
    5.  From the **Filter By Action Type** option, perform one of the following steps:
        
        -   Filter log data by one or more enforcement action(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected enforcement action(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more enforcement action(s).
                
        -   Upload all log data regardless of enforcement action:
            
            Verify that an enforcement action has not been defined within this section.
            
    6.  From the **Filter By Request Method** option, perform one of the following steps:
        
        -   Filter log data by one or more request method(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected request method(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more request method(s).
        -   Upload all log data regardless of request method:
            
            Verify that a request method has not been defined within this section.
            
    7.  From the **Filter By Scope Name** option, perform one of the following steps:
        
        -   Filter log data by one or more security application manager(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more security application manager(s).
                
        -   Upload all log data regardless of security application manager:
            
            Verify that a security application manager(s) has not been defined within this section.
            
    8.  From the **Filter By Action Limit ID** option, perform one of the following steps:
        
        -   Filter log data by one or more rate rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected rate rules(s) by selecting either Matches or Does Not Match, respectively.
            2.  Type the name for one or more rate rule(s).
                
        -   Upload all log data regardless of rate rule:
            
            Verify that a rate rule has not been defined within this section.
            
    9.  From the **Filter By URL Regex** option, perform one of the following steps:
        
        -   Filter log data by URL
            
            Type a RE2-compatible regular expression pattern that identifies the set of URLs by which log data will be filtered.
            
        -   Upload all log data regardless of URL
            
            Set it to a blank value.
            
    10. From the **Log file contains the following fields** section, perform the following steps:
        
        1.  Mark [each field](/guides/logs/rtld/log_fields_rtld_rate_limiting#logs-array) that will be reported for each request submitted to the CDN.
        2.  Clear each field for which log data should not be reported.
    
    **To set up RTLD WAF**
    
    1.  From the **Filter by Edge CNAME** section, perform one of the following steps:
        
        -   Filter log data by one or more edge CNAME(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected edge CNAME(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more edge CNAMEs from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing co will filter the list to include all hostnames that contain co (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of edge CNAME
            
            Verify that an edge CNAME has not been defined within this section.
            
    2.  From the **Filter by Country** section, perform one of the following steps:
        
        -   Filter log data by one or more countries:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more countries from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial country name. For example, typing un will filter the list to include all countries that contain un (e.g., United States and United Kingdom).
                
        -   Upload all log data regardless of country of origin:
            
            Verify that a country has not been defined within this section.
            
    3.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    4.  From the **Filter By Security Application Manager** option, perform one of the following steps:
        
        -   Filter log data by one or more security application manager(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more security application manager(s).
                
        -   Upload all log data regardless of security application manager:
            
            Verify that a security application manager(s) has not been defined within this section.
            
    5.  From the **Filter By Access Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more access rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected access rule(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more access rule(s).
                
        -   Upload all log data regardless of access rule:
            
            Verify that an access rule has not been defined within this section.
            
    6.  From the **Filter By Custom Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more custom rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected custom rule(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more custom rule(s).
                
        -   Upload all log data regardless of custom rule:
            
            Verify that a custom rule has not been defined within this section.
            
    7.  From the **Filter By Managed Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more managed rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected managed rule(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more managed rule(s).
                
        -   Upload all log data regardless of managed rule:
            
            Verify that a managed rule has not been defined within this section.
            
    8.  From the **Log file contains the following fields** section, perform the following steps:
        
        1.  Mark [each field](/guides/logs/rtld/log_fields_rtld_waf#logs-array) that will be reported for each request submitted to the CDN.
        2.  Clear each field for which log data should not be reported.
    
*/}

9.  Click **Create Log Delivery Profile**.