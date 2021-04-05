# Custom Domains & SSL

This guide covers the steps you need to take your site live on {{ PRODUCT_NAME }} with a secure, custom domain.

## Region

{{ PRODUCT_NAME }} enterprise customers can choose the [region](regions) in which their serverless functions will run, as well as backup region to which traffic will be diverted in the event of an outage. Choose the regions which are closest to the datacenter which hosts your origin site or APIs.

## Domains

Before going live, you must create a production environment and configure your domains. For more information on environments, see [Environments](./environments)

To configure your custom domains:

1. Create an environment by navigating to your site and selecting _Environments_ => _New Environment_
2. Click _Edit_ to create a draft. Enter your domains here, save the changes, and activate:

![domains](/images/production/domains.png)

### Migrating from Fastly

If you're migrating to {{ PRODUCT_NAME }} from [Fastly](https://www.fastly.com/), you will need to do the following before adding your domains to your {{ PRODUCT_NAME }} environment:

- [Contact Fastly support](https://support.fastly.com/hc/en-us/requests/new?ticket_form_id=360000269711) and request that control of your domains be transferred to {{ PRODUCT_NAME }}. Be sure to explicitly list each domain that needs to transferred and ask Fastly to contact support(at){{ DOMAIN }} if they need {{ PRODUCT_NAME }} to confirm the transfer.
- Before going live with {{ PRODUCT_NAME }}, you will need to ensure that you've removed your domains from all active Fastly services. To remove domains from a service, clone the service, remove the domains, then activate the new version of the service. Once the new service version is activated you can add the domains to your {{ PRODUCT_NAME }} environment and activate it.

## Network configuration

You can find the DNS and whitelisting IP configurations in the "Networking" tab for your environment.

![networking](/images/production/networking.png)

### DNS

In order to configure your DNS provider to direct traffic for a particular set of domains to {{ PRODUCT_NAME }}, you must create DNS records with values depending on the type of domain you are using for your website. If you are launching a new site then you can set this up whenever you feel ready. For sites that are already live, the DNS update is the last step. Once you have updated your DNS you are committed to launching.

#### Using a sub-domain (i.e. www.mywebsite.xyz):

To host your site on a subdomain, add a `CNAME` record with the value shown under _DNS Configuration_ (see above).

```
; <<>> DiG 9.10.6 <<>> www.mywebsite.xyz
;; ANSWER SECTION:
www.mywebsite.xyz.   599    IN    CNAME    d12ea738-71b3-25e8-c771-6fdd3f6bd8ba.moovweb-edge.io.
```

#### Using an apex domain (i.e. mywebsite.xyz):

To host your site on the apex domain, create multiple `A` records on your apex domain, with the following Anycast IP Addresses values: 151.101.1.79, 151.101.65.79, 151.101.129.79, 151.101.193.79.

```
; <<>> DiG 9.10.6 <<>> mywebsite.xyz
;; ANSWER SECTION:
mywebsite.xyz.        599    IN    A        151.101.1.79
mywebsite.xyz.        599    IN    A        151.101.65.79
mywebsite.xyz.        599    IN    A        151.101.129.79
mywebsite.xyz.        599    IN    A        151.101.193.79
```

#### Using both an apex domain and a sub-domain (i.e. mywebsite.xyz and www.mywebsite.xyz):

- Create the multiple `A` records with the IPs, on your apex domain (see above).
- Create a `CNAME` record for your sub-domain, with the value of your apex domain.

  ```
  ; <<>> DiG 9.10.6 <<>> www.mywebsite.xyz
  ;; ANSWER SECTION:
  www.mywebsite.xyz.    599    IN    CNAME.   mywebsite.xyz.
  mywebsite.xyz.        599    IN    A        151.101.1.79
  mywebsite.xyz.        599    IN    A        151.101.65.79
  mywebsite.xyz.        599    IN    A        151.101.129.79
  mywebsite.xyz.        599    IN    A        151.101.193.79
  ```

### Whitelisting {{ PRODUCT_NAME }} IP Addresses

Before going live, ensure that all {{ PRODUCT_NAME }} IP addresses are whitelisted in the security layer in front of your origin and/or API servers. The IP addresses you need to whitelist can be found on the "IP Whitelist" section of the "Networking" tab. Note that your IP addresses may differ from the ones show above.

## TLS/SSL

All data transmitted to and from your {{ PRODUCT_NAME }} site must be secured with TLS (Transport Layer Security). TLS, also known as SSL (Secure Sockets Layer), is a cryptographic protocol to communicate securely over the Internet. TLS provides end-to-end data encryption and data integrity for all web requests.

{{ PRODUCT_NAME }} provides a wildcard TLS certificate that covers the auto-generated domains that it assigns to your site (e.g {team}-{site}-{branch}-{version}.moovweb.io). You need to provide your own certificate for your site's custom domains.

_Note: If you already have an existing certificate, you can use it by skipping ahead to [Uploading your certificate](#section_uploading_your_certificate). Many customers who have existing certificates still choose to obtain a new one when adopting {{ PRODUCT_NAME }} so as not to reuse the same private key with more than one vendor/system._

### Obtaining a certificate automatically

{{ PRODUCT_NAME }} can generate SSL Certificates on your behalf using [**Let's Encrypt**](https://letsencrypt.org/). Certificates are free, valid for 3 months, and automatically renewed as long as the technical requirements, shown below, remain met:

1. Make sure each environment is configured with the custom domains on which it will receive traffic. For more information on configuring custom domains, see [Domains](#section_domains) above.

2. Using your DNS provider, add a `CAA` record to allow Let's Encrypt to generate certificates for your domains.

   Log into your DNS provider, and add a `CAA` type DNS record with the following values:

   - Type : `CAA`
   - Name : empty (or `@`, depending on the DNS provider)
   - Flags: `0`
   - Tag: `issue`
   - Value: `letsencrypt.org` (or `"letsencrypt.org"`)

   Example with GoDaddy:

   ![CAA Record on GoDaddy](/images/production/godaddy-caa.jpg)

   Example with Gandi:

   ![CAA Record on Gandi](/images/production/gandi-caa.jpg)

   You can use the following links to see how to configure the CAA record on commonly used DNS providers:

   - [How to add a CAA record on Gandi](https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html)
   - [How to add a CAA record on Godaddy](https://uk.godaddy.com/help/add-a-caa-record-27288)
   - [How to add a CAA record on AWS](https://docs.aws.amazon.com/acm/latest/userguide/setup-caa.html)
   - [How to add a CAA record on NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9991/38/caa-record-and-why-it-is-needed-ssl-related/)

   Once the DNS entry has been added, you can verify the CAA record using one of the following:

   - [CAA Test](https://caatest.co.uk/)
   - [Entrust CAA Lookup](https://www.entrust.com/resources/certificate-solutions/tools/caa-lookup)

   You can also verify the CAA record from the command line:

   ```
   # Run the following command
   dig caa +short <your-primary-domain> # (without the 'www')

   # Example
   dig caa +short mywebsite.xyz
   ```

   The result of your CAA check should contain the following line:

   ```
   0 issue "letsencrypt.org"
   ```

   Notes:

   - Many DNS providers have already added this `CAA` DNS record by default
   - Some DNS providers does not allow the creation of `CAA` DNS records
   - You can learn more about CAA DNS records on [Let's Encrypt website](https://letsencrypt.org/docs/caa/), on [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization), on [Gandi](https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html) and on [eff.org](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation)

3. Add an `_acme-challenge.` CNAME DNS entry to allow {{ PRODUCT_NAME }} to issue a certificate request on your behalf.

   Log into your DNS provider and add one `CNAME` type DNS entry with the value `_acme-challenge.<your-domain-here>` for each custom domain. For example, if your custom domain is `mysite.com`, the DNS entry should have a value of `_acme-challenge.mysite.com`. Each record should point to `_acme-challenge.{{ PRODUCT_NAME_LOWER }}-validation.com`.

   Example with Godaddy:

   ![ACME Challenge Record on GoDady](/images/production/godaddy-acme-challenge.jpg)

   Example with Gandi:

   ![ACME Challenge Record on Gandi](/images/production/gandi-acme-challenge.jpg)

   Once the DNS entries have been added, you can use one of the following to verify that they are correctly configured:

   - [MX ToolBox DNS Lookup](https://mxtoolbox.com/DNSLookup.aspx)
   - [Ultra Tools DNS Lookup](https://www.ultratools.com/tools/dnsLookup)

   You can also verify the CNAME records using the command line:

   ```
   # Run the following 'dig' command to verify the presence of the '_acme-challenge.' CNAME :
   dig +short cname _acme-challenge.<your-domain>

   # For example:
   dig +short cname _acme-challenge.mywebsite.xyz
   ```

   Expected result for the DNS query:

   ```
   _acme-challenge.{{ PRODUCT_NAME_LOWER }}-validation.com
   ```

   If you use multiple domains for your website, like `mywebsite.xyz` and `www.mywebsite.xyz`, then you will have to add the `_acme-challenge` DNS record for both domains:

   ```
   _acme-challenge.mywebsite.xyz -> _acme-challenge.{{ PRODUCT_NAME_LOWER }}-validation.com
   _acme-challenge.www.mywebsite.xyz -> _acme-challenge.{{ PRODUCT_NAME_LOWER }}-validation.com
   ```

   If you have been previously using Let's Encrypt to generate certificates for this domain, please verify that there are no remaining TXT records named `_acme-challenge.mywebsite.xyz`.

   Notes:

   - You can read more about the `_acme-challenge.` process by visiting [Let's Encrypt Website](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge)

4. Once the requirements above are met, you can generate the certificate using the [{{ PRODUCT_NAME }} Developer Console]({{ APP_URL }}):

   1. Select your site and navigate to _Settings_ => _SSL Certificate_

   2. Verify the state of your certificate (you should see that there's no certificate provided yet for your website):

   ![ssl-generation-01](/images/production/ssl-generation-01.png)

   3. Click on the _Generate SSL Certificate_ button:

   ![ssl-generation-02](/images/production/ssl-generation-02.png)

   4. After a couple of minutes, you should see that your website has received a valid certificate:

   ![ssl-generation-03](/images/production/ssl-generation-03.png)

### Creating a certificate manually

TLS certificates are issued by Certificate Authorities (CA) based on Certificate Signing Request (CSR) that they receive from you. Alongside the CSR the same process creates certificate's private key. You only need to share your CSR with CA, not the private key which you should store securely.

The following steps describe the creation of the CSR and private key with OpenSSL. OpenSSL is an open-source toolkit for the TLS protocol. We recommend using OpenSSL because it ensures that your private key will only be stored locally on your infrastructure. Your CA may to have more customized guides or entirely customized certification process.

To create CSR and private key do the following:

1. Open your terminal window and make sure that you have OpenSSL installed:

- On MacOS you can install it by using [`brew`](https://brew.sh/) package manager (e.g. `brew install openssl`)
- On Windows you can install it by using [`Chocolatey`](https://chocolatey.org/) package manager (e.g. `choco install openssl`)
- On Linux/Unix you can install it by running the built-in OS package manager (e.g. `apt-get install openssl`, `apk add openssl` and so on)

2. Go to the directory of your choice and create a configuration file `layer0.conf` based on this template:

```properties
[req]
default_bits=2048
distinguished_name = req_distinguished_name

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

[req_extensions]
subjectAltName=@alt_names

[alt_names] # Other domains: apex domain, wildcard domain for staging and dev, and so on
DNS.1=*.your-main-domain.com
DNS.2=*.your-dev-domain.com
DNS.3=your-apex-domain.com
# And so on
```

Replace the country, state/province, locality, organization name and, most importantly Common Name (CN), for the cert which must be the fully qualified domain name for your domain (e.g. for {{ PRODUCT_NAME }} that is `www.{{ DOMAIN }}`)

You will want to add all the additional domains into the `alt_names` section. There you should add your development, staging and other domains although {{ PRODUCT_NAME }} strongly encourages the use of wildcard certs.

3. Run `openssl req -out {{ PRODUCT_NAME_LOWER }}.csr -newkey rsa:2048 -nodes -keyout {{ PRODUCT_NAME_LOWER }}.key -config {{ PRODUCT_NAME_LOWER }}.conf -batch`. This should generate your CSR in `{{ PRODUCT_NAME_LOWER }}.csr` and private key in `{{ PRODUCT_NAME_LOWER }}.key`. If you want OpenSSL to ask you for each different input, remove `-batch` option and re-run the command.
4. Read the CSR (e.g. `cat {{ PRODUCT_NAME_LOWER }}.csr`) and send it to your CA for certification.

### Uploading your certificate

To upload your SSL certificate, navigate to the **Settings** tab on your site and

![ssl](/images/production/ssl.png)

Then, scroll down to **SSL Certificate**. _Note that you need to be in the **Admin** role on your team and your team needs to be upgraded to {{ PRODUCT_NAME }} Enterprise to see this section:_

![empty-certificate](/images/production/empty-certificate.png)

{{ PRODUCT_NAME }} needs three things to correctly host your certificate:

- Certificate issued by CA
- Intermediate certificates (IC) used by CA including CA's signing certificate
- Private key that was generated at the same time with CSR

The private key part is non-public data and must not be shared with parties other than {{ PRODUCT_NAME }}. {{ PRODUCT_NAME }} stores your private key securely at rest. It is never shown in the developer console and only used to provision parts of the infrastructure that are used to terminate TLS connections.

You need to copy the certificate, intermediate certificates and the private key into the corresponding edit boxes and, once done, click on "Save Changes" button. This will change the status of your certificate to "Activation in Progress".

![in-progress-certificate](/images/production/in-progress-certificate.png)

Note that the certificate activation should take a few minutes. If you don't see the following within the hour, please contact [support]({{ APP_URL }}/help). Once activated, you should see the following:

![activated-certificate](/images/production/activated-certificate.png)
