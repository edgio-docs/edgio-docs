# Domains and DNS

This guide covers the steps you need to take in order to set up your custom domain(s).

## Directing traffic to the XDN

In order to direct traffic for a particular set of domains to the Moovweb XDN:

1. Create an environment by navigating to your site and selecting *Environments* => *New Environment*
2. Click *Edit* to create a draft. Enter your domains here, save changes, and activate:

![domains](../images/dns/domains.png)

3. Create a CNAME record at your domain registar with the value show under *DNS Configuration*:

![dns](../images/dns/dns.png)
