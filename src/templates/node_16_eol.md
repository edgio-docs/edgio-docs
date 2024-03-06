## End-of-Life for Node.js 16 Support {/*end-of-life-for-node-js-16-support*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}'s support for Node.js version 16 is undergoing end-of-life. Starting from 7/15/2024, we will no longer support properties that use Node.js version 16. Specifically, you will be prohibited from deploying changes to those properties. 

If you are currently using Node.js 16, then we strongly recommend that you perform the following steps prior to 7/15/2024:
1.  Upgrade your application to use Node.js 18 or 20. 
2.  Upgrade the {{ PRODUCT }} CLI and {{ PRODUCT }} dependencies in your project to v7.4.0 or later. We strongly recommend upgrading it to the latest version.

<Condition version="<=6">
  <Callout type="info">
  
    Although an upcoming release of {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} v6 will include support for Node.js 18, we strongly recommend upgrading to version 7 to take advantage of new functionality, such as [real-time analytics (Edge Insights)](https://docs.edg.io/guides/v7/performance/observability/edge_insights), our new flexible [log delivery solution (RTLD)](https://docs.edg.io/guides/v7/logs/rtld), [enhanced traffic splitting (Experimentation)](https://docs.edg.io/guides/v7/experimentation), [Edge Functions](https://docs.edg.io/guides/v7/edge_functions), and our latest [{{ PRODUCT_SECURITY }} offerings](https://docs.edg.io/guides/v7/security/waf). 
  
  </Callout>

    [Learn how to upgrade to version 7.](https://docs.edg.io/guides/v7/upgrading/upgrading)
</Condition>