---
title: Serving Traffic through Our Network
---

Serve traffic through {{ PRODUCT }} by [updating the DNS records for each hostname registered with {{ PRODUCT }}](#dns) to point to our service.

<Callout type="important">

  Before serving traffic through our network, please review our Acceptable Use Policy. [Learn more.](#acceptable-use)

</Callout>

## Checklist {/*checklist*/}

Before updating your DNS records, verify that you have performed the following tasks:

| Task                                                                                                                                                                               | Description                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Created hostname(s) through the [{{ PORTAL }}](/applications/basics/hostnames#add-modify-delete-hostname) or  [CDN-as-code](/applications/performance/cdn_as_code/edgio_config#environments).           | Defined each hostname through which your site's content will be delivered.                                                                                                                                                                                                    |
| Created origin configuration(s) through the [{{ PORTAL }}](/applications/basics/origins#add-an-origin-configuration) or  [CDN-as-code](/applications/performance/cdn_as_code#defining-origins). | Created one or more origin configuration(s) that defines how {{ PRODUCT }} communicates with your web server(s). <br /><br />If you are using CDN-as-code and do not plan on retrieving data from your web server(s), then you do not need to create an origin configuration. |
| [Configured your firewall.](#firewall-allowing-ip-addresses)                                                                                                                        | If you have defined one or more origin configuration(s), then you must configure your firewall to accept traffic from our network.                                                                                                                                            |
| [Enabled HTTPS support.](/applications/basics/hostnames#https-traffic)                                                                                                                    | Enabled HTTPS support for each registered hostname by either autogenerating or uploading a TLS certificate to our network.                                                                                                                                                    |
| [Deployed your configuration.](/applications/basics/deployments)                                                                                                                         | Deployed the above configurations to {{ PRODUCT }}.                                                                                                                                                                                                                           |
| QA                                                                                                                                                                                 | Tested your site by loading it through a [deployment-specific link](/applications/basics/deployments#deployment-specific-page).                                                                                                                                                     |

## Firewall - Allowing {{ PRODUCT }} IP Addresses {/*firewall-allowing-ip-addresses*/}

As clients request your site, {{ PRODUCT }} sends traffic through our network to the servers associated with your origin configuration(s). You must configure your firewall to allow this traffic to ensure that these requests are not blocked.

<Callout type="important">

  IP blocks may vary by organization.

</Callout>

<Callout type="info">

  If you plan on using the {{ PRODUCT }} CLI to deploy to a development or CI/CD environment, then you will also need to allow traffic from the domain to which it connects. This domain is listed within the **Allowlisting** window.

</Callout>

**To view our network's IP blocks**

1.  Load the **Origins** page.

    {{ ENV_NAV }} **Origins**.

2.  From the information bar at the top of the page, click **instructions**.

    ![Firewall instructions](/images/v7/basics/origins-instructions.png)

    The **Allowlisting** window will display a list of IPv4 and IPv6 blocks for standard traffic, Perimeter 81 for network security, AWS NAT gateway for the {{ PRODUCT }} cloud, and the domain to which the {{ PRODUCT }} CLI connects when deploying to a development or CI/CD environment.

    <Callout type="important">

      We strongly recommend that you allow traffic for all IP blocks and the domain listed on the **Allowlisting** window.

    </Callout>

## DNS

Once you are ready to serve traffic through {{ PRODUCT }}, you will need to configure DNS for each hostname. DNS configuration consists of defining a CNAME record that points your hostname to our service.

<Callout type="info">

  If your hostname is at the zone apex (e.g., example.com), then you will need a DNS service provider that supports defining a CNAME record at the zone apex. Learn how to set this up through Route.](#serving-traffic-at-the-zone-apex)

</Callout>

From your DNS service provider, point your hostname(s) to a service domain that is either specific to your property's environment or space.

**Sample Service Domain:** `2af36ae6-2146-4b73-a5e7-f86c4a93bc06.edgio.link`

### Environment-Specific Service Domain {/*environment-specific-service-domain*/}

{{ PRODUCT }} assigns a different service domain to each of your environments. You may point any hostname defined within a specific environment to its service domain.

**To view the service domain assigned to a specific environment**

1.  Load the **Hostnames** page.

    {{ ENV_NAV }} **Hostnames**.

2.  From the **DNS** column, click **Actions needed**.

    ![DNS - Actions needed](/images/v7/basics/hostnames-dns.png)

3.  From the **DNS Configuration** pane, click <Image inline src="/images/v7/icons/copy-to-clipboard.png" alt="Copy to clipboard icon" />  to copy this domain.

### Space-Specific Service Domain {/*space-specific-service-domain*/}

{{ PRODUCT }} assigns a different service domain to:

-   Your private space.
-   Each organization to which you belong.

You may point any hostname defined within a private space or organization to its service domain.

**To view the service domain**

1.  Load the space's **Settings** page.

    1.  From the {{ PORTAL_LINK }}, select the desired private space or organization.
    2.  Click **Settings**.

2.  From the **Organization DNS Configuration** section, click <Image inline src="/images/v7/icons/copy-to-clipboard.png" alt="Copy to clipboard icon" />  to copy this domain.

### Serving Traffic at the Zone Apex {/*serving-traffic-at-the-zone-apex*/}

{{ PRODUCT }} requires a CNAME record to serve your site's traffic. Some DNS service providers do not support defining a CNAME record for the zone apex (e.g., example.com). In order to serve traffic for a zone apex, you will need to use a DNS service provider that supports CNAME records at the zone apex. Instructions on how to use [{{ PRODUCT }} Route](https://docs.edgecast.com/dns/#Route/Administration/DNS_Zone_Management.htm) to set up a CNAME record at the zone apex is provided below.

<Callout type="info">

  The zone apex is the point in your zone that contains your SOA and NS records.

</Callout>

**To add a CNAME record at the zone apex through Route**

<Callout type="info">

  {{ PRODUCT }} Route requires activation. Additionally, you will need to [delegate your primary zone](https://docs.edgecast.com/dns/#Route/Administration/Switching_DNS_Provider.htm) to {{ PRODUCT }} Route. {{ ACCOUNT_UPGRADE }}

</Callout>

1.  Navigate to the [Route (DNS) page](https://my.edgecast.com/dns/default.aspx).
2.  Click on the desired zone.
3.  Click **Add Record**.
4.  In the **Type** option, select `CNAME`.
5.  Create the following CNAME record:
    -   **Name:** `@`
    -   **TTL:** Set the TTL to the length of time (in seconds) that a DNS server should cache the record.
    -   **Value:** Set this value to a [space-specific service domain](#space-specific-service-domain).
6.  Click **Add**.
7.  Click **Submit Group** to save the zone.

### DNS Verification {/*dns-verification*/}

Once you have updated your DNS configuration, run the following command to verify it:

`dig <HOSTNAME>`

**Example:** The following example demonstrates how to verify the DNS configuration for `cdn.example.com`:

```bash
> dig cdn.example.com

# Result
cdn.example.com.   599    IN    CNAME    2af36ae6-2146-4b73-a5e7-f86c4a93bc06.edgio.link
```

## Acceptable Use {/*acceptable-use*/}

Unless otherwise agreed in writing by {{ PRODUCT }}, Application Services are solely intended for rendering the functional attributes of a website e.g., HTML, JavaScript, CSS, and APIs (subject to the restrictions herein), and are not to be used for video or audio streaming or for delivery of other large file types, including but not limited to images and software downloads or updates ("Unauthorized Traffic") which require the purchase of other {{ PRODUCT }} Services. {{ PRODUCT }} may monitor, terminate, suspend, and/or restrict the use of the Application Services when it determines in its sole discretion that Unauthorized Traffic is being delivered.

View our:
-   [Terms of Service](https://edg.io/company/legal/terms-of-service/)
-   [Acceptable Use Policy](https://edg.io/company/legal/acceptable-use-policy/)
