---
title: {{ OPEN_EDGE}} rDNS Requirements
---

For the Edgio CDN to function correctly, the reverse DNS zones need to be delegated to Edgio DNS servers.
Both IPv4 and IPv6 allocations can be delegated using one of two methods:
- External: Contact your RIR (Regional Internet Registry) or upstream provider to complete the delegation

- Internal: Configure the delegation yourself.

## IPv4 Allocation of a /24 or Smaller  {/*ipv4-24*/}
Determine the current configuration for the reverse zone for the IP block in question.

**Example**
IPv4 block: 198.51.100.0/24<br />
Reverse Zone: 100.51.198.in-addr.arpa

Use dig to determine the name servers for the reverse zone.<br />
```
>dig NS 100.51.198.in-addr.arpa

; <<>> DiG 9.9.11 <<>> NS 100.51.198.in-addr.arpa
---Output truncated---
;; QUESTION SECTION:
;100.51.198.in-addr.arpa.         IN      NS

;; ANSWER SECTION:
100.51.198.in-addr.arpa.  29176   IN      NS      ns1.apnic.net. --> External Delegation
```

Or:

```
;; ANSWER SECTION:
100.51.198.in-addr.arpa.  29176   IN      NS      ns1.mycompany.net. --> Internal Delegation
```

Or:

```
(no answer section)
;; AUTHORITY SECTION:
51.198.in-addr.arpa.    3600    IN      SOA     ns1.somecompany.net. —> Internal Delegation (by you or upstream company)
```

<Callout type="info">If there is more than one /24 allocated, you need to repeat this process each /24.</Callout>

### External Delegation  {/*external-1*/}

If the reverse zone is not delegated to your company or if you wish to have the zone reassigned to Edgio, the RIR (Regional Internet Registry) or the upstream provider should be contacted to have the reverse zone delegated to the Edgio name servers listed in the Validation section.
IN NS aa1.dns.llnw.net
IN NS aa2.dns.llnw.net

<Callout type="info">If you wish to delegate rDNS to Edgio for a /24 but the encompassing /16 is already assigned by the RIR to a specific name server other than the RIRs default name servers (3rd example above) you do not have the option of applying the delegation via the RIR. You will need to follow the internal delegation instructions on the name server the /16 is assigned to or contact the upstream owner of said name server and request they add the records as described in these instructions.</Callout>

**Validation**

Once the delegation of the reverse zone is completed, validate the configuration:

```
>dig NS 100.51.198.in-addr.arpa

; <<>> DiG 9.9.11 <<>> @aa1.dns.llnw.net NS 100.51.198.in-addr.arpa
---Output truncated---
;; QUESTION SECTION:
;100.51.198.in-addr.arpa.         IN      NS

;; ANSWER SECTION:
100.51.198.in-addr.arpa.  3600    IN      NS      aa1.dns.llnw.net.
100.51.198.in-addr.arpa.  3600    IN      NS      aa2.dns.llnw.net.
```

To validate that the Edgio DNS servers are configured for the zone in question:

```
>dig @aa1.dns.llnw.net NS 100.51.198.in-addr.arpa

; <<>> DiG 9.9.11 <<>> @aa1.dns.llnw.net NS 100.51.198.in-addr.arpa
---Output truncated---
;; QUESTION SECTION:
;100.51.198.in-addr.arpa.         IN      NS

;; ANSWER SECTION:
100.51.198.in-addr.arpa.  3600    IN      NS      aa1.dns.llnw.net.
100.51.198.in-addr.arpa.  3600    IN      NS      aa2.dns.llnw.net.
```

### Internal Delegation  {/*internal*/}
#### Option A - Delegate /16 or Larger  {/*a*/}
If the reverse zone is currently delegated to your company’s name servers, the reverse zone will need to be created and/or updated to use the Edgio name servers.

IN NS aa1.dns.llnw.net.<br />
IN NS aa2.dns.llnw.net.

**Validation**

Validate that the delegation is working properly.

```
> dig NS 100.51.198.in-addr.arpa

; <<>> DiG 9.9.11 <<>> NS 100.51.198.in-addr.arpa
---Output truncated---
;; QUESTION SECTION:
;100.51.198.in-addr.arpa.   IN      NS

;; ANSWER SECTION:
100.51.198.in-addr.arpa. 300 IN     NS      aa2.dns.llnw.net.
100.51.198.in-addr.arpa. 300 IN     NS      aa1.dns.llnw.net.
```

