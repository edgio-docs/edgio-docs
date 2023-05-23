---
title: Edge Insights
---

Use Edge Insights to gain historical and near real-time insights into threat profiles, performance, and CDN usage. It allows you to:

-   Generate a report for security violations and CDN usage.
-   Visualize where and how your content is being requested.
-   Troubleshoot issues by analyzing security violations and delivery profiles for problematic traffic.
-   Export data as a JSON file.

<Callout type="info">

  The primary function of these reports is to identify threat profiles, assess performance, and gather data on CDN usage. This data should not be used for billing purposes.

</Callout>

## Basic Usage {/*basic-usage*/}

Generating a report consists of performing the following steps:

1.  Navigate to the **Edge Insights** page. 

    {{ ENV_NAV }} **Edge Insights**.

2.  Select one of the following data sources:

    -   **Access Logs:** Use this data source to analyze CDN traffic for up to the last 6 hours.
    -   **Analytics:** Use this data source to analyze aggregated CDN traffic for up to the last 7 days.
    -   **Bot Manager Alerts:** Use this data source to view bot manager rule violations for up to the last 7 days.
    -   **Edge Control:** Use this data source to analyze how recent CDN deployments affects content delivery and performance.
    -   **Downsampled Access Logs:** Use this data source to analyze CDN traffic, downsampled to 0.1%, for up to the last 7 days.
    -   **Rate Limiting Alerts:** Use this data source to view traffic that exceeded your rate limit(s), downsampled to 10%, for up to the last 30 days.
    -   **WAF Alerts:** Use this data source to view access rule, custom rule, and managed rule violations of your WAF security application manager configuration for up to the last 30 days.

