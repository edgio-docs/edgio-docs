# Custom Domains & SSL

This guide covers the steps you need to take your site live on the Moovweb XDN with a secure, custom domain.

## Region

If you are an enterprise customer you can choose from multiple global [regions](regions) in which your compute and caching resources will be provisioned.

## Domains

Before going live, you need to create a production environment and configure your domains. For more information on environments, see [Environments](./environments)

To configure your custom domains:

1. Create an environment by navigating to your site and selecting _Environments_ => _New Environment_
2. Click _Edit_ to create a draft. Enter your domains here, save changes, and activate:

![domains](/images/production/domains.png)

### Migrating from Fastly

If you're migrating to the XDN from [Fastly](https://www.fastly.com/), you will need to do the following before adding your domains to your XDN environment:

- [Contact Fastly support](https://support.fastly.com/hc/en-us/requests/new?ticket_form_id=360000269711) and request that control of your domains be transferred to Moovweb. Be sure to explicitly list each domain that needs to transferred and ask Fastly to contact xdn-support(at)moovweb.com if they need Moovweb to confirm the transfer.
- Before going live with the XDN, you will need to ensure that you've removed your domains from all active Fastly services. To remove domains from a service, clone the service, remove the domains, then activate the new version of the service. Once the new service version is activated you can add the domains to your XDN environment and activate it.

## Network configuration

On the "Networking" tab for your environment you can find the DNS and whitelisting IP configurations.

![networking](/images/production/networking.png)

### DNS

In order to configure your DNS provider to direct traffic for a particular set of domains to the Moovweb XDN, you will have to create DNS records with values depending on the type of domain you are using for your website. If you are launching a brand new site then you can set this up whenever you feel ready. For sites that are already live, the DNS update is the last step. Once you have updated your DNS you are committed to launching.

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

### Whitelisting XDN IP Addresses

Before going live, ensure that all Moovweb XDN IP addresses are whitelisted in the security layer in front of your origin and/or API servers. The IP addresses you need to whitelist can be found on the "IP Whitelist" section of the "Networking" tab. Note that your IP addresses may differ from the ones show above.

## TLS/SSL

All data transmitted to and from your Moovweb XDN project must be secured with TLS (Transport Layer Security). TLS, also known as SSL (Secure Sockets Layer), is a cryptographic protocol to communicate securely over the Internet. TLS provides end-to-end data encryption and data integrity for all web requests.

The XDN provides a wildcard TLS certificate that covers the auto-generated domains that it assigns to your site (e.g {team}-{site}-{branch}-{version}.moovweb.io). You need to provide your own certificate for your site's custom domains.

### Obtaining a certificate

_Note: If you already have an existing certificate, you can use it by skipping ahead to [Uploading your certificate](#section_uploading_your_certificate). Many customers who have existing certificates still choose to obtain a new one when adopting the XDN so as not to reuse the same private key with more than one vendor/system_

TLS certificates are issued by Certificate Authorities (CA) based on Certificate Signing Request (CSR) that they receive from you. Alongside the CSR the same process creates certificate's private key. You only need to share your CSR with CA, not the private key which you should store securely.

This guide describes the creation of the CSR and private key with OpenSSL. OpenSSL is an open-source toolkit for the TLS protocol. We recommend using OpenSSL because it ensures that your private key will only be stored locally on your infrastructure. Your CA may to have more customized guides or entirely customized certification process.

To create CSR and private key do the following:

1. Open your terminal window and make sure that you have OpenSSL installed:

- On MacOS you can install it by using [`brew`](https://brew.sh/) package manager (e.g. `brew install openssl`)
- On Windows you can install it by using [`Chocolatey`](https://chocolatey.org/) package manager (e.g. `choco install openssl`)
- On Linux/Unix you can install it by running the built-in OS package manager (e.g. `apt-get install openssl`, `apk add openssl` and so on)

2. Go to the directory of your choice and create a configuration file `moovweb-xdn.conf` based on this template:

```properties
[req]
default_bits=2048

[distinguished_name]
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

Replace the country, state/province, locality, organization name and, most importantly Common Name (CN), for the cert which must be the fully qualified domain name for your domain (e.g. for Moovweb that is `www.moovweb.com`)

You will want to add all the additional domains into the `alt_names` section. There you should add your development, staging and other domains although Moovweb strongly encourages the use of wildcard certs.

3. Run `openssl req -out moovweb-xdn.csr -newkey rsa:2048 -nodes -keyout moovweb-xdn.key -config moovweb-xdn.conf -batch`. This should generate your CSR in `moovweb-xdn.csr` and private key in `moovweb-xdn.key`. If you want OpenSSL to ask you for each different input, remove `-batch` option and re-run the command.
4. Read the CSR (e.g. `cat moovweb-xdn.csr`) and send it to your CA for certification.

### Uploading your certificate

To upload your SSL certificate, navigate to the **Settings** tab on your site and

![ssl](/images/production/ssl.png)

Then, scroll down to **SSL Certificate**. _Note that you need to be in the **Admin** role on your team and your team needs to be upgraded to XDN Enterprise to see this section:_

![empty-certificate](/images/production/empty-certificate.png)

Moovweb XDN needs three things to correctly host your certificate:

- Certificate issued by CA
- Intermediate certificates (IC) used by CA including CA's signing certificate
- Private key that was generated at the same time with CSR

The private key part is non-public data and must not be shared with parties other than Moovweb. The Moovweb XDN stores your private key securely at rest. It is never shown in the developer console and only used to provision parts of the infrastructure that are used to terminate TLS connections.

You need to copy the certificate, intermediate certificates and the private key into the corresponding edit boxes and, once done, click on "Save Changes" button. This will change the status of your certificate to "Activation in Progress".

![in-progress-certificate](/images/production/in-progress-certificate.png)

Note that the certificate hosting process is not immediate. It may take up to five business days for the certificate to be activated. Once it is activated, you'll see the following:

![activated-certificate](/images/production/activated-certificate.png)
