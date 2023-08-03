5.  From the **Log Format** option, select whether to format log data using our standard JSON format, as a JSON array, as JSON lines, or as a CSV (RTLD CDN only).
    
    Learn more about these formats: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

    <a id="downsampling" />

6. From the **Downsample the Logs** option, determine whether to reduce the amount of log data that will be delivered. For example, you may choose to only deliver 1% of your log data.
    
    -   **All Log Data:** Verify that the **Downsample the Logs** option is cleared.
    -   **Downsampled Log Data:** Downsample logs to 0.1%, 1%, 25%, 50%, or 75% of total log data by marking the **Downsample the Logs** option and then selecting the desired rate from the **Downsampling Rate** option.

        <Callout type="tip">

          Use this capability to reduce the amount of data that needs to be processed or stored within your web server(s).  

        </Callout>

        <Callout type="info">

          **RTLD CDN Only:** Downsampling log data also reduces usage charges for this service.

        </Callout>

7.  Determine whether log data will be filtered.

    -   [RTLD CDN](#filtering-rtld-cdn-log-data)
    -   [RTLD Rate Limiting](#filtering-rtld-rate-limiting-log-data)
    -   [RTLD WAF](#filtering-rtld-waf-log-data)

8.  By default, all log fields are enabled on a new log delivery profile. Clear each field for which log data should not be reported. Adjust the set of log fields that will be included within this log delivery profile from within the **Fields** section.

    Log fields are categorized. You may add or remove individual fields by expanding a category and then marking or clearing specific log fields. Alternatively, add or remove all of the log fields associated with a category by marking or clearing the desired category.

    **RTLD CDN Only:** You may also log request headers, response headers, and cookies by adding them through the **Custom Request Headers**, **Custom Response Headers**, and **Custom Cookies** options. You may either select the name of the desired header or cookie, or type its name and then press \`ENTER\`. Click on the list to add additional headers or cookies. Remove a header or cookie by clicking on its \`x\`.

    <Callout type="tip">

      Although other settings take effect quickly, it may take up to 90 minutes to log data for custom request/response headers and cookies. 

    </Callout>

    Learn more about log fields: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn#logs-array) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting#logs-array) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf#logs-array)

9.  Click **Create Log Delivery Profile**.

## Filtering Log Data {/*filtering-log-data*/}

Filter log data to only include relevant information and to reduce the amount of data being ingested. Filtering options vary by RTLD module.

<Callout type="info">

  An alternative method for reducing the amount of log data sent to your destination is [downsampling](#downsampling). However, downsampling log data is indiscriminate, while filtering allows you to target the set of traffic that is most relevant to your business needs.

</Callout>

### Filtering RTLD CDN Log Data {/*filtering-rtld-cdn-log-data*/}

You may filter by:

-   **Hostname:** Filter log data to only include traffic directed to the desired hostname(s). Set up hostname filtering within the **Filter by Hostname** section.
        
    -   Filter log data by one or more hostname(s) by:
            
        1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Click within the **Hostnames** option and select the desired hostname(s).

        <Callout type="tip">

          Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).

        </Callout>

    -   Upload all log data regardless of hostname: Verify that a hostname has not been defined within the **Hostnames** option. 

        Remove a hostname by clicking on its \`x\`.

-   **User Agent:** Filter log data to only include traffic that was requested by a client whose user agent matches a RE2-compatible regular expression pattern. Set up user agent filtering within the **Filter by User Agent** option.
        
    -   Filter log data by user agent: Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
    -   Upload all log data regardless of user agent: Set it to a blank value.

-   **Status Code:** Filter log data to only include traffic for specific status code(s). Set up status code filtering within the **Filter by Status Code** section.

    -   Filter log data by status code: Select each status code class (e.g., \`2xx\` or \`3xx\`) for which log data will be delivered. 
            
    -   Upload all log data regardless of status code: Verify that a status code class (e.g., \`2xx\` and \`3xx\`) has not been defined within this option. 

        Remove a status code class by clicking on its \`x\`.

### Filtering RTLD Rate Limiting Log Data {/*filtering-rtld-rate-limiting-log-data*/}

1.  From the **Filter by Hostname** section, perform one of the following steps:

    -   Filter log data by one or more hostname(s)

        1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select one or more hostnames from the option directly to the right of the above option.

            Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).

    -   Upload all log data regardless of hostname

        Verify that a hostname has not been defined within this section.

2.  From the **Filter by Country** section, perform one of the following steps:

    -   Filter log data by one or more countries:

        1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select one or more countries from the option directly to the right of the above option.

            Filter the list by typing the entire or partial country name. For example, typing \`un\` will filter the list to include all countries that contain \`un\` (e.g., United States and United Kingdom).

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

        1.  Determine whether log data will be filtered to include or exclude requests to the selected enforcement action(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more enforcement action(s).

    -   Upload all log data regardless of enforcement action:

        Verify that an enforcement action has not been defined within this section.

6.  From the **Filter By Request Method** option, perform one of the following steps:

    -   Filter log data by one or more request method(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected request method(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more request method(s).
    -   Upload all log data regardless of request method:

        Verify that a request method has not been defined within this section.

7.  From the **Filter By Scope Name** option, perform one of the following steps:

    -   Filter log data by one or more security application manager(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more security application manager(s).

    -   Upload all log data regardless of security application manager:

        Verify that a security application manager(s) has not been defined within this section.

8.  From the **Filter By Action Limit ID** option, perform one of the following steps:

    -   Filter log data by one or more rate rule(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected rate rules(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Type the name for one or more rate rule(s).

    -   Upload all log data regardless of rate rule:

        Verify that a rate rule has not been defined within this section.

9.  From the **Filter By URL Regex** option, perform one of the following steps:

    -   Filter log data by URL

        Type a RE2-compatible regular expression pattern that identifies the set of URLs by which log data will be filtered.

    -   Upload all log data regardless of URL

        Set it to a blank value.

### Filtering RTLD WAF Log Data {/*filtering-rtld-waf-log-data*/}

1.  From the **Filter by Hostname** section, perform one of the following steps:

    -   Filter log data by one or more hostname(s)

        1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select one or more hostnames from the option directly to the right of the above option.

            Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).

    -   Upload all log data regardless of hostname

        Verify that a hostname has not been defined within this section.

2.  From the **Filter by Country** section, perform one of the following steps:

    -   Filter log data by one or more countries:

        1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select one or more countries from the option directly to the right of the above option.

            Filter the list by typing the entire or partial country name. For example, typing \`un\` will filter the list to include all countries that contain \`un\` (e.g., United States and United Kingdom).

    -   Upload all log data regardless of country of origin:

        Verify that a country has not been defined within this section.

3.  From the **Filter by User Agent** option, perform one of the following steps:

    -   Filter log data by user agent

        Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.

    -   Upload all log data regardless of user agent

        Set it to a blank value.

4.  From the **Filter By Security Application Manager** option, perform one of the following steps:

    -   Filter log data by one or more security application manager(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more security application manager(s).

    -   Upload all log data regardless of security application manager:

        Verify that a security application manager(s) has not been defined within this section.

5.  From the **Filter By Access Rule** option, perform one of the following steps:

    -   Filter log data by one or more access rule(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected access rule(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more access rule(s).

    -   Upload all log data regardless of access rule:

        Verify that an access rule has not been defined within this section.

6.  From the **Filter By Custom Rule** option, perform one of the following steps:

    -   Filter log data by one or more custom rule(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected custom rule(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more custom rule(s).

    -   Upload all log data regardless of custom rule:

        Verify that a custom rule has not been defined within this section.

7.  From the **Filter By Managed Rule** option, perform one of the following steps:

    -   Filter log data by one or more managed rule(s):

        1.  Determine whether log data will be filtered to include or exclude requests to the selected managed rule(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Select or type the name for one or more managed rule(s).

    -   Upload all log data regardless of managed rule:

        Verify that a managed rule has not been defined within this section.