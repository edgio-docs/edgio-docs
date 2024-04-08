---
title: Request Handling through Rules
---

Rules determine how requests for a specific environment will be processed.

**Common Uses:**

-   Define when requests will be prefetched.
-   Override or define a custom cache policy.
-   Secure or deny requests for sensitive content.
-   Redirect requests.
-   Store custom log data.

<Video src="https://www.youtube.com/watch?v=5xPItxYBGK0" />

## Quick Start {/*quick-start*/}

Set up your rules through the following steps:

1.  Identify the environment (e.g., `production`) that will be configured.
2.  Define one or more rule(s) for that environment. Each rule should contain at least one feature.
3.  Apply your rules to that environment by deploying your changes.

## Rules and CDN-as-Code {/*rules-and-cdn-as-code*/}

There are two workflows for defining your CDN configuration:

-   Generate and deploy rules through the {{ PORTAL_LINK }}.
-   Define a [CDN-as-Code configuration](/applications/performance/cdn_as_code) and then deploy it through the {{ PRODUCT }} CLI.

![Rules and CDN-as-Code](/images/v7/performance/rules-cdn-as-code.png?width=700)

Deploying to an environment always overrides the previous configuration. However, if you use a different workflow, you may not be aware of how a deployment will override your current configuration.

For example, if you deploy rules to an environment and a teammate deploys a CDN-as-code configuration at a later date, then your teammate may not be aware of the configuration defined within your rules.

<Callout type="tip">

  There are benefits and disadvantages to each approach. For example, some teams may prefer the straightforward approach of setting up rules, while other teams may prefer writing code. Another important factor is that the integration of a JavaScript framework through {{ PRODUCT }} {{ PRODUCT_PLATFORM }} requires the CDN-as-code approach.

</Callout>

<Callout type="info">

  Complex CDN-as-code configurations are displayed in JSON format instead of being displayed as rules.

</Callout>

## Rules {/*rules*/}

A rule consists of a set of IF, ELSE, and ELSE IF statements that define the logic through which requests are identified and processed.

Each statement may contain:
-   A set of match conditions that define the criteria used to identify requests.

    For example, you may identify requests by URL path, request headers, or geolocation.

-   A set of features that define how the CDN will process requests identified by its conditional expression.

    For example, you may define a caching policy, set response headers, or redirect requests.

Each of these components are identified in the following illustration.

![Rule components](/images/v7/performance/rule-components.gif)

For example, the following rule applies a caching policy to all `GET` requests whose relative path starts with `/marketing/`.

![Rule Example](/images/v7/performance/rule-condition-feature-example.png)

### Statements {/*statements*/}

There are three types of statement:

-   **IF:** By default, adding a match condition or feature creates an IF statement and places the new entry within it. You may then add additional match conditions and features.
-   **ELSE:** Adding `Else` to a rule adds an ELSE statement. This type of statement determines how {{ PRODUCT }} will process all requests that do not satisfy at least one IF or ELSE IF statement defined within the same rule.
-   **ELSE IF:** Adding a match condition to an ELSE statement converts it into an ELSE IF statement. This type of statement determines how {{ PRODUCT }} will process requests that meet the following requirements:
    -   The request does not satisfy the IF statement or any ELSE IF statements above this statement.
    -   The request must satisfy all of the match condition(s) defined within this ELSE IF statement.

