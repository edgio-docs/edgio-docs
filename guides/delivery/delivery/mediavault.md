---
title: {{MEDIAVAULT}}
---
<!-- do not link to this page
do table with topic/ description -->
MediaVault is a high-performance, server-side authentication service used to assist you in securing your content from unauthorized views. The system uses cryptographic hashing based on the MD5 algorithm. The algorithm is designed so that any changed byte of the hash propagates new changes throughout the remainder of the calculation. The result is a completely different hash that is nearly impossible to break.

MediaVault is scalable because all verification requirements are stored within the URL itself. This small service is easily inserted into the Edgio CDN architecture, allowing local validation at the level of the proxy caches. Bottleneck conditions are significantly reduced due to independence from a central service, such as a verification server.

MediaVault is not a replacement for digital rights management (DRM) and should not be associated with user authentication. However, it can protect content from unauthorized viewing on a broader basis, and it can, more specifically, designate a "start time" and an "end time" for content availability.

## Workflow   {/*workflow*/}
1. Determine which MediaVault query string parameters and values you want to add to your protected URLs.
2. Create a server-side script or application that will convert unprotected URLs into MediaVault URLs. For each URL, the script should:
    - For each MediaVault parameter you chose (except the "&h=" parameter), calculate the values of the parameter if necessary, and append it to the URL query string.
    - Create a hash value based on the MD5 of the modified URL and the shared secret.
    - Append the "&h=" parameter and the hash value to the URL.
    - Publish the protected URL in place of the original URL.

## Cached Query Terms  {/*cached-query-terms*/}
By default, MediaVault instructs the Content Delivery service to strip all HTTP and HTTPS query terms before caching an object.

If there are specific query terms that your origin server uses to respond with different content, and which should therefore be retained to differentiate your objects in cache, you can enter them directly in the *Caching Rules* section of the *Configure* menu in the Control portal.

<Callout type="info">Query-term stripping is applied only to cached objects and does not affect requests to origin. All query terms, including MediaVault -specific terms, are included in origin requests.</Callout>

### Guide Topics {/*guide-topics*/}
|Topic| Description|
|---|---|
|[MediaVault Parameters](/delivery/delivery/mediavault/mediavault_parameters)|This section lists and describes all MediaVault parameters. Not all parameters are supported for all services.|
|[Path- and Cookie-based Configs](/delivery/delivery/mediavault/path_and_cookie_based_mediavault)|This feature allows you to use MediaVault to secure media streams via path-based tokenized support. Use this method to embed security tokens in the path for streaming media as an alternative to cross-site cookies to prevent browsers from interfering with the functionality.|
|[Security](/delivery/delivery/mediavault/security)|The Security section applies to MediaVault for HTTP.|
|[File Extensions](/delivery/delivery/mediavault/file_extensions)|When downloading a file with a MediaVault-hashed URL, most HTTP clients will name the resulting file with the filename and the trailing query parameters (i.e., the entire string after the last slash of the URL). This may make the file type unknown to some Operating Systems that rely on the file extension at the end of the filename to do so, as the file extension will be the expected extension and all the query parameters. To prevent this from occurring, append the extension with a query string value at the end of the URL (e.g., &file=.exe) so that the expected file extension appears at the end of the query parameters.|
|[Selective URL Handling](/delivery/delivery/mediavault/selective_url_handling)|This option allows you to specify which queryterms are to be included in the authentication. The queryterms in the list will be used in the authentication if they are present in the URL. The list does not indicate required queryterms that must be present in the URL. The option has flags to control its behavior.|
