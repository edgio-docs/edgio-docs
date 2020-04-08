# Certificates

All data transmitted to and from your Moovweb XDN project must be secured with TLS (Transport Layer Security). TLS, also known as SSL (Secure Sockets Layer), is a cryptographic protocol to communicate securely over the Internet. TLS provides end-to-end data encryption and data integrity for all web requests.

When users on their devices visit your domains that are set up on the Moovweb XDN, a TLS certificate is needed. TLS certificates must be provisioned for all data that may pass through Moovweb XDN.

## Obtaining a certificate

TLS certificates are issued by Certificate Authorities (CA) based on Certificate Signing Request (CSR) that they receive from you. Alongside the CSR the same process creates certificate's private key. You only need to share your CSR with CA, not the private key which you should store securely.

This guide describes the creation of the CSR and private key with OpenSSL. OpenSSL is an open-source toolkit for the TLS protocol. We recommend using OpenSSL because it ensures that your private key will only be stored locally on your infrastructure. Your CA may to have more customized guides or entirely customized certification process.

To create CSR and private key do the following:

1. Log into wherever you have OpenSSL installed (locally in your terminal window or maybe a separate certificate management box)
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

## Uploading certificate to Moovweb XDN

Moovweb XDN needs three things to correctly host your certificate:

* Certificate issued by CA
* Intermediate certificates (IC) used by CA including CA's signing certificate
* Private key that was generated at the same time with CSR

The private key part is non-public data and must not be shared with parties other than Moovweb. In Moovweb XDN it is stored securely at rest, never shown in UI and only used to provision parts of the infrastructure that are used to terminate TLS connections.
