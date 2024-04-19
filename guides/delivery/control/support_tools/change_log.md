---
title: Control Change Log
---

|Version/ Date (YY.[M]M)	|Type	|Change	|Improvement	|Details	|Category|
|---|---|---|---|---|---|
|23.12	|Internal Enhancements	|Misc. performance and security improvements|||	 	 	Misc.|
|23.9	|Feature	|Add CMCD report	|CMCD data allows Edgio to collect player CMCD metrics with CDN metrics. This data can be used for more real-time action and to troubleshoot and diagnose issues.|CMCD is a specification from the WAVE standards project that allows CDN providers to receive player statistics and the requesting object metadata in each HTTP request. See CTA-5004.|Reports|
|| 	Feature	|Add MMD Live Ingest option to LDS Overview Report	|With this feature, you can now select MMD Live as the delivery service for which logs will be produced.	|This feature applies to Log Delivery Service, which should not be confused with log file fields, which appear in log files.	|Reports|
|| 	Feature	|Add Datadog option to LDS Report	|You can now store your log data to your existing Datadog account.	|Datadog is a cloud platform for monitoring and analytics.	|Reports|
|| 	Feature	|Add fields to LDS Report	|The addition of these fields provides more specificity to reporting data. | 1. op-id - The IP address of the origin server which supplied the first byte of the response. Enabled via log_origin_ip_address rewrite option. <br /> 2. c-country - This field returns the two-letter ISO country code (ISO 3166-1 alpha-2).|Reports|
