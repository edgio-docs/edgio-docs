---
title: Path- and Cookie-based MediaVault
---
This page details the configuration details for MediaVault configurations.

## Path-based Configuration  {/*path-based-configuration*/}
This feature allows you to use MediaVault to secure media streams via path-based tokenized support. Use this method to embed security tokens in the path for streaming media as an alternative to cross-site cookies to prevent browsers from interfering with the functionality.

For this feature, there are three configuration options: `mv_path_based`, `mv_path_token`, and `mv_path_delim`.

### Configuration Options  {/*configuration-options*/}
| Option | Description |
| --- | --- |
| MV PATH BASED | Required checkbox. Enables path-based processing for the configuration. While path-based is enabled, queryterm-based URLs will be accepted. |
| MV PATH TOKEN | Optional text field. Only needed to use a special token string.<br /><br />Default:: token=<br /><br />Use these characters with the `mv_path_token` configuration option: `['a-z'] ['A-Z'] ['0-9'] ['/'] ['=']`<br /><br />A string length between 4 to 12 characters is recommended.<br /><br />Using a slash or multiple slashes as the only character in a token is invalid. |
| MV PATH DELIM | Optional text field. Only needed to use a special delimiter.<br /><br />Default:: `~`<br /><br />Do not use these characters for the mv\_path\_delim configuration option: `[':'] ['/'] ['?'] ['#'] ['['] [']'] ['@'] ['!'] ['$'] ['&'] ['\''] ['('] [')'] ['*'] ['+'] [','] [';'] ['=']`|

### Example  {/*example*/}
`cdn_rewrite <published-url> <source-url> acct_id <ID> hashsecret <secret> mv_path_based [other options ...]`

- After matching the configuration, if the mv_path_based flag is set, EdgePrism will convert the request URL into the normal form.
- The MediaVault configuration options (queryterm aliases, prefix, etc.) will behave as usual.
- The normal URL is used to construct the private/ origin request URL options to strip queryterms to work as expected.
- This option is not compatible with other MediaVault options that are doing path string matching or with `fallbackurl`.

## Cookie-based Configuration  {/*cookie-based-configuration*/}
Edgio provides a way of working with MediaVault content authorization parameters in the form of HTTP cookies. This new scheme places the parameters within HTTP cookies after the initial request. In addition, MediaVault provides for the management of sequences of requests by adding incremental expiration to the cookies.

### Parameter Details  {/*parameter-details*/}
The following parameters are available in MediaVault URLs and cookies when the `hashsecret_cookie` setting is enabled.

<Callout type="info">For customers with Configure access to Content Delivery, this setting will be visible in Control in the configuration for the associated Content Delivery Account, under *Additional Options*.</Callout>

- cf: Final expiration. This is defined as the final time that content will be authorized. Expiration times via the "e" parameter will be incremented in cookies until "cf" is reached. After the time specified in cf= is reached, content is unauthorized.

- cd: Delta (in seconds) between the second request and all subsequent requests. In other words, the expiration time ("e" parameter) will be increased by this delta for the life of the content.

- ci: Optional. Initial delta. The time allowed between the start of manifest file delivery and the next request (The time delta used between first and second requests). When this is not present, "cd" is used in its place. This parameter is never present in a cookie.

- cp: Paths. A comma-separated list of paths (that can include wildcards) that are matched against the file path portion of an incoming request to determine if a URL is valid. When this is not present, "cd" is used in its place. This parameter is never present in a cookie.

The following parameters may also be used with cookie-based MediaVault parameters, and will maintain the same function as their URL-based counterparts.

- e: Expiration time. Should a request have an expiration time that is greater than the time a request is received, the request will be considered unauthorized. When cookies are generated, expiration time is either the sum of `current_time + ci` or `current_time + cd`. If ci is present, the first expiration time provided in a cookie will be the former.
- p: Prefix length: Cookie-based MediaVault hashes are computed on both portions of the request URL, as well as the cookie string. This prefix specifies how much of the URL will be used for computing the MD5 digest. Should the "grab_range_from_url" configuration option be specified and no prefix parameter is present, an implicit prefix up to but not including the first slash in a URL with the string "/range/" will be used. This prefix is also used when generating the `Path=` component of a MediaVault cookie.
- ri: Initial rate limit (bytes/sec).
- rs: Rate limit (kbytes/sec).
- h: MD5 hex digest of the URL and MediaVault parameters contained in the cookie. This works in the same way as current MediaVault hashes, except part of the MD5 is computed on the URL (up to the prefix, if present) and the rest via the cookie header sent from a client.

### Example  {/*example*/}
The following sequence of events could take place between a client and a CDN server:

1) The client requests a manifest. The following URL is requested at time 1000000000.

`http://vault.cx.rd.example.com/x/blah.m3u8?p=30&ci=20&cd=5&e=1000000010&cf=100002161 0&h=4c66b14d48e9a42b8b10129aa0ae2799`