#### Option B - Delegate Smaller than a /16 {/*b*/}
If the reverse zone is currently delegated to your company’s name servers, there are two options.
1.	The Edgio preferred option is to delegate the /24 reverse zone to Edgio.  Follow the instructions provided in the [External Delegation](#external-1) section above.
2.	If your company does not want to have the RIR delegate the /24 to Edgio directly, please follow the directions below for [Option C - Delegate smaller than a /24 below](#c).

<Callout type="info">If your company is choosing to not delegate a /24 via the RIR you will need to notify the Edgio team so that the necessary configuration can be completed within our systems.</Callout>

#### Option C - Delegate Smaller than a /24  {/*c*/}

If the allocation is a /24 or smaller, the reverse zone will need to be created or updated with the following information.
In addition to the existing NS entries, the following entries need to be added to the zone:

llns IN NS aa1.dns.llnw.net<br />
llns IN NS aa2.dns.llnw.net

A CNAME record will need to be added for all reverse entries that are being delegated to Edgio.

**Example**
IPv4 block: 198.51.100.128/25<br />
Reverse Zone: 100.51.198.in-addr.arpa

128 IN CNAME 128.llns.100.51.198.in-addr.arpa.<br />
129 IN CNAME 129.llns.100.51.198.in-addr.arpa.

254 IN CNAME 254.llns.100.51.198.in-addr.arpa.<br />
255 IN CNAME 255.llns.100.51.198.in-addr.arpa.

**Validation**
Validate that the delegation is working properly.

```
> dig NS llns.100.51.198.in-addr.arpa

; <<>> DiG 9.9.11 <<>> NS llns.100.51.198.in-addr.arpa
---Output truncated---
;; QUESTION SECTION:
;llns.100.51.198.in-addr.arpa.   IN      NS

;; ANSWER SECTION:
llns.100.51.198.in-addr.arpa. 300 IN     NS      aa2.dns.llnw.net.
llns.100.51.198.in-addr.arpa. 300 IN     NS      aa1.dns.llnw.net.
```

## IPv6 Allocation of /64   {/*ipv6-64*/}
This is the standard allocation requested by Edgio.

Determine the current configuration for the reverse zone for the IPv6 block in question.

**Example**
IPv6 block: 2001:db8:1234:5678::/64<br />
Reverse Zone: 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa<br />
Use dig to determine the name servers for the reverse zone.<br />

```
>dig NS 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa

; <<>> DiG 9.9.11 <<>> NS 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa
---Output truncated---
;; QUESTION SECTION:
;8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. IN   NS

;; AUTHORITY SECTION:
8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa.  29176   IN      NS      ns1.apnic.net. --> External Delegation
```

Or:

```
;; ANSWER SECTION:
8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa.   2198    IN      SOA     ns1.mycompany.net. 28800 7200 2419200 3600 --> Internal Delegation
```

### External Delegation  {/*external*/}
If the reverse zone is not delegated to your company, the RIR or the upstream provider should be contacted to have the reverse zone delegated to the Edgio name servers listed above.

**Validation**
Once the delegation of the reverse zone is completed, validate the configuration:

```
>dig NS 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa

; <<>> DiG 9.9.11 <<>> @aa1.dns.llnw.net NS 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa
---Output truncated---
;; QUESTION SECTION:
;8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. IN   NS

;; ANSWER SECTION:
8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. 300 IN NS     aa2.dns.llnw.net.
8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. 300 IN NS     aa1.dns.llnw.net.
```

To validate that the Edgio DNS servers are configured for the zone in question:

```
>dig @aa1.dns.llnw.net NS 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa

; <<>> DiG 9.9.11 <<>> @aa1.dns.llnw.net NS 8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa
---Output truncated---
;; QUESTION SECTION:
;8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. IN   NS

;; ANSWER SECTION:
8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. 300 IN NS     aa2.dns.llnw.net.
8.7.6.5.4.3.2.1.8.b.d.0.1.0.0.2.ip6.arpa. 300 IN NS     aa1.dns.llnw.net.
```

### Internal Delegation  {/*internal-delegation*/}
If the reverse zone is currently delegated to your company, the reverse zone will need to be created or updated to use the Edgio name servers.

IN NS aa1.dns.llnw.net<br />
IN NS aa2.dns.llnw.net

## References   {/*references*/}
[IPv4 Reference for DNS Delegation](https://tools.ietf.org/html/rfc2317) <br />
[IPv6 Reference for DNS Delegation](https://datatracker.ietf.org/doc/html/rfc8501) <br />
[RIR (Regional Internet Registry)](https://www.iana.org/numbers)
