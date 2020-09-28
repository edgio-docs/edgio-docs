# Cookies

This guide covers the cookies that Moovweb XDN creates and uses.

## Split testing cookies

* `xdn_bucket`: a number between 1 and 100 randomly assigned by the Moovweb XDN to all clients connecting to it. It is a long-lived non-session cookie allowing predictable cohorts during split testing. Its value is not accessible from client-side JavaScript code.
* `xdn_destination`: the name of the experience to which split testing has assigned the user based on the value of `xdn_bucket`. Its value is accessible to client-side JavaScript code and can thus be safely included in client-side metrics.
