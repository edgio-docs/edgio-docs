---
title: Control Change Log
---

|Date (YY.[M]M) |Type |Change |Improvement |Details |Category|
|---|---|---|---|---|---|
|24.7| Enhancement| Add pubDate to IP Allow List RSS feed| The RSS feed for allowed IP blocks now complies with RFC-822 specifications|Valid RFC-822 dates comply withw this format: Mon, 04 Nov 2022 06:00:00 EST. Specifically, <br />- Three-letter day of the week followed by a comma (e.g., Mon)<br />- Day date with leading zero (e.g., 04)<br />- Three-letter month of the year (e.g., Nov)<br />- Four-digit year (e.g., 2022)<br />- Days:minutes:seconds in 24-hour format (e.g., 06:00:00)<br />- Three-letter timezone code or timezone offset (e.g., EST or +0200)|RSS Feed for IP Allow List|
|24.6|Enhancement| Sample Python script for LDS file download from Storage|The Control User Guide now includes a sample Python script to download LDS files from Origin Storage.|Access the script from the *Configure* > *Log Delivery Service* section of the Control User Guide.|Log Delivery Service|
|24.5|Feature| Improve the Service Provider Traffic report|You now have more ways to select the data you see in your report, and you can also set recurring emails.|You can now generate analytics by group, POP, service, etc. Additionally, you can set your preferences for recurring emails for this report.| Reports|
| |Feature |Add timestamp to the RSS feed| The RSS feed now shows the date and time of the last update.| Edgio's IP Allow List is available via RSS feed and now includes a timestamp of the latest revision.| RSS Feed for IP Allow List|
|23.12 |Internal Enhancements |Misc. performance and security improvements| | | Misc.|
|23.9 |Feature |Add CMCD report |CMCD data allows Edgio to collect player CMCD metrics with CDN metrics. This data can be used for more real-time action and to troubleshoot and diagnose issues.|CMCD is a specification from the WAVE standards project that allows CDN providers to receive player statistics and the requesting object metadata in each HTTP request.|Reports|
||  Feature |Add MMD Live Ingest option to LDS Overview Report |With this feature, you can now select MMD Live as the delivery service for which logs will be produced. |This feature applies to Log Delivery Service, which should not be confused with log file fields, which appear in log files. |Reports|
||  Feature |Add Datadog option to LDS Report |You can now store your log data to your existing Datadog account. |Datadog is a cloud platform for monitoring and analytics. |Reports|
||  Feature |Add fields to LDS Report |The addition of these fields provides more specificity to reporting data. | - **op-id** - The IP address of the origin server which supplied the first byte of the response. Enabled via log_origin_ip_address rewrite option. <br /> - **c-country** - This field returns the two-letter ISO country code (ISO 3166-1 alpha-2).|Reports|
