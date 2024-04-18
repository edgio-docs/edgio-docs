## End-of-Life for Node.js 16 Support {/*end-of-life-for-node-js-16-support*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}'s support for Node.js version 16 is undergoing end-of-life. Starting from 7/15/2024, we will no longer support properties that use Node.js version 16. Specifically, you will be prohibited from deploying changes to those properties.

If you are currently using Node.js 16, then we strongly recommend that you perform the following steps prior to 7/15/2024:
1.  Upgrade your application to use Node.js 18 or 20.
2.  Upgrade the {{ PRODUCT }} CLI and {{ PRODUCT }} dependencies in your project to <Condition version="<=6">either v6.2.0 or </Condition>v7.4.0 or later. We strongly recommend upgrading it to the latest version.

<Condition version="<=6">
  <Callout type="info">

    Although {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} v6.2.0 includes support for Node.js 18, we strongly recommend upgrading to version 7 to take advantage of new functionality, such as [real-time analytics (Edge Insights)](/applications/v7/performance/observability/edge_insights), our new flexible [log delivery solution (RTLD)](/applications/v7/logs/rtld), [enhanced traffic splitting (Experimentation)](/applications/v7/experimentation), [Edge Functions](/applications/v7/edge_functions), and our latest [{{ PRODUCT_SECURITY }} offerings](/applications/v7/security/waf).

  </Callout>

    [Learn how to upgrade to version 7.](/applications/v7/upgrading/upgrading)
</Condition>
