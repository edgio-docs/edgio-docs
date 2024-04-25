---
title: Configure
---
Use this section in {{ CONTROL }} to create and manage configurations for {{ DELIVERY }} products, features, and services.

<Callout type="info">You will only see configurations options for the {{ DELIVERY }} features you have enabled for your account. Contact Support or your Account Manager if you have questions about your configuration selections.</Callout>

## Product Features and Services  {/*product-features-and-services*/}

| Feature/Service | Description |
|---|---|
| [Caching & Delivery](/delivery/control/configure/caching_and_delivery) | Caching & Delivery delivers content via HTTP and HTTPS for all file formats. Both full (entire file) and progressive (range request) downloads are supported.|
| [Intelligent Ingest](/delivery/control/configure/intelligent_ingest) | If you're an Origin Storage customer, you can use Intelligent Ingest to automatically populate Origin Storage with new content as it is requested from the CDN. If a request results in a CDN Cache Miss, and the content is not found in Origin Storage, Intelligent Ingest will retrieve and ingest the content from the remote host(s) you specify. You can create any number of "rules" that pair specific Origin Storage logins and content paths with specific remote hosts and paths. These rules are also known as "rewrites."|
| [Chunked Streaming](/delivery/control/configure/chunked_streaming) | Using the Control portal, you can manage a configuration that controls several manifests and Chunked Streaming origins. Chunked Streaming provides a way for you to adopt Edgio's optimized configuration profiles for delivering chunked video content through the CDN over HTTP, HTTPS, or both. To use Chunked Streaming, you first need to chunk your content and generate the associated manifest files (Chunked Streaming does not encode, transcode or transmux your media). You can host your content on your origin servers or with Origin Storage. <br /> <br /><Callout type="info">In general, Chunked Streaming is like Caching & Delivery, but Chunked Streaming allows you to create multiple delivery configurations for media formats.</Callout> |
| [DNS Services](/delivery/control/configure/dns_services) | DNS Services provide an easy-to-use, DNS-based, global load balancer used for directing end-user requests to customer Resources, for example, web servers. <br /> DNS Services are managed by the Director, which is a DNS service that can route traffic based on IP address, end-user nameserver geographic location or the BGP autonomous system number of the end-user nameserver. <br /> Failovers, also known as 'Traffic Balancers', redirect traffic in case a Resource is not available.|
|[MediaVault Hash Generator](/delivery/control/configure/mediavault)| The {{ MEDIAVAULT}} hash generator is a tool you can use to: - Create signed URLs on an ad-hoc basis <br /> Learn how {{ MEDIAVAULT}} works so you can implement hashes within your own applications.|
| [SSL Certificates](/delivery/control/configure/ssl_certificates) | View, create, edit, publish, withdraw, or delete your SSL certificates. |
|[Log Delivery Service](/delivery/control/configure/log_delivery_service) | When requests for your content enter the CDN, the requests are logged based on Log Delivery Service configurations. The Log Delivery Service allows you to configure and manage your log files.|
| [Live Streaming](/delivery/control/configure/live_streaming)| Access the Control portal to view and configure the slots you have purchased.|
