---
title: Filtering Log Data
---

Filter log data to only include relevant information and to reduce the amount of data being ingested. Filtering options vary by RTLD module.

| Filter                                                    | RTLD CDN | RTLD WAF | RTLD Rate Limiting | RTLD Bot Manager |
| --------------------------------------------------------- | -------- | -------- | ------------------ | ---------------- |
| [Access Rule](#access-rule)                               | No       | Yes      | No                 | FINDME           |
| [Client IP](#client-ip)                                   | No       | No       | Yes                | FINDME           |
| [Country](#country)                                       | No       | Yes      | Yes                | FINDME           |
| [Custom Rule](#custom-rule)                               | No       | Yes      | No                 | FINDME           |
| [Enforcement Action](#enforcement-action)                 | No       | No       | Yes                | FINDME           |
| [Hostname](#hostname)                                     | Yes      | Yes      | Yes                | FINDME           |
| [Managed Rule](#managed-rule)                             | No       | Yes      | No                 | FINDME           |
| [Rate Rule](#rate-rule)                                   | No       | No       | Yes                | FINDME           |
| [Request Method](#request-method)                         | No       | No       | Yes                | FINDME           |
| [Security App configuration](#security-app-configuration) | No       | Yes      | Yes                | FINDME           |
| [Status Code](#status-code)                               | Yes      | No       | No                 | FINDME           |
| [User Agent](#user-agent)                                 | Yes      | Yes      | Yes                | FINDME           |
| [URL](#url)                                               | No       | No       | Yes                | FINDME           |

<Callout type="info">

  An alternative method for reducing the amount of log data sent to your destination is downsampling. However, downsampling log data is indiscriminate, while filtering allows you to target the set of traffic that is most relevant to your business needs.

</Callout>

## Filters {/*filters*/}

You may filter by:

-   **Access Rule:**<a href="access-rule" /> Set the **Filter By Access Rule** option to one or more access rule(s) by selecting or typing them.

-   **Client IP:**<a href="client-ip" /> Set the **Filter by Client IP** option to one or more IP addresses.

-   **Country:**<a href="country" /> Set the **Filter by Country** option to the desired set of countries by selecting them. 

    Filter the list by typing the entire or partial country name. For example, typing \`un\` will filter the list to include all countries that contain \`un\` (e.g., United States and United Kingdom).

-   **Custom Rule:**<a href="custom-rule" /> Set the **Filter By Custom Rule** option to one or more custom rule(s) by selecting or typing each desired name. 

-   **Enforcement Action:**<a href="enforcement-action" /> Set the **Filter By Action Type** option to one or more enforcement action(s) by selecting or typing them.

-   **Hostname:**<a href="hostname" /> From within the **Filter by Hostname** section, click within the **Hostnames** option and select the desired hostname(s). 

    Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).

-   **Managed Rule:**<a href="managed-rule" /> Set the **Filter By Managed Rule** option to one or more managed rule(s) by selecting or typing their names.

-   **Rate Rule:**<a href="rate-rule" /> Set the **Filter By Action Limit ID** option to one or more rate rule(s) by typing their names. 

-   **Request Method:**<a href="request-method" /> Set the **Filter By Request Method** option to one or more request method(s) by selecting or typing them.

-   **Security App Configuration:**<a href="security-app-configuration" /> Set the **Filter By Scope Name** option to one or more Security App configuration(s) by selecting or typing their names. 

-   **Status Code:**<a href="status-code" /> Set the **Filter by Status Code** option by selecting each status code class (e.g., \`2xx\` or \`3xx\`) for which log data will be delivered.  

-   **URL:**<a href="url" /> Set the **Filter By URL Regex** option to a RE2-compatible regular expression pattern that identifies the set of URLs by which log data will be filtered.

-   **User Agent:**<a href="user-agent" /> Set the **Filter by User Agent** option to a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.

### Matches or Does Not Match {/*matches-or-does-not-match*/}

All filtering options, except for those that use regular expressions, allow you to choose between the following options:

-   **Matches:** Use this option when you want to filter log data to only include requests that satisfy at least one entry within this filtering condition. 
-   **Does Not Match:** Use this option when you want to filter log data to exclude requests that satisfy at least one entry within this filtering condition. 

### Clearing a Filter {/*clearing-a-filter*/}

Remove all entries from the desired filter. 