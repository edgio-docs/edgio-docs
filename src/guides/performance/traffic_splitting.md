---
title: Traffic Splitting 
---

Traffic splitting allows you to distribute site traffic for the purpose of:

-   A/B testing (aka split testing).
-   Iterative site migrations.
-   Gradual site build-outs.
-   Improving performance through region-based origin routing.

By default, a request identifies:

-   A hostname (e.g., www.example.com) associated with your property. All traffic for this hostname is directed at a single origin configuration (e.g., web).
-   A relative path (e.g,. /images/bunny.png). 

Traffic splitting allows you to distribute a hostname's traffic across multiple origin configurations. It also allows you to rewrite or redirect requests to an alternate path. This flexibility allows you to tailor traffic splitting to fit your implementation. 

## Quick Start

Setting up traffic spliting involves performing the following steps:

1.  Create a rule that identifies a set of requests and how those requests will be handled.

    The specifics on how to set up this rule vary according to your implementation. For example, the following rule sends half of your site's traffic to a different origin configuration:

    ![Traffic Splitting Example](/images/v7/performance/traffic-splitting-50-50.png?width=450)

    <Callout type="info">

      In this example, the Random Integer feature is configured to randomly assign each request that originates within the United States to a random value from 0 to 100. If the value assigned to a request is less than `50`, this rule will override your default origin configuration and send it to a different one. As a result, your traffic will be evenly split between two origin configurations.

    </Callout>
    
2.  Deploy your changes.

<Callout type="important">

  If you are splitting traffic for the purpose of A/B testing, iterative site migrations, or gradual site build outs, then you may need to split traffic based off a cookie to ensure a consistent experience throughout the user's session. 

</Callout>

## Traffic Splitting by Session Tutorial

There are many situations under which you should split traffic for the entire user's session. For example, if you are testing a new UI design, then certain resources (e.g., CSS, JS, and HTML files) should persist throughout a user's session to ensure a consistent experience. One way of ensuring that all traffic for a specific user session is to set a cookie on the initial request. You could then check for that cookie to ensure that only those requests are sent to an alternate path or origin configuration.

### Create a Set Cookie Rule

Create a rule that sets a cookie for the desired set of users. In this case, we will create a rule that sets a cookie for 10% of requests directed to your site's homepage.

<Callout type="info">

  This tutorial assumes that you have not defined rules for your property.

</Callout>

1.  Create a rule.

    1.  Navigate to the **Rules** page for the desired environment.
    2.  Click **+ Add Rule**.

2.  Add a condition that identifies requests to your website.

    1.  Click **+ Add Condition**.
    2.  From the **Variable** option, select `Path`.
    3.  Set the **Value** option to `/`.
    4.  Click **Add Condition**.

3.  Add a condition that identifies 10% of your traffic.

    1.  Click **+ Add Condition**.
    2.  From the **Variable** option, select `Random Integer`.
    3.  Set the **Random Integer Range (from 0 to ?)** option to `100`.

        <Callout type="info">

          This configuration requires {{ PRODUCT }} to assign a random integer from 0 to 100 to each request.

        </Callout>

    4.  Set the **Operator** option to `less than`.
    4.  Set the **Value** option to `10`.

        <Callout type="info">

          This configuration will only be satisfied when the random integer assigned to a request is less than `10`. This should only happen approximately 10% of the time when requests are randomly assigned 101 different values (i.e., 0 to 100).

        </Callout>

    5.  Click **Add Condition**.

4.  Add a feature that sets a cookie.

    1.  Click **+ Add Feature**.
    2.  Select `Set Response Headers`.
    3.  Set the **Header Name** option to `Set-Cookie`.
    4.  Set the **Value** option to `newExperience=true`.
    5.  Click **Add Feature**.

### Create a URL Rewrite Rule

Create a rule that rewrites requests for an alternate UI experience.

1.  Create a rule by clicking **+ Add Rule**.

2.  Add a condition that identifies requests for the new UI experience.

    1.  Click **+ Add Condition**.
    2.  From the **Variable** option, select `Cookie`.
    3.  Set the **Cookie Name** option to `newExperience`.
    4.  Set the **Value** option to `true`.
    5.  Click **Add Condition**.

3.  Add a feature that rewrites URLs to a path that contains resources for the new UI experience.

    1.  Click **+ Add Feature**.
    2.  Select `Rewrite URL`.
    3.  Set the **Source Path (Optional)** option to `/:path*`.
    4.  Set the **Destination Path** option to the path where the resources for the new UI experience are located (e.g., `/newexperience/:path*`).
    5.  Click **Add Feature**.

    Your rules should now look similar to this:

    ![Traffic splitting by session rules](/images/v7/performance/traffic-splitting-session-tutorial-complete.png)

5.  Deploy your changes by clicking **Deploy Changes**.