<Callout type="info">

  By default, an IF or ELSE IF statement requires requests to satisfy all match condition(s) defined within that statement.

  [Learn how to toggle this behavior.](#multiple-conditions)

</Callout>

### Nested Rules {/*nested-rules*/}

A nested rule is a rule that is added to another rule's IF, ELSE IF, or ELSE statement. {{ PRODUCT }} will only check a nested rule's logic when the following prerequisites are satisfied:

1.  The request satisfies the rule's logic to reach the statement where the rule was nested.

    For example, if a rule is nested under the second ELSE IF statement, then it must not satisfy the match condition(s) defined under the IF statement or the ELSE IF statement that is listed above this one.

	Alternatively, if a rule is nested under an ELSE statement, then a request cannot satisfy any other IF or ELSE IF statement in that rule.

2.  The request satisfies all of the match condition(s) associated with the IF or ELSE IF statement where the rule was nested. This prerequisite is automatically satisfied for ELSE statements, since they do not have match conditions.

For example, the following illustration demonstrates a nested rule whose logic will only be applied for specific types of images:

![Nested rule](/images/v7/performance/rules-nested-rule.png?width=700)

**Key information:**

-   You may nest a rule under any statement.
-   Add a nested rule by finding the desired statement, clicking `+ Add`, and then selecting `Add Nested Rule`.

### Conditions {/*conditions*/}

A condition identifies a set of requests. Setting up a condition requires:

1.  Selecting the [type of condition](/applications/performance/rules/conditions).

    For example, you may identify requests by HTTP method, path, or request headers.

2.  Defining how a request will be compared against a value or state. In some cases, this involves selecting a comparison operator and defining the value that will be compared against the request.

**Example:**

Identify all `GET` requests through the following condition:
-   **Type of condition (aka variable):** Method
-   **Operator:** Equals
-   **Match Value:** GET

Learn more about [types of conditions](/applications/performance/rules/conditions) and [operators](/applications/performance/rules/operators).

#### Multiple Conditions {/*multiple-conditions*/}

By default, an IF or ELSE IF statement requires requests to satisfy all match condition(s) defined within that statement. This is indicated by an `and` label. However, you may modify an IF or ELSE IF statement to only require a single condition by toggling the `and` label to `or`.

**To toggle matching logic**

1.  Create a rule with multiple condition(s).
2.  From the desired IF or ELSE IF statement, click on the `and` label that appears directly to left of a match condition.

    ![Toggle condition logic](/images/v7/performance/rules-change-condition-logic.png)

3.  When prompted, click **Change operators** to only require a single condition before matching a request for this IF or ELSE IF statement.

<Callout type="info">

  Switch it back to requiring all conditions by clicking on the `or` label and then confirming this change by clicking **Change operators**.

</Callout>

<Callout type="info">

  Your changes will not take effect until they are deployed.

</Callout>

### Features {/*features*/}

A feature determines how requests will be processed. They are categorized as follows:

-   [Access](/applications/performance/rules/features#access): Controls access to content.
-   [Caching](/applications/performance/rules/features#caching): Customizes when and how content is cached.
-   [Client](/applications/performance/rules/features#client): Controls how the client communicates with our CDN.
-   **Comment:** Adds a note or metadata to your configuration. This feature is solely informational and does not affect your configuration.
-   [Headers](/applications/performance/rules/features#headers): Adds, modifies, or deletes headers from the request or response.
-   [Logs](/applications/performance/rules/features#logs): Customizes how log data is stored.
-   [Origin](/applications/performance/rules/features#origin): Controls how the CDN communicates with an origin server.
-   [Response](/applications/performance/rules/features#response): Customizes the response sent to the client and determines whether we will allow prefetching instructions to be sent to the client.
-   [Set Variables](/applications/performance/rules/features#set-variables): Assigns a value to one or more user-defined variable(s) that are  passed to your bespoke traffic processing solution.
-   [URL](/applications/performance/rules/features#url): Redirects or rewrites requests to a different URL.

##  Rule Precedence {/*rule-precedence*/}

You may create multiple rules. The use of multiple rules facilitates:

-   The setup of a default configuration that will be applied to all requests.
-   The creation of rules that specialize according to request type or behavior.
-   Additional control over how requests for content are handled.

Rules are typically processed in the order that they are listed. If a request satisfies the criteria for multiple rules, then all of the features associated with those features will be applied to the request. This could lead to a situation where conflicting actions will take place. In such a case, the last action to take place will take precedence over previous actions. Therefore, it is recommended to place rules that should take precedence as close to the bottom of the list as possible.

<Callout type="tip">

  Move a rule by dragging the rule's <Image inline src="/images/v7/icons/grab-handle.png" alt="" /> icon to the desired position.

</Callout>

A good rule of thumb when determining where a rule should be positioned is to order rules according to the level of detail in the criteria. Rules with general criteria should be placed closer to the top of the list, while more detailed criteria should be placed closer to the bottom. This type of configuration allows catch-all rules to assign default handling behavior for your assets without interfering with the manner in which specific types of assets are handled.

![Order of Precedence](/images/v7/performance/rules-order-of-precedence.png)

### Exceptions to Rule Precedence {/*exceptions-to-rule-precedence*/}

The following cases are exceptions to the order-based rule precedence stated above:

-   **Identical Matching Criteria:** If multiple rules share the same matching criteria, then the actions associated with those rules will take place at the same time. Thus, a rule at the bottom could be combined with a rule at the top of the list. This type of situation would prevent the rule at the bottom from taking precedence over other rules.

-   **URL Rewrite Precedence:** The URL Rewrite feature takes precedence when multiple features will be applied to a request. This occurs regardless of rule order.

    **Example:**

    In this sample scenario, a policy contains two rules. The first rule applies the URL Redirect feature, while the second one applies the URL Rewrite feature. If a request satisfies both rules, then the URL Rewrite feature will always be applied to a request before the URL Redirect feature.

-   **Token Auth Precedence:** The Token Auth feature takes precedence over most features with the exception of the URL Rewrite feature. This occurs regardless of rule order.

### Fine-Tuning Your Rules {/*fine-tuning-your-rules*/}

If the response provided by {{ PRODUCT }} does not match your expectations, you can check the [{{ HEADER_PREFIX }}-mr response header](/applications/performance/response#-mr) to find out which rules were applied to a request. This response header identifies each rule that was applied to a request by its number. Display rule numbers by clicking **Show Rule Numbers**.

![Show Rule Numbers](/images/v7/performance/rules-show-rule-numbers.png)

For example, the following value indicates that the request matched both the first rule (i.e., `0`) and the second rule (i.e., `1`) within deployment version #16.

`{{ HEADER_PREFIX }}-mr: 16:0;16:1;`

You can now use this information to adjust your rules. For example, you may adjust the second rule to exclude this type of request or modify another rule to match this type of request.

<Video src="https://www.youtube.com/watch?v=oQ5EMbxvprM" />

### Rule Precedence Scenario {/*rule-precedence-scenario*/}

This scenario assumes that the following three rules have been created:

| Order | Purpose                                                   | Description                              |
|-------|-----------------------------------------------------------|------------------------------------------|
| 1     | Assign a default cache policy for all requests.           | Placing this rule at the top of the list ensures that this cache policy is assigned by default to all requests.  |
| 2     | Define an alternative cache policy based on origin type.  | The rule's position allows it to override the default behavior defined in the first rule for requests to a specific origin.  |
| 3     | Deny access based on the requester's location.            | This rule denies access for requests that originate from a specific location. Although this rule does not contradict the above two rules, segregating these instructions improves readability and facilitates rule management. |

<Callout type="info">

  Rule order can drastically affect how requests are handled. In the above example, moving the default cache policy rule below the other rules will nullify the cache policy defined by origin type.

</Callout>

## Managing Rules {/*managing-rules*/}

You may create, modify, and delete rules.

**Key information:**

-   You may make changes without affecting an environment's traffic. This allows you to collaborate with other teammates when setting up rules and to stage changes until they are needed.

    For example, a sales event may require URL redirects or a different caching policy than standard site traffic. You can stage these changes until they are needed for the sales event.

-   Apply your changes to the current environment by clicking **Deploy Changes**.
-   Add a comment or a note to a rule by clicking **Add Comments** and then typing the desired message. Comments or notes are  informational and do not affect your configuration.
-   An alternative method for setting up your configuration is [CDN-as-code](/applications/performance/cdn_as_code). CDN-as-code is a developer-oriented solution that provides more flexibility during CDN setup. You may create a base CDN-as-code configuration by setting up your rules through the {{ PORTAL_LINK }}, [exporting them as {{ EDGEJS_LABEL }} code](#export-rules-edgejs), and then pasting that code into your {{ ROUTES_FILE }} file.

    <Callout type="info">

      The **Rules** page will display a complex CDN-as-code configuration in JSON format. You may modify the JSON directly within the **Rules** page or your {{ ROUTES_FILE }} file.

    </Callout>

**To set up rules**

1.  Load the **Rules** page.
    1.  From the {{ PORTAL_LINK }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Rules**.
2.  Add a rule by clicking **+ Add Rule**.
3.  Add a condition that defines the set of requests for which this rule will be applied. Repeat this step as needed.
    1.  Click **+ Add** and then select **Add Condition**.
    2.  From the **Variable** option, select the method by which requests will be identified.
    3.  From the **Operator** option, define the relationship between the variable selected in the previous step and the value that will be defined in the next step.
    4.  In the **Value** option, define a value that will be compared against for each request.
    5.  Click **Add Condition**.
4.  Add a feature that determines how the requests defined in the previous step will be processed. Repeat this step as needed.
    1.  Click **+ Add** and then select **Add Feature**.
    2.  From the **Feature** option, select the desired feature.

	    <Callout type="tip">

		  Features are listed by category. If you already know the name of the desired feature, type any part of its name to filter the list.

		</Callout>

    3.  Configure the selected feature.
    4.  Click **Add Feature**.
5.  Optional. Add an [ELSE or ELSE IF statement](#statements) to define an alternate set of logic for identifying and processing requests.

    1.  Click **+ Add** and then select **Add Else**. An ELSE statement will appear.
    2.  Convert this ELSE statement to an ELSE IF statement by adding one or more match condition(s).

6.  Add more rules as needed by repeating steps 2 - 5.
7.  Review your rules to verify how requests will be handled and the order in which rules will be applied to requests.

    <Callout type="tip">

      Move a rule by dragging the rule's <Image inline src="/images/v7/icons/grab-handle.png" alt="" /> icon to the desired position.

    </Callout>

8.  Click **Deploy Changes**.

**To delete a rule**

1.  Load the **Rules** page.
    1.  From the {{ PORTAL_LINK }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Rules**.
2.  Click the <Image inline src="/images/v7/icons/delete-2.png" alt="" /> icon next to the desired rule.
3.  Confirm the deletion by clicking **Delete Rules**.
4.  Apply your changes to this environment by clicking **Deploy Changes**.

**To export your rules as {{ EDGEJS_LABEL }} code** <a id="export-rules-edgejs" />

1.  Load the **Rules** page.
    1.  From the {{ PORTAL_LINK }}, select the desired property.
    2.  From the left-hand pane, select the desired environment from under the **Environments** section.
    3.  From the left-hand pane, select **Rules**.
2.  Click **Export** and then select **{{ EDGEJS_LABEL }}** to display your rules as a CDN-as-code ({{ EDGEJS_LABEL }}) configuration.
3.  Copy the code by clicking the <Image inline src="/images/v7/icons/copy-to-clipboard.png" alt="" /> icon.
4.  Optional. Paste your code into your {{ ROUTES_FILE }}.

<Callout type="info">

  Deploying your CDN-as-code configuration through the {{ PRODUCT }} CLI will overwrite your rules. Likewise, deploying rule changes from the {{ PORTAL_LINK }} will override a previously deployed CDN-as-code configuration.

</Callout>
