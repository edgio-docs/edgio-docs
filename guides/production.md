# Production

This guide covers the steps you need to take your site live on the Moovweb XDN.

## Domains

Before going live, you need to create a production environment and configure your domains.  For more information on environments, see [Environments](./environments)

To configure your custom domains:

1. Create an environment by navigating to your site and selecting *Environments* => *New Environment*
2. Click *Edit* to create a draft. Enter your domains here, save changes, and activate:

![domains](/images/production/domains.png)

## DNS

In order to configure your DNS provider to direct traffic for a particular set of domains to the Moovweb XDN, create a CNAME record with the value shown under *DNS Configuration*:

![dns](/images/production/dns.png)

## Whitelisting XDN IP Addresses

Before going live, ensure that all Moovweb XDN IP addresses are whitelisted in the security layer in front of your origin and/or API servers.  The IP addresses you need to whitelist can be found on the "IP Whitelist" tab on your production environment.  Note that your IP addresses may differ from the ones shown below:

![ip_whitelist](/images/production/whitelist.png)

## TLS/SSL

All data transmitted to and from your Moovweb XDN project must be secured with TLS (Transport Layer Security). TLS, also known as SSL (Secure Sockets Layer), is a cryptographic protocol to communicate securely over the Internet. TLS provides end-to-end data encryption and data integrity for all web requests. 

The XDN provides a wildcard TLS certificate that covers the auto-generated domains that it assigns to your site (e.g {team}-{site}-{branch}-{version}.moovweb.io).  You need to provide your own certificate for your site's custom domains.

### Obtaining a certificate

TLS certificates are issued by Certificate Authorities (CA) based on Certificate Signing Request (CSR) that they receive from you. Alongside the CSR the same process creates certificate's private key. You only need to share your CSR with CA, not the private key which you should store securely.

This guide describes the creation of the CSR and private key with OpenSSL. OpenSSL is an open-source toolkit for the TLS protocol. We recommend using OpenSSL because it ensures that your private key will only be stored locally on your infrastructure. Your CA may to have more customized guides or entirely customized certification process.

To create CSR and private key do the following:

1. Open your terminal window and make sure that you have OpenSSL installed:
* On MacOS you can install it by using [`brew`](https://brew.sh/) package manager (e.g. `brew install openssl`)
* On Windows you can install it by using [`Chocolatey`](https://chocolatey.org/) package manager (e.g. `choco install openssl`)
* On Linux/Unix you can install it by running the built-in OS package manager (e.g. `apt-get install openssl`, `apk add openssl` and so on)
2. Go to the directory of your choice and create a configuration file `moovweb-xdn.conf` based on this template:

```
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

Replace the country, state/provice, locality, organization name and, most importantly Common Name (CN), for the cert which must be the fully qualified domain name for your domain (e.g. for Moovweb that is `www.moovweb.com`)

You will want to add all the additional domains into the `alt_names` section. There you should add your development, staging and other domains although Moovweb strongly encourages the use of wildcard certs.

3. Run `openssl req -out moovweb-xdn.csr -newkey rsa:2048 -nodes -keyout moovweb-xdn.key -config moovweb-xdn.conf -batch`. This should generate your CSR in `moovweb-xdn.crs` and private key in `moovweb-xdn.key`. If you want OpenSSL to ask you for each different input, remove `-batch` option and re-run the command.
4. Read the CSR (e.g. `cat moovweb-xdn.crs`) and send it to your CA for certification.

### Uploading certificate to Moovweb XDN

Moovweb XDN needs three things to correctly host your certificate:

* Certificate issued by CA
* Intermediate certificates (IC) used by CA including CA's signing certificate
* Private key that was generated at the same time with CSR

![empty-certificate](/images/production/empty-certificate.png)

The private key part is non-public data and must not be shared with parties other than Moovweb. The Moovweb XDN stores your private key securely at rest.  It is never shown in the developer console and only used to provision parts of the infrastructure that are used to terminate TLS connections.

You need to copy the certificate, intermediate certificates and the private key into the corresponding edit boxes and, once done, click on "Save Changes" button. This will change the status of your certificate to "Activation in Progress".

![in-progress-certificate](/images/production/in-progress-certificate.png)

Note that the certificate hosting process is not immediate. It may take up to five business days for the certificate to be activated.  Once it is activated, you'll see the following:

![activated-certificate](/images/production/activated-certificate.png)

