---
title: What is a CDN?
---

A CDN (Content Delivery/Distribution Network) is a group of geographically distributed and interconnected servers that work together to accelerate the delivery of internet content. The content could be images, videos, files, etc.

## How does a CDN work? {/*how-does-a-cdn-work*/}

A CDN acts as an intermediary between the client and the server. When a user makes a request, the incoming request is routed to the closest CDN, then the CDN checks its cache to see if the requested content is available. If the content is cached, the CDN responds with the content, eliminating the need for a visit to the origin server.

## What are the benefits of using a CDN? {/*what-are-the-benefits-of-using-a-cdn*/}
Because a CDN strategically sits in between the client and server, it can help:

### Improve Performance {/*improve-performance*/}
CDNs can help improve the performance or speed of a website because they are globally distributed, strategically located, and can cache content. This in turn improves the browsing experience for the end user, improves web traffic, and reduces bounce rates on a website.

### Reduce bandwidth costs {/*reduce-bandwidth-costs*/}
In internet communication, the time spent between client and server is money. A constant request visit to the origin server consumes network bandwidth. CDNs can help reduce bandwidth costs through certain implementation detailed optimizations and caching.

### Reduce load on origin servers {/*reduce-load-on-origin-servers*/}
Through certain optimization techniques and caching, CDNs can help reduce the load on origin servers, resulting in improved security and increased uptime.

### Increase content availability and reliability {/*increase-content-availability-and-reliability*/}
A large influx of web traffic directly to an origin server or hardware failures can bring a website down. The fundamental distributed nature of CDNs makes it fault tolerant with multiple points of failures that keeps the network running and redundant.

### Improve website security {/*improve-website-security*/}
In Distributed denial-of-service (DDoS) attacks, the idea is to take down a website overwhelming it with large amounts of counterfeit traffic. CDNs can mitigate DDoS attacks by distributing the traffic between other intermediary servers, reducing the possibility of an impact on the origin server.
