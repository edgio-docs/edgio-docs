5.  From the **Log Format** option, select whether to format log data using our standard JSON format, as a JSON array, as JSON lines, or as a CSV (RTLD CDN only).
    
    Learn more about these formats: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD Bot](/guides/logs/rtld/log_fields_rtld_bot_manager) | [RTLD Cloud Functions](/guides/logs/rtld/log_fields_rtld_cloud_functions)

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

7.  Determine whether [log data will be filtered](/guides/logs/rtld/filtering_log_data).

8.  By default, all log fields are enabled on a new log delivery profile. From within the **Fields** section, clear each field for which log data should not be reported. 

    -   Log fields are categorized. You may add or remove individual fields by expanding a category and then marking or clearing specific log fields. Alternatively, add or remove all of the log fields associated with a category by marking or clearing the desired category.

    -   **RTLD CDN Only:** You may also [log request headers, response headers, and cookies](/guides/logs/rtld/custom_log_fields).

    -   View log field definitions: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn#logs-array) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf#logs-array) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting#logs-array) | [RTLD Bot](/guides/logs/rtld/log_fields_rtld_bot_manager#logs-array) | [RTLD Cloud Functions](/guides/logs/rtld/log_fields_rtld_cloud_functions#logs-array)

9.  Click **Create Log Delivery Profile**.