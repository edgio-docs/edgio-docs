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
2.  [Create an origin configuration](#add-an-origin-configuration) that defines how {{ PRODUCT }} communicates with your web server(s). 
3.  [Configure your firewall](#firewall-allowing-ip-addresses)  to accept traffic from our network.
4.  For each hostname defined in step 1, perform the following steps through your DNS service provider:
    1.  Check for CAA records and verify that the Let's Encrypt certificate authority is allowed to issue certificates for that hostname.
    2.  [Add an _acme-challenge CNAME record](#FINDME) that proves your control over that hostname. 

    <Callout type="info">

      These steps allow our CDN to automatically generate and install a TLS certificate on our network. This is required before our CDN can serve HTTPS traffic.

    </Callout>

5.  Once you are ready to [serve traffic on our CDN](#FINDME), use your DNS service provider to update the DNS record for each hostname defined in step 1 to point to our service. 

## Hostnames {/*hostnames*/}

On a per environment-basis, define each hostname that will be served through {{ PRODUCT }}. 

**Key information:**

-   Specify hostnames using lower-case letters.
-   Hostnames must be unique across all environments.

    For example, if you have defined `www.example.com` within the `production` environment, then you cannot define it within any other environment until you delete it from the `production` environment.

-   Each hostname is mapped to an origin configuration. By default, {{ PRODUCT }} proxies cache misses for that hostname to that origin configuration. You may override this mapping through your [CDN-as-code configuration](/guides/performance/cdn-as-code).
-   Each hostname requires the installation of a [TLS certificate](#FINDMElink) on our network. {{ PRODUCT }} can automatically generate and install this TLS certificate when both of the following requirements are met:

    -   **Certificate Authority Authorization:** The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for that hostname. It is allowed to issue certificates when either of the following conditions are true:

        -   A CAA record has not been issued for that hostname or a parent hostname. This DNS configuration means that any CA is allowed to generate certificates for that hostname.
        -   A CAA record explicitly allows the Let's Encrypt CA to generate certificates for that hostname. 

        This sample CAA record indicates that the Let's Encrypt CA is allowed to issue certificates for `cdn.example.com`:

        `cdn.example.com.   CAA 0 issue "letsencrypt.org"`

    -   **Domain Control Validation:** Prove your control over that domain by adding an _acme-challenge CNAME record to it.

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
5.  Optional. Define TLS settings for this origin configuration. Click on the **Origin TLS Settings** section to expand it.

    1.  Enable SNI by toggling the **Use SNI** option to the on position (<img data-inline-img src="/images/icons/toggle-on.png" alt="Toggle on" />) and then defining the hostname that will be sent as a SNI hint during the TLS handshake. 

    <Callout type="info">

      Upon enabling SNI, our service will perform a strict check using this hostname against the certificate's Subject Alternative Name (SAN) or Common Name (CN) during the TLS handshake.

    </Callout>

    2.  If your origin servers use a self-signed certificate, then you should toggle the **Allow Self Signed Certs** option to the on position (<img data-inline-img src="/images/icons/toggle-on.png" alt="Toggle on" />).
    3.  Set up certificate pinning by adding one or more public keys.

        1.  Click **+ Add Pin**.
        2.  Paste the SHA-256 digest for the public key of your leaf certificate.
        3.  Repeat steps 1 and 2 as needed.

6.  Optional. Protect your origin by defining one or more [shield POP(s)](/guides/security/origin_shield). Click on the **Shields** section to expand it.

    1.  Assign a POP location to the region closest to your web server(s).

        Upon configuring a region, all other regions will be updated from `Bypass` to the selected POP. This configuration means that cache misses from all regions will be proxied to the selected POP location.

        ![Single Shield](/images/security/origin-shield-single.png?width=600)

    2.  Optional. Assign a POP location to a different region.

        Upon configuring a second region, the remaining regions are automatically updated from the selected POP to `Use the shield with the lowest RTT`. This configuration means that cache misses from the remaining regions will be proxied to the shield POP that will provide the best performance.

        For example, the following configuration may potentially allow cache misses from the APAC region to be served through the shield location defined for the US West region (i.e., `OXR`).

        ![Multiple Shields](/images/security/origin-shield-multiple.png?width=600)

    3.  Optional. Repeat step 2 as needed.

    4.  Optional. Configure cache misses from a specific region to always be proxied to your origin by selecting `Bypass`.

7. If you are finished making changes to this environment, click **Deploy Changes**.

## TLS Certificate {/*tls-certificate*/}



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


