## End-of-Life for Node.js 16 Support {/*end-of-life-for-node-js-16-support*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}'s support for Node.js version 16 is undergoing end-of-life. Key dates are listed below.

| Date      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| 7/15/2024 | Block deployments for new properties that use Node.js 16.      |
| 8/15/2024 | Block deployments for existing properties that use Node.js 16. |

If you are currently using Node.js version 16, then we strongly recommend that you perform the following steps prior to the above deadlines:
1.  Upgrade your application to use Node.js version 18 or 20. 
2.  Upgrade the {{ PRODUCT }} CLI and {{ PRODUCT }} dependencies in your project to v7.4.0 or later. We strongly recommend upgrading it to the latest version.

<Condition version="<=6">
  [Learn how to upgrade to version 7.](https://docs.edg.io/guides/v7/upgrading/upgrading)
</Condition>