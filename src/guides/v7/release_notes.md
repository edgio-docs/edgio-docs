---
title: {{ PRODUCT }} Release Notes
---

<Callout type="info">

This page contains release notes related to the {{ PORTAL_LINK }}.

See [NPM Packages Changelog](/guides/changelog) for release notes related to the  {{ PRODUCT }} CLI packages and connectors.

</Callout>

## August 2023

| Date  | Description                                                                                                                            |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 8/1/2023 | **Security:**  <ul><li>Added the [API Security](/guides/security/api_security) feature. API Security validates the payload of API requests to a JSON schema. </li></ul> |
| 8/1/2023 | **Analytics:**  <ul><li>Added the RTLD Bot feature. RTLD Bot delivers log data for threats identified by Bot Manager. </li></ul> |

## July 2023

| Date  | Description                                                                                                                            |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 7/24/2023  | **Rules:** <ul><li>The `Query String` match condition has been renamed to [Origin Query String](/guides/performance/rules/conditions#origin-query-string)</li><li>Added the [Query String](/guides/performance/rules/conditions#querystring) match condition. </li><li>The {{ PORTAL }} now remembers your show / hide rule number preference. </li></ul> |
| 7/19/2023  | **{{ PRODUCT }} Chrome Extension:** <ul><li>Translates the `x-edg-components` and `x-edg-t` response headers to metadata that is easier to understand. </li><li>The **Request Details** pane now displays request headers.</li></ul> |
| 7/19/2023  | [{{ PRODUCT }} EdgeJS Fiddle]({{ FIDDLE_URL }}): <ul><li>Files are now listed within the left-hand pane.</li><li>Introduced the ability to add, delete, and rename files. </li><li>The middle pane now displays the contents of the currently selected file.</li></ul> |
| 7/17/2023  | **Rules:** <ul><li>Introduced [nested rules](/guides/performance/rules#nested-rules).</li></ul> |
| 7/10/2023  | **Rules:** <ul><li>Introduced [ELSE IF and ELSE statements](/guides/v7/performance/rules#statements).</li></ul>**Analytics:** <ul><li>Introduced the **Data Transferred** graph to the **Traffic** page.</li><li>Introduced the **Serverless Usage** page.</li></ul>**{{ PORTAL }}:** <ul><li>The default value for the **Preserve cache between deployments** setting has changed from cleared to marked. This new default value is only applied when creating an environment. </li></ul>|

## June 2023

| Date  | Description                                                                                                                            |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 6/20/2023  | **Origins:** <ul><li>Added [round-robin load balancing mode](/guides/basics/hostnames_and_origins#load-balancing) for hosts defined within an origin configuration.</li></ul> **Rules:** <ul><li>Added the [HTML Preferred DTD (html_preferred_dtd) match condition](/guides/performance/rules/conditions#html-preferred-dtd).</li></ul>   |
| 6/2/2023   | **{{ PRODUCT }} {{ PRODUCT_PLATFORM }}:** <ul><li>Support for [30+ web application frameworks](/guides/v7/sites_frameworks/getting_started#supported-frameworks).</li></ul> **Rules:** <ul><li>Added [Directory (directory)](/guides/performance/rules/conditions#directory) and [Extension (extension)](/guides/performance/rules/conditions#extension) match conditions.</li></ul> **{{ DOCS_NAME }}:** <ul><li>Migrated Layer0 documentation (https://docs.layer0.co) to `https://docs.edg.io/guides/v4`.</li><li>Added sample Next.js and Nuxt 3 sites.</li><li>Updated CDN-as-Code (EdgeJS) guides to expand on rule conditions and features.</li><li>Fixed search indexing to prevent unrelated results from appearing in search.</li></ul>  |

## May 2023

| Date  | Description                                                                                                                            |
|------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 5/25/2023  | **Rules:** <ul><li>Added [Response Status Code (status_code) match condition](/guides/performance/rules/conditions#response-status-code).</li><li>Added [Optimize Images (optimize_images) feature](/guides/performance/rules/features#optimize-images).</li></ul> **{{ PORTAL }}:** <ul><li>Compare a version of an environment to any other version.</li><li>Added bulk import multiple environment variables.</li></ul>  |

## April 2023

| Date  | Description                                                                                                                            |
|-------|----------------------------------------------------------------------------------------------------------------------------------------|
| 4/27/2023  | **{{ PRODUCT_SECURITY }}:** <ul><li>Added reCAPTCHA support.</li></ul> **{{ PORTAL }}:** <ul><li>A team admin may now define a list of allowed IPs for {{ PORTAL }} access.</li></ul>  |
| 4/20/2023  | **Rules:** <ul><li>Added HTTP variables to autocomplete along with inline descriptions.</li><li>Added device classification HTTP variables.</li><li>Removed `equals` and `not equals` operators for the `Random Integer (random)` match condition.</li></ul> **{{ PRODUCT }} {{ PRODUCT_SECURITY }}:** <ul><li>Updated Managed Rules Latest ruleset.</li><li>Added Alert and Block tabs into Bot Manager Actions.</li><li>Added Spoof Bot default action type.</li></ul>  |