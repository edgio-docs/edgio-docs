---
title: Hostnames and Origins
---

Setting up the delivery of your site through {{ PRODUCT }} requires the following configuration for each desired [environment](/guides/basics/environments):

-   **Hostname:** Identifies a hostname (e.g., www.example.com) through which your site will be served.
-   **Origin Configuration:** Defines how our service will communicate with your web servers

Control how {{ PRODUCT }} communicates with your web servers by mapping hostnames to origin configurations.

![Hostname and Origin Workflow](/images/basics/hostnames-origins.png?width=781)

You may also serve your site through [Serverless Compute](/guides/performance/serverless_compute). You may serve all of your site traffic through Serverless Compute, your origin server(s), or any combination of both.

![Hostname, Origin, and Serverless Compute Workflow](/images/basics/hostnames-origins-serverless-compute.png)

## Quick Start {/*quick-start*/}

Set up your hostnames and origins through the following steps:

1.  [Define each hostname](#add-modify-delete-hostname) through which your site's content will be delivered. 
2.  Optional. [Create an origin configuration](#add-an-origin-configuration) that defines how {{ PRODUCT }} communicates with your web server(s). 
3.  Optional. If you have defined one or more origin configuration(s), then you will also need to [configure your firewall to accept traffic from our network.](#firewall-allowing-ip-addresses) 
4.  From your DNS service provider, [add a CNAME record for each of the above hostname(s)](#FINDME).

    <Callout type="info">

      This CNAME record validates your control over a hostname. This allows our CDN to generate and install a TLS certificate on our network. This is required before our CDN can serve HTTPS traffic.

    </Callout>

5.  Perform this step once you are ready to [serve traffic on our CDN](#FINDME). From your DNS service provider, update the DNS record that corresponds to each of the hostname(s) identified in step 1 to point to our service. 

## Hostnames {/*hostnames*/}

On a per environment-basis, define each hostname that will be served through {{ PRODUCT }}. 

**Key information:**

-   Specify hostnames using lower-case letters.
-   Hostnames must be unique across all environments.

    For example, if you have defined `www.example.com` within the `production` environment, then you cannot define it within any other environment until you delete it from the `production` environment.

-   Each hostname is mapped to an origin configuration. By default, {{ PRODUCT }} proxies cache misses for that hostname to that origin configuration. You may override this mapping through your [CDN-as-code configuration](/guides/performance/cdn-as-code).
-   Each hostname requires the installation of a [TLS certificate](#FINDMElink) on our network.
-   Once you are ready to serve traffic through {{ PRODUCT }}, update the hostname's [DNS configuration](#FINDME) to point to our service.

**To add, modify, or delete hostnames from an environment** <a id="add-modify-delete-hostname"></a>

1.  Load the **Hostnames** page.
    1.  From the {{ PORTAL }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Hostnames**. 
2.  Perform one of the following steps:

    -   **Add a Hostname:** 

        1.  Click **+ Add hostname**. 
        2.  Add each desired hostname on a separate line. 

        ![Add Hostnames](/images/basics/add-hostnames.png?width=550)

        3.  Click **Add Hostnames**.

    -   **Assign an Origin:** Map a hostname to a different origin by selecting the desired origin from under the **Default Origin** column. 

        <Callout type="info">

          The **Default Origin** column is read-only when the current property only contains a single origin configuration (e.g., `web`).

        </Callout>

    -   **Modify a Hostname:** Modify an existing hostname by replacing the existing hostname with a new value. 

        ![Hostnames](/images/basics/hostnames.png?width=600)

    -   **Delete a Hostname:** Click <img data-inline-img src="/images/icons/delete.png" alt="Delete icon" /> next to the hostname that should be deleted. 

3.  Repeat step 2 as needed.
4.  If you are finished making changes to this environment, click **Deploy Changes**.

## Origin {/*origin*/}

On a per environment-basis, define how {{ PRODUCT }} will communicate with your origin server(s). 

**Key information:**

-   Each origin configuration identifies a set of web server(s) by hostname or IP address.  
-   An origin configuration may identify up to 10 hostnames or IP addresses. 
-   The maximum number of origin configurations per environment is 100.
-   It is strongly recommended to cloak your origin to protect it against attacks that directly target your web servers and thereby bypass the security provided by our service.
-   You may configure an origin configuration to always serve traffic to your hosts over HTTP, HTTPS, or to match the client's scheme. Matching a client's scheme means that our network will serve HTTP traffic to your web servers over port 80, while HTTPS traffic will be served over port 443.
-   Our network can use Server Name Indication (SNI) during the TLS handshake. If the SNI hint is not found, then your origin server's implementation determines the TLS certificate that will be returned.

    Additionally, our service will compare the hostname used for the SNI hint to the certificate's Subject Alternative Name (SAN) or Common Name (CN) during the TLS handshake. If the hostname does not match, then we will respond with a `502 Bad Gateway` response.
-   By default, our network disables delivery when we detect a self-signed certificate from the origin server during the TLS handshake. Enable the **Allow Self-Signed Certs** option to require our edge servers to respond with a `502 Bad Gateway` response upon detecting a self-signed certificate from the origin server during the TLS handshake.
-   Register the SHA-256 digest for the public key of your end-entity (i.e., leaf) certificate within the **Pinned Cert(s)** option. After which, our edge servers will respond with a `502 Bad Gateway` response when the SHA-256 digest for the public key detected from the origin server does not match one of the pinned certificates.

**To add an origin configuration** <a id="add-origin-configuration"></a>

1.  Load the **Origins** page.
    1.  From the {{ PORTAL }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Origins**. 
2.  Click **+ Add Origin**.

    ![Add Origin](/images/basics/origins-add-origin.png?width=600)

3.  In the **Name** option, assign a name to this origin configuration. This name should only consist of alphanumeric characters, hyphens, periods, and underscores.

    <Callout type="info">

      We recommend a unique, descriptive name to help you quickly map hostname(s) to this origin configuration. 

    </Callout>

4.  Define one or more host(s). Each host determines how {{ PRODUCT }} will communicate with your web server(s).

    ![Define host](/images/basics/origins-add-origin-2.png?width=600)

    1.  In the **Origin Hostname** option, type a hostname or IP address that points to your web server(s).
    2.  Optional. Set the **Port** option to the port over which our network will serve traffic to the above hostname or IP address.
    3.  Set the **Scheme** option to always serve traffic to your hosts over HTTPS, HTTP, or to match the client's scheme.
    4.  Optional. Override the client's `Host` header by setting the **Override Host Header** option to the desired hostname. 

    <Callout type="info">

      This option forces our CDN to set the `Host` header to the specified hostname whenever it proxies traffic to this origin configuration.

    </Callout>

    5.  Optional. Add another host to this origin configuration by clicking **+ Add Host** and then performing steps 4.1 - 4.4. 
5.  Optional. Define TLS settings for this origin configuration. Expand the **Origin TLS Settings** section.

    1.  Enable SNI by toggling the **Use SNI** option to the on position (<img data-inline-img src="/images/icons/toggle-on.png" alt="Toggle on" />) and then defining the hostname that will be sent as a SNI hint during the TLS handshake. 

    <Callout type="info">

      Upon enabling SNI, our service will perform a strict check using this hostname against the certificate's Subject Alternative Name (SAN) or Common Name (CN) during the TLS handshake.

    </Callout>

    2.  If your origin servers use a self-signed certificate, then you should toggle the **Allow Self Signed Certs** option to the on position (<img data-inline-img src="/images/icons/toggle-on.png" alt="Toggle on" />).
    3.  Set up certificate pinning by adding one or more public keys.

        1.  Click **+ Add Pin**.
        2.  Paste the SHA-256 digest for the public key of your leaf certificate.
        3.  Repeat steps 1 and 2 as needed.

6.  Optional. Protect your origin by adding one or more shield(s).

    1.  Assign the region closest to your web server(s) a POP location.

        Upon configuring a region, all other regions will be updated from `Bypass` to the selected POP. This configuration means that cache misses from all regions will be proxied to the selected POP location.

        ![Single Shield](/images/basics/origin-shields-single.png?width=600)

    2.  Optional. Assign a POP location to a different region.

        Upon configuring a second region, the remaining regions will be updated from the selected POP to `Use the shield with the lowest RTT`. This configuration means that cache misses from the remaining regions will be proxied to the shield that will provide the best performance.

        For example, the following configuration may cause cache misses from the APAC region to be served through the shield location defined for the US West region (i.e., `OXR`).

        ![Multiple Shields](/images/basics/origin-shields-multiple.png?width=600)

    3.  Optional. Repeat step 2 as needed.

7. If you are finished making changes to this environment, click **Deploy Changes**.

## TLS Certificate {/*tls-certificate*/}

todo

## Firewall - Allowing {{ PRODUCT }} IP Addresses {/*firewall-allowing-ip-addresses*/}

For the purpose of fulfilling requests, our edge servers require access to all servers associated with your origin configurations.

<!--
customer origin group. Please ensure that your firewall allows access to all of the IP blocks listed in the Whitelist IP Blocks page.

Export a list of the IPv4 and IPv6 blocks that should be whitelisted by clicking CSV from the Whitelist IP Blocks page.

The Whitelist IP Blocks page contains a superset of IP addresses that includes:

The IP blocks defined within the CDN IP's page.
The IP blocks for future POPs.

Once the IP blocks defined within the Whitelist IP Blocks page have been whitelisted on your firewall, it is unnecessary to add the IP blocks defined within the CDN IP's page.
Verify that the firewall for your web servers does not restrict access to the IP address blocks listed within the Whitelist IP Blocks page.

Before going live, ensure that all Edgio IP addresses are allowed in the security layer in front of your origin and/or API servers. The IP addresses you need to allow can be found on the Allowlisting section under the Origin Security tab for your property. Note that each team may have their own set of IPs so these values cannot be copied from one team to another.
allowlisting

-->

### Serving Traffic through {{ PRODUCT }} {/*serving-traffic-through*/}

Once you are ready to serve traffic through {{ PRODUCT }}, you will need to configure DNS for each hostname.

<!--
In order to configure your DNS provider to direct traffic for a particular set of domains to Edgio, you must create DNS records for your website. If you are launching a new site, then you can create the records whenever you feel ready. For sites that are already live, the DNS update is the last step. Once you have updated your DNS you are committed to launching.

To see the DNS configuration values, click the Actions needed button in the Domains section of the Configuration tab. This will show you the A and CNAME records you need to create in your DNS provider.
dns configuration
Using a Sub-domain

To host your site on a subdomain (e.g. www.mywebsite.xyz), add a CNAME record with the value shown under DNS Configuration (see above).

# To verify your DNS entry, run the following command {/*to-verify-your-dns-entry-run-the-following-command*/}

dig your-sub-domain


# Example {/*example*/}

dig www.mywebsite.xyz


# Result {/*result*/}

www.mywebsite.xyz.   599    IN    CNAME    d12ea738-71b3-25e8-c771-6fdd3f6bd8ba.layer0-limelight.link.

Using an Apex Domain

To host your site on the apex domain (e.g. mywebsite.xyz), create multiple A records on your apex domain, with the following Anycast IP address values: 208.69.180.11, 208.69.180.12, 208.69.180.13, 208.69.180.14

# To verify your DNS entry, run the following command {/*to-verify-your-dns-entry-run-the-following-command*/}

dig your-apex-domain


# Example {/*example*/}

dig mywebsite.xyz


# Result {/*result*/}

mywebsite.xyz.        599    IN    A        208.69.180.11

mywebsite.xyz.        599    IN    A        208.69.180.12

mywebsite.xyz.        599    IN    A        208.69.180.13

mywebsite.xyz.        599    IN    A        208.69.180.14

Using Both an Apex Domain and a Sub-domain

Create the multiple A records with the IPs, on your apex domain (see above).

Create a CNAME record for your sub-domain, with the value of your apex domain.

# To verify your DNS entries, run the following command {/*to-verify-your-dns-entries-run-the-following-command*/}

dig your-sub-domain

# Example {/*example*/}

dig www.mywebsite.xyz

# Result {/*result*/}

www.mywebsite.xyz.    599    IN    CNAME.   mywebsite.xyz.

mywebsite.xyz.        599    IN    A        208.69.180.11

mywebsite.xyz.        599    IN    A        208.69.180.12

mywebsite.xyz.        599    IN    A        208.69.180.13

mywebsite.xyz.        599    IN    A        208.69.180.14


-->

## Origin Shield {/*origin-shield*/}

Origin Shield establishes an additional buffer between a customer origin server and your clients. This buffer is useful for protecting a customer origin server from:

-   Denial of service attacks
-   Spikes in traffic

### How Does It Work? {/*how-does-it-work*/}

The Origin Shield feature reduces the number of requests that are sent to the customer origin server. This results in reduced server and network load on the customer origin server. It is able to accomplish this by establishing an intermediate caching layer between the customer origin server and an edge server. This intermediate caching layer is illustrated below.

[image placeholder Origin Shield](todo)

This intermediate caching layer augments the default CDN caching behavior in the following ways: 

-   Allows content requested from your origin servers to be cached on our origin shield servers (i.e., intermediate caching layer).
-   If an edge server does not have a fresh version of the requested content, then it will forward the request to an origin shield server.

    The origin shield server will handle this request according to the cache state of the requested content (as indicated below).

    -   **Found (Valid TTL):** If a cached version of the requested content is found with a valid time-to-live (TTL), then the origin shield server respond with that cached content to the edge server. The edge server will then forward that response to the client.

        Our service was able to serve the requested content without communicating with your origin servers. In addition to improving performance, it eliminates bandwidth and load on your network.

    -   **Stale:** If a stale version of the requested content is found, then the origin shield server will revalidate the cached asset with the origin server.

        Our origin shield servers provide a central caching repository that increases the probability that the requested content has been previously cached. In turn, this drastically reduces the number of requests that must be fulfilled by your origin servers.

    -   **Not Found (Cache Miss):** If the requested content is not found, then an origin shield server will forward the request to your origin servers.

        Our origin shield servers provide a central caching repository through which the frequency of requests for the same content may be minimized. Requests forwarded by our origin shield servers to your origin servers may result in cached content. Our service may then serve that cached content for subsequent requests. 

### Origin Shield Configuration {/*origin-shield-configuration*/}

Protecting your origin through the origin shield requires the selection of a single (recommended) or multiple origin shield locations. Each configuration method is described below.

<Callout type="info">

  Each origin shield location is identified by the three-letter abbreviation for the POP where it is located. 

</Callout>

PLACEHOLDER: Single OS implementation???

Multiple Origin Shield Locations

You may define multiple origin shield locations for a single origin configuration. Choose one of the following options for each region:

-   **Blank:** Leaving a region blank indicates that cache misses for this region will be forwarded to the next closest origin shield region.
-   **POP:** Selecting a POP activates origin shield for that region. Cache misses for this region will go through the selected origin shield. If the origin shield does not have the requested asset, it will request it from your origin servers.
-   **Bypass:** Selecting to bypass a region indicates that cache misses for this region will bypass origin shield and go directly to your origin servers. This type of configuration is the equivalent of turning origin shield off for a particular region.

<Callout type="info">

  Origin shield locations in Asia and South America require the activation of the Premium Asia and Latin America geographic delivery regions, respectively.

</Callout>

TODO: Verify callout

