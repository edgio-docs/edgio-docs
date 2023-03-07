---
title: Origin Shield
---

Origin Shield establishes an additional buffer between your web servers and your clients. This buffer is useful for protecting your web servers from:

-   Denial of service attacks
-   Spikes in traffic

## How Does It Work? {/*how-does-it-work*/}

Origin Shield reduces your server and network load by reducing the number of requests that are sent to your web servers. This reduction in requests is accomplished through an intermediate caching layer between your web servers and an edge server. 

![How does Origin Shield work?](/images/basics/origin-shield-how-does-it-work?width=781)

This intermediate caching layer augments the default CDN caching behavior in the following ways: 

-   Allows content that is proxied through the CDN to your web servers to be cached within our shield POPs (i.e., intermediate caching layer).
-   If an edge server does not have a fresh version of the requested content, then it will forward the request to a shield POP.

    This shield POP will handle this request according to the cache state of the requested content (as indicated below).

    -   **Found (Valid TTL):** If a cached version of the requested content is found with a valid time-to-live (TTL), then the shield POP will respond with that cached content to the edge server. The edge server will then forward that response to the client.

        Our service was able to serve the requested content without communicating with your web servers. In addition to improving performance, it eliminates bandwidth and load on your network.

    -   **Stale:** If a stale version of the requested content is found, then the shield POP will revalidate the cached asset with the web server.

        Our shield POPs provide a central caching repository that minimizes the frequency of requests for the same content and increases the probability that the requested content has been previously cached. In the case of cache revalidation, if the shield POP contains the latest version of the requested content, then your web servers will exclude the payload from the response. 

    -   **Not Found (Cache Miss):** If the requested content is not found, then a shield POP will forward the request to your web servers.

        The shield POP will cache the response according to your caching policy. Future requests for the same content may be served from cache.        

## Origin Shield Configuration {/*origin-shield-configuration*/}

Protecting your origin through the origin shield requires the selection of one or more shield POPs. Your configuration determines how your origin will be shielded.

-   **Bypass:** `Bypass` is the default state. It means that all cache misses are forwarded to your web servers. 

    You may also manually set a region to `Bypass` origin shield. This configuration is the equivalent of turning origin shield off for a particular region.

-   `<POP>`**:** Upon configuring a region, all other regions will be updated from `Bypass` to the selected POP. This configuration means that cache misses from all regions will be proxied to the selected POP location. 

    <Callout type="info">

      The optimal configuration for reducing traffic to your web servers is a single shield POP. This configuration increases your cache hit rate since it forces all cache misses to be funneled through a single location. For optimal performance, assign a shield POP to the region closest to your web servers.

    </Callout>

    ![Single Shield](/images/basics/origin-shields-single.png?width=600)

-   **Use the shield with the lowest RTT:** If you assign a shield POP to more than one region, the remaining regions are automatically updated from the previously selected shield POP to `Use the shield with the lowest RTT`. This configuration means that cache misses from the remaining regions will be proxied to the shield POP that will provide the best performance.

    For example, the following configuration may potentially allow cache misses from the APAC region to be served through the shield location defined for the US West region (i.e., `OXR`).

    ![Multiple Shields](/images/basics/origin-shields-multiple.png?width=600)

**Key information:**

-   Each shield POP is identified by city and the three-letter abbreviation for the POP where it is located. 
-   Shield POPs in Asia and South America require the activation of the Premium Asia and Latin America geographic delivery regions, respectively.

    TODO: Verify.

-   Your CDN caching policy applies to both POPs and shield POPs. 
-   Updating an origin configuration's shield configuration does not purge or modify content cached on the initial shield POP. However, it may result in a temporary increase in bandwidth as content is cached at the new location. This cache fill occurs when the new shield POP handles traffic that has not been previously cached at that location.