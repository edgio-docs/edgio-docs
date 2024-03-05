## End-of-Life for Node.js 16 Support {/*end-of-life-for-node-js-16-support*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }}'s support for Node.js version 16 is undergoing end-of-life. 

[View the official OpenJS Foundation announcement.](https://nodejs.org/en/blog/announcements/nodejs16-eol)

Key dates are listed below.

| Date      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| 7/15/2024 | Block deployments for new properties that use Node.js 16.      |
| 8/15/2024 | Block deployments for existing properties that use Node.js 16. |

If you are currently using Node.js version 16, then you must perform the following steps:
1.  Upgrade your application to use Node.js version 18 or 20. 
2.  Upgrade the {{ PRODUCT }} CLI and {{ PRODUCT }} dependencies in your project to v7.4.0 or later. We strongly recommend upgrading it to the latest version.

<Condition version="<=6">
  [Learn how to upgrade to version 7.](/guides/upgrading/upgrading)
</Condition>