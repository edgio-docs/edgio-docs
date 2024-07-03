---
title: Getting Started
---

## Working with Edgio  {/*working-with-edgio*/}
Your primary contact at Edgio will be your Account Manager, who will work closely with you from initial Edgio Account setup to “going live” with your service(s).

Initially, your Account Manager and Solutions Engineer will help you identify and confirm all of the information needed to complete your order. Once your order has been placed, your Account Manager will track the progress of the order and request any additional information needed to ensure a successful implementation.

When your Content Delivery service is ready (“provisioned”), you will receive a Welcome Letter from our support team with important information about your Edgio Account. For more information, please see [Understanding Your Welcome Letter(/delivery/guide/implementation/#understanding-your-welcome-letter)].

Once your service is configured and available to be used to deliver your content, you can contact our Support team 24 x 7 for technical assistance with your Content Delivery service. If you have questions about which Content Delivery features you purchased, or about additional services, your Account Manager will be happy to assist.

Finally, you can log in to [Edgio Control](https://control.llnw.com/) at any time to submit and track support tickets, access documentation, and view detailed reports on the traffic handled by your Content Delivery service.

To set up your Edgio Account, please be prepared to provide your Account Manager the following information:

- Contacts
    -An administrative contact for your team
    -A technical contact for your team
- Content Overview
    - An overview of the types of content you deliver and the way your audience consumes it
    - The method you use to publish your content today and the frequency with which you update your content
    - Any content security or access restrictions
    - Any requirements for integration with your company’s content-management system
- Content Statistics
    - The types of files (file extensions) in your content
    - The average size of your individual content files
    - The approximate disk space required to store all of your content, and the projected annual growth rate
    - The approximate number of files in your library and percentage of those files your audience accesses regularly
- Traffic Statistics
    - The monthly traffic volume you expect Content Delivery to handle during the first six months and projected annual growth rate
    - The percentage of your traffic that comes from major geographic regions (North America, Europe, Asia, etc.), plus any international markets that require particular attention
- Configuration
    - Origin Hostname - the URL where Content Delivery will request content to fill the cache
    - Published Hostname - the URL prefix you want your audience to see in published links to your content (optional). You can provide this in the form of a DNS CNAME if you want to control the prefix completely or a suggested Edgio Account name (which, if accepted, will be prepended to the default Content Delivery form: account_name.vo.llnw.net).


## Choosing an Origin   {/*choosing-an-origin*/}
### Edgio Origin Storage   {/*edgio-origin-storage*/}
Edgio Origin Storage is a purpose-built digital content origin - a secure origin distributed within the Edgio CDN.

Edgio Origin Storage lowers latency (response time) by storing your assets at the CDN edge of Edgio’s massive global network. And because Edgio Origin Storage is fully integrated with Content Delivery, your content is retrieved in record-setting time from inside the Edgio network on every request - even while Content Delivery is retrieving and caching new or updated content.

With Origin Storage’s unique policy-based replication, you can ensure your content is replicated to the geographic locations that provide optimal performance. Policy-based replication increases content availability - you achieve global scale and elasticity while improving responsiveness to both planned and unexpected events.

It is easy to select Origin Storage as your Content Delivery origin - a single configuration setting is all that is required.

To order Origin Storage and for answers to additional questions about the service, please contact your Account Manager.

### Other Hosting Options  {/*other-hosting-options*/}
If you are happy with your current origin, you can continue using it without interruption. Content Delivery will simply fill its cache from your origin as requests are received.

However, there are a few important requirements your origin must meet:

Your origin server(s) must be able to respond to HTTP GET requests
Your server(s) must be protected with industry-standard redundancy measures (such as a fault tolerance configuration and some type of load balancing)
Your server(s) must be able to sustain the load generated when Content Delivery fills its cache. If a server fails to respond to a request for content that is either not yet in cache or is uncacheable (such as dynamic content), then content cannot be delivered for that request.
For more information on these requirements, please contact your Account Manager.

To order the service, please contact your Account Manager, who is prepared to help with all pre-sales questions, quotes, and ordering issues.

## Preparing Your Content  {/*preparing-your-content*/}
### General Guidelines  {/*general-guidelines*/}
### Uploading Your Content (Edgio Origin Storage Only)   {/*uploading-your-content*/}
If you are using Origin Storage as your origin, you need to upload your content to Origin Storage and set up your replication and location policies.

For detailed information on doing so, please see the links to the Origin Storage Quick Start Guide, User Guide and Best Practices Guide in the Support > Documentation page in Edgio Control.

### Following Content Best Practices  {/*following-content-best-practices*/}
#### Naming Files  {/*naming-files*/}
Edgio recommends you incorporate a version number or date in your filenames. For example, the first version of your logo might be titled logo.gif. An updated version of the file might then be labeled logo2.gif.

Content Delivery will then cache updated objects separately from the objects they replace, which can make it easier for you to understand the data in reports.

#### Organizing Content  {/*organizing-content*/}
Organizing content into logical groupings and structures helps with configuration management and reporting across all your content. It may be that you have different requirements for the caching and delivery of images and software download or video files, for example, and need to use longer TTLs for the images than you need to for other assets. Organizing your content into different folder structures and URL paths (e.g., content.mycompany.com/images/ and content.mycompany.com/assets/) enables this to be done simply using the configuration options and reports available to you in the Control.

#### Controlling Freshness Checks  {/*controlling-freshness-checks*/}
You can use HTTP response headers to control when Content Delivery performs freshness checks on your content.

The two most important response headers for cache control are:

Cache-Control: max-age - specifies a maximum age. Intended for use by the requesting client (browser). If the origin server is running Apache servers, Cache-Control: max-age also sets the Expires header
Cache-Control: s-maxage - specifically defines the TTL of a file in cache. Intended for use by the CDN.
The Content Delivery services react differently depending on which of these headers is present in an origin response:

If the response includes the Cache-Control: s-maxage header, the s-maxage value sets the TTL of the associated object. The Cache-Control: max-age header, if any, is ignored.
If the response includes the Cache-Control: max-age header but not Cache-Control: s-maxage, the maxage value sets the TTL of the associated object
If Cache-Control isn't present, but the Expires header is, the Expires header value sets the TTL of the associated object
Finally, if the response contains neither header, TTL is calculated based on the age of the content on the origin. For more information on TTL calculation, please see Time To Live (TTL).
For more information on using headers for cache control and other purposes, please see Header Manipulation.

Migrating from Other CDNs
If you are migrating your content from another CDN, you may want to develop a written migration plan that takes into account any CDN customizations or advanced features you depend on. Your Account Manager and Solutions Engineer can provide general migration advice and guidelines, and if desired, Edgio Advanced Services can help you develop the migration plan and manage the migration itself.

For more information on Edgio Advanced Services, please contact your Account Manager.

Managing Non-Edgio Origins
For the Content Delivery service to cache your content, your origin must provide the following two HTTP response headers with every object:

Last-Modified – the date and time the object was last modified on the origin server (typically the same as the file timestamp).
Content-Length – the size of the object in bytes. If the Content-Length header is missing, Content Delivery will not cache the file.
Also, it is important that you verify the accuracy of file timestamps on your origin server. Correct timestamps ensure Content Delivery performs freshness checks at the correct times.

Furthermore, if you are using a server load balancer, it is critical that you verify that file timestamps match each other across all servers. Timestamp inconsistency between servers may cause improper caching behavior.

Protecting Your Content
Content Delivery provides multiple ways to protect your content, including:

URL protection
Content and URL authentication
“Deep link” prevention
Geographic access restriction
SSL delivery
For more details, please see Content Protection.

### Other Hosting Options  {/*other-hosting-options*/}

If you are happy with your current origin, you can continue using it without interruption. Content Delivery will simply fill its cache from your origin as requests are received.

However, there are a few important requirements your origin must meet:

Your origin server(s) must be able to respond to HTTP `GET` requests
Your server(s) must be protected with industry-standard redundancy measures (such as a fault tolerance configuration and some type of load balancing)
Your server(s) must be able to sustain the load generated when Content Delivery fills its cache. If a server fails to respond to a request for content that is either not yet in cache or is uncacheable (such as dynamic content), then content cannot be delivered for that request.

For more information on these requirements, please contact your Account Manager.

To order the service, please contact your Account Manager, who is prepared to help with all pre-sales questions, quotes, and ordering issues.

## Preparing Your Content  {/*preparingyour-content*/}
### General Guidelines  {/*general-guidelines*/}
#### Uploading Your Origing Storage Content   {/*uploading-your-origin-storage-content*/}

If you are using Origin Storage as your origin, you need to upload your content to Origin Storage and set up your replication and location policies.

For detailed information on doing so, please see the links to the [Origin Storage](/delivery/storage) documentation.

### Following Content Best Practices  {/*following-content-best-practices*/}
#### Naming Files  {/*naming-files*/}
Edgio recommends you incorporate a version number or date in your filenames. For example, the first version of your logo might be titled `logo.gif`. An updated version of the file might then be labeled `logo2.gif`.

Content Delivery will then cache updated objects separately from the objects they replace, which can make it easier for you to understand the data in reports.

#### Organizing Content  {/*organizing-content*/}

Organizing content into logical groupings and structures helps with configuration management and reporting across all your content. It may be that you have different requirements for the caching and delivery of images and software download or video files, for example, and need to use longer TTLs for the images than you need to for other assets. Organizing your content into different folder structures and URL paths (e.g., content.mycompany.com/images/ and content.mycompany.com/assets/) enables this to be done simply using the configuration options and reports available to you in the Control .

#### Controlling Freshness Checks  {/*controlling-freshness-checks*/}

You can use HTTP response headers to control when Content Delivery performs freshness checks on your content.

The two most important response headers for cache control are:

- `Cache-Control: max-age` - specifies a maximum age. Intended for use by the requesting client (browser). If the origin server is running Apache servers, `Cache-Control: max-age` also sets the Expires header
- `Cache-Control: s-maxage` - specifically defines the TTL of a file in cache. Intended for use by the CDN.

The Content Delivery services react differently depending on which of these headers is present in an origin response:

- If the response includes the `Cache-Control: s-maxage` header, the `s-maxage` value sets the TTL of the associated object. The `Cache-Control: max-age` header, if any, is ignored.
- If the response includes the `Cache-Control: max-age` header but not `Cache-Control: s-maxage`, the maxage value sets the TTL of the associated object
- If Cache-Control isn't present, but the `Expires` header is, the `Expires` header value sets the TTL of the associated object
- Finally, if the response contains neither header, TTL is calculated based on the age of the content on the origin. For more information on TTL calculation, please see Time To Live (TTL).

For more information on using headers for cache control and other purposes, please see [Header Manipulation](/delivery/delivery/guide/features/#header-manipulation).

#### Migrating from other CDNs  {/*migrating-from-other-cdns*/}

If you are migrating your content from another CDN, you may want to develop a written migration plan that takes into account any CDN customizations or advanced features you depend on. Your Account Manager and Solutions Engineer can provide general migration advice and guidelines, and if desired, Edgio Advanced Services can help you develop the migration plan and manage the migration itself.

For more information on Edgio Advanced Services, please contact your Account Manager.

#### Managing non-Edgio CDNs  {/*managing-nonedgio-cdns*/}

For the Content Delivery service to cache your content, your origin must provide the following two HTTP response headers with every object:

- `Last-Modified` – the date and time the object was last modified on the origin server (typically the same as the file timestamp).
- `Content-Length` – the size of the object in bytes. If the `Content-Length` header is missing, Content Delivery will not cache the file.
Also, it is important that you verify the accuracy of file timestamps on your origin server. Correct timestamps ensure Content Delivery performs freshness checks at the correct times.

Furthermore, if you are using a server load balancer, it is critical that you verify that file timestamps match each other across all servers. Timestamp inconsistency between servers may cause improper caching behavior.

## Protecting Your Content  {/*protecting-your-content*/}

Content Delivery provides multiple ways to protect your content, including:

- URL protection
- Content and URL authentication
- “Deep link” prevention
- Geographic access restriction
- SSL delivery

For more details, please see [Content Protection](/delivery/delivery/guide/features/#content-protection).
