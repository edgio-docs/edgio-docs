---
title: TLS Certificates
---

{{ PRODUCT }} requires a TLS certificate hosted on our network to serve HTTPS traffic for:

-   **Your Hostnames:** You may either:

    -   Allow {{ PRODUCT }} to [autogenerate a TLS certificate for each of your hostnames.](#autogenerating-tls-certificates)
    -   [Upload your own TLS certificate.](#uploading-your-certificate)

-   **{{ PRODUCT }} Domains:** {{ PRODUCT }} provides a wildcard TLS certificate for the domains that we automatically generate when you deploy to your property. This certificate is managed by {{ PRODUCT }} and it does not require configuration.

    **Sample domain:** `my-team-my-site-feature-a-1234.layer0-limelight.link`

### Autogenerating TLS Certificates {/*autogenerating-tls-certificates*/}

{{ PRODUCT_NAME }} can automatically generate TLS Certificates on your behalf using [Let's Encrypt](https://letsencrypt.org/). These certificates are free, valid for 3 months, and automatically renewed as long as the following technical requirements remain met:

-   [Hostnames:](/guides/basics/hostnames_and_origins#hostnames) Register the hostnames that will serve traffic for each environment.
-   [Certificate Authority Authorization:](#certificate-authority-authorization) The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for each registered hostname. 
-   [Domain Control Validation:](#domain-control-validation) Prove your control over that domain by adding an `_acme-challenge` CNAME record to it.

#### Certificate Authority Authorization

The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for each registered hostname. It is allowed to issue certificates when either of the following conditions are true:

-   A CAA record has not been issued for that hostname or a parent hostname (i.e., the main domain or at any depth of subdomain). This DNS configuration means that any CA is allowed to generate certificates for that hostname.

    <Callout type="info">

      CAA validation follows CNAME records. For example, if your `www.example.com` CNAME record points to `www-origin.example.com`, then the CA will first request CAA records for `www.example.com`. Upon detecting a CNAME record, it will request CAA records for `www-origin.example.com` instead. 

    </Callout>

-   A CAA record explicitly allows the Let's Encrypt CA to generate certificates for that hostname. 

    This sample CAA record indicates that the Let's Encrypt CA is allowed to issue certificates for `cdn.example.com`:

    `cdn.example.com.   CAA 0 issue "letsencrypt.org"`

**To add a CAA record to allow Let's Encrypt to generate certificates for your domains**

1.  Verify the value of the CAA records for your domain from the command line.

    ```bash
    # Run the following command
    dig caa +short <your-apex-domain>

    # Example
    dig caa +short mywebsite.xyz
    ```

    The following sample response for a CAA query shows that only specific CAs are allowed to generate certificates for that domain:

    ```bash
    0 issue "amazon.com"
    0 issue "digicert.com"
    0 issue "globalsign.com"
    0 issue "letsencrypt.org"
    ```

    If the result of the CAA DNS query is empty, it means that any CA is allowed to generate certificates on that domain. If so, proceed to [domain control validation](#domain-control-validation).

2.  If there are `CAA` DNS entries defined on your hostname or parent hostname, and if the Let's Encrypt's CAA entry is not among those, you will have to add an additional `CAA` entry for Let's Encrypt.

    From your DNS service provider, add the following `CAA` DNS record: 

    -   **Type:** `CAA`
    -   **Name:** empty or `@` (depending on the DNS provider)
    -   **Flags:** `0`
    -   **Tag:** `issue`
    -   **Value:** `letsencrypt.org` or `"letsencrypt.org"`

    **GoDaddy Example:**
   
    ![CAA Record on GoDaddy](/images/production/godaddy-caa.jpg)

    **Gandi Example:**

    ![CAA Record on Gandi](/images/production/gandi-caa.jpg)

    Learn more on:

    - [How to add a CAA record on Gandi](https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html)
    - [How to add a CAA record on Godaddy](https://uk.godaddy.com/help/add-a-caa-record-27288)
    - [How to add a CAA record on AWS](https://docs.aws.amazon.com/acm/latest/userguide/setup-caa.html)
    - [How to add a CAA record on NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9991/38/caa-record-and-why-it-is-needed-ssl-related/)

    Verify your CAA configuration. We recommend the following CAA lookup tools: 

    -   [CAA Test](https://caatest.co.uk/)
    -   [Entrust CAA Lookup](https://www.entrust.com/resources/certificate-solutions/tools/caa-lookup)

    <Callout type="info">

      By default, some DNS service providers add `CAA` DNS record(s), while others do not allow the creation of `CAA` DNS records and therefore allow any CA to generate certificates.

      Learn more about CAA DNS records: <a href="https://letsencrypt.org/docs/caa">Let's Encrypt</a>, <a href="https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization">Wikipedia</a>, <a href="https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html">Gandi</a>, and <a href="https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation">eff.org</a>

    </Callout>

#### Domain Control Validation

Before {{ PRODUCT }} may issue a certificate request on your behalf, we require that you validate your control over each of your hostnames by adding a CNAME record.  From your DNS service provider, add the following CNAME DNS entry for each desired hostname:

-   **Host:** `_acme-challenge.<HOSTNAME>`

    **Example:** 

    If your hostname is `cdn.example.com`, then you would set it to `_acme-challenge.cdn.example.com`.

-   **Value:** `_acme-challenge.xdn-validation.com`

**GoDaddy Example:**

![ACME Challenge Record on GoDady](/images/production/godaddy-acme-challenge.jpg)

**Gandi Example:**

![ACME Challenge Record on Gandi](/images/production/gandi-acme-challenge.jpg)

Verify each CNAME record using your preferred tool. For example, you can use any of the following tools:

-   [MX ToolBox DNS Lookup](https://mxtoolbox.com/DNSLookup.aspx)
-   [NsLookup DNS Lookup](https://www.nslookup.io/dns-checker/)
-   **Command line:** Run the following command:

    ```bash
    # Run the following 'dig' command to verify the presence of the '_acme-challenge.' CNAME :
    dig +short cname _acme-challenge.<your-domain>
 
    # For example:
    dig +short cname _acme-challenge.mywebsite.xyz
    ```

    Expected result for the DNS query:

    ```
    _acme-challenge.xdn-validation.com.
    ```

If you use multiple domains for your website, like `mywebsite.xyz` and `www.mywebsite.xyz`, you will have to make sure that the `_acme-challenge` DNS record has been added for both domains:

```
_acme-challenge.mywebsite.xyz -> _acme-challenge.xdn-validation.com.
_acme-challenge.www.mywebsite.xyz -> _acme-challenge.xdn-validation.com.
```

If you have previously used Let's Encrypt to generate certificates for your hostnames, you should verify that all `_acme-challenge.<HOSTNAME>` TXT records have been removed.

[Learn more about DNS TXT domain control.](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge)

#### TLS Certificate Verification

Once the above requirements are met, you should verify that a TLS certificate for each of your hostnames has been generated.

**To verify TLS certificate creation**

1.  From the {{ PORTAL_LINK }}, click **Settings** to load the **Settings** page. Find the **TLS Certificate** section.
2.  Review the TLS status for each of your hostnames.

    ![TLS Certificate section](/images/v7/security/tls-certificate.png)

3.  If a TLS certificate has not yet been generated, you may manually generate it by clicking <Image inline src="/images/v7/icons/recheck-validation.png" alt="Recheck Validation icon" /> under the **ACME Challenge Record** column.

    {{ PRODUCT }} will generate a TLS certificate for that hostname within a few minutes.

4.  Wait a few minutes and then verify that a certificate was created for that hostname.

### Manually Creating a TLS Certificate {/*creating-a-certificate-manually*/}

<Callout type="info">

   Skip this section if you plan on using autogenerated TLS certificate or if you already have an existing TLS certificate that you plan to [upload](#uploading-your-certificate). 

</Callout>

TLS certificates are issued by Certificate Authorities (CA) based on your Certificate Signing Request (CSR). Although a single command generates a CSR and a private key, you should only share your CSR with the CA. You should also securely store your private key.

The following procedure indicates how to create a CSR and a private key with OpenSSL. OpenSSL is an open-source toolkit for the TLS protocol. We recommend using OpenSSL because it ensures that your private key will only be stored locally on your infrastructure. 

<Callout type="info">

  Review your CA's documentation to check for additonal requirements or a custom certification workflow.

</Callout>

**To generate a CSR and a private key**

1.  From the command line, verify that OpenSSL is installed:
    -   **MacOS:** Install it by using [`brew`](https://brew.sh/) package manager (e.g., `brew install openssl`).
    -   **Windows:** Install it by using [`Chocolatey`](https://chocolatey.org/) package manager (e.g., `choco install openssl`).
    -   **Linux/Unix:** Install it by running the built-in OS package manager (e.g., `apt-get install openssl`, `apk add openssl`, and so on).

2. Go to the directory of your choice and create a configuration file (e.g., `{{ PRODUCT_NAME_LOWER }}_cert.conf`) based on this template:

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
    localityName=Locality Name (e.g., city)
    localityName_default=San Francisco
    organizationName=Organization Name (e.g., company)
    organizationName_default=YourCompanyName
    commonName=Fully Qualified Domain Name (FQDN) e.g., www.your-company-name.com
    commonName_default=www.your-company-domain.com

    [v3_req]
    subjectAltName=@alt_names

    [alt_names] # Other domains: apex domain, wildcard domain for staging and dev, and so on
    DNS.1=*.your-main-domain.com
    DNS.2=*.your-dev-domain.com
    DNS.3=your-apex-domain.com
    # And so on
    ```

    Replace the country, state/province, locality, organization name, and Common Name (CN). Set the CN to your hostname's fully qualified domain name (e.g., `cdn.example.com`).

    {{ PRODUCT }} strongly encourages the use of wildcard certificates. However, if you are not using a wildcard certificate, then you will need to add the remaining hostnames into the `alt_names` section.

3.  Run the following command:

    ```bash
    openssl req -out {{ PRODUCT_NAME_LOWER }}.csr -newkey rsa:2048 -nodes -keyout {{ PRODUCT_NAME_LOWER }}.key -config {{ PRODUCT_NAME_LOWER }}_cert.conf -batch
    ```

    This should generate your CSR in `{{ PRODUCT_NAME_LOWER }}.csr` and private key in `{{ PRODUCT_NAME_LOWER }}.key`. 

    <Callout type="info">

      If you want OpenSSL to ask you for each different input, remove the `-batch` option and re-run the command.

    </Callout>

4.  Verify your CSR contains the expected domains by running the following command:

    ```bash
    openssl req -in {{ PRODUCT_NAME_LOWER }}.csr -noout -text | grep DNS
    ```

5.  Read the CSR (e.g., `cat {{ PRODUCT_NAME_LOWER }}.csr`) or copy it to your clipboard (on OSX, `cat {{ PRODUCT_NAME_LOWER }}.csr | pbcopy`) and send it to your CA for certification.

### Uploading Your Certificate {/*uploading-your-certificate*/}

Uploading a TLS certificate requires:

-   An Enterprise account.  {{ ACCOUNT_UPGRADE }}
-   The `Admin` role within your team.
-   A certificate issued by a CA.
-   The intermediate certificates (IC) used by the CA, including the CA's signing certificate.
-   The private key that was generated with the CSR.

**To upload your TLS certificate**

1.  From the {{ PORTAL_LINK }}, click **Settings** to load the **Settings** page. Find the **TLS Certificate** section.
2.  Clear the **Automatically create an TLS certificate for my custom domains.** option.
3.  Copy the certificate, intermediate certificates, and the private key into the corresponding options.

    <Callout type="info">

      The private key is non-public data and must not be shared with parties other than {{ PRODUCT_NAME }}. {{ PRODUCT_NAME }} securely stores your private key. It is never shown in the {{ PORTAL }} and it is only used to provision parts of the infrastructure that are used to terminate TLS connections.

    </Callout>

5.  Click **Changes Saved**.

    After which, the status of the TLS certificate will update to *Activating*.

    ![in-progress-certificate](/images/production/in-progress-certificate.png)

    After the certificate is activated, its status becomes **Active**.

    ![activated-certificate](/images/production/activated-certificate.png)

    <Callout type="info">

      Certificate activation should take a few minutes. Contact technical customer support if the status does not become *Active* within an hour.

    </Callout>
