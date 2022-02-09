---
title: Cookies
---

This guide covers the cookies that {{ PRODUCT_NAME }} creates and uses.

## Split Testing Cookies

- `{{ COOKIE_PREFIX }}_bucket`: a number between 1 and 100 randomly assigned by {{ PRODUCT_NAME }} to all clients connecting to it. It is a long-lived non-session cookie allowing predictable cohorts during split testing. Its value is not accessible from client-side JavaScript code.
- `{{ COOKIE_PREFIX }}_destination`: the name of the experience to which split testing has assigned the user based on the value of `{{ COOKIE_PREFIX }}_bucket`. Its value is accessible to client-side JavaScript code and can thus be safely included in client-side metrics.
