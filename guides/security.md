# Security

## Overview

{{ PRODUCT_NAME }}’s platform is built to ensure your website and applications remain open for business by keeping you protected against a wide range of security risks without sacrificing performance.

A fully [PCI-compliant](#is-the-layer0-waf-a-pci-compliant-solution) solution, {{ PRODUCT_NAME }} Security protects your business against a variety of common exploits like SQL injections, cross-site scripting (XSS), PHP injections, bot attacks, DDoS attacks, and other common vulnerabilities.

This guide shows you how to keep your site and platform secure using {{ PRODUCT_NAME }}.

## DDOS (Distributed Denial of Service)

{{ PRODUCT_NAME }} Enterprise customers enjoy always-on DDoS protection inside of our high-bandwidth, globally distributed network. Our solution offers basic protection against common layer 3 and 4 attacks in real-time so you never have to sacrifice performance for protection.

## WAF (Web Application Firewall)

### WAF Overview

WAF is a web application firewall that helps protect your web applications and APIs against common web exploits an attacker may use to compromise your security, overwhelm resources, and affect the availability of your application. 

Utilizing the {{ PRODUCT_NAME }} WAF allows you to monitor, filter, and block HTTP traffic against common vulnerabilities such as cross-site scripting (XSS) or SQL injection before they reach your origin.

The WAF includes [Managed Rule Groups](#managed-rule-group-descriptions), managed by {{ PRODUCT_NAME }}, that can be configured in either a flagging or blocking mode. You can enable all of the rules within these groups or configure each independent rule within the group based on your needs.

### Managed Rule Groups

#### {{ PRODUCT_NAME }} Managed Rules

​​The {{ PRODUCT_NAME }} Managed rule group contains rules that are generally applicable to web applications. This provides protection against exploitation of a wide range of vulnerabilities, including high risk and commonly occurring vulnerabilities described in OWASP&reg; publications such as [OWASP Top 10](https://owasp.org/www-project-top-ten/).

##### Layer0 Managed Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|Cross-site scripting (XSS) Body|Inspects the value of the request body and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in {{ PRODUCT_NAME }} WAF. Example patterns include scripts such as `<script>alert("hello")</script>`. CAUTION: This rule only inspects the first 8 KB of the request body.|`cssBody`|
|Cross-site scripting (XSS) Cookie|Inspects the value of cookie headers and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in {{ PRODUCT_NAME }} WAF. Example patterns include scripts such as `<script>alert("hello")</script>.`|`cssCookie`|
|cssCookie|Cross-site scripting (XSS) Query. Inspects the value of query arguments and blocks common cross-site scripting (XSS) patterns using the built-in XSS detection rule in {{ PRODUCT_NAME }} WAF. Example patterns include scripts such as `<script>alert("hello")</script>`.|`cssArgs`|
|Cross-site scripting (XSS) URI Path|Inspects the URI path and blocks requests that attempt to exploit RFI (Remote File Inclusion) in web applications by embedding URLs that contain IPv4 addresses. Examples include patterns such as `http://, https://, ftp://, ftps://`, and `file://`, with an IPv4 host header in the exploit attempt.|`cssPath`|
|EC2 Body|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request body. CAUTION: This rule only inspects the first 8 KB of the request body.|`metaBody`|
|EC2 Cookie|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request cookie.|`metaCookie`|
|EC2 Query|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request query arguments.|`metaArgs`|
|EC2 URI Path|Inspects for attempts to exfiltrate Amazon EC2 metadata from the request URI path.|`metaPath`|
|General LFI Body|Inspects for the presence of Local File Inclusion (LFI) exploits in the request body. Examples include path traversal attempts using techniques such as ../../. CAUTION: This rule only inspects the first 8 KB of the request body|`fileBody`|
|General LFI Query|Inspects for the presence of Local File Inclusion (LFI) exploits in the query arguments. Examples include path traversal attempts using techniques such as ../../.|`fileArgs`|
|General LFI URI Path|Inspects for the presence of Local File Inclusion (LFI) exploits in the URI path. Examples include path traversal attempts using techniques such as ../../.|`filePath`|
|General RFI BODY|Inspects for the presence of Local File Inclusion (LFI) exploits in the request body. Examples include path traversal attempts using techniques such as ../../. CAUTION: This rule only inspects the first 8 KB of the request body|`remoteBody`|
|General RFI Query|Inspects the values of all query parameters and blocks requests that attempt to exploit RFI (Remote File Inclusion) in web applications by embedding URLs that contain IPv4 addresses. Examples include patterns such as `http://, https://, ftp://, ftps://,` and `file://`, with an IPv4 host header in the exploit attempt.|`remoteArgs`
|General RFI URI Path|Inspects the URI path and blocks requests that attempt to exploit RFI (Remote File Inclusion) in web applications by embedding URLs that contain IPv4 addresses. Examples include patterns such as http://, https://, ftp://, ftps://, and `file://,` with an IPv4 host header in the exploit attempt.|`remotePath`|
|Invalid Argument|Inspects requests whose query arguments are system file extensions that the clients shouldn't read or run. Example patterns include extensions such as `.log` and `.ini.`|`invalidArgs`|
|Invalid URI Path. | Inspects requests whose URI path includes system file extensions that the clients shouldn't read or run. Example patterns include extensions such as `.log` and `.ini`.|`invalidPath`|
|Missing User Agent|Blocks requests with no HTTP User-Agent header.|`missingAgent`|
|Size - Body|Verifies that the request body size is at most 8 KB (8,192 bytes).|`sizeBody`|
|Size - Cookie|Verifies that the cookie header length is at most 10,240 bytes.|`sizeCookie`|
|Size - URI Path|Verifies that the URI path length is at most 1,024 bytes.|`sizePath`|
|Size - URI Query Size|Verifies that the URI query string length is at most 2,048 bytes.|`sizeArgs`|

**Layer0 recommends utilizing this rule group for all WAF use cases.**

#### Admin Page Protection Rules

The Admin protection rule group contains rules that allow you to block external access to exposed administrative pages. This might be useful if you run third-party software or want to reduce the risk of a malicious actor gaining administrative access to your application.

##### Admin Page Protection Rule Description

| Rule Name|Description|Log Name|
| --- | --- | --- |
|Protected URI Path|Inspects requests for URI paths that are generally reserved for administration of a webserver or application. Example patterns include `sqlmanager`.|`protectedPath`|

#### Bad Input Rules

The Bad Input rule group contains rules to block request patterns that are known to be invalid and are associated with exploitation or the discovery of Common Vulnerabilities and Exposures (CVEs). 

This can help reduce the risk of a known malicious actor discovering a vulnerable application.

**Layer0 recommends enabling the “Bad Input - Log4J” rule on all WAF applications.**

##### Bad Input Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|Bad Input - Bad host| Inspects the host header in the request for patterns indicating localhost. Example patterns include localhost|`badHost`|
|Bad Input - Bad path|Inspects the URI path for attempts to access exploitable web application paths. Example patterns include paths such as `web-inf`.|`badPath`|
|Bad Input - Log4js|Inspects the request for the presence of the Log4j vulnerability CVE-2021-44228 and protects against Remote Code Execution (RCE) attempts. Example patterns include `${jndi:ldap://example.com/}`. CAUTION: This rule only inspects the first 8 KB of the request body.|3|
|Bad Input - Propfind|Inspects the HTTP method in the request for `PROPFIND`, which is a method similar to `HEAD`, but with the extra intention to exfiltrate XML objects.|`badProperty`|

#### PHP Application Rules

The PHP application rule group contains rules that block request patterns associated with the exploitation of vulnerabilities specific to the use of the PHP programming language. This includes the injection of unsafe PHP functions into requests. 

##### PHP Application Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|PHP - Body|Inspects the values of the request body for PHP script code injection attempts. Example patterns include functions such as `fsockopen` and the `$_GET` superglobal variable.|`phpBody`|
|PHP - Query|Inspects the values of all query parameters for PHP script code injection attempts. Example patterns include functions such as `fsockopen` and the `$_GET` superglobal variable.|`phpArgs`|

#### SQL Database Rules

The SQL database rule group contains rules to block request patterns associated with exploitation of SQL databases, like SQL injection attacks. This can help prevent remote injection of unauthorized queries. Evaluate this rule group for use if your application interfaces with an SQL database.

##### SQL Database Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|SQL - Body|Uses the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement to inspect the request body for patterns that match malicious SQL code. CAUTION: This rule only inspects the first 8 KB of the request body|`sqlBody`|
|SQL - Cookie|Uses the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement to inspect the request cookie header for patterns that match malicious SQL code.|`sqlCookie`|
|SQL - Query|Uses the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement to inspect the request query parameters for patterns that match malicious SQL code.|`sqlArgs`|
|SQL - Query Extended|Inspects the values of all query parameters for patterns that match malicious SQL code. The patterns this rule inspects for aren't covered by the built-in {{ PRODUCT_NAME }} WAF SQL injection match statement.|`sqlArgsExtra`|
|SQL - URI path|Uses the built-in {{ PRODUCT_NAME }} WAF injection match statement to inspect the request URI path for patterns that match malicious SQL code.|`sqlPath`|

#### Add Rule Groups to a WAF

![Add Rule Groups to WAF](/images/security/addrg1.jpg "Add Rule Groups to WAF")

1. Log in to the [Layer0 console](https://app.layer0.co/). 
1. Click *SECURITY* from the top banner to launch the WAF Security Rules page.
1. Select [*WAF-1* or *WAF-2*](#what's-the-difference-between-waf-1-and-waf-2?) from the first dropdown and the [configuration version](#how-do-i-know-which-version-to-use?) from the second. 
1. Click *EDIT* to set your security rules.

![Add Rule Groups to WAF2](/images/security/addrg1a.jpg "Add Rule Groups to WAF2")

5. Select the *Set all rules to …* dropdown.
6. Choose the action for the group: *Off*, [*Flag*, or *Block*](#what-is-the-difference-between-flagging-and-blocking-a-rule-or-rule-group?). 
7. When you’ve made all your changes, select *ACTIVATE*.

#### Add Single Rules to a WAF

![Add Single Rule to WAF](/images/security/addrg1.jpg "Add Single Rule to WAF")

1. Log in to the [Layer0 console](https://app.layer0.co/). 
1. Click *SECURITY* from the top banner to launch the WAF Security Rules page.
1. Select [*WAF-1* or *WAF-2*](#whats-the-difference-between-waf-1-and-waf-2) from the first dropdown and the configuration version from the second. 
1. Click *EDIT* to set your security rules.

![Add Single Rule to WAF2](/images/security/addrg2.jpg "Add Single Rule to WAF")

5. If collapsed, expand the Rule Group dropdown using the arrow to its left. You can hover over the rule name to view its description.
6. Click the *Flag/Block* dropdown.
1. Select the action for the rules you want to change: *Off*, [*Flag*, or *Block*](#what-is-the-difference-between-flagging-and-blocking-a-rule-or-rule-group?). 
1. When you’ve made all your changes, select *ACTIVATE*.

#### Apply a WAF to Your Environment

Prerequisite: Configured WAF rules and/or rule groups.

Once you’ve configured the WAF rules you want to use, you need to apply them to the corresponding environments you want to deploy them on. Rules are NOT applied to traffic until you take this step to apply them. 

Follow these steps to add a WAF to an environment:

![Apply WAF to Environment](/images/security/addrg3.jpg "Apply WAF to Environment")

1. Log in to the [Layer0 console](https://app.layer0.co/) and select your site.
1. Click the ENVIRONMENTS tab.
1. Choose an environment from the list.

![Security Configuration](/images/security/security.jpg "Security Configuration")

5. Select *CONFIGURATION* from the top navigation.
1. Click *EDIT*.
1. Scroll down to the Security section.
1. From the dropdown, select an active WAF to add.
1. Click the ACTIVATE button from either the top or the bottom of the page.

## Bot Detection

### Detect Bots with Managed Rules

The {{ PRODUCT_NAME }} Bot protection contains rules to block and manage requests from bots. You are charged additional fees when you use this product.  
 
The Bot Control product applies labels to a set of verifiable bots that are commonly allowed. The rule group doesn't block this category of commonly allowed bots.

**Bot Rule Group**: In addition to the WAF rule groups, {{ PRODUCT_NAME }} offers an additional Managed Rule Group for bots that allows you to take action against common bots that may impact the performance and availability of your web application or APIs. 

You can monitor the impact of your bots by flagging each bot type of request gaining insights into SEO bots, scraping bots, advertising bots, malicious user agent bots, and several other categories of bots.

##### Bot Rule Descriptions

| Rule Name|Description|Log Name|
| --- | --- | --- |
|BOT - Advertising|Bots that are used for advertising purposes.|`botAds`|
|BOT - Archiver|Bots that are used for archiving purposes.|`botArchiver`|
|BOT - Browser|Indications of an automated web browser.|`botBrowser`|
|BOT - Content|Bots that are fetching content on behalf of an end user.|`botFetcher`|
|BOT - Data center|Data centers that are typically used by bots.|`botProvider`|
|BOT - HTTP Library|HTTP libraries that are often used by bots.|`botLib`|
|BOT - Link checker|Bots that check for broken links.|`botLinkChecker`|
|BOT - Miscellaneous|Miscellaneous bots.|`botOther`|
|BOT - Monitoring|Bots that are used for monitoring purposes.|`botPing`|
|BOT - Scraping|Web scraping frameworks.|`botScraper`|
|BOT - Search Engine|Search engine bots. Verified search engines are not blocked.|`botSearch`|
|BOT - Security|Security-related bots.|`botSecurity`|
|BOT - SEO|Bots that are used for search engine optimization.|`botSeo`|
|BOT - Social Media|Bots that are used by social media platforms to provide content summaries. Verified social media bots are not blocked.|`botSocial`|
|BOT - User agent|User agent strings that don't seem to be from a web browser.|`botUserAgent`|

### Detect Bots with EdgeJS

#### General Information

{{ PRODUCT_NAME }}  examines the `user-agent` header in an incoming request to determine if it includes a string that indicates if it is a bot, and if so, injects `1` in the `x-0-device-is-bot` request header, which will be visible to your server code. If the `user-agent` header does not include any of the strings indicating a bot, a `0` value is injected.

#### User Agents and Bots

The following table list the user agents that  {{ PRODUCT_NAME }}  examines and describes the corresponding bots.

|User Agent|Bot Description|
|----------|-----------|
|embedly|Embed.ly web crawler bot that performs HTTP requests most often in automatic mode.|
|facebookexternalhit|Facebook bot that crawls the HTML of social plugins, apps, and websites shared on Facebook. The bot gathers and caches data (title, description, thumbnail image) about the shared content and presents the data as a preview.|
|flipboard|Flipboard Proxy Service bot that runs in response to a user request for the service to scan a social media feed such as Twitter, and construct a processed feed of items to deliver in real time.|
|googlepagesspeed|Google bot that assists in ranking search results based on page load speed.|
|Google web/snippet|Google+ Enterprise bot that extracts high-level data from a URL posted on Google+ Enterprise and presents the data as a snippet of the URL.|
|headless|Bots, usually scripts, that run on a scheduled basis or are triggered from an external system. Headless bots usually perform activities like sending alerts or daily digest messages. The scripts usually run for a short time, then terminate.|
|ia_archiver|Amazon Alexa bot that crawls web sites for issues related to Amazon's Site Audit service.|
|outbrain|Outbrain Recommendation Platform chat bot.|
|pinterest|Automated Pinterest bot that creates boards and schedules pins to post to customer accounts.|
|prerender|Prerender.io hosted service bot that produces an easily crawled version of dynamically rendered pages, allowing indexing by search engines.|
|preview|Yahoo bot that extracts data (title, description, thumbnail images) from a URL embedded in an email and presents the data as a preview of the URL|
|qwantify|Web crawler bot that indexes content for the Qwant search engine.|
|scanner|Bots that analyze how well your website and its security measures respond to various bot threats.|
|slurp|Yahoo Search bot for crawling and indexing web page information.|
|spider|General purpose automated bots that crawl the web to index web page information.|
|tumblr|Tumblr bot that performs automated HTTP requests as a web crawler.|
|vkshare|VK social network bot that performs automated HTTP requests usually as a web crawler.|
|w3c_validator|W3C bot that checks Web documents in formats like HTML and XHTML for conformance to W3C Recommendations and other standards.|
|whatsapp|Whatsapp platform chat bot.|
|xing-contenttabreceiver|Xing social network crawler bot that indexes content for the Xing social network.|
|yahoo|Another Yahoo Search robot for crawling and indexing web page information.|

If the set of bots detected by  {{ PRODUCT_NAME }}  is not sufficient for your needs, you can easily add your own bot detection through [EdgeJS](/guides/routing) and its [`match`](/docs/api/core/classes/_router_router_.router.html#match) and [`setRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#setrequestheader) APIs:

```js
router.match(
  {
    headers: {
      'user-agent': /^regex-for-your-bot-detection$/i
    },
  },
  ({ setRequestHeader }) => {
    setRequestHeader('my-bot-detection-is-bot', '1')
  }
)
// ... all your other routes go here and they can match on `my-bot-detection-is-bot: 1`
```

The above code will match all the routes that even have a `user-agent` header and then inject the `my-bot-detection-is-bot` when the value of the user agent header matches the given regex. Once the header has been injected, the later routes can test for it and implement bot handling. Or, you could just let the header be sent upstream for your backend to handle it.

## Security Reporting

![Reporting](/images/security/addrg3.jpg "Reporting")

1. Log in to the [Layer0 console](https://app.layer0.co/) and select your site.
1. Click the ENVIRONMENTS tab.
1. Choose an environment.
1. Click the SECURITY tab from the top page navigation.

### Security Activity

![WAF Activity](/images/security/wafactivity.jpg "WAF Activity")

| | View Option | Access |
| --- | --- | --- |
|a.|Deployment number|Toggle on/off via WAF Activity settings.| 
|b.|Number of requests by action (passed, flagged, blocked)|Hover over graph data.|
|c.|Requests by action (passed, flagged, blocked)|Toggle the checkboxes.|
|d.|Deployments and/or full cache flushes|Toggle on/off via WAF Activity settings.|

### Rules Applied

![Rules Applied](/images/security/rulesapplied.png "Rules Applied")

| | View Option | Access |
| --- | --- | --- |
|a.|Date range|Select 24 hour, 7 days, or 28 days.| 
|b.|Flagged and/or Blocked requests|Toggle the Flagged and Blocked buttons.|
|c.|Graph of rules applied|Click inside the graph to list the names of the rules that have been applied to your Bot Control or {{ PRODUCT_NAME }} Managed rules. Click *Back to Rule Sets* to return to the previous view.|

### Rules Section

![Rules](/images/security/rules.jpg "Rules")

| | View Option | Access |
| --- | --- | --- |
|a.|Rules by type|Expand or collapse the list using the arrow to the left of the rule type.| 
|b.|Route details|Click the rule name to view route information for that rule, including its path and number/percentage of total, flagged, and blocked requests.|

### Logs

Here is an example log file highlighting the WAF data ("waf":"botLib,flagged","wafv":"WAF-1,2"): the action applied, the mode, the WAF name, and the version number.

![WAF Log File Example](/images/security/log.jpg "WAF Log File Example")

## Website Security

### Content Security Policy (CSP)

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

You can easily add CSP headers to your site via a catch-all route near the top of your router.

To enforce a content security policy:

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader(
    'Content-Security-Policy',
    "default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi",
  )
})
// The rest of your router...
```

To enable a content security policy in report-only mode:

```js
new Router().match('/:path*', ({ setResponseHeader }) => {
  setResponseHeader('Content-Security-Policy-Report-Only', "default-src 'self'")
})
// The rest of your router...
```

### Enabling Basic Authentication

You can add basic authentication to your site using the `requireBasicAuth` router method. For example, add the following to the
top of your router:

```js
router.requireBasicAuth({
  username: process.env.BASIC_AUTH_USERNAME,
  password: process.env.BASIC_AUTH_PASSWORD,
})
```

Then, add `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` environment variables to each environment that should enforce basic authentication. Any environment without those
environment variables will not enforce basic authentication.

### SSL

By default {{ PRODUCT_NAME }} only serves traffic over the `https` protocol. It automatically redirects `http` requests to the same URL, including any query strings, on `https`.

We strongly discourage the use of `http` protocol but if you _must_ enable it then you can do so by adding `protocol: 'http'` to your route criteria. For example:

```js
// routes.js

// Respond to Let's Encrypt HTTP-01 challenge.
router.match(
  {
    protocol: 'http',
    path: '/.well-known/acme-challenge/<your token>',
  },
  ({ send }) => {
    send('<token value>')
  },
)
```

If you want the route to match both `http` and `https` protocols you can match on `protocol: /^https?$/`. If no route is matched on `http` protocol then {{ PRODUCT_NAME }} will fallback on its default behavior of automatically redirecting the request to `https`.

Additionally:

- A request's protocol can be determined by reading the [`{{ HEADER_PREFIX }}-protocol`](request_headers#section_general_headers) request header or the [`request.secure`](/docs/api/core/interfaces/_router_request_.request.html#secure) property.
- During local development all requests will appear secure by default. To test your router for `http` protocol matching you must either set the `{{ COOKIE_PREFIX }}_emulate_local_http` cookie to `true` (if using a browser) or send an `{{ HEADER_PREFIX }}-protocol` request header set to `http`.

### Secrets

Rather than putting secret values such as API keys in your code and checking them into source control, you can securely
store them in environment variables, then access them in your code from `process.env`. To configure environment variables,
navigate to your environment, click _EDIT_, then under _Environment Variables_, click _ADD VARIABLE_.

![networking](/images/security/environment-variables.png)

As of {{ PRODUCT_NAME }} CLI version 2.19.0, when you deploy to an environment using a deploy token, for example by running `{{ CLI_NAME }} deploy my-team --environment=production --token=(my token)` option, all environment variables are pulled down from the {{ PRODUCT_NAME }} Developer Console and applied to `process.env` so they can be accessed at build time. This allows you to store all of your build and runtime secrets in a single place, {{ PRODUCT_NAME }} Developer Console, rather than storing some in your CI system's secret manager.

### Cache poisoning

[Cache poisoning attack](https://owasp.org/www-community/attacks/Cache_Poisoning) is described by OWASP&reg; as:

> The impact of a maliciously constructed response can be magnified if it is cached either by a web cache used by multiple users or even the browser cache of a single user. If a response is cached in a shared web cache, such as those commonly found in proxy servers, then all users of that cache will continue to receive the malicious content until the cache entry is purged.

To guard against this attack you must ensure that all the request parameters that influence the rendering of the content are part of your [custom cache key](caching#section_customizing_the_cache_key). {{ PRODUCT_NAME }} will [automatically include](caching#section_cache_key) the `host` header and URL. Including other request headers and cookies are your responsibility.

For example, if you are rendering content based on a custom language cookie, then you must include it in your custom cache key:

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path/depending/on/language/cookie', ({ cache }) => {
  cache({
    key: new CustomCacheKey().addCookie('language'),
    // Other options...
  })
})
```

## FAQs

### What’s the difference between WAF-1 and WAF-2?

You can configure 2 different WAF instances, allowing you to apply different sets of security rules to different environments.

### How do I know which version to use?

Like all {{ PRODUCT_NAME }} products, WAF gives you access to all previous and active versions of your configuration so you have historical setups in case you need to roll back the current version.While editing, the version is in a *Draft* state; once activated, the version is *Active*.

### What is the difference between flagging and blocking a rule or rule group?

To flag a rule or rule group means to mark it if the rule would have been activated without actually denying the traffic. In contrast, when you block a rule or rule group, traffic is denied on affected routes. You can view both flagged and blocked data in your [Layer0 console](https://app.layer0.co/).

### What are {{ PRODUCT_NAME }} Managed Rules and why should I apply this rule group?

Managed rules block specific known threats. Layer0 recommends this rule group for all WAF use cases. 

Note: Layer0 recommends that all customers activate the *Bad Input - Log4J* rule group, as well.

### Is the Layer0 WAF a PCI-compliant solution?

Yes.  Layer0 maintains PCI-DSS Level 1 compliance by undergoing annual audits from approved Visa and MasterCard auditors.

### What is the minimum level of encryption for {{ PRODUCT_NAME }}?

{{ PRODUCT_NAME }} enforces a minimum version of TLS 1.2 or higher.
