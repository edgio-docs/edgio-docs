# Prefetching

The XDN allows you to speed up the user's browsing experience by prefetching pages and API calls that they are likely to need.

Prefetching can create a substantial amount of extra traffic for your origin servers. You can send an `x-xdn-prefetch` request header with a value of `1` to indicate that
the XDN should only serve a response if it is already in the cache. This allows the cache to gradually fill up as users browse around the app and
can greatly reduce the pressure on your origin servers.

When the XDN recieves a request with `x-xdn-prefetch` that is not cached, it will return `412` status.
