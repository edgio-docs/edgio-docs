# Managed Rule Group Descriptions

## {{ PRODUCT_NAME }} Managed Rules

​​The {{ PRODUCT_NAME }} Managed rule group contains rules that are generally applicable to web applications. This provides protection against exploitation of a wide range of vulnerabilities, including high risk and commonly occurring vulnerabilities described in OWASP&reg; publications such as [OWASP Top 10](https://owasp.org/www-project-top-ten/).

### Layer0 Managed Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|Cross-site scripting (XSS) Body|Inspects the value of the request body and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in {{ PRODUCT_NAME }} WAF. Example patterns include scripts such as `<script>alert("hello")</script>`. CAUTION: This rule only inspects the first 8 KB of the request body.|`cssBody`|
|Cross-site scripting (XSS) Cookie|Inspects the value of cookie headers and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in {{ PRODUCT_NAME }} WAF. Example patterns include scripts such as `<script>alert("hello")</script>.`|`cssCookie`|
|cssCookie|Cross-site scripting (XSS) Query. Inspects the value of query arguments and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in {{ PRODUCT_NAME }} WAF. Example patterns include scripts such as `<script>alert("hello")</script>`.|`cssArgs`|
|Cross-site scripting (XSS) URI Path|Inspects the URI path and blocks requests that attempt to exploit RFI (Remote File Inclusion) in web applications by embedding URLs that contain IPv4 addresses. Examples include patterns such as `http://`, `https://`, `ftp://`, `ftps://`, and `file://`, with an IPv4 host header in the exploit attempt.|`cssPath`|
|EC2 Body|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request body. CAUTION: This rule only inspects the first 8 KB of the request body.|`metaBody`|
|EC2 Cookie|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request cookie.|`metaCookie`|
|EC2 Query|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request query arguments.|`metaArgs`|
|EC2 URI Path|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request URI path.|`metaPath`|
|General LFI Body|Inspects for the presence of Local File Inclusion (LFI) exploits in the request body. Examples include path traversal attempts using techniques such as ../../. CAUTION: This rule only inspects the first 8 KB of the request body|`fileBody`|
|General LFI Query|Inspects for the presence of Local File Inclusion (LFI) exploits in the query arguments. Examples include path traversal attempts using techniques such as ../../.|`fileArgs`|
|General LFI URI Path|Inspects for the presence of Local File Inclusion (LFI) exploits in the URI path. Examples include path traversal attempts using techniques such as ../../.|`filePath`|
|General RFI BODY|Inspects for the presence of Local File Inclusion (LFI) exploits in the request body. Examples include path traversal attempts using techniques such as ../../. CAUTION: This rule only inspects the first 8 KB of the request body|`remoteBody`|
|General RFI Query|Inspects the values of all query parameters and blocks requests that attempt to exploit RFI (Remote File Inclusion) in web applications by embedding URLs that contain IPv4 addresses. Examples include patterns such as `http://`, `https://`, `ftp://`, `ftps://`, and `file://`, with an IPv4 host header in the exploit attempt.|`remoteArgs`|
|General RFI URI Path|Inspects the URI path and blocks requests that attempt to exploit RFI (Remote File Inclusion) in web applications by embedding URLs that contain IPv4 addresses. Examples include patterns such as `http://`, `https://`, `ftp://`, `ftps://`, and `file://,` with an IPv4 host header in the exploit attempt.|`remotePath`|
|Invalid Argument|Inspects requests whose query arguments are system file extensions that the clients shouldn't read or run. Example patterns include extensions such as `.log` and `.ini.`|`invalidArgs`|
|Invalid URI Path. | Inspects requests whose URI path includes system file extensions that the clients shouldn't read or run. Example patterns include extensions such as `.log` and `.ini`.|`invalidPath`|
|Missing User Agent|Blocks requests with no HTTP User-Agent header.|`missingAgent`|
|Size - Body|Verifies that the request body size is at most 8 KB (8,192 bytes).|`sizeBody`|
|Size - Cookie|Verifies that the cookie header length is at most 10,240 bytes.|`sizeCookie`|
|Size - URI Path|Verifies that the URI path length is at most 1,024 bytes.|`sizePath`|
|Size - URI Query Size|Verifies that the URI query string length is at most 2,048 bytes.|`sizeArgs`|

**Layer0 recommends utilizing this rule group for all WAF use cases.**

## Admin Page Protection Rules

The Admin protection rule group contains rules that allow you to block external access to exposed administrative pages. This might be useful if you run third-party software or want to reduce the risk of a malicious actor gaining administrative access to your application.

### Admin Page Protection Rule Description

| Rule Name|Description|Log Name|
| --- | --- | --- |
|Protected URI Path|Inspects requests for URI paths that are generally reserved for administration of a webserver or application. Example patterns include `sqlmanager`.|`protectedPath`|

## Bad Input Rules

The Bad Input rule group contains rules to block request patterns that are known to be invalid and are associated with exploitation or the discovery of Common Vulnerabilities and Exposures (CVEs). 

This can help reduce the risk of a known malicious actor discovering a vulnerable application.

**Layer0 recommends enabling the *Bad Input - Log4J* rule on all WAF applications.**

### Bad Input Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|Bad Input - Bad host| Inspects the host header in the request for patterns indicating localhost. Example patterns include localhost|`badHost`|
|Bad Input - Bad path|Inspects the URI path for attempts to access exploitable web application paths. Example patterns include paths such as `web-inf`.|`badPath`|
|Bad Input - Log4js|Inspects the request for the presence of the Log4j vulnerability CVE-2021-44228 and protects against Remote Code Execution (RCE) attempts. Example patterns include `${jndi:ldap://example.com/}`. CAUTION: This rule only inspects the first 8 KB of the request body.|3|
|Bad Input - Propfind|Inspects the HTTP method in the request for `PROPFIND`, which is a method similar to `HEAD`, but with the extra intention to exfiltrate XML objects.|`badProperty`|

## PHP Application Rules

The PHP application rule group contains rules that block request patterns associated with the exploitation of vulnerabilities specific to the use of the PHP programming language. This includes the injection of unsafe PHP functions into requests. 

### PHP Application Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|PHP - Body|Inspects the values of the request body for PHP script code injection attempts. Example patterns include functions such as `fsockopen` and the `$_GET` superglobal variable.|`phpBody`|
|PHP - Query|Inspects the values of all query parameters for PHP script code injection attempts. Example patterns include functions such as `fsockopen` and the `$_GET` superglobal variable.|`phpArgs`|

## SQL Database Rules

The SQL database rule group contains rules to block request patterns associated with exploitation of SQL databases, like SQL injection attacks. This can help prevent remote injection of unauthorized queries. Evaluate this rule group for use if your application interfaces with an SQL database.

### SQL Database Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|SQL - Body|Uses the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement to inspect the request body for patterns that match malicious SQL code. CAUTION: This rule only inspects the first 8 KB of the request body|`sqlBody`|
|SQL - Cookie|Uses the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement to inspect the request cookie header for patterns that match malicious SQL code.|`sqlCookie`|
|SQL - Query|Uses the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement to inspect the request query parameters for patterns that match malicious SQL code.|`sqlArgs`|
|SQL - Query Extended|Inspects the values of all query parameters for patterns that match malicious SQL code. The patterns this rule inspects for aren't covered by the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement.|`sqlArgsExtra`|
|SQL - URI path|Uses the built-in {{ PRODUCT_NAME }} WAF injection match statement to inspect the request URI path for patterns that match malicious SQL code.|`sqlPath`|
