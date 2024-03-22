---
title: Cross-Environment Traffic Splitting
---

You may use Experimentation to send traffic to another environment either within the same or a different property. 

One use for this capability is to migrate iteratively from a legacy to a new site. Validate a new feature by sending some production traffic to an environment where that new feature is hosted. 

[View iterative migration example.](/guides/experimentation/iterative_migration)

<Callout type="info">

    If you are using either {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or Edge Functions and you are proxying traffic to a different environment within the same property, then you may incur additional latency. A workaround for this issue is to proxy traffic between the production environments of two different properties.

    {{ PRODUCT }} {{ PRODUCT_PLATFORM }} and Edge Functions may run in a different region for the production environment than other environments. If you are sending traffic between these environments, then latency is introduced due to traffic being routed between two regions. 

</Callout>

## How Does Proxying Traffic Work? {/*how-does-proxying-traffic-work*/}

{{ PRODUCT }} processes all requests using our [standard order of operations](/guides/v7/performance/request#order-of-operations). However, traffic that is sent to another environment will be processed by the rules for both environments as indicated below. 

-   **Source Environment:** {{ PRODUCT }} will apply the source environment's rules to the request. 
-   **Target Environment:** {{ PRODUCT }} will only apply features that affect the response sent to the client. These features take precedence over the ones defined within the source environment's rules.

In addition to rule processing, you may choose to add custom logic to your origin server that alters the behavior based off of the host requested by the client.

## Setup {/*setting-up-cross-environment-traffic*/}

The two basic methods for routing traffic to multiple environments are:

-   **Dedicated Routing Environment:** Use the environment that contains your hostnames to route traffic. The rules defined within this environment should be applicable to all traffic. Set up an experiment on this environment to route traffic to multiple environments. For example, you can route traffic to an environment that contains your current site and another environment that contains your new site.

    ![Dedicated Routing Environment](/images/v7/experimentation-routing-environment.png)

-   **Shared Environment:** Use the environment that contains your hostnames and your site's configuration to route traffic. Set up an experiment on that environment to route traffic to another environment. For example, you can route traffic to another environment for the purpose of A/B testing a new feature.

[Learn how to set up environments through the iterative migration example.](/guides/experimentation/iterative_migration)

### Target Environment Setup

Once you have decided whether you want to use a dedicated or shared environment, you will need to deploy a configuration to each environment to which traffic will be routed. These environments are known as your target environments. For example, you can deploy the configuration for your legacy site to one environment and the configuration for your new site to a different environment. 

After which, you should note the domain associated with each deployment's edge link. Sample domains are highlighted below.

![Edge Link's Domain](/images/v7/experimentation-cross-env-experiment-edge-link.png?width=650)

### Source Environment Setup

Source environment setup consists of performing the following steps:

1.  Create an origin configuration each for each target environment.
2.  Optional. Log the `Host` header to identify traffic routed through the source environment.
3.  Set up an experiment with variants that route traffic to the desired target environment(s).

#### Origin Configuration

Create an origin configuration within the source environment. 

-   Set the **Origin Hostname** and **Override Host Header** options to a target environment's domain.
-   Verify that the **Use the following SNI hint and enforce origin SAN/CN checking** option was autopopulated with the same domain.

Your origin configuration should look similar to the following illustration:

![Source Environment's Origin Configuration](/images/v7/experimentation-cross-env-experiment-origin-configuration.png?width=650)

#### Host Header Logging

Set up custom logic when traffic is routed from the source environment by creating a rule that sets the host requested by the client (`%{http_host}`) within the `x-forwarded-host` request header.

![Set Request Headers Feature](/images/v7/experimentation-cross-env-experiment-host.png)

After which, you should define custom logic within your code to handle requests that originate from the source environment.

#### Experimentation Setup

Create an experiment within the source environment. Configure each desired variant to point to an origin configuration that points to the desired environment. 

![Set Origin Feature](/images/v7/experimentation-cross-env-experiment-set-origin.png)

Your experiment should look similar to the following illustration:

![Cross-Environment Experiment](/images/v7/experimentation-cross-env-experiment.png?width=650)

Deploy your changes to the source environment.

<Callout type="info">

  The variant assigned to a client persists until cookies are cleared. This means that testing this experiment may require clearing your cookies various times or initiating various distinct private browsing sessions. 

</Callout>