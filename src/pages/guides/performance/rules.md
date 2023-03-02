---
title: Request Handling through Rules
---

Rules determine how requests for a specific environment will be processed.

**Common Uses:**

-   Proxy requests to your origin or to Serverless Compute.
-   Define when requests will be prefetched.
-   Override or define a custom cache policy.
-   Secure or deny requests for sensitive content.
-   Redirect requests.
-   Store custom log data.

## Quick Start

Set up your rules through the following steps:

1.  Identify the environment that will be configured.
2.  Define one or more rule(s) for that environment. Each rule should contain at least one feature.
3.  Apply your rules to that environment by deploying your changes.

## Rules and CDN-as-Code

You may either manually generate rules through the {{ PORTAL }} or {{ PRODUCT }} can automatically generate them for you when you deploy your [CDN-as-Code configuration](/guides/performance/cdn_as_code).

![Rules and CDN-as-Code](/images/performance/rules-cdn-as-code.png)

## Rules

A rule:

-   Identifies a set of requests through conditions. 

    A rule is only applicable to requests that satisfy all of its conditions. By default, a new rule applies to all requests since it does not contain conditions.

-   Defines how requests will be processed through features. A feature identifies an action and how it will be applied to requests.

For example, the following rule applies a caching policy to all `GET` requests whose relative path starts with `/marketing/`.

![Rule Example](/images/performance/rule-condition-feature-example.png)

### Conditions

A condition identifies a set of requests. Setting up a condition typically involves defining a relationship between a variable and a value.

-   **Variable:** A variable identifies the type of condition through which requests will be identified. 

    For example, you may identify requests by HTTP method, path, or request headers.

