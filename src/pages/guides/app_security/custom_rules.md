---
title: Custom Rules
---

Use custom rules to tailor how {{ PRODUCT_SECURITY }} identifies malicious traffic. This
provides added flexibility for threat identification that allows you to
target malicious traffic with minimal impact to legitimate traffic.
Custom threat identification combined with rapid testing and deployment
enables you to quickly address long-term and zero-day vulnerabilities.

## <a id="RuleIDMessage"></a>Custom Rule Sets {/*a-idruleidmessageacustom-rule-sets*/}

A custom rule set defines how threats will be identified through rules.
Each rule contains:

-   Up to 6 conditions that define threat identification criteria.

-   A rule ID and message that will be associated with threats
    identified by this rule.

    Assigning a unique ID and message to each rule makes it easy to
    identify threats detected as a result of a specific rule.

    A rule ID must be a number between 66,000,000 and 66,999,999.

A custom rule set may contain up to 10 rules.

### Threat Identification {/*threat-identification*/}

WAF identifies a threat when a request satisfies at least one rule in a
custom rule set. A rule is satisfied when a match is found for one or
more variable(s)A variable identifies the request element (e.g., request
header, query string, or request body) that WAF will analyze. in each
condition.

Example #1:

This example assumes that your custom rule set contains the following
two rules:

| Rule | Description                                                   |
| ----------- | ----------- |
| 1    | This rule contains a single condition with a single variable. |
| 2    | This rule contains the following conditions:  1.  The first condition contains a single variable. 2.  The second condition contains two variables.              |

Assuming the above configuration, {{ PRODUCT_SECURITY }} identifies a threat under either
of the following circumstances:

-   A match is found for the variable defined in the first rule's
    condition.

-   A match is found for the variable defined in the second rule's
    first condition.

    AND

    A match is found for either of the variables defined in the second
    rule's second condition.

Certain variables match on key-value pairs. If you match on multiple
keys within a single variable, WAF will only need to find one of those
matches to satisfy that variable. For example, if you set up a request
header variable to match for `Authorization` and
`Content-Type`, then requests that contain either or both of
those headers will satisfy that variable.

## Custom Rule Administration {/*custom-rule-administration*/}

You may create, modify, and delete custom rule sets.

Key information:

-   Administer custom rule sets from the [[Custom Rules
    page](https://%5B%=Domains.Portal%%5D/Defend/RulesManager#/defend/waf/rules/custom){target="_blank"
    madcap:conditions="General.EdgeCast,General.TransactOnly"
    madcap:excludeaction="unbind"}]{.portal}.
-   Apply a custom rule set to production traffic by adding it to a
    [Security Application configuration](SAM.htm) and then
    determining how it will be enforced. Multiple Security Application
    Manager configurations may use the same custom rule set. Leverage
    this capability to tailor security screening by application or
    traffic profile.
-   It may take up to 2 minutes for an updated custom rule set to be
    applied across our entire network.

To create a custom rule set

1.  

2.  Click **Add Custom Rule Profile**.

3.  In the **Name** option, type the unique name by which this
    custom rule set will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    Manager configuration.

4.  Each new custom rule set contains a default rule that appears
    directly below the **Name** option. Find the **Name**
    option for that default rule and set it to a name that identifies
    the purpose of this rule.

5.  In the **Rule ID** option, specify a number between
    66,000,000 and 66,999,999.

6.  In the **Rule message** option, type a brief description for
    this rule.

7.  The default rule contains a default condition. Modify this condition
    to determine how {{ PRODUCT_SECURITY }} will identify threats.

    i.  From the condition's **Variable** option, select the
        request element through which WAF will identify threats.

        [Learn more about variables.](#Variables)

    ii. Certain variables (e.g., request cookies and request header)
        match on name and value. If you have selected this type of
        variable, then perform the following steps:

        a.  Click [+ Add Match]{.linktext}.

        b.  From the **Name** option, type the desired name.

            For example, match for requests that contain an
            `Authorization` header by setting this option to
            *Authorization*.

        c.  Optional. Mark the **Negative Match** option to match
            for requests that do not contain a matching value for the
            name defined in the previous step.

        d.  If you specified a regular expression in the **Name**
            option, then you should mark the **Regex Match**
            option.

        e.  Optional. Add another match through which this variable can
            be satisfied by repeating steps a - d.

    iii. Optional. Mark the **Count** option to match by the
         number of instances that a match is found instead of by
         inspecting that request element.

         [Learn more.](#count)

    iv. Optional. Click [+ Add Variable]{.linktext} to add another
        variable through which this request may be satisfied. Repeat
        steps i - iii.

        If you would like to a use a different match value for this
        variable, then you should create a new rule. Alternatively, if
        you would like to require both variables prior to threat
        identification, then you should add it as a new condition to
        this rule.

    v.  From the **Operator** option, select an operator that
        determines how WAF will compare the match value to the request
        element identified by the above variable.

        [Learn more.](#Operators)

    vi. In the **Match value** option, type the value that will
        be compared against the request element identified by the above
        variable.

    vii. From the **Match transformations** option, select each
         transformation that will be applied to the source value.

         [Learn more.](#MatchTransformations)

    viii. Optional. Mark the **Negative Match** option to match
          for requests that do not contain a matching value for the
          value defined in step vi.

8.  Optional. Click [+ Add Condition]{.linktext} to add another
    condition that must be met prior to threat identification. Repeat
    step 7 for this new condition.

9.  Optional. Click [+ Add Rule]{.linktext} to add another rule through
    which WAF may identify threats. Repeat steps 7 and 8.

10. Click **Save**.

To modify a custom rule set

1.  

2.  Click on the desired custom rule set.

3.  Make the desired changes.

    Key tasks:

    -   Delete variables and matches within a variable by clicking
        ![](/images/icons/remove.png).

    -   Delete a condition by clicking [Delete Condition]{.linktext}.

        A rule must have at least one condition. Therefore, you cannot
        delete the root condition.

    -   Delete a rule by clicking [Delete Rule]{.linktext} and then
        clicking **Confirm**.

4.  Click **Save**.

To delete a custom rule set

1.  
2.  Click on the desired custom rule set.
3.  Click **Delete Custom Rule Profile**.
4.  Type *DELETE*.
5.  Click **Delete**.
