---
title: Cookies
---

This guide covers the cookies that {{ PRODUCT_NAME }} creates and uses.

## A/B Testing Cookies {/*split-testing-cookies*/}

- `{{ COOKIE_PREFIX }}_bucket`: a number between 1 and 100 randomly assigned by {{ PRODUCT_NAME }} to all clients connecting to it. It is a long-lived non-session cookie allowing predictable cohorts during A/B testing. Its value is not accessible from client-side JavaScript code.
- `{{ COOKIE_PREFIX }}_destination`: the name of the experience to which A/B testing has assigned the user based on the value of `{{ COOKIE_PREFIX }}_bucket`. Its value is accessible to client-side JavaScript code and can thus be safely included in client-side metrics.
