---
title: What is a CDN?
---

A CDN (Content Delivery/Distribution Network) is a group of geographically distributed and interconnected servers that work together to accelerate the delivery of internet content. The content could be images, videos, files, etc.

In the classic [client-server architecture](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) followed by [Hypertext Transfer Protocol (HTTP)](https://developer.mozilla.org/en-US/docs/Web/HTTP), internet communication occurs between a client and server such as web browsers and web servers. The latency of HTTP request and response (that is, latency of content delivery) between the client and server is dependent on how far apart or the physical distance between the client and server.

The main benefit of a CDN is to improve the performance or speed of content delivery by reducing latency. CDNs first appeared in the internetworking ecosystem back in the late 1990s (as the internet became more popular and crucial for businesses and consumers) to mitigate the performance bottleneck or reduce latency inherent in the design of internet communication.

A CDN acts as an intermediary between the client and the server. When a user makes a request, the incoming request is routed to the closest CDN. The CDN checks its cache to see if the requested content is available. If the content is cached, the CDN responds with the content, eliminating the need for a visit to the origin server.

To reduce latency between client and server, the CDN employs the use of PoPs (Points of Presence)

## Benefits of a CDN {/*benefits-of-a-cdn*/}
Because a CDN strategically sits in between the client and server, it can help:

## 1. Improve Performance / speed / Reduced network latency {/*1-improve-performance-speed-reduced-network-latency*/}
CDNs can help improve the performance or speed of a website because they are globally distributed, strategically located, and can cache content. This in turn improves the browsing experience for the end user, improves web traffic, and reduces bounce rates on a website.

## 2. Reduce bandwidth costs {/*2-reduce-bandwidth-costs*/}
In internet communication, the time spent between client and server is money. A constant request visit to the origin server consumes network bandwidth. CDNs can help reduce bandwidth costs through certain implementation detailed optimizations and caching.

## 3. Reduce load on origin servers {/*3-reduce-load-on-origin-servers*/}
Through certain optimization techniques and caching, CDNs can help reduce the load on origin servers, resulting in improved security and increased uptime.

## 4. Increase content availability and reliability {/*4-increase-content-availability-and-reliability*/}
A large influx of web traffic directly to an origin server or hardware failures can bring a website down. The fundamental distributed nature of CDNs makes it fault tolerant with multiple points of failures that keeps the network running and redundant.

## 5. Improve website security {/*5-improve-website-security*/}
In Distributed denial-of-service (DDoS) attacks, the idea is to take down a website overwhelming it with large amounts of counterfeit traffic. CDNs can mitigate DDoS attacks by distributing the traffic between other intermediary servers, reducing the possibility of an impact on the origin server.
