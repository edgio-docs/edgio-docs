---
title: TLS Certificates
---

{{ PRODUCT }} requires a TLS certificate hosted on our network to serve HTTPS traffic for:

-   **Your Hostnames:** You may either:

    -   Allow {{ PRODUCT }} to [autogenerate a TLS certificate for each of your hostnames.](#autogenerating-tls-certificates)
    -   [Upload your own TLS certificate.](#uploading-your-certificate)

        You may use a wildcard certificate across multiple environments once it has been uploaded to one of your environments. [Learn more.](#wildcard-certificates)

    <Callout type="info">

      It may take up to 6 hours to install a new TLS certificate across our entire network.

    </Callout>

-   **{{ PRODUCT }} Domains:** {{ PRODUCT }} provides a wildcard TLS certificate for the domains that we automatically generate when you deploy to your property. This certificate is managed by {{ PRODUCT }} and it does not require configuration.

    **Sample domain:** `my-organization-my-property-feature-a-1234.{{ LINK_DOMAIN }}`

<Callout type="tip">

  Apply additional security to your encrypted traffic by [enabling mTLS](#mtls).

</Callout>

## Autogenerating TLS Certificates {/*autogenerating-tls-certificates*/}

{{ PRODUCT_NAME }} can automatically generate TLS Certificates on your behalf using [Let's Encrypt](https://letsencrypt.org/). These certificates are free, valid for 3 months, and automatically renewed as long as the following technical requirements remain met:

-   [Hostnames:](/applications/basics/hostnames) Register the hostnames that will serve traffic for each environment.
-   [Certificate Authority Authorization:](#certificate-authority-authorization) The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for each registered hostname.
-   [Domain Control Validation:](#domain-control-validation) Prove your control over that domain by adding an `_acme-challenge` CNAME record to it.
-   **Web Server(s):** Enable or verify that your web servers support TLS 1.3 (recommended) or 1.2 encryption.

### Certificate Authority Authorization {/*certificate-authority-authorization*/}

The Let's Encrypt certificate authority (CA) must be allowed to issue certificates for each registered hostname. It is allowed to issue certificates when either of the following conditions are true:

-   A CAA record has not been issued for that hostname or a parent hostname (i.e., the main domain or at any depth of subdomain). This DNS configuration means that any CA is allowed to generate certificates for that hostname.

    <Callout type="info">

      CAA validation follows CNAME records. For example, if your `www.example.com` CNAME record points to `www-origin.example.com`, then the CA will first request CAA records for `www.example.com`. Upon detecting a CNAME record, it will request CAA records for `www-origin.example.com` instead.

    </Callout>

-   A CAA record explicitly allows the Let's Encrypt CA to generate certificates for that hostname.

    This sample CAA record indicates that the Let's Encrypt CA is allowed to issue certificates for `cdn.example.com`:

    `cdn.example.com.   CAA 0 issue "letsencrypt.org"`
-   By default, some DNS service providers add `CAA` DNS record(s), while others do not allow the creation of `CAA` DNS records and therefore allow any CA to generate certificates.

    Learn more about CAA DNS records: <a href="https://letsencrypt.org/docs/caa">Let's Encrypt</a>, <a href="https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization">Wikipedia</a>, <a href="https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html">Gandi</a>, and <a href="https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation">eff.org</a>

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
    -   **Value:** `letsencrypt.org` or `"letsencrypt.org"` <!--
    **GoDaddy Example:**

    ![CAA Record on GoDaddy](/images/production/godaddy-caa.jpg)

    **Gandi Example:**

    ![CAA Record on Gandi](/images/production/gandi-caa.jpg)-->

    Learn how to add a CAA record:

    -   [Gandi](https://docs.gandi.net/en/domain_names/faq/record_types/caa_record.html)
    -   [Godaddy](https://uk.godaddy.com/help/add-a-caa-record-27288)
    -   [NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9991/38/caa-record-and-why-it-is-needed-ssl-related/)

    Verify your CAA configuration. We recommend the following CAA lookup tools:

    -   [CAA Test](https://caatest.co.uk/)
    -   [Entrust CAA Lookup](https://www.entrust.com/resources/certificate-solutions/tools/caa-lookup)

### Domain Control Validation {/*domain-control-validation*/}

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

### TLS Certificate Verification {/*tls-certificate-verification*/}

Once the above requirements are met, you should verify that a TLS certificate for each of your hostnames has been generated.

**To verify TLS certificate creation**

1.  Load the **TLS Certificate** page.

    {{ ENV_NAV }} **TLS Certificate**.

2.  Review the TLS status for each of your hostnames.

    ![TLS Certificate section](/images/v7/security/tls-certificate.png)

3.  If a TLS certificate has not yet been generated, you may manually generate it by clicking <Image inline src="/images/v7/icons/recheck-validation.png" alt="Recheck Validation icon" /> under the **ACME Challenge Record** column.

    {{ PRODUCT }} will generate a TLS certificate for that hostname within a few minutes.

    <Callout type="info">

      It may take up to 6 hours to install a new TLS certificate across our entire network.

    </Callout>

4.  Wait a few minutes and then verify that a certificate was created for that hostname.

## Manually Creating a TLS Certificate {/*creating-a-certificate-manually*/}

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

## Uploading Your Certificate {/*uploading-your-certificate*/}

If you prefer to use your own TLS certificate, then you may upload it to our network. 

**Key information:**

-   <a id="wildcard-certificates" />You may upload a TLS wildcard certificate, which allows you to secure multiple hosts with the same base domain (e.g., `*.example.com` allows you to secure `www.example.com`, `images.example.com`, `cdn.example.com`, etc.). By default, you only need to upload a wildcard certificate a single time. After which, it will be available for use across all of your organization's properties and environments. 

    If you have requested the use of our PCI-compliant network, then the wildcard certificate will only be applicable for environments that use the same network as the environment on which it was uploaded. You can check whether your environments use the same network from the **Organization DNS Configuration** section of your organization's **Settings** page. 

-   Uploading a TLS certificate requires:

    -   The `Admin` role within your organization.
    -   A certificate issued by a CA.
    -   The intermediate certificates (IC) used by the CA, including the CA's signing certificate.
    -   The private key that was generated with the CSR.

-   {{ PRODUCT }} does not automatically renew TLS certificates that have been manually uploaded to our network. As a result, you will need to upload a new TLS certificate before your current TLS certificate expires. Failure to do so before the expiration of your TLS certificate will impact your client's experience. For example, a browser may display a page warning users that their connection is not private. 

**To upload your TLS certificate**

1.  Load the **TLS Certificate** page.

    {{ ENV_NAV }} **TLS Certificate**.

2.  Clear the **Automatically create an TLS certificate for my custom domains.** option.
3.  Copy the certificate, intermediate certificates, and the private key into the corresponding options.

    <Callout type="info">

      The private key is non-public data and must not be shared with parties other than {{ PRODUCT_NAME }}. {{ PRODUCT_NAME }} securely stores your private key. It is never shown in the {{ PORTAL }} and it is only used to provision parts of the infrastructure that are used to terminate TLS connections.

    </Callout>

5.  Click **Changes Saved**. Certificate activation typically takes a few minutes.

    <Callout type="info">

      Contact technical customer support if the status does not become *Active* within an hour.

    </Callout>



## mTLS {/*mtls*/}

<Callout type="info">

  The Mutual TLS feature requires {{ PRODUCT }} Premier. {{ ACCOUNT_UPGRADE }}

</Callout>

TLS requires a server to authenticate to the client before a connection can be established. Mutual TLS (mTLS) builds upon TLS by also requiring the client to provide a X.509 certificate to the server for the purpose of authentication. The following diagram provides a high-level overview of how a client can establish a secure connection to an edge server through mTLS.

![mTLS Handshake](/images/v7/security/mtls.png?height=650)

Our mTLS implementation provides flexibility when determining when and how a client will authenticate to an edge server.
-   By default, mTLS is disabled. Enable it by [defining how certificates will be validated](#mtls-validation).
-   Once mTLS has been enabled, the default behavior is to request a client certificate for all requests. However, you may instruct {{ PRODUCT }} to only request a client certificate for specific hostname(s) through the **Request Client Certificates for Hostnames** option. Regardless of this option, the **Client Certificate Validation** option determines [how a client certificate will be validated](#mtls-validation) for all requests.
-   Send [headers to your origin](#origin-request-headers) containing mTLS metadata by enabling the **Send Client Certificate Detail to Origin** option.
-   The TLS handshake fails when {{ PRODUCT }} cannot validate a client certificate.

    Permissive mode is an exception to this behavior. By default, Permissive mode allows traffic regardless of whether client certificate validation fails. However, you may override this behavior for Permissive mode and return a `403 Forbidden` response by enabling the **Return Status Code 403 for Validation Failures** option.

### mTLS Validation {/*mtls-validation*/}

Determine whether and how {{ PRODUCT }} will validate certificates through the **Client Certificate Validation** option. The available validation modes are described below.

    -   **Required:** Set this option to `Required` to require the client to provide a certificate issued by a certificate authority (CA) within your custom chain of trust.
    -   **Optional:** If you choose to make client certificates optional, then you must define how {{ PRODUCT }} will validate a certificate when provided by a client. Set this option to one of the following modes:
        -   **Permissive:** Recommended. By default, this mode instructs {{ PRODUCT }} to allow traffic regardless of whether the client provides a valid certificate. If provided, {{ PRODUCT }} will still process the client certificate. You may choose to send this metadata to the origin server.

            <Callout type="tip">

              Permissive is the recommended validation mode for your initial setup, since it allows you to verify your configuration through mTLS metadata sent to the origin. Once you have verified your configuration, you may block unverified traffic by enabling the **Return Status Code 403 for Validation Failures** option.

            </Callout>

        -   **Optional without CA validation:** If the client provides a certificate, it must be a valid X.509 certificate that is either self-signed or signed by a CA.
        -   **Optional:** If the client provides a certificate, it must be issued by a CA within your custom chain of trust.
    -   **Disabled:** Disables mTLS.

### mTLS Depth of Validation {/*mtls-depth-of-validation*/}

If you have configured the **Client Certificate Validation** option to either `Required`, `Optional`, or `Permissive`, then the **Chain of Trust Depth Validation** option determines the maximum depth for certificate validation.
-   **0:** Restricts validation to self-signed certificates.
-   **1:** Restricts validation to self-signed certificates or a certificate signed by a CA in the chain of trust defined under the **Certificate Chains** section.
-   **2 or more:** Allows levels 0 (i.e., self-signed certificates) through the specified number. The specified number determines the maximum depth to which {{ PRODUCT }} will validate a client certificate. For example, setting it to 2 allows a client certificate that satisfies level 0, 1, or 2.

    {{ PRODUCT }} will validate up to the specified number of CA certificates.

    -   If the client certificate is backed by fewer CA certificates, then {{ PRODUCT }} will validate all of those CA certificates.
    -   If the client certificate is backed by additional CA certificates, then {{ PRODUCT }} will ignore the CA certificates that exceed the specified depth.

    **Example:** If you set the depth to 2, then {{ PRODUCT }} will validate self-signed certificates or it will check up to 2 CA certificates that back the client certificate. {{ PRODUCT }} can validate a client certificate for all three of the following scenarios:

    | Intermediate Certificate(s) | Root Certificate(s) | Total CA Certificate(s) | Valid Client Certificate |
    | --------------------------- | ------------------- | ----------------------- | ------------------------ |
    | 0                           | 0                   | 0                       | Yes                      |
    | 1                           | 1                   | 2                       | Yes                      |
    | 3                           | 1                   | 4                       | Yes                      |

    Notice that the last scenario exceeds the specified depth by 2. In that scenario, {{ PRODUCT }} will validate the client certificate and check the first 2 intermediate CA certificates. If those certificates are valid, then it will consider the client certificate valid and ignore the third intermediate CA certificate and the root certificate.

### Chain of Trust {/*chain-of-trust*/}

Set up a chain of trust by uploading a PEM file that contains an ordered list of intermediate and root certificates for the desired hostname. Use a line break to separate each certificate as shown below.

```pem
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
```

<Callout type="important">

  Prior to the expiration of the certificates in your chain of trust, you must upload a PEM file that contains renewed certificates.

</Callout>

If a PEM file should no longer be used (e.g., it contains expired certificates), then you should delete it from the **Certificate Chains** section.

### mTLS Setup {/*mtls-setup*/}

Set up mTLS by defining how {{ PRODUCT }} will validate certificates.

**To set up mTLS**
1.  Navigate to the **TLS Certificate** page.
    {{ ENV_NAV }} **TLS Certificate**.
2.  From the **Client Certificate Validation** option, select how {{ PRODUCT }} will [validate certificates](#mtls-validation) that will be performed.

    <Callout type="tip">

      We strongly recommend that you set this option to `Permissive` for your initial setup. This mode allows unverified traffic while you fine-tune your mTLS configuration.

    </Callout>

3.  From the **Request Client Certificates for Hostnames** option, determine whether {{ PRODUCT }} will request a certificate for all requests or solely for specific hostnames.
    -   **All Requests:** Verify that this option is set to blank.
    -   **Specific Hostnames:** Select each desired hostname from this option.
4.  From the **Chain of Trust Depth Validation** option, select the [depth to which {{ PRODUCT }} will validate a client certificate](#mtls-depth-of-validation) with the chain of trust defined in the **Certificate Chains** section.
5.  <a id="upload-pem" />If you set the **Chain of Trust Depth Validation** option to a value of `1` or higher, then you should add a [PEM file that contains a chain of trust](#chain-of-trust) for each desired hostname. Perform the following steps to add a PEM file:
    1.  Click **+ Add Certificate Chain**.
    2.  Paste the PEM file for the desired X.509 certificate(s).
    3.  Click **Add Chain**.
6.  Optional. Toggle the **Send Client Certificate Detail to Origin** option to [send headers](#origin-request-headers) containing client certificate metadata and validation status to your origin servers.
7.  Optional. If you are using Permissive mode, then you can override the default behavior and return a `403 Forbidden` response for client certificate validation failures by enabling the **Return Status Code 403 for Validation Failures** option.

    <Callout type="tip">

      We recommend that you leave this option disabled until you have verified that your mTLS configuration will not block legitimate traffic.

      </Callout>

8.  Click **Save** to apply your changes.

**To update your mTLS configuration**
1.  Navigate to the **TLS Certificate** page.
    {{ ENV_NAV }} **TLS Certificate**.
2.  Update the desired setting(s). Common tasks are listed below.

    -   Update your chain of trust by:
        -   [Uploading a PEM file](#upload-pem) for each desired hostname. Make sure to upload renewed certificate(s) before the existing certificate(s) expire.
        -   Deleting the PEM file for expired certificate(s). From the **Certificate Chains** section, click the <Image inline src="/images/v7/icons/delete.png" alt="Delete" /> icon corresponding to the chain that will be deleted.

3.  Click **Save**.

**To disable mTLS**
1.  Navigate to the **TLS Certificate** page.
    {{ ENV_NAV }} **TLS Certificate**.
2.  Set the **Client Certificate Validation** option to `Disabled`.

    This configuration disables client certificate validation for all requests to this environment. If a client provides a certificate, {{ PRODUCT }} will not validate it.

3.  Click **Save**.

### Origin Request Headers {/*origin-request-headers*/}

{{ PRODUCT }} can send request headers containing mTLS metadata to the origin when the **Send Client Certificate Detail to Origin** option is enabled. The selected client certificate validation mode determines when these request headers are sent.

-   **Permissive Mode:** These headers are sent for all requests, including requests that result in a failed TLS handshake or a `403 Forbidden` response. This behavior allows you to use those headers to troubleshoot client authentication issues.
-   **All Other Modes:** These headers are only sent to your origin for requests for which we were able to establish a secure connection. {{ PRODUCT }} will not provide these headers when the request results in a failed TLS handshake.

Mutual TLS request headers are described below:

| Header                | Type                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-ssl-client-cert     | Client Certificate                      | Contains the client certificate in PEM format. <br />**Example:** `-----BEGIN%20CERTIFICATE----- ... %0A-----END%20CERTIFICATE-----%0A`                                                                                                                                                                                                                                                                                                                                                                                                          |
| x-ssl-client-i-dn     | Distinguished Name - Issuer             | Identifies the [Distinguished Name (DN)](https://knowledge.digicert.com/general-information/what-is-a-distinguished-name) for the client certificate's issuer. <br />**Example:** `CN=ACME INTERMEDIATE CLIENT CA,OU=Security,O=ACME Inc.,L=Los Angeles,ST=California,C=US`                                                                                                                                                                                                                                                                      |
| x-ssl-client-s-dn     | Distinguished Name - Subject            | Identifies the [Distinguished Name (DN)](https://knowledge.digicert.com/general-information/what-is-a-distinguished-name) for the client certificate's subject. <br />**Example:** `CN=www.example.com,OU=Security,O=ACME Inc.,L=Los Angeles,ST=California,C=US`                                                                                                                                                                                                                                                                                 |
| x-ssl-client-serial   | Client Certificate's Serial Number      | Indicates the client certificate's serial number. <br />**Example:** `655603895D3E8ECC4DF507FB33A1171A53F37CAF`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| x-ssl-client-sha1     | Client Certificate's Fingerprint        | Contains the client certificate's SHA1 fingerprint. <br />**Example:** `7C2E166156E2D165AD7468B0E0145411B655F041`                                                                                                                                                                                                                                                                                                                                                                                                                                |
| x-ssl-client-v-end    | Client Certificate's Expiration Date    | Indicates the date and time (GMT) at which the client certificate will expire.<br />**Example:** `Aug 7 18:54:27 2033 GMT`                                                                                                                                                                                                                                                                                                                                                                                                                       |
| x-ssl-client-verify   | Client Certificate's Validation Status  | Indicates the result for the validation of the client certificate. Valid values are: <ul><li>**SUCCESS:** Certificate validation is required and the client provided a valid certificate. </li><li>**LENIENT:** Certificate validation is not required, but the client provided a valid certificate. </li><li>**FAILED** `<REASON>`**:** The client did not provide a valid certificate. Check the reason to find out more information. </li><li>**NONE:** Certificate validation is not required and the client did not provide one. </li></ul> |
| x-ssl-client-v-remain | Client Certificate's Days to Expiration | Indicates the number of days until the client certificate will expire. <br />**Example:** `123`                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| x-ssl-client-v-start  | Client Certificate's Issued Date        | Indicates the date and time (GMT) at which the client certificate was issued. <br />**Example:** `Aug 10 18:54:27 2023 GMT`                                                                                                                                                                                                                                                                                                                                                                                                                      |

[View the corresponding feature variables.](/applications/performance/rules/feature_variables#mtls)

## Troubleshooting TLS {/*troubleshooting*/}

If your origin returns a `502 Bad Gateway` or a `504 Gateway Timeout` response when served through {{ PRODUCT }}, then your origin configuration's TLS settings may be improperly configured. [View troubleshooting steps.](/applications/performance/troubleshooting#502-bad-gateway-status-code)