This translates to a manifest file request with:

- p: URL prefix of 30 characters (http://vault.cx.rd.example.com/x/).
- ci: Initial delta of 20 seconds.
- cd: Delta of five seconds. This delta will be used in subsequent requests because an initial delta is present.
- e: Expiration time of 1000000010. The manifest request URL is valid until this time.
- cf: Final expiration time. Any requests related to this manifest must be received by the CDN server by this time.
- h: URL hash with secret, in this case:
`md5("secret" + "http://vault.cx.rd.example.com/x/" + "?p=30&ci=20&cd=5&e=1000000010&cf=1000021610")`

2) Given that the request is received at a time earlier than "e", it is considered valid, and a manifest is returned along with a Set-Cookie header:

`Set-Cookie: _llnw_hashsecret=p=30&e=1000000020&cd=5&cf=1000021610&h=ed772eae4d592989bc53aed593a 0dbcb; Path=/x/; HttpOnly`

This translates to:

- p: URL prefix of 30 characters (as above).
- e: A subsequent request must occur by time 1000000020. This is the arrival time `(1000000000) + "ci"`, an initial delta of 20.
- cd: Delta of 5 seconds. Used on calculation of expiration in the next request.
- cf: Final expiration time (as above).
- h: MD5 hash:

`md5("secret" + "http://published.url/x/" + "=p=23&e=1000000020&dcd=5&fcf=1000021610")`

<Callout type="info">The ci parameter is not included in the cookie because it is only used when generating the expiration in the first one.</Callout>

3) A subsequent client request would be without MediaVault parameters in the URL, but in a cookie. The following request arrives at time 1000000010:

`http://example.cx.rd.example.com/x/video.ts/range/2000000-4000000`

With the following cookie header (which was generated in step 2):

`Cookie: _llnw_hashsecret=p=30&e=1000000020&cd=5&cf=1000021610&h=ed772eae4d592989bc53aed593a 0dbcb`

4) Because the arrival time of the request is less than the expiration time specified in the cookie, MediaVault returns the content, and sets a subsequent cookie. The content is not considered expired because the new expiration time is still smaller than the final expiration.

`Set-Cookie: _llnw_hashsecret=p=30&e=1000000015&cd=5&cf=1000021610&h=9c44e95f38c41033147c36714 7cc5f2c; Path=/x/; HttpOnly`

This translates to:

- cd: Delta of five seconds, used to calculate "e" in this request.
- e: The end time is "cd" (five seconds) added to the time the request was received, 1000000010, a total of 1000000015.
- h: The new hash:

`md5("secret" + "http://vault.cx.rd.example.com/x/" + "=p=30&e=1000000015&cd=5&cf=1000021610")`

<Callout type="info">(Other parameters remain the same as above)</Callout>

5) The client and MediaVault continue this process until content is no longer desired or time passes what is specified in the final expiration parameter.

**Notes**
-   In the case of HTTPS requests, the cookie will have a "Secure" parameter appended to it.
-   The Expiration field of the cookie will be 120 seconds after the expiration time listed in the "e" parameter of the authorization string.
-   In the absence of a prefix `(p=0)`, for cookie-based requests, the entire URL along with the authorization string (up to the MD5 hash) will be used for computing hashes. The exception to this case is as noted above when a range is obtained from the URL path.
-   The path field in the Set-Cookie header will be truncated by the prefix provided when valid. Should a prefix fall in the middle of a path, the path will be truncated to the leftmost slash relative to the prefix.
-   It is not permitted to have a "ci" parameter without a "cd" parameter.
-   In the case that both a URL and a cookie have parameters, the parameters in the URL will be attempted first. Should authorization fail due to expiration (a "soft" failure), the cookie parameters will be attempted. If authorization fails on a URL due to a bad hash computation, a cookie will not be attempted if present.

## URL-Based Main and HLS Sub Manifests {/*url-based-manifests*/}
For the special case of HLS, you can MediaVault both the main manifest URL and the sub-manifest URLs. Note that the segments are still allowed to pass through the edge without MediaVault protection. This option still protects the main manifests of MSS, HDS, and DASH playback URLs. Only HLS sub-manifests are added for this option.

How to generate the request URLs:

1. Take the main manifest URL and remove the `/manifest.m3u8` string.

2. Count the number of characters remaining in the URL.

3. Calculate the expiration time in seconds of epoch time.

4. Create a string that has: `sharedsecret + URL without /manifest + ?p=<char count>&e=<expiration in epoch time>`.

5. Use an MD5 generator on the resulting string. The same hash is to be used on the main and sub manifest requests.

Example: With a shared secret of "flamingo",

```
md5

("flamingohttp://mmdprod005.mmdlive.lldns.net/mmdprod005/8ea26462f7144c029999624f1819fd21?p=81&e=1464678000")
```
