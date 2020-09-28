# Cookies

This guide covers the cookies that Moovweb XDN creates and uses.

## Split testing cookies

* `xdn_bucket`: a number between 1 and 100 randomly assigned by Moovweb XDN to all clients connecting to it; it is a long-living non-session cookie allowing predictable cohorts during split testing; its value is not accessible from client-side JavaScript code
* `xdn_destination`: the name of the user experience to which the split testing has assigned the user based on the value of `xdn_bucket`; its value is accessible to client-side JavaScript code and can thus be safely levaraged from client-side metrics
