<Callout type="warning">
  
  You may define the `origins` configuration at the root or within an environment-specific object (e.g., `environments.production.origins[0]`). Defining it at the root may overwrite your origin configurations for the environment to which your build is being deployed. If your environments use different origin configurations, we recommend that you define it within an environment-specific object.

  See [Environments](/guides/basics/environments) for more information on configuring multiple environemnts and origins for your property.

</Callout>
