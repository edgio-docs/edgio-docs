---
title: MediaVault Parameters
---
This section lists and describes all MediaVault parameters. Not all parameters are supported for all services.

### Supported Parameters  {/*mediavault-parameters*/}
The behavior of the CDN with MediaVault is based on the combination of parameters in the URL query string. The MediaVault parameters available to Edgio Content Delivery are:

- s=start-time
- e=end-time
- t=time ehash
- ip=IP address/mask
- p=prefix length
- r =referrer
- ri=rate limit
- rs =rate limit
- va=algorithm version

### Format  {/*format*/}
The hash is generated using the following MediaVault Secure URL format for the query string:

`http://<published-url>?s=<start-time>&e=<end-time>&p=<length>&ip=<supported-IP- format>&h=<hash>`

where
- s=`<start-time>` The time at which the CDN should start accepting the resulting - MediaVault-hashed URL (represented as Unix epoch seconds)
- e=`<end-time>` he time after which the CDN should no longer accept the resulting MediaVault-hashed URL (represented as Unix epoch seconds)
- ip=`<supported-IP-format>` A specific IP address or range of IP addresses
- p=`<length>` A positive integer representing a portion of the URL that will be used for computing the hash
- r = `<domains>` a comma separated list of domains
- ri = `<kbytes>` An initial data range that will not be rate limited by rs
- rs = `<kbytes/sec>` The sustained rate limit to apply after ri is reached
- va=`<version>` is an optional hash algorithm version number
- h=`<hash>` is a MD5 hash of the URL

#### Cookie-Based  {/*cookie-based*/}
- cf = A Cookie-based MediaVault parameter that defines the final expiration of an asset.
- cd = A Cookie-based MediaVault time delta. Expirations for MediaVault cookies are incremented according to this delta for each request.
- ci = A Cookie-based MediaVault parameter which specifies an initial delta when incrementing expiration values for a given request. After this delta is used one time, the delta from a cd= parameter is used.
- cp = Specifies a comma-separated list of paths (that can include wildcards) which are matched against the file path portion of an incoming request to determine if a URL is valid.

With a few exceptions, parameters can be in any order. However, the order must be consistent between when the hash value is calculated and when the MediaVault-protected URL is presented to the user. Changing the order of the parameters after the hash has been calculated will result in the hash value being rejected. The Start Time, End Time, and IP parameters can be in any order.