3.  Select the time period for which data will be returned.

    <Callout type="info">

      Define a time period that does not exceed the [retention period](#DataRetention) defined for the selected data source.

    </Callout>

4.  Optional. [Define a filter](#filtering) for your report to gain deeper insights into security violations, key fields, or traffic patterns.
5.  **Edge Control Only:** Define the configurations that will be compared and the type of data that will be analyzed.
    
    1.  From the **Customer config version** section, select two or more configurations.
    2.  Select the data that will be compared from the **HTTP Status Code** and **Cache Status** sections.
        
        For example, you may select `TCP_MISS` from the **Cache Status** section to compare whether cache misses increased as a result of your latest configuration update.
        
    3.  Click **Analyze**.

### Common Use Cases {/*common-use-cases*/}

The following common use cases are provided to demonstrate various ways in which you may use Edge Insights to gain insight into traffic patterns or to troubleshoot issues.

#### Was my software update delivered throughout the United States? {/*was-my-software-update-delivered-through-the-united-states*/}

1.  From the **Data Source** option, select `Access Logs (Full - last 6 hours)`.
2.  From the **Time Period** option, define the desired time period.
    
    For example, if the software update was made available on a Monday at 3 p.m., then you would set the starting point to that date and time. By default, the ending point is automatically set to a recent timestamp and therefore allows you to view all available data from the starting point to the present.
    
3.  Create a filter for the software update's URL.
    
    1.  Click on **+ Add Filter**.
    2.  Select `URL Path`.
        
    3.  Set it to the URL path for the desired software update package.
        
        **Specific URL Path Example:** The following value filters for a specific URL:
        
        `/downloads/widgets.zip`
        
        **Recursive Example:** The following value filters for all requests with the same base URL:
        
        `regex:/downloads/.\*`
        
    4.  Click **Save**.
4.  From the **Top Results** section, select the `Country Name` field.
5.  From the pie chart, click on `United States`.
6.  From the **Top Results** section, select the `HTTP Status Code` field.
7.  Review the status codes.
8.  Optional. Dig into a specific status code by clicking on it and then reviewing log entries from the Logs section.

#### Why do I see a spike in 404 Not Found responses? {/*why-do-i-see-a-spike-in-404-not-found-responses*/}

1.  From the **Data Source** option, select `Access Logs (Full - last 6 hours)`.
2.  From the **Top Results** section, select the `HTTP Status Code` field.
    
    ![Top Results - Select Field](/images/v7/performance/edge-insights-top-results-select.png?width=450)
    
3.  From the pie chart, click on `404`.
    
    ![Top Results - Filter](/images/v7/performance/edge-insights-top-results-filter.png?width=450)
    
4.  From the **Top Results** section, select the `URL Path` field.
5.  Review the top requests for that time period.
6.  Optional. If you cannot detect a clear pattern, try narrowing the report's time period.
    
    For example, if the spike occurred on a Monday at 3 p.m., then you should generate a report for Monday from 2 p.m. to 4 p.m.
    
<Callout type="tip">

  View detailed information for a request that results in a 404 Not found response by clicking on an entry in the Logs section.

</Callout>

#### Why do I see a traffic spike? {/*why-do-i-see-a-traffic-spike*/}

1.  From the **Data Source** option, select `Access Logs (Full - last 6 hours)`.
2.  From the **Time Period** option, define a time period that covers that traffic spike.
    
    For example, if the traffic spike occurred on a Monday at 3 p.m., then you should generate a report for Monday from 2 p.m. to 4 p.m.
    
3.  From the **Top Results** section, select the `URL Path` field.
4.  Review the top requests for that time period.

#### Why do I see a spike in WAF alerts? {/*why-do-i-see-a-spike-in-waf-alerts*/}

1.  From the **Data Source** option, select WAF Alerts.
2.  From the **Time Period** option, define a time period that covers that spike.
    
    For example, if the spike occurred on a Monday at 3 p.m., then you should generate a report for Monday from 2 p.m. to 4 p.m.
    
3.  From the **Top Results** section, review the Rule Message chart. Click on a rule message to filter by it.
4.  From the **Top Results** section, select a field related to the selected rule message. Click on the largest segment in the pie chart.
    
    For example, if you filtered by the `Method is not allowed by policy` rule message, then you should select the `Request Method` field.
    
5.  From the **Logs** section, click on a log entry. Review key fields (e.g., `url` and `user_agent`).

#### Why do I see a spike in rate limited requests? {/*why-do-i-see-a-spike-in-rate-limited-requests*/}

1.  From the **Data Source** option, select Rate Limiting Alerts.
2.  From the **Time Period** option, define a time period that covers that spike.
    
    For example, if the spike occurred on a Monday at 3 p.m., then you should generate a report for Monday from 2 p.m. to 4 p.m.
    
3.  From the **Top Results** section, select the `Client IP` field.
4.  Review the top requests for that time period.
5.  Optional. If you cannot detect a clear pattern, try selecting a region field (e.g., `City Name`) from within the **Top Results** section.

### Sharing Data {/*sharing-data*/}

You may share an entire report or specific data with other users.

-   **Entire Report:** Share an Edge Insights report with another {{ PRODUCT }} team member by providing the report's URL.
    
    **Example:**
    
    `https://edge-insights.edgio.app/?avg=0&bin=auto&end_time=1638817682&f=%7B%22geoip_country_name%22%3A%22United+States%22%7D&fstatus=%7B%22geoip_country_name%22%3A%7B%22value%22%3A%22United+States%22%2C%22active%22%3Atrue%7D%7D&gt=chart1&h=0&legend=0&log=0&mt=graph_by_pop&nm=false&notf=%7B%7D&notfstatus=%7B%7D&p=1&pc1s=status_code&pc2s=geoip_country_name&pp=10&prefix=&quantiles=&selectedChart=histogram&selectedQuantitativeField=bytes_in&start_time=1638212206&ti=604800&topn=10&ttr=10&vs=&vt=accesslog`
    
-   **Specific Data:** Click on the <Image inline src="/images/v7/icons/json.png" alt="JSON icon" /> icon next to the data that you would like to share. {{ PRODUCT }} will load the corresponding JSON data in a new window or tab. You should then either:
    
    -   Share the JSON data with the desired individual(s).
    -   Share the data's URL with another {{ PRODUCT }} team member.
        
        **Example:**

        `https://edge-insights.edgio.app/api/proxy/v0.7/accesslog-sc-bf/count?filters=%7B%22geoip_country_name%22%3A%22United%20States%22%7D&end_time=1638817682&start_time=1638212206&size=10&per_page=10&page=1`
        
<Callout type="info">

  You must establish an {{ PRODUCT }} session before attempting to load an {{ PRODUCT }} URL that points to a specific report or data. Attempting to load this type of URL without an active {{ PRODUCT }} session may load the {{ PRODUCT }}'s home page instead.

</Callout>

## Data Downsampling and Retention {/*data-downsampling-and-retention*/}

Our policy on downsampling data and the amount of time that we store it varies according to data source.
 
|Data Source|Coverage|Retention Schedule|
|--- |--- |--- |
|Access Logs|Full |6 hours|
|Analytics|Aggregate|7 days|
|Bot Manager Alerts|Full |7 days|
|Edge Control| Full |7 days|
|Downsampled Access Logs|Downsampled to 0.1%|7 days|
|Rate Limiting Alerts|Downsampled to 10%|30 days|
|WAF Alerts|Full |30 days|

## Time Chart {/*time-chart*/}

The time chart (aka line graph) graphs the current report's data over time.

**Key information:**

-   By default, a single line plots all requests over time. Graph the top results for a specific field by clicking on the button that corresponds to that field. If the desired field is not listed, select it from within the **Top Results** section.
    
    ![Time Chart - Source](/images/v7/performance/edge-insights-time-chart-source.png)
    
    By default, a line graph includes up to the 10 most popular entries. Customize this limit through the **Limit Results to Top** option from the left-hand pane. This option also affects the maximum number of unique entries that may be listed within a **Top Result** chart.
    
    Use the layout options to determine whether all data will be plotted on a single or multiple line charts.

    ![Layout options](/images/v7/performance/edge-insights-layout-options.png)

    -    **Single Line Chart:** By default, all data is plotted within a single chart with individual lines for each entry. Switch from multiple line charts to a single line chart by clicking the <Image inline src="/images/v7/icons/single-chart.png" alt="Single Chart icon" /> icon.

        <Callout type="info">

          Click on the color-coded entries within the legend to hide or show them.

        </Callout>

    -    **Multiple Line Charts:** Generate a line graph for each entry by clicking the <Image inline src="/images/v7/icons/separate-charts.png" alt="Separate Charts icon" /> icon.

-   Hovering over the line graph will indicate the exact number of requests that were plotted for that time slot.
-   By default, Edge Insights plots data using an optimal time interval for the report's time range. You may override this by switching the resolution from **Auto** to the desired time interval.
    
    <Callout type="info">

      The report's time range determines the set of available resolutions.

    </Callout>
    
-   View the data used to plot this chart by clicking on the <Image inline src="/images/v7/icons/json.png" alt="JSON icon" /> icon. Upon clicking this icon, {{ PRODUCT }} displays this data in JSON format within a new tab.

## Top Results Charts {/*top-results-charts*/}

The top results charts displays the top results for 2 fields.

**Key information:**

-   By default, each chart may include up to the 10 most popular entries. Customize this limit through the **Limit Results to Top** option from the left-hand pane. This option also affects the maximum number of unique entries that may be graphed within the time chart.
    
-   The **Top Results** charts only include statistically significant entries. A gray slice called `Rest...` represents all remaining traffic.
    
    Certain fields may generate a pie chart that solely consists of a `Rest...` slice. This behavior typically indicates either that there are many unique entries or that this field is not applicable to the majority of requests.
    
    **Example:**
    
    In the following illustration, the `Client Postal Code` pie chart returns a single slice called `Rest...`. The traffic represented by this pie chart is distributed throughout the world and therefore no single postal code was responsible for a statistically significant traffic segment. The `Client Region Name` pie chart, on the other hand, displays the top 10 regions. Those regions were responsible for majority of traffic included in this report.
    
    ![Top Results - Rest...](/images/v7/performance/edge-insights-top-results-rest.png?width=450)
    
    Increasing the **Limit Results to Top** option to 30 provides visibility into additional POPs that were responsible for serving the majority of your traffic. Notice in the following illustration that the `Rest...` slice is now smaller since the pie chart now reports data for regions that were previously included by that slice.
    
    ![Top Results - Top 30](/images/v7/performance/edge-insights-top-results-rest-30.png?width=450)
    
-   You may switch a chart's field by selecting a new one directly underneath the chart. The available set of fields vary by data source.
-   The fields selected in the **Top Results** section determine the available set of sources within the time chart.
-   Filter the entire report by clicking on a value within the chart.
-   Filters persist until they are manually removed from the Filters section in the left-hand pane. This allows you to quickly filter on multiple fields. Apply an additional filter by switching to another field and then clicking on the desired entry.

## Filtering {/*filtering*/}

Filtering is critical for gaining deeper insights into your data. 

**To filter your report**

1.  From the **Top Results** section, select the field that contains the data that you would like to filter.
    
    ![Top Results - Select Field](/images/v7/performance/edge-insights-top-results-select.png?width=450)
    
2.  From the pie chart, click on the value by which you would like to filter.
    
    The **Filters** section in the left-hand pane is immediately updated to display your filter query.
    
    **Example:**
    
    From the **Top Results** section, select the `HTTP Status Code` field and then click on `404` to create the following filter:

    ![Filters](/images/v7/performance/edge-insights-filters.png)


Perform the following common tasks from within the **Filters** section in the left-hand pane:

-   Click on a filter to toggle between enabling and disabling it. Gray font indicates that the filter has been disabled.

    ![Disabled filter](/images/v7/performance/edge-insights-disabled-filter.png)

-   Modify a filter by clicking the <Image inline src="/images/v7/icons/pencil.png" alt="Edit icon" /> icon next to it.
-   Manually add a filter by performing the following steps:
    
    1.  Click on **+ Add Filter**.
    2.  Select the desired field.
        
        The set of available fields varies by data source. View field definitions for:  
        [Access Logs](#access-logs), [Analytics](#analytics), [Bot Manager Alerts](#bot-manager-alerts), [Rate Limiting Alerts](#rate-limiting-alerts), [WAF Alerts](#waf-alerts)
        
    3.  Optional. Click on `=` to toggle between filtering for requests that:
        
        -   **=:** Match the specified value.
        -   **≠:** Do not match the specified value.
        
        **Example:**
        
        Filter for requests that do not originate from a specific country by selecting the `Country Name` field, toggling this symbol to `≠`, and then defining the name of the desired country.
        
    4.  Set the value through which the report will be filtered.
        
        **Advanced (Regular Expressions):** If you are filtering by a field that reports a string value, then you may define a regular expression through the following syntax: `regex:<REGULAR EXPRESSION>`
        
        **Example:**
        
        Use this regular expression on the `Country Name` field to filter for requests that originated in United States, Canada, or Mexico:
        
        `regex:United States|Canada|Mexico`
        
    5.  Click **Save**.

## Log Data {/*log-data*/}

Log data provides contextual information about a request that allows you to gain deeper behavioral insight into threat detection and CDN usage. View the log data associated with the current report from within the Logs section.

**Key information:**

-   Log entries are returned as paginated results. By default, we provide 10 log entries per page. You may increase this value up to 1,000 through the Logs per page option.
-   View a specific log entry by clicking on it.
-   View log data for the current page by clicking on the <Image inline src="/images/v7/icons/json.png" alt="JSON icon" /> icon. Upon clicking this icon, Edge Insights displays the current page's log data in JSON format within a new tab.
-   Edge Insights restricts log retrieval to 10,000 log entries. If the current report consists of more log entries, then you may only retrieve log data for 10,000 of the most recent requests. This limit solely applies to log retrieval. Your report's time chart and **Top Results** charts display all available data without regard to this limit.

    <Callout type="info">

      Edge Insights is not meant to be used as a log retrieval or log archival tool. Use [Real-Time Log Delivery](/guides/logs/rtld) to automatically archive log data to one or more destinations.

    </Callout>

## Access Logs {/*access-logs*/}

Use this data source to analyze CDN traffic. This data provides historical and near real-time visibility into your CDN traffic at a high-level.

Each Access Log field is defined below.

{{ table_access_logs }}

## Analytics {/*analytics*/}

Use this data source to analyze CDN traffic that has been downsampled to 0.1%. This data provides historical and near real-time visibility into your CDN traffic at a high-level.

Calculate an approximation of your actual total events by multiplying your total events by 1,000. For example, if your total events reports 100K, then the approximate number of requests for that time period is 100,000,000.

Each Analytics field is defined below.

{{ table_analytics }}

## Bot Manager Alerts {/*bot-manager-alerts*/}

Use the Bot Manager Alerts data source for historical and near real-time analysis of recently detected [bot traffic](/guides/security/bot_rules).

## Edge Control {/*edge-control*/}

Use this data source to analyze how a new CDN configuration affects content delivery and performance.

## Rate Limiting Alerts {/*rate-limiting-alerts*/}

Use the Rate Limiting Alerts data source for historical and near real-time analysis of recently [rate limited requests](/guides/security/rate_rules). For example, use this data to:

-   Understand the severity of rate limited requests.
-   Identify the countries from which rate limited traffic originated.
-   Identify key individual offenders by their IP address.
-   View detailed information that describes a rate limited request.

Logging for rate limited requests is downsampled to 10% due to the volume of requests that may occur during a single incident (e.g., volumetric Distributed Denial-of-Service attack).

Calculate an approximation of your actual total events by multiplying your total events by 10. For example, if your total events reports 325K, then the approximate number of requests for that time period is 3,250,000.

<Callout type="info">

  Edge Insights retains WAF data, including rate limited requests, for 30 days.

</Callout>

Each Rate Limiting field is defined below.

{{ table_rate_limiting_alerts }}

## WAF Alerts {/*waf-alerts*/}

Use the WAF Alerts data source for historical and near real-time analysis of [recent threats to site traffic](/guides/security/waf). For example, use this data to:

-   Visualize the time periods during which site traffic is most heavily targeted.
-   Understand the variety, frequency, and severity of illegitimate traffic.
-   Identify the countries from which illegitimate traffic originates.
-   Identify key individual offenders by their IP address.
-   Learn detailed information on the types of attack being mounted against your site.

Each WAF field is defined below.

{{ table_waf_alerts }}