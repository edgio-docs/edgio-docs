---
title: Custom Domains & SSL
---

This guide covers the steps you need to take your site live on {{ PRODUCT_NAME }} with a secure, custom domain.

Creating custom domains is always done in the context of creating or updating an environment.

## Configuration Overview {/*configuration-overview*/}

1. If needed, create an environment using instructions in [Environments](/applications/basics/environments).

2. Create the [Custom Domain](#custom-domains).

3. [Set up DNS](#setup-dns) for your custom domain.

4. [Allowlist](#allowing-ip-addresses) our network on your firewall.

5. Configure [TLS/SSL](#tlsssl) for the domain.

## Custom Domains {/*custom-domains*/}

Before going live, you must create a production environment and configure your domains.

To configure your custom domains:

1. Navigate to a site, then open an existing environment or create a new environment. (To create an environment, use instructions in [Environments](/applications/basics/environments).)
   * For an existing environment, select the _ENVIRONMENTS_ tab header, then click an environment name in the list of environments. Continue with the numbered steps below.
   * For a new environment, the _DEPLOYMENTS_ tab is displayed. Continue with the following steps.

2. Select the _CONFIGURATION_ tab header.
   <p></p>

   ![domains](/images/production/configurations-tab.png)

3. Create a new draft version of the environment by clicking _EDIT_ at the top of the page.

4. In the _Domains_ section, click _EDIT DOMAINS_.
   <p></p>

   ![domains](/images/production/domains-section.png)

5. Enter a name in the _Edit Domains_ dialog, then click _APPLY_.
   <p></p>

   ![domainsSection](/images/production/domains.png)

6. Click _ACTIVATE_ at the top of the page to enable the updated environment.
   <p></p>

   ![activateEnvironment](/images/production/activate-environment.png)

### Migrating from Fastly {/*migrating-from-fastly*/}

If you're migrating to {{ PRODUCT_NAME }} from [Fastly](https://www.fastly.com/), you will need to do the following before adding your domains to your {{ PRODUCT_NAME }} environment:

- Contact [Fastly support](https://support.fastly.com/hc/en-us/requests/new?ticket_form_id=360000269711) and request that control of your domains be transferred to {{ PRODUCT_NAME }}. Be sure to explicitly list each domain that needs to be transferred and ask Fastly to contact `support@{{ DOMAIN }}` if they need {{ PRODUCT_NAME }} to confirm the transfer.
- Before going live with {{ PRODUCT_NAME }}, you will need to ensure that you've removed your domains from all active Fastly services. To remove domains from a service, clone the service, remove the domains, then activate the new version of the service. Once the new service version is activated you can add the domains to your {{ PRODUCT_NAME }} environment and activate it.

## Set up DNS {/*setup-dns*/}

In order to configure your DNS provider to direct traffic for a particular set of domains to {{ PRODUCT_NAME }}, you must create DNS records for your website. If you are launching a new site, then you can create the records whenever you feel ready. For sites that are already live, the DNS update is the last step. Once you have updated your DNS you are committed to launching.

To see the DNS configuration values, click the _Actions needed_ button in the _Domains_ section of the _Configuration_ tab. This will show you the `A` and `CNAME` records you need to create in your DNS provider.

![dns configuration](/images/production/setup-dns.png)

### Using a Sub-domain {/*using-a-sub-domain-eg-wwwmywebsitexyz*/}

To host your site on a subdomain (e.g. `www.mywebsite.xyz`), add a `CNAME` record with the value shown under _DNS Configuration_ (see above).

```
# To verify your DNS entry, run the following command
dig <your-sub-domain>

# Example
dig www.mywebsite.xyz

# Result
www.mywebsite.xyz.   599    IN    CNAME    d12ea738-71b3-25e8-c771-6fdd3f6bd8ba.layer0-limelight.link.
```

### Using an Apex Domain {/*using-an-apex-domain-eg-mywebsitexyz*/}

To host your site on the apex domain (e.g. `mywebsite.xyz`), create multiple `A` records on your apex domain, with the following Anycast IP address values: 208.69.180.11, 208.69.180.12, 208.69.180.13, 208.69.180.14

```
# To verify your DNS entry, run the following command
dig <your-apex-domain>

# Example
dig mywebsite.xyz

# Result
mywebsite.xyz.        599    IN    A        208.69.180.11
mywebsite.xyz.        599    IN    A        208.69.180.12
mywebsite.xyz.        599    IN    A        208.69.180.13
mywebsite.xyz.        599    IN    A        208.69.180.14
```

### Using Both an Apex Domain and a Sub-domain {/*using-both-an-apex-domain-and-a-sub-domain-eg-mywebsitexyz-and-wwwmywebsitexyz*/}

- Create the multiple `A` records with the IPs, on your apex domain (see above).
- Create a `CNAME` record for your sub-domain, with the value of your apex domain.
   <p></p>

   ```
   # To verify your DNS entries, run the following command
   dig <your-sub-domain>
   # Example
   dig www.mywebsite.xyz
   # Result
   www.mywebsite.xyz.    599    IN    CNAME.   mywebsite.xyz.
   mywebsite.xyz.        599    IN    A        208.69.180.11
   mywebsite.xyz.        599    IN    A        208.69.180.12
   mywebsite.xyz.        599    IN    A        208.69.180.13
   mywebsite.xyz.        599    IN    A        208.69.180.14
   ```

## Allowing {{ PRODUCT_NAME }} IP Addresses {/*allowing-ip-addresses*/}

Before going live, ensure that all {{ PRODUCT_NAME }} IP addresses are allowed in the security layer in front of your origin and/or API servers. The IP addresses you need to allow can be found on the _Allowlisting_ section under the _Origin Security_ tab for your property. Note that each team may have their own set of IPs so these values cannot be copied from one team to another.

![allowlisting](/images/production/allowlist.png)

## TLS/SSL {/*tlsssl*/}

All data transmitted to and from your {{ PRODUCT_NAME }} site must be secured with TLS (Transport Layer Security). TLS, also known as SSL (Secure Sockets Layer), is a cryptographic protocol to communicate securely over the Internet. TLS provides end-to-end data encryption and data integrity for all web requests.

{{ PRODUCT_NAME }} provides a wildcard TLS certificate that covers the auto-generated domains that it assigns to your site (e.g {team}-{site}-{branch}-{version}.layer0-limelight.link). You need to provide your own certificate for your site's custom domains.

<Callout type="info">

   If you already have an existing certificate, you can use it by skipping ahead to the [Uploading your Certificate section](#uploading-your-certificate). Many customers who have existing certificates still choose to obtain a new one when adopting {{ PRODUCT_NAME }} so as not to reuse the same private key with more than one vendor/system.

</Callout>

### Obtaining a Certificate Automatically {/*obtaining-a-certificate-automatically*/}

{{ PRODUCT_NAME }} can generate SSL Certificates on your behalf using [_Let's Encrypt_](https://letsencrypt.org/). Certificates are free, valid for 3 months, and automatically renewed as long as the technical requirements, shown below, remain met:

1. Make sure each environment is configured with the custom domains on which it will receive traffic. For more information on configuring custom domains, see [Custom Domains](#custom-domains) above.
2. Using your DNS provider, verify and possibly add a `CAA` record to allow _Let's Encrypt_ to generate certificates for your domains.

   - The CAA DNS entries of a domain behave like an allow list to indicate whether **any** or only **certain** Certificate Authorities are allowed to generate certificates for that domain.

   - If there are no CAA records, it means that **any** Certificate Authority is allowed to generate certificates for that domain.

   - If there are CAA records, it means that only **certain** Certificate Authorities are allowed to generate certificates for that domain.

   - So in order for _Let's Encrypt_ to be able to generate a certificate for your domains, you must either not have defined any CAA records, or _Let's Encrypt_'s CAA entry must be among those defined in the list of CAA records.

   You can verify the value of the CAA records for your domain from the command line using the command below.
   <p></p>

   ```bash
   # Run the following command
   dig caa +short <your-apex-domain>

   # Example
   dig caa +short mywebsite.xyz
   ```
   <p></p>
   <p></p>

   Example of a CAA query showing that only **certain** Certificate Authorities are allowed to generate certificates for that domain:
   <p></p>

   ```bash
   0 issue "amazon.com"
   0 issue "digicert.com"
   0 issue "globalsign.com"
   0 issue "letsencrypt.org"
   ```
   <p></p>
   <p></p>

   If the result of the CAA DNS query is empty, it means that **any** Certificate Authority is allowed to generate certificates on that domain. If so, you can directly go to the next step.

   If there are already some CAA DNS entries defined on your domain, and if _Let's Encrypt_'s CAA entry is not among those, you will have to add an additional CCA entry for _Let's Encrypt_.

   To do so, log into your DNS provider, and add a `CAA` type DNS record with the following values:

   - Type : `CAA`
   - Name : empty (or `@`, depending on the DNS provider)
   - Flags: `0`
   - Tag: `issue`
   - Value: `letsencrypt.org` (or `"letsencrypt.org"`)

   Example with GoDaddy:
   <p></p>
   <p></p>

   ![CAA Record on GoDaddy](/images/production/godaddy-caa.jpg)

   <p></p>
   <p></p>

   Example with Gandi:
   <p></p>
   <p></p>

   ![CAA Record on Gandi](/images/production/gandi-caa.jpg)

   <p></p>
   <p></p>

   You can use the following links to see how to configure the CAA record on commonly used DNS providers:

   - [How to add a CAA record on Gandi](https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html)
   - [How to add a CAA record on Godaddy](https://uk.godaddy.com/help/add-a-caa-record-27288)
   - [How to add a CAA record on AWS](https://docs.aws.amazon.com/acm/latest/userguide/setup-caa.html)
   - [How to add a CAA record on NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9991/38/caa-record-and-why-it-is-needed-ssl-related/)

   <p></p>
   <p></p>

   Once the DNS entry has been added, you can verify the CAA record using one of the following:

   - [CAA Test](https://caatest.co.uk/)
   - [Entrust CAA Lookup](https://www.entrust.com/resources/certificate-solutions/tools/caa-lookup)
   <p></p>
   <p></p>

   <Callout type="info">

      Many DNS providers have already added this `CAA` DNS record by default while some DNS providers do not allow the creation of `CAA` DNS records and therefore allow any Certificate Authority to generate certificates.

      You can learn more about CAA DNS records on <a href="https://letsencrypt.org/docs/caa">Let's Encrypt website</a>, on <a href="https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization">Wikipedia</a>, on <a href="https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html">Gandi</a> and on <a href="https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation">eff.org</a>

   </Callout>

3. Add an `_acme-challenge.` CNAME DNS entry to allow {{ PRODUCT_NAME }} to issue a certificate request on your behalf.

   Log into your DNS provider and add one `CNAME` type DNS entry with the value `_acme-challenge.<your-domain-here>` for each domain you use on your {{ PRODUCT }} website. For example, if your domain is `mywebsite.xyz`, the DNS entry should have a value of `_acme-challenge.mywebsite.xyz`. This record should point to `_acme-challenge.xdn-validation.com`. Repeat the operation of each domain associated with your {{ PRODUCT }} website.

   <p>Example with Godaddy:</p>
   <p></p>

   ![ACME Challenge Record on GoDady](/images/production/godaddy-acme-challenge.jpg)

   <p>Example with Gandi:</p>

   ![ACME Challenge Record on Gandi](/images/production/gandi-acme-challenge.jpg)

   <p></p>
   <p></p>

   Once the DNS entries have been added, you can use one of the following to verify that they are correctly configured:

   - [MX ToolBox DNS Lookup](https://mxtoolbox.com/DNSLookup.aspx)
   - [NsLookup DNS Lookup](https://www.nslookup.io/dns-checker/)

   You can also verify the CNAME records using the command line:

   ```bash
   # Run the following 'dig' command to verify the presence of the '_acme-challenge.' CNAME :
   dig +short cname _acme-challenge.<your-domain>

   # For example:
   dig +short cname _acme-challenge.mywebsite.xyz
   ```

   <p></p>

   Expected result for the DNS query:
   ```
   _acme-challenge.xdn-validation.com.
   ```

   <p></p>
   <p></p>

   If you use multiple domains for your website, like `mywebsite.xyz` and `www.mywebsite.xyz`, you will have to make sure that the `_acme-challenge` DNS record has been added for both domains:
   ```
   _acme-challenge.mywebsite.xyz -> _acme-challenge.xdn-validation.com.
   _acme-challenge.www.mywebsite.xyz -> _acme-challenge.xdn-validation.com.
   ```
   <p></p>
   <p></p>

   If you have been previously using _Let's Encrypt_ to generate certificates for this domain, please verify that there are no remaining TXT records named `_acme-challenge.mywebsite.xyz`.

   <p></p>
   <p></p>

   <Callout type="info">

     You can read more about the `acme-challenge.` process by visiting <a href="https://letsencrypt.org/docs/challenge-types/#dns-01-challenge">Let's Encrypt Website</a>

   </Callout>

4. Once the requirements above are met, you can generate the certificate using the [{{ PRODUCT_NAME }} Developer Console]({{ APP_URL }}):

   1. Select your site and navigate to _Settings_ > _SSL Certificate_

   2. Verify the state of your certificate (you should see that there's no certificate provided yet for your website):
   <p></p>

   ![ssl-generation-01](/images/production/ssl-generation-01.png)

   3. Click on the _Generate SSL Certificate_ button:
   <p></p>

   ![ssl-generation-02](/images/production/ssl-generation-02.png)

   4. After a couple of minutes, you should see that your website has received a valid certificate:
   <p></p>

   ![ssl-generation-03](/images/production/ssl-generation-03.png)

### Creating a Certificate Manually {/*creating-a-certificate-manually*/}

TLS certificates are issued by Certificate Authorities (CA) based on Certificate Signing Request (CSR) that they receive from you. Alongside the CSR the same process creates the certificate's private key. You only need to share your CSR with CA, not the private key which you should store securely.

The following steps describe the creation of the CSR and private key with OpenSSL. OpenSSL is an open-source toolkit for the TLS protocol. We recommend using OpenSSL because it ensures that your private key will only be stored locally on your infrastructure. Your CA may have more customized guides or an entirely customized certification process.

To create CSR and private key do the following:

1. Open your terminal window and make sure that you have OpenSSL installed:

   - On MacOS you can install it by using [`brew`](https://brew.sh/) package manager (e.g. `brew install openssl`)
   - On Windows you can install it by using [`Chocolatey`](https://chocolatey.org/) package manager (e.g. `choco install openssl`)
   - On Linux/Unix you can install it by running the built-in OS package manager (e.g. `apt-get install openssl`, `apk add openssl` and so on)

2. Go to the directory of your choice and create a configuration file `{{ PRODUCT_NAME_LOWER }}.conf` based on this template:

   ```
   [req]
   default_bits=2048
   distinguished_name = req_distinguished_name
   req_extensions = v3_req

   [req_distinguished_name]
   countryName=Country Name (2 letter code)
   countryName_default=US
   stateOrProvinceName=State or Province Name (full name)
   stateOrProvinceName_default=California
   localityName=Locality Name (e.g. city)
   localityName_default=San Francisco
   organizationName=Organization Name (e.g. company)
   organizationName_default=YourCompanyName
   commonName=Fully Qualified Domain Name (FQDN) e.g. www.your-company-name.com
   commonName_default=www.your-company-domain.com

   [ v3_req ]
   subjectAltName=@alt_names

   [alt_names] # Other domains: apex domain, wildcard domain for staging and dev, and so on
   DNS.1=*.your-main-domain.com
   DNS.2=*.your-dev-domain.com
   DNS.3=your-apex-domain.com
   # And so on
   ```

Replace the country, state/province, locality, organization name and, most importantly Common Name (CN), for the cert which must be the fully qualified domain name for your domain (e.g. for {{ PRODUCT_NAME }} that is `www.{{ DOMAIN }}`)

You will want to add all the additional domains into the `alt_names` section. There you should add your development, staging and other domains although {{ PRODUCT_NAME }} strongly encourages the use of wildcard certs.

3. Run `openssl req -out {{ PRODUCT_NAME_LOWER }}.csr -newkey rsa:2048 -nodes -keyout {{ PRODUCT_NAME_LOWER }}.key -config {{ PRODUCT_NAME_LOWER }}.conf -batch`. This should generate your CSR in `{{ PRODUCT_NAME_LOWER }}.csr` and private key in `{{ PRODUCT_NAME_LOWER }}.key`. If you want OpenSSL to ask you for each different input, remove the `-batch` option and re-run the command.
4. Verify your CSR contains the expected domains by running `openssl req -in {{ PRODUCT_NAME_LOWER }}.csr -noout -text | grep DNS`
5. Read the CSR (e.g. `cat {{ PRODUCT_NAME_LOWER }}.csr`) or copy to your clipboard (on OSX `cat {{ PRODUCT_NAME_LOWER }}.csr | pbcopy`) and send it to your CA for certification.

### Uploading Your Certificate {/*uploading-your-certificate*/}

#### Prerequisites {/*prerequisites*/}

To upload a certificate, you must have the **Admin** role on your team, and your team must be upgraded to {{ PRODUCT_NAME }} Enterprise.

{{ PRODUCT_NAME }} needs the following to correctly host your certificate:

- Certificate issued by CA
- Intermediate certificates (IC) used by CA, including CA's signing certificate
- Private key that was generated at the time of the CSR.

#### Uploading the certificate {/*uploading-the-certificate*/}

To upload your SSL certificate, do the following:

1. Navigate to the _Settings_ tab on your site:

   ![ssl](/images/production/ssl.png)

2. Scroll to *TLS Certificate*.

   ![empty-certificate](/images/production/empty-certificate.png)

3. Toggle *Automatically create an TLS certificate for my custom domains* to the _on_ position.

4. Copy the certificate, intermediate certificates, and the private key into the corresponding edit boxes.

   <Callout type="info">

      The private key is non-public data and must not be shared with parties other than {{ PRODUCT_NAME }}. {{ PRODUCT_NAME }} stores your private key securely at rest. It is never shown in the developer console and only used to provision parts of the infrastructure that are used to terminate TLS connections.

   </Callout>

5. Click *CHANGES SAVED*.

   The certificate's status becomes *Activating*:

   ![in-progress-certificate](/images/production/in-progress-certificate.png)

   After the certificate is activated, its status becomes *Active*:

   ![activated-certificate](/images/production/activated-certificate.png)

   _Note: Certificate activation should take just a few minutes. If the status does not become *Active* within an hour, please contact [support]({{ APP_URL }}/help). _
