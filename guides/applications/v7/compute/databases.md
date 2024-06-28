---
title: Connecting {{ PRODUCT }} Compute with Databases
---

{{ PRODUCT }} Cloud and Edge Functions can connect to any database available through an internet address. This includes AWS database services like RDS (MySQL, Postgres), Elastic Cache, DynamoDB, and other databases like MongoDB, Redis, etc.

{{ PRODUCT }} customers can use secret Environment Variables to store database credentials. The values of secret Environment Variables are available to both Edge Functions and Cloud Functions.

Since Cloud Functions are regionally provisioned, it is recommended that customers provision their Cloud Functions and databases in the same region or as close as possible for the best latency performance.

### AWS RDS {/* aws-rds */}

Any database available on a public internet address can be accessed from {{ PRODUCT }} Cloud Functions without modification. Just use a Node.js compatible driver package and follow the instructions. For example, the [Postgres package](https://github.com/porsager/postgres?tab=readme-ov-file#connection) can be used to connect to an AWS RDS PostgreSQL database.

For additional security, it is recommended that customers only allow database connections from their own infrastructure and {{ PRODUCT }} Cloud. Denying connections from other IP addresses will prevent password guessing and other brute-force attacks. More information on access control using Security Groups can be found [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.RDSSecurityGroups.html).

{{ PRODUCT }} Cloud IP address ranges can be found in {{ PRODUCT }} Console -> Organization -> Property -> Environment -> Origins.

### AWS DynamoDB {/* aws-dynamodb */}

Customers can use AWS SDK v3 for Node.js to interact with AWS DynamoDB. More information can be found in the [AWS SDK v3 documentation](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html).

AWS DynamoDB uses AWS v4 signature for access control. To create credentials for {{ PRODUCT }} Cloud Functions, customers will need to create a new AWS IAM user and attach permissions that grant access to the particular DynamoDB table. A guide on creating an AWS IAM policy can be found [here](https://aws.amazon.com/blogs/security/how-to-create-an-aws-iam-policy-to-grant-aws-lambda-access-to-an-amazon-dynamodb-table/).

Once an `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` credentials pair has been created, customers can add those as secret Environment Variables in the {{ PRODUCT }} Console.

<Important>

{{ PORTAL }} doesn’t allow Environment Variable names to begin with `AWS_`, so it is recommended to prefix your credentials Environment Variables like `DB_AWS_ACCESS_KEY_ID` and `DB_AWS_SECRET_ACCESS_KEY`.

</Important>

Then those credentials can be used with the AWS SDK v3 like so:

```javascript
const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.DB_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_AWS_SECRET_ACCESS_KEY,
  },
});
```

This will provide access to all DynamoDB operations in {{ PRODUCT }} Cloud Functions as long as they’re permitted by AWS IAM policy.

### MongoDB

Connecting to MongoDB is possible using the Node.js driver. A guide will be available soon.

## Edge Functions

{{ PRODUCT }}’s Edge Functions are different from Cloud Functions in several ways:

- Edge Functions use a minimal JavaScript runtime and don’t support all of Node.js APIs.
- Edge Functions can only make HTTP(s) requests and cannot make arbitrary TCP and UDP connections.
- Edge Functions can only make HTTP(s) requests to a set of origins predefined by the customer.

While additional functionality is being added to Edge Functions, it is possible to interact with databases using Edge Functions. Databases like AWS DynamoDB, MongoDB by Atlas, Turso, and others provide an HTTP-based API that can perform the same operations as their TCP counterparts.
