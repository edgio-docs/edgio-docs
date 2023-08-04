---
title: Filtering Log Data
---

Filter log data to only include relevant information and to reduce the amount of data being ingested. Filtering options vary by RTLD module.

| Filter                                                    | RTLD CDN                                                   | RTLD WAF                                                   | RTLD Rate Limiting                                         | RTLD Bot Manager |
| --------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------- |
| [Access Rule](#access-rule)                               |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |                                                            |            |
| [Client IP](#client-ip)                                   |                                                            |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" />           |
| [Country](#country)                                       |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" />           |
| [Custom Rule](#custom-rule)                               |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |                                                            |            |
| [Enforcement Action](#enforcement-action)                 |                                                            |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |            |
| [Hostname](#hostname)                                     | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" />           |
| [Managed Rule](#managed-rule)                             |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |                                                            |            |
| [Rate Rule](#rate-rule)                                   |                                                            |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |            |
| [Request Method](#request-method)                         |                                                            |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |            |
| [Security App configuration](#security-app-configuration) |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |            |
| [Status Code](#status-code)                               | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |                                                            |                                                            |            |
| [User Agent](#user-agent)                                 | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> |            |
| [URL](#url)                                               |                                                            |                                                            | <Image inline src="/images/v7/icons/save.png" alt="Yes" /> | <Image inline src="/images/v7/icons/save.png" alt="Yes" />           |

<Callout type="info">

  An alternative method for reducing the amount of log data sent to your destination is downsampling. However, downsampling log data is indiscriminate, while filtering allows you to target the set of traffic that is most relevant to your business needs.

</Callout>

## Filters {/*filters*/}

The **Filters** section allows you to define one or more filter(s). All filtering options, except for those that use regular expressions, allow you to choose between the following options:

-   **Matches:** Use this option when you want to filter log data to only include requests that satisfy at least one entry within this filtering condition. 
-   **Does Not Match:** Use this option when you want to filter log data to exclude requests that satisfy at least one entry within this filtering condition. 

All filtering options, except for those that use regular expressions, support multiple values. You may select or type each desired value. If you are typing the desired value, press `ENTER` to set it.

Filter log data by:

-   **Access Rule:**<a id="access-rule" /> Set the **Access Rule** option to one or more access rule(s).

-   **Client IP:**<a id="client-ip" /> Set the **Filter by Client IP** option to one or more IP addresses.

-   **Country:**<a id="country" /> Set the **Countries** option to the desired set of countries by selecting them. 

    Filter the list by typing the entire or partial country name. For example, typing `un` will filter the list to include all countries that contain `un` (e.g., United States and United Kingdom).

-   **Custom Rule:**<a id="custom-rule" /> Set the **Custom Rule** option to one or more custom rule(s) by selecting or typing each desired name. 

-   **Enforcement Action:**<a id="enforcement-action" /> Set the **Action Type** option to one or more enforcement action(s).

-   **Hostname:**<a id="hostname" /> Set the **Hostnames** option to the desired hostname(s).

    Filter the list by typing the entire or partial hostname. For example, typing `co` will filter the list to include all hostnames that contain `co` (e.g., cdn.example.com and corp.example.org).

-   **Managed Rule:**<a id="managed-rule" /> Set the **Managed Rule** option to one or more managed rule(s) by selecting or typing their names.

-   **Rate Rule:**<a id="rate-rule" /> Set the **Action Limit ID** option to one or more rate rule(s). 

-   **Request Method:**<a id="request-method" /> Set the **Request Method** option to one or more request method(s).

-   **Security App Configuration:**<a id="security-app-configuration" /> Set the **Security Application Manager** or the **Scope Name** option to one or more Security App configuration(s). 

-   **Status Code:**<a id="status-code" /> Set the **Filter by Status Code** option by selecting each status code class (e.g., `2xx` or `3xx`) for which log data will be delivered.  

-   **URL:**<a id="url" /> Set the **Filter By URL Regexp** option to a RE2-compatible regular expression pattern that identifies the set of URLs by which log data will be filtered.

-   **User Agent:**<a id="user-agent" /> Set the **Filter by User Agent** option to a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.

### Clearing a Filter {/*clearing-a-filter*/}

Clear a filter by removing all of its entries. Remove an individual entry by clicking on its `x`.