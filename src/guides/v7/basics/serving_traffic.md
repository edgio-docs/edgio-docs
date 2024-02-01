---
title: Serving Traffic through Our Network
---

Serve traffic through {{ PRODUCT }} by [updating the DNS records for each hostname registered with {{ PRODUCT }}](#dns). 

## Checklist {/*checklist*/}

Before updating your DNS to point to our service, verify that you have performed the following tasks:

| Task                                                                                                                                                                               | Description                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Created hostname(s) through the [{{ PORTAL }}](/guides/basics/hostnames#add-modify-delete-hostname) or  [CDN-as-code](/guides/performance/cdn_as_code/edgio_config#environments).           | Defined each hostname through which your site's content will be delivered.                                                                                                                                                                                                    |
| Created origin configuration(s) through the [{{ PORTAL }}](/guides/basics/origins#add-an-origin-configuration) or  [CDN-as-code](/guides/performance/cdn_as_code#defining-origins). | Created one or more origin configuration(s) that defines how {{ PRODUCT }} communicates with your web server(s). <br /><br />If you are using CDN-as-code and do not plan on retrieving data from your web server(s), then you do not need to create an origin configuration. |
| [Configured your firewall.](#firewall-allowing-ip-addresses)                                                                                                                        | If you have defined one or more origin configuration(s), then you must configure your firewall to accept traffic from our network.                                                                                                                                            |
| [Enabled HTTPS support.](/guides/basics/hostnames#https-traffic)                                                                                                                    | Enabled HTTPS support for each registered hostname by either autogenerating or uploading a TLS certificate to our network.                                                                                                                                                    |
| [Deployed your configuration.](/guides/basics/deployments)                                                                                                                         | Deployed the above configurations to {{ PRODUCT }}.                                                                                                                                                                                                                           |
| QA                                                                                                                                                                                 | Tested your site by loading it through a [deployment-specific link](/guides/basics/deployments#deployment-specific-page).                                                                                                                                                     |

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

### DNS Verification {/*dns-verification*/}

Once you have updated your DNS configuration, run the following command to verify it:

`dig <HOSTNAME>`

**Example:** The following example demonstrates how to verify the DNS configuration for `cdn.example.com`:

```bash
> dig cdn.example.com

# Result
cdn.example.com.   599    IN    CNAME    2af36ae6-2146-4b73-a5e7-f86c4a93bc06.edgio.link
```