Refer to [Cookie-based Configuration](/delivery/delivery/mediavault/path_and_cookie_based_mediavault/#cookie-based-configuration) for parameter details and sample implementation.

#### Start Time (s)  {/*start-time*/}
Optional. Start Time (s) represents the time at which the CDN should start accepting the resulting MediaVault-hashed URL. Requests with MediaVault-hashed URLs before the time in the *Start Time* parameter will be rejected by the CDN. This can be used to set a start time for content to go live in the future – without worrying that the audience may see a video before its scheduled time.

<Callout type="info">-If any number in the *Start Time* set is changed without computing the hash again, the request is denied.<br />- All times specified in the Control UI are in Mountain Standard Time (MST/GMT-7).</Callout>

#### End Time (e)  {/*end-time*/}
End Time (e) represents the time after which the CDN should no longer accept the resulting MediaVault-hashed URL. Requests with MediaVault-hashed URLs after the time in the End Time parameter will be rejected by the CDN. By encoding the end time in a URL, you can set a time-to-live for the content, preventing indefinite access. This is optional.

<Callout type="info">When Cookie-Based MediaVault is used, the expiration time for a URL is incremented by `ci=` and `cd=` parameters (until the `cf=` value is reached).</Callout>

#### Start Time (s) and End Time (e)  {/*start-end*/}
MediaVault Start and End Time allow you to specify times that the URL will be valid. A URL can have a time that it starts being valid, a time it ends being valid, or both.

- *Use Case*: You want a link to be valid only during a certain time frame. For example, a link can be set up for a live event that only works during the event.
- *Usage*: To use this feature, add a "s=" and/or "e=" argument to the query string before the "h=" argument. If this parameter is not supplied, the link is valid at all times. If only the start "s=" parameter is supplied, then the link will be valid from that time forward. If only the end "e=" parameter is supplied, then the link will be valid until that time.
- *Limitations*: None
- *MediaVault Secure URL Format*: The hash is generated using the following format:

    `http://<object-url>?s=<start-time>&e=<end-time>&h=<hash>`

where `<start-time>` and `<end-time>` are the number of seconds since the Unix epoch and `<hash>` is an MD5 hash of the URL.

#### Time (t) ehash  {/*time-ehash*/}
MediaVault ehash specifies the expiration time for a URL.

- *Use Case*: You want to specify an end date for the link in the hash parameter.
- *Usage*: To use this feature, add a "t=" argument to the query string. The ehash is generated with the same algorithm as a normal hash, but the end time is prepended to it, separated by an underscore. A normal hash secret with an end time (i.e., the "e=" parameter) will have the same result.
- *Limitations*: Your ehash is enabled, and you will not be able to use the other options that are available for hash secret.
- *MediaVault Secure URL Format*: The hash is generated using the following format:

`http:// //<object-url>?t=<endtime_hash>`

where `<endtime_hash>` is the number of seconds since the Unix epoch, followed by an underscore, followed by an MD5 hash of the URL.

#### IP Address/Range Mask (ip)  {/*ip-address-range-mask*/}
Optional. The IP Parameter (ip) specifies the client IP, or range of client IP addresses, from which the CDN will accept requests with that MediaVault-hashed URL. If the IP address associated with the request is different or is not within the specified range, the request is denied.

<Callout type="info">The client IP is the SRC of the TCP packets that make up the request, which is the publicly-routable IP address (e.g., A NAT, router, firewall, or proxy); therefore, multiple devices behind such a publicly-routable IP would be able to utilize a MediaVault-hashed URL with an “ip” parameter, regardless of each device’s eligibility to consume that content. This also means the RFC1918 internal IP of a device on its local network should not be used in the “ip” parameter, as it will never be the TCP SRC of a request across the Internet. In addition, a dual-stack environment - with both an IPv4 and IPv6 public address - may send the request from one or the other public IP, which would result in a MediaVault violation if the MediaVault hash was generated for the wrong IP version.</Callout>

The argument to the IP parameter is `<supported-IP-format>`, represented by one of the following:

- 192.169.1.25 (specific IP address)
- 80.249.208.0/21 (range of IP v4 addresses)
- 2001:7f8:1::a502:2822 (range of IPv6 addresses)

If this parameter is not supplied, the CDN will accept requests with the MediaVault-hashed URL from all client IPs.

##### IP Address  {/*ip-address*/}
The IP address allows a URL (or media file) to only be accessed by client(s) originating from a specific IP address such as 1.2.3.4.

*Example*: This link will only be authorized if the IP the request came from is 192.169.1.25. All other requests will be denied:

`http://test.llnwd.net/wm9/md5/file.wmv?ip=1192.169.1.25&h=d051d13c78d51a67508734cd6dc5d694`

##### IP Address Range  {/*ip-address-range*/}
IP address range allows access from a range of logical addresses (usually within the address space assigned to the organization.) For example, the address 1.2.3.0/24 indicates a range (in the 4th octet) up to the 24th binary placeholder (00000001.00000010.00000011.00000000). This range would include addresses from 1.2.3.0 to 1.2.3.255. For assistance creating a range, connect to http://www.subnet-calculator.com and enter the IP addresses associated with the content.

*Example*: This link will only be authorized if the IP the request it came from is within the 10.9.12.0/24 range. All other requests will be denied:

`http://test.llnwd.net/wm9/md5/file.wmv?ip=192.169.1.25&h=d051d13c78d51a67508734cd6dc5d694`

#### Prefix Length (p)  {/*prefix-length*/}
Prefix Length (p) specifies a limited number of characters from the URL to calculate the hash. The hash calculation is done only on the portion of the full URL that matches the number of characters specified by the length parameter. This is typically used to remove a file name from the URL before the hash calculation is made, allowing access to all files in a directory. When the prefix length parameter is used with HTTPS, the MD5 calculation is done only on the portion of the full URL that matches the actual character count specified by the length parameter.

- *Use Case*: You want to generate a hash for a directory, not for specific files.
- *Usage*: To use this feature, generate a MediaVault hash from a string made up of the shared secret and the truncated portion of the published URL, followed by the query parameters (including the “p” parameter). Add a "p=" argument to the query string before the "h=" argument. If this parameter is not specified, then the full URL will be used for the hash calculation.
- *Limitations*: If the value of the "p=" argument is greater than the length of the URL then the whole path will be used.
- *MediaVault Secure URL Format*: The hash is generated using the following format:

`http://<object-url>?p=<P-value>&h=<hash>`

where `<P-value>` is a positive integer and `<hash>` is an MD5 hash of the URL.

#### Referrer (r)  {/*referrer*/}
A client may send a “Referrer:” request header when requesting a resource. The Referrer feature within MediaVault provides a method for the CDN to reject requests with a “Referrer:” request header whose value does not match the value of the “r” MediaVault parameter. The “r” parameter takes the right-side match of the hostname of the URL in the “Referrer:” request header, so an unintentionally generous “r” parameter - such as “r=com” - may result in unintentionally allowing access. In addition, by default the CDN will accept the presence of malformed “Referrer:” request headers, or the lack of any “Referrer:” request header; use strict referrer checking to prevent the CDN from allowing malformed or missing “Referrer:” request headers.

- *Use Case*: You want the links to be protected so they are only served from a specific page.
- *Usage*: To use this feature, add a "r=" argument to the query string before the "h=" argument. If this parameter is not supplied, all referrers will be valid. A hash secret (primary hash secret and secondary hash secret).
- *Limitations*: Some links from some browsers may not include referrer data in the HTTP Header, which is required for this feature. Most normal web page links will send the referrer data, but some helper applications will not know what the referrer is and will not send the header. Referrer data can also be spoofed fairly easily by including the header in the request; thus, it is not the most secure protection.
- *MediaVault Secure URL Format*: The hash is generated using the following format:

`http://<object-url>?r=<referrer>&h=<hash>`

where `<referrer>` must exactly match the value of the referrer data in the HTTP header and `<hash>` is an MD5 hash of the URL.

#### Rate Limit (ri, rs)  {/*rate-limit*/}
- ri=Optional initial range that will not be rate limited (kbytes)
- rs=Sustained rate limit to apply after ri is reached (kbytes/sec)

**Use Case**
Rate Limit lets you specify a maximum data transfer speed, with an optional initial transfer of full-speed data. For example, you may want to rate limit video streams overall but provide video players with an initial, full-speed burst of data or metadata to improve the user experience.

The ri parameter lets you set the initial amount of data that will not be rate limited, while the rs parameter lets you set the sustained rate limit to apply after the data specified by ri has been transferred.

- *Use Case*: You want to customize the transfer speed limits.
- *Usage*: To use this feature, add the "rs=" argument, and optionally the "ri=" argument, to the query string before the "h=" argument. If the ri parameter is not added, then requests are satisfied at full speed.
- *MediaVault Secure URL Format*: The hash is generated using the following format:

`http://<object-url>?ri=<unlimited Kbytes>&rs=<Rate Limit after ri is reached>&h=<hash>`

where `<hash>` is an MD5 hash of the URL.

<Callout type="info">The `ri` parameter has a maximum value of 20000 KB, and the rs parameter has a maximum value of 10000 KB/s. If larger values are provided, they will be reset to these maximums.</Callout>

#### Algorithm Version (va)  {/*algorithm-version*/}
If you are using multiple hash algorithm sets, you can tell MediaVault which hash algorithm set to use with the va parameter. The parameter value must be an integer greater than zero.

For more information on using hash algorithm sets, see [Custom URL Tokenization](/delivery/delivery/mediavault/security/#custom-url-tokenization).

### Parameter Order  {/*parameter-order*/}
With a few exceptions, parameters can be in any order. However, the order must be consistent between when the hash value is calculated and when the MediaVault -protected URL is presented to the user. Changing the order of the parameters after the hash has been calculated will result in the hash value being rejected by the Edgio Delivery network.

- The Start Time, End Time and IP parameters can be in any order.
- The Referrer URL and Page URL parameters must immediately follow the hash secret.
- When the Referrer URL and Page URL features are combined, the Referrer URL must come before the Page URL.

MediaVault also supports allowing some query terms to be appended to the end of the secure URL without being included in the hash calculation. This may be useful for certain use cases, such as when a video player adds arbitrary query terms to the end of the request. These query terms must appear after the hash value (h=) in the secure URL.