-   **Operator:** An operator defines the relationship between a variable and a value. Valid values are:

    -   **Equals:** A request satisfies this condition when an exact match to the specified value is found.
    -   **Does Not Equal:** A request satisfies this condition when an exact match to the specified value is not found.
    -   **Matches:** A request satisfies this condition when it contains a value that matches the [Perl-compatible regular expression](https://pcre.org/) defined within the **Match Value** option.
    -   **Does Not Match:**  A request satisfies this condition when it contains a value that does not match the Perl-compatible regular expression defined within the **Match Value** option.
    -   **In:** A request satisfies this condition when an exact match to one of the values defined within the **Match Value** option is found.
    -   **Not In:** A request satisfies this condition when an exact match to one of the values defined within the **Match Value** option is not found.

-   **Value:** A value defines what a variable will be matched against. 

    For example, sample values for the `Method` variable are `POST` and `PUT`.

**Example:**

Identify all GET requests through the following condition:
-   **Variable:** Method
-   **Operator:** Equals
-   **Match Value:** GET

[Learn more about types of conditions.](/guides/performance/rules/conditions)

### Features

A feature determines how requests will be processed. Setting up a feature typically involves selecting a category, selecting the desired feature, and then configuring it.

[Learn more about types of features.](/guides/performance/rules/features)

##  Rule Precedence

You may create multiple rules. The use of multiple rules facilitates:

-   The setup of a default configuration that will be applied to all requests.
-   The creation of rules that specialize according to request type or behavior.
-   Additional control over how requests for content are handled.

Rules are typically processed in the order that they are listed. If a request satisfies the criteria for multiple rules, then all of the features associated with those features will be applied to the request. This could lead to a situation where conflicting actions will take place. In such a case, the last action to take place will take precedence over previous actions. Therefore, it is recommended to place rules that should take precedence as close to the bottom of the list as possible.

<Callout type="tip">

  Move a rule by dragging the rule's <img data-inline-img src="/images/icons/grab-handle.png" alt="" /> icon to the desired position.

</Callout>

A good rule of thumb when determining where a rule should be positioned is to order rules according to the level of detail in the criteria. Rules with general criteria should be placed closer to the top of the list, while more detailed criteria should be placed closer to the bottom. This type of configuration allows catch-all rules to assign default handling behavior for your assets without interfering with the manner in which specific types of assets are handled.

![Order of Precedence](/images/performance/rules-order-of-precedence.png)

### Exceptions to Rule Precedence

The following cases are exceptions to the order-based rule precedence stated above:

-   **Identical Matching Criteria:** If multiple rules share the same matching criteria, then the actions associated with those rules will take place at the same time. Thus, a rule at the bottom could be combined with a rule at the top of the list. This type of situation would prevent the rule at the bottom from taking precedence over other rules.

-   **URL Rewrite Precedence:** The URL Rewrite feature takes precedence when multiple features will be applied to a request. This occurs regardless of rule order.

    **Example:** In this sample scenario, a policy contains two rules. The first rule applies the URL Redirect feature, while the second one applies the URL Rewrite feature. If a request satisfies both rules, then the URL Rewrite feature will always be applied to a request before the URL Redirect feature.

-   **Token Auth Precedence:** The Token Auth feature takes precedence over most features with the exception of the URL Rewrite feature. This occurs regardless of rule order.

## Sample Scenario

In this sample scenario, create the following rules:

| Order | Purpose                                                   | Description                              |
|-------|-----------------------------------------------------------|------------------------------------------|
| 1     | Assign a default cache policy for all requests.           | Placing this rule at the top of the list ensures that this cache policy is assigned by default to all requests.  |
| 2     | Define an alternative cache policy based on origin type.  | The rule's position allows it to override the default behavior defined in the first rule for requests to a specific origin.  |
| 3     | Deny access based on the requester's location.            | This rule denies access for requests that originate from a specific location. Although this rule does not contradict the above two rules, segregating these instructions improves readability and facilitates rule management. |

<Callout type="info">

  Rule order can drastically affect how requests are handled. In the above example, moving the default cache policy rule below the other rules will nullify the cache policy defined by origin type.

</Callout>

## Managing Rules

You may create, modify, and delete rules.

**Key information:**

-   You may only administer rules when you are in draft mode. If you are in read-only mode, you may enter draft mode by clicking **Edit v#**. 

TODO: **Is this needed now that we have autodraft?**

-   Draft mode allows you to make changes without affecting an environment's traffic. This allows you to collaborate with other team members when setting up rules and to stage changes until they are needed. 

    For example, a sales event may require URL redirects or a different caching policy than standard site traffic. You can stage these changes until they are needed for the sales event.

-   Apply your changes to the current environment by clicking **Deploy Changes**.
-   Add a comment or a note to a rule by clicking **Add Comments** and then typing the desired message. Comments or notes are  informational and do not affect your configuration. 
-   An alternative method for setting up your configuration is [CDN-as-code](/guides/performance/cdn_as_code). CDN-as-code is a developer-oriented solution that provides more flexibility during CDN setup. You may create a base CDN-as-code configuration by setting up your rules through the {{ PORTAL }}, [exporting them as EdgeJS code](#export-rules-edgejs), and then pasting that code into your {{ ROUTES_FILE }} file. 

    <Callout type="info">

      The **Rules** page will display a complex CDN-as-code configuration in JSON format. You may modify the JSON directly within the **Rules** page or your {{ ROUTES_FILE }} file. 

    </Callout>

**To set up rules**

1.  Load the **Rules** page.
    1.  From the {{ PORTAL }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Rules**. 
2.  If you are in read-only mode, click **Edit v#**
3.  Add a rule by clicking **+ Add Rule**.
4.  Add a condition that defines the set of requests for which this rule will be applied. Repeat this step as needed.
    1.  Click **+ Add Condition**.
    2.  From the **Variable** option, select the method by which requests will be identified. 
    3.  From the **Operator** option, define the relationship between the variable selected in the previous step and the value that will be defined in the next step.
    4.  In the **Match Value** option, define a value that will be compared against for each request. 
    5.  Click **Add Condition**.
5.  Add a feature that determines how the requests defined in the previous step will be processed. Repeat this step as needed.
    1.  Click **+ Add Feature**.
    2.  From the **Feature Type** option, select the category that best corresponds to the desired feature.
    3.  From the **Feature** option, select the desired feature.
    4.  Configure the selected feature.
    5.  Click **Add Feature**.
6.  Add more rules as needed by repeating steps 5 - 7.
7.  Review your rules to verify how requests will be handled and the order in which rules will be applied to requests. 

    <Callout type="tip">

      Move a rule by dragging the rule's <img data-inline-img src="/images/icons/grab-handle.png" alt="" /> icon to the desired position.

    </Callout>

8.  Click **Deploy Changes**.

**To delete a rule**

1.  Load the **Rules** page.
    1.  From the {{ PORTAL }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Rules**. 
2.  Click the <img data-inline-img src="/images/icons/delete-2.png" alt="" /> icon next to the desired rule.
3.  Confirm the deletion by clicking **Delete Rules**.

**To export your rules as EdgeJS code** <a id="export-rules-edgejs" /> 

1.  Load the **Rules** page.
    1.  From the {{ PORTAL }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Rules**. 
2.  Click **Export**.
3.  Select **EdgeJS**.
4.  Copy the code by clicking the <img data-inline-img src="/images/icons/copy-to-clipboard.png" alt="" /> icon.
5.  Optional. Paste your code into your {{ ROUTES_FILE }}.

<Callout type="info">

  Deploying your CDN-as-code configuration through the {{ PRODUCT }} CLI will overwrite your rules. Likewise, deploying rule changes from the {{ PORTAL }} will override a previously deployed CDN-as-code configuration.

</Callout>