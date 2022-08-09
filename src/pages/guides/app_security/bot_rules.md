---
title: Bot Rules
---

Use bot rules to require a client (e.g., a web browser) to solve a
challenge before resolving the request. {{ PRODUCT_SECURITY }} blocks traffic when the
client cannot solve this challenge within a few seconds. Basic bots
typically cannot solve this type of challenge and therefore their
traffic is blocked. This prevents them from scraping your siteRefers to
harvesting data from your site., cardingRefers to the process through
which stolen credit cards are authorized., spamming your forms,
launching DDoS attacks, and committing ad fraud.

Solving a challenge requires a JavaScript-enabled client. Users that
have disabled JavaScript on their browsing session will be unable to
access content protected by bot rules.

We strongly recommend that you avoid applying bot rules to
machine-to-machine interactions. For example, applying bot rules to API
traffic will disrupt your API workflow.

## How Does It Work? {/*how-does-it-work*/}

Content protected by bot rules undergoes the following workflow:

1.  Browser Challenge

    WAF sends a browser challenge in response to requests for content
    protected by bot rules. It is up to the client to solve this
    challenge within a few seconds.

2.  Response

    The results of the above browser challenge determines what happens
    next.

    -   **Solved:** If the client is able to solve the challenge,
        then our CDN serves the requested content. Additionally, a
        cookie will be added to the user's session. This cookie
        instructs our CDN to serve content to the user without requiring
        a browser challenge. Once the cookie expires, new requests for
        content protected by bot rules will once again require the
        client to solve a challenge.

        Define the duration for this cookie through the **Valid for (in
        minutes)** option when setting up the enforcement of bot
        rules within your Security Application configuration.

    -   **Unsolved:** If the client is unable to solve the
        challenge, then our CDN responds with a new browser challenge.

## <a id="RuleIDMessage"></a>Bot Rule Sets {/*a-idruleidmessageabot-rule-sets*/}

A bot rule set defines the set of requests that will be protected by bot
rules. Each rule contains:

-   Up to 6 conditions that define request identification criteria.

-   A rule ID and message that will be associated with requests
    identified by this rule.

    Assigning a unique ID and message to each rule makes it easy to
    identify requests detected as a result of a specific rule.

    A rule ID must be a number between 77,000,000 and 77,999,999.

A bot rule set may contain up to 10 rules.

### Request Identification {/*request-identification*/}

WAF identifies a request when it satisfies at least one rule in a bot
rule set. The manner in which a rule is satisfied varies by type.

-   **Custom Matches:** This type of rule is satisfied when a match is
    found for each of its conditions. A condition determines request
    identification by defining what will be matched (i.e., variable),
    how it will be matched (i.e., operator), and a match value.

    Certain variables match on key-value pairs. If you match on multiple
    keys within a single variable, WAF will only need to find one of
    those matches to satisfy that variable.\
    \
    For example, if you set up a request header variable to match for
    `Authorization` and `Content-Type`, then requests
    that contain either or both of those headers will satisfy that
    variable.

-   **Edgecast Reputation DB:** This type of rule is satisfied when
    the client's IP address matches an IP address defined within our
    reputation database. Our reputation database contains a list of
    IP addresses known to be used by bots.

View examples

Example #1

This example assumes that your bot rule set contains the following two
rules:

| Rule | Type           | Description                            |
|------|----------------|----------------------------------------|
| 1    | Custom matches | This rule contains a single condition. |
| 2    | Custom matches | This rule contains two conditions.     |

Assuming the above configuration, {{ PRODUCT_SECURITY }} applies bot rules protection under
either of the following circumstances:

-   A match is found for the variable defined in the first rule's
    condition.

-   A match is found for the variables defined in both of the second
    rule's conditions.

``` {madcap:conditions="General.ADNExclude"}
Example #2

This example assumes that your bot rule set contains the following two
rules:

| Rule | Type                   | Description                                                                                                |
|------|------------------------|------------------------------------------------------------------------------------------------------------|
| 1    | Custom matches         | This rule contains two conditions.                                                                         |
| 2    | Edgecast Reputation DB | This rule is satisfied when the client's IP address matches an IP address within our reputation database. |

Assuming the above configuration, {{ PRODUCT_SECURITY }} applies bot rules protection under
either of the following circumstances:

-   A match is found for the variables defined in both of the first
    rule's conditions.
-   The client's IP address matches an IP address within our reputation
    database.

## Bot Rule Administration

You may create, modify, and delete bot rule sets.

Key information:

-   Administer bot rule sets from the [[Bot Rules
    page](https://%5B%=Domains.Portal%%5D/Defend/RulesManager#/defend/waf/rules/bots).
-   Apply a bot rule set to production traffic by adding it to a
    [Security Application configuration](SAM.htm) and then
    determining how it will be enforced. Multiple Security Application
    Manager configurations may use the same bot rule set. Leverage this
    capability to tailor security screening by application or traffic
    profile.
-   It may take up to 2 minutes for an updated bot rule set to be
    applied across our entire network.

To create a bot rule set

1.  

2.  Click **Add Bot Rule**.

3.  In the **Name** option, type the unique name by which this
    bot rule set will be identified. This name should be sufficiently
    descriptive to identify it when setting up a Security Application
    Manager configuration.

4.  In the **Rule type** option, select the type of rule that
    will be created.

    -   **Custom Matches:** This type of rule is satisfied when a
        match is found for each of its conditions.

    -   **Edgecast Reputation DB:** This type of rule is satisfied
        when the client's IP address matches an IP address within our
        reputation database. Proceed to the next step.

5.  Optional. Click **Add Rule** to add another rule through
    which WAF may identify requests. Repeat step 4.

6.  Click **Save**.

To modify a bot rule set

1.  

2.  Click on the desired bot rule set.

3.  Make the desired changes.

    Key tasks:

    -   Change the [type of rule](#RequestIdentification) from the **Rule
        type** option.

    -   Custom matches only

        Delete variables and matches within a variable by clicking
        ![](/images/icons/remove.png).

    -   Custom matches only

        Delete a condition by clicking **Delete Condition**.

        A rule must have at least one condition. Therefore, you cannot
        delete the root condition.

    -   Delete a rule by clicking [Delete Rule]{.linktext} and then
        clicking **Confirm**.

4.  Click **Save**.

To delete a bot rule set

1.  
2.  Click on the desired bot rule set.
3.  Click **Delete Bot Rule Profile**.
4.  Type *DELETE*.
5.  Click **Delete**.
