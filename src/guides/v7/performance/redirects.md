---
title: Redirects
---

Redirect URLs through one of the following methods:
-   **Rules:** Rules allow you to define how a URL will be redirected through the [URL Redirect feature](/guides/performance/rules/features#url-redirect). This feature is especially useful when URL redirects should only occur under specific conditions. 
-   **CDN-as-Code:** If you are using CDN-as-code, then you should define URL redirects through the [url.url_redirect feature](/guides/performance/cdn_as_code/route_features#redirecting).
-   **Location Header:** Use the `Location` response header to instruct clients to redirect to a different URL. Alternatively, you can instruct {{ PRODUCT }} to follow a redirect defined within a `Location` header provided by the origin through the [Follow Redirects feature](/guides/performance/rules/features#follow-redirects) ([follow_redirects](/docs/api/core/interfaces/types.Url.html#follow_redirects)).
-   **Edge Functions:** Edge Functions allow you to [intelligently redirect URLS](/guides/edge_functions/example_redirects). 
-   **Bulk Redirects:** Use this capability to define a list of URLs that will be redirected. In addition to managing URL redirects on an individual basis, you may export and import a list of URL redirects.

## Bulk Redirects {/*bulk-redirects*/}




