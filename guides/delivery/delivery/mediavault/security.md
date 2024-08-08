---
title: Security
---
The Security section applies to MediaVault for HTTP.

### Shared Secret and Hashing  {/*shared-secret-and-hashing*/}
MediaVault provides a secure method of URL-embedded content protection by using a shared secret and a hash computation.

#### Shared Secret  {/*shared-secret*/}
The shared secret is an alphanumeric string known only to Edgio and the content provider. This secret word is prepended to the content URL before the hash is generated and is unrecoverable from the hash. This prohibits malicious end users from creating their own hashes and protects MediaVault parameters from tampering.

#### Hash Secret  {/*hash-secret*/}
The hash secret is a deterministic procedure that takes an arbitrary block of data and returns a fixed-size bit string, the (cryptographic) hash value, such that an accidental or intentional change to the data will change the hash value.

You must generate your own hash values. MD5 hash generator applications are available free on the internet. There is also an MD5 [Hash Generator Tool](/delivery/control/configure/mediavault_hash_generator) available in Control that provides a hash generator for you to configure MediaVault features.

#### Two Hash Secrets  {/*two-hash-secrets*/}
MediaVault allows two shared hash secrets to be in place at once.

<Callout type="info">This feature is ONLY used by Content Delivery.</Callout>

- *Use Case*: This feature is used when you would like two viable production shared secrets or you are transitioning from one shared secret to another.
- *Usage*: If you want to transition from one hash secret to another without breaking existing URLs, MediaVault will try to match the hash using the first hash secret. If the first hash secret fails, then MediaVault will try to use the secondary hash secret.
- *Limitations*: There must be an existing hash secret to have a secondary hash secret.

##### Workflow for MediaVault Hash Usage:  {/*workflow*/}
1. Use the target URL with one or more MediaVault parameters to create a 128-bit MD5 hash value. This hash is typically expressed as a sequence of 32 hexadecimal digits.
2. Edgio requires you to supply the hash, a secure directory, and a shared secret.
3. MediaVault then uses the information to create the same hash.
4. If the hash expressions do not match, the consumer request for content is denied.

For optimal security, you should perform URL computation (with appropriate query parameters) outside the media player by using a separate software component. For example, generate the final URL within a content-management system or web service and have the media player query the component used for the final secure URL.

### Custom URL Tokenization  {/*custom-url-tokenization*/}
MediaVault can store and access multiple sets of hash algorithms. Each set can contain separate MD5, SHA1, and SHA256 shared secrets. Individual sets are versioned (using an integer \> zero) and are specified by version number using the `va` MediaVault parameter.

To take advantage of this feature, contact Edgio Support.

#### Generate a Hash using Bash Commands  {/*generate-hash-bash*/}
1. Take the published URL and append the MediaVault query parameters you wish to use.

    Example: `http://published.test.com/directory/file.txt?s=1672531200&e=1988150400`

2. Prepend the published URL with the shared secret (the alphanumeric value known only to Edgio and the content provider, preconfigured on the relevant content delivery configuration).

    Example: `mediavaulthashhttp://published.test.com/directory/file.txt?s=1672531200&e=1988150400`

3. Generate the MD5 hash of that string.

    Example: `echo -n "mediavaulthashhttp://published.test.com/directory/file.txt?s=1672531200&e=1988150400" | openssl md5`

4. Put the MD5 hash into the "h=" query parameter and append to the end of the URL.

    Example: `http://published.test.com/directory/file.txt?s=1672531200&e=1988150400&h=bd164af2cf67f89cdd5095bf2a4f8c4f`

#### Generate a Hash via the MediaVault Hash Generator   {/*generate-hash-generator*/}
1.  Log into Control.

2.  From the left navigation, select *Configure* > *MediaVault Hash Generator*.
3.  Fill out the fields to generate and view the output.

| Field/Feature | Details |
| --- | --- |
| Shared Secret | Required field. The shared secret is an alphanumeric value known only to Edgio and the content provider, preconfigured on the relevant content delivery configuration. |
| Target URL | Required field. The URL for MediaVault to protect. |
| Start Date/Time | MST (GMT-7). The date and time the CDN should start accepting the resulting MediaVault-hashed URL. |
| End Date/Time | MST (GMT-7). The date and time the CDN should stop accepting the resulting MediaVault-hashed URL. |
| IP Address/Mask | The IP address, IP address range/mask to make your content available to.<br /><br />Individual IP address (e.g., 10.9.12.19)<br />-   Requests from clients at IP address 10.9.12.19 are allowed.<br />-   Requests from all other client IPs will be denied.<br /><br />IP address Range (e.g., 1.2.3.0/24)<br />-   Requests from clients at IP addresses 1.2.3.0 to 1.2.3.255 are allowed.<br />-   Requests from all other client IPs will be denied. |
| Referrer URL | The right-side match of the hostname of the URL in the “Referrer” request header whose presence would be required to allow the request. |

5.  Optional. Use the Prefix slider to specify the number of characters of the URL, from the left side, to use in calculating the MediaVault hash.

6.  The hash examples display in the Output section. Use this information as a validation for the hash value created locally.
