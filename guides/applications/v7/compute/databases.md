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

#### Quick Start {/* aws-rds-quick-start */}

Prepare your project by installing the following packages:

<PackageCommand>

```
npm install postgres dotenv
---
yarn add postgres dotenv
```

</PackageCommand>

Additionally, create a `.env` file in the root of your project with the following content:

```plaintext
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
```

Modify `{{ CONFIG_FILE }}` to use the `dotenv` package to load the `.env` file. This will make the database credentials available as Environment Variables for local development. Be sure to add these Environment Variables to the {{ PORTAL }} for production.

```javascript filename="{{ CONFIG_FILE }}"
require('dotenv').config();

// ... rest of the configuration
```

Next, define a cloud function that will handle the database connection and interaction. In the following sample, the function queries a PostgreSQL database for vehicle makes and models and returns the results as an HTML table.

```javascript filename="./cloud-functions/db.js"
import postgres from 'postgres';

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function dbHandler(req, res) {
  try {
    const data = await sql`
      SELECT
        vm.model_id,
        vm.model_name,
        v.make_name
      FROM
        vehicle_models vm
      JOIN
        vehicle_makes v ON vm.make_id = v.make_id;
    `;

    let html = `
      <html>
      <head>
        <title>Vehicle Makes and Models</title>
        <style>
          table {
            width: 50%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <h1>Vehicle Makes and Models</h1>
        <table>
          <tr>
            <th>Model ID</th>
            <th>Model Name</th>
            <th>Make Name</th>
          </tr>`;

    data.forEach((row) => {
      html += `
          <tr>
            <td>${row.model_id}</td>
            <td>${row.model_name}</td>
            <td>${row.make_name}</td>
          </tr>`;
    });

    html += `
        </table>
      </body>
      </html>`;

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.body = html;
  } catch (error) {
    console.error('Error querying the database:', error);
    res.statusCode = 500;
    res.body = 'Internal Server Error';
  }
}
```

Lastly, configure the router to handle requests to the database function.

```javascript filename="./routes.js"
import {Router, edgioRoutes} from '@edgio/core';
import {dbHandler} from './cloud-functions/db';

export default new Router()

  // Handle requests to `/some-path` using the `dbHandler` cloud function
  .match('/some-path', ({compute}) => {
    compute(dbHandler);
  })

  // plugin enabling basic Edgio functionality
  .use(edgioRoutes);
```

![AWS RDS Example Output](/images/v7/compute/aws-rds-example-output.png)

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
